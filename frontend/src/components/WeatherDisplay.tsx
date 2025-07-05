
import React, { useState } from "react";
import { fetchWeather } from "../services/api";
import type { WeatherData } from "../services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import Navigation from "./Navigation";

const WeatherDisplay: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!location.trim()) return;
    
    setLoading(true);
    try {
      const data = await fetchWeather(location);
      setWeather(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch weather data");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFetch();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <Navigation/>
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-xl text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <Navigation/>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
              Earth Weather Monitor
            </h1>
            <p className="text-xl text-muted-foreground">
              Check weather conditions on Earth from your Mars mission control
            </p>
          </div>

          <Alert className="bg-destructive/10 border-destructive/20 mb-8">
            <Lock className="h-4 w-4" />
            <AlertDescription className="text-destructive">
              Authentication required to access weather data. Please{" "}
              <Link to="/login" className="underline font-medium hover:text-destructive/80">
                sign in
              </Link>{" "}
              or{" "}
              <Link to="/signup" className="underline font-medium hover:text-destructive/80">
                create an account
              </Link>{" "}
              to continue your space mission.
            </AlertDescription>
          </Alert>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-8 pb-8">
              <p className="text-center text-muted-foreground text-lg">
                Mission control access restricted. Astronaut credentials required.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <Navigation/>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
            Earth Weather Monitor
          </h1>
          <p className="text-xl text-muted-foreground">
            Check weather conditions on Earth from your Mars mission control
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Weather Station</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter city name..."
                className="flex-1 bg-input border-border/50"
              />
              <Button 
                onClick={handleFetch} 
                disabled={loading || !location.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {loading ? "Scanning..." : "Get Weather"}
              </Button>
            </div>

            {weather && (
              <Card className="bg-secondary/50 border-border/30">
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-bold text-primary">{weather.city}</h3>
                    <div className="text-4xl font-mono">
                      {weather.temperature}°K <span className="text-2xl">😶‍🌫️</span>
                    </div>
                    <p className="text-lg text-muted-foreground capitalize">
                      {weather.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {error && (
              <Card className="bg-destructive/10 border-destructive/20">
                <CardContent className="pt-6">
                  <p className="text-destructive text-center">{error}</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherDisplay;
