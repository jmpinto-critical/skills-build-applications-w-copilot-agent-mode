from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from .models import User, Team, Activity, Workout
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, WorkoutSerializer
from django.db.models import Sum

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['GET'])
def leaderboard(request):
    # Aggregate total duration per user
    leaderboard = (
        Activity.objects.values('user__username')
        .annotate(total_duration=Sum('duration'))
        .order_by('-total_duration')[:10]
    )
    return Response(list(leaderboard))
