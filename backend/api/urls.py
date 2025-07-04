from django.urls import path
from .views import WeatherView,MarsPhotosView,SignupView,LoginView,PasswordResetRequestView,PasswordResetConfirmView

urlpatterns = [
    path("weather/<str:location>/", WeatherView.as_view(), name="weather"),
    path("mars-photos/<str:rover>/<int:sol>/", MarsPhotosView.as_view(), name="mars-photos"),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('password-reset/request/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]