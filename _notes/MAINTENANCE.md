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

Last updated: March 2, 2026
