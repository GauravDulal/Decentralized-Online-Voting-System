from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Candidate

# Serializer for user registration
class RegisterSerializer(serializers.ModelSerializer): 
    password = serializers.CharField(write_only=True)  # Ensure password is write-only

    class Meta:
        model = User  # Use Django's built-in User model
        fields = ['username', 'password']  # Only expose username and password fields

    def create(self, validated_data):
        # Create a new user with the provided username and password
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

# Serializer for Candidate model
class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate  # Use the custom Candidate model
        fields = '__all__'  # Serialize all fields of the Candidate model