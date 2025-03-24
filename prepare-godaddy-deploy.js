const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const buildDir = 'build-godaddy';
const backendFiles = ['contact.php'];

// Clean up previous build directory if it exists
if (fs.existsSync(buildDir)) {
  console.log(`Removing previous ${buildDir} directory...`);
  try {
    execSync(`rm -rf ${buildDir}`, { stdio: 'inherit' });
    console.log(`Previous ${buildDir} directory removed`);
  } catch (error) {
    console.error(`Error removing ${buildDir} directory:`, error);
    process.exit(1);
  }
}

// Create a fresh build directory
console.log(`Creating fresh ${buildDir} directory...`);
fs.mkdirSync(buildDir, { recursive: true });
console.log(`Created ${buildDir} directory`);

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
    // Check if the file exists in the root directory
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, path.join(buildDir, file));
      console.log(`Copied ${file} from root directory to ${buildDir}/${file}`);
    } 
    // If not in root, try client/public directory
    else if (fs.existsSync(path.join('client', 'public', file))) {
      fs.copyFileSync(path.join('client', 'public', file), path.join(buildDir, file));
      console.log(`Copied ${file} from client/public directory to ${buildDir}/${file}`);
    }
    else {
      console.warn(`Warning: Could not find ${file} in root or client/public directories`);
    }
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