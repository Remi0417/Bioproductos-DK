from rest_framework import serializers
from .models import Colaboracion

class ColaboracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colaboracion
        fields = [
            'id','nombre','correo','telefono','material','detalle_material','origen','comuna',
            'cantidad_aproximada','frecuencia','puede_separar','comentario','acepta_condiciones','creada',
        ]
        read_only_fields = ['id','creada']
        extra_kwargs = {'acepta_condiciones': {'required': True}}

    def validate_acepta_condiciones(self, value):
        if not value:
            raise serializers.ValidationError('Debes aceptar que la recepción requiere evaluación y coordinación previa.')
        return value

    def validate(self, data):
        if data.get('material') == Colaboracion.Material.OTRO and not data.get('detalle_material', '').strip():
            raise serializers.ValidationError({'detalle_material': 'Cuéntanos qué material es.'})
        return data

#validate_acepta_condiciones: rechaza la solicitud si no se marcó la casilla de condiciones.
#required: True: sin esto, si el campo no viene en el envío, Django usaría False por defecto sin ejecutar la validación anterior.
#validate: revisa dos campos juntos. Si el material es "Otro", detalle_material es obligatorio.
#estado y notas_internas: no están en fields, igual que en contacto. Solo el equipo los cambia desde el admin.
