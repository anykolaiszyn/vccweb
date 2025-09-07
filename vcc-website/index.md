---
layout: page
title: Home
---

<section class="hero">
  <img src="{{ '/assets/img/vcclogo.png' | relative_url }}" alt="Vice City Cigars logo" class="hero-logo" loading="eager" width="220" height="auto">
  <h1>Your Mobile Tropical Smoking Oasis</h1>
  <p class="hero-body">We bring laid-back, Miami-tropical vibes to your events—curated cigars, fine pipes, hookahs, and effortless hospitality.</p>
  <div class="hero-cta">
    <a href="{{ '/contact' | relative_url }}" class="btn btn-primary">Book an Event</a>
    <a href="{{ '/services' | relative_url }}" class="btn btn-secondary">Explore Services</a>
  </div>
</section>

<section class="offerings">
  <h2>What We Offer</h2>
  <div class="offerings-grid">
    {% for item in site.data.menu %}
    <div class="offering-card">
      <img src="{{ item.img | relative_url }}" alt="{{ item.title }}" loading="lazy">
      <h3>{{ item.title }}</h3>
      <p>{{ item.blurb }}</p>
    </div>
    {% endfor %}
  </div>
</section>

<section class="events">
  <h2>Event Services</h2>
  <div class="event-cards">
    <div class="event-card">
      <h3>Private Parties</h3>
      <p>Bring the oasis to birthdays, anniversaries, and celebrations. Cutting & lighting, flavoring station, and mobile humidor included.</p>
      <a href="/contact" class="btn btn-secondary">Request a Callback</a>
    </div>
    <div class="event-card">
      <h3>Weddings</h3>
      <p>Make your big day unforgettable with a tropical cigar lounge, expert hosts, and custom pairings.</p>
      <a href="/contact" class="btn btn-secondary">Request a Callback</a>
    </div>
    <div class="event-card">
      <h3>Corporate</h3>
      <p>Impress clients and teams with a unique, upscale experience. Full-service setup, flavoring, and more.</p>
      <a href="/contact" class="btn btn-secondary">Request a Callback</a>
    </div>
  </div>
</section>

<section class="testimonials">
  <h2>Testimonials</h2>
  <div class="testimonial-list">
    {% for t in site.data.testimonials %}
    <blockquote class="testimonial">
      <p>“{{ t.quote }}”</p>
      <footer>— {{ t.author }}</footer>
    </blockquote>
    {% endfor %}
  </div>
</section>
