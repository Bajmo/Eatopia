from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class Address(models.Model):
    address_string = models.CharField(max_length=200)
    location = models.CharField(null=False, max_length=300, default='No location data available')
    latitude = models.FloatField(null=False)
    longitude = models.FloatField(null=False)
    city = models.CharField(null=True, max_length=30, default='Marrakech')

    class Meta:
        verbose_name_plural = 'Addresses'

class Rating(models.IntegerChoices):
    Very_bad = 1, 'Very bad'
    Bad = 2, 'Bad'
    Good = 3, 'Good'
    Very_good = 4, 'Very good'
    Awesome = 5, 'Awesome'
    
class Restaurant(models.Model):
    name = models.CharField(null=False, max_length=50)
    cuisine = models.CharField(max_length=100)   
    description = models.CharField(null=False, max_length=1000)
    opening_hours = models.CharField(null=False, max_length=50, default='No opening hours available')
    telephone = models.CharField(null=False, max_length=30)
    website = models.CharField(null=False, max_length=300)
    average_rating = models.FloatField(null=False)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, null=False)

class RestaurantImage(models.Model):
    Restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    url = models.CharField(null=True, max_length=300, default='No image available')

class ClientUser(AbstractUser):
    address = models.ForeignKey(Address, on_delete=models.CASCADE, null=True, blank=True)
    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        related_name='clientuser_groups'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        related_name='clientuser_permissions'
    )

    class Meta:
        verbose_name = 'Client User'
        verbose_name_plural = 'Client Users'

class Wishlist(models.Model):
    client_user = models.ForeignKey(ClientUser, on_delete=models.CASCADE)
    restaurants = models.ForeignKey(Restaurant, on_delete=models.CASCADE)

class Review(models.Model):
    rating = models.IntegerField(choices=Rating.choices)
    comment = models.CharField
    review_date = models.DateTimeField(auto_now_add=True)
    client_user = models.ForeignKey(ClientUser, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)