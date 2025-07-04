from rest_framework.views import APIView 
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
from .services import get_weather, get_mars_photos
from .serializers import WeatherSerializer, MarsPhotoSerializer,UserSerializer, LoginSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer
from .models import PasswordReset
from django.utils import timezone

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
class SignupView(views.APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            if request.data.get('password') != request.data.get('confirm_password'):
                return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = authenticate(
                    username=User.objects.get(email=serializer.validated_data['email']).username,
                    password=serializer.validated_data['password']
                )
                if user:
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    })
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            except User.DoesNotExist:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetRequestView(views.APIView):
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.get(email=serializer.validated_data['email'])
                reset_obj = PasswordReset.objects.create(user=user)
                reset_url = f"{settings.FRONTEND_URL}/reset-password/{reset_obj.token}"
                send_mail(
                    'Password Reset Request',
                    f'Click this link to reset your password: {reset_url}',
                    settings.DEFAULT_FROM_EMAIL,
                    [user.email],
                    fail_silently=False,
                )
                return Response({"message": "Password reset link sent"}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"error": "Email not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(views.APIView):
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            try:
                reset_obj = PasswordReset.objects.get(token=serializer.validated_data['token'])
                if reset_obj.expires_at < timezone.now():
                    return Response({"error": "Token expired"}, status=status.HTTP_400_BAD_REQUEST)
                user = reset_obj.user
                user.set_password(serializer.validated_data['password'])
                user.save()
                reset_obj.delete()
                return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)
            except PasswordReset.DoesNotExist:
                return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    