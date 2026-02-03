# 🚨 URGENT: Email আসছে না - Exact Fix

## 📧 Problem: 
Portfolio তে message দেখাচ্ছে কিন্তু `muktaroy520@gmail.com` এ email আসছে না।

## ✅ EXACT Solution (10 minutes):

### Step 1: EmailJS Dashboard Login
1. Go to: **https://dashboard.emailjs.com/admin**
2. Login with your account

### Step 2: Check Templates
1. Click **"Email Templates"** tab
2. দেখুন কোন template আছে কিনা
3. যদি কোন template না থাকে, নতুন তৈরি করুন

### Step 3: Create New Template (EXACT STEPS)
1. Click **"Create New Template"**
2. **Template Name**: `Portfolio Contact`
3. **Template ID**: `template_portfolio` (remember this!)

### Step 4: Template Configuration
**To Email**: `muktaroy520@gmail.com` (আপনার email)
**From Name**: `{{from_name}}`
**Reply To**: `{{reply_to}}`

### Step 5: Email Content (COPY PASTE)

**Subject**:
```
Portfolio Message from {{from_name}} - {{subject}}
```

**Email Body**:
```
আপনার portfolio থেকে নতুন message:

নাম: {{from_name}}
ইমেইল: {{reply_to}}
বিষয়: {{subject}}

মেসেজ:
{{message}}

---
Reply করতে {{reply_to}} এ email করুন।
```

### Step 6: Save & Get Template ID
1. Click **"Save"**
2. **Template ID copy করুন** (যেমন: `template_portfolio`)
3. আমাকে Template ID টা দিন

## 🔧 Alternative Check:
1. EmailJS dashboard এ **"Email Services"** check করুন
2. `service_dp45guh` active আছে কিনা দেখুন
3. Gmail connection ঠিক আছে কিনা verify করুন

## ⚡ Quick Test:
Template তৈরি করার পর:
1. Portfolio form fill করুন
2. Submit করুন
3. 2-3 minutes wait করুন
4. `muktaroy520@gmail.com` check করুন (spam folder সহ)

---
**Template ID পেলে আমি code update করে দিব!**