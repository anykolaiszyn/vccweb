---
layout: blb
title: "Contact Black Leaf Bounty"
permalink: /black-leaf-bounty/contact/
description: "Contact Black Leaf Bounty for event bookings, blend inquiries, faire schedules, and Crew membership. 561-331-0497."
---

<script type="application/ld+json">
{
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	"name": "Black Leaf Bounty",
	"description": "Theatrical tobacco experience for Renaissance Faires, themed events, and private gatherings.",
	"url": "{{ site.url }}{{ site.baseurl }}/black-leaf-bounty/contact/",
	"telephone": "+1-561-331-0497",
	"email": "vccigar@gmail.com",
	"address": {
		"@type": "PostalAddress",
		"addressLocality": "Boca Raton",
		"addressRegion": "FL",
		"addressCountry": "US"
	}
}
</script>

# Send Word To The Captain

If you need booking details, blend guidance, crew information, or the next port of call, hail the ship here. We answer all proper messages within 24 to 48 hours.

<div class="blb-card">
	<h3>Contact Deck</h3>
	<ul class="blb-list">
		<li><strong>Phone:</strong> <a href="tel:+15613310497">561-331-0497</a></li>
		<li><strong>Email:</strong> <a href="mailto:vccigar@gmail.com">vccigar@gmail.com</a></li>
		<li><strong>Parent brand:</strong> <a href="https://vicecitycigars.com" target="_blank" rel="noopener">vicecitycigars.com</a></li>
	</ul>
</div>

<form data-async-form
			data-loading-text="Sending the message..."
			data-success-message="Message received. The Captain will answer shortly."
			data-error-message="Something went wrong. Please call 561-331-0497 or email vccigar@gmail.com."
			action="https://formspree.io/f/mwpnagkv" method="POST" autocomplete="on">
	<input type="text" name="_gotcha" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true" aria-label="Ignore this field">
	<input type="hidden" name="_subject" value="Black Leaf Bounty Contact Inquiry">
	<input type="hidden" name="form-name" value="blb-contact">

	<label for="blb-contact-name">Name *</label>
	<input type="text" id="blb-contact-name" name="name" required aria-required="true" autocomplete="name">

	<label for="blb-contact-email">Email *</label>
	<input type="email" id="blb-contact-email" name="email" required aria-required="true" autocomplete="email">

	<label for="blb-contact-phone">Phone</label>
	<input type="tel" id="blb-contact-phone" name="phone" pattern="[0-9\-\(\)\s\+]+" autocomplete="tel">

	<label for="blb-contact-type">Inquiry Type</label>
	<select id="blb-contact-type" name="inquiry-type">
		<option value="">Select...</option>
		<option>Event Booking</option>
		<option>Blend Inquiry</option>
		<option>Faire Schedule</option>
		<option>Crew Membership</option>
		<option>Other</option>
	</select>

	<label for="blb-contact-message">Message</label>
	<textarea id="blb-contact-message" name="message" rows="5" placeholder="Tell us what you seek, and the ship will answer in kind."></textarea>

	<button type="submit" class="btn">Send The Message</button>
</form>

<p class="legal-reminder">21+ Only. Tobacco products are for adult smokers only.</p>
