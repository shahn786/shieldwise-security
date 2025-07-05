document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                // Handle images
                if (target.tagName === 'IMG' && target.dataset.src) {
                    target.src = target.dataset.src;
                    target.removeAttribute('data-src');
                    observer.unobserve(target);
                }

                // Handle videos
                if (target.tagName === 'VIDEO' && target.dataset.src) {
                    target.src = target.dataset.src;
                    target.removeAttribute('data-src');
                    observer.unobserve(target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
    });

    // Observe all videos with data-src
    document.querySelectorAll('video[data-src]').forEach(video => {
        observer.observe(video);
    });

    // Preload critical resources
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

    // Optimize background video
    const backgroundVideo = document.getElementById('background-video12');
    if (backgroundVideo) {
        // Pause video when not visible
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    backgroundVideo.play();
                } else {
                    backgroundVideo.pause();
                }
            });
        });
        videoObserver.observe(backgroundVideo);
    }

    // Enhanced image optimization with intersection observer
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                if (image.dataset.src) {
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                }
                image.classList.add('loaded');
                imageObserver.unobserve(image);
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(image => {
        imageObserver.observe(image);
    });

    // Video optimization - enhanced for performance
    const videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (video.paused) {
                    // If the video has preload="none", change it to "auto" when in view
                    if (video.getAttribute('preload') === 'none') {
                        video.setAttribute('preload', 'auto');
                    }
                    // Play the video with a small delay to ensure smooth loading
                    setTimeout(() => {
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.then(() => {
                                video.classList.add('loaded');
                            }).catch(error => {
                                console.log("Video autoplay prevented:", error);
                            });
                        }
                    }, 100);
                }
            } else {
                if (!video.paused && video.getAttribute('data-load-priority') === 'low') {
                    video.pause();
                }
            }
        });
    }, { 
        threshold: 0.1, 
        rootMargin: '100px 0px' // Load videos 100px before they come into view 
    });

    document.querySelectorAll('video').forEach(video => {
        videoObserver.observe(video);
        
        // Handle video loading errors
        video.addEventListener('error', function(e) {
            console.log("Video error:", e);
            if (video.parentNode) {
                video.parentNode.style.backgroundColor = '#111';
            }
        });
    });

    // Optimize second video loading
    const secondVideo = document.getElementById('background-video12');
    if (secondVideo) {
        const secondVideoObserver = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                secondVideo.setAttribute('preload', 'auto');
                secondVideoObserver.unobserve(secondVideo);
            }
        }, { rootMargin: '500px 0px' });
        secondVideoObserver.observe(secondVideo);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ accordion animation improvement
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const icon = this.querySelector('.faq-icon');
            if (icon) {
                if (icon.textContent === '+') {
                    icon.textContent = '-';
                } else {
                    icon.textContent = '+';
                }
            }
        });
    });

    // Add image/video load complete event for critical elements
    const criticalImages = document.querySelectorAll('img[fetchpriority="high"], video[fetchpriority="high"]');
    criticalImages.forEach(elem => {
        if (elem.complete || (elem.readyState && elem.readyState >= 3)) {
            elem.classList.add('loaded');
        } else {
            elem.addEventListener('load', () => {
                elem.classList.add('loaded');
            });
        }
    });

    // Improve page speed by deferring non-critical operations
    setTimeout(() => {
        // Load non-critical resources after page is interactive
        const deferredScripts = document.querySelectorAll('script[data-defer="true"]');
        deferredScripts.forEach(script => {
            const newScript = document.createElement('script');
            [...script.attributes].forEach(attr => {
                if (attr.name !== 'data-defer') {
                    newScript.setAttribute(attr.name, attr.value);
                }
            });
            newScript.appendChild(document.createTextNode(script.innerHTML));
            script.parentNode.replaceChild(newScript, script);
        });
    }, 3000);

    // Optimize FAQ accordions
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', function() {
                const isOpen = answer.style.display === 'block';

                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer && otherAnswer !== answer) {
                        otherAnswer.style.display = 'none';
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                if (isOpen) {
                    answer.style.display = 'none';
                    item.classList.remove('active');
                } else {
                    answer.style.display = 'block';
                    item.classList.add('active');
                }
            });
        }
    });

    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Handle scroll-based optimizations here
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Show/hide back to top button
            const backToTopBtn = document.getElementById('back-to-top');
            if (backToTopBtn) {
                if (scrollTop > 300) {
                    backToTopBtn.style.display = 'block';
                } else {
                    backToTopBtn.style.display = 'none';
                }
            }
        }, 100);
    });

    // Optimize form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }
        });
    });

    // Service Worker registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/Public/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered successfully');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed');
            });
    }
});