# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vice City Cigars is a Jekyll 4.3 static site for a mobile cigar and tobacco business in Boca Raton, FL. The site has **two distinct brands** served under one codebase, with a chooser landing page that routes users to their preferred experience.

**Production URL**: `https://vicecitycigars.com` (custom domain via GitHub Pages)  
**Repo base URL**: `/vccweb` (used in `_config.yml`; GitHub Actions injects this at build time)

## Build & Development Commands

```bash
# Local dev with live reload — use empty baseurl for local navigation
bundle exec jekyll serve --baseurl ""

# Build to _site/
bundle exec jekyll build

# Force clean rebuild (clears SASS cache)
bundle exec jekyll clean && bundle exec jekyll build
```

**Deployment**: Push to `main` → GitHub Actions builds and deploys automatically. Check the Actions tab for build status. Always use `{{ '/path' | relative_url }}` for internal links — never hardcode URLs.

## Dual-Brand Architecture

| Brand | Theme class | Layout | Header include |
|-------|-------------|--------|----------------|
| Vice City Cigars | `miami-theme` | `miami.html` | `header-miami.html` |
| Black Leaf Bounty | `blb-theme` | `blb.html` | `header-blb.html` |
| Generic / legal pages | `neutral-theme` | `default.html` | `header.html` |

`index.md` uses `layout: chooser` — a full-screen split-panel picker that stores the user's choice in `localStorage` (`vcc-brand` key). The chooser hides the site header/footer and renders entirely within `_layouts/chooser.html`.

**Path-based layout routing** (via `_config.yml` defaults):

- `vice-city/**` → `miami` layout
- `black-leaf-bounty/**` → `blb` layout
- All other pages → `page` layout (wraps `default`)

### Black Leaf Bounty layout

`_layouts/blb.html` contains **all BLB-specific CSS inline** (500+ lines). BLB has its own complete design system with CSS custom properties prefixed `--blb-*`. Do not put BLB styles in `theme.css`. The BLB component classes (`blb-hero`, `blb-card`, `blb-btn`, etc.) are documented within that file.

## Styling System

`assets/css/theme.css` covers the Miami Vice and neutral themes only. Key CSS custom properties in `:root`:

- Colors: `--vice-neon-pink` (#FF1493), `--vice-cyan-blue` (#00FFFF), `--vice-electric-purple`, `--vice-hot-pink`, `--vice-dark-navy` (#0A0A2E), `--vice-charcoal`, `--havana-gold` (#d4af37), `--havana-cream`
- Shadows: `--shadow-neon`, `--shadow`, `--shadow-luxury`
- Typography: `--font-primary` (Pacifico), `--font-ui` (Exo 2), `--font-cyber` (Orbitron), `--font-display` (Playfair Display)
- Breakpoints: 600px (mobile), 768px (tablet), 1024px (desktop), 1200px (large)

**Do not nest backdrop-filter blur effects** — it creates a "nested frames" appearance. Content should flow directly in the layout's `<main>`, not wrapped in extra container divs.

## JavaScript Architecture

All JS uses IIFE patterns (`(function() { 'use strict'; ... })()`). Three modular files in `assets/js/`:

- `age-gate.js` — modal with focus trap, localStorage expiry (30-day), key `vcc-age-verified`
- `mobile-menu.js` — hamburger toggle with ARIA state
- `contact-form.js` — Formspree submission; dynamically creates `.form-status` elements (keep this CSS class — it has no static HTML references)

`tobacco-shop.html` contains all its JS **inline** by design for standalone operation.

## Data Files

- `_data/menu.yml` — service cards (title, blurb, img) rendered on the Vice City homepage
- `_data/testimonials.yml` — customer quotes with author attribution; rendered only when non-empty

## Tobacco Shop (`tobacco-shop.html`)

Currently `published: false` — requires legal/compliance review before re-enabling (PACT Act, state shipping laws, carrier agreements). **Do not set to `true` without legal review.**

### Inventory data flow

```text
Square Catalog API → square-inventory-sync.js → Google Sheets → apps-script-updated.js API → tobacco-shop.html
```

- **API endpoint** at line ~702: `const API_URL = '...'` — Google Apps Script web app
- Routes: `GET ?route=inventory`, `GET ?route=checkCustomer&email=X`, `POST` for pre-orders
- All CSS and JS is inline (intentional — do not extract)
- `escapeHTML()` uses DOM-based sanitization

**API contract** (`GET ?route=inventory`):
```json
{
  "items": [
    { "SKU": "", "Display_Name": "", "Price": 0, "Qty_On_Hand": 0, "Description": "HTML",
      "Categories": "Parent > Child > Type", "Drive_Image_URL": "https://..." }
  ]
}
```

**Image URLs**: Use Google Drive thumbnail API format — `https://drive.google.com/thumbnail?id={fileId}&sz=w800`. Never use the old `/uc?export=view&id=` format.

**Category display priority**: `Category_Level_2` → `Lowest_Category` → parse `Categories` string.

**Protected files** (in `.gitignore`, never commit):

- `apps-script-updated.js` — contains the deployed Apps Script URL
- `square-inventory-sync.js` — contains the Square API access token

When Apps Script changes are needed, edit the file locally and tell the user to manually deploy a new version in the Apps Script editor — Claude Code cannot deploy Apps Script.

## Age Gate

Wraps the entire site. `_includes/age-gate.html` renders the modal; `assets/js/age-gate.js` manages state. Stores verification in `localStorage` — requires localStorage to be enabled.

## Content Security Policy

Defined in `_includes/head.html` line 7. To allow a new external domain, add it to the relevant directive there. Current allowlist includes: `formspree.io`, `fonts.googleapis.com`, `drive.google.com`, `lh3.googleusercontent.com`, `script.google.com`, `cloudflareinsights.com`.

## Modal / Overlay Pattern

```css
/* Overlay */
position: fixed; inset: 0;
/* Content */
position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
overflow-y: auto; /* on content, NOT overlay */
```

Use z-index 999997+ for modals. Never use percentage positioning for modal centering.

## Blog Posts

```markdown
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
categories: [business, events, culture]
author: Vice City Cigars
excerpt: "Preview text"
---
```

Permalink pattern: `/:categories/:year/:month/:day/:title/`

## Formspree

Contact form endpoint: `https://formspree.io/f/mwpnagkv`. Submissions go to the owner's email. To add a new form, use this same endpoint or create a new Formspree form and update the `action` attribute.

## Analytics

`_includes/analytics.html` contains the GA4 snippet (currently commented out). When enabling, replace `G-XXXXXXXXXX` with the real measurement ID. Analytics only loads when `JEKYLL_ENV=production` (set automatically by GitHub Actions).

## Common Gotchas

1. **`relative_url` filter** is required for all asset and page links — omitting it breaks GitHub Pages deployment
2. **`tobacco-shop.html` stays inline** — do not extract its CSS/JS to shared files
3. **BLB CSS stays inline** — do not move `blb.html` styles to `theme.css`
4. **`published: false`** on tobacco shop — do not set to `true` without compliance review
5. **`.form-status`** is created dynamically by `contact-form.js` — do not remove from `theme.css`
6. **No nested container wrappers** — content flows into `<main>` directly; avoid adding extra `.page-wrapper`, `.card-body`, etc.
7. **Drive image URLs** — always use thumbnail API format, not the legacy export format
8. **Apps Script column names** use spaces in the sheet (`Category Level 2`, `Drive Image URL`) but underscores in the JSON API response (`Category_Level_2`, `Drive_Image_URL`)
