---
layout: blb
title: "Faire Schedule — Find Black Leaf Bounty | Renaissance Faires Southeast"
permalink: /black-leaf-bounty/schedule/
description: "Find Black Leaf Bounty at Renaissance Faires across the Southeast. Upcoming dates, locations, and what to expect at the booth."
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {% for event in site.data.blb_schedule %}
    {
      "@type": "Event",
      "name": {{ event.name | jsonify }},
      "startDate": {{ event.dates_iso_start | jsonify }},
      "endDate": {{ event.dates_iso_end | jsonify }},
      "eventStatus": "https://schema.org/{% if event.status == 'confirmed' %}EventScheduled{% elsif event.status == 'tentative' %}EventPostponed{% else %}EventScheduled{% endif %}",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": {{ event.name | jsonify }},
        "address": {{ event.location | jsonify }}
      },
      "url": {{ event.website | jsonify }}
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>

<section class="blb-hero">
  <span class="blb-kicker">Faire Schedule</span>
  <h1>The Black Leaf Bounty Makes Port Across The Southeast</h1>
  <p>Captain's Circle members hear of new ports first. The public manifest below shows where the ship is presently bound, what is confirmed, and which harbors are still awaiting final papers.</p>
  <div class="blb-cta-row">
    <a class="blb-btn" href="{{ '/black-leaf-bounty/crew/' | relative_url }}">Join The Captain's Circle</a>
    <a class="blb-btn blb-btn-secondary" href="{{ '/black-leaf-bounty/events/' | relative_url }}">Book A Private Event</a>
  </div>
</section>

<section class="blb-section">
  <span class="blb-kicker">Current Manifest</span>
  <h2>Confirmed Ports</h2>
  <div class="blb-card-grid">
    {% assign confirmed_events = site.data.blb_schedule | where: 'status', 'confirmed' %}
    {% for event in confirmed_events %}
    <article class="blb-card">
      <p class="blb-meta">{{ event.location }}</p>
      <h3>{{ event.name }}</h3>
      <p><strong>{{ event.dates }}</strong></p>
      <p>{{ event.notes }}</p>
      <p>
        <span class="blb-badge blb-badge-select">CONFIRMED</span>
      </p>
      <div class="blb-button-row">
        <a class="blb-btn" href="{{ '/black-leaf-bounty/contact/' | relative_url }}?inquiry-type=Blend%20Inquiry&amp;message={{ 'I%20want%20to%20ask%20about%20stock%20for%20' | append: event.name | url_encode }}">Ask About Stock At This Port</a>
        <a class="blb-btn blb-btn-secondary" href="{{ event.website }}" target="_blank" rel="noopener">Faire Website</a>
      </div>
    </article>
    {% endfor %}
  </div>
</section>

{% assign tentative_events = site.data.blb_schedule | where: 'status', 'tentative' %}
{% if tentative_events.size > 0 %}
<section class="blb-section">
  <span class="blb-kicker">Watching The Horizon</span>
  <h2>Tentative Ports</h2>
  <div class="blb-card-grid">
    {% for event in tentative_events %}
    <article class="blb-card">
      <p class="blb-meta">{{ event.location }}</p>
      <h3>{{ event.name }}</h3>
      <p><strong>{{ event.dates }}</strong></p>
      <p>{{ event.notes }}</p>
      <p><span class="blb-badge blb-badge-family">TENTATIVE</span></p>
      <div class="blb-button-row">
        <a class="blb-btn" href="{{ '/black-leaf-bounty/crew/' | relative_url }}">Join The Captain's Circle</a>
        <a class="blb-btn blb-btn-secondary" href="{{ event.website }}" target="_blank" rel="noopener">Faire Website</a>
      </div>
    </article>
    {% endfor %}
  </div>
</section>
{% endif %}

<div class="blb-blend-callout">
  <p><strong>Not near a faire?</strong> The Bounty also appears at themed weddings, medieval corporate nights, pirate galas, and private revels. <a href="{{ '/black-leaf-bounty/events/' | relative_url }}">Inquire about booking the ship for your event</a>.</p>
</div>
