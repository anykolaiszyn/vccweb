# Site Maintenance Guide

This document provides instructions for maintaining the Vice City Cigars Jekyll website.

---

## Local Development

### Preview the Site Locally
```bash
cd /path/to/vccweb
bundle exec jekyll serve --baseurl ""
```

Then visit: http://localhost:4000

The `--baseurl ""` flag is important for local preview since the production site uses a custom domain.

### Build the Site
```bash
bundle exec jekyll build
```

Output will be in `_site/` directory.

---

## Deployment

### GitHub Pages Deployment
The site automatically deploys when you push to the `main` branch:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

GitHub Actions will build and deploy automatically. Check the Actions tab for build status.

### Custom Domain Configuration
The site is configured for **vicecitycigars.com**:
- DNS must have CNAME pointing to GitHub Pages
- `CNAME` file in repo root contains: `vicecitycigars.com`
- _config.yml has: `url: https://vicecitycigars.com` and `baseurl: ""`

---

## Content Updates

### Quick How-To: Blog, Learn, Gallery, and Events

This site now uses shared markdown collections with brand tags.

- `brand: vice-city` = shows in Vice City pages
- `brand: black-leaf-bounty` = shows in BLB pages
- `brand: shared` = shows in both brands

#### 1) Add a Blog Post

Create a new file in `_posts/` with format:

```markdown
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD
categories: [events, culture]
author: Vice City Cigars
excerpt: "Short preview text"
image: /assets/img/gallery/your-image.jpg
---

Post content here.
```

Tips:
- Use `categories` to control where it appears in brand blog pages.
- Use one of these categories when relevant: `events`, `culture`, `renaissance`, `business`.

#### 2) Add or Update a Learning Card

Collection folder: `_shared_learning/`

Use this front matter:

```markdown
---
brand: vice-city
layout: miami
title: "Guide Title"
published_on: 2026-04-20
tags: [Beginner, Cigars, Technique]
cover_image: /assets/img/gallery/cigars.jpg
excerpt: "One-sentence summary for the card."
---

Full lesson content.
```

For BLB entries, change to:
- `brand: black-leaf-bounty`
- `layout: blb`

For shared entries, use:
- `brand: shared`
- `layout: page`

#### 3) Add or Update an Event Card

Collection folder: `_shared_events/`

```markdown
---
brand: black-leaf-bounty
layout: blb
title: "Event Name"
event_date: 2026-11-01
location: "Pompano Beach, FL"
status: "upcoming"
cover_image: /assets/img/gallery/pipes.jpg
summary: "Short card summary."
photo_album_url: "https://instagram.com/vicecitycigars"
cta_label: "Photos"
---

Event detail content.
```

Status options used today: `upcoming`, `past`.
If dates are not confirmed yet, keep the event and update `event_date` later.

#### 4) Add or Update a Gallery Story

Collection folder: `_shared_galleries/`

```markdown
---
brand: vice-city
layout: miami
title: "Gallery Story Title"
date: 2026-04-21
cover_image: /assets/img/gallery/lounge.jpg
caption: "Short caption shown on card."
story: "Short teaser shown on listing page."
album_url: "https://instagram.com/vicecitycigars"
---

Longer gallery story here.
```

#### 5) Where These Show Up

- Vice City Learn/Events/Gallery pages filter from shared collections by `brand`
- BLB Learn/Events/Gallery pages also filter from the same shared collections
- `brand: shared` appears in both

#### 6) Fast Publish Workflow

```bash
bundle exec jekyll build
git add .
git commit -m "content: add learning/event/gallery updates"
git push origin main
```

GitHub Actions deploys automatically from `main`.

### Update Black Leaf Bounty Faire Schedule
Edit: `black-leaf-bounty.md`

Find the section:
```markdown
## Find Us at Renaissance Fairs

**Camelot Days 2025**  
📅 November 2025 | 📍 Pompano Beach, FL
```

Update dates and add/remove fairs as needed.

### Update Contact Form
The contact form uses **Formspree**:
- Current endpoint: `https://formspree.io/f/mwpnagkv`
- To change: Edit `contact.md` and update the `action` attribute
- Sign in to Formspree.io to view submissions

### Update Event Testimonials
Edit: `_data/testimonials.yml`

Add new testimonial:
```yaml
- quote: "Vice City Cigars made our wedding reception unforgettable!"
  author: "Jane & John Doe"
```

### Update Service Offerings
Edit: `_data/menu.yml`

Update service cards that appear on the homepage.

---

## Age Verification

The age gate uses **sessionStorage** (resets each browser session):
- JavaScript: `assets/js/age-gate.js`
- Modal HTML: `_includes/age-gate.html`
- Storage key: `vcc-age-verified`

If users report issues with the age gate:
1. Check browser console for JavaScript errors
2. Verify `age-gate.js` is loading properly
3. Test in incognito/private browsing

---

## Enabling Google Analytics

When ready to enable GA4:
1. Get your GA4 Measurement ID (format: `G-XXXXXXXXXX`)
2. Edit: `_includes/analytics.html`
3. Uncomment the script block
4. Replace `G-XXXXXXXXXX` with your real ID
5. Commit and push to production

The analytics will **only load in production** (not in local development).

---

## Re-Enabling the Shop Section

**IMPORTANT:** The shop section (`tobacco-shop.html`) is currently disabled with `published: false` in the front matter.

Before re-enabling:
- [ ] PACT Act retailer registration completed
- [ ] Age verification provider integrated (e.g., AgeChecker.net)
- [ ] State-by-state shipping restrictions mapped
- [ ] Carrier agreements reviewed (UPS/FedEx tobacco)
- [ ] Florida tobacco retailer permit confirmed
- [ ] Payment processor tobacco merchant approval
- [ ] Legal review completed

To re-enable:
1. Update `tobacco-shop.html` front matter: change `published: false` to `published: true`
2. Add shop link to `_includes/header.html` navigation
3. Ensure compliance documentation is complete

**Do not re-enable without legal review.**

---

## Common Issues

### Site Not Deploying
1. Check GitHub Actions build log for errors
2. Common issues:
   - YAML syntax errors in front matter
   - Missing Liquid tag closures
   - Invalid plugin names

### Broken Links After Domain Change
- All internal links use `{{ '/path' | relative_url }}`
- This automatically adds the baseurl (currently empty)
- Never hardcode full URLs for internal links

### Images Not Loading
- Images should be in: `assets/img/` or `assets/images/`
- Use: `{{ '/assets/img/filename.png' | relative_url }}`
- Check file case sensitivity (Linux servers are case-sensitive)

### CSS Not Updating
- Jekyll uses SASS compilation with caching
- Force rebuild: `bundle exec jekyll clean && bundle exec jekyll build`
- Check `sass.style: compressed` in `_config.yml`

---

## Contact Information

**Owner Contact:**
- Email: vccigar@gmail.com
- Phone: 561-331-0497

**Technical Support:**
- GitHub Issues: Use the repository's Issues tab
- Jekyll Documentation: https://jekyllrb.com/docs/

---

Last updated: April 9, 2026
