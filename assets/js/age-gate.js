// assets/js/age-gate.js
(function() {
  var modal = document.getElementById('age-gate-modal');
  if (!modal) return;
  var yesBtn = document.getElementById('age-gate-yes');
  var noBtn = document.getElementById('age-gate-no');
  var storageKey = 'vcc-age-verified';
  var expiryKey = 'vcc-age-verified-expiry';
  var now = new Date();
  var expiry = new Date(now.getTime() + 30*24*60*60*1000); // 30 days

  function showModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
    document.body.style.overflow = 'hidden';
  }
  function hideModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  var skip = document.querySelector('.skip-link');
  if (skip) skip.focus();
  }
  function setVerified() {
    localStorage.setItem(storageKey, 'yes');
    localStorage.setItem(expiryKey, expiry.toISOString());
  }
  function isVerified() {
    var v = localStorage.getItem(storageKey);
    var e = localStorage.getItem(expiryKey);
    if (v === 'yes' && e && new Date(e) > now) return true;
    return false;
  }
  function trapFocus(e) {
    if (!modal.classList.contains('active')) return;
    var focusable = modal.querySelectorAll('button');
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === focusable[0]) {
        e.preventDefault();
        focusable[focusable.length-1].focus();
      } else if (!e.shiftKey && document.activeElement === focusable[focusable.length-1]) {
        e.preventDefault();
        focusable[0].focus();
      }
    }
    if (e.key === 'Escape') {
      // Do not allow closing
      e.preventDefault();
    }
  }
  if (!isVerified()) {
    showModal();
    yesBtn.addEventListener('click', function() {
      setVerified();
      hideModal();
    });
    noBtn.addEventListener('click', function() {
      modal.querySelector('.age-gate-content').innerHTML = '<h2>Sorry!</h2><p>You must be 21 or older to enter.</p>';
    });
    modal.addEventListener('keydown', trapFocus);
    setTimeout(function() { yesBtn.focus(); }, 200);
  }

  // Contact form optional endpoint handler
  document.addEventListener('submit', function(e) {
    var form = e.target;
    if (form && form.id === 'contact-form') {
      var endpoint = form.getAttribute('data-form-endpoint');
      if (endpoint) {
        form.action = endpoint;
        return; // allow normal POST
      } else {
        // No endpoint set; encourage using mailto button
        e.preventDefault();
        var mail = document.querySelector('a[href^="mailto:"]');
        if (mail) mail.click();
      }
    }
  });
})();
