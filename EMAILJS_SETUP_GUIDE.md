# 📧 EmailJS Setup Guide for Contact Form

## 🚨 Current Status: Contact Form Not Configured

Your contact form is showing a configuration notice because EmailJS credentials need to be set up.

## 🛠️ Quick Setup Steps:

### 1. Create EmailJS Account
- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Sign up with your email (muktaroy520@gmail.com)
- Verify your email address

### 2. Create Email Service
- Go to **Email Services** tab
- Click **"Add New Service"**
- Choose **Gmail** (recommended)
- Connect your Gmail account (muktaroy520@gmail.com)
- Copy the **Service ID** (looks like: `service_abc123`)

### 3. Create Email Template
- Go to **Email Templates** tab
- Click **"Create New Template"**
- Use this template:

```
Subject: New Contact Form Message from {{name}}

Hello Mukta,

You have received a new message from your portfolio contact form:

Name: {{name}}
Email: {{email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

- Save and copy the **Template ID** (looks like: `template_xyz789`)

### 4. Get Public Key
- Go to **Account** tab
- Copy your **Public Key** (looks like: `user_abcdefghijk123`)

### 5. Update Configuration
Open `src/config/emailjs.js` and replace:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_actual_service_id',     // Replace with step 2
  TEMPLATE_ID: 'your_actual_template_id',   // Replace with step 3
  PUBLIC_KEY: 'your_actual_public_key',     // Replace with step 4
};
```

### 6. Test the Form
- Save the file
- The yellow notice will disappear
- Test by filling out the contact form
- Check your email for the message

## 🎯 What Happens After Setup:
- ✅ Contact form will work properly
- ✅ You'll receive emails at muktaroy520@gmail.com
- ✅ Professional contact experience for visitors
- ✅ No more configuration notices

## 📞 Alternative Contact Methods (Currently Active):
Until EmailJS is configured, visitors can contact you via:
- **Email**: muktaroy520@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/roy-mukta
- **GitHub**: https://github.com/roymukta21
- **Facebook**: https://www.facebook.com/mukta.roy.5682944/

## 💡 Benefits of EmailJS:
- **Free**: 200 emails/month on free plan
- **Professional**: Branded contact form experience
- **Reliable**: Direct delivery to your inbox
- **Analytics**: Track form submissions

---

**Need Help?** The setup takes about 10 minutes. Once configured, your contact form will work perfectly! 🚀