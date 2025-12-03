# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vice City Cigars is a Jekyll-based static website for a mobile cigar and tobacco business in Boca Raton, FL. The site features a Miami Vice cyberpunk aesthetic with neon pink/cyan colors, age verification, and an API-driven tobacco product catalog.

## Build & Development Commands

### Local Development
```bash
# Start Jekyll dev server (includes live reload)
bundle exec jekyll serve

# Build the site to _site/ directory
bundle exec jekyll build

# Check Jekyll version
bundle exec jekyll --version
```

### Deployment
The site deploys automatically to GitHub Pages when pushing to the `main` branch. It's configured as a project site at:
- **Live URL**: `https://anykolaiszyn.github.io/vccweb`
- **Base URL**: `/vccweb` (configured in `_config.yml`)

## Architecture & Structure

### Jekyll Configuration
- **Version**: Jekyll 4.4.1
- **Markdown**: Kramdown with GFM input
- **Plugins**: jekyll-feed, jekyll-sitemap, jekyll-seo-tag
- **Permalink style**: pretty
- **Collections**: Posts with category-based permalinks

### Key Architectural Patterns

1. **Layout Hierarchy**
   - `default.html` - Base layout with age-gate, header, footer
   - `page.html` - Standard content pages
   - `post.html` - Blog post layout

2. **Dual Shop System**
   - `square-shop.md` - Future Square e-commerce integration
   - `tobacco-shop.html` - **Self-contained standalone page** with inline CSS/JS for API-driven inventory

   **IMPORTANT**: `tobacco-shop.html` intentionally uses `layout: page` but includes all its own styles and scripts inline. It connects to a Google Apps Script API for real-time inventory.

3. **Age Verification System**
   - Modal gate on initial page load (`_includes/age-gate.html`)
   - Uses localStorage with 30-day expiry
   - Focus trap and keyboard navigation
   - Located in `assets/js/age-gate.js`

4. **JavaScript Architecture**
   - **Modular**: Separate files for mobile-menu, age-gate, contact-form
   - **Inline**: tobacco-shop.html contains all its JS inline (intentional for standalone functionality)
   - All JS uses IIFE patterns to avoid global scope pollution

5. **Styling System**
   - **Primary theme**: `assets/css/theme.css` - Miami Vice cyberpunk aesthetic
   - **Color palette**: Neon pink (#FF1493), cyan blue (#00FFFF), electric purple (#8A2BE2)
   - **Typography**: Pacifico (script), Exo 2 (UI), Orbitron (cyber accents)
   - **Glass morphism**: Backdrop blur effects on cards and main content
   - **Neon effects**: Text shadows, box shadows, gradients for authentic Miami Vice feel

### Data Files
- `_data/menu.yml` - Service offerings with images
- `_data/testimonials.yml` - Customer testimonials

## Tobacco Shop Integration

The tobacco shop (`tobacco-shop.html`) is a critical feature with special architecture:

### API Integration
- Expects Google Apps Script endpoint URL at line 115: `const API_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';`
- API route: `?route=inventory` returns product catalog
- API route: `?route=checkCustomer&email=X` checks age verification status
- POST endpoint accepts pre-orders with customer info and ID file (base64)

### Expected API Response Format
```json
{
  "items": [
    {
      "SKU": "string",
      "Display_Name": "string",
      "Price": number,
      "Qty_On_Hand": number,
      "Description": "HTML string",
      "Categories": "Parent > Child > Type"
    }
  ]
}
```

### Cart System
- In-memory cart (no persistence yet)
- Updates header badge (`#cartCountHeader`) via cross-page JavaScript
- Cart count synced between local page (`#cart-count`) and header badge

### Category Derivation
Products auto-categorize based on category path:
- Contains "cigar" → cigars filter
- Contains "pipe" → pipe filter
- Contains "shisha" or "hookah" → shisha filter

## Header Navigation

The header (`_includes/header.html`) has a **two-item shop dropdown**:
- Square Shop (`/square-shop`)
- Tobacco Products (`/tobacco-shop.html`)

The dropdown uses CSS-only hover on desktop and is styled for mobile hamburger menu compatibility.

## Important Configuration Values

- **Contact Email**: vccigar@gmail.com
- **Phone**: +1-561-331-0491
- **Instagram**: @vicecitycigars
- **Base URL**: /vccweb (critical for asset paths)
- **Age Requirement**: 21+ (enforced via age gate)

## Theme & Visual Identity

### Miami Vice Cyberpunk Aesthetic
- Dark navy/charcoal background with neon grid overlay
- Glass morphism cards with neon borders
- Gradient text effects on headings
- Neon glow on hover states
- Responsive mobile-first design

### CSS Custom Properties
All colors, shadows, and typography defined in `:root` of `theme.css`. Modify these for consistent theme changes.

## Content Management

### Blog Posts
- Location: `_posts/`
- Format: `YYYY-MM-DD-slug.md`
- Front matter: title, date, categories, layout
- Permalink: `/:categories/:year/:month/:day/:title/`

### Page Content
- Markdown files in root directory
- Front matter: title, permalink, description, layout
- Default layout applied via `_config.yml` defaults

## Excluded Files

The following are excluded from Jekyll builds (see `_config.yml`):
- Content planning docs: `CONTENT-*.md`, `content-*.md`
- Strategy docs: `PERSONA-ANALYSIS.md`, `SOCIAL-MEDIA-STRATEGY.md`
- Development docs: `README.md`, `SHOP-INTEGRATION-README.md`, `CODE-REVIEW-REPORT.md`

## Mobile-First Responsive Design

All styles follow mobile-first approach:
1. Base styles for mobile (< 768px)
2. Tablet breakpoint: 768px
3. Desktop breakpoint: 1024px
4. Large desktop: 1200px

Mobile menu uses hamburger toggle with ARIA attributes and transforms into horizontal nav on desktop.

## Accessibility Features

- Skip to content link
- ARIA labels on navigation and buttons
- Focus management in age gate modal
- Keyboard navigation support
- Semantic HTML structure
- Focus visible styles

## Common Gotchas

1. **Base URL**: Always use `{{ '/path' | relative_url }}` for internal links
2. **Tobacco Shop**: API_URL must be configured before deployment
3. **Age Gate**: localStorage must be enabled for age verification to work
4. **Shop Dropdown**: Requires both CSS hover rules (desktop) and is part of mobile menu
5. **Cart Badge**: Updates require JavaScript in both header and tobacco-shop page
