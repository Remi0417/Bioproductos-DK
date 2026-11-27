"""Pruebas de caja blanca: app tienda (conexión con Shopify).

Shopify se simula con unittest.mock: así se recorre cada rama del código
(éxito, error de conexión, errores de Shopify) sin depender de internet.
"""
from unittest import mock

import requests
from django.core.cache import cache
from django.test import SimpleTestCase, TestCase, override_settings
from rest_framework.test import APIClient

from . import shopify
from .views import _producto

PRODUCTO_SHOPIFY = {
    'handle': 'detergente-citrico',
    'title': 'Detergente líquido concentrado · aroma cítrico',
    'description': 'Formato 1 litro.',
    'productType': 'Cuidado del hogar',
    'availableForSale': True,
    'featuredImage': {'url': 'https://cdn.shopify.com/a.jpg', 'altText': None},
    'images': {'nodes': [{'url': 'https://cdn.shopify.com/a.jpg', 'altText': 'Botella'}]},
    'variants': {
        'nodes': [
            {
                'id': 'gid://shopify/ProductVariant/1',
                'title': 'Default Title',
                'availableForSale': True,
                'price': {'amount': '6990.0', 'currencyCode': 'CLP'},
                'image': None,
            }
        ]
    },
}
VARIANTE = 'gid://shopify/ProductVariant/51317408170123'
CARRITO = 'gid://shopify/Cart/hWNJc48s2Xj9HOIiIVZipna4?key=ebead5d25b0a249d'


class NormalizarProductoTests(SimpleTestCase):
    def test_cb18_producto_normalizado(self):
        """CB-18: _producto() traduce las claves, convierte el precio '6990.0' a int
        y cambia altText None por ''."""
        p = _producto(PRODUCTO_SHOPIFY)
        self.assertEqual(p['titulo'], PRODUCTO_SHOPIFY['title'])
        self.assertEqual(p['variantes'][0]['precio'], 6990)
        self.assertIsInstance(p['variantes'][0]['precio'], int)
        self.assertEqual(p['imagen'], {'url': 'https://cdn.shopify.com/a.jpg', 'alt': ''})
        self.assertIsNone(p['variantes'][0]['imagen'])  # rama 'if not nodo'


class ProductosViewTests(TestCase):
    def setUp(self):
        cache.clear()
        self.api = APIClient()

    @mock.patch('tienda.views.consultar')
    def test_cb19_catalogo_y_cache(self, consultar):
        """CB-19: la 1.ª llamada consulta a Shopify; la 2.ª sale del caché (60 s)."""
        consultar.return_value = {'products': {'nodes': [PRODUCTO_SHOPIFY]}}
        r1 = self.api.get('/api/tienda/productos/')
        r2 = self.api.get('/api/tienda/productos/')
        self.assertEqual(r1.status_code, 200)
        self.assertEqual(r1.data, r2.data)
        self.assertEqual(consultar.call_count, 1)

    @mock.patch('tienda.views.consultar', side_effect=shopify.ShopifyError('caído'))
    def test_cb20_catalogo_shopify_caido(self, consultar):
        """CB-20: rama except ShopifyError → 503 con mensaje claro."""
        r = self.api.get('/api/tienda/productos/')
        self.assertEqual(r.status_code, 503)
        self.assertIn('detail', r.data)


