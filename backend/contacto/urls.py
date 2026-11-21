from django.urls import path 
from .views import ConsultaCreateView

urlpatterns = [
    path('consultas/', ConsultaCreateView.as_view(), name='consulta-crear'),
]