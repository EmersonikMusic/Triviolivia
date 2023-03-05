from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Category)
admin.site.register(Subcategory)
admin.site.register(Difficulty)
admin.site.register(Era)
admin.site.register(Tags)
admin.site.register(Question)
