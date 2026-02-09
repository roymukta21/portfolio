// EmailJS Configuration
// Your EmailJS credentials

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_dp45guh',
  TEMPLATE_ID: 'template_yi7up16',
  PUBLIC_KEY: 'l-ZAe_tuDO6V8aSfA',
};


// SETUP INSTRUCTIONS:
// ===================
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Verify your email address
// 
// 3. CREATE EMAIL SERVICE:
//    - Go to Email Services tab
//    - Click "Add New Service"
//    - Choose your email provider (Gmail, Outlook, etc.)
//    - Follow the setup instructions
//    - Copy the Service ID and replace SERVICE_ID above
//
// 4. CREATE EMAIL TEMPLATE:
//    - Go to Email Templates tab
//    - Click "Create New Template"
//    - Use this template structure:
//
//    Subject: New Contact Form Message from {{name}}
//    
//    Hello Mukta,
//    
//    You have received a new message from your portfolio contact form:
//    
//    Name: {{name}}
//    Email: {{email}}
//    Subject: {{subject}}
//    
//    Message:
//    {{message}}
//    
//    ---
//    This message was sent from your portfolio website.
//    
//    - Save the template and copy the Template ID
//    - Replace TEMPLATE_ID above
//
// 5. GET PUBLIC KEY:
//    - Go to Account tab
//    - Copy the Public Key
//    - Replace PUBLIC_KEY above
//
// 6. TEST THE INTEGRATION:
//    - Fill out the contact form on your website
//    - Check your email for the message
//    - Verify all template variables are working correctly
//
// IMPORTANT NOTES:
// - EmailJS free plan allows 200 emails per month
// - Make sure your email service is properly configured
// - Test with a real email address to ensure delivery
// - Check spam folder if emails don't arrive