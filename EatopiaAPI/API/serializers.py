from rest_framework import serializers
from .models import Address, Restaurant, RestaurantImage, ClientUser, Wishlist, Review, Rating

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('id', 'address_string', 'location', 'latitude', 'longitude', 'city')

class RestaurantSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = Restaurant
        fields = ('id', 'name', 'cuisine', 'description', 'opening_hours', 'telephone', 'website', 'average_rating', 'address')

class RestaurantImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantImage
        fields = ('id', 'Restaurant', 'url')

class GroupSerializer(serializers.StringRelatedField):
    def to_representation(self, value):
        return value.name

class PermissionSerializer(serializers.StringRelatedField):
    def to_representation(self, value):
        return value.name

class ClientUserSerializer(serializers.ModelSerializer):
    address = AddressSerializer(required=False)
    groups = GroupSerializer(many=True, required=False)
    user_permissions = PermissionSerializer(many=True, required=False)

    class Meta:
        model = ClientUser
        fields = ('id', 'password', 'username', 'email', 'first_name', 'last_name', 'address', 'groups', 'user_permissions')

class WishlistSerializer(serializers.ModelSerializer):
    client_user = ClientUserSerializer()
    restaurants = RestaurantSerializer()

    class Meta:
        model = Wishlist
        fields = ('id', 'client_user', 'restaurants')

class ReviewSerializer(serializers.ModelSerializer):
    rating = serializers.ChoiceField(choices=Rating.choices)
    client_user = ClientUserSerializer()
    restaurant = RestaurantSerializer()

    class Meta:
        model = Review
        fields = ('id', 'rating', 'comment', 'review_date', 'client_user', 'restaurant')
