# Dual-Brand Split-Screen Implementation Plan

> **Status:** Draft | **Created:** 2026-03-10
> **Goal:** After the age gate, present a left/right brand chooser. Left = Vice City Cigars (Miami Vice tropical oasis). Right = The Black Leaf Bounty (pirate/renaissance). Each side gets its own themed route tree, nav, and content.

---

## Architecture Overview

```
Age Gate → Split-Screen Chooser (/)
              ├── LEFT: Vice City Cigars → /vice-city/*
              └── RIGHT: Black Leaf Bounty → /black-leaf-bounty/*
```

- **Chooser at `/`** — Full-viewport split-screen, no header/nav. Sets `localStorage('vcc-brand')` on click, navigates to chosen brand's landing.
- **Two route trees** — `/vice-city/*` (9 pages) and `/black-leaf-bounty/*` (9 pages).
- **Brand-specific nav** — `header-miami.html` and `header-blb.html`, each with a "Switch Experience" link back to `/`.
- **Shared content via `_includes/`** — Services, contact, and learn content maintained once, rendered in both themed contexts.
- **Blog** — Single `_posts` collection with `brand` front matter field. "The Lounge" (Miami) and "Captain's Log" (Pirate) filter accordingly.

### Layout Hierarchy

```
default.html (base: age-gate, body, footer)
├── chooser.html        ← NEW: split-screen, no header/nav
├── miami.html          ← NEW: extends default, uses header-miami.html
├── blb.html            ← UPDATE: uses header-blb.html
├── post.html           ← UPDATE: detect brand for styling
└── page.html           ← KEEP for shared/legacy
```

---

## Phase 1: Foundation

> **Must complete before Phases 2–3.** All structural scaffolding.

| # | Task | File(s) | Agent |
|---|------|---------|-------|
| 1 | Create `chooser.html` layout — split-screen, full-viewport two-panel. Left: Miami Vice gradient, VCC logo, CTA → `/vice-city/`. Right: dark pirate theme, BLB imagery, CTA → `/black-leaf-bounty/`. Mobile: stack vertically. JS sets localStorage on click. | `_layouts/chooser.html` | **Copilot (default)** — HTML/CSS/JS layout work |
| 2 | Rewrite `index.md` — change layout to `chooser`, strip existing content | `index.md` | **Copilot (default)** — simple front matter change |
| 3 | Create `header-miami.html` — Fork existing `header.html` for Miami nav: Home, Shop, Events, Services, About, Learn, Blog, Gallery, Contact + "Switch Experience ⚓" link | `_includes/header-miami.html` | **Copilot (default)** — nav template work |
| 4 | Create `header-blb.html` — Pirate-themed nav: Home, Ship's Store, Events, Services, About, Captain's Log, Gallery, Contact + "Switch Experience 🌴" link | `_includes/header-blb.html` | **Copilot (default)** — nav template work |
| 5 | Create `miami.html` layout — extends `default.html`, swaps in `header-miami.html`, loads Miami CSS vars | `_layouts/miami.html` | **Copilot (default)** — layout scaffolding |
| 6 | Update `blb.html` layout — swap in `header-blb.html` instead of default header | `_layouts/blb.html` | **Copilot (default)** — layout edit |

**Why Copilot (default):** Phase 1 is structural HTML/CSS/JS — layouts, includes, and Liquid templates. The default agent has full tool access (terminal, edit, search) needed for creating layouts, testing builds, and iterating on the split-screen CSS.

---

## Phase 2: Vice City Cigars (Miami) Pages

> **Can run in parallel with Phase 3.** Content pages for the Miami Vice side.

