import React, { useState } from "react";
import { fetchWeather } from "../services/api";
import type { WeatherData } from "../services/api";

const WeatherDisplay: React.FC = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    try {
      const data = await fetchWeather(location);
      setWeather(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch weather");
      setWeather(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleFetch}>Get Weather</button>
      {weather && (
        <div>
          <h3>{weather.city}</h3>
          <p>Temperature: {weather.temperature}°K</p>
          <p>Description: {weather.description}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default WeatherDisplay;