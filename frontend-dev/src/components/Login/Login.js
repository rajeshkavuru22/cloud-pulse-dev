import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  // const navigate = useNavigate();

  // Mock authentication function
  const handleLogin = () => {
    const { username, password } = credentials;
    
    // Mock user authentication (Replace with API call)
    if (username === "admin" && password === "password") {
      localStorage.setItem("token", "mock-token"); // Save token
      // navigate("/dashboard"); // Redirect to dashboard
      window.location.href = "/dashboard";
    } else {
      setError("Invalid username or password"); // Show error
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 350, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          LBG CloudPulse - Login
        </Typography>
        
        {/* Username Input */}
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        
        {/* Password Input */}
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />

        {/* Error Message */}
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        {/* Login Button */}
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }} 
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
