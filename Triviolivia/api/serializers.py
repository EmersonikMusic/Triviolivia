from rest_framework import serializers
from configure.models import *
from django.contrib.auth.models import User

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
        filter_fields = ('category', 'era', 'difficulty')
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        filter_fields = ('id', 'username', 'email')