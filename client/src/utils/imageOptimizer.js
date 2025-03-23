/**
 * Image Optimizer Utility
 * 
 * A utility to assist with image loading strategies.
 * Creates placeholder versions of images and implements progressive loading.
 */

/**
 * Gets a lower quality placeholder URL for an image by adding query parameters
 * This works if you have image optimization middleware on your server.
 * If not, it just returns the original URL.
 * 
 * @param {string} imageUrl - Original image URL
 * @returns {string} Placeholder image URL
 */
export const getPlaceholderUrl = (imageUrl) => {
  if (!imageUrl) return '';
  
  // For sites using imgix, cloudinary, etc. you can use their URL params
  // For a static site, we just return the original
  return imageUrl;
};

/**
 * Pre-loads an image and returns a promise that resolves when the image is loaded
 * 
 * @param {string} src - Image source URL
 * @returns {Promise} Promise that resolves when image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
  });
};

/**
 * Checks if an image exists at the given URL
 * 
 * @param {string} url - Image URL to check
 * @returns {Promise<boolean>} Promise that resolves to true if image exists
 */
export const imageExists = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error("Error checking if image exists:", error);
    return false;
  }
};

/**
 * Gets image dimensions once loaded
 * 
 * @param {string} src - Image source URL
 * @returns {Promise<{width: number, height: number}>} Image dimensions
 */
export const getImageDimensions = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    img.onerror = reject;
    img.src = src;
  });
};

export default {
  getPlaceholderUrl,
  preloadImage,
  imageExists,
  getImageDimensions
}; 