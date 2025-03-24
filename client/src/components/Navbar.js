import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Menu, 
  Container, 
  Button, 
  MenuItem,
  useTheme,
  Link as MuiLink
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';

// Update the pages array to remove Products
const pages = ['Home', 'Services', 'Stone Care', 'Edges', 'Gallery', 'About', 'Contact'];
// Map pages to their routes
const pageRoutes = {
  'Home': '/',
  'Services': '/services',
  'Stone Care': '/stone-care',
  'Edges': '/edges',
  'Gallery': '/gallery',
  'About': '/about',
  'Contact': '/contact'
};

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  const location = useLocation();
  
  // Check if we're on the About page
  const isAboutPage = location.pathname === '/about';
  
  // Add scroll event listener to change navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    // Prevent default scrolling behavior
    if (event) {
      event.preventDefault();
    }
    setAnchorElNav(null);
  };

  const handleNavLinkClick = (event, targetPath) => {
    // Prevent default behavior
    event.preventDefault();
    
    // Close the menu first
    handleCloseNavMenu();
    
    // Navigate to the link
    window.history.pushState({}, '', targetPath);
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <AppBar 
      position="fixed" 
      sx={{
        backgroundColor: isAboutPage ? 'rgba(255, 152, 0, 0.95)' : (scrolled ? 'rgba(255, 152, 0, 0.95)' : 'transparent'),
        boxShadow: isAboutPage ? 1 : (scrolled ? 1 : 'none'),
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Logo/Brand - large screens */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MERLO STONE
            </Typography>

            {/* Mobile menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem 
                    key={page} 
                    onClick={(event) => handleNavLinkClick(event, pageRoutes[page])}
                  >
                    <Typography textAlign="center" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo/Brand - small screens */}
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MERLO STONE
            </Typography>
          </Box>

          {/* Desktop menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={pageRoutes[page]}
                onClick={(event) => handleNavLinkClick(event, pageRoutes[page])}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block', 
                  mx: 1,
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  } 
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Right side section - phone number */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PhoneIcon sx={{ mr: 0.5, fontSize: { xs: '1rem', sm: '1.4rem' }, color: 'white' }} />
            <MuiLink 
              href="tel:+19255255802"
              underline="none"
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '0.8rem', sm: '1.1rem' },
                letterSpacing: { xs: 0, sm: '0.5px' },
                color: 'white',
                textDecoration: 'none',
                whiteSpace: { xs: 'nowrap', sm: 'normal' },
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              {/* Show shorter version on mobile */}
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                925-525-5802
              </Box>
              {/* Show full version on larger screens */}
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Office: 925-525-5802
              </Box>
            </MuiLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;