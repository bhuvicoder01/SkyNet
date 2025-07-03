import axios from "axios";

const API_URL = "http://127.0.0.1:8000//api";

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

export const fetchWeather = async (location: string): Promise<WeatherData> => {
  const response = await axios.get(`${API_URL}/weather/${location}/`);
  return response.data;
};

export const fetchMarsPhotos = async (rover: string, sol: number): Promise<MarsPhoto[]> => {
  const response = await axios.get(`${API_URL}/mars-photos/${rover}/${sol}/`);
  return response.data;
};