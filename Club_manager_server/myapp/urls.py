from django.urls import path, include
from rest_framework import routers
from .views import UserViewset, RegisterView, LoginView, ClubAPIView, EventAPIView, MembershipAPIView, AnnouncementAPIView, PendingRequestAPIView


routers = routers.DefaultRouter()

routers.register(r'users', UserViewset)


urlpatterns = [
    path('', include(routers.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name ='login'),
    path('clubs/', ClubAPIView.as_view(), name='club-api'),
    path('events/', EventAPIView.as_view(), name='event-api'),
    path('memberships/', MembershipAPIView.as_view(), name='membership-api'),
    path('announcements/', AnnouncementAPIView.as_view(), name='announcement-api'),
    path('pending-requests/', PendingRequestAPIView.as_view(), name='pending-request-api'),
]