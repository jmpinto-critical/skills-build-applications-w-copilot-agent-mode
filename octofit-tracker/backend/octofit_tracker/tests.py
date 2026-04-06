from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from .models import User, Team, Activity, Workout

class UserTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_user_list(self):
        response = self.client.get(reverse('user-list'))
        self.assertEqual(response.status_code, 200)

class TeamTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.team = Team.objects.create(name='Test Team')
        self.team.members.add(self.user)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_team_list(self):
        response = self.client.get(reverse('team-list'))
        self.assertEqual(response.status_code, 200)

class ActivityTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.team = Team.objects.create(name='Test Team')
        self.activity = Activity.objects.create(user=self.user, activity_type='run', duration=30, date='2024-01-01', team=self.team)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_activity_list(self):
        response = self.client.get(reverse('activity-list'))
        self.assertEqual(response.status_code, 200)

class WorkoutTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.workout = Workout.objects.create(name='Pushups', description='Do pushups')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_workout_list(self):
        response = self.client.get(reverse('workout-list'))
        self.assertEqual(response.status_code, 200)

class LeaderboardTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.activity = Activity.objects.create(user=self.user, activity_type='run', duration=30, date='2024-01-01')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_leaderboard(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, 200)
