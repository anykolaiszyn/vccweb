# Vice City Cigars Website - Master Guide for Claude Code

## Project Overview

This is a Jekyll-based static website for Vice City Cigars, a tobacco retailer in Boca Raton, FL. The site features:
- **Square Shop**: General merchandise (pre-orders, swag, accessories)
- **Tobacco Shop**: Age-restricted tobacco products with Square inventory integration
- **Age-gated checkout** with ID verification
- **Manual invoice workflow** (ACH/Bitcoin payments after verification)

## Tech Stack

- **Frontend**: Jekyll 4.4.1 (Ruby static site generator)
- **Styling**: Custom CSS with neon/cyberpunk theme (Pacifico, Exo 2, Orbitron fonts)
- **Backend**: Google Apps Script (serves as API for Square inventory data)
- **Data Storage**: Google Sheets (Square inventory sync)
- **Inventory Source**: Square Catalog API v2024-12-18
- **Image Storage**: Google Drive (product images downloaded from Square)
- **Hosting**: GitHub Pages or similar static hosting

## Architecture Diagram

```
Square Catalog API
       ↓
square-inventory-sync.js (Apps Script)
       ↓
Google Sheets (Inventory + Images)
       ↓
apps-script-updated.js (API endpoint)
       ↓
tobacco-shop.html (Frontend)
```

## Critical Files

### Protected Files (NEVER COMMIT)
- `apps-script-updated.js` - Contains Google Apps Script API deployment URL
- `square-inventory-sync.js` - Contains Square API access token
- Any `*-sync.js` files
- `.env`, `*.token`, `*.key` files

These are listed in `.gitignore` and should NEVER be committed to git.

### Key Frontend Files
- `tobacco-shop.html` - Main tobacco e-commerce page
- `square-shop.html` - General merchandise shop
- `_includes/header.html` - Site navigation and cart badge
- `_includes/head.html` - CSP, meta tags, asset loading
- `_layouts/default.html` - Main site layout wrapper
- `assets/css/theme.css` - Global theme styles
- `assets/css/style.css` - Page-specific styles

### Backend Files
- `apps-script-updated.js` - API serving inventory data (deployed as Web App)
- `square-inventory-sync.js` - Syncs Square → Sheets every 8 hours

## DO's ✅

### Development Workflow
1. **DO** read files before editing them
2. **DO** use the Edit tool for existing files, not Write
3. **DO** test changes locally with `bundle exec jekyll build`
4. **DO** commit with descriptive messages including user intent
5. **DO** push to main branch after testing

### Apps Script Updates
1. **DO** edit `apps-script-updated.js` directly in the file system
2. **DO** tell user to create a new deployment after Apps Script changes
3. **DO** log important data transformations for debugging
4. **DO** include all category levels in API response:
   - `Categories` (full hierarchy string)
   - `Top_Category`
   - `Lowest_Category`
   - `Category_Level_1`
   - `Category_Level_2`

