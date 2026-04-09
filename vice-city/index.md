---
layout: miami
title: Vice City Cigars | Mobile Tropical Smoking Oasis
permalink: /vice-city/
description: "Vice City Cigars — premium cigar pop-ups and private events across South Florida. Boutique selections, no-pressure hospitality, and a Miami Vice oasis wherever we set up."
---

<section class="hero">
  <img src="{{ '/assets/img/vcclogoclear.png' | relative_url }}" alt="Vice City Cigars logo" class="hero-logo" loading="eager" width="280" height="auto">
  <h1>Your Mobile Tropical Smoking Oasis</h1>
  <p class="hero-body">Premium cigars. South Florida pop-ups. Private venue nights and custom event bookings. The oasis comes to you.</p>
  <div class="hero-cta">
    <a href="{{ '/vice-city/contact/' | relative_url }}" class="btn btn-primary">Book an Experience</a>
    <a href="{{ '/vice-city/events/' | relative_url }}" class="btn btn-secondary">See What's Going On</a>
  </div>
</section>

<section class="offerings">
  <h2>What We Bring</h2>
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
  <h2>How To Find Us</h2>
  <div class="event-cards">
    <div class="event-card">
      <h3>Holiday Pop-Ups</h3>
      <p>Seasonal appearances across South Florida for the moments worth marking. Dates drop on Instagram first.</p>
      <a href="https://instagram.com/vicecitycigars" class="btn btn-secondary" target="_blank" rel="noopener">Follow For Dates</a>
    </div>
    <div class="event-card">
      <h3>Private Venue Nights</h3>
      <p>Monthly and quarterly hosted events at private venues. Intimate size, elevated experience.</p>
      <a href="{{ '/vice-city/events/' | relative_url }}" class="btn btn-secondary">View Event Cards</a>
    </div>
    <div class="event-card">
      <h3>Custom Bookings</h3>
      <p>Private parties, corporate events, weddings, and milestone celebrations. Contact us to bring the oasis to your event.</p>
      <a href="{{ '/vice-city/contact/' | relative_url }}" class="btn btn-secondary">Request an Event</a>
    </div>
  </div>
</section>
