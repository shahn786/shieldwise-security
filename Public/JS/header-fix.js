document.addEventListener('DOMContentLoaded', function() {
  // Function to directly handle mobile menu behavior
  function setupMobileMenus() {
    // Target all possible dropdown triggers
    const allDropdownTriggers = document.querySelectorAll('.dropdown-toggle, [data-toggle="dropdown"], .nav-link.dropdown-toggle');

    // Remove any existing event listeners (in case of duplicates)
    allDropdownTriggers.forEach(trigger => {
      const newTrigger = trigger.cloneNode(true);
      trigger.parentNode.replaceChild(newTrigger, trigger);
    });

    // Add fresh event listeners
    document.querySelectorAll('.dropdown-toggle, [data-toggle="dropdown"], .nav-link.dropdown-toggle').forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();

          // Find the dropdown menu
          let dropdownMenu;

          // Try various methods to find the dropdown menu
          // Method 1: Next sibling
          if (this.nextElementSibling && this.nextElementSibling.classList.contains('dropdown-menu')) {
            dropdownMenu = this.nextElementSibling;
          } 
          // Method 2: Parent's child
          else if (this.parentElement) {
            dropdownMenu = this.parentElement.querySelector('.dropdown-menu');
          }
          // Method 3: Data target
          else if (this.getAttribute('data-target')) {
            const targetSelector = this.getAttribute('data-target');
            dropdownMenu = document.querySelector(targetSelector);
          }

          if (dropdownMenu) {
            // Toggle this dropdown
            const isExpanded = dropdownMenu.classList.contains('show');

            // Close all dropdowns first
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
              menu.classList.remove('show');
              menu.style.display = 'none';
            });

            // Set all toggles to not expanded
            document.querySelectorAll('[aria-expanded="true"]').forEach(toggle => {
              toggle.setAttribute('aria-expanded', 'false');
            });

            // If this wasn't already open, open it
            if (!isExpanded) {
              dropdownMenu.classList.add('show');
              dropdownMenu.style.display = 'block'; // Force display
              this.setAttribute('aria-expanded', 'true');

              // Position the dropdown (especially for services area)
              if (window.innerWidth <= 768) {
                dropdownMenu.style.position = 'static';
                dropdownMenu.style.width = '100%';
                dropdownMenu.style.marginTop = '0';
              }
            }
          }
        }
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        const isDropdownClick = e.target.classList.contains('dropdown-toggle') || 
                               e.target.closest('.dropdown-toggle') || 
                               e.target.closest('.dropdown-menu');

        if (!isDropdownClick) {
          document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
            menu.style.display = 'none';
          });

          document.querySelectorAll('[aria-expanded="true"]').forEach(toggle => {
            toggle.setAttribute('aria-expanded', 'false');
          });
        }
      }
    });
  }

  // Call the setup function
  setupMobileMenus();

  // Also set up on resize
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
      setupMobileMenus();
    }
  });

  console.log("🔄 Complete mobile dropdown solution initialized");
});