import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper,
  Card,
  CardMedia,
  CardContent,
  Tabs,
  Tab,
  Divider,
  Button,
  Modal,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Gallery data mapped to actual images in the images folder
const galleryData = {
  Kitchens: [
    { id: 'k1', image: '/images/kitchens/1.jpeg', title: 'Kitchen Design 1' },
    { id: 'k2', image: '/images/kitchens/2.jpeg', title: 'Kitchen Design 2' },
    { id: 'k3', image: '/images/kitchens/3.jpeg', title: 'Kitchen Design 3' },
    { id: 'k4', image: '/images/kitchens/4.jpeg', title: 'Kitchen Design 4' },
    { id: 'k5', image: '/images/kitchens/5.jpeg', title: 'Kitchen Design 5' },
    { id: 'k6', image: '/images/kitchens/6.jpeg', title: 'Kitchen Design 6' },
    { id: 'k7', image: '/images/kitchens/7.jpeg', title: 'Kitchen Design 7' },
    { id: 'k8', image: '/images/kitchens/8.jpeg', title: 'Kitchen Design 8' },
    { id: 'k9', image: '/images/kitchens/9.jpeg', title: 'Kitchen Design 9' },
    { id: 'k10', image: '/images/kitchens/10.jpeg', title: 'Kitchen Design 10' },
    { id: 'k11', image: '/images/kitchens/11.jpeg', title: 'Kitchen Design 11' },
    { id: 'k12', image: '/images/kitchens/12.jpeg', title: 'Kitchen Design 12' },
  ],
  Bars: [
    { id: 'b1', image: '/images/bars/1.jpg', title: 'Bar Design 1' },
    { id: 'b2', image: '/images/bars/2.jpg', title: 'Bar Design 2' },
    { id: 'b3', image: '/images/bars/3.jpg', title: 'Bar Design 3' },
    { id: 'b4', image: '/images/bars/4.jpg', title: 'Bar Design 4' },
    { id: 'b5', image: '/images/bars/5.jpg', title: 'Bar Design 5' },
    { id: 'b6', image: '/images/bars/6.jpg', title: 'Bar Design 6' },
    { id: 'b7', image: '/images/bars/7.jpg', title: 'Bar Design 7' },
    { id: 'b8', image: '/images/bars/8.jpg', title: 'Bar Design 8' },
    { id: 'b9', image: '/images/bars/9.jpg', title: 'Bar Design 9' },
    { id: 'b10', image: '/images/bars/10.jpg', title: 'Bar Design 10' },
    { id: 'b11', image: '/images/bars/11.jpg', title: 'Bar Design 11' },
    { id: 'b12', image: '/images/bars/12.jpg', title: 'Bar Design 12' },
  ],
  'Bathrooms | Vanities': [
    { id: 'bv1', image: '/images/bathrooms/1.jpg', title: 'Bathroom Design 1' },
    { id: 'bv2', image: '/images/bathrooms/2.jpg', title: 'Bathroom Design 2' },
    { id: 'bv3', image: '/images/bathrooms/3.jpg', title: 'Bathroom Design 3' },
    { id: 'bv4', image: '/images/bathrooms/4.jpg', title: 'Bathroom Design 4' },
    { id: 'bv5', image: '/images/bathrooms/5.jpg', title: 'Bathroom Design 5' },
    { id: 'bv6', image: '/images/bathrooms/6.jpg', title: 'Bathroom Design 6' },
    { id: 'bv7', image: '/images/bathrooms/7.jpg', title: 'Bathroom Design 7' },
    { id: 'bv8', image: '/images/bathrooms/8.jpg', title: 'Bathroom Design 8' },
    { id: 'bv9', image: '/images/bathrooms/9.jpg', title: 'Bathroom Design 9' },
    { id: 'bv10', image: '/images/bathrooms/10.jpg', title: 'Bathroom Design 10' },
    { id: 'bv11', image: '/images/bathrooms/11.jpg', title: 'Bathroom Design 11' },
    { id: 'bv12', image: '/images/bathrooms/12.jpg', title: 'Bathroom Design 12' },
  ],
  'BBQ\'s': [
    { id: 'bbq1', image: '/images/bbq/1.jpg', title: 'BBQ Design 1' },
    { id: 'bbq2', image: '/images/bbq/2.jpg', title: 'BBQ Design 2' },
    { id: 'bbq3', image: '/images/bbq/3.jpg', title: 'BBQ Design 3' },
    { id: 'bbq4', image: '/images/bbq/4.jpg', title: 'BBQ Design 4' },
    { id: 'bbq5', image: '/images/bbq/5.jpg', title: 'BBQ Design 5' },
    { id: 'bbq6', image: '/images/bbq/6.jpg', title: 'BBQ Design 6' },
    { id: 'bbq7', image: '/images/bbq/7.jpg', title: 'BBQ Design 7' },
    { id: 'bbq8', image: '/images/bbq/8.jpg', title: 'BBQ Design 8' },
    { id: 'bbq9', image: '/images/bbq/9.jpg', title: 'BBQ Design 9' },
    { id: 'bbq10', image: '/images/bbq/10.jpg', title: 'BBQ Design 10' },
    { id: 'bbq11', image: '/images/bbq/11.jpg', title: 'BBQ Design 11' },
    { id: 'bbq12', image: '/images/bbq/12.jpg', title: 'BBQ Design 12' },
  ],
  Fireplaces: [
    { id: 'f1', image: '/images/fireplaces/1.jpg', title: 'Fireplace Design 1' },
    { id: 'f2', image: '/images/fireplaces/2.jpg', title: 'Fireplace Design 2' },
    { id: 'f3', image: '/images/fireplaces/3.jpg', title: 'Fireplace Design 3' },
    { id: 'f4', image: '/images/fireplaces/4.jpg', title: 'Fireplace Design 4' },
    { id: 'f5', image: '/images/fireplaces/5.jpg', title: 'Fireplace Design 5' },
    { id: 'f6', image: '/images/fireplaces/6.jpg', title: 'Fireplace Design 6' },
    { id: 'f7', image: '/images/fireplaces/7.jpg', title: 'Fireplace Design 7' },
    { id: 'f8', image: '/images/fireplaces/8.jpg', title: 'Fireplace Design 8' },
    { id: 'f9', image: '/images/fireplaces/9.jpg', title: 'Fireplace Design 9' },
    { id: 'f10', image: '/images/fireplaces/10.jpg', title: 'Fireplace Design 10' },
    { id: 'f11', image: '/images/fireplaces/11.jpg', title: 'Fireplace Design 11' },
    { id: 'f12', image: '/images/fireplaces/12.jpg', title: 'Fireplace Design 12' },
    // Add more if needed
  ],
  Showers: [
    { id: 's1', image: '/images/showers/1.jpg', title: 'Shower Design 1' },
    { id: 's2', image: '/images/showers/2.jpg', title: 'Shower Design 2' },
    { id: 's3', image: '/images/showers/3.jpg', title: 'Shower Design 3' },
    { id: 's4', image: '/images/showers/4.jpg', title: 'Shower Design 4' },
    { id: 's5', image: '/images/showers/5.jpg', title: 'Shower Design 5' },
    { id: 's6', image: '/images/showers/6.jpg', title: 'Shower Design 6' },
    { id: 's7', image: '/images/showers/7.jpg', title: 'Shower Design 7' },
    { id: 's8', image: '/images/showers/8.jpg', title: 'Shower Design 8' },
    { id: 's9', image: '/images/showers/9.jpg', title: 'Shower Design 9' },
    { id: 's10', image: '/images/showers/10.jpg', title: 'Shower Design 10' },
    { id: 's11', image: '/images/showers/11.jpg', title: 'Shower Design 11' },
    { id: 's12', image: '/images/showers/12.jpg', title: 'Shower Design 12' },
    // Add more if needed
  ],
  Entrys: [
    { id: 'e1', image: '/images/entrys/1.jpg', title: 'Entry Design 1' },
    { id: 'e2', image: '/images/entrys/2.jpg', title: 'Entry Design 2' },
    { id: 'e3', image: '/images/entrys/3.jpg', title: 'Entry Design 3' },
    { id: 'e4', image: '/images/entrys/4.jpg', title: 'Entry Design 4' },
    { id: 'e5', image: '/images/entrys/5.jpg', title: 'Entry Design 5' },
    { id: 'e6', image: '/images/entrys/6.jpg', title: 'Entry Design 6' },
    { id: 'e7', image: '/images/entrys/7.jpg', title: 'Entry Design 7' },
    { id: 'e8', image: '/images/entrys/8.jpg', title: 'Entry Design 8' },
  ],
  Installations: [
    { id: 'i1', image: '/images/installations/1.jpg', title: 'Installation Process 1' },
    { id: 'i2', image: '/images/installations/2.jpg', title: 'Installation Process 2' },
    { id: 'i3', image: '/images/installations/3.jpg', title: 'Installation Process 3' },
    { id: 'i4', image: '/images/installations/4.jpg', title: 'Installation Process 4' },
    { id: 'i5', image: '/images/installations/5.jpg', title: 'Installation Process 5' },
    { id: 'i6', image: '/images/installations/6.jpg', title: 'Installation Process 6' },
    { id: 'i7', image: '/images/installations/7.jpg', title: 'Installation Process 7' },
    { id: 'i8', image: '/images/installations/8.jpg', title: 'Installation Process 8' },
    { id: 'i9', image: '/images/installations/9.jpg', title: 'Installation Process 9' },
    { id: 'i10', image: '/images/installations/10.jpg', title: 'Installation Process 10' },
    { id: 'i11', image: '/images/installations/11.jpg', title: 'Installation Process 11' },
    { id: 'i12', image: '/images/installations/12.jpg', title: 'Installation Process 12' },
    { id: 'i13', image: '/images/installations/13.jpg', title: 'Installation Process 13' },
  ],
  Showrooms: [
    { id: 'sr1', image: '/images/showrooms/1.jpg', title: 'Showroom Display 1' },
    { id: 'sr2', image: '/images/showrooms/2.jpg', title: 'Showroom Display 2' },
    { id: 'sr3', image: '/images/showrooms/3.jpg', title: 'Showroom Display 3' },
    { id: 'sr4', image: '/images/showrooms/4.jpg', title: 'Showroom Display 4' },
    { id: 'sr5', image: '/images/showrooms/5.jpg', title: 'Showroom Display 5' },
    { id: 'sr6', image: '/images/showrooms/6.jpg', title: 'Showroom Display 6' },
    { id: 'sr7', image: '/images/showrooms/7.jpg', title: 'Showroom Display 8' },
    { id: 'sr8', image: '/images/showrooms/8.jpg', title: 'Showroom Display 9' },
    { id: 'sr9', image: '/images/showrooms/9.jpg', title: 'Showroom Display 10' },
    { id: 'sr10', image: '/images/showrooms/10.jpg', title: 'Showroom Display 11' },
    { id: 'sr11', image: '/images/showrooms/11.jpg', title: 'Showroom Display 12' },
  ],
  Industrial: [
    { id: 'ind1', image: '/images/industrial/1.jpg', title: 'Industrial Project 1' },
    { id: 'ind2', image: '/images/industrial/2.jpg', title: 'Industrial Project 2' },
    { id: 'ind3', image: '/images/industrial/3.jpg', title: 'Industrial Project 3' },
    { id: 'ind4', image: '/images/industrial/4.jpg', title: 'Industrial Project 4' },
    { id: 'ind5', image: '/images/industrial/5.jpg', title: 'Industrial Project 5' },
    { id: 'ind6', image: '/images/industrial/6.jpg', title: 'Industrial Project 6' },
    { id: 'ind7', image: '/images/industrial/7.jpg', title: 'Industrial Project 7' },
    { id: 'ind8', image: '/images/industrial/8.jpg', title: 'Industrial Project 8' },
    { id: 'ind9', image: '/images/industrial/9.jpg', title: 'Industrial Project 9' },
    { id: 'ind10', image: '/images/industrial/10.jpg', title: 'Industrial Project 10' },
    // Add more if needed
  ],
  Magazine: [
    { id: 'mag1', image: '/images/magazine/1.jpg', title: 'Magazine Feature 1' },
    { id: 'mag2', image: '/images/magazine/2.jpg', title: 'Magazine Feature 2' },
    { id: 'mag3', image: '/images/magazine/3.jpg', title: 'Magazine Feature 3' },
    { id: 'mag4', image: '/images/magazine/4.jpg', title: 'Magazine Feature 4' },
    { id: 'mag5', image: '/images/magazine/5.jpg', title: 'Magazine Feature 5' },
    { id: 'mag6', image: '/images/magazine/6.jpg', title: 'Magazine Feature 6' },
    { id: 'mag7', image: '/images/magazine/7.jpg', title: 'Magazine Feature 7' },
    { id: 'mag8', image: '/images/magazine/8.jpg', title: 'Magazine Feature 8' },
    { id: 'mag9', image: '/images/magazine/9.jpg', title: 'Magazine Feature 9' },
    { id: 'mag10', image: '/images/magazine/10.jpg', title: 'Magazine Feature 10' },
    { id: 'mag11', image: '/images/magazine/11.jpg', title: 'Magazine Feature 11' },
    { id: 'mag12', image: '/images/magazine/12.jpg', title: 'Magazine Feature 12' },
  ],
};

