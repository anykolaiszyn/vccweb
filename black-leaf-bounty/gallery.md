---
layout: blb
title: Black Leaf Bounty Gallery
permalink: /black-leaf-bounty/gallery/
description: "Renaissance and pirate event visuals from The Black Leaf Bounty."
---

# Gallery

Scenes from the deck: the goods, the booth atmosphere, and the merchant details that give The Black Leaf Bounty its own character.

<div class="filter-buttons" id="gallery-brand-filters" style="margin-bottom: 1rem;">
  <button class="filter-btn active" data-brand="all">All Brands</button>
  <button class="filter-btn" data-brand="black-leaf-bounty">Black Leaf Bounty</button>
  <button class="filter-btn" data-brand="vice-city">Vice City</button>
</div>

{% assign gallery_items = site.shared_galleries | sort: "date" | reverse %}
<div class="offerings-grid">
  {% for item in gallery_items %}
  <div class="offering-card blb-card blb-gallery-card" data-brand="{{ item.brand | default: 'shared' }}">
    {% if item.cover_image %}
    <img src="{{ item.cover_image | relative_url }}" alt="{{ item.title }}" loading="lazy" width="400" height="300">
    {% endif %}
    <h3>{{ item.title }}</h3>
    {% if item.caption %}
    <p class="blb-gallery-caption"><em>{{ item.caption }}</em></p>
    {% endif %}
    <p>{{ item.story | truncatewords: 30 }}</p>
    <p><strong>Source:</strong> {% if item.brand == 'black-leaf-bounty' %}Black Leaf Bounty{% elsif item.brand == 'vice-city' %}Vice City{% else %}Shared{% endif %}</p>
    <div class="blb-button-row">
      <a class="blb-btn" href="{{ item.url | relative_url }}">Read Full Story</a>
      {% if item.album_url %}
      <a class="blb-btn blb-btn-secondary" href="{{ item.album_url }}" target="_blank">View Album</a>
      {% endif %}
    </div>
  </div>
  {% endfor %}
</div>

<script>
(function () {
  'use strict';

  var buttons = document.querySelectorAll('#gallery-brand-filters [data-brand]');
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
