from django.contrib import admin
from .models import Colaboracion
# Register your models here.

@admin.register(Colaboracion)

class ColaboracionAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'material', 'origen', 'comuna', 'frecuencia', 'puede_separar', 'estado', 'creada')
    list_filter = ('estado', 'material', 'origen', 'frecuencia', 'puede_separar')
    list_editable = ('estado',)
    search_fields = ('nombre', 'correo', 'comuna', 'detalle_material', 'comentario')
    readonly_fields = ('creada', 'actualizada')
    fieldsets = (
        ('Contacto', {'fields': ('nombre', 'correo', 'telefono')}),
        ('Material', {'fields': ('material', 'detalle_material', 'origen', 'comuna',
                                 'cantidad_aproximada', 'frecuencia', 'puede_separar',
                                 'comentario', 'acepta_condiciones')}),
        ('Seguimiento DK', {'fields': ('estado', 'notas_internas', 'creada', 'actualizada')}),
    )
    #fieldsets: ordena la ficha de cada solicitud en 3 secciones (Contacto, Material y Seguimiento DK).