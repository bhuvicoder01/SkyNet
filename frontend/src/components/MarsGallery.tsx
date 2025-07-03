import React, { useState, useEffect } from "react";
import { fetchMarsPhotos } from "../services/api";
import type { MarsPhoto } from "../services/api";
import { Grid, Card, CardMedia, Typography } from "@mui/material";

const MarsGallery: React.FC = () => {
  const [photos, setPhotos] = useState<MarsPhoto[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await fetchMarsPhotos("curiosity", 1000);
        setPhotos(data);
        setError("");
      } catch (err) {
        setError("Failed to fetch Mars photos");
      }
    };
    loadPhotos();
  }, []);

  return (
    <div>
      <h2>Mars Rover Photos</h2>
      {error && <p>{error}</p>}
      <Grid container spacing={2}>
        {photos.map((photo, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={photo.img_src}
                alt={`Mars photo ${photo.earth_date}`}
              />
              <Typography>Rover: {photo.rover_name}</Typography>
              <Typography>Date: {photo.earth_date}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MarsGallery;