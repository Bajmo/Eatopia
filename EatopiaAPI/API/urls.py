from django.urls import path
from .views import *

urlpatterns = [
    #path('', index, name='index'),
    #path('welcome', welcome, name='welcome'),
    #path('profile', profile, name='profile'),
    #path('wishlist', wishlist, name='wishlist'),
    path('addresses', AddressList.as_view(), name='address_list'),
    path('restaurants', RestaurantList.as_view(), name='restaurant_list'),
    path('restaurant/<int:pk>', RestaurantDetail.as_view(), name='restaurant_detail'),
    path('signin', ClientUserSignInView.as_view(), name='sign_in'),
    path('signup', ClientUserSignUpView.as_view(), name='sign_up'),
    path('user', ClientUserView.as_view(), name='user'),
    path('signout', ClientUserSignOutView.as_view(), name='sign_out'),
]