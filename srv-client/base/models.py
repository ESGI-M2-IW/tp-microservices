from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    """
    Custom user manager to handle creating users and superusers using email.
    """
    def create_user(self, email, password=None, role=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model that uses email for authentication, with an added address and role fields.
    """

    ROLE_CHOICES = [
        ('customer', 'Client'),
        ('courier', 'Livreur'),
        ('cook', 'Cuisinier'),
    ]

    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=False)
    last_name = models.CharField(_('last name'), max_length=30, blank=False)
    street_number = models.CharField(_('street number'), max_length=10, blank=True)
    street = models.CharField(_('street'), max_length=50, blank=True)
    postal_code = models.IntegerField(
        _('postal code'),
        validators=[
            MinValueValidator(10000),
            MaxValueValidator(100000)
        ],
        null=True
        )
    city = models.CharField(_('city'), max_length=255, blank=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='customer')
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff status'), default=False)
    is_superuser = models.BooleanField(_('super user status'), default=False)
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'role']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    def clean(self):
        """
        Custom validation to ensure address is provided if the role is 'customer'.
        """
        if self.role == 'customer' and None in [self.street_number, self.street, self.postal_code, self.city] and not self.is_superuser:
            raise ValidationError(_('Address cannot be null if the role is customer.'))

    def save(self, *args, **kwargs):
        """
        Override the save method to call the clean method for validation.
        """
        self.clean()
        super().save(*args, **kwargs)

    def get_address(self):
        return f"{self.street_number} {self.street} {self.postal_code} {self.city}"
