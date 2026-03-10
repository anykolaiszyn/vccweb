---
layout: miami
title: Vice City Events
permalink: /vice-city/events/
description: "Upcoming Miami-side events, private bookings, and South Florida appearances."
---

# Vice City Events

Catch us around South Florida for private gatherings, premium pop-ups, and curated smoking experiences.

## Upcoming Schedule

### Monthly Cigar Nights
Locations and partnerships announced on Instagram.

### Private Event Showcases
Seasonal open-house style demos for planners and hosts.

### Pop-Up Appearances
Beach and city events featuring curated cigar selections.

## Bookings
- Call or Text: [561-331-0491](tel:+15613310491)
- Email: [vccigar@gmail.com](mailto:vccigar@gmail.com)

## Related Stories
<ul class="blog-list">
  {% assign miami_posts = site.posts | where_exp: "post", "post.categories contains 'cigars' or post.categories contains 'beginner-guide' or post.categories contains 'education' or post.categories contains 'entrepreneurship'" %}
  {% for post in miami_posts limit: 4 %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span class="blog-date">{{ post.date | date: "%b %d, %Y" }}</span>
  </li>
  {% endfor %}
</ul>

<div class="hero-cta">
  <a class="btn btn-primary" href="{{ '/vice-city/contact' | relative_url }}">Book Your Event</a>
  <a class="btn btn-secondary" href="{{ '/vice-city/services' | relative_url }}">View Packages</a>
</div>
