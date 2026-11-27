"""Pruebas de caja blanca: app empresas (formulario /empresas, RF-14)."""
from django.core.cache import cache
from django.test import TestCase
from rest_framework.test import APIClient

from .models import SolicitudEmpresa

URL = '/api/empresas/'
VALIDA = {
    'tipo': 'distribucion',
    'organizacion': 'Almacén Verde SpA',
    'comuna_region': 'Valparaíso',
    'nombre': 'Juan Soto',
    'correo': 'juan@example.com',
    'mensaje': 'Queremos distribuir sus detergentes en la región.',
}


class SolicitudEmpresaTests(TestCase):
    def setUp(self):
        cache.clear()
        self.api = APIClient()

    def test_cb14_solicitud_valida(self):
        """CB-14: camino feliz. Se registra con estado inicial 'nueva'."""
        r = self.api.post(URL, VALIDA, format='json')
        self.assertEqual(r.status_code, 201)
        self.assertEqual(SolicitudEmpresa.objects.get().estado, SolicitudEmpresa.Estado.NUEVA)

    def test_cb15_tipo_por_defecto(self):
        """CB-15: sin 'tipo', el modelo usa el valor por defecto 'punto_venta'."""
        datos = {k: v for k, v in VALIDA.items() if k != 'tipo'}
        self.api.post(URL, datos, format='json')
        self.assertEqual(SolicitudEmpresa.objects.get().tipo, 'punto_venta')

    def test_cb16_incompleta_o_correo_invalido(self):
        """CB-16: formularios incompletos y correos inválidos se rechazan (CO-014)."""
        r = self.api.post(URL, {**VALIDA, 'organizacion': '', 'correo': 'x@'}, format='json')
        self.assertEqual(r.status_code, 400)
        self.assertIn('organizacion', r.data)
        self.assertIn('correo', r.data)

    def test_cb17_limite_anti_spam(self):
        """CB-17: throttle_scope='empresas' (5/minuto) → 6.º envío 429.
        Esta prueba detectó que el atributo estaba mal escrito (throttle_scape)."""
        codigos = [self.api.post(URL, VALIDA, format='json').status_code for _ in range(6)]
        self.assertEqual(codigos, [201] * 5 + [429])
