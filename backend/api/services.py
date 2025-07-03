# api/services.py
import requests
from django.conf import settings

def get_weather(location: str):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={settings.WEATHER_API_KEY}"
    response = requests.get(url)
    return response.json()

def get_mars_photos(rover: str = "curiosity", sol: int = 1000):
    url = f"https://api.nasa.gov/mars-photos/api/v1/rovers/{rover}/photos?sol={sol}&api_key={settings.NASA_API_KEY}"
    response = requests.get(url)
    return response.json()