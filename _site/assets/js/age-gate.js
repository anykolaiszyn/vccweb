// assets/js/age-gate.js
// Age verification gate: 21+ confirmation with 30-day localStorage persistence.
(function() {
  var modal = document.getElementById('age-gate-modal');
  var overlay = document.getElementById('age-gate-overlay');
  if (!modal || !overlay) return;
  var yesBtn = document.getElementById('age-gate-yes');
  var noBtn = document.getElementById('age-gate-no');
  var storageKey = 'vcc-age-verified';
  var maxAgeMs = 30 * 24 * 60 * 60 * 1000;

  function isVerified() {
    try {
      var raw = localStorage.getItem(storageKey);
      if (!raw) return false;
      if (raw === 'yes') return true;

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
    overlay.style.display = 'block';
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function(){ modal.focus(); yesBtn && yesBtn.focus(); }, 50);
  }

  function hide() {
    overlay.style.display = 'none';
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    var skip = document.querySelector('.skip-link');
    if (skip) skip.focus();
  }

  function trapFocus(e) {
    if (modal.style.display !== 'block') return;
    var focusable = modal.querySelectorAll('button');
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
    if (noBtn) noBtn.addEventListener('click', function(){ modal.querySelector('.age-gate-content').innerHTML = '<h2>Sorry!</h2><p>You must be 21 or older to enter this site.</p>'; });
    modal.addEventListener('keydown', trapFocus);
  }
})();
