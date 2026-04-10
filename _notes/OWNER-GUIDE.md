# Vice City Cigars — Owner's Content Guide

This guide covers the day-to-day tasks you'll actually do: adding photos, posting events, writing blog posts, and keeping content fresh. No developer knowledge required.

For technical tasks (local preview, deployment commands, re-enabling the shop), see [MAINTENANCE.md](MAINTENANCE.md).

---

## How the site is organized

The site has two brands under one roof:

| Brand | Tone | URL path |
|---|---|---|
| Vice City Cigars | Modern, tropical, Miami Vice | `/vice-city/` |
| Black Leaf Bounty | Renaissance merchant, pipe-forward | `/black-leaf-bounty/` |

Every piece of content (events, gallery, learning, blog) is tagged with a `brand:` field that controls which brand's pages it shows up on. Use `brand: shared` to make something appear on both.

---

## Adding photos

### Where to store them

Photos go on **Google Drive** — not in the site files. The site then references them by URL. This keeps the site fast and your Drive organized.

For small site assets (logos, icons) those live in the repo at `assets/img/` and are already set up.

### Step-by-step: Get a photo URL from Google Drive

1. Upload your photo to Google Drive
2. Right-click the photo → **Share** → change access to **"Anyone with the link"** → copy the link
3. The share link looks like:
   ```
   https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ/view
   ```
4. Copy just the file ID — the long string between `/d/` and `/view`:
   ```
   1aBcDeFgHiJkLmNoPqRsTuVwXyZ
   ```
5. Build your image URL:
   ```
   https://drive.google.com/thumbnail?id=1aBcDeFgHiJkLmNoPqRsTuVwXyZ&sz=w800
   ```

Change `w800` to control the size:
- `w400` — card thumbnails
- `w800` — standard content images  
- `w1200` — hero / full-width images

> **Important:** Always use the `thumbnail?id=` format. The old `/uc?export=view` format no longer works reliably.

---

## Adding a gallery entry

Each file in `_shared_galleries/` becomes one card on the gallery page. One file = one story with one cover photo.

**Create a new file** named `_shared_galleries/YYYY-MM-DD-short-title.md`:

```markdown
---
brand: vice-city
layout: miami
title: "Pop-Up at Mizner Park — April 2026"
date: 2026-04-15
cover_image: "https://drive.google.com/thumbnail?id=YOUR_FILE_ID&sz=w800"
caption: "One line shown under the photo on the card."
story: "A sentence or two shown on the listing page. Keep it short."
album_url: "https://instagram.com/vicecitycigars"
---

Longer write-up here. This appears on the full story page when someone clicks "Read Full Story."
```

**Brand options:**
- `brand: vice-city` + `layout: miami` → shows on Vice City gallery
- `brand: black-leaf-bounty` + `layout: blb` → shows on BLB gallery
- `brand: shared` + `layout: page` → shows on both

The gallery page updates automatically — you never edit the gallery page itself.

---

## Adding an event

Each file in `_shared_events/` becomes one event card.

**Create** `_shared_events/YYYY-MM-DD-event-name.md`:

```markdown
---
brand: black-leaf-bounty
layout: blb
title: "Camelot Days Renaissance Fair"
event_date: 2026-11-08
location: "Pompano Beach, FL"
status: upcoming
cover_image: "https://drive.google.com/thumbnail?id=YOUR_FILE_ID&sz=w800"
summary: "Short description shown on the event card. One or two sentences."
photo_album_url: "https://instagram.com/vicecitycigars"
cta_label: "Event Photos"
---

Full event description here. Include what to expect, how to find the booth, parking tips, etc.
```

**Status options:**
- `status: upcoming` — shows in the Upcoming Ports section
- `status: past` — moves to past events (or just leave it, it won't hurt)

If dates aren't confirmed yet, put your best guess for `event_date` and update it later. Don't delete the file — just update the date when confirmed.

---

## Adding a blog post

Blog posts go in `_posts/` and show up in The Dispatch (Vice City) or Captain's Log (BLB) based on their categories.

**Create** `_posts/YYYY-MM-DD-post-title.md`:

```markdown
---
layout: post
title: "Your Post Title Here"
date: 2026-04-15
categories: [events, culture]
author: Vice City Cigars
excerpt: "One sentence preview shown on the blog listing."
image: "https://drive.google.com/thumbnail?id=YOUR_FILE_ID&sz=w800"
---

Write your post here. Use ## for section headings.
```

**Which categories control where the post appears:**

| Category | Shows in |
|---|---|
| `events`, `culture`, `business`, `cigars` | Vice City — The Dispatch |
| `renaissance`, `events`, `culture` | BLB — Captain's Log |

You can use multiple categories. A post with `[events, renaissance]` shows in both blogs.

---

## Adding a learning article

Learning articles go in `_shared_learning/` and appear on the Learn pages.

**Create** `_shared_learning/YYYY-MM-DD-topic-title.md`:

```markdown
---
brand: vice-city
layout: miami
title: "How to Choose Your First Cigar"
published_on: 2026-04-15
tags: [Beginner, Cigars, Technique]
cover_image: "https://drive.google.com/thumbnail?id=YOUR_FILE_ID&sz=w800"
excerpt: "One sentence shown on the card."
---

Full article content here.
```

**Available tags** (these power the filter buttons on the Learn page):
`Beginner`, `Intermediate`, `Cigars`, `Pipe`, `Blends`, `Flavor`, `Technique`, `Care`, `Hardware`, `Storage`, `Pairing`, `Events`, `Etiquette`, `Fundamentals`, `Comparison`

Use tags that already exist to keep the filter clean. You can add new ones — they'll appear automatically as new filter buttons.

---

## Updating testimonials

Edit `_data/testimonials.yml`. Each entry is:

```yaml
- quote: "Vice City Cigars made our wedding unforgettable."
  author: "Jane & John Doe"
```

Add new ones at the top of the list. Delete old ones by removing their block. Testimonials only appear on the Vice City homepage when the file has at least one entry.

---

## Updating service descriptions

Edit `_data/menu.yml` to change the service cards that appear on the Vice City homepage. Each card has a title, blurb, and image.

---

## How to publish your changes

Once you've added or edited a file, your developer (or Claude Code) needs to:

1. Save the file
2. Run: `git add . && git commit -m "content: describe what you added" && git push origin main`

GitHub Actions deploys automatically after every push. The site updates within 1–2 minutes. You can check progress at: `https://github.com/anykolaiszyn/vccweb/actions`

If you're using Claude Code directly, just say "commit and push" and it will handle the git steps.

---

## Quick reference — which folder for what

| What you're adding | Folder |
|---|---|
| Blog post | `_posts/` |
| Event or fair appearance | `_shared_events/` |
| Gallery story | `_shared_galleries/` |
| Learning / education article | `_shared_learning/` |
| Service card text | `_data/menu.yml` |
| Testimonial | `_data/testimonials.yml` |
| Logo or UI image | `assets/img/` |
| Event/gallery photo | Google Drive → thumbnail URL |

---

## Naming files

All content files follow the same pattern: `YYYY-MM-DD-short-description.md`

- Use the date the content is relevant to (event date, publish date)
- Use hyphens, no spaces, no capitals
- Examples: `2026-11-08-camelot-days.md`, `2026-04-15-choosing-cigars.md`

---

*For technical tasks (local preview, troubleshooting, re-enabling the shop), see [MAINTENANCE.md](MAINTENANCE.md).*

*Last updated: April 2026*
