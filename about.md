---
layout: page
title: About Vice City Cigars
permalink: /about/
description: "Choose your preferred Vice City Cigars experience to view the full about page."
robots: noindex, follow
sitemap: false
---

## Choose Your Experience

If you have already chosen a brand, this page will redirect you automatically.

Select the version of Vice City Cigars you want to explore:

- [Vice City About]({{ '/vice-city/about/' | relative_url }})
- [Black Leaf Bounty About]({{ '/black-leaf-bounty/about/' | relative_url }})

<script>
(function () {
	'use strict';

	var routes = {
		miami: "{{ '/vice-city/about/' | relative_url }}",
		pirate: "{{ '/black-leaf-bounty/about/' | relative_url }}"
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
