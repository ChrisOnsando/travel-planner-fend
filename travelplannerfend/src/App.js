import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { store } from './store';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const theme = createTheme({
  palette: { primary: { main: '#1B5E20' }, secondary: { main: '#FFCA28' }, background: { default: '#F5F5F5' } },
  typography: { fontFamily: 'Roboto, Arial, sans-serif', h4: { fontWeight: 700 }, h5: { fontWeight: 600 } },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 8, textTransform: 'none', padding: '10px 20px' } } },
    MuiTextField: { styleOverrides: { root: { '& .MuiOutlinedInput-root': { borderRadius: 8 } } } },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
