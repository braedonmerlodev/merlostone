import React, { createContext, useState, useEffect, useContext } from 'react';
import { testImagePath, getImagePath } from '../utils/imagePathHelper';

// Create a context for managing image path strategies
export const ImageContext = createContext({
  resolveImagePath: (path) => path,
  pathMode: 'relative',
  loading: true,
  error: null
});

// Path modes to try in order
const PATH_MODES = [
  { id: 'relative', description: 'Relative path with leading slash' },
  { id: 'absolute', description: 'Absolute URL with origin' },
  { id: 'optimized', description: 'Optimized image path' },
  { id: 'raw', description: 'Raw path as provided' }
];

// Test image to use for determining which path strategy works
const TEST_IMAGE = '1.jpg';

export const ImageProvider = ({ children }) => {
  const [pathMode, setPathMode] = useState('relative');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Resolve an image path using the strategy that works
  const resolveImagePath = (path, options = {}) => {
    // If raw mode, return the path as is
    if (pathMode === 'raw') return path;
    
    // Apply the best working strategy
    switch (pathMode) {
      case 'absolute':
        return getImagePath(path, { ...options, absolute: true });
      case 'optimized':
        return getImagePath(path, { ...options, useOptimized: true });
      case 'relative':
      default:
        return getImagePath(path, options);
    }
  };
  
  // On mount, test all path strategies to find which one works
  useEffect(() => {
    const testPathStrategies = async () => {
      console.log('ImageContext: Testing image path strategies...');
      
      try {
        // Create test paths for each strategy
        const testPaths = PATH_MODES.map(mode => {
          const path = mode.id === 'raw' 
            ? `/images/${TEST_IMAGE}` 
            : mode.id === 'absolute'
              ? getImagePath(TEST_IMAGE, { absolute: true })
              : mode.id === 'optimized'
                ? getImagePath(TEST_IMAGE, { useOptimized: true })
                : getImagePath(TEST_IMAGE);
                
          return { 
            mode: mode.id, 
            path, 
            description: mode.description 
          };
        });
        
        // Log test paths
        console.log('Testing the following image path strategies:');
        testPaths.forEach(test => console.log(`- ${test.mode}: ${test.path}`));
        
        // Test each path
        const results = await Promise.all(
          testPaths.map(async (test) => {
            const success = await testImagePath(test.path);
            return { ...test, success };
          })
        );
        
        // Log results
        console.log('Image path test results:');
        results.forEach(result => {
          console.log(`- ${result.mode}: ${result.success ? 'SUCCESS' : 'FAILED'}`);
        });
        
        // Use the first successful strategy
        const firstSuccess = results.find(r => r.success);
        if (firstSuccess) {
          console.log(`Using image path strategy: ${firstSuccess.mode} (${firstSuccess.description})`);
          setPathMode(firstSuccess.mode);
          setError(null);
        } else {
          console.error("All image path strategies failed!");
          setError(new Error("All image path strategies failed"));
          // Use 'raw' as fallback
          setPathMode('raw');
        }
      } catch (err) {
        console.error('Error testing image paths:', err);
        setError(err);
        // Use 'raw' as fallback
        setPathMode('raw');
      } finally {
        setLoading(false);
      }
    };
    
    testPathStrategies();
  }, []);
  
  // The value provided by the context
  const contextValue = {
    resolveImagePath,
    pathMode,
    loading,
    error
  };
  
  return (
    <ImageContext.Provider value={contextValue}>
      {children}
    </ImageContext.Provider>
  );
};

// Custom hook for using the image context
export const useImages = () => useContext(ImageContext);

export default ImageContext; 