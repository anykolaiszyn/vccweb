---
layout: blb
title: Pipe And Tobacco Learning Deck
permalink: /black-leaf-bounty/learn/
description: "Pipe and cigar education from a shared learning library with tag filtering."
---

# The Learning Deck

A shared learning library for pipe-curious guests, cigar travelers, and anyone who would rather learn the craft than guess.

<div class="filter-buttons" id="brand-filters" style="margin-bottom: 0.75rem;">
  <button class="filter-btn active" data-brand="all">All Brands</button>
  <button class="filter-btn" data-brand="black-leaf-bounty">Black Leaf Bounty</button>
  <button class="filter-btn" data-brand="vice-city">Vice City</button>
</div>

<div class="filter-buttons" id="topic-filters" style="margin-bottom: 2rem;">
  <button class="filter-btn active" data-filter="all">All Topics</button>
  {% assign all_tags = '' | split: '' %}
  {% assign learning_items = site.shared_learning | sort: "published_on" | reverse %}
  {% for item in learning_items %}
    {% for tag in item.tags %}
      {% assign all_tags = all_tags | push: tag %}
    {% endfor %}
  {% endfor %}
  {% assign unique_tags = all_tags | uniq | sort %}
  {% for tag in unique_tags %}
  <button class="filter-btn" data-filter="{{ tag | downcase | replace: ' ', '-' }}">{{ tag }}</button>
  {% endfor %}
</div>

<div class="offerings-grid" id="learning-cards">
  {% for item in learning_items %}
  {% assign tags_slug = item.tags | join: ',' | downcase | replace: ' ', '-' %}
  {% assign item_brand = item.brand | default: 'shared' %}
  <div class="offering-card blb-card learning-card" data-tags="{{ tags_slug }}" data-brand="{{ item_brand }}">
    {% if item.cover_image %}
    <img src="{{ item.cover_image | relative_url }}" alt="{{ item.title }}" loading="lazy" width="400" height="300">
    {% endif %}
    <h3>{{ item.title }}</h3>
    <p class="card-tags">
      {% for tag in item.tags %}
      <span class="tag">{{ tag }}</span>
      {% endfor %}
    </p>
    <p>{{ item.excerpt }}</p>
    <p><strong>Source:</strong> {% if item_brand == 'black-leaf-bounty' %}Black Leaf Bounty{% elsif item_brand == 'vice-city' %}Vice City{% else %}Shared{% endif %}</p>
    <a class="blb-btn" href="{{ item.url | relative_url }}">Read Full Lesson</a>
  </div>
  {% endfor %}
</div>

<script>
(function() {
  'use strict';

  var brandBtns = document.querySelectorAll('#brand-filters [data-brand]');
  var topicBtns = document.querySelectorAll('#topic-filters [data-filter]');
  var cards = document.querySelectorAll('.learning-card');
  var activeBrand = 'all';
  var activeTopic = 'all';

  function applyFilters() {
    cards.forEach(function(card) {
      var tags = card.getAttribute('data-tags');
      var brand = card.getAttribute('data-brand');
      var topicMatch = activeTopic === 'all' || tags.indexOf(activeTopic) !== -1;
      var brandMatch = activeBrand === 'all' || brand === activeBrand || brand === 'shared';
      card.style.display = topicMatch && brandMatch ? '' : 'none';
    });
  }

  brandBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      activeBrand = btn.getAttribute('data-brand');
      brandBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilters();
    });
  });

  topicBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      activeTopic = btn.getAttribute('data-filter');
      topicBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilters();
    });
  });
})();
</script>

<style>
.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  background: var(--shadow-neon, rgba(255, 20, 147, 0.15));
  border: 1px solid var(--vice-neon-pink, #FF1493);
  color: var(--vice-neon-pink, #FF1493);
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--vice-neon-pink, #FF1493);
  color: white;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin: 0.5rem 0;
  font-size: 0.85rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: rgba(255, 20, 147, 0.1);
  border-radius: 3px;
  color: var(--vice-neon-pink, #FF1493);
  font-weight: 500;
}
</style>

<p>
  <a class="blb-btn" href="{{ '/black-leaf-bounty/contact/' | relative_url }}">Questions? Ask The Captain</a>
  <a class="blb-btn blb-btn-secondary" href="{{ '/black-leaf-bounty/pipes/' | relative_url }}">Browse The Manifest</a>
</p>
