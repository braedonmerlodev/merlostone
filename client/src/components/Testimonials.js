import React from 'react';
import { Container, Typography, Box, Grid, Paper, Avatar, Rating } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { useTheme } from '@mui/material/styles';

function Testimonials() {
  const theme = useTheme();

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Jennifer M.",
      location: "San Francisco, CA",
      text: "Merlo Stone transformed our kitchen with the most beautiful granite countertops. Their attention to detail and craftsmanship is unmatched. The installation team was professional and courteous.",
      rating: 5,
      avatar: "/images/avatar1.jpg" // Can be replaced with actual avatar if available
    },
    {
      id: 2,
      name: "Robert L.",
      location: "Oakland, CA",
      text: "We had our bathroom renovated with marble from Merlo Stone and couldn't be happier with the results. The team helped us select the perfect stone and the installation was flawless.",
      rating: 5,
      avatar: "/images/avatar2.jpg"
    },
    {
      id: 3,
      name: "Carlos T.",
      location: "San Jose, CA",
      text: "As a contractor, I've worked with many stone fabricators, but Merlo Stone stands out for their reliability and quality. My clients are always impressed with their work.",
      rating: 5,
      avatar: "/images/avatar3.jpg"
    },
    {
      id: 4,
      name: "Sarah W.",
      location: "Palo Alto, CA",
      text: "The fireplace surround Merlo Stone created for our living room is absolutely stunning. It's become the focal point of our home and we receive compliments from everyone who visits.",
      rating: 5,
      avatar: "/images/avatar4.jpg"
    }
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: '#f8f8f8' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 2 }}>
          What Our Clients Say
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}>
          We take pride in our craftsmanship and customer service. Here's what some of our satisfied clients have to say about their experience with Merlo Stone.
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={6} key={testimonial.id}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 4, 
                  height: '100%',
                  position: 'relative',
                  borderRadius: 2,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 4
                  }
                }}
              >
                <FormatQuoteIcon 
                  sx={{ 
                    position: 'absolute', 
                    top: 16, 
                    left: 16, 
                    color: 'rgba(0,0,0,0.1)', 
                    fontSize: '2rem' 
                  }} 
                />
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb: 3 }}>
                    "{testimonial.text}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      sx={{ 
                        bgcolor: theme.palette.primary.main,
                        width: 50,
                        height: 50,
                        mr: 2
                      }}
                    >
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.location}
                      </Typography>
                      <Rating value={testimonial.rating} readOnly size="small" sx={{ mt: 0.5 }} />
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Testimonials; 