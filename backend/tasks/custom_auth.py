# tasks/custom_auth.py
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from django.contrib.auth.models import AnonymousUser

class SimpleUser(AnonymousUser):
    def __init__(self, user_id=None):
        self.id = user_id
    @property
    def is_authenticated(self):
        return self.id is not None

class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        try:
            user_id = validated_token.get('user_id')
            if user_id is None:
                raise InvalidToken('Token contains no user_id')
            return SimpleUser(user_id=user_id)
        except Exception:
            raise InvalidToken('Could not retrieve user from token')