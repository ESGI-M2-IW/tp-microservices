import requests
from django.conf import settings
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import CustomUser
from rest_framework_api_key.permissions import HasAPIKey

from base.forms import LoginForm
from .serializers import CustomUserSerializer


@api_view(["GET"])
@permission_classes([HasAPIKey])
def users_list(request):
    users = CustomUser.objects.all()
    serializer = CustomUserSerializer(users, many=True)
    return Response({"users": serializer.data})


def login_user(request):
    form = LoginForm(request.POST or None)
    if form.is_valid():
        user = authenticate(request, username=form.cleaned_data['username'], password=form.cleaned_data['password'])
        if user:
            login(request, user)
            return redirect(home)

        messages.error(request, "Utilisateur ou mot de passe incorrect")

    return render(request, 'base/login.html', {"form": form})


def logout_user(request):
    logout(request)
    messages.success(request, "Vous avez bien été déconnecté")
    return redirect(login_user)


@login_required
def home(request):
    if request.user.role == 'customer':
        return redirect('customer_home')
    if request.user.role == 'courier':
        return redirect('courier_home')
    if request.user.role == 'cook':
        return redirect('cook_home')

@login_required
def customer_home(request):
    user = request.user
    if user.role != 'customer':
        return redirect('home')

    try:
        plates_call = requests.get(f"{settings.API_BASE_URL}/cuisine/plates")
        plates_call.raise_for_status()
        plates = plates_call.json()
        return render(request, 'base/plates_list.html', {'plates': plates})
    except requests.exceptions.RequestException as e:
        messages.error(request, "Impossible de récupérer la liste des plats")
        print(e)

    return render(request, 'base/plates_list.html')

@login_required
def customer_plates(request):
    user = request.user
    if user.role != 'customer':
        return redirect('home')

    return render(request, 'base/customer_orders.html')

@login_required
def courier_home(request):
    user = request.user
    if user.role != 'courier':
        return redirect('home')

    try:
        deliveries_call = requests.get(f"{settings.API_BASE_URL}/deliveries")
        deliveries_call.raise_for_status()
        response = deliveries_call.json()
        deliveries = [delivery for delivery in response if delivery['idCourier'] == user.id]
        return render(request, 'base/my_deliveries.html', {'deliveries': deliveries})
    except requests.exceptions.RequestException:
        messages.error(request, "Impossible de récupérer la liste des plats")

    return render(request, 'base/my_deliveries.html', {'deliveries': []})

@login_required
def courier_list(request):
    user = request.user
    if user.role != 'courier':
        return redirect('home')

    try:
        deliveries_call = requests.get(f"{settings.API_BASE_URL}/deliveries")
        deliveries_call.raise_for_status()
        deliveries = deliveries_call.json()
        return render(request, 'base/deliveries_list.html', {'deliveries': deliveries})
    except requests.exceptions.RequestException:
        messages.error(request, "Impossible de récupérer la liste des plats")

    return render(request, 'base/deliveries_list.html', {'deliveries': []})

@login_required
def cook_home(request):
    user = request.user
    if user.role != 'cook':
        return redirect('home')

    return render(request, 'base/my_orders.html')

@login_required
def cook_list(request):
    user = request.user
    if user.role != 'cook':
        return redirect('home')

    return render(request, 'base/orders_list.html')
