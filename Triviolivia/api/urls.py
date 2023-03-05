from django.urls import path 
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('questions/', views.QuestionList.as_view()),
    path('questions/<int:pk>/', views.QuestionDetail.as_view()),
    path('users/', views.UserList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)