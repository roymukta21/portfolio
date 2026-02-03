# 📧 Direct Email Setup - Contact Form থেকে সরাসরি Email

## 🎯 Goal: 
Contact form এ যা লেখা হবে সেটা direct আপনার `muktaroy520@gmail.com` এ চলে যাবে।

## 🚀 Step-by-Step Setup:

### Step 1: EmailJS Dashboard এ যান
- Link: https://dashboard.emailjs.com/admin/templates
- Login করুন

### Step 2: New Template তৈরি করুন
- Click **"Create New Template"**
- Template Name: `Portfolio Contact Form`

### Step 3: Template Configuration
**Template ID**: `template_contact_form` (exactly এইটা দিন)

**To Email**: `muktaroy520@gmail.com` (আপনার email)

**Subject**: 
```
Portfolio Contact: {{subject}} - from {{name}}
```

**Email Body**:
```
আপনার portfolio থেকে নতুন message এসেছে:

নাম: {{name}}
ইমেইল: {{email}}
বিষয়: {{subject}}

মেসেজ:
{{message}}

---
Reply করতে চাইলে direct {{email}} এ reply করুন।

Sent from: Portfolio Contact Form
Time: {{reply_to}}
```

### Step 4: Template Variables Setup
Make sure these variables are mapped:
- `{{name}}` → from_name
- `{{email}}` → from_email  
- `{{subject}}` → subject
- `{{message}}` → message
- `{{reply_to}}` → reply_to

### Step 5: Save Template
- Click **"Save"**
- Template ID should be: `template_contact_form`

## ✅ After Setup:
1. Contact form এ message লিখলে
2. Direct আপনার `muktaroy520@gmail.com` এ email যাবে
3. Sender এর email থেকে direct reply করতে পারবেন

## 🔧 Alternative Quick Fix:
যদি template তৈরি করতে সমস্যা হয়, আমাকে বলুন। আমি code এ একটা fallback solution দিতে পারি।

---
**Result**: Contact form → Direct email to your inbox! 📬