from rest_framework import generics, permissions
from rest_framework.throttling import ScopedRateThrottle
from .models import Consulta
from .serializers import ConsultaSerializer

# Create your views here.
class ConsultaCreateView(generics.CreateAPIView):
    "POST publico: recibe consultas del formulario de contactos"
    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer
    permission_classes = [permissions.AllowAny] #No requiere login (Sin JMT)
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'contacto' #usa el limite '5/minute' de settings

# Importante: CreateAPIView solo permite crear consultas. Nadie puede leer, 
# editar ni borrar las de otros desde la API; eso queda solo en el admin.