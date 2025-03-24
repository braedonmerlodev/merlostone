import { useEffect } from 'react';

/**
 * A utility component that attempts to fetch images directly to check access
 * This component doesn't render anything but performs network tests in the background
 */
function ImageTestHelper() {
  useEffect(() => {
    console.group('🔍 ImageTestHelper: Direct image access test');
    console.log('Testing direct image access via fetch API...');
    
    // Test images from various paths
    const testImages = [
      '/images/1.jpg',
      '/images/optimized/1.jpg',
      '/images/industrial/1.jpg',
      '/images/me.jpg'
    ];
    
    // Create an array of promises for all fetch requests
    const fetchPromises = testImages.map(path => {
      return fetch(path)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed with status: ${response.status}`);
          }
          return {
            path,
            status: response.status,
            ok: response.ok
          };
        })
        .catch(error => {
          return {
            path,
            error: error.message,
            ok: false
          };
        });
    });
    
    // Execute all fetch requests and log results
    Promise.all(fetchPromises).then(results => {
      console.table(results);
      
      const successCount = results.filter(r => r.ok).length;
      const failCount = results.length - successCount;
      
      console.log(`✅ Successful requests: ${successCount}`);
      console.log(`❌ Failed requests: ${failCount}`);
      
      if (failCount > 0) {
        console.warn('Some images are not accessible via direct fetch. This may indicate a server configuration issue.');
      } else {
        console.log('All test images are accessible via direct fetch.');
      }
      
      console.groupEnd();
    });
    
    // Test if images can be accessed from the server origin
    console.log('Testing if image paths work with full origin URL...');
    const origin = window.location.origin;
    
    fetch(`${origin}/images/1.jpg`)
      .then(response => {
        console.log(`Origin test result (${origin}/images/1.jpg): ${response.ok ? 'SUCCESS' : 'FAILED'} (${response.status})`);
      })
      .catch(error => {
        console.error(`Origin test error (${origin}/images/1.jpg):`, error);
      });
    
  }, []);
  
  // This component doesn't render anything
  return null;
}

export default ImageTestHelper; 