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
    path('signin', ClientUserLogin.as_view(), name='sign_in'),
    path('signup', CreateClientUserView.as_view(), name='sign_up')
]