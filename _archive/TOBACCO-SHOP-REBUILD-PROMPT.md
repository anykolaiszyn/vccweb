# Master Prompt: Vice City Cigars Tobacco Shop Rebuild

## Project Overview
Build a complete e-commerce experience for age-restricted tobacco products using Google Apps Script API for inventory management. This is a **Jekyll 4.3 static site** deployed to **GitHub Pages** at `/vccweb` base URL.

---

## Critical Legal & Regulatory Requirements

### ✅ DO:
- **Age Gate**: Enforce 21+ age verification at site entry (30-day localStorage cookie)
- **ID Upload**: Require government-issued photo ID for ALL tobacco purchases (no exceptions per FDA)
- **Adult Signature**: Include $8.50 adult signature fee on all shipments (required by law)
- **Legal Language**: Always include "where allowed by law" qualifier for shipping/delivery
- **Data Privacy**: Explicitly state ID is deleted within 24 hours after verification
- **Pre-Order Model**: Make clear this is NOT instant checkout - orders are manually processed and invoiced
- **Payment Method**: Invoice-based only (ACH/Bitcoin) - NO credit card processing on site
- **Age Calculation**: Server-side validation that customer is 21+ based on DOB
- **Compliance Text**: Display "🔞 21+ only" and legal disclaimers prominently

### ❌ DON'T:
- Allow instant checkout or card payment processing
- Ship to addresses in states with tobacco shipping bans (inform customer)
- Process orders without ID verification
- Store customer IDs longer than 24 hours
- Market to minors or use youth-appealing imagery
- Imply health benefits or therapeutic use
- Show tobacco products before age gate verification

---

## Architecture & Technical Stack

### Platform
- **Framework**: Jekyll 4.3 (Ruby static site generator)
- **Deployment**: GitHub Pages with GitHub Actions auto-build
- **Base URL**: `/vccweb` (project site, not root domain)
- **Build Command**: `bundle exec jekyll build` → outputs to `_site/`
- **Dev Server**: `bundle exec jekyll serve` → http://localhost:4000/vccweb

### API Integration
- **Endpoint**: `https://script.google.com/macros/s/AKfycbxV-V5BHN2a97yb0fPYVjuofjJRUAFPnPu1d73kKwnxkqXTojYEFK3c0B1qAOzKO1Aquw/exec`
- **Inventory Route**: `GET ?route=inventory` returns:
  ```json
  {
    "items": [
      {
        "SKU": "string",
        "Display_Name": "string",
        "Price": number,
        "Qty_On_Hand": number,
        "Description": "HTML string (needs stripHtml)",
        "Categories": "Parent > Child > Grandchild",
        "Category_Level_2": "string",
        "Lowest_Category": "string",
        "Drive_Image_URL": "https://drive.google.com/...",
        "Square_Image_URL": "https://..."
      }
    ]
  }
  ```
- **Order Submission**: `POST` with JSON payload:
  ```json
  {
    "customerName": "string",
    "email": "string",
    "phone": "string",
    "dob": "YYYY-MM-DD",
    "shippingAddress": "string",
    "paymentMethod": "string",
    "notes": "string",
    "cart": [{"sku": "string", "name": "string", "price": number, "qty": number}],
    "idFile": {
      "name": "filename.jpg",
      "type": "image/jpeg",
      "dataBase64": "base64-encoded-string"
    }
  }
  ```

### Data Flow
```
Square Catalog → square-inventory-sync.js → Google Sheets (Inventory + Drive Image URLs)
                                                ↓
                                        Apps Script API ← tobacco-shop.html (fetch inventory, POST orders)
```

---

## UI/UX Requirements: Amazon-Style Layout

### Page Structure

#### 1. **Shop Page** (`/tobacco-shop/`)
```
┌─────────────────────────────────────────────────────────┐
│ 🔞 TOBACCO SHOP - Age-Restricted - Pre-Order System    │ ← Sticky banner
├──────────┬──────────────────────────────────────────────┤
│          │  Premium Tobacco Products                    │
│          │  [Search box] [Sort dropdown]                │
│ FILTERS  ├──────────────────────────────────────────────┤
│          │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐           │
│ All (42) │  │ IMG │ │ IMG │ │ IMG │ │ IMG │           │
│          │  │Name │ │Name │ │Name │ │Name │           │
│ Cigars   │  │$50  │ │$25  │ │$75  │ │$30  │           │
│ (15)     │  └─────┘ └─────┘ └─────┘ └─────┘           │
│          │                                               │
│ Pipe     │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐           │
│ Tobacco  │  │ IMG │ │ IMG │ │ IMG │ │ IMG │           │
│ (10)     │  │Name │ │Name │ │Name │ │Name │           │
│          │  │$40  │ │$55  │ │$20  │ │$35  │           │
│ Shisha   │  └─────┘ └─────┘ └─────┘ └─────┘           │
│ (8)      │                                               │
│          │  [Load More] or [Pagination]                 │
│ Acc.     │                                               │
│ (9)      │                                               │
└──────────┴──────────────────────────────────────────────┘
                                    [🛒 Cart: 3 | $150] ← Floating
```

