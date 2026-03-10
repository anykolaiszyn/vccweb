---
layout: miami
title: The Lounge
permalink: /vice-city/blog/
description: "Miami-side stories, cigar education, and event highlights from Vice City Cigars."
---

# The Lounge

Stories, guides, and insights from the Vice City side.

<ul class="blog-list">
  {% assign lounge_posts = site.posts | where_exp: "post", "post.categories contains 'cigars' or post.categories contains 'beginner-guide' or post.categories contains 'education' or post.categories contains 'entrepreneurship' or post.categories contains 'business'" %}
  {% for post in lounge_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <span class="blog-date">{{ post.date | date: "%b %d, %Y" }}</span>
      <p>{{ post.excerpt }}</p>
    </li>
  {% endfor %}
</ul>
