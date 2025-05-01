from django.db import models
from django.contrib.auth.models import User

class Candidate(models.Model):
    name = models.CharField(max_length=100)
    wallet_address = models.CharField(max_length=42)  # Ethereum address

class Voter(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    voted = models.BooleanField(default=False)

class VoteLog(models.Model):
    voter = models.ForeignKey(Voter, on_delete=models.CASCADE)
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    tx_hash = models.CharField(max_length=66)
    timestamp = models.DateTimeField(auto_now_add=True)
