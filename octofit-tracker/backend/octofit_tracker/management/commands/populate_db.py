from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        for team in Team.objects.all():
            if team.id is not None:
                team.delete()
        for user in User.objects.all():
            if user.id is not None and not user.is_superuser:
                user.delete()

        # Create Users (Marvel)
        User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password', first_name='Tony', last_name='Stark')
        User.objects.create_user(username='captainamerica', email='cap@marvel.com', password='password', first_name='Steve', last_name='Rogers')
        User.objects.create_user(username='spiderman', email='spiderman@marvel.com', password='password', first_name='Peter', last_name='Parker')
        # Create Users (DC)
        User.objects.create_user(username='batman', email='batman@dc.com', password='password', first_name='Bruce', last_name='Wayne')
        User.objects.create_user(username='superman', email='superman@dc.com', password='password', first_name='Clark', last_name='Kent')
        User.objects.create_user(username='wonderwoman', email='wonderwoman@dc.com', password='password', first_name='Diana', last_name='Prince')

        # Create Teams (members as list of usernames)
        Team.objects.create(name='Marvel', members=['ironman', 'captainamerica', 'spiderman'])
        Team.objects.create(name='DC', members=['batman', 'superman', 'wonderwoman'])

        # Create Activities
        today = timezone.now().date()
        Activity.objects.create(user='ironman', activity_type='Run', duration=30, date=today)
        Activity.objects.create(user='captainamerica', activity_type='Swim', duration=45, date=today)
        Activity.objects.create(user='spiderman', activity_type='Climb', duration=60, date=today)
        Activity.objects.create(user='batman', activity_type='Martial Arts', duration=90, date=today)
        Activity.objects.create(user='superman', activity_type='Fly', duration=120, date=today)
        Activity.objects.create(user='wonderwoman', activity_type='Yoga', duration=50, date=today)

        # Create Leaderboard entries
        Leaderboard.objects.create(user='superman', score=120)
        Leaderboard.objects.create(user='batman', score=90)
        Leaderboard.objects.create(user='spiderman', score=60)
        Leaderboard.objects.create(user='wonderwoman', score=50)
        Leaderboard.objects.create(user='captainamerica', score=45)
        Leaderboard.objects.create(user='ironman', score=30)

        # Create Workouts (suggested_for as list of usernames)
        Workout.objects.create(name='Hero HIIT', description='High intensity interval training for heroes', suggested_for=['ironman', 'batman'])
        Workout.objects.create(name='Power Yoga', description='Yoga for strength and flexibility', suggested_for=['wonderwoman', 'captainamerica'])
        Workout.objects.create(name='Wall Crawl', description='Spider-inspired wall climbing workout', suggested_for=['spiderman'])
        Workout.objects.create(name='Super Flight Training', description='Aerial maneuvers and endurance', suggested_for=['superman'])

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
