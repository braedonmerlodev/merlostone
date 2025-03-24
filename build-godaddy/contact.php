<?php
// Load environment configuration
require_once '.env.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$subject = $data['subject'] ?? 'Website Inquiry';
$message = $data['message'] ?? '';
$recaptchaToken = $data['recaptchaToken'] ?? '';

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name, email, and message are required']);
    exit();
}

// Verify reCAPTCHA
$recaptchaSecret = RECAPTCHA_SECRET_KEY; // Your reCAPTCHA secret key
$recaptchaVerify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$recaptchaToken}");
$recaptchaResponse = json_decode($recaptchaVerify);

// Skip reCAPTCHA verification for local development tokens
$isDevToken = (strpos($recaptchaToken, 'development-environment-token') === 0);

if (!$isDevToken && (!$recaptchaResponse || !$recaptchaResponse->success)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'reCAPTCHA verification failed']);
    exit();
}

// Prepare email
$to = 'davemerlo@comcast.net'; // Primary recipient
$bcc = 'bdmerlo@gmail.com'; // BCC recipient for backup
$emailSubject = "New Contact Form Submission: $subject";

// Create HTML email body
$emailBody = "
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    h2 { color: #212121; border-bottom: 1px solid #eee; padding-bottom: 10px; }
    .info { margin-bottom: 20px; }
    .label { font-weight: bold; }
    .message { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #212121; margin-top: 20px; }
    .footer { margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 10px; }
  </style>
</head>
<body>
  <div class='container'>
    <h2>New Contact Form Submission</h2>
    
    <div class='info'>
      <p><span class='label'>Name:</span> " . htmlspecialchars($name) . "</p>
      <p><span class='label'>Email:</span> " . htmlspecialchars($email) . "</p>
      <p><span class='label'>Phone:</span> " . (empty($phone) ? "Not provided" : htmlspecialchars($phone)) . "</p>
      <p><span class='label'>Subject:</span> " . htmlspecialchars($subject) . "</p>
    </div>
    
    <div class='message'>
      <h3>Message:</h3>
      <p>" . nl2br(htmlspecialchars($message)) . "</p>
    </div>
    
    <div class='footer'>
      <p>This email was sent from the Merlo Stone website contact form.</p>
    </div>
  </div>
</body>
</html>
";

// Set email headers
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Merlo Stone Website <noreply@' . $_SERVER['HTTP_HOST'] . '>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'Bcc: ' . $bcc;
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Send email
$mailSent = mail($to, $emailSubject, $emailBody, implode("\r\n", $headers));

if ($mailSent) {
    // Log success for debugging (you can remove this in production)
    error_log("Email sent successfully to $to from $email");
    
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you! Your message has been sent successfully. We\'ll get back to you shortly.'
    ]);
} else {
    // Log error for debugging
    error_log("Failed to send email to $to from $email");
    
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Failed to send email. Please try again or contact us directly at (925) 525-5802.'
    ]);
}
?> 