# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vice City Cigars is a Jekyll static site for a mobile cigar and tobacco business in Boca Raton, FL. The site has **two distinct brands** served under one codebase, with a chooser landing page that routes users to their preferred experience.

## Build & Development Commands

```bash
# Start Jekyll dev server with live reload
bundle exec jekyll serve

# Build to _site/
bundle exec jekyll build
```

**Deployment**: Pushes to `main` auto-deploy to GitHub Pages at `https://anykolaiszyn.github.io/vccweb`. Base URL is `/vccweb` — always use `{{ '/path' | relative_url }}` for internal links.

## Dual-Brand Architecture

The site serves two co-branded experiences from a single codebase:

| Brand | Theme class | Layout | Header include |
|-------|-------------|--------|----------------|
| Vice City Cigars | `miami-theme` | `miami.html` | `header-miami.html` |
| Black Leaf Bounty | `blb-theme` | `blb.html` | `header-blb.html` |
| Generic / legal pages | `neutral-theme` | `default.html` | `header.html` |

`index.md` uses `layout: chooser` — a full-screen split-panel picker that stores the user's choice in `localStorage` (`vcc-brand` key). The chooser hides the site header/footer and renders entirely within `_layouts/chooser.html`.

**Path-based layout routing** (via `_config.yml` defaults):
- `vice-city/**` pages → `miami` layout automatically
- `black-leaf-bounty/**` pages → `blb` layout automatically
- All other pages → `page` layout (wraps `default`)

### Black Leaf Bounty layout notes
`_layouts/blb.html` contains **all BLB-specific CSS inline** (500+ lines). BLB has its own complete design system with CSS custom properties prefixed `--blb-*`. Do not put BLB styles in `theme.css`. The BLB component classes (`blb-hero`, `blb-card`, `blb-btn`, etc.) are documented within that file.

## Styling System

`assets/css/theme.css` covers the Miami Vice and neutral themes only. Key CSS custom properties in `:root`:

- Colors: `--vice-neon-pink`, `--vice-cyan-blue`, `--vice-electric-purple`, `--vice-hot-pink`, `--vice-dark-navy`, `--vice-charcoal`, `--havana-gold`
- Shadows: `--shadow-neon`, `--shadow`, `--shadow-luxury`
- Typography: `--font-primary` (Pacifico), `--font-ui` (Exo 2 / Montserrat), `--font-cyber` (Orbitron), `--font-display` (Playfair Display)
- Breakpoints: 600px (mobile), 768px (tablet), 1024px (desktop), 1200px (large)

## JavaScript Architecture

All JS uses IIFE patterns (`(function() { 'use strict'; ... })()`). Three modular files in `assets/js/`:
- `age-gate.js` — modal with focus trap, localStorage expiry (30-day)
- `mobile-menu.js` — hamburger toggle with ARIA state
- `contact-form.js` — Formspree submission; dynamically creates `.form-status` elements (keep this CSS class)

`tobacco-shop.html` contains all its JS **inline** by design for standalone operation.

## Tobacco Shop (`tobacco-shop.html`)

Currently `published: false` — requires legal/compliance review before re-enabling (PACT Act age verification, state shipping laws).

- **API endpoint** at line ~702: `const API_URL = '...'` — Google Apps Script web app
- Routes: `?route=inventory`, `?route=checkCustomer&email=X`; POST for pre-orders
- All CSS and JS is inline (intentional — do not extract to shared files)
- `escapeHTML()` uses DOM-based sanitization; inline `onclick` handlers receive escaped values

Expected inventory API response:
```json
{
  "items": [
    { "SKU": "", "Display_Name": "", "Price": 0, "Qty_On_Hand": 0, "Description": "", "Categories": "Parent > Child > Type" }
  ]
}
```

## Age Gate

Wraps the entire site. `_includes/age-gate.html` renders the modal; `assets/js/age-gate.js` manages state. Stores verification in `localStorage` — requires localStorage to be enabled.

## Common Gotchas

1. **`relative_url` filter**: required for all asset and page links — omitting it breaks GitHub Pages deployment
2. **`tobacco-shop.html` stays inline**: its CSS/JS must remain inline, not extracted to shared files
3. **BLB CSS stays inline**: `blb.html` layout is self-contained; do not move its styles to `theme.css`
4. **`published: false`**: tobacco shop is hidden; do not set to `true` without compliance review
5. **`.form-status`**: class is created dynamically by `contact-form.js` — do not remove from `theme.css` even though it has no static HTML references