#### 2. **Product Detail Page** (`/tobacco-shop/product?sku=XXX`)
```
┌─────────────────────────────────────────────────────────┐
│ ← Back to Shop              [🛒 Cart: 3 | $150]        │
├──────────────────┬──────────────────────────────────────┤
│                  │  Product Name                        │
│                  │  Category > Subcategory              │
│   PRODUCT        │                                       │
│   IMAGE          │  ★★★★☆ (if reviews available)       │
│   (Large)        │                                       │
│                  │  $XX.XX                              │
│   [Thumbnail 1]  │  In Stock: 15                        │
│   [Thumbnail 2]  │  SKU: ABC-123                        │
│   [Thumbnail 3]  │                                       │
│                  │  [Add to Cart] [Buy Now]             │
│                  │                                       │
│                  │  Product Description                 │
│                  │  Full HTML description from API      │
│                  │                                       │
│                  │  ⚠️ Legal Notice                    │
│                  │  21+ only. Requires ID verification. │
│                  │  Adult signature at delivery.        │
└──────────────────┴──────────────────────────────────────┘
```

#### 3. **Cart Page** (`/tobacco-shop/cart`)
```
┌─────────────────────────────────────────────────────────┐
│ Your Shopping Cart                                      │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────┐│
│ │ [Img] Product Name               Qty: [- 2 +] $100 ││
│ │       SKU: ABC-123                        [Remove] ││
│ ├─────────────────────────────────────────────────────┤│
│ │ [Img] Another Product            Qty: [- 1 +] $50  ││
│ │       SKU: DEF-456                        [Remove] ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ Order Summary                                       ││
│ │ Subtotal:                                    $150.00││
│ │ Postage & Handling:                            $7.00││
│ │ Adult Signature (required):                    $8.50││
│ │ ─────────────────────────────────────────────────── ││
│ │ Total:                                       $165.50││
│ │                                                     ││
│ │ 📦 Free postage on orders $50+                     ││
│ │ 🔞 Adult signature required by federal law         ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│                           [Proceed to Checkout]        │
└─────────────────────────────────────────────────────────┘
```

#### 4. **Checkout Page** (`/tobacco-shop/checkout`)
```
┌─────────────────────────────────────────────────────────┐
│ Checkout & Age Verification                             │
├──────────────────────────┬──────────────────────────────┤
│ 1. Customer Information  │  Order Summary              │
│ ──────────────────────── │  ─────────────────────────  │
│ Full Name: [_________]   │  3 items                    │
│ Email: [_____________]   │  Subtotal: $150.00          │
│ Phone: [_____________]   │  Shipping: $15.50           │
│ DOB: [____-__-__] (21+)  │  Total: $165.50             │
│                          │                              │
│ 2. Shipping Address      │  [Edit Cart]                │
│ ──────────────────────── │                              │
│ [________________]       │                              │
│ [________________]       │                              │
│                          │                              │
│ 3. Age Verification      │                              │
│ ──────────────────────── │                              │
│ 🆔 Upload Photo ID *     │                              │
│ [Choose File] [_______]  │                              │
│                          │                              │
│ 🔒 Your ID is deleted    │                              │
│ within 24 hours.         │                              │
│                          │                              │
│ 4. Payment Preference    │                              │
│ ──────────────────────── │                              │
│ ⚪ Bank Invoice (ACH)    │                              │
│ ⚪ Bitcoin                │                              │
│ ⚪ Other / Discuss        │                              │
│                          │                              │
│ Notes: [_____________]   │                              │
│                          │                              │
│ [Submit Order]           │                              │
└──────────────────────────┴──────────────────────────────┘
```

---

## File Structure

```
tobacco-shop/
├── index.html              # Main shop page (grid + left nav)
├── product.html            # Product detail page (dynamic via URL params)
├── cart.html               # Shopping cart page
├── checkout.html           # Checkout & ID verification
└── confirmation.html       # Order confirmation page
```

**OR** use a single-file approach with URL hash routing:
```javascript
// tobacco-shop.html handles all routes
window.location.hash = '#/product/SKU-123'
window.location.hash = '#/cart'
window.location.hash = '#/checkout'
```

