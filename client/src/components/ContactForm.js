import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Grid, 
  Paper,
  Snackbar,
  Alert,
  Divider,
  useTheme,
  useMediaQuery,
  Link,
  CircularProgress
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useReCaptcha } from '../contexts/ReCaptchaContext';

// Google Maps Component
const GoogleMap = () => {
  return (
    <Box sx={{ width: '100%', height: '400px', mt: 6, borderRadius: 2, overflow: 'hidden' }}>
      <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 3, fontWeight: 'bold', fontSize: '2.2rem' }}>
        Visit Our Fabrication Shop
      </Typography>
      <Box
        component="iframe"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.646673008206!2d-121.4453221!3d37.4305889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80904546d9efc0e3%3A0xaa5dcfb89977f929!2s4220%20Commercial%20Dr%20unit%201a%2C%20Tracy%2C%20CA%2095304!5e0!3m2!1sen!2sus!4v1653957438463!5m2!1sen!2sus"
        sx={{
          border: 0,
          width: '100%',
          height: '350px',
          borderRadius: '4px',
          boxShadow: 3
        }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Merlo Stone Location"
        aria-label="Google Maps showing Merlo Stone's location"
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<DirectionsIcon />}
          href="https://www.google.com/maps/dir//4220+Commercial+Dr+unit+1a,+Tracy,+CA+95304" 
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 2, fontSize: '1.1rem', px: 3, py: 1 }}
        >
          Get Directions
        </Button>
      </Box>
    </Box>
  );
};

const FormContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { executeReCaptcha, reCaptchaLoaded } = useReCaptcha();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    
    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
      isValid = false;
    }
    
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get reCAPTCHA token if available
      let recaptchaToken = null;
      if (reCaptchaLoaded) {
        recaptchaToken = await executeReCaptcha('contact_form_submit');
      }
      
      // Direct Formspree submission using fetch
      const formResponse = await fetch('https://formspree.io/f/mvgkrngl', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          'g-recaptcha-response': recaptchaToken
        })
      });
      
      const result = await formResponse.json();
      
      if (formResponse.ok) {
        // Form submitted successfully
        setSubmitted(true);
        setSnackbar({
          open: true,
          message: 'Thank you! Your message has been sent successfully. We\'ll get back to you shortly.',
          severity: 'success'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        // Handle errors
        console.error('Formspree submission error:', result);
        throw new Error(result.error || 'Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSnackbar({
        open: true,
        message: 'There was an error submitting your form. Please try again or contact us directly at (925) 525-5802 or davemerlo@comcast.net.',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', fontSize: '2.5rem' }}>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 6, maxWidth: '800px', mx: 'auto', fontSize: '1.3rem', lineHeight: 1.7 }}>
          Have questions or ready to start your project? Reach out to us for a free consultation and estimate.
        </Typography>
        
        {/* Feedback Alerts - Display at the top of the form when status changes */}
        {snackbar.open && (
          <Box sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            <Alert 
              severity={snackbar.severity} 
              onClose={handleCloseSnackbar}
              variant="filled"
              sx={{ 
                fontSize: '1.1rem', 
                alignItems: 'center',
                '& .MuiAlert-message': { 
                  flex: 1 
                },
                boxShadow: 3
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {snackbar.message}
                </Typography>
                {snackbar.severity === 'error' && (
                  <Button 
                    variant="outlined" 
                    color="inherit" 
                    size="small" 
                    sx={{ ml: 2, whiteSpace: 'nowrap' }}
                    href="tel:+19255255802"
                  >
                    Call Us
                  </Button>
                )}
              </Box>
            </Alert>
          </Box>
        )}
        
        <Grid container spacing={4}>
          {/* Form section */}
          <Grid item xs={12} md={7}>
            <Paper elevation={2} sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', fontSize: '1.6rem' }}>
                Send us a Message
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} noValidate>
                {submitted ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h6" gutterBottom color="success.main">
                      Thank you for your message!
                    </Typography>
                    <Typography variant="body1">
                      We've received your inquiry and will get back to you as soon as possible.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      sx={{ mt: 3 }}
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </Box>
                ) : (
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        id="subject"
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="message"
                        label="Message"
                        name="message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        error={!!errors.message}
                        helperText={errors.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 2 }}>
                        This site is protected by reCAPTCHA v3. By submitting this form, you agree to the 
                        <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener" sx={{ mx: 0.5 }}>Privacy Policy</Link>
                        and
                        <Link href="https://policies.google.com/terms" target="_blank" rel="noopener" sx={{ mx: 0.5 }}>Terms of Service</Link>.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isSubmitting || !reCaptchaLoaded}
                        sx={{ 
                          minWidth: '200px', 
                          py: 1.5,
                          fontSize: '1.1rem'
                        }}
                        endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Paper>
          </Grid>
          
          {/* Contact info section */}
          <Grid item xs={12} md={5}>
            {!isMobile ? (
              <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 4, fontWeight: 'bold', fontSize: '1.6rem' }}>
                  Our Contact Information
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <LocationOnIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                  <Box>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium', fontSize: '1.2rem' }}>
                      Our Location
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                      4220 Commercial Drive, Unit 1A<br />
                      Tracy, CA 95304
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      startIcon={<DirectionsIcon />}
                      href="https://www.google.com/maps/dir//4220+Commercial+Dr+unit+1a,+Tracy,+CA+95304" 
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ mt: 1, pl: 0, textTransform: 'none', fontSize: '1rem' }}
                    >
                      Get Directions
                    </Button>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <PhoneIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                  <Box>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium', fontSize: '1.2rem' }}>
                      Phone
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '1.1rem' }}>
                      <Link href="tel:+19255255802" color="inherit" underline="hover">
                        (925) 525-5802
                      </Link>
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <EmailIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                  <Box>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium', fontSize: '1.2rem' }}>
                      Email
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '1.1rem' }}>
                      <Link href="mailto:davemerlo@comcast.net" color="inherit" underline="hover">
                        davemerlo@comcast.net
                      </Link>
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <AccessTimeIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                  <Box>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium', fontSize: '1.2rem' }}>
                      Business Hours
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                      Monday - Friday: 6:00 AM - 2:30 PM<br />
                      Saturday: Closed<br />
                      Sunday: Closed
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ) : (
              <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold', fontSize: '1.6rem' }}>
                  Contact Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationOnIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="body2">
                        4220 Commercial Drive, Unit 1A, Tracy, CA 95304
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PhoneIcon sx={{ mr: 1, color: theme.palette.primary.main, fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                        <Link href="tel:+19255255802" color="inherit" underline="hover">
                          (925) 525-5802
                        </Link>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="body2">
                        <Link href="mailto:davemerlo@comcast.net" color="inherit" underline="hover">
                          davemerlo@comcast.net
                        </Link>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AccessTimeIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="body2">
                        Monday - Friday: 6:00 AM - 2:30 PM<br />
                        Saturday: Closed<br />
                        Sunday: Closed
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="text"
                      size="small"
                      startIcon={<DirectionsIcon />}
                      href="https://www.google.com/maps/dir//4220+Commercial+Dr+unit+1a,+Tracy,+CA+95304" 
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ mt: 1, textTransform: 'none' }}
                    >
                      Get Directions
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Grid>
        </Grid>
        
        {/* Google Map */}
        <GoogleMap />
      </Container>
      
      {/* Floating notification that appears at the bottom */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={10000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%', fontSize: '1.05rem' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Wrapper component that provides the reCAPTCHA provider
const ContactForm = () => {
  const { reCaptchaLoaded, error } = useReCaptcha();
  const isDevEnvironment = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' || 
                           window.location.hostname.endsWith('.github.dev');
  
  // If running in a dev environment and there's an error, show warning but allow form to work
  if (error && isDevEnvironment) {
    console.warn('reCAPTCHA warning (development environment):', error.message);
    // In dev environment, we still render the form since we have fallback mock tokens
  }
  // In production, if there's a fatal reCAPTCHA error, show user-friendly error
  else if (error && !isDevEnvironment) {
    return (
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', fontSize: '2.5rem' }}>
            Contact Us
          </Typography>
          <Paper elevation={3} sx={{ p: 4, maxWidth: '800px', mx: 'auto', textAlign: 'center' }}>
            <Alert severity="error" sx={{ mb: 3 }}>
              There was a problem loading the contact form security features. Please try again later.
            </Alert>
            <Typography variant="body1" paragraph>
              Alternatively, you can contact us directly:
            </Typography>
            <Typography variant="body1" paragraph>
              Phone: <Link href="tel:+19255255802">(925) 525-5802</Link><br />
              Email: <Link href="mailto:davemerlo@comcast.net">davemerlo@comcast.net</Link>
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  // Show a simple loading message if reCAPTCHA is still loading and no error
  if (!reCaptchaLoaded && !error && !isDevEnvironment) {
    console.log('reCAPTCHA is still loading...');
  }
  
  return <FormContent />;
};

export default ContactForm; 