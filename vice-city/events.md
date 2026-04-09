---
layout: miami
title: "Events — Vice City Cigars"
permalink: /vice-city/events/
description: "South Florida cigar pop-ups, private venue nights, and custom event bookings from Vice City Cigars."
---

<section class="hero">
  <h1>The Event Calendar</h1>
  <p class="hero-body">Pop-ups for holidays and special occasions. Private venue nights monthly and quarterly. Custom bookings for celebrations that deserve a proper smoke.</p>
  <div class="hero-cta">
    <a href="{{ '/vice-city/contact/' | relative_url }}" class="btn btn-primary">Book An Event</a>
    <a href="https://instagram.com/vicecitycigars" class="btn btn-secondary" target="_blank" rel="noopener">Follow For Updates</a>
  </div>
</section>

<section class="events">
  <h2>How We Show Up</h2>
  <div class="event-cards">
    <div class="event-card">
      <h3>Holiday Pop-Ups</h3>
      <p>Seasonal appearances around South Florida — Fourth of July, Labor Day, New Year's, and other moments worth marking. Curated selection, full setup, and the oasis vibe wherever we land.</p>
      <p>Dates and locations drop on Instagram first.</p>
      <a href="https://instagram.com/vicecitycigars" class="btn btn-secondary" target="_blank" rel="noopener">Follow @vicecitycigars</a>
    </div>
    <div class="event-card">
      <h3>Private Venue Nights</h3>
      <p>Monthly and quarterly hosted events at private South Florida venues. Intimate size, elevated experience, and a crowd that shows up for a good smoke and good company.</p>
      <p>Reach out to get on the notification list.</p>
      <a href="{{ '/vice-city/contact/' | relative_url }}" class="btn btn-secondary">Get On The List</a>
    </div>
    <div class="event-card">
      <h3>Custom Bookings</h3>
      <p>Private parties, corporate entertaining, weddings, and milestone celebrations. We bring the humidor, the setup, and the hospitality. You bring the occasion.</p>
      <a href="{{ '/vice-city/contact/' | relative_url }}" class="btn btn-secondary">Inquire About Booking</a>
    </div>
  </div>
</section>

<section class="events">
  <h2>What To Expect At A Vice City Event</h2>
  <div class="event-cards">
    <div class="event-card">
      <h3>Curated Selection</h3>
      <p>Boutique Maduros, Connecticut shades, and limited releases chosen for the occasion. Not a generic shelf — a selection that reflects where we are and what the night calls for.</p>
    </div>
    <div class="event-card">
      <h3>No-Pressure Hospitality</h3>
      <p>First time with a cigar or a seasoned guest — either way, you get honest guidance and room to explore without anyone pushing a sale.</p>
    </div>
    <div class="event-card">
      <h3>The Oasis Setup</h3>
      <p>Mobile humidor, cutting and lighting station, and the kind of atmosphere that makes you slow down and stay a while.</p>
    </div>
  </div>
</section>

## Booking Your Event

Ready to bring Vice City to your celebration? Here's the process:

1. **Contact us** with your event details (date, location, guest count, occasion)
2. **We discuss** your vision, venue logistics, and curate a selection for your crowd
3. **Get a quote** and confirm your booking
4. **We show up** and bring the oasis—setup, hospitality, and all

**Lead time:** 2–4 weeks recommended for custom bookings.  
**Questions?** Call or text [561-331-0491](tel:+15613310491) or [send a message]({{ '/vice-city/contact/' | relative_url }}).

{% assign miami_posts = site.posts | where_exp: "post", "post.categories contains 'cigars' or post.categories contains 'events'" %}
{% if miami_posts.size > 0 %}
<section>
  <h2>From The Blog</h2>
  <ul class="blog-list">
    {% for post in miami_posts limit: 3 %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <span class="blog-date">{{ post.date | date: "%b %d, %Y" }}</span>
    </li>
    {% endfor %}
  </ul>
</section>
{% endif %}
