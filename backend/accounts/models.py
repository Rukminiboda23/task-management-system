from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    id = None
    class Meta:
        db_table = 'auth_user'