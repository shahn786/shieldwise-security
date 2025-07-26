
/**
 * Back to Top Button Functionality
 * Reusable script for all city pages
 */

// Back to Top Button Handler
function initBackToTop() {
    console.log('Initializing Back to Top'); // Debug log
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        console.log('Back to top button found'); // Debug log

        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
                backToTopButton.style.display = 'flex'; // Use flex to match CSS
            } else {
                backToTopButton.classList.remove('active');
                backToTopButton.style.display = 'none';
            }
        });

        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Back to top clicked'); // Debug log
            
            // Multiple scroll methods for better compatibility
            try {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } catch (error) {
                // Fallback for older browsers
                console.log('Using fallback scroll method');
                window.scrollTo(0, 0);
                
                // Manual smooth scroll animation
                const scrollStep = -window.scrollY / (500 / 15);
                const scrollInterval = setInterval(function(){
                    if (window.scrollY !== 0) {
                        window.scrollBy(0, scrollStep);
                    } else {
                        clearInterval(scrollInterval);
                    }
                }, 15);
            }
        });

        // Force initial state
        if (window.pageYOffset <= 300) {
            backToTopButton.style.display = 'none';
        }

    } else {
        console.log('Back to top button NOT found'); // Debug log
        console.log('Available elements with back-to-top class:', document.querySelectorAll('.back-to-top'));
        console.log('Available elements with backToTop id:', document.querySelectorAll('#backToTop'));
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
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing back to top');
    initBackToTop();
    initServiceWorker();
    initWebVitalsMonitoring();
});

// Also initialize on window load as backup
window.addEventListener('load', function() {
    console.log('Window loaded - Backup initialization');
    if (!document.getElementById('backToTop')?.hasAttribute('data-initialized')) {
        initBackToTop();
        const button = document.getElementById('backToTop');
        if (button) {
            button.setAttribute('data-initialized', 'true');
        }
    }
});
