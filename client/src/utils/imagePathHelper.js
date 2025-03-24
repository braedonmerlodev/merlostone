/**
 * Image Path Helper
 * 
 * This utility standardizes how image paths are resolved across the application
 * to ensure consistent behavior regardless of component or context.
 * It includes special handling for GitHub Codespaces environments.
 */

// Detect if we're in a GitHub Codespaces environment
const isCodespaces = () => {
  return typeof window !== 'undefined' && 
    (window.location.hostname.includes('github.dev') || 
    window.location.hostname.includes('github.io') ||
    window.location.hostname.includes('githubpreview.dev'));
};

// Get the PUBLIC_URL environment variable if available
const getPublicUrl = () => {
  return process.env.PUBLIC_URL || '';
};

// Get the origin of the current page
const getOrigin = () => {
  return typeof window !== 'undefined' ? window.location.origin : '';
};

// Base URL for images, adapted for environment
const getBaseImagePath = () => {
  // In Codespaces, we might need to adjust the path
  if (isCodespaces()) {
    const publicUrl = getPublicUrl();
    return publicUrl ? `${publicUrl}/images` : '/images';
  }
  return '/images';
};

/**
 * Resolves an image path to ensure consistent handling across the application
 * @param {string} path - Relative path to the image (with or without leading slash)
 * @param {Object} options - Additional options
 * @param {boolean} options.useOptimized - Whether to use optimized version if available
 * @param {boolean} options.absolute - Whether to return an absolute URL (including origin)
 * @param {boolean} options.withPublicUrl - Whether to include PUBLIC_URL
 * @returns {string} Properly formatted image path
 */
export const getImagePath = (path, options = {}) => {
  const {
    useOptimized = false,
    absolute = false,
    withPublicUrl = true,
  } = options;
  
  // Clean the path (remove any leading slashes)
  const cleanPath = path.replace(/^\/+/, '');
  
  // Determine the base directory
  let basePath = 'images';
  if (useOptimized) {
    // For images that have optimized versions
    if (!cleanPath.includes('optimized/')) {
      basePath = 'images/optimized';
    }
  }
  
  // Build the path
  let finalPath = '';
  
  // Add origin for absolute URLs
  if (absolute) {
    finalPath += getOrigin();
  }
  
  // Add PUBLIC_URL if needed
  if (withPublicUrl) {
    const publicUrl = getPublicUrl();
    finalPath += publicUrl ? (publicUrl.endsWith('/') ? publicUrl : `${publicUrl}/`) : '/';
  } else if (!absolute) {
    // Add leading slash if not absolute and not using PUBLIC_URL
    finalPath += '/';
  }
  
  // Add base path and image path
  finalPath += basePath;
  if (!basePath.endsWith('/') && !cleanPath.startsWith('/')) {
    finalPath += '/';
  }
  finalPath += cleanPath;
  
  // Log the path construction in development
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[ImagePath] Resolved ${path} → ${finalPath}`, { 
      options, 
      publicUrl: getPublicUrl(),
      origin: getOrigin()
    });
  }
  
  return finalPath;
};

/**
 * Get the fallback path for an image
 * @param {string} path - The original image path
 * @param {Object} options - Additional options
 * @param {boolean} options.absolute - Whether to return an absolute URL
 * @returns {string} The fallback image path
 */
export const getFallbackPath = (path, options = {}) => {
  const { absolute = false } = options;
  
  // Handle null/undefined paths
  if (!path) return '';
  
  // Handle absolute URLs
  if (path.match(/^https?:\/\//)) {
    return path;
  }
  
  // Remove leading slash if present
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Get the base path for our environment
  const basePath = getBaseImagePath();
  
  // If this is one of the main slider images, use optimized version as fallback
  const mainImageRegex = /^(?:images\/)?(\d+\.jpg)$/;
  const match = normalizedPath.match(mainImageRegex);
  
  if (match) {
    const result = `${basePath}/optimized/${match[1]}`;
    return absolute ? window.location.origin + result : result;
  }
  
  // For other images, just return the original path with consistent formatting
  const pathWithLeadingSlash = path.startsWith('/') ? path : '/' + path;
  return absolute ? window.location.origin + pathWithLeadingSlash : pathWithLeadingSlash;
};

/**
 * Returns a properly formatted srcSet for responsive images
 * @param {string} basePath - Base path to the image
 * @returns {string} Generated srcSet string
 */
export const getSrcSet = (basePath) => {
  // This is a placeholder for future implementation
  // Would generate URLs for different resolutions
  return '';
};

/**
 * Creates an array of image loading promises for preloading
 * @param {Array<string>} paths - Array of image paths to preload
 * @param {Object} options - Additional options
 * @returns {Array<Promise>} Array of promises that resolve when images are loaded
 */
export const preloadImages = (paths, options = {}) => {
  return paths.map(path => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ path, status: 'loaded' });
      img.onerror = () => {
        console.error(`Failed to load image: ${path}`);
        reject({ path, status: 'error' });
      };
      img.src = getImagePath(path, options);
    });
  });
};

/**
 * Test if an image path is accessible
 * 
 * @param {string} path - The full image path to test
 * @param {Object} options - Options for testing
 * @param {number} options.timeout - Timeout in ms (default: 3000)
 * @returns {Promise<boolean>} - Whether the image is accessible
 */
export const testImagePath = (path, options = {}) => {
  const { timeout = 3000 } = options;
  
  return new Promise((resolve) => {
    // Skip testing if no path provided
    if (!path) {
      console.warn('No image path provided for testing');
      resolve(false);
      return;
    }

    console.log(`Testing image path: ${path}`);
    
    // Create a test image element
    const img = new Image();
    let timeoutId = null;
    
    // Set up success handler
    img.onload = () => {
      console.log(`✅ Image loaded successfully: ${path}`);
      if (timeoutId) clearTimeout(timeoutId);
      resolve(true);
    };
    
    // Set up error handler
    img.onerror = () => {
      console.log(`❌ Image failed to load: ${path}`);
      if (timeoutId) clearTimeout(timeoutId);
      resolve(false);
    };
    
    // Set timeout to prevent long-hanging requests
    timeoutId = setTimeout(() => {
      console.log(`⏱️ Image load timed out after ${timeout}ms: ${path}`);
      resolve(false);
    }, timeout);
    
    // Start loading the image
    img.src = path;

    // For data URLs, onload or onerror might not fire if the image is already in memory
    if (path.startsWith('data:')) {
      setTimeout(() => {
        if (img.complete) {
          console.log('Data URL image already loaded');
          if (timeoutId) clearTimeout(timeoutId);
          resolve(true);
        }
      }, 50);
    }
  });
};

/**
 * Preload an image
 * 
 * @param {string} path - The image path to preload
 * @returns {Promise<boolean>} - Whether the preload was successful
 */
export const preloadImage = (path) => {
  return testImagePath(path);
};

// Create a named export object for default export
const imageHelpers = {
  getImagePath,
  getFallbackPath,
  getSrcSet,
  preloadImages,
  testImagePath,
  isCodespaces
};

export default imageHelpers; 