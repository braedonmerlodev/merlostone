import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Link as MuiLink,
  ButtonGroup,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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

// Dev tools menu items
const devTools = [
  { name: 'Image Debugger', route: '/debug-images' },
  { name: 'Privacy Policy', route: '/privacy-policy' }
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [devMenuOpen, setDevMenuOpen] = useState(false);
  const [mobileDevMenuAnchor, setMobileDevMenuAnchor] = useState(null);
  const devMenuAnchorRef = React.useRef(null);
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  
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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const handleDevMenuToggle = () => {
    setDevMenuOpen((prevOpen) => !prevOpen);
  };
  
  const handleDevMenuClose = (event) => {
    if (devMenuAnchorRef.current && devMenuAnchorRef.current.contains(event.target)) {
      return;
    }
    setDevMenuOpen(false);
  };
  
  const handleOpenMobileDevMenu = (event) => {
    setMobileDevMenuAnchor(event.currentTarget);
  };
  
  const handleCloseMobileDevMenu = () => {
    setMobileDevMenuAnchor(null);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{
        backgroundColor: scrolled ? 'rgba(255, 152, 0, 0.95)' : 'transparent',
        boxShadow: scrolled ? 1 : 'none',
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
                    component={Link}
                    to={pageRoutes[page]}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center" sx={{ fontWeight: 'bold', fontSize: '1.05rem' }}>{page}</Typography>
                  </MenuItem>
                ))}
                
                {/* Mobile Dev Tools Menu Item */}
                <MenuItem onClick={handleOpenMobileDevMenu}>
                  <Typography textAlign="center" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '1.05rem' }}>
                    <DeviceHubIcon sx={{ mr: 1, fontSize: '1.05rem' }} />
                    Dev Tools
                  </Typography>
                </MenuItem>
              </Menu>
              
              {/* Mobile Dev Tools Submenu */}
              <Menu
                id="mobile-dev-tools-menu"
                anchorEl={mobileDevMenuAnchor}
                open={Boolean(mobileDevMenuAnchor)}
                onClose={handleCloseMobileDevMenu}
                MenuListProps={{
                  'aria-labelledby': 'mobile-dev-button',
                }}
              >
                {devTools.map((tool) => (
                  <MenuItem 
                    key={tool.name} 
                    component={Link}
                    to={tool.route}
                    onClick={() => {
                      handleCloseMobileDevMenu();
                      handleCloseNavMenu();
                    }}
                    sx={{ fontWeight: 'bold', fontSize: '1.05rem' }}
                  >
                    <Typography textAlign="center" sx={{ fontSize: '1.05rem' }}>{tool.name}</Typography>
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
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block', 
                  mx: 1,
                  fontWeight: 'bold',
                  fontSize: '1.05rem',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  } 
                }}
              >
                {page}
              </Button>
            ))}
            
            {/* Desktop Dev Tools Dropdown */}
            <ButtonGroup 
              variant="contained" 
              ref={devMenuAnchorRef}
              aria-label="dev tools button group"
              sx={{ 
                my: 2, 
                ml: 1, 
                backgroundColor: 'rgba(0, 128, 255, 0.3)',
                '& .MuiButton-root': {
                  color: 'white',
                  px: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }
                }
              }}
            >
              <Button 
                startIcon={<DeviceHubIcon />}
                onClick={handleDevMenuToggle}
                sx={{ fontWeight: 'bold', fontSize: '1.05rem' }}
              >
                Dev Tools
              </Button>
              <Button
                size="small"
                aria-controls={devMenuOpen ? 'split-button-menu' : undefined}
                aria-expanded={devMenuOpen ? 'true' : undefined}
                aria-label="select dev tool"
                aria-haspopup="menu"
                onClick={handleDevMenuToggle}
                sx={{ px: 0.5 }}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Popper
              sx={{ zIndex: 1 }}
              open={devMenuOpen}
              anchorEl={devMenuAnchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper sx={{ minWidth: 180 }}>
                    <ClickAwayListener onClickAway={handleDevMenuClose}>
                      <MenuList id="split-button-menu" dense>
                        {devTools.map((tool) => (
                          <MenuItem
                            key={tool.name}
                            component={Link}
                            to={tool.route}
                            onClick={(event) => {
                              handleDevMenuClose(event);
                            }}
                            sx={{ fontWeight: 'bold', fontSize: '1.05rem' }}
                          >
                            {tool.name}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>

          {/* Right side section - phone number */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PhoneIcon sx={{ mr: 1, fontSize: { xs: '1.5rem', sm: '2rem' }, color: 'white' }} />
            <MuiLink 
              href="tel:+19255255802"
              underline="none"
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                letterSpacing: '0.5px',
                color: 'white',
                textDecoration: 'none',
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              Office: 925-525-5802
            </MuiLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;