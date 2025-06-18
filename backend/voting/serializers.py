from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Candidate, Voter  # Make sure to import Voter

# Serializer for user registration
class RegisterSerializer(serializers.ModelSerializer): 
    password = serializers.CharField(write_only=True)  # Ensure password is write-only

    class Meta:
        model = User  # Use Django's built-in User model
        fields = ['username', 'password']  # Only expose username and password fields

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        Voter.objects.create(user=user)  # Automatically create a Voter
        return user

# Serializer for Candidate model
class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate  # Use the custom Candidate model
        fields = '__all__'  # Serialize all fields of the Candidate model
