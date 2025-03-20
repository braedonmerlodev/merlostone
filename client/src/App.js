import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm';
import ImageSlider from './components/ImageSlider';
import StoneCarePage from './components/StoneCarePage';
import { createTheme, ThemeProvider, CssBaseline, Container, Box, Typography, Paper } from '@mui/material';

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

// Home Page Component
function HomePage() {
  return (
    <>
      {/* Hero section with ImageSlider */}
      <Box sx={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
        {/* Image Slider sits behind */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 0 }}>
          <ImageSlider />
        </Box>
        
        {/* Hero content */}
        <Box 
          sx={{ 
            position: 'relative', 
            zIndex: 5, 
            height: 'calc(100vh - 64px)', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            pt: 8
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            align="center" 
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            Welcome to Merlostone
          </Typography>
          <Typography 
            variant="h5" 
            paragraph 
            align="center"
            sx={{ maxWidth: '800px', mx: 'auto', px: 3 }}
          >
            Showcasing our finest works through an elegant and modern design
          </Typography>
        </Box>
      </Box>
      
      {/* Main content starts here */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Our Services
        </Typography>
        <Typography variant="body1" paragraph align="center">
          This is a demo application with a responsive navbar, a background image slider, and a contact form with reCAPTCHA v3 integration.
        </Typography>
      </Container>
      
      {/* Contact form */}
      <ContactForm />
    </>
  );
}

// Products Page Component
function ProductsPage() {
  return (
    <Container className="page-container">
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Our Products
      </Typography>
      <Typography variant="body1" paragraph>
        Discover our range of high-quality stone products for your home and business.
      </Typography>
      {/* Add your products content here */}
    </Container>
  );
}

// Services Page Component
function ServicesPage() {
  return (
    <Container className="page-container">
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Our Services
      </Typography>
      <Typography variant="body1" paragraph>
        We offer a wide range of stone installation and maintenance services.
      </Typography>
      {/* Add your services content here */}
    </Container>
  );
}

// About Page Component
function AboutPage() {
  return (
    <Container className="page-container">
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          About Us
        </Typography>
        
        <Box className="about-page-container" sx={{ maxWidth: 900, mx: 'auto', textAlign: 'left', mb: 4 }}>
          <Typography variant="body1" paragraph>
            Thank you for considering M&S Marble as your fabricator/installer for your natural stone project. We specialize in quality custom fabrication from Kitchen Counter Tops, Bathroom Vanities, Showers, Tub Surrounds, Table Tops and more.
          </Typography>
          
          <Typography variant="body1" paragraph>
            We recognize that remodeling projects can sometimes be overwhelming. Don't worry, our knowledgeable staff makes every effort to make sure the process is straight forward and easy at all times. We are committed to excellence in every way!
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
            <Box
              component="img"
              className="about-image"
              sx={{
                maxWidth: '100%',
                borderRadius: 2,
                boxShadow: 3,
              }}
              alt="Marble workshop"
              src="https://source.unsplash.com/random/800x500/?marble-fabrication"
            />
          </Box>
          
          <Box className="about-quote" sx={{ pl: 3, my: 4, borderLeft: '4px solid #1976d2' }}>
            <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
              "Dave Merlo has owned and operated M&S Marble-Tile since 1986. Dave takes pride in his craftsmanship. From the beginning this company has built it's reputation from word to mouth. A happy customer is the only way it's been and the only way we want it!"
            </Typography>
          </Box>
        </Box>
        
        <Box className="about-highlight" sx={{ my: 4, p: 4, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom align="center" sx={{ mb: 2 }}>
            Our Commitment To You
          </Typography>
          <Typography variant="body1" align="center">
            At M&S Marble, we are dedicated to providing exceptional craftsmanship, personalized service, and stunning results that exceed your expectations. 
            With over 35 years of experience in the industry, we have the expertise to bring your vision to life.
          </Typography>
        </Box>
        
        <Box sx={{ mt: 6, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-around' }}>
          <Box sx={{ mb: { xs: 4, md: 0 }, maxWidth: '280px' }}>
            <Typography variant="h6" gutterBottom align="center">
              Quality Materials
            </Typography>
            <Typography variant="body2" align="center">
              We source only the finest natural stone materials for our projects, ensuring beauty and durability.
            </Typography>
          </Box>
          
          <Box sx={{ mb: { xs: 4, md: 0 }, maxWidth: '280px' }}>
            <Typography variant="h6" gutterBottom align="center">
              Expert Craftmanship
            </Typography>
            <Typography variant="body2" align="center">
              Our skilled artisans bring decades of experience to every project, large or small.
            </Typography>
          </Box>
          
          <Box sx={{ maxWidth: '280px' }}>
            <Typography variant="h6" gutterBottom align="center">
              Customer Satisfaction
            </Typography>
            <Typography variant="body2" align="center">
              Your complete satisfaction is our primary goal, from initial consultation to final installation.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

// Contact Page Component that uses the ContactForm component
function ContactPage() {
  return (
    <Container className="page-container">
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph align="center">
        Get in touch with us using the form below.
      </Typography>
      <ContactForm />
    </Container>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          {/* Navbar is always visible */}
          <Box sx={{ position: 'relative', zIndex: 10 }}>
            <Navbar />
          </Box>
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/stone-care" element={<StoneCarePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;