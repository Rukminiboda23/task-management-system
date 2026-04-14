# tasks/models.py

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Task(models.Model):

    # --- CHOICES for choice fields ---
    class Priority(models.TextChoices):
        LOW = 'low', 'Low'
        MEDIUM = 'medium', 'Medium'
        HIGH = 'high', 'High'

    class Category(models.TextChoices):
        WORK = 'work', 'Work'
        PERSONAL = 'personal', 'Personal'
        STUDY = 'study', 'Study'

    class Status(models.TextChoices):
        TODO = 'todo', 'To Do'
        IN_PROGRESS = 'in_progress', 'In Progress'
        DONE = 'done', 'Done'

    # --- Existing Fields ---
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False) # We will keep this for the checkbox, but status is more descriptive
    created_at = models.DateTimeField(auto_now_add=True)

    # --- NEW Fields ---
    priority = models.CharField(max_length=10, choices=Priority.choices, default=Priority.MEDIUM)
    due_date = models.DateField(null=True, blank=True)
    category = models.CharField(max_length=10, choices=Category.choices, default=Category.PERSONAL)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.TODO)
    updated_at = models.DateTimeField(auto_now=True)
    comments = models.TextField(blank=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['owner', '-created_at']),
        ]

    def __str__(self):
        return self.title