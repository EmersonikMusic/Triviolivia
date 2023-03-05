from rest_framework import serializers
from configure.models import *
from django.contrib.auth.models import User

class QuestionSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name')
    difficulty_name = serializers.CharField(source='difficulty.name')

    class Meta:
        model = Question
        fields = ['id', 'text', 'answer', 'category_name', 'difficulty_name', 'eras']
        filter_fields = ('category', 'era', 'difficulty')
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        filter_fields = ('id', 'username', 'email')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        filter_fields = ('name',)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        filter_fields = ('name',)

class DifficultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Difficulty
        fields = '__all__'
        filter_fields = ('name',)

class EraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Era
        fields = '__all__'
        filter_fields = ('name',)