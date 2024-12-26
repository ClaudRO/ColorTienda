from django.urls import path
from . import views
from django.contrib.auth import views as auth_views


urlpatterns = [ 
    path('', views.index, name='index'),  
    path('logros/', views.logros, name='logros'),  
    path('nosotros/', views.nosotros, name='nosotros'),
    path('carrito/', views.carrito, name='carrito'),
    path('pago/', views.pago, name='pago'),
    path('crud/', views.crud, name='crud'),
    path('productos/', views.product_list, name='product_list'),
    path('contacto/', views.contact_view, name='contacto'),
    path('add_product/', views.add_product, name='add_product'),
    path('edit_product/<int:product_id>/', views.edit_product, name='edit_product'),
    path('delete_product/<int:product_id>/', views.delete_product, name='delete_product'),
    path('register/', views.register_view, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('seguimiento/', views.seguimiento, name='seguimiento'),
    path('iniciar_pago/', views.iniciar_pago, name='iniciar_pago'),
    path('confirmar_pago/', views.confirmar_pago, name='confirmar_pago'),
    path('resultado_pago/', views.resultado_pago, name='resultado_pago'),
    path('tipo_pagos/', views.tipo_pagos, name='tipo_pagos')
    
    ]

