"""Pruebas de caja blanca: app contacto (formulario /contacto)."""
from django.core.cache import cache
from django.test import TestCase
from rest_framework.test import APIClient

from .models import Consulta

URL = '/api/contacto/consultas/'
VALIDA = {
    'nombre': 'Ana Pérez',
    'correo': 'ana@example.com',
    'tema': 'productos',
    'mensaje': '¿Tienen detergente en formato de 5 litros?',
}


class ConsultaTests(TestCase):
    def setUp(self):
        cache.clear()  # el límite anti-spam se guarda en caché
        self.api = APIClient()

    def test_cb01_consulta_valida_se_guarda_con_estado_nueva(self):
        """CB-01: camino feliz. Se crea la consulta y el estado inicial es 'nueva'."""
        r = self.api.post(URL, VALIDA, format='json')
        self.assertEqual(r.status_code, 201)
        consulta = Consulta.objects.get()
        self.assertEqual(consulta.estado, Consulta.Estado.NUEVA)
        self.assertEqual(consulta.telefono, '')  # opcional (blank=True)

    def test_cb02_campos_obligatorios(self):
        """CB-02: sin nombre, correo ni mensaje la API responde 400 y no guarda nada."""
        r = self.api.post(URL, {}, format='json')
        self.assertEqual(r.status_code, 400)
        for campo in ('nombre', 'correo', 'mensaje'):
            self.assertIn(campo, r.data)
        self.assertEqual(Consulta.objects.count(), 0)

    def test_cb03_correo_invalido(self):
        """CB-03: EmailField rechaza un correo mal escrito."""
        r = self.api.post(URL, {**VALIDA, 'correo': 'ana-sin-arroba'}, format='json')
        self.assertEqual(r.status_code, 400)
        self.assertIn('correo', r.data)

    def test_cb04_tema_fuera_de_opciones(self):
        """CB-04: 'tema' solo acepta las 6 opciones (TextChoices)."""
        r = self.api.post(URL, {**VALIDA, 'tema': 'inventado'}, format='json')
        self.assertEqual(r.status_code, 400)
        self.assertIn('tema', r.data)

    def test_cb05_visitante_no_puede_fijar_estado(self):
        """CB-05: 'estado' no está en el serializer; si se envía, se ignora."""
        self.api.post(URL, {**VALIDA, 'estado': 'respondida'}, format='json')
        self.assertEqual(Consulta.objects.get().estado, Consulta.Estado.NUEVA)

    def test_cb06_solo_permite_crear(self):
        """CB-06: CreateAPIView no permite leer las consultas de otros (GET → 405)."""
        self.assertEqual(self.api.get(URL).status_code, 405)

    def test_cb07_limite_anti_spam_5_por_minuto(self):
        """CB-07: ScopedRateThrottle 'contacto' (5/minuto): el 6.º envío → 429."""
        codigos = [self.api.post(URL, VALIDA, format='json').status_code for _ in range(6)]
        self.assertEqual(codigos, [201] * 5 + [429])
