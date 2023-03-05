from django.db import models
from configure.models import *

# Create your models here.

class Team(models.Model):
    name = models.CharField(max_length=64, unique=True)
    members = models.ManyToManyField(User, related_name="members_on_team")
    current_game_score = models.IntegerField(default=0)
    total_wins = models.IntegerField(default=0)
    total_games_played = models.IntegerField(default=0)
    temporarily_banned_categories = models.ManyToManyField(Category, related_name="temporarily_banned_team_categories")
    temporarily_banned_difficulties = models.ManyToManyField(Difficulty, related_name="temporarily_banned_team_difficulties")
    temporarily_banned_eras = models.ManyToManyField(Era, related_name="temporarily_banned_team_eras")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="team_created_by_user")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        verbose_name_plural = "Teams"

class Game(models.Model):
    name = models.CharField(max_length=64, unique=True)
    uuid = models.CharField(max_length=64)
    teams = models.ManyToManyField(Team, related_name="games")
    description = models.CharField(max_length=256, blank=True, null=True)
    banned_categories = models.ManyToManyField(Category, related_name="banned_game_categories")
    time_per_question = models.IntegerField(default=30)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="games")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)
    all_users = models.ManyToManyField(User, related_name="all_users")
    teams_finalized = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        verbose_name_plural = "Games"