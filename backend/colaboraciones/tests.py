"""Pruebas de caja blanca: app colaboraciones (formulario /donaciones)."""
from django.core.cache import cache
from django.test import TestCase
from rest_framework.test import APIClient

from .models import Colaboracion

URL = '/api/colaboraciones/'
VALIDA = {
    'nombre': 'Café Central',
    'correo': 'contacto@example.com',
    'material': 'cafe',
    'origen': 'cafeteria',
    'comuna': 'Maipú',
    'cantidad_aproximada': '5 kg',
    'frecuencia': 'semanal',
    'acepta_condiciones': True,
}


class ColaboracionTests(TestCase):
    def setUp(self):
        cache.clear()
        self.api = APIClient()

    def test_cb08_colaboracion_valida(self):
        """CB-08: camino feliz. Se guarda con estado 'nueva'."""
        r = self.api.post(URL, VALIDA, format='json')
        self.assertEqual(r.status_code, 201)
        self.assertEqual(Colaboracion.objects.get().estado, Colaboracion.Estado.NUEVA)

    def test_cb09_condiciones_no_aceptadas(self):
        """CB-09: rama 'if not value' de validate_acepta_condiciones → 400."""
        r = self.api.post(URL, {**VALIDA, 'acepta_condiciones': False}, format='json')
        self.assertEqual(r.status_code, 400)
        self.assertIn('acepta_condiciones', r.data)

    def test_cb10_condiciones_ausentes(self):
        """CB-10: required=True. Si el campo no viene, no se toma False en silencio."""
        datos = {k: v for k, v in VALIDA.items() if k != 'acepta_condiciones'}
        r = self.api.post(URL, datos, format='json')
        self.assertEqual(r.status_code, 400)
        self.assertIn('acepta_condiciones', r.data)

    def test_cb11_material_otro_sin_detalle(self):
        """CB-11: rama de validate(). Material 'otro' exige detalle_material."""
        r = self.api.post(URL, {**VALIDA, 'material': 'otro', 'detalle_material': '  '}, format='json')
        self.assertEqual(r.status_code, 400)
        self.assertIn('detalle_material', r.data)

    def test_cb12_material_otro_con_detalle(self):
        """CB-12: la misma rama, con detalle → se acepta."""
        r = self.api.post(
            URL, {**VALIDA, 'material': 'otro', 'detalle_material': 'cuescos de palta'}, format='json'
        )
        self.assertEqual(r.status_code, 201)

    def test_cb13_limite_anti_spam(self):
        """CB-13: ScopedRateThrottle 'colaboraciones' (5/minuto) → 6.º envío 429."""
        codigos = [self.api.post(URL, VALIDA, format='json').status_code for _ in range(6)]
        self.assertEqual(codigos, [201] * 5 + [429])
