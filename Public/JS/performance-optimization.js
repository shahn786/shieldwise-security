
document.addEventListener('DOMContentLoaded', function() {
    console.log('Performance optimization script loaded');

    // Enhanced Intersection Observer for lazy loading
    const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                // Handle images with data-src
                if (target.tagName === 'IMG' && target.dataset.src) {
                    target.src = target.dataset.src;
                    target.removeAttribute('data-src');
                    target.classList.add('loaded');
                    lazyLoadObserver.unobserve(target);
                }

                // Handle videos with data-src
                if (target.tagName === 'VIDEO' && target.dataset.src) {
                    target.src = target.dataset.src;
                    target.removeAttribute('data-src');
                    target.classList.add('loaded');
                    lazyLoadObserver.unobserve(target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Video performance observer
    const videoPerformanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                // Video is in view
                if (video.paused) {
                    // Change preload if necessary
                    if (video.getAttribute('preload') === 'none') {
                        video.setAttribute('preload', 'auto');
                    }
                    
                    // Play video with error handling
                    setTimeout(() => {
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.then(() => {
                                video.classList.add('loaded');
                                console.log('Video playing successfully');
                            }).catch(error => {
                                console.log("Video autoplay prevented:", error);
                            });
                        }
                    }, 100);
                }
            } else {
                // Video is out of view - pause if low priority
                if (!video.paused && video.getAttribute('data-load-priority') === 'low') {
                    video.pause();
                }
            }
        });
    }, { 
        threshold: 0.1, 
        rootMargin: '100px 0px'
    });

    // Initialize observers for existing elements
    function initializeObservers() {
        // Observe images with data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            lazyLoadObserver.observe(img);
        });

        // Observe videos with data-src
        document.querySelectorAll('video[data-src]').forEach(video => {
            lazyLoadObserver.observe(video);
        });

        // Observe all videos for performance optimization
        document.querySelectorAll('video').forEach(video => {
            videoPerformanceObserver.observe(video);
            
            // Add error handling
            video.addEventListener('error', function(e) {
                console.log("Video error:", e);
                if (video.parentNode) {
                    video.parentNode.style.backgroundColor = '#111';
                }
            });
        });
    }

    // Critical resource preloading
    const criticalResources = [
        '/Public/css/critical.css',
        '/Public/JS/global.js'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });

    // Background video optimization
    const backgroundVideo = document.getElementById('background-video12');
    if (backgroundVideo) {
        const backgroundVideoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (backgroundVideo.paused) {
                        backgroundVideo.play().catch(e => console.log('Background video play failed:', e));
                    }
                } else {
                    if (!backgroundVideo.paused) {
                        backgroundVideo.pause();
                    }
                }
            });
        }, { threshold: 0.1 });
        
        backgroundVideoObserver.observe(backgroundVideo);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question, .faq-header');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        if (question && answer) {
            question.addEventListener('click', function() {
                const isOpen = answer.style.display === 'block' || item.classList.contains('active');

                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    if (otherAnswer && otherAnswer !== answer) {
                        otherAnswer.style.display = 'none';
                        otherItem.classList.remove('active');
                        if (otherIcon) otherIcon.textContent = '+';
                    }
                });

                // Toggle current item
                if (isOpen) {
                    answer.style.display = 'none';
                    item.classList.remove('active');
                    if (icon) icon.textContent = '+';
                } else {
                    answer.style.display = 'block';
                    item.classList.add('active');
                    if (icon) icon.textContent = '-';
                }
            });
        }
    });

    // Debounced scroll handler
    let scrollTimeout;
    let isScrolling = false;
    
    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                // Back to top button visibility
                const backToTopBtn = document.getElementById('back-to-top');
                if (backToTopBtn) {
                    if (scrollTop > 300) {
                        backToTopBtn.style.display = 'block';
                        backToTopBtn.style.opacity = '1';
                    } else {
                        backToTopBtn.style.opacity = '0';
                        setTimeout(() => {
                            if (scrollTop <= 300) {
                                backToTopBtn.style.display = 'none';
                            }
                        }, 300);
                    }
                }

                isScrolling = false;
            });
        }
        isScrolling = true;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Form optimization
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                const originalText = submitBtn.textContent || submitBtn.value;
                submitBtn.textContent = 'Sending...';
                
                // Re-enable after 5 seconds as fallback
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 5000);
            }
        });
    });

    // Critical images/videos loading
    const criticalElements = document.querySelectorAll('img[fetchpriority="high"], video[fetchpriority="high"]');
    criticalElements.forEach(elem => {
        if (elem.complete || (elem.readyState && elem.readyState >= 3)) {
            elem.classList.add('loaded');
        } else {
            elem.addEventListener('load', () => {
                elem.classList.add('loaded');
            });
            elem.addEventListener('loadeddata', () => {
                elem.classList.add('loaded');
            });
        }
    });

    // Deferred script loading
    setTimeout(() => {
        const deferredScripts = document.querySelectorAll('script[data-defer="true"]');
        deferredScripts.forEach(script => {
            const newScript = document.createElement('script');
            Array.from(script.attributes).forEach(attr => {
                if (attr.name !== 'data-defer') {
                    newScript.setAttribute(attr.name, attr.value);
                }
            });
            if (script.innerHTML) {
                newScript.appendChild(document.createTextNode(script.innerHTML));
            }
            script.parentNode.replaceChild(newScript, script);
        });
    }, 2000);

    // Service Worker registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/Public/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    }

    // Initialize all observers
    initializeObservers();

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                    console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
                }
            }, 0);
        });
    }

    console.log('Performance optimization script initialization complete');
});
