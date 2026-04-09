---
layout: miami
title: Vice City Gallery
permalink: /vice-city/gallery/
description: "Card-based gallery collections with captions and stories from Vice City events."
---

<section class="hero">
  <h1>Gallery Collections</h1>
  <p class="hero-body">Each gallery card opens to a full story and links to photos. Browse by event type and atmosphere.</p>
</section>

<section class="offerings">
  <h2>Featured Galleries</h2>
  <div id="gallery-brand-filters" class="hero-cta" role="group" aria-label="Gallery brand filters" style="margin-bottom: 1rem;">
    <button type="button" class="btn btn-primary" data-brand="all">All Brands</button>
    <button type="button" class="btn btn-secondary" data-brand="vice-city">Vice City</button>
    <button type="button" class="btn btn-secondary" data-brand="black-leaf-bounty">Black Leaf Bounty</button>
  </div>
  <div class="offerings-grid">
    {% assign galleries = site.shared_galleries | sort: 'date' | reverse %}
    {% for gallery in galleries %}
    <article class="offering-card" data-brand="{{ gallery.brand | default: 'shared' }}">
      {% if gallery.cover_image %}
      <img src="{{ gallery.cover_image | relative_url }}" alt="{{ gallery.title }}" loading="lazy" width="400" height="300">
      {% endif %}
      <h3>{{ gallery.title }}</h3>
      <p>{{ gallery.caption }}</p>
      <p>{{ gallery.story }}</p>
      <p><strong>Source:</strong> {% if gallery.brand == 'vice-city' %}Vice City{% elsif gallery.brand == 'black-leaf-bounty' %}Black Leaf Bounty{% else %}Shared{% endif %}</p>
      <div class="hero-cta">
        <a class="btn btn-secondary" href="{{ gallery.url | relative_url }}">Read Story</a>
        {% if gallery.album_url %}
        <a class="btn btn-secondary" href="{{ gallery.album_url }}" target="_blank" rel="noopener">View Photos</a>
        {% endif %}
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<script>
(function () {
  'use strict';

  var buttons = document.querySelectorAll('#gallery-brand-filters [data-brand]');
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
