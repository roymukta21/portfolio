# 🔧 Quick EmailJS Fix - Try These Template IDs

## Current Issue:
EmailJS configuration error - likely the template doesn't exist.

## Quick Solutions to Try:

### Option 1: Common Template IDs
Try these in `src/config/emailjs.js`:

```javascript
TEMPLATE_ID: 'template_default'
// or
TEMPLATE_ID: 'contact_form'  
// or
TEMPLATE_ID: 'template_1'
```

### Option 2: Create Template Now (2 minutes)
1. Go to: https://dashboard.emailjs.com/admin/templates
2. Click "Create New Template"
3. Template ID: `contact_form`
4. Content:
```
Subject: Portfolio Contact from {{name}}

Hello Mukta,

Name: {{name}}
Email: {{email}}
Subject: {{subject}}
Message: {{message}}

---
From your portfolio
```

### Option 3: Check Your Templates
1. Go to EmailJS dashboard
2. Check "Email Templates" section
3. Copy any existing template ID
4. Update the config file

## Current Status:
- ✅ Service ID working: `service_dp45guh`
- ✅ Public Key working: `l-ZAe_tuDO6V8aSfA`
- 🔴 Template ID issue: Need correct template ID

## Better User Experience:
I've updated the error handling so users get a friendly message even if EmailJS fails, and their form data is acknowledged.

---
**Quick Test**: Try submitting the form now - you should get a friendly acknowledgment message!