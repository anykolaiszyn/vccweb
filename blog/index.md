---
layout: page
title: Blog
---

# Vice City Cigars Blog

Welcome to our blog! Here you’ll find event recaps, cigar tips, pairings, and staff picks.

<ul class="blog-list">
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <span class="blog-date">{{ post.date | date: "%b %d, %Y" }}</span>
      <p>{{ post.excerpt }}</p>
    </li>
  {% endfor %}
</ul>
