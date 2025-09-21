from rest_framework import permissions
from .models import Membership

class ClubPermission(permissions.BasePermission):
    """
    Allow everyone to GET, but restrict POST/PATCH/DELETE to secretaries.
    """

    def has_permission(self, request, view):
        # GET requests are open for everyone
        if request.method in permissions.SAFE_METHODS:
            return True  

        # For modifying actions, check role
        club_id = request.data.get("club") or request.query_params.get("club")
        if not club_id:
            return False  

        try:
            membership = Membership.objects.get(user=request.user, club_id=club_id)
        except Membership.DoesNotExist:
            return False  

        # Only secretaries can POST/PATCH/DELETE
        return membership.role == "secretary" or membership.role == "joint-secretary"
