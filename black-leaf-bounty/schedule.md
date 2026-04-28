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
  <p>Crew members hear of new ports first. The public manifest below shows where the ship is presently bound, what is confirmed, and which harbors are still awaiting final papers.</p>
  <div class="blb-cta-row">
    <a class="blb-btn" href="{{ '/black-leaf-bounty/crew/' | relative_url }}">Join The Crew</a>
    <a class="blb-btn blb-btn-secondary" href="{{ '/black-leaf-bounty/events/' | relative_url }}">Book A Private Event</a>
  </div>
</section>

<section class="blb-section">
  <span class="blb-kicker">Current Manifest</span>
  <h2>Where To Find Us</h2>
  <div class="blb-card-grid">
    {% for event in site.data.blb_schedule %}
    <article class="blb-card">
      <p class="blb-meta">{{ event.location }}</p>
      <h3>{{ event.name }}</h3>
      <p><strong>{{ event.dates }}</strong></p>
      <p>{{ event.notes }}</p>
      <p>
        {% if event.status == 'confirmed' %}<span class="blb-badge blb-badge-select">CONFIRMED</span>{% elsif event.status == 'tentative' %}<span class="blb-badge blb-badge-family">TENTATIVE</span>{% else %}<span class="blb-badge">SCHEDULED</span>{% endif %}
      </p>
      <div class="blb-button-row">
        <a class="blb-btn blb-btn-secondary" href="{{ event.website }}" target="_blank" rel="noopener">Faire Website</a>
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<div class="blb-blend-callout">
  <p><strong>Not near a faire?</strong> The Bounty also appears at themed weddings, medieval corporate nights, pirate galas, and private revels. <a href="{{ '/black-leaf-bounty/events/' | relative_url }}">Inquire about booking the ship for your event</a>.</p>
</div>
