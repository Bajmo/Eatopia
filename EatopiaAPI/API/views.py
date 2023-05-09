import datetime

import jwt
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from requests import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken

from .models import Address, Restaurant
from .serializers import *
from .serializers import ClientUserSerializer


class RestaurantList(APIView):
    def get(self, request, format=None):
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(
            restaurants, many=True, context={'user': request.user})
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

class RestaurantImagesList(APIView):
    def get(self, request, pk, format=None):
        restaurant = get_object_or_404(Restaurant, pk=pk)
        restaurant_images = RestaurantImage.objects.filter(restaurant_id=restaurant.id)
        serializer = RestaurantImageSerializer(
            restaurant_images, many=True)
        return Response(serializer.data)

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
    
class AddressDetail(APIView):
    def get_object(self, pk):
        return get_object_or_404(Address, pk=pk)

    def get(self, request, pk, format=None):
        address = self.get_object(pk)
        serializer = AddressSerializer(address)
        return Response(serializer.data)

class ClientUserSignUpView(APIView):
    def post(self, request):
        serializer = ClientUserSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            if 'username' in serializer.errors and 'unique' in serializer.errors['username'][0].lower():
                return Response({'detail': 'Username is already taken'}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClientUserSignInView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']

        client_user = ClientUser.objects.filter(username=username).first()

        if client_user is None:
            raise AuthenticationFailed('User not found!')
        
        if not client_user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')
        
        payload = {
            'id': client_user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)

        return response

class ClientUserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        
        client_user = ClientUser.objects.filter(id=payload['id']).first()
        serializer = ClientUserSerializer(client_user)

        return Response(serializer.data)
    
class ClientUserSignOutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'Sign out successful!'
        }

        return response