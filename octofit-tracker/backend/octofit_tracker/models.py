from djongo import models
from django.contrib.auth.models import AbstractUser

# User model
class User(AbstractUser):
    id = models.BigAutoField(primary_key=True)

# Team model - members stored as JSON list of usernames (avoids Djongo M2M issues)
class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    members = models.JSONField(default=list)

# Activity model - user stored as username string (avoids Djongo FK issues)
class Activity(models.Model):
    user = models.CharField(max_length=100)
    activity_type = models.CharField(max_length=100)
    duration = models.PositiveIntegerField(help_text='Duration in minutes')
    date = models.DateField()

# Leaderboard model
class Leaderboard(models.Model):
    user = models.CharField(max_length=100)
    score = models.IntegerField(default=0)

# Workout model - suggested_for stored as JSON list of usernames
class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    suggested_for = models.JSONField(default=list)
