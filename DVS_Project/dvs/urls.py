from django.http import HttpResponse
from django.urls import path, include
from django.contrib import admin

def home(request):
    return HttpResponse("Decentralized Voting System is Running!")

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include('voting.urls')),  # includes token endpoints
]