from django.urls import path
from .views import CheckoutView, ProductosView

urlpatterns = [
    path('productos/', ProductosView.as_view(), name='tienda-productos'),
    path('checkout/', CheckoutView.as_view(), name='tienda-checkout'),
]