| # | Task | File(s) | Agent |
|---|------|---------|-------|
| 7 | Miami landing page — reuse current hero content, service cards from `_data/menu.yml`, event teasers, testimonials | `vice-city/index.md` | **Copilot (default)** — Liquid template + content |
| 8 | Shop page — links through to existing `tobacco-shop.html` (shop stays as-is) | `vice-city/shop.md` | **Copilot (default)** — simple redirect/link page |
| 9 | Events — Miami/SoFla events: pop-ups, cigar nights, private events. Pull from existing `events.md` Section content | `vice-city/events.md` | **Copilot (default)** — content page |
| 10 | Services — shared content include, Miami themed. Extract reusable include from current `services.md` | `vice-city/services.md` + `_includes/services-content.html` | **Copilot (default)** — extract include + create page |
| 11 | About — VCC origin story, tropical brand story, neurodivergent founder angle | `vice-city/about.md` | **Copilot (default)** — content authoring |
| 12 | Learn — cigar education, choosing guides. Shared include from current `learn.md` | `vice-city/learn.md` | **Copilot (default)** — content page |
| 13 | Blog index — "The Lounge" — filters `_posts` by Miami categories | `vice-city/blog/index.md` | **Copilot (default)** — Liquid filtering template |
| 14 | Gallery — photo wall using `assets/img/gallery/`, Miami-styled grid | `vice-city/gallery.md` | **Copilot (default)** — layout + CSS |
| 15 | Contact — shared contact content include, Miami themed | `vice-city/contact.md` + `_includes/contact-content.html` | **Copilot (default)** — extract include + create page |

**Why Copilot (default):** These pages mix Liquid templating (blog filters, data loops) with content authoring. The default agent handles both and can test builds incrementally.

---

## Phase 3: Black Leaf Bounty (Pirate) Pages

> **Can run in parallel with Phase 2.** Content pages for the pirate/renaissance side.

| # | Task | File(s) | Agent |
|---|------|---------|-------|
| 16 | Pirate landing — expand existing `black-leaf-bounty.md`, move to `black-leaf-bounty/index.md`. Add section teasers + coming-soon shop teaser on this page | `black-leaf-bounty/index.md` (source: `black-leaf-bounty.md`) | **Copilot (default)** — refactor + expand content |
| 17 | Ship's Store — "Coming Soon" page. Pirate-themed design, email/Instagram signup CTA | `black-leaf-bounty/shop.md` | **Copilot (default)** — themed page |
| 18 | Events — Renaissance fairs. Dedicated page + pulls `_posts` tagged `renaissance`/`culture` | `black-leaf-bounty/events.md` | **Copilot (default)** — Liquid filtering + content |
| 19 | Services — pirate-themed event booking, shared services include, emphasize Ren Fair packages | `black-leaf-bounty/services.md` | **Copilot (default)** — themed content page |
| 20 | About — Black Leaf Bounty origin, the ship metaphor, ren-fair history, founder (pirate angle) | `black-leaf-bounty/about.md` | **Copilot (default)** — content authoring |
| 21 | Learn — **Pipe tobacco education** (pipe basics, blends, packing, maintenance). Addresses critical persona gap from PERSONA-ANALYSIS.md | `black-leaf-bounty/learn.md` | **Copilot (default)** — new content (domain-heavy) |
| 22 | Blog index — "Captain's Log" — filters `_posts` by `renaissance`/`culture`/`events` categories | `black-leaf-bounty/blog/index.md` | **Copilot (default)** — Liquid filtering template |
| 23 | Gallery — Renaissance fair photo wall, pirate-styled grid | `black-leaf-bounty/gallery.md` | **Copilot (default)** — layout + CSS |
| 24 | Contact — shared contact content include, pirate themed | `black-leaf-bounty/contact.md` | **Copilot (default)** — themed content page |

**Why Copilot (default):** Same rationale as Phase 2. Step 21 (pipe tobacco learn page) is the most content-heavy — consider providing reference material or outlines for that one.

---

## Phase 4: Blog Tagging & Shared Includes

> **After Phases 2–3. Quick cross-cutting changes.**

