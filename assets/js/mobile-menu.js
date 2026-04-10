// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const desktopMedia = window.matchMedia('(min-width: 768px)');

  // --- Dropdown (More menu) ---
  const dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');

  function closeAllDropdowns() {
    dropdownTriggers.forEach(function(trigger) {
      trigger.setAttribute('aria-expanded', 'false');
      const menu = trigger.nextElementSibling;
      if (menu) menu.classList.remove('open');
    });
  }

  dropdownTriggers.forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      // On desktop, let CSS hover handle it; only intercept on mobile
      if (desktopMedia.matches) return;
      e.stopPropagation();
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      closeAllDropdowns();
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        const menu = trigger.nextElementSibling;
        if (menu) menu.classList.add('open');
      }
    });
  });

  // --- Main hamburger menu ---
  function setMenuState(isOpen) {
    if (!mobileMenuToggle || !mainNav) return;

    mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    mainNav.classList.toggle('active', isOpen);
    mainNav.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';

    // Collapse any open dropdowns when closing the menu
    if (!isOpen) closeAllDropdowns();
  }

  function syncMenuForViewport() {
    if (!mobileMenuToggle || !mainNav) return;

    if (desktopMedia.matches) {
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('active');
      mainNav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = '';
      closeAllDropdowns();
      return;
    }

    var isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mainNav.setAttribute('aria-hidden', String(!isExpanded));
  }

  if (mobileMenuToggle && mainNav) {
    mainNav.setAttribute('aria-hidden', 'true');
    syncMenuForViewport();

    // Close menu when a non-dropdown nav link is clicked
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        setMenuState(false);
      });
    });

    mobileMenuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      setMenuState(!isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!mobileMenuToggle.contains(event.target) && !mainNav.contains(event.target)) {
        setMenuState(false);
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        setMenuState(false);
        closeAllDropdowns();
      }
    });

    if (desktopMedia.addEventListener) {
      desktopMedia.addEventListener('change', syncMenuForViewport);
    } else if (desktopMedia.addListener) {
      desktopMedia.addListener(syncMenuForViewport);
    }

    window.addEventListener('resize', syncMenuForViewport);
  }
});
