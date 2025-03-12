
/* 
 * Dropdown Fix Script
 * This script provides additional support for Bootstrap dropdowns
 * in case the standard JavaScript doesn't work properly
 */
 
(function() {
  // Wait for document to be ready
  document.addEventListener('DOMContentLoaded', function() {
    // Check if jQuery is available
    if (typeof jQuery !== 'undefined') {
      console.log("✅ jQuery Loaded - Adding dropdown fallback handlers");
      
      // Add jQuery fallback for dropdown toggles
      jQuery('.dropdown-toggle').on('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          
          var $this = jQuery(this);
          var $parent = $this.closest('.dropdown');
          var $menu = $parent.find('.dropdown-menu');
          var isOpen = $this.attr('aria-expanded') === 'true';
          
          // Close all other dropdowns
          jQuery('.dropdown-toggle').not(this).attr('aria-expanded', 'false');
          jQuery('.dropdown-menu').not($menu).removeClass('show').slideUp(200);
          
          if (isOpen) {
            $this.attr('aria-expanded', 'false');
            $menu.removeClass('show').slideUp(200);
          } else {
            $this.attr('aria-expanded', 'true');
            $menu.addClass('show').slideDown(200);
          }
        }
      });
      
      // Close dropdowns when clicking outside
      jQuery(document).on('click', function(e) {
        if (window.innerWidth <= 768 && !jQuery(e.target).closest('.dropdown').length) {
          jQuery('.dropdown-toggle').attr('aria-expanded', 'false');
          jQuery('.dropdown-menu.show').removeClass('show').slideUp(200);
        }
      });
    } else {
      console.log("⚠️ jQuery not loaded - falling back to vanilla JS dropdown handlers");
    }
  });
})();
