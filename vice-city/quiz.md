---
layout: miami
title: Cigar Fit Quiz
permalink: /vice-city/quiz/
description: "Find your best starting cigar profile based on flavor, strength, and session style."
---

<section class="hero">
  <h1>Cigar Fit Quiz</h1>
  <p class="hero-body">Answer three quick questions to get a suggested starting profile. Share your result and tag @vicecitycigars.</p>
</section>

<form id="cigar-fit-quiz" aria-label="Cigar fit quiz">
  <label for="quiz-strength">1) Preferred strength</label>
  <select id="quiz-strength" required>
    <option value="">Choose...</option>
    <option value="mild">Mild</option>
    <option value="medium">Medium</option>
    <option value="bold">Bold</option>
  </select>

  <label for="quiz-flavor">2) Flavor lane</label>
  <select id="quiz-flavor" required>
    <option value="">Choose...</option>
    <option value="creamy">Creamy / Smooth</option>
    <option value="spice">Spice / Pepper</option>
    <option value="rich">Rich / Cocoa / Earth</option>
  </select>

  <label for="quiz-time">3) Session length</label>
  <select id="quiz-time" required>
    <option value="">Choose...</option>
    <option value="short">30 to 45 minutes</option>
    <option value="mid">45 to 75 minutes</option>
    <option value="long">75+ minutes</option>
  </select>

  <button type="submit" class="btn btn-primary">Get My Fit</button>
</form>

<section class="events" id="quiz-result" hidden>
  <h2>Your Suggested Starting Profile</h2>
  <div class="event-card">
    <p id="quiz-recommendation"></p>
    <div class="hero-cta">
      <a class="btn btn-secondary" id="quiz-share" href="#" target="_blank" rel="noopener">Share to Social</a>
      <a class="btn btn-primary" href="{{ '/vice-city/contact/' | relative_url }}">Ask for a Personalized Recommendation</a>
    </div>
  </div>
</section>

<script>
(function () {
  'use strict';

  var form = document.getElementById('cigar-fit-quiz');
  var resultWrap = document.getElementById('quiz-result');
  var recommendation = document.getElementById('quiz-recommendation');
  var share = document.getElementById('quiz-share');

  function buildRecommendation(strength, flavor, time) {
    if (strength === 'mild' && flavor === 'creamy') {
      return 'Start with a Connecticut shade in a robusto or toro. Smooth entry profile with balanced body.';
    }
    if (strength === 'bold' || flavor === 'rich') {
      return 'Start with a Maduro profile in a robusto or toro for richer depth and fuller character.';
    }
    if (flavor === 'spice') {
      return 'Try a medium Habano profile for balanced spice and aroma without overwhelming strength.';
    }
    if (time === 'short') {
      return 'Choose a shorter format like a petite robusto for a focused, manageable session.';
    }
    return 'A medium-bodied cigar in robusto format is a strong starting point for flavor and pacing.';
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var strength = document.getElementById('quiz-strength').value;
    var flavor = document.getElementById('quiz-flavor').value;
    var time = document.getElementById('quiz-time').value;
    var result = buildRecommendation(strength, flavor, time);

    recommendation.textContent = result;
    resultWrap.hidden = false;

    var shareText = encodeURIComponent('My Vice City Cigar Fit: ' + result + ' @vicecitycigars');
    share.href = 'https://x.com/intent/post?text=' + shareText;
  });
})();
</script>
