import React, { createContext, useState, useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm';
import AliceCarouselSlider from './components/AliceCarouselSlider';
import StoneCarePage from './components/StoneCarePage';
import AudioPlayer from './components/AudioPlayer';
import EdgesPage from './components/EdgesPage';
import GalleryPage from './components/GalleryPage';
import ServicesPage from './components/ServicesPage';
import Testimonials from './components/Testimonials';
import LogoSlider from './components/LogoSlider';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import ImageDebugger from './components/ImageDebugger';
import { createTheme, ThemeProvider, CssBaseline, Container, Box, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ImageProvider, useImages } from './contexts/ImageContext';
import { ReCaptchaProvider } from './contexts/ReCaptchaContext';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#FFC107',
    },
  },
});

// Create a custom Link component that scrolls to top
const ScrollToTopLink = ({ to, children, ...props }) => {
  const handleClick = () => {
    // Scroll to top when link is clicked
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <RouterLink to={to} onClick={handleClick} {...props}>
      {children}
    </RouterLink>
  );
};

// Create audio context for sharing audio state across components
export const AudioContext = createContext();

// Add RECAPTCHA_SITE_KEY constant at the top of the file, near other constants or imports
// This will be replaced with your actual key once you register
const RECAPTCHA_SITE_KEY = '6Le62v4qAAAAACYwVpkzHHPCfhA4ECZC4NLIGNIg'; // Replace this with your actual key

// Home Page Component
function HomePage() {
  const { resolveImagePath } = useImages();

  return (
    <>
      {/* Hero section with AliceCarouselSlider */}
      <Box sx={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
        {/* AliceCarouselSlider sits behind */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 0 }}>
          <AliceCarouselSlider />
        </Box>
      </Box>
      
      {/* About Me section */}
      <Box sx={{ py: 10, backgroundColor: '#f8f8f8' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={resolveImagePath('me.jpg')}
                alt="Dave Merlo"
                sx={{
                  width: '100%',
                  maxHeight: 500,
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: 3
                }}
                onError={(e) => {
                  console.error('Failed to load Dave Merlo image');
                  e.target.style.display = 'none';
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333', fontSize: '2.5rem', mb: 3 }}>
                About Us
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.3rem', lineHeight: 1.7, mb: 3 }}>
                As the Bay Area's premier fabricator and installer of natural stone, we provide quality service to all our customers. 
                Our fabrication shop is based in Tracy, CA, serving general contractors, designers, architects and homeowners throughout the entire Bay Area.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.3rem', lineHeight: 1.7, mb: 3 }}>
                We can design and install quality countertops, with intricate borders and backsplashes. Solid surface countertops 
                manufactured from ZodiaqStone, CaesarStone, SileStone as well as other engineered stones.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.3rem', lineHeight: 1.7, mb: 4 }}>
                Our designers will work with you step by step to create the project of your dreams and imagination at affordable prices.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                component={ScrollToTopLink} 
                to="/about"
                sx={{ mt: 3, px: 4, py: 1.5, fontSize: '1.1rem', fontWeight: 'medium' }}
              >
                Learn More
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Testimonials section (replacing Services section) */}
      <Testimonials />
      
      {/* Logo Slider section */}
      <LogoSlider />
      
      {/* Call to action for Services */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontSize: '2.2rem', fontWeight: 'bold', mb: 3 }}>
            Explore Our Services
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.3rem', lineHeight: 1.7, mb: 5, maxWidth: '800px', mx: 'auto' }}>
            Discover our full range of stone fabrication and installation services for kitchens, bathrooms, commercial spaces, and more.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            component={ScrollToTopLink} 
            to="/services"
            sx={{ px: 5, py: 1.5, fontSize: '1.1rem', fontWeight: 'medium' }}
          >
            View All Services
          </Button>
        </Container>
      </Box>
      
      {/* Contact form */}
      <ContactForm />
    </>
  );
}

// About Page placeholder - can be moved to a separate file later
function AboutPage() {
  return (
    <Box sx={{ 
      pt: 10, 
      pb: 8,
      mt: 4 
    }}>
      <Container maxWidth="lg">
        <br />
        <br />
        <br />
        <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2.5rem', mb: 5 }}>
          About Merlo Stone
        </Typography>
        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.3rem', lineHeight: 1.7, mb: 3 }}>
            Merlo Stone is the Bay Area's premier fabricator and installer of natural stone. We provide quality service to all our customers, 
            from general contractors and designers to architects and homeowners throughout the Bay Area.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.3rem', lineHeight: 1.7, mb: 3 }}>
            With years of experience in the industry, we have established ourselves as a trusted name in stone fabrication and installation. 
            Our team of skilled craftsmen takes pride in delivering exceptional quality and service on every project.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.3rem', lineHeight: 1.7, mb: 3 }}>
            Our fabrication shop is located at 4220 Commercial Drive, Unit 1A, Tracy, CA 95304, where we specialize in all types of natural and engineered stone, including granite, marble, quartz, and more. 
            While our workshop is in Tracy, we proudly serve the entire Bay Area with our superior craftsmanship and installation services.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// ScrollToTop component to handle scroll on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function Root() {
  // eslint-disable-next-line no-unused-vars
  const { audioState, setAudioState } = React.useContext(AudioContext);
  
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
      <div className="audio-player-container">
        <AudioPlayer />
      </div>
    </>
  );
}

// Create the router with all our routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/gallery",
        element: <GalleryPage />
      },
      {
        path: "/services",
        element: <ServicesPage />
      },
      {
        path: "/edges",
        element: <EdgesPage />
      },
      {
        path: "/contact",
        element: <ContactForm />
      },
      {
        path: "/stone-care",
        element: <StoneCarePage />
      },
      {
        path: "/about",
        element: <AboutPage />
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />
      },
      {
        path: "/testimonials",
        element: <Testimonials />
      },
      {
        path: "/debug-images",
        element: <ImageDebugger />
      }
    ]
  }
]);

function App() {
  // Audio state
  const [audioState, setAudioState] = useState({
    isPlaying: true, // Start with audio on to enable autoplay
    volume: localStorage.getItem('audioVolume') !== null 
      ? parseInt(localStorage.getItem('audioVolume')) 
      : 30
  });
  
  return (
    <ReCaptchaProvider siteKey={RECAPTCHA_SITE_KEY}>
      <AudioContext.Provider value={{ audioState, setAudioState }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </AudioContext.Provider>
    </ReCaptchaProvider>
  );
}

// Wrap the App component with our ImageProvider
const AppWithImageProvider = () => {
  return (
    <ImageProvider>
      <App />
    </ImageProvider>
  );
};

// Export the wrapped version of App instead
export default AppWithImageProvider;