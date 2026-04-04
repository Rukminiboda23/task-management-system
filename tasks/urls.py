# tasks/urls.py

from django.urls import path
from .views import TaskListCreate

urlpatterns = [
    path('tasks/', TaskListCreate.as_view(), name='task-list-create'),
    # This line handles the GET (single) and DELETE requests
    path('tasks/<str:id>/', TaskListCreate.as_view(), name='task-detail'),
]