/**
 * Image Optimization Script
 * 
 * This script can be run to create optimized versions of the large homepage images
 * You'll need to install 'sharp' by running: npm install sharp
 * 
 * Then run this script with: node client/scripts/optimizeImages.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log('Image Optimization Script');
console.log('========================================');
console.log('This script will help optimize large slider images.');
console.log('To use this script properly, please install the following:');
console.log('  npm install sharp');
console.log('');
console.log('Then, the script will create optimized versions of your large images');
console.log('in the /public/images/optimized/ directory');
console.log('========================================\n');

const sourceDir = path.join(__dirname, '../public/images');
const targetDir = path.join(__dirname, '../public/images/optimized');

// Create the optimized directory if it doesn't exist
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    } catch (error) {
      console.error(`Error creating directory ${dir}:`, error);
      process.exit(1);
    }
  }
};

// Main function that attempts to optimize the images
const optimizeImages = async () => {
  try {
    console.log('Checking for required dependencies...');
    
    // Attempting to load sharp (will fail if not installed)
    let sharp;
    try {
      sharp = require('sharp');
    } catch (error) {
      console.error('Error: The "sharp" package is not installed. Please run:');
      console.error('  npm install sharp');
      console.error('and then run this script again.');
      process.exit(1);
    }
    
    // Create optimized directory
    ensureDirectoryExists(targetDir);
    
    // Process slider images (1.jpg, 2.jpg, 3.jpg, 4.jpg)
    const sliderImages = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
    
    console.log('Starting optimization...');
    
    for (const imageName of sliderImages) {
      const sourcePath = path.join(sourceDir, imageName);
      const optimizedPath = path.join(targetDir, imageName);
      
      // Check if the source image exists
      if (!fs.existsSync(sourcePath)) {
        console.warn(`Warning: Source image ${sourcePath} not found.`);
        continue;
      }
      
      // Get image info
      const imageInfo = await sharp(sourcePath).metadata();
      const fileStats = fs.statSync(sourcePath);
      const fileSizeMB = (fileStats.size / (1024 * 1024)).toFixed(2);
      
      console.log(`Processing ${imageName} (${imageInfo.width}x${imageInfo.height}, ${fileSizeMB} MB)...`);
      
      // Create optimized version (80% quality, max width 1920px)
      await sharp(sourcePath)
        .resize({ 
          width: Math.min(1920, imageInfo.width),
          withoutEnlargement: true 
        })
        .jpeg({ quality: 80 })
        .toFile(optimizedPath);
      
      // Create thumbnail version
      const thumbPath = path.join(targetDir, `thumb_${imageName}`);
      await sharp(sourcePath)
        .resize({ width: 400 })
        .jpeg({ quality: 60 })
        .toFile(thumbPath);
      
      const optimizedStats = fs.statSync(optimizedPath);
      const optimizedSizeMB = (optimizedStats.size / (1024 * 1024)).toFixed(2);
      const savings = (100 - (optimizedStats.size / fileStats.size * 100)).toFixed(2);
      
      console.log(`  ✅ Optimized: ${optimizedSizeMB} MB (${savings}% smaller)`);
    }
    
    console.log('\nOptimization complete!');
    console.log('You can now update your code to use these optimized images from:');
    console.log(`  /images/optimized/`);
    console.log('For example, change:');
    console.log('  "/images/1.jpg" to "/images/optimized/1.jpg"');
    
  } catch (error) {
    console.error('Error during optimization:', error);
  }
};

// Run the optimization
optimizeImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 