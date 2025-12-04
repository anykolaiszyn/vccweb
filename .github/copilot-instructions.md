# Vice City Cigars — Copilot Instructions (AI Agents)

## Big Picture
- Jekyll 4.3 project site with base URL `/vccweb` and Miami Vice aesthetic.
- Two shops: `square-shop.md` (future Square store) and `tobacco-shop.html` (live, API-driven, inline CSS/JS by design).
- Apps Script backend exposes inventory and pre-order submission; Square sync script populates Google Sheets.

## Architecture & Data Flow
- Square Catalog → `square-inventory-sync.js` → Google Sheets (Inventory + Images)
- Apps Script API (`apps-script-updated.js`) → `GET ?route=inventory`, `GET ?route=checkCustomer&email=X`, `POST` pre-order with ID (`dataBase64`).
- Frontend `tobacco-shop.html` fetches and renders items; cart is in-memory.

## Non-Obvious Conventions
- Always use `{{ '/path' | relative_url }}` for internal links (GitHub Pages).
- `tobacco-shop.html` keeps all styles/scripts inline; do not factor into external files.
- Age gate: `_includes/age-gate.html` + `assets/js/age-gate.js`, 30-day localStorage `vcc-age-verified` with focus trap.
- Category display priority: use `Category_Level_2` → `Lowest_Category` → parse from `Categories`.
- Drive images: prefer `https://drive.google.com/thumbnail?id={fileId}&sz=w800`; transform old `/uc?export=view&id=` URLs.

## Security & Protected Files
- Do not commit secrets or Apps Script files: `apps-script-updated.js`, `square-inventory-sync.js`, any `*-sync.js`, tokens/keys.
- CSP allowlist for images: `drive.google.com`, `lh3.googleusercontent.com` (edit in `_includes/head.html`).

## Expected API Response
```json
{ "items": [{
  "SKU": "string", "Display_Name": "string",
  "Price": number, "Qty_On_Hand": number,
  "Description": "HTML", "Categories": "A > B > C",
  "Drive_Image_URL": "https://drive.google.com/thumbnail?id=..."
}]}
```

## Build, Serve, Deploy (Windows PowerShell)
```powershell
bundle exec jekyll serve   # http://localhost:4000/vccweb
bundle exec jekyll build   # outputs to _site/
git add -A; git commit -m "Update"; git push
```

## Editing Patterns & Examples
- Header cart badge: `document.getElementById('cartCountHeader').textContent = count;`
- Inline modal style (center): use `fixed`, `top:50vh; left:50vw; transform: translate(-50%, -50%);`.
- JS modules use IIFEs; avoid globals. `tobacco-shop.html` scripts are inline.

## Common Tasks
- New categories: update Square → run Apps Script sync → Sheet → API → site.
- Modify shop styling: edit `<style>` in `tobacco-shop.html` (keep inline).
- Blog posts: `_posts/YYYY-MM-DD-slug.md` with `layout: post`, `categories`, and `relative_url` in links.

## Troubleshooting
- Products not loading: verify API URL in `tobacco-shop.html`, check console; test `?route=inventory` directly.
- Images blocked: add Drive domains to CSP in `_includes/head.html`; ensure thumbnail URLs.
- Age gate not showing: confirm localStorage, script loaded, and modal is included.
- Base URL issues: confirm `_config.yml` has `baseurl: "/vccweb"`; use `relative_url`.

## Business Rules
- 21+ only; server validates DOB ≥ 21 and requires ID upload. IDs purged within ~24h; verified customers recorded.
- Pre-orders only; manual invoicing (ACH/Bitcoin); adult signature fee applies.

## Files To Avoid Editing Automatically
- `apps-script-updated.js`, `square-inventory-sync.js`, planning docs (`CONTENT-*`, `PERSONA-*`), `tobacco-shop-backup.html`.

## Quick References
- Theme: `assets/css/theme.css` (colors: cyan `#00FFFF`, pink `#FF1493`, gold `#ffcc66`, navy `#0A0A2E`).
- Layouts: `_layouts/default.html`, `_includes/header.html`, `_includes/age-gate.html`.
- Inline shop code location: `tobacco-shop.html`.
