from django.urls import include, path
from rest_framework import routers

from base import views


urlpatterns = [
    path('login/', views.login_user, name='login_user'),
    path('logout/', views.logout_user, name='logout_user'),
    path('', views.home, name='home'),
    path('api/users', views.users_list, name='users_list'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('customer/', views.customer_home, name='customer_home'),
    path('customer/orders', views.customer_plates, name='customer_orders'),
    path('customer/orders/<int:id>', views.plate_details, name='plate_details'),
    path('courier/', views.courier_home, name='courier_home'),
    path('courier/orders/<int:id>', views.courier_plate_details, name='courier_plate_details'),
    path('couriers/', views.courier_list, name='courier_list'),
    path('cook/', views.cook_home, name='cook_home'),
    path('cooks/', views.cook_list, name='cook_list'),
    path('cook/orders/<int:id>', views.cook_plate_details, name='cook_plate_details'),
]