from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CustomUser, Club, Event, Membership, Announcement, PendingRequest
from .serializers import UserSerializer, ClubSerializer, EventSerializer, MembershipSerializer, AnnouncementSerializer, PendingRequestSerializer
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from .custom_permission import ClubPermission


# Create your views here.

#handles all CRUD operations for CustomUser
class UserViewset(viewsets.ModelViewSet):# for testing purpose only
    permission_classes = [AllowAny]
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    
# retrieves profile of logged-in user
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]  # Only logged-in users can access

    def get(self, request):
        serializer = UserSerializer(request.user)  # pass the user object directly
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)

# handles user registration and Token generation 
class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else :
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "message": "User created successfully",
                "token": token.key
            }, status=status.HTTP_201_CREATED)
      
# handles user login and Token generation or fetching existing token
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

# handles user logout by deleting the token
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        request.user.auth_token.delete()
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
 
 
 
# Club API Views
# handles CRUD operations for Club    
class ClubAPIView(APIView):
    def permission_classes(self):
        if self.request.method in ['POST', 'PATCH', 'DELETE']:
            return [IsAuthenticated()]
        return [AllowAny()]
    
    
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
    
    def delete(self, request, pk):
        try:
            club = Club.objects.get(pk=pk)
        except Club.DoesNotExist:
            return Response({"error": "Club not found"}, status=status.HTTP_404_NOT_FOUND)

        club.delete()
        return Response({"message": "Club deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
    
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

# handles CRUD operations for Event    
class EventAPIView(APIView):
    permission_classes = [ClubPermission ]
    
    def post(self, request):
        serializer = EventSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Event created successfully!", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many= True)
        return Response({"events": serializer.data})
    
    def delete(self, request, pk):
        try:
            event = Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
        event.delete()
        return Response({"message": "Event deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
    
    def patch(self,request, pk):
        try:
            event = Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = EventSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Event updated successfully!", "data": serializer.data},
                status=status.HTTP_200_OK
            )

class AnnouncementAPIView(APIView):
    permission_classes = [ClubPermission]
    def get(self, request):
        serializer = AnnouncementSerializer(Announcement.objects.all(), many=True)
        return Response({"announcements": serializer.data})
    
    
    def post(self, request):
        serializer = AnnouncementSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Announcement created successfully!",
                 "data": serializer.data}
            )
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        try:
            announcement = Announcement.objects.get(pk=pk)
        except Announcement.DoesNotExist:
            return Response({"error": "Announcement not found"}, status=status.HTTP_404_NOT_FOUND)
        announcement.delete()
        return Response({"message": "Announcement deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
    
    def patch(self, request, pk):
        try:
            announcement = Announcement.objects.get(pk=pk)
        except Announcement.DoesNotExist:
            return Response({"error": "Announcement not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AnnouncementSerializer(announcement, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Announcement updated successfully!",
                 "data": serializer.data}
            )   
    
class MembershipAPIView(APIView):
    def get_permissions(self):
        """
        Dynamically assign permissions based on user role.
        """
        # For other methods, check membership role
        club_id = self.request.data.get("club") or self.request.query_params.get("club")
        if not club_id:
            return [IsAuthenticated()]  # block if no club

        membership = Membership.objects.filter(user=self.request.user, club_id=club_id).first()

        if membership and membership.role == "secretary":
            return [IsAuthenticated()]

        # otherwise, deny access
        return []
    
    
    def get(self, request):
        serializer = MembershipSerializer(Membership.objects.all(), many=True)
        return Response({"memberships": serializer.data})
    
    def post(slef , request):
        serializer = MembershipSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Membership created successfully!",
                 "data": serializer.data}
            )
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        try:
            membership = Membership.objects.get(pk=pk)
        except Membership.DoesNotExist:
            return Response({"error": "Membership not found"}, status=status.HTTP_404_NOT_FOUND)
        membership.delete()
        return Response({"message": "Membership deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
    
    def patch(self, request, pk):
        try:
            membership = Membership.objects.get(pk=pk)
        except Membership.DoesNotExist:
            return Response({"error": "Membership not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = MembershipSerializer(membership, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Membership updated successfully!",
                 "data": serializer.data}
            )

class PendingRequestAPIView(APIView):
    def get_permissions(self):
        """
        Dynamically assign permissions based on user role.
        """
        # For other methods, check membership role
        club_id = self.request.data.get("club") or self.request.query_params.get("club")
        if not club_id:
            return [IsAuthenticated()]  # block if no club

        membership = Membership.objects.filter(user=self.request.user, club_id=club_id).first()

        if membership and membership.role == "secretary":
            return [IsAuthenticated()]

        # otherwise, deny access
        return []
    
    def get(self, request):
        serializer = PendingRequestSerializer(PendingRequest.objects.all(), many = True)
        return Response({"pending_requests": serializer.data})
    
    def post(self, request):
        serializer = PendingRequestSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Pending Request created successfully!",
                 "data": serializer.data}
            )
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        try:
            pending_request = PendingRequest.objects.get(pk=pk)
        except PendingRequest.DoesNotExist:
            return Response({"error": "Pending Request not found"}, status=status.HTTP_404_NOT_FOUND)
        pending_request.delete()
        return Response({"message": "Pending Request deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
    
    def patch(self, request, pk):
        try:
            pending_request = PendingRequest.objects.get(pk=pk)
        except PendingRequest.DoesNotExist:
            return Response({"error": "Pending Request not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = PendingRequestSerializer(pending_request, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Pending Request updated successfully!",
                 "data": serializer.data}
            )
    
class PendingRequestActionView(APIView):
    def get_permissions(self):
        """
        Dynamically assign permissions based on user role.
        """
        # For other methods, check membership role
        club_id = self.request.data.get("club") or self.request.query_params.get("club")
        if not club_id:
            return [IsAuthenticated()]  # block if no club

        membership = Membership.objects.filter(user=self.request.user, club_id=club_id).first()

        if membership and membership.role == "secretary":
            return [IsAuthenticated()]

        # otherwise, deny access
        return []

    def post(self, request, pk):
        """
        Secretary accepts/rejects a pending request.
        """
        action = request.data.get("action")  # either "accept" or "reject"

        try:
            pending_request = PendingRequest.objects.get(pk=pk)
        except PendingRequest.DoesNotExist:
            return Response({"error": "Pending request not found"}, status=status.HTTP_404_NOT_FOUND)

        # ✅ Accept → Create Membership & Delete PendingRequest
        if action == "accept":
            Membership.objects.create(
                user=pending_request.user,
                club=pending_request.club,
                role="member"  # default role for accepted users
            )
            pending_request.delete()
            return Response({"message": "Request accepted and user added to club."}, status=status.HTTP_201_CREATED)

        # ❌ Reject → Just delete PendingRequest
        elif action == "reject":
            pending_request.delete()
            return Response({"message": "Request rejected and removed from pending list."}, status=status.HTTP_200_OK)

        else:
            return Response({"error": "Invalid action. Use 'accept' or 'reject'."}, status=status.HTTP_400_BAD_REQUEST)