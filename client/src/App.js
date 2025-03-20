import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm';
import { createTheme, ThemeProvider, CssBaseline, Container, Box, Typography } from '@mui/material';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <Container>
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Welcome to Merlostone
            </Typography>
            <Typography variant="body1" paragraph align="center">
              This is a demo application with a responsive navbar and a contact form with reCAPTCHA v3 integration.
            </Typography>
          </Box>
        </Container>
        <ContactForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
