from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CustomUser, Club, Event, Membership, Announcement, PendingRequest
from .serializers import UserSerializer,ClubSerializer, EventSerializer, MembershipSerializer, AnnouncementSerializer, PendingRequestSerializer
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate


# Create your views here.

#handles all CRUD operations for CustomUser
class UserViewset(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    
class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        user = CustomUser.objects.create_user(
            username=username,
            password=password,
            email=email
        )

        # create token manually
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            "message": "User created successfully",
            "token": token.key
        }, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            token,_ = Token.objects.get_or_create(user=user)
            
            return Response({"messsage":"Valid User!","token": token.key}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        request.user.auth_token.delete()
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
    
class ClubAPIView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = ClubSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Club created successfully!", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        clubs = Club.objects.all()
        serializer = ClubSerializer(clubs, many=True)
        return Response({"clubs" : serializer.data})
    
    def patch(self, request, pk):
        try:
            club = Club.objects.get(pk=pk)
        except Club.DoesNotExist:
            return Response({"error": "Club not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ClubSerializer(club, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Club updated successfully!", "data": serializer.data},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class EventAPIView(APIView):
    def get(self, request):
        return Response({"message": "Event API is working!"})
    

class MembershipAPIView(APIView):
    def get(self, request):
        return Response({"message": "Membership API is working!"})
    
    
class AnnouncementAPIView(APIView):
    def get(self, request):
        return Response({"message": "Announcement API is working!"})


class PendingRequestAPIView(APIView):
    def get(self, request):
        return Response({"message": "Pending Request API is working!"})
    
