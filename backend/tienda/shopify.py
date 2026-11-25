"""Cliente mínimo para la Storefront API de Shopify (GraphQL)."""
import requests
from django.conf import settings


class ShopifyError(Exception):
    """Error al comunicarse con Shopify (sin exponer el token)."""


def consultar(query, variables=None):
    """Envía una consulta GraphQL a Shopify y devuelve la parte 'data' de la respuesta."""
    if not settings.SHOPIFY_STORE_DOMAIN or not settings.SHOPIFY_STOREFRONT_PRIVATE_TOKEN:
        raise ShopifyError('Faltan las variables de Shopify en el .env')

    url = f'https://{settings.SHOPIFY_STORE_DOMAIN}/api/{settings.SHOPIFY_API_VERSION}/graphql.json'
    try:
        respuesta = requests.post(
            url,
            json={'query': query, 'variables': variables or {}},
            headers={
                'Shopify-Storefront-Private-Token': settings.SHOPIFY_STOREFRONT_PRIVATE_TOKEN,
                'Content-Type': 'application/json',
            },
            timeout=10,
        )
        respuesta.raise_for_status()
    except requests.RequestException as error:
        raise ShopifyError('No se pudo conectar con Shopify') from error

    datos = respuesta.json()
    if datos.get('errors'):
        raise ShopifyError('Shopify respondió con errores')
    return datos['data']

#Comentario que hace cada parte:
#ShopifyError: un error propio. Si algo falla, Django dice "no se pudo conectar con Shopify", sin mostrar el token ni detalles internos.
#requests.post: Shopify usa GraphQL: siempre es un POST a la misma URL, y la consulta dice qué datos queremos. requests ya lo tenías instalado.
#timeout=10: si Shopify no responde en 10 segundos, se corta. Así la página no se queda cargando para siempre.
