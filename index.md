---
layout: page
title: Home
---

<section class="hero">
  <img src="{{ '/assets/img/vcclogo.png' | relative_url }}" alt="Vice City Cigars logo" class="hero-logo" loading="eager" width="220" height="auto">
  <h1>Your Mobile Tropical Smoking Oasis</h1>
  <p class="hero-body">We bring that laid-back Miami-tropical energy to your events—hand-selected cigars, artisan pipes, premium hookahs, and the kind of effortless hospitality that makes every gathering unforgettable.</p>
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
      <p>Transform birthdays, anniversaries, and celebrations into tropical escapes. Complete with cutting & lighting station, flavoring bar, and our signature mobile humidor setup.</p>
      <a href="{{ '/contact' | relative_url }}" class="btn btn-secondary">Request a Callback</a>
    </div>
    <div class="event-card">
      <h3>Weddings</h3>
      <p>Create an unforgettable cigar lounge experience for your special day. Expert hosts, custom pairings, and that perfect tropical ambiance your guests will remember forever.</p>
      <a href="{{ '/contact' | relative_url }}" class="btn btn-secondary">Request a Callback</a>
    </div>
    <div class="event-card">
      <h3>Corporate Events</h3>
      <p>Impress clients and reward teams with an upscale smoking experience. Full-service setup, premium selections, and professional hosts who know how to elevate any business gathering.</p>
      <a href="{{ '/contact' | relative_url }}" class="btn btn-secondary">Request a Callback</a>
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
