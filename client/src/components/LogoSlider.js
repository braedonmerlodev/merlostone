import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, useTheme, Link, Tooltip } from '@mui/material';
import { keyframes } from '@mui/system';
import { getImagePath } from '../utils/imagePathHelper';

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
  const [logos, setLogos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Create a comprehensive list of logos from the industrial folder with corresponding URLs
  useEffect(() => {
    // Generate all logo paths with URLs
    const generateLogos = () => {
      // Logo data mapping file names to URLs and company names
      const logoData = {
        '1.jpg': { 
          name: 'All Natural Stone', 
          url: 'http://www.allnaturalstoneinc.com/',
          address: '6591 Sierra Ln. Dublin, CA',
          phone: '(925) 463-6000'
        },
        '2.jpg': { name: 'Partner 2', url: '#' },
        '3.jpg': { 
          name: 'Bedrosians', 
          url: 'https://www.bedrosians.com/en/',
          address: '27695 Mission Blvd Hayward, CA 94544',
          phone: '(510) 582-5000'
        },
        '4.jpg': { name: 'Partner 4', url: '#' },
        '5.jpg': { name: 'Partner 5', url: '#' },
        '6.jpg': { 
          name: 'Danville Kitchens & Baths', 
          url: 'http://www.danvillekitchensandbaths.com/',
          phone: '(925) 820-2724'
        },
        '7.jpg': { 
          name: 'Haussman Stone', 
          url: 'http://haussmannstone.com/',
          address: '25008 Viking Street Hayward, CA 94545',
          phone: '(510) 782-5100'
        },
        '8.jpg': { 
          name: 'Integrated Resources Group', 
          url: 'http://marblecompany.com/',
          address: '6800 Sierra Court Dublin, CA 94568',
          phone: '(925) 829-1133'
        },
        '9.jpg': { 
          name: 'J&J Cabinetry', 
          url: 'https://www.w3schools.com', // This URL seems incorrect in the original HTML
          address: '45020 Forni Drive Suites C & D',
          phone: '(925) 685-6379'
        },
        '10.jpg': { 
          name: 'J N Hagen Painting', 
          url: 'http://www.jnhagenpainting.com/',
          phone: '(925) 685-6282'
        },
        '11.jpg': { 
          name: 'Limitless Kitchen And Bath', 
          url: 'https://limitlesskb.com/',
          address: '1201 Auto Center Dr Antioch, CA 94509',
          phone: '(925) 230-0556'
        },
        '12.jpg': { 
          name: 'Pietra Fina', 
          url: 'http://pietrafina.com/',
          address: '23190 Connecticut Street Hayward, CA 94545',
          phone: '(510) 670-1010'
        },
        '13.jpg': { name: 'Partner 13', url: '#' },
        '14.jpg': { 
          name: 'M S International', 
          url: 'https://www.msistone.com/',
          address: '22300-B Hathaway Ave. Hayward, CA 94541',
          phone: '(510) 921-5400'
        },
        '15.jpg': { 
          name: 'Nu Image', 
          url: '#',
          address: 'Alameda County, CA',
          phone: 'Ask Owner'
        },
        '16.jpg': { 
          name: 'Shalos Online Countertops & Cabinets', 
          url: 'http://www.shalosonline.com/Home.html',
          address: '594 Claire Street Hayward, CA 94551',
          phone: '(510) 407-3999'
        },
        '17.jpg': { 
          name: 'Sierra Crest Construction', 
          url: 'http://www.sierracrestconstruction.com/',
          address: '4115 Blackhawk Plaza Circle Suite 100, Danville CA',
          phone: '(925) 362-8898'
        },
        '18.jpg': { 
          name: 'Design By Steve Harrison', 
          url: 'http://www.tilebysteveharrison.com/',
          address: 'Antioch, CA 94509',
          phone: '(925) 755-3837'
        },
        '19.jpg': { name: 'Partner 19', url: '#' },
        'elite.jpg': { 
          name: 'Elite Construction Company', 
          url: 'http://www.eliteconstructionco.com/',
          address: 'Castro Valley, CA',
          phone: '(925) 487-4895'
        },
        'daltile.jpg': { 
          name: 'Daltile Slab Yard', 
          url: 'http://daltilestonecenter.com/',
          address: '2303 Merced St, San Leandro, CA 94577',
          phone: '(510) 357-6197'
        },
        'kolkka.jpg': { 
          name: 'Kolkka Furniture', 
          url: 'http://www.kolkka.com/',
          phone: '(650) 327-5001'
        },
        'tile.jpg': { 
          name: 'Tile Artist - Dimitre Mankov', 
          url: 'http://www.tilestoneart.com/',
          phone: '(925) 639-7114'
        }
      };
      
      // Create logo objects for each file
      const logoList = Object.entries(logoData).map(([filename, data]) => ({
        id: filename.replace('.jpg', ''),
        src: `industrial/${filename}`,
        alt: data.name,
        url: data.url,
        name: data.name,
        address: data.address || '',
        phone: data.phone || ''
      }));
      
      setLogos(logoList);
      setIsLoading(false);
    };
    
    generateLogos();
  }, []);
  
  // Create a duplicated list for seamless looping
  const duplicatedLogos = [...logos, ...logos];
  
  // Adjust animation duration based on number of logos
  const animationDuration = Math.max(30, logos.length * 2);
  
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
      
      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Loading partner logos...
          </Typography>
        </Box>
      ) : (
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
              animation: `${slide} ${animationDuration}s linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running',
              whiteSpace: 'nowrap'
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <Tooltip
                key={`${logo.id}-${index}`}
                title={
                  <Box sx={{ p: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{logo.name}</Typography>
                    {logo.address && (
                      <Typography variant="caption" display="block">{logo.address}</Typography>
                    )}
                    {logo.phone && (
                      <Typography variant="caption" display="block">{logo.phone}</Typography>
                    )}
                    {logo.url !== '#' && (
                      <Typography variant="caption" display="block" sx={{ fontStyle: 'italic', mt: 0.5 }}>
                        Click to visit website
                      </Typography>
                    )}
                  </Box>
                }
                arrow
              >
                <Link
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    display: 'inline-block',
                    mx: { xs: 2, md: 3 },
                    my: 2,
                    verticalAlign: 'middle',
                    cursor: logo.url === '#' ? 'default' : 'pointer',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: logo.url === '#' ? 'none' : 'scale(1.05)'
                    }
                  }}
                  onClick={(e) => logo.url === '#' && e.preventDefault()}
                  underline="none"
                >
                  <Box 
                    component="img"
                    src={getImagePath(logo.src)}
                    alt={logo.alt}
                    sx={{ 
                      height: { xs: 60, md: 80 },
                      maxWidth: { xs: 120, md: 180 },
                      objectFit: 'contain',
                      display: 'block',
                      filter: 'grayscale(100%)',
                      opacity: 0.7,
                      transition: 'filter 0.3s, opacity 0.3s',
                      '&:hover': {
                        filter: 'grayscale(0%)',
                        opacity: 1
                      }
                    }}
                    onError={(e) => {
                      console.error(`Failed to load logo: ${logo.src}`);
                      e.target.style.display = 'none';
                    }}
                  />
                </Link>
              </Tooltip>
            ))}
          </Box>
        </Box>
      )}
      
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