
// Performance optimization script for ShieldWise Security
document.addEventListener('DOMContentLoaded', function() {
    // Image lazy loading with enhanced performance
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            const image = entry.target;
            if (entry.isIntersecting) {
                if (image.dataset.src) {
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                }
                if (image.dataset.srcset) {
                    image.srcset = image.dataset.srcset;
                    image.removeAttribute('data-srcset');
                }
                image.classList.add('loaded');
                imageObserver.unobserve(image);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px 0px'
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(function(image) {
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
                    setTimeout(function() {
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.then(function() {
                                video.classList.add('loaded');
                            }).catch(function(error) {
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
        rootMargin: '100px 0px'
    });

    // Observe all videos
    document.querySelectorAll('video').forEach(function(video) {
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
        }, {
            rootMargin: '500px 0px'
        });
        secondVideoObserver.observe(secondVideo);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
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
    faqHeaders.forEach(function(header) {
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
    criticalImages.forEach(function(elem) {
        if (elem.complete || (elem.readyState && elem.readyState >= 3)) {
            elem.classList.add('loaded');
        } else {
            elem.addEventListener('load', function() {
                elem.classList.add('loaded');
            });
        }
    });

    // Improve page speed by deferring non-critical operations
    setTimeout(function() {
        // Load non-critical resources after page is interactive
        const deferredScripts = document.querySelectorAll('script[data-defer="true"]');
        deferredScripts.forEach(function(script) {
            const newScript = document.createElement('script');
            Array.from(script.attributes).forEach(function(attr) {
                if (attr.name !== 'data-defer') {
                    newScript.setAttribute(attr.name, attr.value);
                }
            });
            newScript.appendChild(document.createTextNode(script.innerHTML));
            script.parentNode.replaceChild(newScript, script);
        });
    }, 3000);
});
