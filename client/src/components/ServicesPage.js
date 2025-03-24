import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Grid, Paper, Box, CircularProgress, Button, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CollectionsIcon from '@mui/icons-material/Collections';
import { useImages } from '../contexts/ImageContext';

function ServicesPage() {
  const theme = useTheme();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();
  const { resolveImagePath, pathMode, loading: imageContextLoading } = useImages();

  // Use useMemo to prevent the services array from changing on every render
  const services = useMemo(() => [
    {
      id: 1,
      title: "Kitchen Countertops",
      image: "kitchens/1.jpeg", // Fixed extension to .jpeg
      description: "Transform your kitchen with our premium selection of granite, marble, and quartz countertops. Every piece is expertly cut and installed to bring beauty and durability to your home.",
      galleryCategory: "kitchens"
    },
    {
      id: 2,
      title: "Bathroom Vanities",
      image: "bathrooms/1.jpg", // Correct extension as .jpg
      description: "Elevate your bathroom with elegant stone vanities. Our craftsmen create stunning countertops that add luxury and value to your bathroom spaces.",
      galleryCategory: "bathrooms"
    },
    {
      id: 3,
      title: "Fireplaces",
      image: "fireplaces/1.jpg", // Correct extension as .jpg
      description: "Our custom fireplace surrounds provide the perfect focal point for any room. Choose from a variety of stones to complement your home's aesthetic.",
      galleryCategory: "fireplaces"
    },
    {
      id: 4,
      title: "BBQ's",
      // Use the first image from the BBQ gallery
      image: "bbq/1.jpg",
      description: "Create the perfect outdoor entertainment space with our custom stone BBQ areas. Weather-resistant and beautiful, our outdoor installations are designed to last and impress.",
      galleryCategory: "outdoor", 
      customTitle: "BBQ's"
    },
    {
      id: 5,
      title: "Showers",
      // Use the first image from the Showers gallery
      image: "showers/1.jpg",
      description: "Transform your bathroom with our elegant stone shower surrounds. Our experts create seamless, waterproof installations that combine luxury with functionality.",
      galleryCategory: "bathrooms",
      customTitle: "Showers"
    },
    {
      id: 6,
      title: "Custom Fabrication",
      // Use the first image from the Installations gallery
      image: "installations/1.jpg",
      description: "From unique countertop designs to specialty stone pieces, our custom fabrication services bring your vision to life with precision and expert craftsmanship.",
      galleryCategory: "installations", 
      customTitle: "Custom Fabrication"
    }
  ], []);

  // Function to navigate to the gallery with selected category
  const navigateToGallery = (category, event) => {
    if (event) {
      event.stopPropagation(); // Prevent the card click handler from firing
    }
    
    if (category) {
      navigate('/gallery', { 
        state: { 
          selectedCategory: category,
          // Pass custom title if available
          customTitle: services.find(s => s.galleryCategory === category)?.customTitle 
        } 
      });
    } else {
      navigate('/gallery');
    }
  };

  // Set images as loaded after a delay to show loading state
  useEffect(() => {
    console.log('ServicesPage mounted, loading images with ImageContext path resolution');
    console.log(`Current image path strategy: ${pathMode}`);
    
    // Simple preload check for first service image
    const preloadFirstImage = async () => {
      const img = new Image();
      const imagePath = resolveImagePath(services[0].image);
      img.src = imagePath;
      
      // Log environment info
      console.log("Current origin:", window.location.origin);
      console.log("PUBLIC_URL:", process.env.PUBLIC_URL || 'not set');
      console.log(`First service image path: ${imagePath}`);
      
      try {
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        console.log('First service image loaded successfully');
      } catch (err) {
        console.error('Error preloading first service image:', err);
      }
    };
    
    if (!imageContextLoading) {
      preloadFirstImage();
    }
    
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [services, resolveImagePath, pathMode, imageContextLoading]);

  return (
    <Box sx={{ pt: 12, pb: 8 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            mb: 4
          }}
        >
          Our Services
        </Typography>
        
        <Typography variant="body1" paragraph align="center" sx={{ maxWidth: '900px', mx: 'auto', mb: 6 }}>
          At Merlo Stone, we offer comprehensive stone fabrication and installation services for residential and commercial projects.
          Our skilled craftsmen work with a wide variety of natural and engineered stone to create beautiful, durable surfaces.
        </Typography>
        
        {!imagesLoaded || imageContextLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s', 
                    '&:hover': { 
                      transform: 'translateY(-8px)',
                      boxShadow: 6
                    },
                    cursor: 'pointer'
                  }}
                  onClick={(e) => service.galleryCategory && navigateToGallery(service.galleryCategory, e)}
                >
                  <Box
                    sx={{
                      height: 200,
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Box
                      component="img"
                      src={resolveImagePath(service.image)}
                      alt={service.title}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                      onError={(e) => {
                        console.error(`Failed to load service image: ${service.image} (using ${pathMode} strategy)`);
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        const parent = e.target.parentElement;
                        if (parent) {
                          parent.style.background = `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`;
                          parent.style.display = 'flex';
                          parent.style.alignItems = 'center';
                          parent.style.justifyContent = 'center';
                        }
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        zIndex: 1
                      }}
                    />
                    {service.galleryCategory && (
                      <Chip
                        icon={<CollectionsIcon />}
                        label="Gallery"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          zIndex: 2,
                          bgcolor: 'rgba(255, 255, 255, 0.8)',
                          '& .MuiChip-icon': {
                            color: theme.palette.primary.main
                          }
                        }}
                      />
                    )}
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      sx={{ 
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        color: 'white',
                        padding: 2,
                        zIndex: 2,
                        textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
                      }}
                    >
                      {service.title}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {service.description}
                    </Typography>
                    
                    {service.galleryCategory && (
                      <Button 
                        variant="outlined" 
                        size="small" 
                        endIcon={<ArrowForwardIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToGallery(service.galleryCategory, e);
                        }}
                        sx={{ 
                          mt: 'auto', 
                          alignSelf: 'flex-start',
                          '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.04)'
                          }
                        }}
                      >
                        View Gallery
                      </Button>
                    )}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default ServicesPage; 