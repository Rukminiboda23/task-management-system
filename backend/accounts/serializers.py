# accounts/serializers.py

from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    # We make the password write_only, so it's never sent back in an API response
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        # We only need username and password to create a user
        fields = ('username', 'password')

    def create(self, validated_data):
        try:
            user = User.objects.create_user(
                username=validated_data['username'],
                password=validated_data['password']
            )
            return user
        except Exception as e:
            # This helps in debugging if user creation fails for other reasons
            raise serializers.ValidationError({"detail": str(e)})