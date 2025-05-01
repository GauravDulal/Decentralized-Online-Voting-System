from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Candidate
from .serializers import CandidateSerializer

class CandidateList(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        candidates = Candidate.objects.all()
        serializer = CandidateSerializer(candidates, many=True)
        return Response(serializer.data)
