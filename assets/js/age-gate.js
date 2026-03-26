// assets/js/age-gate.js
// Age verification gate: 21+ confirmation with 30-day localStorage persistence.
(function() {
  var modal = document.getElementById('age-gate-modal');
  var overlay = document.getElementById('age-gate-overlay');
  if (!modal || !overlay) return;
  var yesBtn = document.getElementById('age-gate-yes');
  var noBtn = document.getElementById('age-gate-no');
  var lastFocusedElement = null;
  var storageKey = 'vcc-age-verified';
  var maxAgeMs = 30 * 24 * 60 * 60 * 1000;

  function setPageInert(isInert) {
    var contentRegions = document.querySelectorAll('.site-header, main, .site-footer');
    contentRegions.forEach(function(region) {
      if (isInert) {
        region.setAttribute('inert', '');
      } else {
        region.removeAttribute('inert');
      }
    });
  }

  function isVerified() {
    try {
      var raw = localStorage.getItem(storageKey);
      if (!raw) return false;
      if (raw === 'yes') {
        // Migrate legacy value to timestamped format so expiry is always enforced.
        setVerified();
        return true;
      }

      var parsed = JSON.parse(raw);
      if (!parsed || parsed.value !== 'yes' || !parsed.ts) {
        return false;
      }

      if ((Date.now() - parsed.ts) > maxAgeMs) {
        localStorage.removeItem(storageKey);
        return false;
      }

      return true;
    } catch (e) { return false; }
  }

  function setVerified() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ value: 'yes', ts: Date.now() }));
    } catch (e) {}
  }

  function show() {
    lastFocusedElement = document.activeElement;
    overlay.style.display = 'block';
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    setPageInert(true);
    document.body.style.overflow = 'hidden';
    setTimeout(function(){ modal.focus(); yesBtn && yesBtn.focus(); }, 50);
  }

  function showUnderageState() {
    var content = modal.querySelector('.age-gate-content');
    if (!content) return;

    content.innerHTML = '';

    var title = document.createElement('h2');
    title.id = 'age-gate-title';
    title.textContent = 'Sorry!';

    var message = document.createElement('p');
    message.id = 'age-gate-desc';
    message.textContent = 'You must be 21 or older to enter this site.';

    var exitButton = document.createElement('button');
    exitButton.type = 'button';
    exitButton.className = 'btn btn-secondary';
    exitButton.textContent = 'Leave Site';
    exitButton.addEventListener('click', function() {
      if (window.history.length > 1) {
        window.history.back();
        return;
      }
      window.location.href = 'about:blank';
    });

    content.appendChild(title);
    content.appendChild(message);
    content.appendChild(exitButton);

    setTimeout(function() { exitButton.focus(); }, 0);
  }

  function hide() {
    overlay.style.display = 'none';
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    setPageInert(false);
    document.body.style.overflow = '';
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function' && document.contains(lastFocusedElement)) {
      lastFocusedElement.focus();
      return;
    }
    var skip = document.querySelector('.skip-link');
    if (skip) skip.focus();
  }

  function trapFocus(e) {
    if (modal.style.display !== 'block') return;
    var focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    if (e.key === 'Tab') {
      var first = focusable[0], last = focusable[focusable.length-1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === 'Escape') { e.preventDefault(); }
  }

  if (!isVerified()) {
    show();
    if (yesBtn) yesBtn.addEventListener('click', function(){ setVerified(); hide(); });
    if (noBtn) noBtn.addEventListener('click', showUnderageState);
    modal.addEventListener('keydown', trapFocus);
  }
})();
