from django.urls import path
from .views import RegisterView, VoteView, AddCandidateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Define URL patterns for the voting app
urlpatterns = [
    # User registration endpoint
    path('register/', RegisterView.as_view(), name='register'),  
    # JWT token obtain endpoint (login)
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # JWT token refresh endpoint
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Endpoint for casting a vote
    path('vote/', VoteView.as_view(), name='vote'),

    # Endpoint for adding a new candidate
    path('add-candidate/', AddCandidateView.as_view(), name='add_candidate')
]
