from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .eth_interface import cast_vote
from .models import Candidate, Voter, VoteLog
from django.contrib.auth.models import User
from django.conf import settings
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from .serializers import CandidateSerializer
from .serializers import RegisterSerializer

print("🔥 VoteView module loaded")


class VoteView(APIView):
    # Only authenticated users can access this view
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Handles the voting process for a candidate.
        Expects 'candidate_id', 'wallet', and 'private_key' in the request data.
        """
        try:
            # Get candidate ID from request data
            candidate_id = request.data.get("candidate_id")
            # Fetch the candidate object from the database
            candidate = Candidate.objects.get(id=candidate_id)

            # Get the voter object associated with the current user
            voter = Voter.objects.get(user=request.user)
            # Check if the voter has already voted
            if voter.voted:
                return Response({"error": "Already voted"}, status=400)

            # Get the voter's wallet address and private key from request data
            # (In production, private key handling should be more secure)
            voter_wallet = request.data.get("wallet")
            private_key = request.data.get("private_key")

            # Call the Ethereum interface to cast the vote on the blockchain
            tx_hash = cast_vote(candidate.id, voter_wallet, private_key)

            # Log the vote in the database
            VoteLog.objects.create(
                voter=voter,
                candidate=candidate,
                tx_hash=tx_hash
            )
            # Mark the voter as having voted
            voter.voted = True
            voter.save()

            # Return the transaction hash as a response
            return Response({"tx_hash": tx_hash})
        except Candidate.DoesNotExist:
            # Handle the case where the candidate does not exist
            return Response({"error": "Candidate not found"}, status=404)
        
class AddCandidateView(APIView):
    # Only admin users can add candidates
    permission_classes = [IsAdminUser]

    def post(self, request):
        """
        Adds a new candidate to the election.
        Expects candidate data in the request.
        """
        serializer = CandidateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Return the created candidate data
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # Return validation errors if any
        return Response(serializer.errors, status=400)


class RegisterView(APIView):
    def post(self, request):
        """
        Registers a new user.
        Expects user registration data in the request.
        """
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Return a success message upon successful registration
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        # Return validation errors if registration fails
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)