import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Paper, Typography, Button, TextField } from "@mui/material";

const Loginn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });

      if (response.status === 200 && response.data.userId) {
        localStorage.setItem("token", response.data.token); // Store token securely
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("username", response.data.username);  
        // Store user ID if needed
        navigate("/dashboard"); // Redirect to Dashboard
      }
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://th.bing.com/th/id/R.8571aa7277c351398b7e976f177bf70e?rik=crhRVQ7YL6vUOQ&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f06%2fBest-Images-Night-Sky.jpg&ehk=rIUDgGVYYPWQA5NmpVyiuS3D1Q5v8%2bEFWpl9qp7Mmsg%3d&risl=1&pid=ImgRaw&r=0')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
        <Paper
          elevation={6}
          sx={{
            padding: "30px",
            width: "350px",
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: "20px" }}>
            LOGIN
          </Typography>

          {error && (
            <Typography color="error" sx={{ marginBottom: "10px" }}>
              {error}
            </Typography>
          )}

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            sx={{ marginBottom: "15px", input: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            sx={{ marginBottom: "15px", input: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={!username || !password}
          >
            Login
          </Button>
        </Paper>
      </Box>
    </div>
  );
};

export default Loginn;
