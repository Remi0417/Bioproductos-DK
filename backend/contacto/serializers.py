from rest_framework import serializers
from .models import Consulta

class ConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consulta
        fields = ['id','nombre','correo','telefono','tema','mensaje','creada']
        read_only_fields = ['id', 'creada']
        # la variable estado no está en fields a propósito: así un visitante no puede enviar su consulta marcada como “respondida"