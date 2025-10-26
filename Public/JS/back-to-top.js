/**
 * Back to Top Button Functionality
 * Fixed version - single initialization
 */

(function() {
    'use strict';

    // Initialize Back to Top Button
    function initBackToTop() {
        const backToTopButton = document.getElementById('backToTop');

        if (!backToTopButton) {
            console.log('Back to top button not found');
            return;
        }

        console.log('Back to top button initialized');

        // Show/hide button based on scroll position
        function handleScroll() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        }

        // Add scroll event listener with passive option for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Initial check for scroll position
        handleScroll();
    }

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackToTop);
    } else {
        // DOM is already loaded
        initBackToTop();
    }
})();