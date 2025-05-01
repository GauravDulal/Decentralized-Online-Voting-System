from rest_framework import serializers
from .models import Candidate, Voter, VoteLog

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = '__all__'
