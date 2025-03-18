import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Card, CardContent, Fade } from '@mui/material';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://travel-planner-backend-savs.onrender.com/api/auth/token/', credentials);
      localStorage.setItem('token', response.data.access);
      navigate('/');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Fade in={true} timeout={500}>
        <Card sx={{ width: '100%', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center" color="primary">
              Trip Planner Pro
            </Typography>
            <Typography variant="subtitle1" align="center" sx={{ mb: 3 }}>
              Sign in to plan your trips
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                name="username"
                label="Username"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
              />
              {error && (
                <Typography color="error" align="center" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Fade>
    </Container>
  );
};

export default Login;
