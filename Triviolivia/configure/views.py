from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.urls import reverse, reverse_lazy
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import viewsets
from rest_framework import permissions

from django.db import IntegrityError

from .models import *

import pandas as pd

# Create your views here.

@login_required
def main(request):

    context = {
        'categories': Category.objects.all()[:25],
        'eras': Era.objects.all()[:25],
        'difficulties': Difficulty.objects.all()[:25],
        'questions': Question.objects.all()[:25],
    }
    return render(request, 'configure/main.html',context)

class QuestionListView(ListView):
    model = Question
    template_name = 'configure/question_list.html'
    context_object_name = 'questions'
    paginate_by = 25

class QuestionCreateView(LoginRequiredMixin, CreateView):
    model = Question
    template_name = 'configure/question_create.html'
    fields = ['text', 'answer','category', 'eras', 'difficulty', ]


    def get_success_url(self):
        return reverse('configure:question-list')
    
    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)
    
def batch(request):

    df=pd.read_csv('trivia_questions2.csv',sep=',')

    for q in range(6600,len(df)):
        if q==1:
            q=2500
        question, created = Question.objects.get_or_create(text=df.iloc[q][4],
                                                  defaults={'answer':df.iloc[q][5],
                                                            'category':Category.objects.get(name=df.iloc[q][1]),
                                                            'difficulty':Difficulty.objects.get(score=int(df.iloc[q][2])),
                                                            'author':request.user,
                                                            })

        era_list = df.iloc[q][3].split(', ')
        for era in era_list:
            print(str(q)+'. '+question.text+' - '+era)
            question.eras.add(Era.objects.get(name=era))
        

    context={}

    return render(request, 'configure/question_batch.html',context)

class QuestionUpdateView(UpdateView):
    model = Question
    template_name = 'configure/question_update.html'
    fields = ['text', 'answer','category', 'eras', 'difficulty',]
    success_url =  reverse_lazy('configure:question-list')

class QuestionDeleteView(DeleteView):
    model = Question
    template_name = 'configure/question_delete.html'
    success_url =  reverse_lazy('configure:question-list')

class CategoryListView(ListView):
    model = Category
    template_name = 'configure/category_list.html'
    context_object_name = 'categories'
    paginate_by = 25

class CategoryDetailView(DetailView):
    model = Category
    template_name = 'configure/category_detail.html'
    context_object_name = 'category'

class CategoryCreateView(CreateView):
    model = Category
    template_name = 'configure/category_create.html'
    fields = ['name', 'description']

    def get_success_url(self):
        return reverse('configure:category-list')

class CategoryUpdateView(UpdateView):
    model = Category
    template_name = 'configure/category_update.html'
    fields = ['name', 'description']
    success_url =  reverse_lazy('configure:category-list')

class CategoryDeleteView(DeleteView):
    model = Category
    template_name = 'configure/category_delete.html'
    success_url =  reverse_lazy('configure:category-list')

class EraListView(ListView):
    model = Era
    template_name = 'configure/era_list.html'
    context_object_name = 'eras'
    paginate_by = 25

class EraCreateView(CreateView):
    model = Era
    template_name = 'configure/era_create.html'
    fields = ['name', 'description']

    def get_success_url(self):
        return reverse('configure:era-list')

class EraUpdateView(UpdateView):
    model = Era
    template_name = 'configure/era_update.html'
    fields = ['name', 'description']
    success_url =  reverse_lazy('configure:era-list')

class EraDeleteView(DeleteView):
    model = Era
    template_name = 'configure/era_delete.html'
    success_url =  reverse_lazy('configure:era-list')

class DifficultyListView(ListView):
    model = Difficulty
    template_name = 'configure/difficulty_list.html'
    context_object_name = 'difficulties'
    paginate_by = 25

class DifficultyCreateView(CreateView):
    model = Difficulty
    template_name = 'configure/difficulty_create.html'
    fields = ['name', 'description','score']

    def get_success_url(self):
        return reverse('configure:difficulty-list')

class DifficultyUpdateView(UpdateView):
    model = Difficulty
    template_name = 'configure/difficulty_update.html'
    fields = ['name', 'description']
    success_url =  reverse_lazy('configure:difficulty-list')

class DifficultyDeleteView(DeleteView):
    model = Difficulty
    template_name = 'configure/difficulty_delete.html'
    success_url =  reverse_lazy('configure:difficulty-list')
