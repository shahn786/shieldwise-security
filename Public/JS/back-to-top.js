/**
 * Back to Top Button Functionality
 * Reusable script for all city pages
 */

// Back to Top Button Handler
function initBackToTop() {
    console.log('Initializing Back to Top'); // Debug log

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackToTop);
        return;
    }

    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        console.log('Back to top button found'); // Debug log

        // Show/hide button based on scroll position
        function handleScroll() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
                backToTopButton.style.display = 'flex'; // Use flex to match CSS
            } else {
                backToTopButton.classList.remove('active');
                backToTopButton.style.display = 'none';
            }
        }

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Back to top clicked'); // Debug log

            // Always scroll to the very top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Additional fallback for older browsers
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });

        // Initial check for scroll position
        handleScroll();

    } else {
        console.log('Back to top button NOT found'); // Debug log
        console.log('Available elements with id:', document.querySelectorAll('[id*="back"]'));
    }
}

// Service Worker Registration for PWA Performance
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered'))
                .catch(error => console.log('SW registration failed'));
        });
    }
}

// Core Web Vitals Monitoring
function initWebVitalsMonitoring() {
    // LCP monitoring
    if ('PerformanceObserver' in window) {
        try {
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    console.log('LCP:', entry.startTime);
                }
            }).observe({entryTypes: ['largest-contentful-paint']});

            // CLS monitoring
            let clsValue = 0;
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                console.log('CLS:', clsValue);
            }).observe({entryTypes: ['layout-shift']});
        } catch (error) {
            console.log('Web Vitals monitoring not supported');
        }
    }
}

// Initialize all functionality when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initBackToTop();
        initServiceWorker();
        initWebVitalsMonitoring();
    });
} else {
    // DOM is already loaded
    initBackToTop();
    initServiceWorker();
    initWebVitalsMonitoring();
}

// Also try to initialize immediately
try {
    initBackToTop();
} catch (error) {
    console.log('Error initializing back to top:', error);
}