from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.hashers import make_password
from django.http import Http404, JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from requests import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Address, Restaurant
from .serializers import *
from .serializers import ClientUserSerializer


class RestaurantList(APIView):
    def get(self, request, format=None):
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = RestaurantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RestaurantDetail(APIView):
    def get_object(self, pk):
        return get_object_or_404(Restaurant, pk=pk)
        
    def get(self, request, pk, format=None):
        restaurant = self.get_object(pk)
        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        restaurant = self.get_object(pk)
        serializer = RestaurantSerializer(restaurant, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        restaurant = self.get_object(pk)
        restaurant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class AddressList(APIView):     
    def get(self, request, format=None):
        addresses = Address.objects.all()
        serializer = AddressSerializer(addresses, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateClientUserView(APIView):
    def post(self, request):
        data = request.data

        # Check if the password is provided
        if 'password' not in data:
            return Response({'detail': 'Password is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Hash the password
        data['password'] = make_password(data['password'])

        serializer = ClientUserSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Check if the username is already taken
            if 'username' in serializer.errors and 'unique' in serializer.errors['username'][0].lower():
                return Response({'detail': 'Username is already taken'}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class ClientUserLogin(APIView):
    def post(self, request):
        # Get the username and password from the request data
        username = request.data.get('username')
        password = request.data.get('password')

        # Check if the username and password are provided
        if not username or not password:
            return Response({'detail': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate the user
        user = authenticate(username=username, password=password)

        # Check if the authentication was successful
        if not user:
            return Response({'detail': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

        # Generate a token for the user
        token, created = Token.objects.get_or_create(user=user)
        print(token.key)
        # Return the token and user data
        return Response({'token': token.key, 'user': ClientUserSerializer(user).data})

def index(request):
    data = {'message': 'Welcome to my API'}
    return JsonResponse(data)

def welcome(request):
    data = {'message': 'Welcome to my API'}
    return JsonResponse(data)

def profile(request):
    data = {'message': 'User profile data'}
    return JsonResponse(data)

def wishlist(request):
    data = {'message': 'Wishlist data'}
    return JsonResponse(data)

def cuisines(request):
    data = {'message': 'List of all cuisines'}
    return JsonResponse(data)

def view_cuisine(request, pk):
    data = {'message': f'Cuisine with ID {pk}'}
    return JsonResponse(data)

def edit_cuisine(request, pk):
    data = {'message': f'Edit cuisine with ID {pk}'}
    return JsonResponse(data)

def delete_cuisine(request, pk):
    data = {'message': f'Delete cuisine with ID {pk}'}
    return JsonResponse(data)

def sign_in(request):
    data = {'message': 'Sign in'}
    return JsonResponse(data)

def sign_up(request):
    data = {'message': 'Sign up'}
    return JsonResponse(data)
