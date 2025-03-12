
document.addEventListener('DOMContentLoaded', function() {
  // Wait for the DOM to be fully loaded
  console.log("✅ Mobile dropdown handler starting initialization");
  
  // Function to check if we're on mobile
  function isMobileView() {
    return window.innerWidth <= 768;
  }
  
  // Get all dropdown toggles
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  // Setup proper dropdown functionality
  function setupDropdowns() {
    const mobile = isMobileView();
    
    dropdownToggles.forEach(toggle => {
      // Remove existing event listeners to avoid duplicates
      toggle.removeEventListener('click', handleDropdownClick);
      
      // Add fresh event listener
      toggle.addEventListener('click', handleDropdownClick);
      
      // Set initial state for mobile
      const dropdownMenu = toggle.closest('.dropdown').querySelector('.dropdown-menu');
      if (dropdownMenu) {
        if (mobile) {
          dropdownMenu.style.maxHeight = "0";
          dropdownMenu.style.opacity = "0";
          dropdownMenu.style.overflow = "hidden";
          dropdownMenu.style.display = "none";
          toggle.setAttribute('aria-expanded', 'false');
        } else {
          // Reset styles for desktop
          dropdownMenu.style.maxHeight = "";
          dropdownMenu.style.opacity = "";
          dropdownMenu.style.overflow = "";
          dropdownMenu.style.display = "";
        }
      }
    });
  }
  
  // Handle dropdown click
  function handleDropdownClick(e) {
    if (isMobileView()) {
      e.preventDefault();
      e.stopPropagation();
      
      const toggle = this;
      const dropdown = toggle.closest('.dropdown');
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      // Close all other dropdowns first
      dropdownToggles.forEach(otherToggle => {
        if (otherToggle !== toggle) {
          const otherDropdown = otherToggle.closest('.dropdown');
          const otherMenu = otherDropdown.querySelector('.dropdown-menu');
          
          otherToggle.setAttribute('aria-expanded', 'false');
          if (otherMenu) {
            otherMenu.style.display = 'none';
            otherMenu.style.maxHeight = '0';
            otherMenu.style.opacity = '0';
            otherMenu.classList.remove('show');
          }
        }
      });
      
      // Toggle current dropdown
      if (isExpanded) {
        // Close this dropdown
        toggle.setAttribute('aria-expanded', 'false');
        dropdownMenu.style.maxHeight = '0';
        dropdownMenu.style.opacity = '0';
        
        // Use setTimeout to allow the animation to complete before hiding
        setTimeout(() => {
          dropdownMenu.style.display = 'none';
          dropdownMenu.classList.remove('show');
        }, 300);
      } else {
        // Open this dropdown
        toggle.setAttribute('aria-expanded', 'true');
        dropdownMenu.style.display = 'block';
        dropdownMenu.classList.add('show');
        
        // Use setTimeout to ensure display:block takes effect before animation
        setTimeout(() => {
          dropdownMenu.style.maxHeight = '500px';
          dropdownMenu.style.opacity = '1';
        }, 10);
      }
    }
  }
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (isMobileView() && !e.target.closest('.dropdown')) {
      dropdownToggles.forEach(toggle => {
        const dropdown = toggle.closest('.dropdown');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        toggle.setAttribute('aria-expanded', 'false');
        if (dropdownMenu) {
          dropdownMenu.style.maxHeight = '0';
          dropdownMenu.style.opacity = '0';
          
          setTimeout(() => {
            dropdownMenu.style.display = 'none';
            dropdownMenu.classList.remove('show');
          }, 300);
        }
      });
    }
  });
  
  // Initialize on page load
  setupDropdowns();
  
  // Re-initialize on window resize
  window.addEventListener('resize', setupDropdowns);
  
  console.log("✅ Mobile dropdown handler initialized successfully");
});
