import axios from "axios";

const API_URL = "https://skynet-b4uw.onrender.com/api";

// Create axios instance with interceptors for token management
const apiClient = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          // Try to refresh the token
          const response = await axios.post(`${API_URL}/token/refresh/`, {
            refresh: refreshToken
          });
          localStorage.setItem('access_token', response.data.access);
          // Retry the original request
          error.config.headers.Authorization = `Bearer ${response.data.access}`;
          return axios.request(error.config);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
}

export interface MarsPhoto {
  img_src: string;
  earth_date: string;
  rover_name: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
  confirm_password: string;
}

export const fetchWeather = async (location: string): Promise<WeatherData> => {
  const response = await apiClient.get(`/weather/${location}/`);
  return response.data;
};

export const fetchMarsPhotos = async (rover: string, sol: number): Promise<MarsPhoto[]> => {
  const response = await apiClient.get(`/mars-photos/${rover}/${sol}/`);
  return response.data;
};

export const signup = async (data: SignupData): Promise<AuthTokens> => {
  const response = await apiClient.post('/signup/', data);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthTokens> => {
  const response = await apiClient.post('/login/', data);
  return response.data;
};

export const requestPasswordReset = async (data: PasswordResetRequest): Promise<{ message: string }> => {
  const response = await apiClient.post('/password-reset/request/', data);
  return response.data;
};

export const confirmPasswordReset = async (data: PasswordResetConfirm): Promise<{ message: string }> => {
  const response = await apiClient.post('/password-reset/confirm/', data);
  return response.data;
};
