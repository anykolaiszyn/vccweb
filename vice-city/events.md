---
layout: miami
title: "Events — Vice City Cigars"
permalink: /vice-city/events/
description: "Card-based event gallery for upcoming and past Vice City Cigars appearances."
---

<section class="hero">
  <h1>Event Cards</h1>
  <p class="hero-body">Every event lives as its own card with recap details, location, and photo links. Browse upcoming and past appearances below.</p>
  <div class="hero-cta">
    <a href="{{ '/vice-city/contact/' | relative_url }}" class="btn btn-primary">Request an Event</a>
    <a href="https://instagram.com/vicecitycigars" class="btn btn-secondary" target="_blank" rel="noopener">Follow For Live Updates</a>
  </div>
</section>

<section class="events">
  <h2>Upcoming and Past Events</h2>
  <p>Dates marked pending are placeholders until venue confirmations are finalized.</p>
  <div id="events-brand-filters" class="hero-cta" role="group" aria-label="Event brand filters" style="margin-bottom: 1rem;">
    <button type="button" class="btn btn-primary" data-brand="all">All Brands</button>
    <button type="button" class="btn btn-secondary" data-brand="vice-city">Vice City</button>
    <button type="button" class="btn btn-secondary" data-brand="black-leaf-bounty">Black Leaf Bounty</button>
  </div>
  <div class="offerings-grid">
    {% assign event_cards = site.shared_events | sort: 'event_date' | reverse %}
    {% for event in event_cards %}
    <article class="offering-card" data-brand="{{ event.brand | default: 'shared' }}">
      {% if event.cover_image %}
      <img src="{{ event.cover_image | relative_url }}" alt="{{ event.title }}" loading="lazy" width="400" height="300">
      {% endif %}
      <h3>{{ event.title }}</h3>
      <p><strong>{{ event.event_date | date: "%b %d, %Y" }}</strong>{% if event.location %} · {{ event.location }}{% endif %}</p>
      <p>{{ event.summary }}</p>
      <p><strong>Source:</strong> {% if event.brand == 'vice-city' %}Vice City{% elsif event.brand == 'black-leaf-bounty' %}Black Leaf Bounty{% else %}Shared{% endif %}</p>
      <div class="hero-cta">
        <a href="{{ event.url | relative_url }}" class="btn btn-secondary">View Event Card</a>
        {% if event.photo_album_url %}
        <a href="{{ event.photo_album_url }}" class="btn btn-secondary" target="_blank" rel="noopener">{{ event.cta_label | default: 'Photos' }}</a>
        {% endif %}
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<div class="hero-cta">
  <a href="{{ '/vice-city/contact/' | relative_url }}" class="btn btn-primary">Request an Event</a>
</div>

<script>
(function () {
  'use strict';

  var buttons = document.querySelectorAll('#events-brand-filters [data-brand]');
  var cards = document.querySelectorAll('.offerings-grid [data-brand]');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var brand = button.getAttribute('data-brand');
      buttons.forEach(function (b) {
        b.classList.remove('btn-primary');
        b.classList.add('btn-secondary');
      });
      button.classList.remove('btn-secondary');
      button.classList.add('btn-primary');

      cards.forEach(function (card) {
        var cardBrand = card.getAttribute('data-brand');
        var show = brand === 'all' || cardBrand === brand || cardBrand === 'shared';
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();
</script>
