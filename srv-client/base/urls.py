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
    path('courier/', views.courier_home, name='courier_home'),
    path('cook/', views.cook_home, name='cook_home'),
]