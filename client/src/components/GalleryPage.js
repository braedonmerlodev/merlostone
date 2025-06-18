import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Card,
  CardMedia,
  CardContent,
  Tabs,
  Tab,
  Divider,
  Modal,
  IconButton,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLocation } from 'react-router-dom';
import { useImages } from '../contexts/ImageContext';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

// Helper function to map service categories to gallery tabs
const mapServiceCategoryToGalleryTab = (serviceCategory) => {
  const mappings = {
    'kitchens': 'Kitchens',
    'bathrooms': 'Bathrooms | Vanities',
    'fireplaces': 'Fireplaces',
    'outdoor': 'BBQ\'s',
    'commercial': 'Industrial',
    'custom': 'Kitchens',
    'installations': 'Installations'
  };
  
  return mappings[serviceCategory] || categories[0];
};

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
    { id: 'k13', image: '/images/kitchens/13.jpeg', title: 'Kitchen Design 13' },
    { id: 'k14', image: '/images/kitchens/14.jpeg', title: 'Kitchen Design 14' },
    { id: 'k15', image: '/images/kitchens/15.jpeg', title: 'Kitchen Design 15' },
    { id: 'k16', image: '/images/kitchens/16.jpeg', title: 'Kitchen Design 16' },
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
    { id: 'bv13', image: '/images/bathrooms/13.jpg', title: 'Bathroom Design 13' },
    { id: 'bv14', image: '/images/bathrooms/14.jpg', title: 'Bathroom Design 14' },
    { id: 'bv15', image: '/images/bathrooms/15.jpg', title: 'Bathroom Design 15' },
    { id: 'bv16', image: '/images/bathrooms/16.jpg', title: 'Bathroom Design 16' },
    { id: 'bv17', image: '/images/bathrooms/17.jpg', title: 'Bathroom Design 17' },
    { id: 'bv18', image: '/images/bathrooms/18.jpg', title: 'Bathroom Design 18' },
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

