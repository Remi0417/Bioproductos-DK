from rest_framework import serializers
from .models import SolicitudEmpresa

class SolicitudEmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolicitudEmpresa
        fields = ['id','tipo','organizacion','comuna_region','nombre','cargo','correo','telefono','mensaje','creada',]
        read_only_fields = ['id','creada']
        