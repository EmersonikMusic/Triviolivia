from django.shortcuts import  render, redirect, get_object_or_404
from django.urls import reverse
from django.http import Http404, HttpResponseRedirect

from django.contrib.auth import login, authenticate, logout
from django.contrib import messages

from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.forms.formsets import formset_factory

from django.db import transaction

from django.views.generic.edit import CreateView

import pandas as pd

from .models import *
from .forms import *

# Create your views here.


@login_required
def entry(request):


        
    return render(request, 'entry.html',)


def main(request):


    context = {

    }

    return render(request,'main.html', context)


def choice_options(request):

	context={
	}

	return render(request, "questionform.html", context)

def register_request(request):
	if request.method == "POST":
		form = NewUserForm(request.POST)
		if form.is_valid():
			user = form.save()
			login(request, user)
			messages.success(request, "Registration successful." )
			return redirect("main")
		messages.error(request, "Unsuccessful registration. Invalid information.")
	form = NewUserForm()
	return render (request=request, template_name="register.html", context={"register_form":form})

def login_request(request):
	if request.method == "POST":
		form = AuthenticationForm(request, data=request.POST)
		if form.is_valid():
			username = form.cleaned_data.get('username')
			password = form.cleaned_data.get('password')
			user = authenticate(username=username, password=password)
			if user is not None:
				login(request, user)
				messages.info(request, f"You are now logged in as {username}.")
				return redirect("main")
			else:
				messages.error(request,"Invalid username or password.")
		else:
			messages.error(request,"Invalid username or password.")
	form = AuthenticationForm()
	return render(request=request, template_name="login.html", context={"login_form":form})\

def logout_request(request):
	logout(request)
	messages.info(request, "You have successfully logged out.") 
	return redirect("main")