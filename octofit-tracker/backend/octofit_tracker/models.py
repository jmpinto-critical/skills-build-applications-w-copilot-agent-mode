from djongo import models
from django.contrib.auth.models import AbstractUser

# User model
class User(AbstractUser):
    # Additional fields can be added here
    pass

# Team model
class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    members = models.ManyToManyField('User', related_name='teams')
    created_at = models.DateTimeField(auto_now_add=True)

# Activity model
class Activity(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=100)
    duration = models.PositiveIntegerField(help_text='Duration in minutes')
    date = models.DateField()
    team = models.ForeignKey('Team', on_delete=models.SET_NULL, null=True, blank=True, related_name='activities')

# Workout model
class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    suggested_for = models.ManyToManyField('User', related_name='suggested_workouts', blank=True)

# Leaderboard model (not a real collection, but for API aggregation)
# No DB model needed; handled in views/serializers