| # | Task | File(s) | Agent |
|---|------|---------|-------|
| 25 | Add `brand` front matter to all blog posts | `_posts/2025-11-10-renaissance-fair-magic.md` → `brand: pirate` | **Copilot (default)** — simple front matter edits |
| | | `_posts/2025-11-15-choosing-your-first-cigar.md` → `brand: miami` | |
| | | `_posts/2025-11-20-neurodivergent-tobacco-entrepreneur.md` → `brand: both` | |
| | | `_posts/2025-11-25-two-worlds-one-passion.md` → `brand: both` | |
| 26 | Extract shared content includes from existing pages (if not already done in Phases 2–3) | `_includes/services-content.html`, `_includes/contact-content.html`, `_includes/learn-cigar-content.html` | **Copilot (default)** — refactoring |

---

## Phase 5: Theme CSS & Polish

> **After Phases 1–4. Visual refinement and cross-cutting UX.**

| # | Task | File(s) | Agent |
|---|------|---------|-------|
| 27 | Split-screen chooser CSS — 50/50 panels, hover glow effects, mobile stacking (50vh each), keyboard-navigable, focus-visible outlines | Inline in `_layouts/chooser.html` or `assets/css/chooser.css` | **Copilot (default)** — CSS/animation work |
| 28 | Update `post.html` — detect `brand` field and apply matching theme class | `_layouts/post.html` | **Copilot (default)** — Liquid + CSS |
| 29 | Verify age gate works with chooser — no logic changes needed, just confirm the flow | `_includes/age-gate.html`, `assets/js/age-gate.js` | **Cigar UX and Compliance** — age-gate behavior audit |
| 30 | Footer — add "Switch to [other brand]" link, decide if footer is brand-themed or neutral | `_includes/footer.html` | **Copilot (default)** — template edit |

**Why Cigar UX and Compliance for step 29:** This is a compliance-sensitive verification — the age gate must not break, messages must stay 21+ consistent, and the new chooser flow must not bypass or weaken enforcement. That's exactly what the compliance agent is built to audit.

---

## Phase 6: Config, Redirects & Cleanup

> **Final phase. SEO preservation and build validation.**

| # | Task | File(s) | Agent |
|---|------|---------|-------|
| 31 | Update `_config.yml` — add layout defaults for `/vice-city/` and `/black-leaf-bounty/` subdirectories | `_config.yml` | **Copilot (default)** — config edit |
| 32 | Add redirects from old root pages to chooser — `about.md`, `services.md`, `events.md`, `contact.md`, `learn.md` get meta-refresh redirects to `/` | Root `.md` files | **Copilot (default)** — template edits |
| 33 | Redirect `blog/index.md` — either redirect to chooser or show combined feed | `blog/index.md` | **Copilot (default)** — template edit |

---

## Phase 7: Full Audit

> **After all phases complete. Before going live.**

| # | Task | Scope | Agent |
|---|------|-------|-------|
| 34 | **Full UX + compliance audit** — verify all pages, both brand flows, age gate, shipping/legal copy, accessibility, trust signals, mobile behavior | All pages in both route trees | **Cigar UX and Compliance** |
| 35 | **Build + link validation** — `bundle exec jekyll build`, check for broken links, missing assets, Liquid errors | Full site | **Copilot (default)** |

**Why Cigar UX and Compliance for step 34:** Once everything is built, the compliance agent should do a full sweep: age-gate flow across both brands, legal copy consistency, WCAG accessibility check on new pages, mobile UX for the chooser and both navs, and trust signals on policy pages. This is exactly its wheelhouse.

---

## Agent Summary

| Agent | Steps | Why |
|-------|-------|-----|
| **Copilot (default)** | 1–28, 30–33, 35 | Full tool access (edit, terminal, search). Handles HTML/CSS/JS layout work, Liquid templates, content authoring, Jekyll config, build testing. The bulk of implementation. |
| **Cigar UX and Compliance** | 29, 34 | Specialized audits: age-gate behavior verification (step 29) and full-site UX + compliance sweep before launch (step 34). No code creation — review, findings, and targeted fixes only. |

### How to invoke each agent

