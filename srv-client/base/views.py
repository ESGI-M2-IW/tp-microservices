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

    return render(request, 'base/base_customer.html')

@login_required
def courier_home(request):
    user = request.user
    if user.role != 'courier':
        return redirect('home')

    return render(request, 'base/base_courier.html')

@login_required
def cook_home(request):
    user = request.user
    if user.role != 'cook':
        return redirect('home')

    return render(request, 'base/base_cook.html')
