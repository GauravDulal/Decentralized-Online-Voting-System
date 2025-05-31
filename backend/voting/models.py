from django.db import models
from django.contrib.auth.models import User

# Model representing a candidate in the election
class Candidate(models.Model):
    name = models.CharField(max_length=100)  # Candidate's name
    wallet_address = models.CharField(max_length=42)  # Ethereum wallet address (42 characters)

# Model representing a voter (linked to Django's User)
class Voter(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Link to User model, one-to-one
    voted = models.BooleanField(default=False)  # Indicates if the voter has already voted

# Model to log each vote transaction
class VoteLog(models.Model):
    voter = models.ForeignKey(Voter, on_delete=models.CASCADE)  # Reference to the voter
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)  # Reference to the candidate
    tx_hash = models.CharField(max_length=66)  # Blockchain transaction hash (66 characters for Ethereum)
    timestamp = models.DateTimeField(auto_now_add=True)  # Timestamp when the vote was cast
