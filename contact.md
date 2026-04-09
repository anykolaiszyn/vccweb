---
layout: page
title: Contact
permalink: /contact/
description: "Choose your preferred Vice City Cigars experience to contact us directly."
robots: noindex, follow
sitemap: false
---

## Choose Your Experience

If you have already chosen a brand, this page will redirect you automatically.

Select an option below to continue.

- [Vice City Contact]({{ '/vice-city/contact/' | relative_url }})
- [Black Leaf Bounty Contact]({{ '/black-leaf-bounty/contact/' | relative_url }})
- [Go To Experience Chooser]({{ '/' | relative_url }})

<script>
(function () {
	'use strict';

	var routes = {
		miami: "{{ '/vice-city/contact/' | relative_url }}",
		pirate: "{{ '/black-leaf-bounty/contact/' | relative_url }}"
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
