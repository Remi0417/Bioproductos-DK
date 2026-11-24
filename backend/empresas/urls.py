from django.urls import path
from .views import SolicitudEmpresaCreateView

urlpatterns = [
    path('', SolicitudEmpresaCreateView.as_view(),name='solicitud-empresa-crear')
]