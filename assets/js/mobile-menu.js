// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Toggle aria-expanded
      this.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle navigation visibility
      mainNav.classList.toggle('active');
      
      // Close menu when clicking on navigation links
      const navLinks = mainNav.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          mainNav.classList.remove('active');
        });
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!mobileMenuToggle.contains(event.target) && !mainNav.contains(event.target)) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('active');
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('active');
      }
    });
  }
});
