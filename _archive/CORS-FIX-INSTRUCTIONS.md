# URGENT: Fix CORS Error for Checkout

## Problem
Orders failing with: `No 'Access-Control-Allow-Origin' header is present on the requested resource`

## Solution
The CORS error occurs because your Apps Script web app isn't configured to allow cross-origin requests.

## Deploy Instructions (CRITICAL)

### Step 1: Copy Updated Code
1. Open `apps-script-updated.js` in this project
2. Copy **ALL** the code (Ctrl+A, Ctrl+C)

### Step 2: Update Google Apps Script
1. Go to https://script.google.com
2. Open your **Tobacco API** project
3. Paste the entire updated code
4. **Save** (Ctrl+S or File > Save)

### Step 3: Check Deployment Settings (MOST IMPORTANT)
1. Click **Deploy** > **Manage deployments**
2. Click the **pencil icon** (Edit) on your active deployment
3. Verify these settings:
   - **Execute as**: "Me" (your account)
   - **Who has access**: **"Anyone"** (NOT "Anyone with Google account")
4. Under "Version", click **New version**
5. Add description: "CORS fix - allow anyone access"
6. Click **Deploy**
7. **Authorize** if prompted (grant permissions)
8. **Important**: The deployment URL should NOT change

### Step 4: Test
1. Go to https://anykolaiszyn.github.io/vccweb/tobacco-shop/checkout/
2. Fill out the checkout form completely
3. **IMPORTANT**: Upload an ID file (the "invalid form control" error means this required field was empty)
4. Submit order - should now work!

## What's Actually Wrong

**Apps Script CORS is controlled by deployment settings, NOT code headers.**

When you deploy as a web app, you MUST set:
- **Who has access**: "Anyone" (allows cross-origin requests)
- **Execute as**: "Me" (runs with your permissions)

If set to "Anyone with Google account", it blocks CORS from public sites like GitHub Pages.

## Troubleshooting

**If still getting CORS errors:**
- Make sure you clicked **New version** when redeploying
- Clear browser cache (Ctrl+Shift+R)
- Check Apps Script execution logs for errors

**If "invalid form control" error:**
- This means the ID upload field (`#idUpload`) is required but empty
- Make sure to select a file before submitting
- Consider making ID upload optional for returning customers

**If deployment URL changed:**
- Update `checkout.html` with the new Apps Script URL
- Search for `script.google.com/macros/s/AKfycb...` and replace
