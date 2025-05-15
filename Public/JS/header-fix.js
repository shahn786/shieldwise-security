document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();

        const dropdownMenu = this.nextElementSibling;
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        // Close all other dropdowns
        dropdownToggles.forEach(otherToggle => {
          if (otherToggle !== this) {
            otherToggle.setAttribute('aria-expanded', 'false');
            otherToggle.nextElementSibling.classList.remove('show');
          }
        });

        // Toggle current dropdown
        this.setAttribute('aria-expanded', !isExpanded);
        dropdownMenu.classList.toggle('show');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && !e.target.closest('.dropdown')) {
      dropdownToggles.forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'false');
        const dropdownMenu = toggle.nextElementSibling;
        if (dropdownMenu) {
          dropdownMenu.classList.remove('show');
        }
      });
    }
  });

  console.log("✅ Mobile dropdown handler initialized successfully");
});