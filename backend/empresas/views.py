from rest_framework import generics, permissions
from rest_framework.throttling import ScopedRateThrottle
from .models import SolicitudEmpresa
from .serializers import SolicitudEmpresaSerializer

# Create your views here.
class SolicitudEmpresaCreateView(generics.CreateAPIView):
    """POST público: recibe consultas comerciales de la página Empresas."""

    queryset = SolicitudEmpresa.objects.all()
    serializer_class = SolicitudEmpresaSerializer
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'empresas'