import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper,
  Card,
  CardMedia,
  CardContent,
  Divider
} from '@mui/material';

// Edge profile data
const edgeProfiles = [
  // 3/4" Profiles
  {
    id: 1,
    name: '3/4" Single-Bevel',
    image: '/images/edges/single-bevel.jpg',
    category: '3/4" Profiles'
  },
  {
    id: 2,
    name: '3/4" Single-Eased',
    image: '/images/edges/single-eased.jpg',
    category: '3/4" Profiles'
  },
  {
    id: 3,
    name: '3/4" Demi-Bevel',
    image: '/images/edges/bullnose-demi.jpg',
    category: '3/4" Profiles'
  },
  {
    id: 4,
    name: '3/4" Bullnose',
    image: '/images/edges/bullnose.jpg',
    category: '3/4" Profiles'
  },
  {
    id: 5,
    name: '3/4" Dupont',
    image: '/images/edges/dupont.jpg',
    category: '3/4" Profiles'
  },
  {
    id: 6,
    name: '3/4" Ogee',
    image: '/images/edges/ogee.jpg',
    category: '3/4" Profiles'
  },
  {
    id: 7,
    name: '3/4" Offset Full Bullnose',
    image: '/images/edges/full-bullnose.jpg',
    category: '3/4" Profiles'
  },
  
  // 1 1/2" Profiles
  {
    id: 8,
    name: '1 1/2" Eased Skirt',
    image: '/images/edges/eased-skirt.jpg',
    category: '1 1/2" Profiles'
  },
  {
    id: 9,
    name: '1 1/2" Bevel Skirt',
    image: '/images/edges/bevel-skirt.jpg',
    category: '1 1/2" Profiles'
  },
  {
    id: 10,
    name: '1 1/2" Mitred 0',
    image: '/images/edges/mitred-0.jpg',
    category: '1 1/2" Profiles'
  },
  {
    id: 11,
    name: '1 1/2" Demi-Bullnose Skirt',
    image: '/images/edges/demi-bullnose-skirt.jpg',
    category: '1 1/2" Profiles'
  },
  {
    id: 12,
    name: '1 1/2" Pencil Edge',
    image: '/images/edges/pencil-edge.jpg',
    category: '1 1/2" Profiles'
  },
  {
    id: 13,
    name: '1 1/2" Full Bullnose',
    image: '/images/edges/full-bullnose.jpg',
    category: '1 1/2" Profiles'
  },
  {
    id: 14,
    name: '1 1/2" Double Laminate Miter',
    image: '/images/edges/laminate.jpg',
    category: '1 1/2" Profiles'
  },
  {
    id: 15,
    name: '1 1/2" Dupont Skirt',
    image: '/images/edges/dupont-skirt.jpg',
    category: '1 1/2" Profiles'
  },
  {
    id: 16,
    name: '1 1/2" Dupont Skirt-Offset',
    image: '/images/edges/dupont-skirt-offset.jpg',
    category: '1 1/2" Profiles'
  },
  {
    id: 17,
    name: '1 1/2" Ogee Skirt',
    image: '/images/edges/ogee-skirt.jpg',
    category: '1 1/2" Profiles'
  },
  {
    id: 18,
    name: '1 1/2" Dupont Double',
    image: '/images/edges/dupont-double.jpg',
    category: '1 1/2" Profiles'
  },
  {
    id: 19,
    name: '1 1/2" Dupont Bullnose',
    image: '/images/edges/dupont-bullnose.jpg',
    category: '1 1/2" Profiles'
  },
  {
    id: 20,
    name: '1 1/2" Mitred 1',
    image: '/images/edges/mitred-1.jpg',
    category: '1 1/2" Profiles'
  },
  {
    id: 21,
    name: '1 1/2" Ogee Bullnose',
    image: '/images/edges/ogee-bullnose.jpg',
    category: '1 1/2" Profiles'
  },
  {
    id: 22,
    name: '1 1/2" Bullnose Ogee-Inverted',
    image: '/images/edges/bullnose-ogee-inverted.jpg',
    category: '1 1/2" Profiles'
  },
  {
    id: 23,
    name: '1 1/2" Offset Full Bullnose',
    image: '/images/edges/full-bullnose.jpg',
    category: '1 1/2" Profiles'
  }
];

// Group edge profiles by category
const groupedProfiles = edgeProfiles.reduce((groups, profile) => {
  const { category } = profile;
  groups[category] = groups[category] ?? [];
  groups[category].push(profile);
  return groups;
}, {});

const EdgesPage = () => {
  return (
    <Container className="page-container">
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4, fontSize: { xs: '2rem', md: '2.5rem' } }}>
          Edge Profiles
        </Typography>
        
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4, fontSize: '1.1rem' }}>
          Choose from our wide selection of edge profiles to perfectly complement your stone countertop. 
          Each edge profile offers a unique aesthetic that can dramatically enhance the overall look of your installation.
        </Typography>
        
        {Object.entries(groupedProfiles).map(([category, profiles]) => (
          <Box key={category} sx={{ mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3, fontSize: { xs: '1.7rem', md: '2rem' } }}>
              {category}
            </Typography>
            
            <Divider sx={{ mb: 4 }} />
            
            <Grid container spacing={3}>
              {profiles.map((profile) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={profile.id}>
                  <Card 
                    elevation={2}
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
                      image={profile.image}
                      alt={profile.name}
                      sx={{ height: 140, objectFit: 'contain', p: 2, bgcolor: '#f5f5f5' }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div" align="center" sx={{ fontSize: '1.1rem' }}>
                        {profile.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
        
        <Box sx={{ mt: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="body1" paragraph>
            <strong>Note:</strong> The images shown are representative of the edge profiles. The actual appearance may vary slightly depending on the stone material chosen.
          </Typography>
          <Typography variant="body1">
            Contact us for custom edge profile options or to discuss which edge style would best suit your project.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default EdgesPage; 