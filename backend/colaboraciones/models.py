from django.db import models

# Create your models here.
class Colaboracion(models.Model):
    "Solicitud para colaborar con residuos organicos (Pagina Donaciones)"

    class Material(models.TextChoices):
        CAFE = 'cafe', 'Borra de café'
        HUEVO = 'huevo', 'Cáscaras de huevo'
        CITRICOS = 'citricos', 'Cáscaras de cítricos'
        OTRO = 'otro', 'Otro material orgánico'

    class Origen(models.TextChoices):
        HOGAR = 'hogar', 'Hogar'
        CAFETERIA = 'cafeteria', 'Cafetería'
        COMERCIO = 'comercio', 'Comercio'
        OTRO = 'otro', 'Otra actividad'

    class Frecuencia(models.TextChoices):
        UNICA = 'unica', 'Una sola vez'
        SEMANAL = 'semanal', 'Semanal'
        MENSUAL = 'mensual', 'Mensual'
        VARIABLE = 'variable', 'Variable / no lo sé'

    class Estado(models.TextChoices):
        NUEVA = 'nueva', 'Nueva'
        EN_EVALUACION = 'en_evaluacion', 'En evaluación'
        ACEPTADA = 'aceptada', 'Aceptada'
        DESCARTADA = 'descartada', 'Descartada'

# Quién escribe.
    nombre = models.CharField(max_length=120)
    correo = models.EmailField()
    telefono = models.CharField(max_length=30, blank=True)

    # Qué material y de donde viene.
    material = models.CharField(max_length=20, choices=Material.choices)
    #material: son los 3 ejemplos que muestra la página, más "Otro". 
    # Si elige "Otro", lo describe en detalle_material. La página también menciona nueces, palta y hojas.
    detalle_material = models.CharField(max_length=200, blank=True) #ej: "cuescos de palta"
    origen = models.CharField(max_length=20, choices=Origen.choices)
    #origen: "Hogar, cafetería, comercio u otra actividad", tal como dice la página.
    comuna = models.CharField(max_length=80)
    cantidad_aproximada = models.CharField(max_length=100) # ejemplo: "una bolsa," "5kg"
    #cantidad_aproximada: es texto libre, porque la página dice que "una estimación basta".
    frecuencia = models.CharField(max_length=20, choices=Frecuencia.choices, default=Frecuencia.VARIABLE)
    puede_separar = models.BooleanField(default=False)
    #puede_separar: corresponde a "¿Puedo mantenerlo separado?" de la plantilla.
    comentario = models.TextField(blank=True)
    acepta_condiciones = models.BooleanField(default=False)
    #acepta_condiciones: corresponde a "Entiendo que la recepción debe ser evaluada…". La API exigirá que venga marcado.

    # Seguimiento del equipo DK (No llena el visitante)
    estado = models.CharField(max_length=20, choices=Estado.choices, default=Estado.NUEVA)
    notas_internas = models.TextField(blank=True)
    #estado y notas_internas: son para que el equipo evalúe cada solicitud. 
    # Siguen los pasos de la página: evaluar → acordar → aceptar o descartar.
    creada = models.DateTimeField(auto_now_add=True)
    actualizada = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-creada']
        verbose_name = 'colaboración'
        verbose_name_plural = 'colaboraciones'

    def __str__(self):
        return f'{self.nombre} · {self.get_material_display()} ({self.comuna})'