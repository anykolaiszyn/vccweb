---
layout: miami
title: "The Cigar Selection — Vice City Cigars"
permalink: /vice-city/shop/
description: "Premium boutique cigars from Vice City Cigars — available at South Florida pop-ups and private events."
---

<section class="hero">
  <h1>The Cigar Selection</h1>
  <p class="hero-body">Boutique Maduros, smooth Connecticuts, and limited releases hand-picked for the pop-up humidor.</p>
  <p class="hero-body">Online ordering is not active yet while compliance setup is finalized. Join the opening list and we will notify you when the shop goes live.</p>
  <div class="hero-cta">
    <a href="{{ '/shop/' | relative_url }}" class="btn btn-secondary">Online Shop Status</a>
    <a href="{{ '/vice-city/events/' | relative_url }}" class="btn btn-primary">Find Us At An Event</a>
  </div>
</section>

<section class="events">
  <h2>Get Notified When Online Shop Opens</h2>
  <form id="shop-open-list" data-async-form data-loading-text="Joining list..." data-success-message="You are on the list. We will notify you when online ordering opens." action="https://formspree.io/f/mwpnagkv" method="POST" autocomplete="on">
    <input type="text" name="_gotcha" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true" aria-label="Ignore this field">
    <input type="hidden" name="request-type" value="Shop Opening Waitlist">

    <label for="waitlist-name">Name</label>
    <input id="waitlist-name" name="name" type="text" required>

    <label for="waitlist-email">Email</label>
    <input id="waitlist-email" name="email" type="email" required>

    <label for="waitlist-phone">Phone (optional)</label>
    <input id="waitlist-phone" name="phone" type="tel" pattern="[0-9\-\(\)\s\+]+">

    <label for="waitlist-notes">What Are You Looking For? (optional)</label>
    <textarea id="waitlist-notes" name="notes" rows="3" placeholder="Cigars, accessories, event updates, etc."></textarea>

    <button class="btn btn-primary" type="submit">Join Opening List</button>
  </form>
  <p class="legal-reminder">21+ only. All availability and shipping details apply where allowed by law.</p>
</section>