- **Copilot (default):** Just chat normally. Reference this plan and the step number, e.g.:
  > "Implement Phase 1, steps 1–6 from DUAL-BRAND-IMPLEMENTATION-PLAN.md"

- **Cigar UX and Compliance:** Select the agent from the agent picker (or `@cigar-ux-compliance`), then prompt:
  > "Audit the age gate flow with the new chooser layout — verify 21+ enforcement is not weakened"
  > "Full UX and compliance audit of both brand route trees before launch"

---

## Recommended Execution Order

```
Phase 1 (steps 1–6)          ← Do first, everything depends on this
    ↓
Phase 2 (steps 7–15)  }
                       }      ← Can run in parallel
Phase 3 (steps 16–24) }
    ↓
Phase 4 (steps 25–26)        ← Quick cross-cutting changes
    ↓
Phase 5 (steps 27–30)        ← Polish and verification
    ↓
Phase 6 (steps 31–33)        ← Config and cleanup
    ↓
Phase 7 (steps 34–35)        ← Full audit before launch
```

---

## Open Questions

1. **Image assets** — Does the pirate side have its own photography (ship, ren-fair booth photos, gold textures), or should we use placeholders initially?
2. **Root page fate** — Redirect old URLs (`/about/`, `/services/`) to the chooser, or keep them as neutral "shared" pages? (Plan recommends redirects for SEO continuity.)
3. **Tobacco shop** — The existing `tobacco-shop.html` stays as-is under Vice City. When is the pirate shop expected to go live?
4. **Blog post template** — Should new posts auto-detect their brand theme from front matter? (Plan recommends yes — `brand` field in front matter, `post.html` reads it automatically.)

---

## Files Created / Modified (Complete List)

### New Files (25)
- `_layouts/chooser.html`
- `_layouts/miami.html`
- `_includes/header-miami.html`
- `_includes/header-blb.html`
- `_includes/services-content.html`
- `_includes/contact-content.html`
- `_includes/learn-cigar-content.html`
- `vice-city/index.md`
- `vice-city/shop.md`
- `vice-city/events.md`
- `vice-city/services.md`
- `vice-city/about.md`
- `vice-city/learn.md`
- `vice-city/blog/index.md`
- `vice-city/gallery.md`
- `vice-city/contact.md`
- `black-leaf-bounty/index.md` (moved from `black-leaf-bounty.md`)
- `black-leaf-bounty/shop.md`
- `black-leaf-bounty/events.md`
- `black-leaf-bounty/services.md`
- `black-leaf-bounty/about.md`
- `black-leaf-bounty/learn.md`
- `black-leaf-bounty/blog/index.md`
- `black-leaf-bounty/gallery.md`
- `black-leaf-bounty/contact.md`

### Modified Files (10)
- `index.md` — rewritten as chooser
- `_layouts/blb.html` — updated header include
- `_layouts/post.html` — brand-detection theming
- `_includes/footer.html` — brand-switch link
- `_config.yml` — subdirectory defaults
- `_posts/2025-11-10-renaissance-fair-magic.md` — `brand: pirate`
- `_posts/2025-11-15-choosing-your-first-cigar.md` — `brand: miami`
- `_posts/2025-11-20-neurodivergent-tobacco-entrepreneur.md` — `brand: both`
- `_posts/2025-11-25-two-worlds-one-passion.md` — `brand: both`
- `blog/index.md` — redirect or combined feed

### Retired / Redirected (5)
- `about.md` → meta-refresh to `/`
- `services.md` → meta-refresh to `/`
- `events.md` → meta-refresh to `/`
- `contact.md` → meta-refresh to `/`
- `learn.md` → meta-refresh to `/`

### Untouched (reference only)
- `tobacco-shop.html`, `tobacco-shop/*` — existing shop, linked from Vice City
- `assets/css/theme.css` — Miami CSS vars reused
- `_data/menu.yml`, `_data/testimonials.yml` — existing data
- `PERSONA-ANALYSIS.md` — informs pipe smoker content (step 21)
