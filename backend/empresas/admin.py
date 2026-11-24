from django.contrib import admin
from .models import SolicitudEmpresa

# Register your models here.
@admin.register(SolicitudEmpresa)
class SolictudEmpresaAdmin(admin.ModelAdmin):
    list_display = ('organizacion','tipo','comuna_region','nombre','estado','creada')
    list_filter = ('estado','tipo','creada')
    list_editable = ('estado',)
    search_fields = ('creada','actualizada')
    fieldsets = (
        ('Organización', {'fields': ('tipo', 'organizacion', 'comuna_region')}),
        ('Contacto', {'fields': ('nombre', 'cargo', 'correo', 'telefono', 'mensaje')}),
        ('Seguimiento DK', {'fields': ('estado', 'notas_internas', 'creada', 'actualizada')}),
    )