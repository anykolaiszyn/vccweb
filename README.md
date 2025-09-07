# Vice City Cigars Website

Deploy on GitHub Pages:

1. Push to GitHub
2. Go to **Settings → Pages → Source: Deploy from a branch → main → / (root)**
3. Site will be available at `https://anykolaiszyn.github.io/vccweb`
4. Replace `assets/img/vcclogo.png` with your real logo (prefer transparent PNG, 600–1200px wide).
5. (Optional) Point the contact form to your chosen static form endpoint; otherwise mailto: works.
6. Update phone, email, and social links in `_config.yml` and footer.
7. Add real photos to `assets/img/gallery/` and swap hero background.

---

## Phase 2 TODO (leave as checklist)

- [ ] Add `_data/products.yml` + simple catalog cards
- [ ] "Place order" flow (choose items → submit callback form or phone)
- [ ] Crypto payment option disclosure (info page)
- [ ] Testimonials collection + gallery page
- [ ] Event booking calendar embed (optional)

## Notes

- To enable a hosted form endpoint (e.g., Formspree), set the `data-form-endpoint` and `action` attributes on the form in `contact.md`. Leaving them empty keeps the site publishable without secrets. The mailto button works as a fallback.
- This is deployed as a project site with `baseurl: "/vccweb"` in `_config.yml`.
