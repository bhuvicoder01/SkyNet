from rest_framework.views import APIView
from rest_framework.response import Response
from .services import get_weather, get_mars_photos
from .serializers import WeatherSerializer, MarsPhotoSerializer

class WeatherView(APIView):
    def get(self, request, location):
        data = get_weather(location)
        if "main" in data:
            serialized = WeatherSerializer({
                "city": data["name"],
                "temperature": data["main"]["temp"],
                "description": data["weather"][0]["description"]
            })
            return Response(serialized.data)
        return Response({"error": "Location not found"}, status=404)

class MarsPhotosView(APIView):
    def get(self, request, rover="curiosity", sol=1000):
        data = get_mars_photos(rover, sol)
        if "photos" in data:
            serialized = MarsPhotoSerializer(data["photos"], many=True)
            return Response(serialized.data)
        return Response({"error": "No photos found"}, status=404)