import React, { useState } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';

// Define the sliding animation
const slide = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

function LogoSlider() {
  const theme = useTheme();
  const [isPaused, setIsPaused] = useState(false);
  
  // Logo data from industrial folder
  const logos = [
    {
      id: 1,
      src: '/images/industrial/elite.jpg',
      alt: 'Elite'
    },
    {
      id: 2,
      src: '/images/industrial/daltile.jpg',
      alt: 'Daltile'
    },
    {
      id: 3,
      src: '/images/industrial/kolkka.jpg',
      alt: 'Kolkka'
    },
    {
      id: 4,
      src: '/images/industrial/tile.jpg',
      alt: 'Tile'
    }
  ];
  
  // Double the logos array to create a seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];
  
  return (
    <Box 
      sx={{
        py: 6,
        backgroundColor: theme.palette.grey[50],
        overflow: 'hidden',
        position: 'relative',
        borderTop: `1px solid ${theme.palette.grey[200]}`,
        borderBottom: `1px solid ${theme.palette.grey[200]}`
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h5" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ 
            mb: 4,
            fontWeight: 'medium',
            color: theme.palette.primary.main
          }}
        >
          Our Trusted Partners
        </Typography>
      </Container>
      
      <Box 
        sx={{ 
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            width: { xs: 50, md: 100 },
            height: '100%',
            zIndex: 2
          },
          '&::before': {
            left: 0,
            background: 'linear-gradient(to right, white, rgba(255, 255, 255, 0))'
          },
          '&::after': {
            right: 0,
            background: 'linear-gradient(to left, white, rgba(255, 255, 255, 0))'
          }
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Box 
          sx={{ 
            display: 'inline-block',
            animation: `${slide} 30s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
            whiteSpace: 'nowrap'
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <Box 
              key={`${logo.id}-${index}`}
              component="img"
              src={logo.src}
              alt={logo.alt}
              sx={{ 
                height: { xs: 60, md: 80 },
                maxWidth: { xs: 120, md: 180 },
                objectFit: 'contain',
                mx: { xs: 2, md: 5 },
                my: 2,
                display: 'inline-block',
                verticalAlign: 'middle',
                filter: 'grayscale(100%)',
                opacity: 0.7,
                transition: 'filter 0.3s, opacity 0.3s, transform 0.3s',
                '&:hover': {
                  filter: 'grayscale(0%)',
                  opacity: 1,
                  transform: 'scale(1.05)'
                }
              }}
            />
          ))}
        </Box>
      </Box>
      
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Typography 
          variant="body2" 
          align="center" 
          color="text.secondary"
          sx={{ 
            fontStyle: 'italic',
            fontSize: '0.85rem'
          }}
        >
          We work with the finest suppliers and partners in the industry to ensure exceptional quality for your projects
        </Typography>
      </Container>
    </Box>
  );
}

export default LogoSlider; 