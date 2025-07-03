import React from "react";
import WeatherDisplay from './components/WeatherDisplay';
import MarsGallery from "./components/MarsGallery";
import { Container, Typography } from "@mui/material";

const App: React.FC = () => {
  return (
    <Container>
      <Typography variant="h1">Mars.JPG</Typography>
      <WeatherDisplay />
      <MarsGallery />
    </Container>
  );
};

export default App;