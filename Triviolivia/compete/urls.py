from django.contrib import admin
from django.urls import path, include
from . import views

app_name = 'compete'
urlpatterns = [
    path('',views.main, name='main'),
    path('create',views.create, name='create'),
    path('<str:uuid>',views.game, name='game'),
]