---

## Styling Requirements (Miami Vice Cyberpunk Theme)

### Color Palette
```css
:root {
  --neon-pink: #FF1493;
  --neon-cyan: #00FFFF;
  --gold: #ffcc66;
  --navy: #0A0A2E;
  --dark-bg: #0f1620;
  --text-primary: #e6edf3;
  --text-secondary: #9fb0bf;
  --border: rgba(255, 255, 255, 0.1);
}
```

### Typography
- **Headings**: Pacifico (cursive, neon cyan)
- **Body**: Exo 2 (sans-serif)
- **Accents**: Orbitron (for cyber elements)

### Effects
- **Glass morphism**: `backdrop-filter: blur(10px)` + semi-transparent backgrounds
- **Neon glow**: `box-shadow: 0 0 20px rgba(255, 20, 147, 0.5)`
- **Gradient borders**: Pink to cyan gradients
- **Hover animations**: `transform: translateY(-4px)` + glow intensify

### Components
- **Cards**: Dark background + neon pink border + hover glow
- **Buttons**: Gold primary, pink secondary, cyan accent
- **Inputs**: Dark with cyan focus ring
- **Badges**: Category pills with active state (gold bg + dark text)

---

## Key Features & Functionality

### Left Navigation (Filters)
```javascript
// Auto-generate from catalog
const categories = {};
catalog.forEach(item => {
  const cat = getCategory(item); // Use Category_Level_2 or Lowest_Category
  categories[cat] = (categories[cat] || 0) + 1;
});

// Render as clickable list
<ul class="category-nav">
  <li class="active">All Products (42)</li>
  <li>Cigars (15)</li>
  <li>Pipe Tobacco (10)</li>
  <li>Shisha (8)</li>
  <li>Accessories (9)</li>
</ul>
```

### Product Grid (Center)
- **Responsive grid**: 4 columns desktop, 2 tablet, 1 mobile
- **Card content**: Image (200px tall), Name, Category, Price, Stock, "View Details" button
- **Lazy loading**: `loading="lazy"` on images
- **Hover effect**: Scale up, add glow, show "Quick View" overlay

### Search & Sort
```javascript
// Real-time search (debounced)
<input type="search" placeholder="Search by name, description, SKU...">

// Sort dropdown
<select>
  <option>Featured</option>
  <option>Price: Low to High</option>
  <option>Price: High to Low</option>
  <option>Name: A-Z</option>
  <option>Stock Level</option>
</select>
```

### Shopping Cart
- **Persistence**: localStorage with 24-hour expiry
- **Structure**:
  ```javascript
  cart = [
    { sku: 'ABC-123', name: 'Product', price: 50, qty: 2 },
    { sku: 'DEF-456', name: 'Another', price: 25, qty: 1 }
  ]
  ```
- **Quantity controls**: +/− buttons, update on change
- **Remove item**: Instant feedback with animation
- **Floating cart button**: Fixed position, shows count + total
- **Cart badge**: On main nav, updates in real-time

### Shipping Calculator
```javascript
const ADULT_SIGNATURE_FEE = 8.50; // Required by law
const POSTAGE_FEE = 7.00;
const FREE_POSTAGE_THRESHOLD = 50.00;

function calculateShipping(subtotal) {
  const postage = subtotal >= FREE_POSTAGE_THRESHOLD ? 0 : POSTAGE_FEE;
  return {
    postage,
    signature: ADULT_SIGNATURE_FEE,
    total: postage + ADULT_SIGNATURE_FEE
  };
}
```

### Age Verification Flow
1. **DOB Input**: `<input type="date" max="2004-12-04">` (must be 21+)
2. **Age Calculation**: Client-side + server-side validation
   ```javascript
   function calculateAge(dob) {
     const today = new Date();
     const birth = new Date(dob);
     let age = today.getFullYear() - birth.getFullYear();
     const m = today.getMonth() - birth.getMonth();
     if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
     return age;
   }
   ```
3. **ID Upload**: File input with validation (JPEG/PNG/PDF, max 5MB)
   ```javascript
   function readFileBase64(file) {
     return new Promise((resolve, reject) => {
       if (file.size > 5 * 1024 * 1024) reject('File too large');
       if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
         reject('Invalid file type');
       }
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result.split(',')[1]); // Strip prefix
       reader.onerror = reject;
       reader.readAsDataURL(file);
     });
   }
   ```

