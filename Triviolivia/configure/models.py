from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=64, unique=True)
    description = models.CharField(max_length=256, blank=True, null=True)

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        verbose_name_plural = "Categories"

class Subcategory(models.Model):
    name = models.CharField(max_length=64, unique=True)
    description = models.CharField(max_length=256, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="subcategories")

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        verbose_name_plural = "Subcategories"

class Difficulty(models.Model):
    name = models.CharField(max_length=64, unique=True)
    description = models.CharField(max_length=256, blank=True, null=True)
    score = models.IntegerField()

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        verbose_name_plural = "Difficulties"

class Era(models.Model):
    name = models.CharField(max_length=64, unique=True)
    description = models.CharField(max_length=256, blank=True, null=True)

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        verbose_name_plural = "Eras"

class Tags(models.Model):
    name = models.CharField(max_length=64, unique=True)
    description = models.CharField(max_length=256, blank=True, null=True)

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        verbose_name_plural = "Tags"

class Question(models.Model):
    name = models.CharField(max_length=64, unique=True,blank=True, null=True)
    text = models.CharField(max_length=256, unique=True)
    response = models.CharField(max_length=256,blank=True, null=True)
    answer = models.CharField(max_length=256)
    score = models.IntegerField(blank=True, null=True)
    difficulty = models.ForeignKey(Difficulty, on_delete=models.CASCADE, related_name="questions")
    eras= models.ManyToManyField(Era, related_name="questions_for_era")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="questions")
    tags = models.ManyToManyField(Tags, related_name="questions")
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        verbose_name_plural = "Questions"