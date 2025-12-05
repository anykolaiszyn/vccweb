# URGENT: Fix CORS Error for Checkout

## Problem
Orders failing with: `No 'Access-Control-Allow-Origin' header is present on the requested resource`

## Solution Applied
Updated `apps-script-updated.js` with:
1. **CORS headers** in `jsonResponse()` function
2. **`doOptions()` handler** for preflight requests

## Deploy Instructions

### Step 1: Copy Updated Code
1. Open `apps-script-updated.js` in this project
2. Copy **ALL** the code (Ctrl+A, Ctrl+C)

### Step 2: Update Google Apps Script
1. Go to https://script.google.com
2. Open your **Tobacco API** project
3. Paste the entire updated code
4. **Save** (Ctrl+S or File > Save)

### Step 3: Redeploy
1. Click **Deploy** > **Manage deployments**
2. Click the **pencil icon** (Edit) on your active deployment
3. Under "Version", click **New version**
4. Add description: "Fixed CORS headers"
5. Click **Deploy**
6. **Important**: The deployment URL should NOT change

### Step 4: Test
1. Go to https://anykolaiszyn.github.io/vccweb/tobacco-shop/checkout/
2. Fill out the checkout form completely
3. **IMPORTANT**: Upload an ID file (the "invalid form control" error means this required field was empty)
4. Submit order - should now work!

## What Changed

### Before:
```javascript
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### After:
```javascript
function jsonResponse(obj) {
  const output = ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
  
  // Add CORS headers
  output.setHeader('Access-Control-Allow-Origin', '*');
  output.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  output.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  return output;
}
```

### New Function Added:
```javascript
function doOptions(e) {
  const output = ContentService.createTextOutput('');
  output.setHeader('Access-Control-Allow-Origin', '*');
  output.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  output.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  output.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
  return output;
}
```

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