### Order Submission
```javascript
async function submitOrder() {
  // Validate all fields
  if (calculateAge(dob) < 21) throw new Error('Must be 21+');
  if (!idFile) throw new Error('ID upload required');
  if (cart.length === 0) throw new Error('Cart is empty');
  
  const payload = {
    customerName, email, phone, dob, shippingAddress, paymentMethod, notes,
    cart,
    idFile: { name: file.name, type: file.type, dataBase64: await readFileBase64(file) }
  };
  
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  });
  
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  
  // Clear cart, show confirmation
  clearCart();
  showConfirmation(data.orderId);
}
```

---

## Image Handling

### Google Drive Images
- **Format**: API returns URLs like `https://drive.google.com/uc?export=view&id=XXXXX`
- **Best Practice**: Use as-is, add error handler with fallback
  ```javascript
  <img src="${item.Drive_Image_URL}" 
       onerror="this.src='data:image/svg+xml,...fallback-svg...'" 
       loading="lazy">
  ```
- **CSP**: Add to `_includes/head.html`:
  ```html
  <meta http-equiv="Content-Security-Policy" 
        content="img-src 'self' https://drive.google.com https://lh3.googleusercontent.com data:;">
  ```

---

## Routing Strategy

### Option 1: Multi-Page (Recommended for Jekyll)
```
/tobacco-shop/              → Main shop grid + filters
/tobacco-shop/product/      → Product detail (read ?sku= param)
/tobacco-shop/cart/         → Cart page
/tobacco-shop/checkout/     → Checkout form
/tobacco-shop/confirmation/ → Order confirmation
```

**Permalinks in YAML front matter:**
```yaml
---
layout: page
permalink: /tobacco-shop/product/
---
```

### Option 2: Hash Routing (Single Page App)
```javascript
// tobacco-shop.html
function route() {
  const hash = window.location.hash || '#/';
  if (hash === '#/') showShop();
  else if (hash.startsWith('#/product/')) showProduct(hash.split('/')[2]);
  else if (hash === '#/cart') showCart();
  else if (hash === '#/checkout') showCheckout();
}
window.addEventListener('hashchange', route);
```

---

## Mobile Responsiveness

### Breakpoints
```css
/* Desktop first, then override */
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile */ }
```

### Mobile Layout
```
┌─────────────────┐
│ [☰] [Search] 🛒 │ ← Collapsible nav
├─────────────────┤
│ [Filters ▼]     │ ← Dropdown instead of left nav
├─────────────────┤
│ ┌─────────────┐ │
│ │   Product   │ │ ← Single column
│ │   Image     │ │
│ │   $XX.XX    │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │   Product   │ │
│ └─────────────┘ │
└─────────────────┘
```

---

## Performance Optimization

### Best Practices
1. **Lazy Load Images**: `loading="lazy"` attribute
2. **Pagination**: Load 20-30 items at a time, "Load More" button
3. **Debounce Search**: 300ms delay on search input
4. **LocalStorage**: Cache catalog for 5 minutes to reduce API calls
   ```javascript
   const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
   function getCachedCatalog() {
     const cached = localStorage.getItem('catalog-cache');
     const timestamp = localStorage.getItem('catalog-cache-time');
     if (cached && timestamp && Date.now() - timestamp < CACHE_DURATION) {
       return JSON.parse(cached);
     }
     return null;
   }
   ```
4. **Minimize Reflows**: Use `documentFragment` for bulk DOM inserts
5. **CSS Transitions**: Hardware-accelerated properties only (transform, opacity)

---

## Error Handling

### User-Facing Errors
```javascript
try {
  // API call
} catch (err) {
  showError(`Unable to load products. ${err.message}. Please try again later.`);
}
```

### Validation Messages
- **Empty cart**: "Your cart is empty. Browse products to get started."
- **Under 21**: "You must be 21 or older to purchase tobacco products per federal law."
- **No ID**: "Photo ID upload is required for all tobacco purchases."
- **File too large**: "ID file must be under 5MB. Please compress or use a different image."
- **Network error**: "Connection failed. Check your internet and try again."

---

## Accessibility (WCAG 2.1 AA)

### Requirements
- **Keyboard navigation**: All interactive elements focusable
- **Screen readers**: Proper ARIA labels, semantic HTML
- **Focus indicators**: Visible outlines on all interactive elements
- **Color contrast**: Minimum 4.5:1 for text
- **Alt text**: All product images must have descriptive alt text
- **Form labels**: Explicit `<label for="">` associations

### Example
```html
<button aria-label="Add Arturo Fuente Hemingway to cart">
  Add to Cart
</button>

<img src="..." alt="Arturo Fuente Hemingway Short Story cigar with maduro wrapper">

<input id="search" aria-label="Search products by name or SKU">
```

---

## Testing Checklist

