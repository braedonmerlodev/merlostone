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
      name: "Fred & Lucy Field",
      location: "Livermore, CA",
      text: "Lucy and I could not be more pleased with the entire engagement process completed in our home. From the initial consultation, recommendations for granite suppliers, fabrication and installation everyone in your company was helpful and very professional.",
      rating: 5,
      avatar: "/images/avatar1.jpg" // Can be replaced with actual avatar if available
    },
    {
      id: 2,
      name: "Jay G.",
      location: "Danville, CA",
      text: "Did a spectacular fab/install of three large slabs to form the walls for our 4' x 5' shower stall. Took six guys to muscle the largest slab into place...did so with no damage to existing floors, plumbing or walls. The decisions they made regarding cutting the slabs to create the alignment of the patterns in the slabs across the shower stall corners came out spectacular! We'll use'em again!",
      rating: 5,
      avatar: "/images/avatar2.jpg"
    },
    {
      id: 3,
      name: "Ron M.",
      location: "Brentwood, CA",
      text: "They did our kitchen counter tops and our bar top in quartz. They came and made templates for what was being done and fabricated according to their measurements and everything fit perfectly. The workers involved were very professional and knew what they were doing. They had worked for Dave the owner for many years. We did everything through our general contractor but we are very pleased with what they did for us. They were fast and efficient. We will definitely request M& S Marble when we do our bathroom next year.",
      rating: 5,
      avatar: "/images/avatar3.jpg"
    },
    {
      id: 4,
      name: "Michael & Sarah T.",
      location: "Pleasanton, CA",
      text: "We couldn't be happier with our custom marble kitchen island and countertops. The entire team at Merlo Stone was exceptional from start to finish. They helped us select the perfect stone slabs and their precision in matching the veining patterns was masterful. The installation team was meticulous and clearly took pride in their work. The finished result exceeded our expectations and has completely transformed our kitchen. We highly recommend Merlo Stone for any custom granite or marble work!",
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