from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    age = models.PositiveIntegerField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True)
    year = models.PositiveIntegerField(null=True, blank=True)
    photo = models.ImageField(upload_to='user_photos/', blank=True, null=True)

    def __str__(self):
        return self.username
    
class Club(models.Model):
    name = models.CharField(max_length=25)
    discription = models.TextField(max_length=250)
    club_logo = models.ImageField(upload_to='club_logos/', blank=True, null=True)
    secretaries = models.ManyToManyField(
        CustomUser,
        related_name='secretary_clubs',
        blank=True
    )
    club_banner = models.ImageField(upload_to='club_banners/', blank=True, null=True)

    def __str__(self):
        return self.name

class Membership(models.Model):
    ROLES = [
        ('member', 'Member'),
        ('joint-secretary', 'Joint-Secretary'),
        ('secretary', 'Secretary'),
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    date_joined = models.DateField(auto_now_add=True)
    role = models.CharField(ROLES, default='member', max_length=20)
    
    class Meta:
        unique_together = ('user', 'club')
        
class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=200)
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='events')
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='created_events')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    event_banner = models.ImageField(upload_to='event_banners/', blank=True, null=True)
    
    def __str__(self):
        return self.title
    
class Announcement(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=1000)
    date_posted = models.DateTimeField(auto_now_add=True)
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='announcements')
    posted_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='posted_announcements')
    announcement_image = models.ImageField(upload_to='announcement_images/', blank=True, null=True)
    
    def __str__(self):
        return self.title

class PendingRequest(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE) 
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    requested_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'club')

    
    def __str__(self):
        return f"{self.user.username} - {self.club.name}"
