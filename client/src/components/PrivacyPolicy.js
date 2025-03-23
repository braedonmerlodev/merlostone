import React from 'react';
import { Container, Typography, Box, Paper, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <Box sx={{ py: 8, px: 2 }}>
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link component={RouterLink} to="/" underline="hover" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">Privacy Policy</Typography>
        </Breadcrumbs>
        
        <Paper elevation={2} sx={{ p: { xs: 3, md: 5 } }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Privacy Policy
          </Typography>
          
          <Typography variant="subtitle1" sx={{ mb: 4, fontStyle: 'italic' }}>
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </Typography>
          
          <Typography variant="body1" paragraph>
            At Merlo Stone, we respect your privacy. This simple privacy policy explains our approach to data collection and usage.
          </Typography>
          
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mt: 4 }}>
            No Data Collection
          </Typography>
          
          <Typography variant="body1" paragraph>
            Our website is a simple landing page that provides information about our services. We do not:
          </Typography>
          
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>Collect personal information through forms</li>
            <li>Use cookies for tracking purposes</li>
            <li>Store any visitor data</li>
            <li>Share any information with third parties</li>
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            The only instance where you might share information with us is if you choose to contact us directly via phone or email. Any information shared during such communications will be used solely to respond to your inquiry and will not be stored for marketing purposes or shared with other parties.
          </Typography>
          
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mt: 4 }}>
            Third-Party Services
          </Typography>
          
          <Typography variant="body1" paragraph>
            Our site may use standard hosting and analytics services that collect anonymous usage statistics to help us improve our website. These services may use cookies or other technologies but do not identify individual users.
          </Typography>
          
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mt: 4 }}>
            Contact Us
          </Typography>
          
          <Typography variant="body1" paragraph>
            If you have any questions about this privacy policy, please contact us at:
          </Typography>
          
          <Typography variant="body1" sx={{ ml: 4 }}>
            Merlo Stone<br />
            1234 Stone Way<br />
            San Francisco, CA 94110<br />
            Phone: (415) 555-1234<br />
            Email: info@merlostone.com
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default PrivacyPolicy; 