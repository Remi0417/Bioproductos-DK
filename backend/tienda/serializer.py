from rest_framework import serializers

class LineaSerializer(serializers.Serializer):
    """Una línea de carrito: qué variante y cuantas unidades."""

    variante_id = serializers.RegexField(
        r'^gid://shopify/ProductVariant/\d+$',
        error_messages={'invalid': 'Producto no válido.'},
    )

    cantidad = serializers.IntegerField(min_value=1, max_value=10)

class CheckoutSerializer(serializers.Serializer):
    lineas = LineaSerializer(many=True, allow_empty=False, max_length=20)

#Comentarios
#RegexField: solo acepta IDs con el formato de Shopify (gid://shopify/ProductVariant/123…), que son los que entrega /productos/. Cualquier otra cosa se rechaza.
#Los límites (1 a 10 unidades por producto y máximo 20 líneas) evitan carritos absurdos.