# Vice City Cigars Website

**MVP Status:** ✅ Launch-ready (April 2026)

## Deployment

The site is deployed to GitHub Pages via GitHub Actions. Push to `main` and Actions will auto-build and deploy within 2–3 minutes.

**Production URL:** https://vicecitycigars.com (or https://anykolaiszyn.github.io/vccweb if using default GitHub Pages domain)

## Architecture

- **Dual-brand system**: Vice City (Miami Vice cyberpunk) + Black Leaf Bounty (Renaissance merchant pirate)
- **Brand chooser** at `/` with localStorage brand preference
- **Shared root pages** (`/about`, `/services`, `/events`, `/learn`, `/contact`) auto-redirect to saved brand experience
- **Compliance-safe shop teaser** at `/shop/` (online ordering disabled pending legal review)
- **Blog system** with category filtering by brand (`vice-city/blog/`, `black-leaf-bounty/blog/`)
- **QR business card landing** at `/vice-city/card/` for PCA event networking
- **Contact forms** routed to Formspree at `f/mwpnagkv`

## Development

```bash
bundle install
bundle exec jekyll serve --baseurl ""  # Local dev (http://localhost:4000)
bundle exec jekyll build               # Production build to _site/
```

## Post-PCA Backlog

After returning from PCA, prioritize:
1. **Gallery refresh** with real event photos
2. **Event recap blog post** capturing PCA learnings
3. **GA4 analytics setup** (placeholder ID still in code)
4. **Event operations tooling** (calendar, checklist, QR tracking)
5. **Tobacco shop compliance review** (legal team sign-off required before `published: true`)

See `.copilot-instructions.md` and project docs for architecture details.

## Notes

- All source files use `{{ '/path' | relative_url }}` for GitHub Pages baseurl compatibility
- API keys and tokens are in `.gitignore` (never committed): `apps-script-updated.js`, `square-inventory-sync.js`, `.env*`
- The site builds cleanly with zero warnings/errors
