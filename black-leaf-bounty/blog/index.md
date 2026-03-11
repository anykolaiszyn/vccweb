---
layout: blb
title: Captain's Log
permalink: /black-leaf-bounty/blog/
description: "Dispatches from fairs, pirate culture, and tobacco craft on The Black Leaf Bounty."
---

# Captain's Log

Field notes, fair stories, and tobacconist insights from the road. Expect dispatches that keep one foot in merchant lore and the other in practical tobacco knowledge.

<ul class="blog-list">
  {% assign captains_log_posts = site.posts | where_exp: "post", "post.categories contains 'renaissance' or post.categories contains 'culture' or post.categories contains 'events'" %}
  {% for post in captains_log_posts %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span class="blog-date">{{ post.date | date: "%b %d, %Y" }}</span>
    <p>{{ post.excerpt }}</p>
  </li>
  {% endfor %}
</ul>
