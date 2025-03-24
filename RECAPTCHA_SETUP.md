# reCAPTCHA v3 Setup for Merlo Stone Website

This guide will walk you through the process of setting up Google reCAPTCHA v3 for your Merlo Stone website contact form.

## 1. Register for reCAPTCHA v3

1. Visit the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Sign in with your Google account
3. Click on the "+ Create" button to create a new reCAPTCHA key
4. Enter a name for your site (e.g., "Merlo Stone Website")
5. Select "reCAPTCHA v3" as the reCAPTCHA type
6. Add your domains in the "Domains" field (e.g., merlostone.com and your development domain)
7. Accept the Terms of Service and click "Submit"
8. You will receive two keys: a **Site Key** and a **Secret Key**

## 2. Configure Your Website

### Frontend Configuration

1. Open `client/src/App.js` and replace the placeholder reCAPTCHA site key with your actual site key:

```javascript
// Find this line
const RECAPTCHA_SITE_KEY = 'YOUR_RECAPTCHA_SITE_KEY';

// Replace with your actual site key
const RECAPTCHA_SITE_KEY = '6Ldxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
```

### Backend Configuration

1. Open the `server/.env` file and update the reCAPTCHA secret key:

```
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
```

2. Set up your email configuration for sending contact form submissions:

```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-here
EMAIL_RECIPIENT=davemerlo@comcast.net
```

**Note about Gmail**: If you're using Gmail, you'll need to set up an "App Password" rather than using your regular Gmail password. See [Google's guide on App Passwords](https://support.google.com/accounts/answer/185833).

## 3. Testing

1. Start your development server:
```
npm run dev
```

2. Fill out the contact form and submit it
3. Check the browser console to see if reCAPTCHA is working properly
4. The server logs will also show the reCAPTCHA verification status
5. Check the recipient email to ensure emails are being delivered

## 4. Production Deployment

When deploying to production:

1. Make sure both your site key and secret key are securely stored in environment variables
2. Update the domains list in the Google reCAPTCHA admin console if your production domain is different
3. Test the form on your production site to ensure everything is working correctly

## Common Issues

- **reCAPTCHA Not Loading**: Make sure your domain is correctly listed in the Google reCAPTCHA admin console
- **Verification Failed**: Check that your secret key is correct in the server `.env` file
- **Emails Not Sending**: If using Gmail, make sure you're using an App Password and have less secure apps enabled

## Support

If you encounter any issues with the reCAPTCHA integration, refer to the [official reCAPTCHA documentation](https://developers.google.com/recaptcha/docs/v3) or contact your web developer for assistance. 