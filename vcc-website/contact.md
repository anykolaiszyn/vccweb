---
layout: page
title: Contact
---

# Contact & Booking

Call or request a callback—Phase 1 keeps it simple.

<form id="contact-form" action="" method="POST" data-form-endpoint="" autocomplete="on">
  <!-- To use Formspree, set data-form-endpoint to 'https://formspree.io/f/your-form-id' and set action accordingly. Leave empty to keep the site publishable without secrets. -->
  <label for="name">Name</label>
  <input type="text" id="name" name="name" required aria-required="true">

  <label for="phone">Phone</label>
  <input type="tel" id="phone" name="phone" required aria-required="true">

  <label for="email">Email</label>
  <input type="email" id="email" name="email" required aria-required="true">

  <label for="date">Event Date</label>
  <input type="date" id="date" name="date">

  <label for="location">Event Location</label>
  <input type="text" id="location" name="location">

  <label for="guests">Guest Count</label>
  <input type="number" id="guests" name="guests" min="1">

  <label for="notes">Notes</label>
  <textarea id="notes" name="notes"></textarea>

  <button type="submit" class="btn btn-primary">Send Request</button>
  <a class="btn btn-secondary" href="mailto:info@vicecitycigars.com?subject=Event%20Booking%20Request&body=Name:%20%5BYour%20Name%5D%0APhone:%20%5BYour%20Phone%5D%0AEvent%20Date:%20%5BDate%5D%0ALocation:%20%5BLocation%5D%0AGuest%20Count:%20%5BGuests%5D%0ANotes:%20%5BNotes%5D">Use Email Instead</a>
</form>

<p class="form-note">Or email us directly:
  <a href="mailto:info@vicecitycigars.com?subject=Event%20Booking%20Request&body=Name:%20%5BYour%20Name%5D%0APhone:%20%5BYour%20Phone%5D%0AEvent%20Date:%20%5BDate%5D%0ALocation:%20%5BLocation%5D%0AGuest%20Count:%20%5BGuests%5D%0ANotes:%20%5BNotes%5D">info@vicecitycigars.com</a>
  or call <a href="tel:+15615552121">(561) 555-2121</a>
</p>

<p class="legal-reminder">21+ Only. We do not offer free samples.</p>
