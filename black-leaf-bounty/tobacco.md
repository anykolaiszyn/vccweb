---
layout: blb
title: "The Hold — Pipe Tobacco | Black Leaf Bounty"
permalink: /black-leaf-bounty/tobacco/
description: "26 premium pipe tobacco blends from Cornell & Diehl and Rivertown Tobacco Works. Virginia, Burley, Latakia, aromatics, and limited blends. 21+."
---

<section class="blb-hero">
  <span class="blb-kicker">The Hold</span>
  <h1>Below Decks Lies The Finest Leaf On The Manifest</h1>
  <p>Twenty-six blends from Cornell &amp; Diehl and Rivertown Tobacco Works. Aromatics for the curious. Virginias for the disciplined palate. English and Balkan mixtures for those who prefer a little smoke in the air and a little complexity in the bowl.</p>
  <div class="blb-cta-row">
    <a class="blb-btn" href="{{ '/black-leaf-bounty/schedule/' | relative_url }}">Find Us At A Faire</a>
    <a class="blb-btn blb-btn-secondary" href="{{ '/black-leaf-bounty/crew/' | relative_url }}">Join The Captain's Circle</a>
  </div>
</section>

<section class="blb-section">
  <span class="blb-kicker">How The Selection Works</span>
  <h2>What You Will Find At The Booth</h2>
  <div class="blb-card-grid">
    <article class="blb-card">
      <h3>Tins At The Faire</h3>
      <p>Tins are available for purchase at our faire appearances and by direct inquiry. Stock varies by port, and the Captain does not promise what the hold cannot deliver.</p>
    </article>
    <article class="blb-card">
      <h3>2oz Pouches</h3>
      <p>Selected blends are available in limited daily pouch quantities and only with a tin purchase. The crew will tell you plainly what remains aboard that day.</p>
    </article>
    <article class="blb-card">
      <h3>Captain's Circle Priority</h3>
      <p>Captain's Circle members hear first about scarce blends and upcoming ports of call. When limited stock makes landfall, the manifest reaches them before the public.</p>
    </article>
  </div>
</section>

<section class="blb-section">
  <span class="blb-kicker">Guidance For New Hands</span>
  <h2>How To Choose Your Leaf</h2>
  <div class="blb-blend-guide-grid">
    <div class="blb-list-card">
      <h3>Virginia &amp; Virginia / Perique</h3>
      <p>Natural sweetness, hay, citrus, and pepper. These are for smokers who want the leaf itself to speak.</p>
    </div>
    <div class="blb-list-card">
      <h3>English &amp; Balkan</h3>
      <p>Latakia smoke, Oriental spice, and old-world depth. Better suited to experienced hands or the adventurous curious.</p>
    </div>
    <div class="blb-list-card">
      <h3>Burley &amp; Burley Blends</h3>
      <p>Nutty, earthy, steady-smoking blends with body and discipline in the bowl.</p>
    </div>
    <div class="blb-list-card">
      <h3>Aromatics &amp; Semi-Aromatics</h3>
      <p>Welcoming room note and approachable flavor. A wise place to begin if you have never held a pipe before.</p>
    </div>
  </div>
</section>

<section class="blb-section">
  <span class="blb-kicker">The Manifest</span>
  <h2>Browse The Blend Families</h2>

  {% assign aromatics = site.blends | where: 'family', 'Aromatic' | sort_natural: 'name' %}
  {% assign virginias = site.blends | where: 'family', 'Virginia' | sort_natural: 'name' %}
  {% assign virginia_burley = site.blends | where: 'family', 'Virginia / Burley' | sort_natural: 'name' %}
  {% assign virginia_perique = site.blends | where: 'family', 'Virginia / Perique' | sort_natural: 'name' %}
  {% assign burley = site.blends | where: 'family', 'Burley' | sort_natural: 'name' %}
  {% assign english = site.blends | where: 'family', 'English / Balkan' | sort_natural: 'name' %}
  {% assign single_leaf = site.blends | where: 'family', 'Single Leaf' | sort_natural: 'name' %}

  {% assign families = 'Aromatic|Virginia|Virginia / Burley|Virginia / Perique|Burley|English / Balkan|Single Leaf' | split: '|' %}
  {% for family_name in families %}
    {% case family_name %}
      {% when 'Aromatic' %}{% assign blends = aromatics %}{% assign intro = 'The easiest boarding point for new smokers and social settings.' %}
      {% when 'Virginia' %}{% assign blends = virginias %}{% assign intro = 'Bright leaf with natural sweetness and clean finish.' %}
      {% when 'Virginia / Burley' %}{% assign blends = virginia_burley %}{% assign intro = 'A steadier, fuller bridge between brightness and body.' %}
      {% when 'Virginia / Perique' %}{% assign blends = virginia_perique %}{% assign intro = 'Sweetness with spice for smokers who want more character.' %}
      {% when 'Burley' %}{% assign blends = burley %}{% assign intro = 'Nutty, earthy, cool-smoking leaf with honest weight.' %}
      {% when 'English / Balkan' %}{% assign blends = english %}{% assign intro = 'Latakia-forward mixtures with maritime seriousness.' %}
      {% when 'Single Leaf' %}{% assign blends = single_leaf %}{% assign intro = 'Straight leaf for experienced smokers and blenders.' %}
    {% endcase %}

    <div class="blb-pipe-family">
      <h3 class="blb-pipe-family-name">{{ family_name }}</h3>
      <p class="blb-pipe-family-desc">{{ intro }}</p>
      <div class="blb-tobacco-grid">
        {% for blend in blends %}
        <article class="blb-tobacco-card">
          <div class="blb-tobacco-card-top">
            <span class="blb-pipe-brand">{{ blend.producer }}</span>
            {% if blend.limited %}<span class="blb-badge blb-badge-limited">LIMITED</span>{% endif %}
            {% if blend.captains_select %}<span class="blb-badge blb-badge-select">CAPTAIN'S SELECT</span>{% endif %}
          </div>
          <h4>{{ blend.name }}</h4>
          <p class="blb-pipe-notes">{{ blend.tasting_notes }}</p>
          <a class="blb-btn blb-btn-secondary" href="{{ blend.url | relative_url }}">Learn More</a>
        </article>
        {% endfor %}
      </div>
    </div>
  {% endfor %}
</section>

<div class="blb-blend-callout" style="margin-top:2rem;">
  <p><strong>New to pipe tobacco?</strong> The Captain usually points first-time smokers toward an aromatic or a mild Virginia. If you are not sure what suits your taste, ask the crew at the booth or send word before your visit.</p>
</div>
