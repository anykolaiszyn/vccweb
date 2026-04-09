---
layout: page
title: Services
permalink: /services/
description: "Choose your preferred Vice City Cigars experience to view service details."
robots: noindex, follow
sitemap: false
---

## Choose Your Experience

If you have already chosen a brand, this page will redirect you automatically.

Select the service page you want:

- [Vice City Services]({{ '/vice-city/services/' | relative_url }})
- [Black Leaf Bounty Services]({{ '/black-leaf-bounty/services/' | relative_url }})

<script>
(function () {
	'use strict';

	var routes = {
		miami: "{{ '/vice-city/services/' | relative_url }}",
		pirate: "{{ '/black-leaf-bounty/services/' | relative_url }}"
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
