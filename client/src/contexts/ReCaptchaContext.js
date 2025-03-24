import React, { createContext, useContext, useEffect, useState } from 'react';

// Create context
export const ReCaptchaContext = createContext({
  executeReCaptcha: async () => null,
  reCaptchaLoaded: false,
  error: null,
});

// Create provider component
export const ReCaptchaProvider = ({ siteKey, children }) => {
  const [reCaptchaLoaded, setReCaptchaLoaded] = useState(false);
  const [grecaptcha, setGrecaptcha] = useState(null);
  const [error, setError] = useState(null);
  const [loadAttempted, setLoadAttempted] = useState(false);
  
  // Check if we're in a development environment (localhost or GitHub Codespace)
  const isDevEnvironment = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' || 
                           window.location.hostname.endsWith('.github.dev');

  // Initialize reCAPTCHA when component mounts
  useEffect(() => {
    // Skip if already loaded or no site key provided or load already attempted
    if (reCaptchaLoaded || !siteKey || loadAttempted) return;
    
    setLoadAttempted(true);
    
    // Add script to page
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Wait for grecaptcha to be ready
      window.grecaptcha.ready(() => {
        setGrecaptcha(window.grecaptcha);
        setReCaptchaLoaded(true);
        setError(null);
        console.log('reCAPTCHA loaded successfully');
      });
    };
    
    script.onerror = (e) => {
      console.error('Error loading reCAPTCHA:', e);
      setError(new Error('Failed to load reCAPTCHA script'));
    };
    
    // Watch for promise rejection errors (common with domain mismatch)
    const handleUnhandledRejection = (event) => {
      if (event.reason && typeof event.reason === 'object' && 
          event.reason.message && event.reason.message.includes('recaptcha')) {
        console.error('reCAPTCHA error:', event.reason);
        setError(new Error(
          isDevEnvironment 
          ? `reCAPTCHA domain error: Make sure "${window.location.hostname}" is added to your reCAPTCHA allowed domains in the Google Admin Console`
          : 'reCAPTCHA error: Domain not authorized'
        ));
      }
    };
    
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    document.head.appendChild(script);
    
    // Cleanup function
    return () => {
      document.head.removeChild(script);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [siteKey, reCaptchaLoaded, loadAttempted, isDevEnvironment]);

  // Function to execute reCAPTCHA and get token
  const executeReCaptcha = async (action = 'submit') => {
    if (!grecaptcha) {
      console.warn('reCAPTCHA not loaded yet');
      
      // For development, provide a fallback token in development environments
      if (isDevEnvironment) {
        console.warn('Running in development environment, returning mock token for development');
        return 'development-environment-token-mock';
      }
      return null;
    }
    
    try {
      const token = await grecaptcha.execute(siteKey, { action });
      return token;
    } catch (error) {
      console.error('Error executing reCAPTCHA:', error);
      setError(error);
      
      // For development, provide a fallback token in development environments
      if (isDevEnvironment) {
        console.warn('Running in development environment, returning mock token after error');
        return 'development-environment-token-mock-after-error';
      }
      return null;
    }
  };

  return (
    <ReCaptchaContext.Provider value={{ executeReCaptcha, reCaptchaLoaded, error }}>
      {children}
    </ReCaptchaContext.Provider>
  );
};

// Hook for using reCAPTCHA
export const useReCaptcha = () => useContext(ReCaptchaContext);

export default ReCaptchaContext; 