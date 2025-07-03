from rest_framework import serializers

class WeatherSerializer(serializers.Serializer):
    city = serializers.CharField()
    temperature = serializers.FloatField()
    description = serializers.CharField()

class MarsPhotoSerializer(serializers.Serializer):
    img_src = serializers.URLField()
    earth_date = serializers.CharField()
    rover_name = serializers.CharField()