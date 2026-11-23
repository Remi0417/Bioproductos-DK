from django.urls import path
from .views import ColaboracionCreateView

urlpatterns = [
    path('', ColaboracionCreateView.as_view(),name='colaboracion-crear'),
]