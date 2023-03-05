from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from . import views
from .views import *

app_name = 'configure'
urlpatterns = [
    path('', views.main, name='main'),
    
    path('question/', QuestionListView.as_view(), name='question-list'),
    path('question/create/', QuestionCreateView.as_view(), name='question-create'),
    path('question/batch/', views.batch, name='question-batch'),
    path('question/<int:pk>/update/', QuestionUpdateView.as_view(), name='question-update'),
    path('question/<int:pk>/delete/', QuestionDeleteView.as_view(), name='question-delete'),
    
    path('category/', CategoryListView.as_view(), name='category-list'),
    path('category/create/', CategoryCreateView.as_view(), name='category-create'),
    path('category/<int:pk>/update/', CategoryUpdateView.as_view(), name='category-update'),
    path('category/<int:pk>/delete/', CategoryDeleteView.as_view(), name='category-delete'),

    path('era/', EraListView.as_view(), name='era-list'),
    path('era/create/', EraCreateView.as_view(), name='era-create'),
    path('era/<int:pk>/update/', EraUpdateView.as_view(), name='era-update'),
    path('era/<int:pk>/delete/', EraDeleteView.as_view(), name='era-delete'),

    path('difficulty/', DifficultyListView.as_view(), name='difficulty-list'),
    path('difficulty/create/', DifficultyCreateView.as_view(), name='difficulty-create'),
    path('difficulty/<int:pk>/update/', DifficultyUpdateView.as_view(), name='difficulty-update'),
    path('difficulty/<int:pk>/delete/', DifficultyDeleteView.as_view(), name='difficulty-delete'),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
