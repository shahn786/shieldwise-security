
// Enhanced Performance Optimization Script for ShieldWise Security
document.addEventListener('DOMContentLoaded', function() {
    // Defer non-critical scripts
    const deferredScripts = document.querySelectorAll('script[data-defer="true"]');
    
    deferredScripts.forEach(function(script) {
        if (!script || !script.attributes) return;
        
        const newScript = document.createElement('script');
        
        // Safely copy attributes
        try {
            Array.from(script.attributes).forEach(function(attr) {
                if (attr && attr.name && attr.name !== 'data-defer') {
                    newScript.setAttribute(attr.name, attr.value || '');
                }
            });
        } catch (e) {
            console.log('Error copying script attributes:', e);
            return;
        }
        
        if (script.parentNode) {
            script.parentNode.replaceChild(newScript, script);
        }
    });

    // Lazy load images with intersection observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img && img.dataset && img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(function(img) {
            if (img) {
                imageObserver.observe(img);
            }
        });
    }

    // Optimize video loading
    const videos = document.querySelectorAll('video');
    videos.forEach(function(video) {
        if (!video) return;
        
        try {
            // Set video attributes for better performance
            video.setAttribute('preload', 'none');
            
            // Play the video with a small delay to ensure smooth loading
            if (video.autoplay) {
                setTimeout(function() {
                    if (video && typeof video.play === 'function') {
                        video.play().catch(function(e) {
                            console.log('Video autoplay blocked:', e);
                        });
                    }
                }, 100);
            }
        } catch (e) {
            console.log('Video optimization error:', e);
        }
    });

    // Improve page speed by deferring non-critical operations
    setTimeout(function() {
        // Load non-critical CSS
        const criticalCSS = document.querySelectorAll('link[rel="preload"][as="style"]');
        criticalCSS.forEach(function(link) {
            if (link) {
                link.rel = 'stylesheet';
            }
        });

        // Initialize third-party widgets after page load
        if (typeof initializeWidgets === 'function') {
            initializeWidgets();
        }
    }, 1000);

    // FAQ accordion animation improvements
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(function(header) {
        if (!header) return;
        
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content) {
                content.style.transition = 'max-height 0.3s ease';
            }
        });
    });

    // Add intersection observer for animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && entry.target) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(function(element) {
            if (element) {
                animationObserver.observe(element);
            }
        });
    }
});

// Utility function to safely get element by ID
function safeGetElementById(id) {
    try {
        return document.getElementById(id);
    } catch (e) {
        console.log('Error getting element by ID:', id, e);
        return null;
    }
}

// Utility function to safely query selector
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (e) {
        console.log('Error with querySelector:', selector, e);
        return null;
    }
}
