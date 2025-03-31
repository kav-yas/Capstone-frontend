import React from "react";
import { Container, Typography, Box } from "@mui/material";

const backgroundImage =
  "https://wallpapershome.com/images/wallpapers/sky-3840x2160-4k-5k-wallpaper-8k-stars-mountains-night-5708.jpg";

const Indexx = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* 🔹 Transparent Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // 50% dark overlay
        }}
      ></Box>

      {/* 🔹 Content */}
      <Container
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}
        >
          Build Better Habits, Build a Better Life
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}
        >
          Harness the power of our personalized habit tracker app to streamline your everyday routines and achieve your goals.
        </Typography>
      </Container>
    </Box>
  );
};

export default Indexx;