### Frontend Development
1. **DO** use the site's existing Jekyll layout system
2. **DO** keep pages clean - no nested card/container wrappers
3. **DO** use transparent backgrounds with subtle borders (1px, low opacity)
4. **DO** maintain the neon/cyberpunk aesthetic (cyan #00FFFF, pink #FF1493, gold #ffcc66)
5. **DO** use CSP-compliant inline styles or theme CSS
6. **DO** prioritize Category_Level_2 for filtering, fallback to Lowest_Category
7. **DO** use Google Drive thumbnail API for images: `https://drive.google.com/thumbnail?id={fileId}&sz=w800`

### Modal/Overlay Patterns
1. **DO** use fixed positioning with viewport units:
   ```css
   position: fixed;
   top: 50vh;
   left: 50vw;
   transform: translate(-50%, -50%);
   ```
2. **DO** use high z-index (999999+) for modals
3. **DO** keep overlay simple - no padding or overflow on the overlay itself
4. **DO** put overflow-y: auto on modal-content, not modal-overlay

### Image Handling
1. **DO** add image domains to CSP in `_includes/head.html`:
   - `https://drive.google.com`
   - `https://lh3.googleusercontent.com`
2. **DO** use inline SVG data URIs for placeholders (no external dependencies)
3. **DO** transform old Drive URLs to thumbnail API format

## DON'Ts ❌

### Critical Don'ts
1. **DON'T** commit apps-script-updated.js or square-inventory-sync.js to git
2. **DON'T** create nested container structures (card > card-body > section)
3. **DON'T** add multiple backdrop-filter blur effects (creates "nested frames")
4. **DON'T** use heavy borders (2px+) or strong shadows everywhere
5. **DON'T** use external placeholder image services (they fail CSP)
6. **DON'T** use old Drive URL format `/uc?export=view&id=` (use thumbnail API)
7. **DON'T** deploy Apps Script from Claude Code (user must do it manually)
8. **DON'T** create markdown documentation files unless explicitly requested

### Frontend Don'ts
1. **DON'T** wrap content in `.tobacco-shop-page` or other page-level divs
2. **DON'T** create duplicate `<main>` containers (layout already has one)
3. **DON'T** use percentage positioning for modals (use viewport units)
4. **DON'T** add overflow or padding to modal-overlay (breaks centering)
5. **DON'T** use via.placeholder.com or external image services

### Apps Script Don'ts
1. **DON'T** guess at column names - use exact names from Square sync sheet:
   - `Category Level 2` (not `Category_Level_2` in sheet headers)
   - `Drive Image URL` (not `Drive_Image_URL` in sheet headers)
2. **DON'T** skip the URL transformation logic (old Drive URLs won't embed)
3. **DON'T** remove logging - it's essential for debugging
4. **DON'T** forget to return new fields in the API response object

## Common Patterns

### Category Display Logic
```javascript
function getDisplayCategory(item) {
  // Priority 1: Use Category Level 2 from Square sync
  if (item.Category_Level_2) {
    return item.Category_Level_2;
  }

  // Priority 2: Use Lowest Category from Square sync
  if (item.Lowest_Category) {
    return item.Lowest_Category;
  }

  // Fallback: Parse from Categories string
  if (item.Categories) {
    const parts = item.Categories.split('>').map(s => s.trim());
    if (parts.length > 1 && parts[0].includes('RTPD')) {
      return parts[1]; // Return second level
    }
    return parts[0] || 'Uncategorized';
  }

  return 'Uncategorized';
}
```

### Image URL Pattern
```javascript
// Apps Script transformation
if (driveImg && driveImg.includes('drive.google.com/uc?export=view&id=')) {
  const match = driveImg.match(/[?&]id=([^&]+)/);
  if (match && match[1]) {
    driveImg = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
  }
} else if (driveFileId) {
  driveImg = `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w800`;
}
```

### Inline SVG Placeholder
```javascript
const placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%231a1a3e" width="400" height="300"/%3E%3Ctext fill="%2300ffff" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
```

## Deployment Workflow

### Frontend Changes (tobacco-shop.html, CSS, etc.)
```bash
# 1. Build site
bundle exec jekyll build

# 2. Commit changes
git add [files]
git commit -m "Description"
git push origin main

# 3. Done! GitHub Pages auto-deploys
```

### Apps Script Changes (apps-script-updated.js)
```bash
# 1. Edit file locally
# 2. DO NOT commit to git (it's in .gitignore)
# 3. Tell user to manually:
#    - Open Apps Script editor
#    - Copy/paste updated code
#    - Deploy > New deployment
#    - Update Web App deployment
#    - Get new deployment URL (if changed)
```

### Square Sync Changes (square-inventory-sync.js)
```bash
# 1. Edit file locally
# 2. DO NOT commit to git (it's in .gitignore)
# 3. Tell user to manually:
#    - Open Apps Script editor
#    - Copy/paste updated code
#    - Test run the sync function
#    - Verify Google Sheet updated correctly
```

## Troubleshooting Patterns

### Images Not Loading
1. Check CSP in `_includes/head.html` includes Drive domains
2. Verify Drive URLs use thumbnail API format
3. Check console for CSP violations or 404s
4. Verify Apps Script is returning `Drive_Image_URL` field

### Modal Not Showing/Positioning Wrong
1. Ensure `.modal-overlay` has NO padding or overflow
2. Use fixed positioning with 50vh/50vw on `.modal-content`
3. Use `transform: translate(-50%, -50%)` for centering
4. Check z-index is high enough (999999+)
5. Verify overlay has `display: block !important` when `.active`

