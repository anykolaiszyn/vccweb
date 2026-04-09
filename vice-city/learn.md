---
layout: miami
title: Vice City Learn
permalink: /vice-city/learn/
description: "Learning Library for cigars and pipe-adjacent fundamentals with tag filtering and a fit quiz."
---

<section class="hero">
  <h1>Learning Library</h1>
  <p class="hero-body">Quick-read learning cards with full guides behind each tile. Filter by topic and explore what fits your pace.</p>
  <div class="hero-cta">
    <a class="btn btn-primary" href="{{ '/vice-city/quiz/' | relative_url }}">Take the Cigar Fit Quiz</a>
    <a class="btn btn-secondary" href="{{ '/vice-city/contact/' | relative_url }}">Ask for Recommendations</a>
  </div>
</section>

<section class="offerings">
  <h2>Filter By Topic</h2>
  <div id="learning-brand-filters" class="hero-cta" role="group" aria-label="Learning brand filters" style="margin-bottom: 0.75rem;">
    <button type="button" class="btn btn-primary" data-brand="all">All Brands</button>
    <button type="button" class="btn btn-secondary" data-brand="vice-city">Vice City</button>
    <button type="button" class="btn btn-secondary" data-brand="black-leaf-bounty">Black Leaf Bounty</button>
  </div>

  <div id="learning-topic-filters" class="hero-cta" role="group" aria-label="Learning topic filters">
    <button type="button" class="btn btn-primary" data-filter="all">All Topics</button>
    {% assign all_tags = '' | split: '' %}
    {% assign learning_items = site.shared_learning | sort: 'published_on' | reverse %}
    {% for item in learning_items %}
      {% for tag in item.tags %}
        {% assign all_tags = all_tags | push: tag %}
      {% endfor %}
    {% endfor %}
    {% assign unique_tags = all_tags | uniq | sort %}
    {% for tag in unique_tags %}
      <button type="button" class="btn btn-secondary" data-filter="{{ tag | downcase | replace: ' ', '-' }}">{{ tag }}</button>
    {% endfor %}
  </div>

  <div class="offerings-grid" id="learning-grid">
    {% for item in learning_items %}
    {% assign tags_slug = item.tags | join: ',' | downcase | replace: ' ', '-' %}
    {% assign item_brand = item.brand | default: 'shared' %}
    <article class="offering-card" data-tags="{{ tags_slug }}" data-brand="{{ item_brand }}">
      {% if item.cover_image %}
      <img src="{{ item.cover_image | relative_url }}" alt="{{ item.title }}" loading="lazy" width="400" height="300">
      {% endif %}
      <h3>{{ item.title }}</h3>
      <p>{{ item.excerpt }}</p>
      <p><strong>Tags:</strong> {{ item.tags | join: ', ' }}</p>
      <p><strong>Source:</strong> {% if item_brand == 'vice-city' %}Vice City{% elsif item_brand == 'black-leaf-bounty' %}Black Leaf Bounty{% else %}Shared{% endif %}</p>
      <a class="btn btn-secondary" href="{{ item.url | relative_url }}">Read Full Guide</a>
    </article>
    {% endfor %}
  </div>
</section>

<script>
(function () {
  'use strict';

  var brandButtons = document.querySelectorAll('#learning-brand-filters [data-brand]');
  var topicButtons = document.querySelectorAll('#learning-topic-filters [data-filter]');
  var cards = document.querySelectorAll('#learning-grid [data-tags]');
  var activeBrand = 'all';
  var activeTopic = 'all';

  function applyFilters() {
    cards.forEach(function (card) {
      var tags = card.getAttribute('data-tags');
      var brand = card.getAttribute('data-brand');
      var topicMatch = activeTopic === 'all' || tags.indexOf(activeTopic) !== -1;
      var brandMatch = activeBrand === 'all' || brand === activeBrand || brand === 'shared';
      card.style.display = topicMatch && brandMatch ? '' : 'none';
    });
  }

  brandButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      activeBrand = button.getAttribute('data-brand');
      brandButtons.forEach(function (b) {
        b.classList.remove('btn-primary');
        b.classList.add('btn-secondary');
      });
      button.classList.remove('btn-secondary');
      button.classList.add('btn-primary');
      applyFilters();
    });
  });

  topicButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      activeTopic = button.getAttribute('data-filter');

      topicButtons.forEach(function (b) {
        b.classList.remove('btn-primary');
        b.classList.add('btn-secondary');
      });
      button.classList.remove('btn-secondary');
      button.classList.add('btn-primary');
      applyFilters();
    });
  });
})();
</script>
