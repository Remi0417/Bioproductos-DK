from django.contrib import admin
from .models import Consulta

# Register your models here.
@admin.register(Consulta)
class ConsultaAdmin(admin.ModelAdmin):
    list_display = ('nombre','correo','tema','estado','creada') # las columnas que se ven en la lista.
    list_filter = ('estado', 'tema', 'creada') # los filtros del costado.
    list_editable = ('estado',) # deja cambiar el estado directo desde la lista.
    search_fields = ('nombre', 'correo', 'mensaje') # activa el buscador.
    readonly_fields = ('creada', 'actualizada') # las fechas no se pueden editar a mano.

