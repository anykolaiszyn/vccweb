# Vice City Cigars — AI Agent Instructions

## Project Architecture
**Jekyll 4.3** static site deployed to GitHub Pages at `/vccweb` with Miami Vice cyberpunk aesthetic. Mobile cigar business with two distinct systems:
- **Marketing site**: Jekyll-rendered pages with glass morphism, neon effects, age gate
- **Tobacco shop**: Self-contained API-driven pre-order system in `tobacco-shop.html` (1900+ lines, intentionally inline)

## Critical Data Flow
```
Square Catalog → square-inventory-sync.js → Google Sheets (Inventory+Images)
                                               ↓
Apps Script API ← tobacco-shop.html (fetch/POST with base64 ID upload)
```

**API Contract** (`GET ?route=inventory`):
```json
{"items": [{"SKU": "str", "Display_Name": "str", "Price": num, "Qty_On_Hand": num, 
"Description": "HTML", "Categories": "A > B > C", "Drive_Image_URL": "https://..."}]}
```

## Non-Negotiable Conventions
1. **Base URL**: Always `{{ '/path' | relative_url }}` for links/assets (GitHub Pages project site)
2. **Tobacco Shop Isolation**: `tobacco-shop.html` must keep ALL CSS/JS inline—never extract to external files
3. **Cart Architecture**: In-memory with localStorage persistence (24hr expiry), quantity stacking by SKU, floating button + toast notifications
4. **Age Gate**: 30-day `localStorage` with focus trap; modal at `_includes/age-gate.html` + `assets/js/age-gate.js`
5. **Image Security**: Drive images require CSP allowlist in `_includes/head.html`; use `thumbnail?id={fileId}&sz=w800` format

## Development Workflow (Windows PowerShell)
```powershell
bundle exec jekyll serve   # http://localhost:4000/vccweb (auto-reload)
bundle exec jekyll build   # outputs to _site/
git add tobacco-shop.html; git commit -m "msg"; git push  # auto-deploys to Pages
```

## Tobacco Shop: Key Implementation Details
- **Cart state**: `{sku, name, price, quantity}` array with `addToCart()` stacking duplicates
- **Modals**: Product detail modal (z-index 1000000), floating cart (999997), toast (999998)
- **Mobile**: Fixed positioning with `inset: 0`, `-webkit-backdrop-filter` for Safari, `95%` width on mobile
- **Quantity controls**: ±/− buttons in cart rows call `updateCartItemQuantity(sku, delta)`
- **Toast system**: `showToast(msg)` with `slideUp`/`slideDown` animations, 2.5s auto-dismiss
- **Category priority**: Extract `Category_Level_2` → `Lowest_Category` → parse `Categories` string

## Styling System: Miami Vice Cyberpunk
- **Color palette** (`:root` in `theme.css`): neon pink `#FF1493`, cyan `#00FFFF`, gold `#ffcc66`, navy `#0A0A2E`
- **Typography**: Pacifico (headings), Exo 2 (body), Orbitron (cyber accents)
- **Effects**: Glass morphism cards, neon text shadows, gradient borders, backdrop blur
- **Modal centering**: `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);`

## Blog Post Pattern
```markdown
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
categories: [business, events, culture]
author: Vice City Cigars
excerpt: "Preview text"
image: /assets/img/gallery/photo.jpg
---
Use {{ '/path' | relative_url }} for internal links
```
Permalink: `/:categories/:year/:month/:day/:title/`

## Data Files (YAML)
- `_data/menu.yml`: Service cards with title, blurb, image path
- `_data/testimonials.yml`: Customer quotes with author attribution
- Both use `/assets/img/gallery/` for images

## Security & Compliance
- **Never commit**: `apps-script-updated.js`, `square-inventory-sync.js`, API keys/tokens
- **Legal verbiage**: All shipping text includes "where allowed by law" qualifier
- **CSP headers**: In `_includes/head.html`; add domains for external resources
- **21+ enforcement**: Server-side DOB validation + ID upload (base64 in POST), purged <24hrs

## Common Troubleshooting
| Issue | Solution |
|-------|----------|
| Products not loading | Verify API URL, test `?route=inventory` directly, check console |
| Images blocked | Add domain to CSP in `_includes/head.html`, use Drive thumbnail URLs |
| Cart count wrong | Check `setCartCount()` + `updateFloatingCart()` calls after mutations |
| Modal off-screen | Use `inset: 0` on overlay, `50%/50%` + `translate(-50%, -50%)` on content |
| Base URL broken | Confirm `_config.yml` has `baseurl: "/vccweb"`, use `relative_url` filter |

## Files Protected from Auto-Edit
`apps-script-updated.js`, `square-inventory-sync.js`, `tobacco-shop-backup.html`, `CONTENT-*.md`, `PERSONA-*.md` (excluded in `_config.yml`)

## Quick Reference
- **Layouts**: `_layouts/default.html` (base), `page.html`, `post.html`
- **Includes**: `header.html`, `footer.html`, `age-gate.html`, `head.html`
- **Theme source**: `assets/css/theme.css` (~800 lines, mobile-first)
- **JS modules**: IIFE pattern, deferred loading, no globals except in tobacco-shop inline
- **Contact**: vccigar@gmail.com | +1-561-331-0491 | @vicecitycigars
