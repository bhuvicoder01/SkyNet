
import React, { useState, useEffect } from "react";
import { fetchMarsPhotos } from "../services/api";
import type { MarsPhoto } from "../services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import Navigation from "./Navigation";

const MarsGallery: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [photos, setPhotos] = useState<MarsPhoto[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      const loadPhotos = async () => {
        try {
          const data = await fetchMarsPhotos("curiosity", 2000);
          setPhotos(data);
          setError("");
        } catch (err) {
          setError("Failed to fetch Mars photos");
          console.error("Mars photos error:", err);
        } finally {
          setLoading(false);
        }
      };
      loadPhotos();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (authLoading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <Navigation/>
        <div className="max-w-7xl mx-auto">
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent mb-4">
              Mars Rover Gallery
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore the Red Planet through the eyes of our robotic explorers
            </p>
          </div>

          <Alert className="bg-destructive/10 border-destructive/20 mb-8">
            <Lock className="h-4 w-4" />
            <AlertDescription className="text-destructive">
              Classified Mars mission data requires clearance. Please{" "}
              <Link to="/login" className="underline font-medium hover:text-destructive/80">
                sign in
              </Link>{" "}
              or{" "}
              <Link to="/signup" className="underline font-medium hover:text-destructive/80">
                create an account
              </Link>{" "}
              to access the rover gallery.
            </AlertDescription>
          </Alert>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-8 pb-8">
              <p className="text-center text-muted-foreground text-lg">
                Mars exploration archives restricted. Security clearance required.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <Navigation/>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent mb-4">
              Mars Rover Gallery
            </h1>
            <p className="text-xl text-muted-foreground">Loading images from the Red Planet...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-card/50 backdrop-blur-sm border-border/50">
                <div className="h-64 bg-muted animate-pulse rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-muted animate-pulse rounded mb-2"></div>
                  <div className="h-4 bg-muted animate-pulse rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <Navigation/>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent mb-4">
            Mars Rover Gallery
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore the Red Planet through the eyes of our robotic explorers
          </p>
        </div>

        {error && (
          <Card className="bg-destructive/10 border-destructive/20 mb-8">
            <CardContent className="pt-6">
              <p className="text-destructive text-center text-lg">{error}</p>
              <p className="text-muted-foreground text-center mt-2">
                Unable to connect to Mars mission control. Please check your connection.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 group">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={photo.img_src}
                  alt={`Mars photo from ${photo.earth_date}`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    {photo.rover_name}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {photo.earth_date}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {photos.length === 0 && !error && !loading && (
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-8 pb-8">
              <p className="text-center text-muted-foreground text-lg">
                No Mars photos available at this time. The rovers might be in sleep mode.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MarsGallery;