const GalleryPage = () => {
  const location = useLocation();
  const { resolveImagePath, pathMode } = useImages();
  
  // Check if we have a selected category from navigation
  const serviceCategory = location.state?.selectedCategory;
  const customTitle = location.state?.customTitle;
  
  // Map service category to gallery tab if available
  const initialCategory = serviceCategory ? 
    mapServiceCategoryToGalleryTab(serviceCategory) : categories[0];
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showCustomTitleAlert, setShowCustomTitleAlert] = useState(Boolean(customTitle));
  const [swiperKey, setSwiperKey] = useState(0); // Add unique key for Swiper reset
  const [isNavigating, setIsNavigating] = useState(false); // Prevent rapid navigation
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tabsRef = useRef(null);
  const swiperRef = useRef(null);

  // Function to scroll tabs to the right
  const handleScrollTabs = () => {
    if (tabsRef.current) {
      const tabsContainer = tabsRef.current.querySelector('.MuiTabs-scroller');
      if (tabsContainer) {
        tabsContainer.scrollBy({
          left: 200, // Scroll 200px to the right
          behavior: 'smooth'
        });
      }
    }
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
    setShowAll(false);
    // Hide the custom title alert when user changes categories
    setShowCustomTitleAlert(false);
    // Force Swiper to completely re-render with a new key
    setSwiperKey(prev => prev + 1);
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };
  
  const handleCloseAlert = () => {
    setShowCustomTitleAlert(false);
  };
  
  // Navigate to the next image in the current category
  const handleNextImage = () => {
    if (isNavigating) return; // Prevent rapid clicking
    setIsNavigating(true);
    
    const currentCategoryImages = showAll 
      ? galleryData[selectedCategory]
      : galleryData[selectedCategory];
    
    const nextIndex = (selectedImageIndex + 1) % currentCategoryImages.length;
    setSelectedImageIndex(nextIndex);
    setSelectedImage(currentCategoryImages[nextIndex]);
    
    // Reset navigation lock after a short delay
    setTimeout(() => setIsNavigating(false), 300);
  };
  
  // Navigate to the previous image in the current category
  const handlePreviousImage = () => {
    if (isNavigating) return; // Prevent rapid clicking
    setIsNavigating(true);
    
    const currentCategoryImages = showAll 
      ? galleryData[selectedCategory]
      : galleryData[selectedCategory];
    
    const prevIndex = (selectedImageIndex - 1 + currentCategoryImages.length) % currentCategoryImages.length;
    setSelectedImageIndex(prevIndex);
    setSelectedImage(currentCategoryImages[prevIndex]);
    
    // Reset navigation lock after a short delay
    setTimeout(() => setIsNavigating(false), 300);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePreviousImage();
      } else if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage, selectedImageIndex, selectedCategory, showAll, handleCloseModal]);
  
  // Touch handlers removed - using arrow buttons instead for navigation

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          {customTitle && showCustomTitleAlert ? customTitle : 'Gallery'}
        </Typography>
        
        {customTitle && showCustomTitleAlert && (
          <Alert 
            severity="info" 
            icon={<InfoIcon />}
            onClose={handleCloseAlert}
            sx={{ mb: 3 }}
          >
            You're currently viewing our {selectedCategory} gallery as an alternative for {customTitle}. 
            We're continuously updating our collections - please check back soon for more specific examples.
          </Alert>
        )}
        
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          Browse through our project gallery to see examples of our craftsmanship. 
          Click on a category to explore our work in different areas.
        </Typography>
        
        {/* Category tabs */}
        <Box id="gallery-categories" sx={{ borderBottom: 1, borderColor: 'divider', mb: 4, position: 'relative' }} className="gallery-tabs">
          <Tabs 
            ref={tabsRef}
            value={selectedCategory} 
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="gallery categories"
            sx={{
              '& .MuiTabs-scrollButtons': {
                '&.Mui-disabled': { opacity: 0.3 },
              },
              '& .MuiTabScrollButton-root': {
                width: 48,
                flexShrink: 0,
              },
            }}
          >
            {categories.map((category) => (
              <Tab 
                key={category} 
                label={category} 
                value={category}
                sx={{ 
                  fontWeight: 'medium',
                  minWidth: 'auto',
                  whiteSpace: 'nowrap'
                }}
              />
            ))}
          </Tabs>
          
          {/* Mobile Scroll Indicators for Category Tabs */}
          {isMobile && categories.length > 3 && (
            <>
              {/* Left Arrow */}
              <Box
                onClick={() => {
                  if (tabsRef.current) {
                    const tabsContainer = tabsRef.current.querySelector('.MuiTabs-scroller');
                    if (tabsContainer) {
                      tabsContainer.scrollBy({
                        left: -200, // Scroll 200px to the left
                        behavior: 'smooth'
                      });
                    }
                  }
                }}
                sx={{
                  position: 'absolute',
                  left: 5,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 152, 0, 0.9)',
                  color: 'white',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'pulse 2s infinite, bounceLeft 3s infinite',
                  cursor: 'pointer',
                  zIndex: 999,
                  boxShadow: '0 4px 12px rgba(255, 152, 0, 0.4)',
                  border: '2px solid white',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: 'rgba(255, 152, 0, 1)',
                    transform: 'translateY(-50%) scale(1.05)',
                  },
                  '&:active': {
                    transform: 'translateY(-50%) scale(0.95)',
                  },
                  '@keyframes bounceLeft': {
                    '0%, 20%, 50%, 80%, 100%': { 
                      transform: 'translateY(-50%) translateX(0)' 
                    },
                    '40%': { 
                      transform: 'translateY(-50%) translateX(5px)' 
                    },
                    '60%': { 
                      transform: 'translateY(-50%) translateX(2px)' 
                    },
                  },
                }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </Box>
              
              {/* Right Arrow */}
              <Box
                onClick={handleScrollTabs}
                sx={{
                  position: 'absolute',
                  right: 5, // Moved further right (was 15)
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 152, 0, 0.9)',
                  color: 'white',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'pulse 2s infinite, bounce 3s infinite',
                  cursor: 'pointer', // Make it clear it's clickable
                  zIndex: 999,
                  boxShadow: '0 4px 12px rgba(255, 152, 0, 0.4)',
                  border: '2px solid white',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: 'rgba(255, 152, 0, 1)',
                    transform: 'translateY(-50%) scale(1.05)',
                  },
                  '&:active': {
                    transform: 'translateY(-50%) scale(0.95)',
                  },
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 0.8, transform: 'translateY(-50%) scale(1)' },
                    '50%': { opacity: 1, transform: 'translateY(-50%) scale(1.1)' },
                  },
                  '@keyframes bounce': {
                    '0%, 20%, 50%, 80%, 100%': { 
                      transform: 'translateY(-50%) translateX(0)' 
                    },
                    '40%': { 
                      transform: 'translateY(-50%) translateX(-5px)' 
                    },
                    '60%': { 
                      transform: 'translateY(-50%) translateX(-2px)' 
                    },
                  },
                }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </Box>
            </>
          )}
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
                
                {/* Mobile-Friendly Swiper Gallery */}
                <Box sx={{ mb: 4, position: 'relative' }}>
                  <Swiper
                    key={`${category}-${swiperKey}`} // Unique key to force complete re-render
                    ref={swiperRef}
                    modules={[Navigation, Pagination, Thumbs, FreeMode]}
                    spaceBetween={20}
                    slidesPerView={1}
                    slidesPerGroup={1}
                    navigation={false} 
                    pagination={{ 
                      clickable: true,
                      dynamicBullets: true,
                    }}
                    breakpoints={{
                      640: {
                        slidesPerView: 2,
                        slidesPerGroup: 1,
                        spaceBetween: 30,
                      },
                      768: {
                        slidesPerView: 2,
                        slidesPerGroup: 1,
                        spaceBetween: 40,
                      },
                      1024: {
                        slidesPerView: 2,
                        slidesPerGroup: 1,
                        spaceBetween: 50,
                      },
                    }}
                    style={{ 
                      '--swiper-pagination-color': '#1976d2',
                      padding: '20px 0 50px 0'
                    }}
                  >
                    {galleryData[category].map((item, index) => (
                      <SwiperSlide key={item.id}>
                        <Card 
                          elevation={2}
                          className="gallery-image-card"
                          onClick={() => handleImageClick(item, index)}
                          sx={{ 
                            height: '350px',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            cursor: 'pointer',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: 6
                            }
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="250"
                            image={resolveImagePath(item.image.replace(/^\/images\//, ''))}
                            alt={item.title}
                            onError={(e) => {
                              console.error(`Failed to load gallery image: ${item.image} (using ${pathMode} strategy)`);
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
                          <CardContent sx={{ flexGrow: 1, p: 2 }}>
                            <Typography variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                              {item.title}
                            </Typography>
                          </CardContent>
                        </Card>
                      </SwiperSlide>
                    ))}
                    
                  </Swiper>
                </Box>
              </Box>
            </React.Fragment>
          ))
        ) : (
          // Show only the selected category with Swiper
          <Box sx={{ position: 'relative' }}>
            <Swiper
              key={`single-${selectedCategory}-${swiperKey}`} // Unique key for single category view
              modules={[Pagination, Thumbs, FreeMode]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ 
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
              }}
              style={{ 
                '--swiper-pagination-color': '#1976d2',
                padding: '20px 0 50px 0'
              }}
            >
              {galleryData[selectedCategory].map((item, index) => (
                <SwiperSlide key={item.id}>
                  <Card 
                    elevation={2}
                    className="gallery-image-card"
                    onClick={() => handleImageClick(item, index)}
                    sx={{ 
                      height: '350px',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      image={resolveImagePath(item.image.replace(/^\/images\//, ''))}
                      alt={item.title}
                      onError={(e) => {
                        console.error(`Failed to load gallery image: ${item.image} (using ${pathMode} strategy)`);
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
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Typography variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                        {item.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
              
            </Swiper>
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
        open={!!selectedImage}
        onClose={handleCloseModal}
        aria-labelledby="image-modal-title"
        // Disable touch gestures to prevent conflicts with arrow buttons
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
        // onTouchEnd={handleTouchEnd}
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(5px)'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', sm: '90%', md: '80%' },
            height: { xs: '100%', sm: '90%', md: '85%' },
            maxHeight: '90vh',
            outline: 'none',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: { xs: 0, sm: 2 },
            p: { xs: 0, sm: 1 },
            boxShadow: 24,
            '&:focus': {
              outline: 'none'
            },
            overflow: 'hidden'
          }}
        >
          {/* Close Button */}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: { xs: 8, sm: 16 },
              top: { xs: 8, sm: 16 },
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 10,
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.6)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <CloseIcon />
          </IconButton>

          
          {/* Previous Image Button */}
          <IconButton 
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              handlePreviousImage();
            }}
            sx={{
              position: 'absolute',
              left: { xs: 1, sm: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                transform: 'translateY(-50%) scale(1.1)',
              },
              transition: 'all 0.2s ease',
              zIndex: 2
            }}
            size="large"
            aria-label="previous image"
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          
          {/* Next Image Button */}
          <IconButton 
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              handleNextImage();
            }}
            sx={{
              position: 'absolute',
              right: { xs: 1, sm: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                transform: 'translateY(-50%) scale(1.1)',
              },
              transition: 'all 0.2s ease',
              zIndex: 2
            }}
            size="large"
            aria-label="next image"
          >
            <ArrowForwardIosIcon />
          </IconButton>
          
          {selectedImage && (
            <>
              <Box sx={{ 
                position: 'relative', 
                width: '100%', 
                flex: 1,
                height: 'calc(100% - 60px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
              }}>
                <img
                  src={resolveImagePath(selectedImage.image.replace(/^\/images\//, ''))}
                  alt={selectedImage.title}
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%',
                    opacity: 0, // Start fully transparent
                    display: 'block',
                    objectFit: 'contain',
                    transform: 'scale(0.95)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                    filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))'
                  }}
                  onError={(e) => {
                    console.error(`Failed to load modal image: ${selectedImage.image} (using ${pathMode} strategy)`);
                    e.target.onerror = null;
                    e.target.style.height = '250px';
                    e.target.style.background = 'linear-gradient(135deg, #333, #111)';
                    e.target.style.display = 'flex';
                    e.target.style.alignItems = 'center';
                    e.target.style.justifyContent = 'center';
                    e.target.alt = selectedImage.title;
                  }}
                  onLoad={(e) => {
                    // Ensure image is visible once loaded with animation
                    e.target.style.opacity = 1;
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </Box>
              <Box sx={{ p: 2, textAlign: 'center', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }}>
                <Typography id="image-modal-title" variant="h6" component="h2" sx={{ color: 'white', fontWeight: 'medium' }}>
                  {selectedImage.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1 }}>
                  Image {selectedImageIndex + 1} of {galleryData[selectedCategory].length}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'rgba(255,255,255,0.5)' }}>
                  Use arrow keys ← → or swipe to navigate • Press ESC to close
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