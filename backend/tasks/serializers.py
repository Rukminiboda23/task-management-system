# tasks/serializers.py

from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            '_id',  # Use _id to match what the frontend expects
            'title', 'description', 'priority', 'category', 'due_date', 
            'status', 'created_at', 'updated_at'
        ]
        # It's better to use 'id' but let's stick with _id to match your frontend
        extra_kwargs = {
            '_id': {'source': 'id', 'read_only': True}
        }