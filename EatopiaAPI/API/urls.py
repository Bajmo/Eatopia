from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('welcome', welcome, name='welcome'),
    path('profile', profile, name='profile'),
    path('wishlist', wishlist, name='wishlist'),
    path('addresses', AddressList.as_view(), name='address_list'),
    path('restaurants', RestaurantList.as_view(), name='restaurant_list'),
    path('restaurant/<int:pk>', RestaurantDetail.as_view(), name='restaurant_detail'),
    path('signin', sign_in, name='sign_in'),
    path('signup', sign_up, name='sign_up')
]
