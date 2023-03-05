from django.shortcuts import render, redirect
import random
import string

from .models import *

# Create your views here.

def main(request):
    return render(request, 'compete/main.html')

def create(request):

    if request.method == 'POST':
        game = Game()
        game.name = request.POST.get('name')
        active_games_uuids = [game.uuid for game in Game.objects.filter(active=True)]
        game.uuid = ''.join(random.choices(string.ascii_uppercase, k=5))
        game.created_by = request.user
        while game.uuid in active_games_uuids:
            game.uuid = ''.join(random.choices(string.ascii_uppercase, k=5))
        game.save()
        game.all_users.add(request.user)
        return redirect('compete:game', uuid=game.uuid)

        
    return render(request, 'compete/create.html')

def game(request, uuid):
    game = Game.objects.get(uuid=uuid, active=True)
    return render(request, 'compete/game.html', {'game':game})