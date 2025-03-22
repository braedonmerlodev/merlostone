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

// Sample gallery data - replace with actual images later
const galleryData = {
  Kitchens: [
    { id: 'k1', image: '/images/gallery/kitchens/kitchen1.jpg', title: 'Modern Kitchen' },
    { id: 'k2', image: '/images/gallery/kitchens/kitchen2.jpg', title: 'Classic Kitchen' },
    { id: 'k3', image: '/images/gallery/kitchens/kitchen3.jpg', title: 'Contemporary Kitchen' },
    { id: 'k4', image: '/images/gallery/kitchens/kitchen4.jpg', title: 'Elegant Kitchen' },
  ],
  Bars: [
    { id: 'b1', image: '/images/gallery/bars/bar1.jpg', title: 'Home Bar' },
    { id: 'b2', image: '/images/gallery/bars/bar2.jpg', title: 'Custom Bar Area' },
    { id: 'b3', image: '/images/gallery/bars/bar3.jpg', title: 'Elegant Bar Design' },
  ],
  'Bathrooms | Vanities': [
    { id: 'bv1', image: '/images/gallery/bathrooms/bath1.jpg', title: 'Modern Bathroom' },
    { id: 'bv2', image: '/images/gallery/bathrooms/bath2.jpg', title: 'Luxury Vanity' },
    { id: 'bv3', image: '/images/gallery/bathrooms/bath3.jpg', title: 'Contemporary Bathroom' },
    { id: 'bv4', image: '/images/gallery/bathrooms/bath4.jpg', title: 'Elegant Vanity' },
  ],
  'BBQ\'s': [
    { id: 'bbq1', image: '/images/gallery/bbqs/bbq1.jpg', title: 'Outdoor BBQ Area' },
    { id: 'bbq2', image: '/images/gallery/bbqs/bbq2.jpg', title: 'Custom BBQ Installation' },
  ],
  Fireplaces: [
    { id: 'f1', image: '/images/gallery/fireplaces/fireplace1.jpg', title: 'Modern Fireplace' },
    { id: 'f2', image: '/images/gallery/fireplaces/fireplace2.jpg', title: 'Stone Fireplace Design' },
    { id: 'f3', image: '/images/gallery/fireplaces/fireplace3.jpg', title: 'Luxury Fireplace' },
  ],
  Showers: [
    { id: 's1', image: '/images/gallery/showers/shower1.jpg', title: 'Stone Shower' },
    { id: 's2', image: '/images/gallery/showers/shower2.jpg', title: 'Custom Shower Design' },
    { id: 's3', image: '/images/gallery/showers/shower3.jpg', title: 'Modern Shower Installation' },
  ],
  Entrys: [
    { id: 'e1', image: '/images/gallery/entrys/entry1.jpg', title: 'Marble Entry' },
    { id: 'e2', image: '/images/gallery/entrys/entry2.jpg', title: 'Stone Entry Design' },
  ],
  Installations: [
    { id: 'i1', image: '/images/gallery/installations/install1.jpg', title: 'Stone Installation Process' },
    { id: 'i2', image: '/images/gallery/installations/install2.jpg', title: 'Custom Installation' },
    { id: 'i3', image: '/images/gallery/installations/install3.jpg', title: 'Professional Installation' },
  ],
  Showrooms: [
    { id: 'sr1', image: '/images/gallery/showrooms/showroom1.jpg', title: 'Our Showroom Display' },
    { id: 'sr2', image: '/images/gallery/showrooms/showroom2.jpg', title: 'Showroom Materials' },
    { id: 'sr3', image: '/images/gallery/showrooms/showroom3.jpg', title: 'Stone Sample Area' },
  ]
};

// Categories for the tabs
const categories = Object.keys(galleryData);

// Placeholder image if the actual image is not available
const placeholderImage = 'https://via.placeholder.com/400x300?text=Gallery+Image';

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
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(https://source.unsplash.com/random/1200x600/?park)',
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
                            e.target.src = placeholderImage;
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
                        e.target.src = placeholderImage;
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
                  e.target.src = placeholderImage;
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