class CheckoutViewTests(TestCase):
    URL = '/api/tienda/checkout/'

    def setUp(self):
        cache.clear()
        self.api = APIClient()

    def linea(self, **cambios):
        return {'lineas': [{'variante_id': VARIANTE, 'cantidad': 1, **cambios}]}

    @mock.patch('tienda.views.consultar')
    def test_cb21_checkout_exitoso(self, consultar):
        """CB-21: camino feliz → 201 con checkout_url y carrito_id.
        Django solo envía IDs y cantidades a Shopify (nunca precios)."""
        consultar.return_value = {
            'cartCreate': {'cart': {'id': CARRITO, 'checkoutUrl': 'https://x/c/1'}, 'userErrors': []}
        }
        r = self.api.post(self.URL, self.linea(cantidad=2), format='json')
        self.assertEqual(r.status_code, 201)
        self.assertEqual(r.data['checkout_url'], 'https://x/c/1')
        lineas = consultar.call_args.args[1]['lineas']
        self.assertEqual(lineas, [{'merchandiseId': VARIANTE, 'quantity': 2}])

    def test_cb22_validaciones_del_carrito(self):
        """CB-22: LineaSerializer/CheckoutSerializer rechazan: carrito vacío,
        ID que no es de Shopify, cantidad 0 y cantidad 11 (máximo 10)."""
        casos = [
            {'lineas': []},
            self.linea(variante_id='gid://shopify/Product/1'),
            self.linea(cantidad=0),
            self.linea(cantidad=11),
        ]
        for datos in casos:
            with self.subTest(datos=datos):
                self.assertEqual(self.api.post(self.URL, datos, format='json').status_code, 400)

    @mock.patch('tienda.views.consultar')
    def test_cb23_producto_no_disponible(self, consultar):
        """CB-23: rama userErrors de Shopify → 400."""
        consultar.return_value = {
            'cartCreate': {'cart': None, 'userErrors': [{'field': 'lines', 'message': 'sin stock'}]}
        }
        self.assertEqual(self.api.post(self.URL, self.linea(), format='json').status_code, 400)

    @mock.patch('tienda.views.consultar', side_effect=shopify.ShopifyError('caído'))
    def test_cb24_checkout_shopify_caido(self, consultar):
        """CB-24: rama except ShopifyError → 503."""
        self.assertEqual(self.api.post(self.URL, self.linea(), format='json').status_code, 503)


class EstadoCarritoViewTests(TestCase):
    URL = '/api/tienda/carrito/'

    def setUp(self):
        cache.clear()
        self.api = APIClient()

    def test_cb25_id_invalido(self):
        """CB-25: la expresión regular CARRITO_ID rechaza IDs mal formados."""
        for valor in ('', 'abc', 'gid://shopify/Cart/x?key=1&otro=2'):
            with self.subTest(valor=valor):
                r = self.api.get(self.URL, {'id': valor})
                self.assertEqual(r.status_code, 400)

    @mock.patch('tienda.views.consultar')
    def test_cb26_carrito_comprado_y_pendiente(self, consultar):
        """CB-26: cart = None → completado True; cart con datos → False."""
        consultar.return_value = {'cart': None}
        self.assertTrue(self.api.get(self.URL, {'id': CARRITO}).data['completado'])
        consultar.return_value = {'cart': {'id': CARRITO}}
        self.assertFalse(self.api.get(self.URL, {'id': CARRITO}).data['completado'])


class ClienteShopifyTests(SimpleTestCase):
    @override_settings(SHOPIFY_STORE_DOMAIN='', SHOPIFY_STOREFRONT_PRIVATE_TOKEN='')
    def test_cb27_sin_variables(self):
        """CB-27: sin dominio/token, consultar() lanza ShopifyError (no llama a la red)."""
        with mock.patch('tienda.shopify.requests.post') as post:
            with self.assertRaises(shopify.ShopifyError):
                shopify.consultar('{ shop { name } }')
            post.assert_not_called()

    @override_settings(SHOPIFY_STORE_DOMAIN='demo.myshopify.com', SHOPIFY_STOREFRONT_PRIVATE_TOKEN='t')
    def test_cb28_errores_de_red_y_graphql(self):
        """CB-28: un error de red y una respuesta con 'errors' se convierten en ShopifyError."""
        with mock.patch('tienda.shopify.requests.post', side_effect=requests.ConnectionError):
            with self.assertRaises(shopify.ShopifyError):
                shopify.consultar('q')
        respuesta = mock.Mock(**{'json.return_value': {'errors': [{'message': 'x'}]}})
        with mock.patch('tienda.shopify.requests.post', return_value=respuesta):
            with self.assertRaises(shopify.ShopifyError):
                shopify.consultar('q')

    @override_settings(SHOPIFY_STORE_DOMAIN='demo.myshopify.com', SHOPIFY_STOREFRONT_PRIVATE_TOKEN='t')
    def test_cb29_respuesta_correcta(self):
        """CB-29: respuesta sin errores → devuelve solo 'data'; usa timeout de 10 s."""
        respuesta = mock.Mock(**{'json.return_value': {'data': {'ok': 1}}})
        with mock.patch('tienda.shopify.requests.post', return_value=respuesta) as post:
            self.assertEqual(shopify.consultar('q'), {'ok': 1})
            self.assertEqual(post.call_args.kwargs['timeout'], 10)
