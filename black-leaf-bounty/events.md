---
layout: blb
title: Black Leaf Bounty Events
permalink: /black-leaf-bounty/events/
description: "Ports of call and event appearances for The Black Leaf Bounty."
---

# Events And Voyages

Find The Black Leaf Bounty at Renaissance fairs, pirate festivals, and themed gatherings across South Florida. Each voyage brings the full merchant experience: curated tobacco, honest guidance, and the kind of booth atmosphere you actually want to spend time in.

## Upcoming Ports

<p><em>Dates are listed as pending until final event confirmations are in.</em></p>

<div class="filter-buttons" id="events-brand-filters" style="margin-bottom: 1rem;">
  <button class="filter-btn active" data-brand="all">All Brands</button>
  <button class="filter-btn" data-brand="black-leaf-bounty">Black Leaf Bounty</button>
  <button class="filter-btn" data-brand="vice-city">Vice City</button>
</div>

{% assign upcoming_events = site.shared_events | where: "status", "upcoming" | sort: "event_date" %}
{% if upcoming_events.size > 0 %}
<div class="offerings-grid">
  {% for event in upcoming_events %}
  <div class="offering-card blb-card" data-brand="{{ event.brand | default: 'shared' }}">
    {% if event.cover_image %}
    <img src="{{ event.cover_image | relative_url }}" alt="{{ event.title }}" loading="lazy" width="400" height="300">
    {% endif %}
    <h3>{{ event.title }}</h3>
    <p class="blb-event-date"><strong>{{ event.event_date | date: "%B %Y" }}</strong> — {{ event.location }}</p>
    <p>{{ event.summary }}</p>
    <p><strong>Source:</strong> {% if event.brand == 'black-leaf-bounty' %}Black Leaf Bounty{% elsif event.brand == 'vice-city' %}Vice City{% else %}Shared{% endif %}</p>
    <div class="blb-button-row">
      <a class="blb-btn" href="{{ event.url | relative_url }}">Details & Map</a>
      {% if event.photo_album_url %}
      <a class="blb-btn blb-btn-secondary" href="{{ event.photo_album_url }}" target="_blank">Photos</a>
      {% endif %}
    </div>
  </div>
  {% endfor %}
</div>
{% else %}
<p><em>New voyages are being charted. Check back soon for 2026 ports of call.</em></p>
{% endif %}

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

## Event Dispatches & Blog

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

<script>
(function () {
  'use strict';

  var buttons = document.querySelectorAll('#events-brand-filters [data-brand]');
  var cards = document.querySelectorAll('.offerings-grid [data-brand]');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var brand = button.getAttribute('data-brand');
      buttons.forEach(function (b) { b.classList.remove('active'); });
      button.classList.add('active');
      cards.forEach(function (card) {
        var cardBrand = card.getAttribute('data-brand');
        var show = brand === 'all' || cardBrand === brand || cardBrand === 'shared';
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();
</script>
