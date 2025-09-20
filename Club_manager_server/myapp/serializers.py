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
        # handle secretaries separately to check existing count
        secretaries = validated_data.pop('secretaries', None)
        instance = super().update(instance, validated_data)

        if secretaries is not None:
            if (instance.secretaries.count() + len(secretaries)) > 2:
                raise serializers.ValidationError(
                    {"secretaries": "A club cannot have more than 2 secretaries."}
                )
            instance.secretaries.set(secretaries)
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
        
        
class PendingRequestSerializer(serializers.ModelSerializer): 
    class Meta:
        model = PendingRequest
        fields = '__all__'