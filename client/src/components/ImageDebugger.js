import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  CircularProgress,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  Switch,
  FormControlLabel
} from '@mui/material';
import { useImages } from '../contexts/ImageContext';
import { testImagePath } from '../utils/imagePathHelper';

// Sample image paths to test
const SAMPLE_PATHS = [
  '1.jpg',                   // Carousel image
  'kitchens/1.jpg',          // Kitchen service
  'me.jpg',                  // Dave Merlo
  'audio/ms-track.mp3',      // Audio file
  'gallery/1.jpg',           // Gallery image
  'optimized/1.jpg',         // Optimized image
  'industrial/1.jpg',        // Industrial service
];

const ImageDebugger = () => {
  const { resolveImagePath, pathMode, loading: contextLoading } = useImages();
  const [customPath, setCustomPath] = useState('');
  const [selectedSamplePath, setSelectedSamplePath] = useState('1.jpg');
  const [pathOption, setPathOption] = useState('default');
  const [testing, setTesting] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [showImages, setShowImages] = useState(true);
  const [environment, setEnvironment] = useState({
    origin: '',
    publicUrl: '',
    pathname: '',
    protocol: ''
  });

  // Get environment info on mount
  useEffect(() => {
    const origin = window.location.origin;
    const publicUrl = process.env.PUBLIC_URL || '';
    const pathname = window.location.pathname;
    const protocol = window.location.protocol;
    
    setEnvironment({
      origin,
      publicUrl,
      pathname,
      protocol
    });
    
    // Auto-run a basic test on mount
    handleTestSamplePath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get the currently selected test path
  const getTestPath = () => {
    return customPath || selectedSamplePath || '1.jpg';
  };
  
  // Resolve the image path using the selected option
  const getResolvedPath = (path) => {
    switch (pathOption) {
      case 'absolute':
        return resolveImagePath(path, { absolute: true });
      case 'optimized':
        return resolveImagePath(path, { useOptimized: true });
      case 'noPublicUrl':
        return resolveImagePath(path, { withPublicUrl: false });
      case 'direct':
        return `/images/${path}`;
      case 'default':
      default:
        return resolveImagePath(path);
    }
  };

  // Test a single path
  const testPath = async (path) => {
    const resolvedPath = getResolvedPath(path);
    const startTime = Date.now();
    const result = await testImagePath(resolvedPath, { timeout: 5000 });
    const endTime = Date.now();
    
    return {
      path,
      resolvedPath,
      success: result,
      time: endTime - startTime,
      timestamp: new Date().toISOString()
    };
  };

  // Handle testing the current sample path
  const handleTestSamplePath = async () => {
    const path = getTestPath();
    if (!path) return;
    
    setTesting(true);
    try {
      const result = await testPath(path);
      setTestResults(prev => [result, ...prev].slice(0, 10)); // Keep last 10 results
    } catch (err) {
      console.error('Error testing path:', err);
    } finally {
      setTesting(false);
    }
  };

  // Handle testing all sample paths
  const handleTestAllPaths = async () => {
    setTesting(true);
    try {
      const results = await Promise.all(SAMPLE_PATHS.map(path => testPath(path)));
      setTestResults(prev => [...results, ...prev].slice(0, 20)); // Keep last 20 results
    } catch (err) {
      console.error('Error testing paths:', err);
    } finally {
      setTesting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Image Path Debugger
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Environment Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Origin:</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{environment.origin}</Typography>
            
            <Typography variant="subtitle2">PUBLIC_URL:</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{environment.publicUrl || '(not set)'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Current Path:</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{environment.pathname}</Typography>
            
            <Typography variant="subtitle2">Protocol:</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{environment.protocol}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2">Current Image Path Strategy:</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {contextLoading 
            ? <CircularProgress size={16} sx={{ mr: 1 }} /> 
            : pathMode
          }
        </Typography>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Test Image Paths
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="sample-path-label">Sample Path</InputLabel>
              <Select
                labelId="sample-path-label"
                value={selectedSamplePath}
                label="Sample Path"
                onChange={(e) => {
                  setSelectedSamplePath(e.target.value);
                  setCustomPath('');
                }}
              >
                {SAMPLE_PATHS.map(path => (
                  <MenuItem key={path} value={path}>{path}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Custom Path"
              variant="outlined"
              value={customPath}
              onChange={(e) => setCustomPath(e.target.value)}
              placeholder="Enter a custom image path to test"
              sx={{ mb: 2 }}
            />
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="path-option-label">Path Resolution Strategy</InputLabel>
              <Select
                labelId="path-option-label"
                value={pathOption}
                label="Path Resolution Strategy"
                onChange={(e) => setPathOption(e.target.value)}
              >
                <MenuItem value="default">Default (using context)</MenuItem>
                <MenuItem value="absolute">Absolute URL</MenuItem>
                <MenuItem value="optimized">Optimized</MenuItem>
                <MenuItem value="noPublicUrl">Without PUBLIC_URL</MenuItem>
                <MenuItem value="direct">Direct (/images/...)</MenuItem>
              </Select>
            </FormControl>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                onClick={handleTestSamplePath}
                disabled={testing || (!customPath && !selectedSamplePath)}
              >
                {testing ? <CircularProgress size={24} sx={{ mr: 1 }} /> : 'Test Path'}
              </Button>
              
              <Button 
                variant="outlined" 
                onClick={handleTestAllPaths}
                disabled={testing}
              >
                Test All Sample Paths
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Preview:
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, wordBreak: 'break-all' }}>
                {getResolvedPath(getTestPath())}
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch 
                    checked={showImages} 
                    onChange={(e) => setShowImages(e.target.checked)} 
                  />
                }
                label="Show images"
              />
              
              {showImages && getTestPath() && (
                <Box 
                  sx={{ 
                    mt: 2, 
                    p: 2, 
                    border: '1px dashed #ccc', 
                    borderRadius: 1,
                    minHeight: 200,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                  }}
                >
                  <img 
                    src={getResolvedPath(getTestPath())}
                    alt="Test preview"
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: 200,
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const parent = e.target.parentElement;
                      if (parent) {
                        const errorEl = document.createElement('div');
                        errorEl.className = 'error-message';
                        errorEl.innerHTML = 'Image failed to load';
                        errorEl.style.color = 'red';
                        parent.appendChild(errorEl);
                      }
                    }}
                  />
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Test Results
        </Typography>
        
        {testResults.length === 0 ? (
          <Alert severity="info">
            No test results yet. Run a test to see results.
          </Alert>
        ) : (
          <List>
            {testResults.map((result, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 16, 
                          height: 16, 
                          borderRadius: '50%', 
                          bgcolor: result.success ? 'success.main' : 'error.main',
                          mr: 1
                        }} 
                      />
                      <Typography variant="body1">
                        {result.path}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        Resolved to: {result.resolvedPath}
                      </Typography>
                      <Typography variant="body2">
                        {result.success ? `Loaded in ${result.time}ms` : 'Failed to load'}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default ImageDebugger; 