from django.db import models

# Create your models here.
class SolicitudEmpresa(models.Model):
    """Consulta comercial desde la página Empresas (comercios, distribuidores, organizaciones)."""

    class Tipo(models.TextChoices):
        PUNTO_VENTA = 'punto_venta', 'Punto de venta (comercio)'
        DISTRIBUCION = 'distribucion', 'Distribución'
        ORGANIZACION = 'organizacion', 'Empresa u organización'
        OTRO = 'otro', 'Otra idea'

    class Estado(models.TextChoices):
        NUEVA = 'nueva', 'Nueva'
        EN_CONVERSACION = 'en_conversacion', 'En conversación'
        ACUERDO = 'acuerdo', 'Acuerdo'
        DESCARTADA = 'descartada', 'Descartada'

    # Qué le interesa 
    tipo = models.CharField(max_length=20,choices=Tipo.choices,default=Tipo.PUNTO_VENTA)

    # La organización 
    organizacion = models.CharField(max_length=150)
    comuna_region = models.CharField(max_length=120)

    #Quién escribe
    nombre = models.CharField(max_length=120)
    cargo = models.CharField(max_length=80,blank=True)
    correo = models.EmailField()
    telefono = models.CharField(max_length=30,blank=True)
    mensaje = models.TextField()

    # Seguimiento del Equipo DK (no lo llena el visitante)
    estado = models.CharField(max_length=20,choices=Estado.choices,default=Estado.NUEVA)
    notas_internas = models.TextField(blank=True)
    creada = models.DateTimeField(auto_now_add=True)
    actualizada = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-creada']
        verbose_name = 'solicitud de empresa'
        verbose_name_plural = 'solicitudes de empresa'

    def __str__(self):
        return f'{self.organizacion} · {self.get_tipo_display()}'