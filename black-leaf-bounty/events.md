---
layout: blb
title: Black Leaf Bounty Events
permalink: /black-leaf-bounty/events/
description: "Ports of call and event appearances for The Black Leaf Bounty."
---

# Events And Voyages

Find The Black Leaf Bounty at Renaissance fairs, themed gatherings, and select private events across South Florida and beyond.

## Ports Of Call

### Camelot Days 2025
**November 2025** | **Pompano Beach, FL**

A dependable harbor for guests seeking premium cigars, thoughtful pipe guidance, and the full merchant-trader atmosphere.

### Florida Renaissance Festival 2026
**Spring 2026** | **Location TBA**

Fresh dispatches will be posted as dates and logistics are confirmed for the next voyage.

## What To Expect At The Booth
- A welcoming merchant tone instead of a rushed sales pitch
- Guidance for cigar guests, pipe newcomers, and returning collectors
- Seasonal selections and fair-ready bundles when available
- A 21+ tobacco retail experience grounded in craft and compliance
- Authentic merchant atmosphere—weathered wood, period styling, storytelling

## Booking A Private Event

The Black Leaf Bounty isn't just for Renaissance fairs. The same merchant expertise and atmospheric presentation work for themed weddings, private celebrations, brand activations, and dedicated cigar lounges.

**Service models available:**
- **The Merchant Table** (compact booth, walk-up service)
- **The Quarterdeck Lounge** (seated experience, deeper storytelling)
- **The Captain's Reception** (full private events, tailored theming)

**Lead time:** 4–8 weeks for fair bookings; 2–4 weeks for private events.  
**Ready to book?** [Contact the Captain]({{ '/black-leaf-bounty/contact/' | relative_url }}) or call [561-331-0491](tel:+15613310491).

More details at [Services Aboard The Bounty]({{ '/black-leaf-bounty/services/' | relative_url }}).

## Event Dispatches
<ul class="blog-list">
  {% assign pirate_posts = site.posts | where_exp: "post", "post.categories contains 'renaissance' or post.categories contains 'events' or post.categories contains 'culture'" %}
  {% for post in pirate_posts limit: 6 %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span class="blog-date">{{ post.date | date: "%b %d, %Y" }}</span>
    <p>{{ post.excerpt }}</p>
  </li>
  {% endfor %}
</ul>

<p>
  <a class="blb-btn" href="{{ '/black-leaf-bounty/contact/' | relative_url }}">Book A Merchant Event</a>
  <a class="blb-btn blb-btn-secondary" href="{{ '/black-leaf-bounty/blog/' | relative_url }}">Read Captain's Log</a>
</p>
