from rest_framework import generics, permissions
from rest_framework.throttling import ScopedRateThrottle
from .models import Colaboracion
from .serializers import ColaboracionSerializer

# Create your views here.
class ColaboracionCreateView(generics.CreateAPIView):
    """POST público: recibe solicitudes de colaboración 
    con residuos orgánicos."""

    queryset = Colaboracion.objects.all()
    serializer_class = ColaboracionSerializer
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'colaboraciones'
    