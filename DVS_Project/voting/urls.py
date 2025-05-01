from django.urls import path
from .views import CandidateList

urlpatterns = [
    path('candidates/', CandidateList.as_view()),
]
