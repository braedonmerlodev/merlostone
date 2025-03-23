import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Footer() {
  const theme = useTheme();
  const year = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: theme.palette.primary.main, 
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              MERLO STONE
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              The Bay Area's premier fabricator and installer of natural stone. Quality service for contractors, designers, architects, and homeowners.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
              <Typography variant="body2">
                1234 Stone Way, San Francisco, CA 94110
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
              <Typography variant="body2">
                <Link href="tel:+14155551234" color="inherit" underline="hover">
                  (415) 555-1234
                </Link>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
              <Typography variant="body2">
                <Link href="mailto:info@merlostone.com" color="inherit" underline="hover">
                  info@merlostone.com
                </Link>
              </Typography>
            </Box>
          </Grid>
          
          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/about" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              About Us
            </Link>
            <Link component={RouterLink} to="/services" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Services
            </Link>
            <Link component={RouterLink} to="/gallery" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Gallery
            </Link>
            <Link component={RouterLink} to="/stone-care" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Stone Care
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" underline="hover" sx={{ display: 'block' }}>
              Contact Us
            </Link>
          </Grid>
          
          {/* Business Hours & Social */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Business Hours
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Monday - Friday: 8:00 AM - 5:00 PM
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Saturday: 9:00 AM - 2:00 PM
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Sunday: Closed
            </Typography>
            
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Connect With Us
            </Typography>
            <Box>
              <IconButton 
                color="inherit" 
                aria-label="Facebook" 
                component="a" 
                href="https://facebook.com"
                target="_blank"
                sx={{ 
                  mr: 1,
                  '&:hover': { 
                    bgcolor: 'rgba(255, 255, 255, 0.1)' 
                  } 
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                aria-label="Instagram" 
                component="a" 
                href="https://instagram.com"
                target="_blank"
                sx={{ 
                  mr: 1,
                  '&:hover': { 
                    bgcolor: 'rgba(255, 255, 255, 0.1)' 
                  } 
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                aria-label="Pinterest" 
                component="a" 
                href="https://pinterest.com"
                target="_blank"
                sx={{ 
                  mr: 1,
                  '&:hover': { 
                    bgcolor: 'rgba(255, 255, 255, 0.1)' 
                  } 
                }}
              >
                <PinterestIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                aria-label="Twitter" 
                component="a" 
                href="https://twitter.com"
                target="_blank"
                sx={{ 
                  '&:hover': { 
                    bgcolor: 'rgba(255, 255, 255, 0.1)' 
                  } 
                }}
              >
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 3 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {year} Merlo Stone. All rights reserved.
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Link component={RouterLink} to="/privacy-policy" color="inherit" underline="hover" sx={{ mx: 1, fontSize: '0.8rem' }}>
              Privacy Policy
            </Link>
            <Typography component="span" sx={{ opacity: 0.6, fontSize: '0.8rem' }}>•</Typography>
            <Link component={RouterLink} to="/contact" color="inherit" underline="hover" sx={{ mx: 1, fontSize: '0.8rem' }}>
              Contact Us
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer; 