// assets/js/age-gate.js
(function() {
  var modal = document.getElementById('age-gate-modal');
  var overlay = document.getElementById('age-gate-overlay');
  if (!modal || !overlay) return;
  var yesBtn = document.getElementById('age-gate-yes');
  var noBtn = document.getElementById('age-gate-no');
  var storageKey = 'vcc-age-verified';
  var expiryKey = 'vcc-age-verified-expiry';

  function now() { return new Date(); }
  function expiryDate() { return new Date(now().getTime() + 30*24*60*60*1000); }

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
  function setVerified() {
    try {
      localStorage.setItem(storageKey, 'yes');
      localStorage.setItem(expiryKey, expiryDate().toISOString());
    } catch (e) {}
  }
  function isVerified() {
    try {
      var v = localStorage.getItem(storageKey);
      var e = localStorage.getItem(expiryKey);
      return (v === 'yes' && e && new Date(e) > now());
    } catch (e) { return false; }
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
    if (noBtn) noBtn.addEventListener('click', function(){ modal.querySelector('.age-gate-content').innerHTML = '<h2>Sorry!</h2><p>You must be 21 or older to enter.</p>'; });
    modal.addEventListener('keydown', trapFocus);
  }

  document.addEventListener('submit', function(e) {
    var form = e.target;
    if (form && form.id === 'contact-form') {
      var endpoint = form.getAttribute('data-form-endpoint');
      if (endpoint) { form.action = endpoint; return; }
      e.preventDefault();
      var mail = document.querySelector('a[href^="mailto:"]');
      if (mail) mail.click();
    }
  });
})();