### Functional Tests
- [ ] Products load from API successfully
- [ ] Filtering by category works correctly
- [ ] Search returns accurate results
- [ ] Sort options reorder products as expected
- [ ] Add to cart increments quantity for duplicates
- [ ] Cart persists after page refresh (within 24 hours)
- [ ] Remove from cart updates totals instantly
- [ ] Shipping calculator applies free postage threshold
- [ ] Age verification rejects users under 21
- [ ] ID upload validates file type and size
- [ ] Order submission sends complete payload to API
- [ ] Confirmation page displays order ID

### Browser Tests
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Responsive Tests
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## Deployment Process

### Local Development
```powershell
cd 'v:\Secret Projects\vccweb'
bundle exec jekyll serve --watch
# Visit http://localhost:4000/vccweb/tobacco-shop/
```

### Production Deploy
```powershell
# 1. Build site
bundle exec jekyll build

# 2. Commit source + compiled files
git add tobacco-shop/ _site/tobacco-shop/
git commit -m "feat: Complete tobacco shop rebuild with Amazon-style UX"

# 3. Push to GitHub (auto-deploys via Actions)
git push origin main

# 4. Verify live site (wait ~60 seconds)
# Visit https://anykolaiszyn.github.io/vccweb/tobacco-shop/
```

### Troubleshooting Deploy
- **Changes not showing**: Hard refresh (Ctrl+Shift+R) to clear cache
- **404 errors**: Check `baseurl: "/vccweb"` in `_config.yml`
- **Images broken**: Verify CSP allows drive.google.com
- **JS errors**: Check browser console for API CORS issues

---

## Security Considerations

### Data Protection
- **Never log**: Customer DOB, ID files, or payment info to console
- **HTTPS only**: All API calls must use HTTPS
- **Input sanitization**: Escape all user input before rendering
  ```javascript
  function sanitize(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  ```
- **XSS prevention**: Use `textContent` instead of `innerHTML` for user data
- **CSRF**: Not applicable (no server-side sessions)

### Rate Limiting
- **Client-side**: Debounce API calls, cache responses
- **Server-side**: Apps Script has built-in rate limits (handled by Google)

---

## SEO & Marketing

### Meta Tags (in Jekyll front matter)
```yaml
---
layout: page
title: "Premium Cigars & Tobacco | Vice City Cigars"
description: "Shop curated premium cigars, pipe tobacco, and accessories. Age-verified pre-orders with nationwide shipping where allowed by law."
image: /assets/img/tobacco-shop-og.jpg
---
```

### Structured Data (JSON-LD)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Vice City Cigars Tobacco Shop",
  "description": "Premium tobacco products",
  "url": "https://anykolaiszyn.github.io/vccweb/tobacco-shop/",
  "image": "...",
  "priceRange": "$$",
  "acceptsReservations": true
}
</script>
```

---

## Future Enhancements

### Phase 2 Features
- [ ] Product reviews/ratings
- [ ] Wishlist functionality
- [ ] Order history for returning customers
- [ ] Email notifications (order confirmation, shipping updates)
- [ ] Inventory alerts ("Back in Stock" notifications)
- [ ] Recommended products ("Customers also bought...")
- [ ] Bundle deals and discounts

### Phase 3 Features
- [ ] Live chat support
- [ ] Virtual humidor (track your collection)
- [ ] Subscription service (monthly cigar box)
- [ ] Educational content (pairing guides, reviews)
- [ ] Event ticketing integration (cigar nights, tastings)

---

## Contact & Support

**Developer**: Vice City Cigars Web Team  
**Email**: vccigar@gmail.com  
**Phone**: +1-561-331-0491  
**Social**: @vicecitycigars

**API Issues**: Contact Google Apps Script admin  
**Legal Questions**: Consult tobacco compliance attorney  
**Payment Processing**: Novo Bank (ACH) / Bitcoin wallet

---

## Quick Start Commands

```powershell
# Start development server
bundle exec jekyll serve --watch

# Build for production
bundle exec jekyll build

# Deploy to GitHub Pages
git add .; git commit -m "Update tobacco shop"; git push

# Check for errors
bundle exec jekyll build --verbose

# Clear Jekyll cache
bundle exec jekyll clean
```

---

## Final Notes

This prompt provides a **complete blueprint** for rebuilding the tobacco shop from scratch. Follow the architecture, respect the legal requirements, and maintain the Miami Vice aesthetic. The result should be a **professional, compliant, and user-friendly** e-commerce experience that handles age-restricted products responsibly.

**Remember**: This is a **pre-order system**, not instant checkout. Orders are manually reviewed, age-verified, and invoiced. The site is a **catalog + order intake form**, not a payment processor.

Good luck! 🚬✨
