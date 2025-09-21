from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Club, Announcement, Event, Membership, PendingRequest
User = get_user_model()  # get your custom user model

class UserSerializer(serializers.ModelSerializer):
    # Make password write-only (accept during POST/PUT but not returned in GET)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'username',
            'email',
            'age',
            'gender',
            'year',
            'photo',
            'password'
        ]

    def create(self, validated_data):
        # use create_user to hash the password
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # this hashes the password
        user.save()
        return user

    def update(self, instance, validated_data):
        # handle password updates safely
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'

    def validate_secretaries(self, value):
        """
        Ensure no more than 2 secretaries are assigned to a club.
        """
        if len(value) > 2:
            raise serializers.ValidationError(
                "A club cannot have more than 2 secretaries."
            )
        return value

    def update(self, instance, validated_data):
    # handle secretaries separately
        new_secretaries = validated_data.pop('secretaries', None)
        instance = super().update(instance, validated_data)

        if new_secretaries is not None:
            # check combined count (existing + new)
            total_secretaries = instance.secretaries.count() + len(new_secretaries)
            if total_secretaries > 2:
                raise serializers.ValidationError(
                    {"secretaries": "A club cannot have more than 2 secretaries."}
                )
            # ✅ add instead of overwrite
            instance.secretaries.add(*new_secretaries)

        return instance


    def create(self, validated_data):
        secretaries = validated_data.pop('secretaries', [])
        if len(secretaries) > 2:
            raise serializers.ValidationError(
                {"secretaries": "A club cannot have more than 2 secretaries."}
            )
        club = Club.objects.create(**validated_data)
        club.secretaries.set(secretaries)
        return club
  
        
class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'
        
        
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = '__all__'
        
    def validate(self, data):
        user = data.get('user')
        club = data.get('club')
        role = data.get('role')

        if Membership.objects.filter(user=user, club=club).exists():
            raise serializers.ValidationError("This user is already a member of the club.")

        if role == 'secretary':
            current_secretaries = Membership.objects.filter(club=club, role='secretary').count()
            if current_secretaries >= 2:
                raise serializers.ValidationError("This club already has 2 secretaries.")
            
        valid_roles = [choice[0] for choice in Membership.ROLES]
        if role not in valid_roles:
            raise serializers.ValidationError(f"Invalid role specified. Must be one of {valid_roles}.")

        return data
        
        
class PendingRequestSerializer(serializers.ModelSerializer): 
    class Meta:
        model = PendingRequest
        fields = '__all__'
        
    def validate(self, data):
        user = data.get('user')
        club = data.get('club')

        if PendingRequest.objects.filter(user=user, club=club).exists():
            raise serializers.ValidationError("This user already has a pending request for this club.")

        if Membership.objects.filter(user=user, club=club).exists():
            raise serializers.ValidationError("This user is already a member of the club.")

        return data