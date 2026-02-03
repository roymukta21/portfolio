# 🚀 Create EmailJS Template - 2 Minutes Setup

## Your Current Status:
- ✅ **Service ID**: `service_dp45guh` (Working)
- ✅ **Public Key**: `l-ZAe_tuDO6V8aSfA` (Working)
- 🟡 **Template**: Need to create now

## Quick Template Creation:

### Step 1: Go to EmailJS Dashboard
- Visit: https://dashboard.emailjs.com/admin/templates
- Login with your account

### Step 2: Create New Template
- Click **"Create New Template"**
- Template Name: `Mukta Portfolio Contact`

### Step 3: Template Content
**Subject Line:**
```
New Portfolio Message from {{name}}
```

**Email Body:**
```
Hello Mukta,

You have received a new message from your portfolio website:

From: {{name}}
Email: {{email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was automatically sent from your portfolio contact form.
```

### Step 4: Save & Get Template ID
- Click **"Save"**
- Copy the **Template ID** (looks like: `template_abc123`)

### Step 5: Update Your Code
Replace in `src/config/emailjs.js`:
```javascript
TEMPLATE_ID: 'your_copied_template_id_here',
```

## 🎯 After This:
- ✅ Contact form will send real emails
- ✅ You'll receive messages at `muktaroy520@gmail.com`
- ✅ Professional contact experience

## 🔥 Alternative Quick Fix:
If you want to test immediately, try these common template IDs:
- `template_default`
- `template_1`
- `contact_form`

---
**Time Required**: 2-3 minutes
**Result**: Fully working contact form! 📧