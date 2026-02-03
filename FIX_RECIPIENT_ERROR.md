# 🔧 Fix "Recipients address is empty" Error

## 🚨 Problem: 
EmailJS template এ "To Email" field empty আছে।

## ✅ EXACT Solution:

### Step 1: EmailJS Dashboard এ যান
- Go to: **https://dashboard.emailjs.com/admin/templates**
- Find template: `template_6bam8ud`

### Step 2: Template Settings Edit করুন
1. Click on `template_6bam8ud` template
2. **Template Settings** section এ যান
3. **"To Email"** field এ এটা লিখুন: `muktaroy520@gmail.com`

### Step 3: Template Content (Already Correct)
```
From Name: {{from_name}}
Reply To: {{reply_to}}
Subject: {{subject}}
Message: {{message}}
```

### Step 4: Advanced Settings
Make sure these are set:
- **To Email**: `muktaroy520@gmail.com`
- **From Name**: `{{from_name}}`
- **Reply To**: `{{reply_to}}`

### Step 5: Save Template
- Click **"Save"** button
- Test the template if possible

## 🎯 After Fix:
1. Template এ recipient address set হবে
2. Form submit করলে email যাবে `muktaroy520@gmail.com` এ
3. Error আর আসবে না

## ⚡ Quick Alternative:
যদি template edit করতে সমস্যা হয়:
1. New template তৈরি করুন
2. Template ID: `contact_mukta`
3. To Email: `muktaroy520@gmail.com`
4. Same content paste করুন
5. আমাকে নতুন Template ID দিন

---
**Fix করার পর form test করুন!** 📧