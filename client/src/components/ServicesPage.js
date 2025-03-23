import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Box, CircularProgress, Button, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CollectionsIcon from '@mui/icons-material/Collections';

function ServicesPage() {
  const theme = useTheme();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();

  // Services data based on image directories with mapping to gallery categories
  const services = [
    {
      title: "Kitchen Countertops",
      description: "Custom granite, marble, and engineered stone countertops designed to transform your kitchen with elegance and durability.",
      image: "/images/kitchens/1.jpg",
      folder: "kitchens",
      galleryCategory: "Kitchens"
    },
    {
      title: "Bathroom Vanities",
      description: "Beautiful stone vanity tops, shower surrounds, and tub decks that combine luxury with practical functionality.",
      image: "/images/bathrooms/1.jpg",
      folder: "bathrooms",
      galleryCategory: "Bathrooms | Vanities"
    },
    {
      title: "Commercial Projects",
      description: "Professional stone installations for offices, restaurants, hotels and retail spaces with superior craftsmanship.",
      image: "/images/industrial/1.jpg",
      folder: "industrial",
      galleryCategory: "Industrial"
    },
    {
      title: "Fireplace Surrounds",
      description: "Elegant stone fireplace surrounds that create a stunning focal point for any room in your home.",
      image: "/images/fireplaces/1.jpg",
      folder: "fireplaces",
      galleryCategory: "Fireplaces"
    },
    {
      title: "Outdoor BBQ Areas",
      description: "Durable and stylish stone countertops and surrounds for your outdoor kitchen and BBQ area.",
      image: "/images/bbq/1.jpg",
      folder: "bbq",
      galleryCategory: "BBQ's"
    },
    {
      title: "Bar Tops",
      description: "Sophisticated stone bar tops that add elegance and durability to entertainment spaces.",
      image: "/images/bars/1.jpg",
      folder: "bars",
      galleryCategory: "Bars"
    },
    {
      title: "Custom Edges",
      description: "Specialized edge profiles that add a distinctive finishing touch to your stone installations.",
      image: "/images/edges/1.jpg",
      folder: "edges",
      galleryCategory: null // No direct gallery category for edges
    },
    {
      title: "Shower Enclosures",
      description: "Luxurious stone shower walls and enclosures that create a spa-like experience in your bathroom.",
      image: "/images/showers/1.jpg",
      folder: "showers",
      galleryCategory: "Showers"
    },
    {
      title: "Entry Features",
      description: "Impressive stone entryways that make a statement and welcome visitors to your space.",
      image: "/images/entrys/1.jpg",
      folder: "entrys",
      galleryCategory: "Entrys"
    }
  ];

  // Function to navigate to the gallery with selected category
  const navigateToGallery = (category, event) => {
    if (event) {
      event.stopPropagation(); // Prevent the card click handler from firing
    }
    
    if (category) {
      navigate('/gallery', { 
        state: { selectedCategory: category } 
      });
    } else {
      navigate('/gallery');
    }
  };

  // Set images as loaded after a delay to show loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
        
        {!imagesLoaded ? (
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
                      src={service.image}
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