### Categories Wrong (Showing Lowest Instead of L2)
1. Verify Apps Script reads `Category Level 2` column (exact name)
2. Check API response includes `Category_Level_2` field
3. Ensure frontend uses `getDisplayCategory(item)` not `getDisplayCategory(item.Categories)`
4. Verify Square sync is populating Category Level 2 in sheet

### Apps Script Changes Not Reflecting
1. User must create NEW deployment (not update code in old deployment)
2. Check deployment URL in frontend matches current deployment
3. Verify sheet column names match what Apps Script expects
4. Check Apps Script logs for errors

### "Nested Frames" Appearance
1. Remove all wrapper divs (tobacco-shop-page, card, card-body)
2. Change dark backgrounds to transparent
3. Reduce border thickness (2px → 1px)
4. Remove backdrop-filter blur effects
5. Reduce opacity on all backgrounds
6. Let content flow in layout's `<main>` directly

## Content Security Policy

Current CSP allows:
- **script-src**: `'self'`, `'unsafe-inline'`, formspree.io
- **style-src**: `'self'`, `'unsafe-inline'`, fonts.googleapis.com
- **img-src**: `'self'`, `data:`, drive.google.com, lh3.googleusercontent.com
- **connect-src**: `'self'`, formspree.io, script.google.com, script.googleusercontent.com

To add new domains, edit `_includes/head.html` line 7.

## Age Verification Flow

1. User adds items to cart
2. Cart displays with shipping costs:
   - Adult signature: $8.50 (always)
   - Postage: $7.00 (orders under $50) or FREE (orders $50+)
3. User fills checkout form
4. User uploads government-issued photo ID
5. Returning customers can skip ID upload (checkbox option)
6. Order submitted to Formspree → owner's email
7. Owner manually verifies age (21+)
8. Owner sends invoice (ACH or Bitcoin)
9. Customer pays invoice
10. Owner ships order with adult signature requirement

## Square Inventory Sync

Runs every 8 hours via Google Apps Script time-based trigger:
1. Fetches all items, variations, categories from Square API
2. Parses category hierarchy (RTPD > Level 1 > Level 2 > Level 3 > Level 4)
3. Downloads product images to Google Drive
4. Updates Google Sheet with:
   - Item details (name, SKU, price, quantity)
   - Category data (all levels)
   - Image URLs (Square + Drive)
   - Drive File IDs

Frontend reads this data via `apps-script-updated.js` API endpoint.

## Key Business Rules

1. **All products are 21+** - No exceptions
2. **Pre-order/Order model** - No real-time payment processing
3. **Manual invoicing** - Owner sends invoice after age verification
4. **Adult signature required** - $8.50 fee applies to all tobacco shipments
5. **ID privacy** - IDs deleted within 24 hours, returning customers can skip
6. **Two separate shops** - Square Shop (merchandise) and Tobacco Shop (age-restricted)
7. **Payment methods** - ACH or Bitcoin only (no credit cards)

## Color Palette

- **Primary Cyan**: #00FFFF (titles, accents, highlights)
- **Primary Pink**: #FF1493 (borders, CTAs, important elements)
- **Gold/Yellow**: #ffcc66 (warnings, notices, active states)
- **Dark Navy**: #0A0A2E (backgrounds)
- **Darker Blue**: #0f1620 (card backgrounds)
- **Light Gray**: #e6edf3 (body text)
- **Medium Gray**: #c7d2db (secondary text)
- **Muted Gray**: #9fb0bf (subtle text)

## Typography

- **Display Font**: Pacifico (cursive, for titles/headers)
- **UI Font**: Exo 2 (300, 400, 600 weights)
- **Tech Font**: Orbitron (400, 700 weights)

## Quick Reference Commands

```bash
# Build site
bundle exec jekyll build

# Serve locally
bundle exec jekyll serve

# Git workflow
git add [files]
git commit -m "Message"
git push origin main

# Check git status
git status

# View recent commits
git log --oneline -5
```

## Remember

- This is a **tobacco retail business** - all products require age verification
- The owner **manually processes orders** - this is not automated e-commerce
- **Security is critical** - never commit API keys, tokens, or credentials
- **Simplicity wins** - clean layouts, no nested frames, subtle styling
- **Mobile matters** - responsive design is essential
- **CSP is strict** - all external resources must be whitelisted

---

*Last updated: 2025-12-03*
*For questions or issues, refer to this guide first before making changes.*
