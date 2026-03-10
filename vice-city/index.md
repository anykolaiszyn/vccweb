---
layout: miami
title: Vice City Cigars | Tropical Oasis
permalink: /vice-city/
description: "Choose the Miami Vice experience for cigars, events, and premium hospitality."
---

<section class="hero">
  <img src="{{ '/assets/img/vcclogoclear.png' | relative_url }}" alt="Vice City Cigars logo" class="hero-logo" loading="eager" width="280" height="auto">
  <h1>Your Mobile Tropical Smoking Oasis</h1>
  <p class="hero-body">Welcome to the Miami Vice side of Vice City Cigars. Premium cigars, elevated event service, and a sleek tropical atmosphere built for unforgettable nights.</p>
  <div class="hero-cta">
    <a href="{{ '/vice-city/events' | relative_url }}" class="btn btn-primary">View Events</a>
    <a href="{{ '/vice-city/shop' | relative_url }}" class="btn btn-secondary">Enter Cigar Shop</a>
  </div>
</section>

<section class="offerings">
  <h2>What We Offer</h2>
  <div class="offerings-grid">
    {% for item in site.data.menu %}
    <div class="offering-card">
      <img src="{{ item.img | relative_url }}" alt="{{ item.title }}" loading="lazy" width="400" height="300">
      <h3>{{ item.title }}</h3>
      <p>{{ item.blurb }}</p>
    </div>
    {% endfor %}
  </div>
</section>

<section class="events">
  <h2>Event Highlights</h2>
  <div class="event-cards">
    <div class="event-card">
      <h3>Private Events</h3>
      <p>Curated cigars, polished setup, and smooth hospitality for celebrations and milestone nights.</p>
      <a href="{{ '/vice-city/contact' | relative_url }}" class="btn btn-secondary">Book a Date</a>
    </div>
    <div class="event-card">
      <h3>Corporate Gatherings</h3>
      <p>A premium lounge-style experience for client entertainment and team celebrations.</p>
      <a href="{{ '/vice-city/services' | relative_url }}" class="btn btn-secondary">See Services</a>
    </div>
    <div class="event-card">
      <h3>South Florida Pop-Ups</h3>
      <p>Find us at specialty events with featured selections and boutique recommendations.</p>
      <a href="{{ '/vice-city/events' | relative_url }}" class="btn btn-secondary">Event Calendar</a>
    </div>
  </div>
</section>

<section class="testimonials">
  <h2>What Guests Say</h2>
  <div class="testimonial-list">
    {% for t in site.data.testimonials %}
    <blockquote class="testimonial">
      <p>"{{ t.quote }}"</p>
      <footer>- {{ t.author }}</footer>
    </blockquote>
    {% endfor %}
  </div>
</section>
