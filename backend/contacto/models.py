from django.db import models


class Consulta(models.Model):
    """Mensaje enviado desde el formulario de contacto del sitio."""
   
    class Tema(models.TextChoices):
        GENERAL = 'general', 'Consulta general'
        PRODUCTOS = 'productos', 'Productos y catálogo'
        CIENTIFICA = 'cientifica', 'Colaboración científica'
        EMPRESAS = 'empresas', 'Empresas y distribución'
        MATERIALES = 'materiales', 'Colaboración con materiales orgánicos'
        OTRO = 'otro', 'Otro tema'

    class Estado(models.TextChoices):
        NUEVA = 'nueva', 'Nueva'
        EN_PROCESO = 'en_proceso', 'En proceso'
        RESPONDIDA = 'respondida', 'Respondida'

    nombre = models.CharField(max_length=120)
    correo = models.EmailField()
    telefono = models.CharField(max_length=30, blank=True)
    #telefono: con blank=True el campo es opcional, igual que en el formulario.
    tema = models.CharField(max_length=20, choices=Tema.choices, default=Tema.GENERAL)
    # Tema: las mismas 6 opciones del <select> de contact-form.tsx (frontend de Byron).
    mensaje = models.TextField()

    # Para que el equipo DK haga seguimiento desde el admin
    estado = models.CharField(max_length=20, choices=Estado.choices, default=Estado.NUEVA)
    #estado: lo agregué para que el equipo marque cada consulta como nueva, en proceso o respondida.
    creada = models.DateTimeField(auto_now_add=True)
    actualizada = models.DateTimeField(auto_now=True)
    #creada y actualizada: Django llena las fechas solo.

    class Meta:
        ordering = ['-creada']
        verbose_name = 'consulta'
        verbose_name_plural = 'consultas'
        #ordering = ['-creada']: las consultas más recientes aparecen primero.

    def __str__(self):
        return f'{self.nombre} · {self.get_tema_display()}'