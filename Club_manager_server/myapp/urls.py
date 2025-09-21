from django.urls import path, include
from rest_framework import routers
from .views import UserViewset, UserProfileView, RegisterView, LoginView, LogoutView, ClubAPIView, EventAPIView, MembershipAPIView, AnnouncementAPIView, PendingRequestAPIView, PendingRequestActionView


routers = routers.DefaultRouter()

routers.register(r'users', UserViewset)


urlpatterns = [
    path('', include(routers.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name ='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('clubs/', ClubAPIView.as_view(), name='club-api'),
    path('clubs/<int:pk>/', ClubAPIView.as_view(), name='club-api-detail'),
    path('events/', EventAPIView.as_view(), name='event-api'),
    path('events/<int:pk>/', EventAPIView.as_view(), name='event-api-detail'),
    path('announcements/', AnnouncementAPIView.as_view(), name='announcement-api'),
    path('announcements/<int:pk>/', AnnouncementAPIView.as_view(), name='announcement-api-detail'),
    path('memberships/', MembershipAPIView.as_view(), name='membership-api'),
    path('memberships/<int:pk>/', MembershipAPIView.as_view(), name='membership-api-detail'),
    path('pending-requests/', PendingRequestAPIView.as_view(), name='pending-request-api'),
    path('pending-requests/<int:pk>/', PendingRequestAPIView.as_view(), name='pending-request-api-detail'),
    path('pending-requests/<int:pk>/action/', PendingRequestActionView.as_view(), name='pending-request-action'),
]