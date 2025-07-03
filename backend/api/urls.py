from django.urls import path
from .views import WeatherView, MarsPhotosView

urlpatterns = [
    path("weather/<str:location>/", WeatherView.as_view(), name="weather"),
    path("mars-photos/<str:rover>/<int:sol>/", MarsPhotosView.as_view(), name="mars-photos"),
]