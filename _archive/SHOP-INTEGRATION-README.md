# Tobacco Shop Integration Guide

## Overview

The `tobacco-shop.html` file is a self-contained, API-driven product listing page for Vice City Cigars. It integrates seamlessly with your existing Jekyll site and connects to your Google Apps Script inventory API.

## Features

✅ **Dual Shop Structure**
- Square Shop placeholder (for future full e-commerce)
- In-Stock Products section (API-driven, pre-order focused)

✅ **API Integration**
- Fetches live inventory from Google Sheets via Apps Script
- Dynamic product cards with real-time stock levels
- Error handling and loading states

✅ **Shopping Cart**
- In-memory cart system
- Item counter in header
- Console logging for debugging
- Pre-order workflow (no payment processing)

✅ **Vice City Branding**
- Miami Vice cyberpunk aesthetic
- Neon pink and cyan accents
- Dark theme with gold CTAs
- Responsive design

✅ **Compliance**
- 21+ age notice
- Clear messaging about manual verification
- No online payment processing

## Setup Instructions

### 1. Configure API Endpoint

Open `tobacco-shop.html` and find this line (around line 573):

```javascript
const API_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
```

Replace with your actual Google Apps Script Web App URL:

```javascript
const API_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

### 2. API Response Format

Your Apps Script API should return JSON in this format when called with `?route=inventory`:

```json
{
  "items": [
    {
      "SKU": "CIG-001",
      "Display_Name": "Arturo Fuente Hemingway",
      "Price": 12.50,
      "Qty_On_Hand": 24,
      "Description": "<p>Premium Dominican cigar with smooth Connecticut wrapper.</p>",
      "Categories": "Cigars > Premium > Connecticut"
    },
    {
      "SKU": "TOB-042",
      "Display_Name": "English Luxury Blend",
      "Price": 8.99,
      "Qty_On_Hand": 12,
      "Description": "Rich English blend with Latakia",
      "Categories": "Tobacco > Pipe Tobacco > English"
    }
  ]
}
```

**Required Fields:**
- `SKU` - Stock keeping unit (displays as "SKU: N/A" if empty)
- `Display_Name` - Product name (shown as card title)
- `Price` - Numeric price (formatted as currency)
- `Qty_On_Hand` - Stock quantity (shown as "In stock: X")
- `Description` - Product description (HTML stripped automatically)
- `Categories` - Category path (last segment used, e.g., "Connecticut")

### 3. Testing Locally

1. Open `tobacco-shop.html` in a browser
2. Open browser console (F12)
3. Check for API errors or successful data loading
4. Test "Add to Pre-Order" buttons
5. Type `getCart()` in console to view cart contents

### 4. Deploy to GitHub Pages

The file is already configured with Jekyll front matter and will be accessible at:

```
https://anykolaiszyn.github.io/vccweb/shop/
```

Build and deploy:

```bash
cd "v:\Secret Projects\vccweb"
bundle exec jekyll build
git add tobacco-shop.html _includes/header.html
git commit -m "Add tobacco shop with API integration"
git push origin main
```

## File Structure

```
tobacco-shop.html
├── Jekyll Front Matter (permalink: /shop/)
├── <head>
│   ├── Meta tags
│   └── <style> - All CSS inline
├── <body>
│   ├── Header
│   │   ├── Brand section
│   │   ├── Shop dropdown
│   │   └── Cart counter
│   ├── Main Content
│   │   ├── Square Shop placeholder
│   │   └── In-Stock Products (API-driven)
│   └── <script> - All JavaScript inline
```

## JavaScript Functions

### Public Functions

- `getCart()` - Returns current cart contents (available in console)

### Internal Functions

- `sanitizeCategory(rawCategories)` - Extracts final category segment
- `stripHtml(html)` - Removes HTML tags from descriptions
- `formatPrice(price)` - Formats numbers as currency ($X.XX)
- `updateCartCounter()` - Updates header cart count
- `addToCart(sku, name, price)` - Adds item to cart array
- `renderProducts(items)` - Creates product card grid
- `fetchProducts()` - Calls API and handles response
- `initDropdown()` - Sets up dropdown menu behavior

## Customization

### Change Colors

Edit CSS variables in the `<style>` block:

```css
:root {
  --vcc-dark-bg: #0b1114;        /* Main background */
  --vcc-gold: #ffcc66;           /* CTA buttons */
  --vcc-neon-pink: #ff1493;      /* Accents */
  --vcc-cyan: #00ffff;           /* Highlights */
}
```

### Modify Product Card Layout

Find the `renderProducts()` function and edit the card template around line 633.

### Update Grid Columns

Change the CSS grid template:

```css
.product-grid {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  /* Change 280px to adjust minimum card width */
}
```

## Integration with Existing Site

The shop page:
- ✅ Uses Jekyll layout: null (standalone HTML)
- ✅ Includes relative_url filters for navigation
- ✅ Links back to home page
- ✅ Accessible via main navigation menu
- ✅ Matches Vice City Cigars brand aesthetic

## Next Steps

### Immediate
1. Replace `YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` with real API URL
2. Test API connection
3. Verify product data displays correctly
4. Test responsive design on mobile devices

### Future Enhancements
1. **Checkout Flow**
   - Create `/checkout` page
   - Form to collect customer info
   - Email notification system
   - Integration with Square for invoicing

2. **Cart Persistence**
   - Save cart to localStorage
   - Retrieve cart on page reload
   - Clear cart after order submission

3. **Product Images**
   - Add image URLs to API response
   - Display product photos in cards
   - Lightbox for image viewing

4. **Search & Filter**
   - Search by product name
   - Filter by category
   - Filter by price range
   - Sort by price/name/stock

5. **Square Shop Integration**
   - Embed Square Online Store
   - Or link to external Square shop
   - Replace "Coming Soon" placeholder

## Troubleshooting

### Products Not Loading

1. Check browser console for errors
2. Verify API URL is correct
3. Test API directly in browser: `YOUR_API_URL?route=inventory`
4. Check CORS settings on Apps Script deployment
5. Ensure Apps Script is deployed as "Web app" with "Anyone" access

### Dropdown Not Working

- Check JavaScript console for errors
- Verify `initDropdown()` is called on page load
- Test click events on dropdown toggle

### Cart Not Updating

- Check `updateCartCounter()` function
- Verify `cartCount` element exists in header
- Check browser console for cart logs

### Styling Issues

- Clear browser cache
- Check for CSS conflicts with existing site styles
- Verify all CSS is in the `<style>` block

## API Security Notes

⚠️ **Important:** The API URL will be visible in client-side code. Ensure your Apps Script:

1. Does NOT expose sensitive data
2. Implements rate limiting
3. Returns only public inventory information
4. Does NOT process payments or store customer data

For production, consider:
- Adding API key authentication
- Implementing server-side proxy
- Using environment variables for API URL

## Support

For questions or issues:
- 📧 Email: vccigar@gmail.com
- 📞 Phone: 561-331-0491
- 📷 Instagram: @vicecitycigars

---

**Last Updated:** December 2, 2025  
**Version:** 1.0.0  
**Compatibility:** Jekyll 4.3+, Modern Browsers (Chrome, Firefox, Safari, Edge)
