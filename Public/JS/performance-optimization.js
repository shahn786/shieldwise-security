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