// Categories for the tabs
const categories = Object.keys(galleryData);

// Placeholder image if the actual image is not available
const placeholderImage = null; // Using CSS fallbacks instead of external URLs

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [showAll, setShowAll] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
    setShowAll(false);
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Container className="page-container">
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Gallery
        </Typography>
        
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          Browse through our project gallery to see examples of our craftsmanship. 
          Click on a category to explore our work in different areas.
        </Typography>
        
        {/* Category tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }} className="gallery-tabs">
          <Tabs 
            value={selectedCategory} 
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="gallery categories"
          >
            {categories.map((category) => (
              <Tab 
                key={category} 
                label={category} 
                value={category}
                sx={{ fontWeight: 'medium' }}
              />
            ))}
          </Tabs>
        </Box>
        
        {/* Selected category or all categories */}
        {showAll ? (
          // Show all categories when "View All" is clicked
          categories.map((category, index) => (
            <React.Fragment key={category}>
              {/* Add park section before each category except the first one */}
              {index > 0 && (
                <Box 
                  sx={{ 
                    my: 6, 
                    py: 5, 
                    bgcolor: '#f9f9f9',
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <Typography 
                    variant="h4" 
                    component="div" 
                    sx={{ 
                      fontWeight: 'bold',
                      letterSpacing: '0.1em',
                      color: '#333',
                      textTransform: 'uppercase'
                    }}
                  >
                    Park
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ mb: 6 }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
                  {category}
                </Typography>
                
                <Divider sx={{ mb: 4 }} />
                
                <Grid container spacing={3}>
                  {galleryData[category].map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <Card 
                        elevation={2}
                        className="gallery-image-card"
                        onClick={() => handleImageClick(item)}
                        sx={{ 
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: 6
                          }
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="250"
                          image={item.image}
                          alt={item.title}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.height = '250px';
                            e.target.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
                            e.target.style.display = 'flex';
                            e.target.style.alignItems = 'center';
                            e.target.style.justifyContent = 'center';
                            e.target.alt = item.title;
                          }}
                          sx={{ objectFit: 'cover' }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" component="div">
                            {item.title}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </React.Fragment>
          ))
        ) : (
          // Show only the selected category
          <Box>
            <Grid container spacing={3}>
              {galleryData[selectedCategory].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card 
                    elevation={2}
                    className="gallery-image-card"
                    onClick={() => handleImageClick(item)}
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      image={item.image}
                      alt={item.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.height = '250px';
                        e.target.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
                        e.target.style.display = 'flex';
                        e.target.style.alignItems = 'center';
                        e.target.style.justifyContent = 'center';
                        e.target.alt = item.title;
                      }}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="div">
                        {item.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={handleShowAll}
                sx={{ px: 4 }}
              >
                View All Categories
              </Button>
            </Box>
          </Box>
        )}
        
        <Box sx={{ mt: 6, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="body1" paragraph>
            <strong>Note:</strong> These images showcase some of our past projects. Contact us to discuss your specific needs and see more examples relevant to your project.
          </Typography>
          <Typography variant="body1">
            All of our work is custom-designed to meet the unique requirements of each client. We pride ourselves on attention to detail and quality craftsmanship.
          </Typography>
        </Box>
      </Paper>
      
      {/* Image Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box sx={{ 
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 1,
          borderRadius: 1,
          outline: 'none'
        }}>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500',
              bgcolor: 'rgba(255,255,255,0.7)',
              zIndex: 1,
              '&:hover': {
                color: 'grey.800',
                bgcolor: 'rgba(255,255,255,0.9)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: 'calc(90vh - 100px)',
                  display: 'block',
                  margin: '0 auto',
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.height = '250px';
                  e.target.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
                  e.target.style.display = 'flex';
                  e.target.style.alignItems = 'center';
                  e.target.style.justifyContent = 'center';
                  e.target.alt = selectedImage.title;
                }}
              />
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography id="image-modal-title" variant="h6" component="h2">
                  {selectedImage.title}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default GalleryPage; 