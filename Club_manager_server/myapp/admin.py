from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    # Fields shown in the list view
    list_display = (
        'username', 'first_name', 'last_name', 'email',
        'age', 'gender', 'year', 'is_staff'
    )
    search_fields = ('username', 'email', 'first_name',  'last_name')
    list_filter = ('gender', 'is_staff', 'is_superuser', 'is_active')

    # Field grouping while adding/editing a user in admin
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'email', 'age', 'gender', 'year', 'photo')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    # Fields to show while creating a new user from admin
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username', 'first_name', 'last_name', 'password1', 'password2'
            ),
        }),
    )
