from django.core.cache import cache
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.throttling import ScopedRateThrottle
from .serializer import CheckoutSerializer
from .shopify import ShopifyError, consultar

#Consulta GraphQL: qué datos queremos de cada producto.
#@InContext(country: CL) hace que Shopify responda con precios en CLP para Chile.

CONSULTA_PRODUCTOS = """
query Productos @inContext(country: CL, language: ES) {
  products(first: 50, sortKey: TITLE) {
    nodes {
      handle
      title
      description
      productType
      availableForSale
      featuredImage { url altText }
      images(first: 10) { nodes { url altText } }
      variants(first: 20) {
        nodes {
          id
          title
          availableForSale
          price { amount currencyCode }
          image { url altText }
        }
      }
    }
  }
}
"""

CACHE_CLAVE = 'tienda:productos'
CACHE_SEGUNDOS = 60


def _imagen(nodo):
    """Convierte una imagen de Shopify a {url, alt}, o None si no hay."""
    if not nodo:
        return None
    return {'url': nodo['url'], 'alt': nodo.get('altText') or ''}


def _producto(p):
    """Convierte un producto de Shopify al formato simple que usa React."""
    return {
        'handle': p['handle'],
        'titulo': p['title'],
        'descripcion': p['description'],
        'tipo': p['productType'],
        'disponible': p['availableForSale'],
        'imagen': _imagen(p['featuredImage']),
        'imagenes': [_imagen(i) for i in p['images']['nodes']],
        'variantes': [
            {
                'id': v['id'],
                'titulo': v['title'],
                'disponible': v['availableForSale'],
                'precio': int(float(v['price']['amount'])),
                'moneda': v['price']['currencyCode'],
                'imagen': _imagen(v['image']),
            }
            for v in p['variants']['nodes']
        ],
    }


class ProductosView(APIView):
    """GET público: catálogo de Shopify (en CLP, para Chile), con caché de 60 segundos."""

    permission_classes = [permissions.AllowAny]

    def get(self, request):
        productos = cache.get(CACHE_CLAVE)
        if productos is None:
            try:
                datos = consultar(CONSULTA_PRODUCTOS)
            except ShopifyError:
                return Response(
                    {'detail': 'El catálogo no está disponible en este momento.'},
                    status=503,
                )
            productos = [_producto(p) for p in datos['products']['nodes']]
            cache.set(CACHE_CLAVE, productos, CACHE_SEGUNDOS)
        return Response(productos)

#Comentarios:
# 1. APIView: antes usaste CreateAPIView, que solo crea registros. Aquí no hay modelo, así que escribimos el método get a mano.

#2. El caché (cache.get / cache.set): la primera visita le pregunta a Shopify, y las siguientes, durante 60 segundos, usan la respuesta guardada. 
#El sitio responde más rápido y no gastamos consultas a Shopify. Si las dueñas cambian un precio, se ve en máximo 1 minuto.

#3. int(float(...)): Shopify manda los precios como texto ("6990.0"). Los pasamos a número entero, porque el peso chileno no tiene decimales.

#4. status=503: si Shopify falla, React recibe “servicio no disponible” con un mensaje claro, en lugar de un error feo.

# Mutación GraphQL: crea un carrito en Shopify y devuelve su enlace de pago.
CREAR_CARRITO = """
mutation CrearCarrito($lineas: [CartLineInput!]!) @inContext(country: CL, language: ES) {
  cartCreate(input: { lines: $lineas, buyerIdentity: { countryCode: CL } }) {
    cart { checkoutUrl }
    userErrors { field message }
  }
}
"""


class CheckoutView(APIView):
    """POST público: recibe el carrito de React y devuelve el enlace de pago de Shopify."""

    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'checkout'

    def post(self, request):
        serializer = CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        lineas = [
            {'merchandiseId': linea['variante_id'], 'quantity': linea['cantidad']}
            for linea in serializer.validated_data['lineas']
        ]
        try:
            datos = consultar(CREAR_CARRITO, {'lineas': lineas})
        except ShopifyError:
            return Response(
                {'detail': 'No pudimos iniciar el pago. Inténtalo en unos minutos.'},
                status=503,
            )

        resultado = datos['cartCreate']
        if resultado['userErrors'] or not resultado['cart']:
            return Response(
                {'detail': 'Algunos productos del carrito ya no están disponibles.'},
                status=400,
            )
        return Response({'checkout_url': resultado['cart']['checkoutUrl']}, status=201)

#Comentarios
#1. mutation: en GraphQL, "query" es leer y "mutation" es crear o modificar. Aquí creamos un carrito.
#2. userErrors: Shopify avisa si, por ejemplo, un producto ya no está disponible.
#3 Seguridad: Django nunca recibe precios de React, solo IDs y cantidades. 
# El precio lo pone Shopify, así que nadie puede comprar un detergente a $1 manipulando el navegador.