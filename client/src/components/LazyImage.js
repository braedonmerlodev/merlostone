import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { getPlaceholderUrl } from '../utils/imageOptimizer';

/**
 * LazyImage component for optimized image loading
 * Shows a loading state, gradually loads images, and handles errors
 */
const LazyImage = ({ 
  src, 
  alt, 
  sx = {}, 
  imgSx = {}, 
  placeholderBgColor = 'rgba(0, 0, 0, 0.1)',
  showLoadingIndicator = true,
  ...rest 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Set up image loading
  useEffect(() => {
    // Reset state when src changes
    setLoading(true);
    setError(false);
    
    const image = new Image();
    
    // Configure handlers
    image.onload = () => {
      setLoading(false);
    };
    
    image.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      setLoading(false);
      setError(true);
    };
    
    // Start loading the image
    image.src = src;
    
    // Clean up
    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  // Get a low-quality placeholder version of the image
  const placeholderUrl = getPlaceholderUrl(src);

  // Render different states based on loading and error
  const renderContent = () => {
    if (loading) {
      return (
        <>
          {/* Show placeholder image if available */}
          {placeholderUrl && (
            <Box
              component="img"
              src={placeholderUrl}
              alt={alt}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                filter: 'blur(10px)',
                transition: 'filter 0.3s ease',
                ...imgSx
              }}
            />
          )}
          
          {/* Show loading indicator if enabled */}
          {showLoadingIndicator && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          )}
        </>
      );
    }
    
    if (error) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: placeholderBgColor
          }}
        >
          <BrokenImageIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
          <Typography variant="caption" color="text.secondary">
            Image failed to load
          </Typography>
        </Box>
      );
    }
    
    // Successfully loaded image
    return (
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transition: 'opacity 0.3s ease',
          ...imgSx
        }}
      />
    );
  };

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: placeholderBgColor,
        ...sx
      }}
      {...rest}
    >
      {renderContent()}
    </Box>
  );
};

export default LazyImage; 