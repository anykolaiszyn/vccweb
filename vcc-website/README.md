# Vice City Cigars Website

Deploy on GitHub Pages:

1. Push to GitHub
2. Go to **Settings → Pages → Source: main → / (root)**
3. Replace `assets/img/vcclogo.png` with your real logo (prefer transparent PNG, 600–1200px wide).
4. (Optional) Point the contact form to your chosen static form endpoint; otherwise mailto: works.
5. Update phone, email, and social links in `_config.yml` and footer.
6. Add real photos to `assets/img/gallery/` and swap hero background.

---

## Phase 2 TODO (leave as checklist)

- [ ] Add `_data/products.yml` + simple catalog cards
- [ ] “Place order” flow (choose items → submit callback form or phone)
- [ ] Crypto payment option disclosure (info page)
- [ ] Testimonials collection + gallery page
- [ ] Event booking calendar embed (optional)

## Notes

- To enable a hosted form endpoint (e.g., Formspree), set the `data-form-endpoint` and `action` attributes on the form in `contact.md`. Leaving them empty keeps the site publishable without secrets. The mailto button works as a fallback.
- If this is deployed as a project site under a repository path, set `baseurl: "/vcc-website"` in `_config.yml`.
