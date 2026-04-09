---
layout: page
title: Learn
permalink: /learn/
description: "Choose your preferred Vice City Cigars experience to view educational content."
robots: noindex, follow
sitemap: false
---

## Choose Your Experience

If you have already chosen a brand, this page will redirect you automatically.

Select the learning page you want:

- [Vice City Learn]({{ '/vice-city/learn/' | relative_url }})
- [Black Leaf Bounty Learn]({{ '/black-leaf-bounty/learn/' | relative_url }})

<script>
(function () {
	'use strict';

	var routes = {
		miami: "{{ '/vice-city/learn/' | relative_url }}",
		pirate: "{{ '/black-leaf-bounty/learn/' | relative_url }}"
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
