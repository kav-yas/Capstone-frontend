import React, { useState } from "react";
import axios from "axios";
import { Container, Grid, TextField, Typography, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        formData,
        { withCredentials: true } // ✅ Allow backend cookies (if needed)
      );

      setSuccess("Signup successful! Please log in.");
      setFormData({  // ✅ Clear form on success
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        dob: "",
        gender: "",
      });
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1317857006/photo/beautiful-sunset-at-the-sea.jpg?s=612x612&w=0&k=20&c=FP-6VYNWNrM6i4w5QlegCT2otN_z966rJFKqgVdF4Pg=')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "80px",
      }}
    >
      <Container>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          {/* Left Section: Welcome Message */}
          <Grid item xs={12} md={6} style={{ textAlign: "center", padding: "20px" }}>
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Welcome to Our Platform!
            </Typography>
            <Typography variant="body1" style={{ marginTop: "10px", color: "#ccc" }}>
              Join us today and enjoy exclusive benefits.
            </Typography>
          </Grid>

          {/* Right Section: Signup Form */}
          <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
            <Typography variant="h5" style={{ marginBottom: "20px" }}>
              SIGN UP
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField name="username" label="Username" fullWidth margin="normal" variant="outlined" value={formData.username} onChange={handleChange} InputLabelProps={{ style: { color: "Grey" } }} InputProps={{ style: { color: "white" } }} />
              <TextField name="firstName" label="First Name" fullWidth margin="normal" variant="outlined" value={formData.firstName} onChange={handleChange} InputLabelProps={{ style: { color: "Grey" } }} InputProps={{ style: { color: "white" } }} />
              <TextField name="lastName" label="Last Name" fullWidth margin="normal" variant="outlined" value={formData.lastName} onChange={handleChange} InputLabelProps={{ style: { color: "Grey" } }} InputProps={{ style: { color: "white" } }} />
              <TextField name="phone" label="Phone Number" fullWidth margin="normal" variant="outlined" value={formData.phone} onChange={handleChange} InputLabelProps={{ style: { color: "Grey" } }} InputProps={{ style: { color: "white" } }} />
              <TextField name="email" label="Email" fullWidth margin="normal" variant="outlined" value={formData.email} onChange={handleChange} InputLabelProps={{ style: { color: "Grey" } }} InputProps={{ style: { color: "white" } }} />
              <TextField name="dob" label="Date of Birth" type="date" fullWidth margin="normal" variant="outlined" value={formData.dob} onChange={handleChange} InputLabelProps={{ style: { color: "Grey" }, shrink: true }} InputProps={{ style: { color: "white" } }} />

              {/* ✅ Gender Dropdown */}
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel style={{ color: "Grey" }}>Gender</InputLabel>
                <Select name="gender" value={formData.gender} onChange={handleChange} style={{ color: "white" }}>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              <TextField name="password" label="Password" type="password" fullWidth margin="normal" variant="outlined" value={formData.password} onChange={handleChange} InputLabelProps={{ style: { color: "Grey" } }} InputProps={{ style: { color: "white" } }} />
              <TextField name="confirmPassword" label="Confirm Password" type="password" fullWidth margin="normal" variant="outlined" value={formData.confirmPassword} onChange={handleChange} InputLabelProps={{ style: { color: "Grey" } }} InputProps={{ style: { color: "white" } }} />

              {error && <Typography color="error" style={{ marginTop: "10px" }}>{error}</Typography>}
              {success && <Typography style={{ marginTop: "10px", color: "lightgreen" }}>{success}</Typography>}

              <Button type="submit" variant="contained" fullWidth style={{ marginTop: "20px", backgroundColor: "#ff4081" }}>
                SIGN UP
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Signup;
