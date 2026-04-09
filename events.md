---
layout: page
title: Events
permalink: /events/
description: "Choose your preferred Vice City Cigars experience to view event details."
robots: noindex, follow
sitemap: false
---

## Choose Your Experience

If you have already chosen a brand, this page will redirect you automatically.

Select the event page you want:

- [Vice City Events]({{ '/vice-city/events/' | relative_url }})
- [Black Leaf Bounty Events]({{ '/black-leaf-bounty/events/' | relative_url }})

<script>
(function () {
	'use strict';

	var routes = {
		miami: "{{ '/vice-city/events/' | relative_url }}",
		pirate: "{{ '/black-leaf-bounty/events/' | relative_url }}"
	};

	var brand = null;
	try {
		brand = localStorage.getItem('vcc-brand');
	} catch (err) {
		// Ignore storage failures and keep manual links visible.
	}

	if (brand && routes[brand]) {
		window.location.replace(routes[brand]);
	}
})();
</script>
