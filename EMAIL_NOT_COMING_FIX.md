# 🔧 Email আসছে না - Immediate Fix

## 🚨 Problem: 
Form submit হচ্ছে কিন্তু `muktaroy520@gmail.com` এ email আসছে না।

## ✅ Solution - 5 Minutes Setup:

### Step 1: EmailJS Dashboard এ যান
**Link**: https://dashboard.emailjs.com/admin/templates

### Step 2: Create New Template (Exact Steps)
1. Click **"Create New Template"**
2. Template Name: `Contact Form`
3. **Template ID**: `template_contact_form` (exactly এইটা)

### Step 3: Template Settings
**To Email**: `muktaroy520@gmail.com`
**From Name**: `{{from_name}}`
**Reply To**: `{{reply_to}}`

### Step 4: Email Content (Copy Paste করুন)

**Subject Line**:
```
Portfolio Contact: {{subject}} - from {{from_name}}
```

**Email Body**:
```
নতুন message এসেছে আপনার portfolio থেকে:

নাম: {{from_name}}
ইমেইল: {{reply_to}}
বিষয়: {{subject}}

মেসেজ:
{{message}}

---
Direct reply করতে চাইলে {{reply_to}} এ reply করুন।

Sent from Portfolio Contact Form
```

### Step 5: Variable Mapping (Important!)
Make sure these are mapped correctly:
- `from_name` → Name field
- `reply_to` → Email field  
- `subject` → Subject field
- `message` → Message field

### Step 6: Test Template
- Click **"Test"** button
- Send test email to verify

## 🎯 After This Setup:
- Form submit করলে direct `muktaroy520@gmail.com` এ email যাবে
- Complete message থাকবে
- Sender এর email থেকে direct reply করতে পারবেন

## ⚡ Quick Alternative:
যদি template তৈরি করতে সমস্যা হয়:
1. EmailJS dashboard এ existing templates check করুন
2. কোন template আছে কিনা দেখুন
3. সেই template এর ID copy করে আমাকে দিন

---
**Time**: 5 minutes
**Result**: Direct email delivery! 📧