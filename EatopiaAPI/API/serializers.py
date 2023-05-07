from rest_framework import serializers
from .models import Address, Restaurant, RestaurantImage, ClientUser, Wishlist, Review, Rating

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('id', 'address_string', 'location', 'latitude', 'longitude', 'city')

class RestaurantSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    is_wishlisted = serializers.SerializerMethodField()

    class Meta:
        model = Restaurant
        fields = ('id', 'name', 'cuisine', 'description', 'opening_hours', 'telephone', 'website', 'average_rating', 'address', 'is_wishlisted')

    def get_is_wishlisted(self, obj):
        user = self.context.get('user')
        if user and user.is_authenticated:
            return Wishlist.objects.filter(client_user=user, restaurants=obj).exists()
        return None

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
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
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
