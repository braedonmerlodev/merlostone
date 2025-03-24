const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const buildDir = 'build-godaddy';
const backendFiles = ['contact.php'];

// Create the build directory if it doesn't exist
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
  console.log(`Created ${buildDir} directory`);
}

// Build the React app
console.log('Building React app...');
try {
  execSync('cd client && npm run build', { stdio: 'inherit' });
  console.log('React app built successfully');
} catch (error) {
  console.error('Error building React app:', error);
  process.exit(1);
}

// Copy the React build to the deployment directory
console.log('Copying React build files...');
try {
  execSync(`cp -r client/build/* ${buildDir}/`, { stdio: 'inherit' });
  console.log('React build files copied successfully');
} catch (error) {
  console.error('Error copying React build files:', error);
  process.exit(1);
}

// Copy backend PHP files
console.log('Copying PHP backend files...');
for (const file of backendFiles) {
  try {
    fs.copyFileSync(file, path.join(buildDir, file));
    console.log(`Copied ${file} to ${buildDir}/${file}`);
  } catch (error) {
    console.error(`Error copying ${file}:`, error);
    process.exit(1);
  }
}

console.log('\n**************************************');
console.log(`Deployment files ready in '${buildDir}' directory!`);
console.log('Upload ALL files from this directory to your GoDaddy hosting via FTP.');
console.log('**************************************\n');

// Print additional instructions
console.log('Deployment Instructions:');
console.log('1. Use an FTP client (like FileZilla) to connect to your GoDaddy hosting');
console.log('2. Upload all files from the build-godaddy directory to your web root (usually public_html)');
console.log('3. Make sure contact.php has permissions set to 644 (readable by all, writable by owner)');
console.log('4. Test your form by submitting a test message');
console.log('5. Check both email addresses to verify receipt');
console.log('\nFor troubleshooting, check your server error logs or add more logging to contact.php\n'); 