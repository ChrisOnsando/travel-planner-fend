import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setTrip, setLoading, setError } from '../slices/tripSlice';
import mapboxgl from 'mapbox-gl';
import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Tooltip,
  Box,
  Fade,
} from '@mui/material';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNraWtpIiwiYSI6ImNtOGU1dTl6bzA2bWgyaXM4N3pycHpxa2sifQ.YW3l11m9kzqBwe2Wjtsd-Q';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    current_location: '',
    pickup_location: '',
    dropoff_location: '',
    cycle_used: 0,
  });
  const mapContainer = useRef(null);
  const map = useRef(null);
  const dispatch = useDispatch();
  const { currentTrip, loading, error } = useSelector((state) => state.trips);

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-122.4194, 37.7749],
        zoom: 5,
      });
    }

    if (currentTrip && currentTrip.route && currentTrip.route.path.geometry) {
      const { coordinates } = currentTrip.route.path.geometry;

      const bounds = coordinates.reduce(
        (bounds, coord) => bounds.extend(coord),
        new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
      );
      map.current.fitBounds(bounds, { padding: 50 });

      if (map.current.getLayer('route')) map.current.removeLayer('route');
      if (map.current.getSource('route')) map.current.removeSource('route');

      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: currentTrip.route.path.geometry,
        },
      });
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#1B5E20', 'line-width': 4 },
      });

      currentTrip.plan.forEach((day, i) => {
        day.stops.forEach((stop, j) => {
          const marker = new mapboxgl.Marker({ color: '#FFCA28' })
            .setLngLat(currentTrip.route.path.legs[i]?.end_location || [-122.4194, 37.7749])
            .setPopup(new mapboxgl.Popup().setText(stop));
          marker.addTo(map.current);
        });
        if (i < currentTrip.plan.length - 1) {
          const restMarker = new mapboxgl.Marker({ color: '#0000FF' })
            .setLngLat(currentTrip.route.path.legs[i]?.end_location || [-122.4194, 37.7749])
            .setPopup(new mapboxgl.Popup().setText('Rest'));
          restMarker.addTo(map.current);
        }
      });
    }
  }, [currentTrip]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));
    const token = localStorage.getItem('token');
    console.log("Sending payload:", formData); // Added logging
    try {
      const response = await axios.post('https://travel-planner-backend-savs.onrender.com/api/plan/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setTrip(response.data));
    } catch (err) {
      dispatch(setError(err.response?.data?.error || 'Failed to plan trip')); // Updated error handling
    }
    dispatch(setLoading(false));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in={true} timeout={500}>
        <Box>
          <Typography variant="h4" gutterBottom color="primary">
            Trip Planner Pro
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Plan Your Trip
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      name="current_location"
                      label="Current Location"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      onChange={handleChange}
                    />
                    <TextField
                      name="pickup_location"
                      label="Pickup Location"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      onChange={handleChange}
                    />
                    <TextField
                      name="dropoff_location"
                      label="Dropoff Location"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      onChange={handleChange}
                    />
                    <TextField
                      name="cycle_used"
                      label="Cycle Used (hrs)"
                      type="number"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      onChange={handleChange}
                    />
                    <Tooltip title="Submit to calculate route and logs">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 2 }}
                      >
                        {loading ? <CircularProgress size={24} /> : 'Plan Trip'}
                      </Button>
                    </Tooltip>
                  </form>
                  {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                      {error}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom color="primary">
                    Route
                  </Typography>
                  <Box sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
                    <div ref={mapContainer} style={{ height: 'calc(100vh - 300px)', width: '100%' }} />
                  </Box>

                  {currentTrip && (
                    <>
                      <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 2 }}>
                        Plan
                      </Typography>
                      <Grid container spacing={2}>
                        {currentTrip.plan.map((day, i) => (
                          <Grid item xs={12} sm={6} key={i}>
                            <Card variant="outlined" sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
                              <CardContent>
                                <Typography variant="subtitle1" color="primary">
                                  Day {i + 1}
                                </Typography>
                                <Typography>Driving: {day.driving} hrs</Typography>
                                <Typography>On Duty: {day.on_duty} hrs</Typography>
                                <Typography>Stops: {day.stops.join(', ') || 'None'}</Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                      <Typography sx={{ mt: 2 }}>Remaining Hours: {currentTrip.remaining_hours}</Typography>
                      <Tooltip title="Download your ELD logs as PDF">
                        <Button
                          href={`https://travel-planner-backend-savs.onrender.com/${currentTrip.pdf_path}`}
                          download
                          variant="contained"
                          color="secondary"
                          sx={{ mt: 2 }}
                        >
                          Download Logs
                        </Button>
                      </Tooltip>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Container>
  );
};

export default Dashboard;
