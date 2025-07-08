
// JS/performance-optimization.js

document.addEventListener('DOMContentLoaded', function () {

    // ===== Lazy Load Images with IntersectionObserver =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded'); // for fade-in animation
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback: load all images immediately
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }

    // ===== Lazy Load Videos with IntersectionObserver =====
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    if (video.dataset.src) {
                        video.src = video.dataset.src;
                        video.removeAttribute('data-src');
                    }
                    if (video.paused && video.autoplay) {
                        video.play().catch(() => {}); // Autoplay may be blocked
                    }
                    video.classList.add('loaded');
                    observer.unobserve(video);
                }
            });
        }, {
            rootMargin: '300px 0px'
        });

        document.querySelectorAll('video[data-src]').forEach(video => {
            videoObserver.observe(video);
        });
    } else {
        // Fallback: load all videos immediately
        document.querySelectorAll('video[data-src]').forEach(video => {
            video.src = video.dataset.src;
            video.classList.add('loaded');
        });
    }

    // ===== Optional: Background video optimization =====
    const backgroundVideo = document.getElementById('background-video12');
    if (backgroundVideo && 'IntersectionObserver' in window) {
        const bgObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    backgroundVideo.play().catch(() => {});
                } else {
                    backgroundVideo.pause();
                }
            });
        }, { threshold: 0.1 });

        bgObserver.observe(backgroundVideo);
    }

    // ===== Add .loaded for critical images/videos (for CSS fade-in effects) =====
    document.querySelectorAll('img[fetchpriority="high"], video[fetchpriority="high"]').forEach(elem => {
        if (elem.complete || (elem.readyState && elem.readyState >= 3)) {
            elem.classList.add('loaded');
        } else {
            elem.addEventListener('load', () => elem.classList.add('loaded'));
            elem.addEventListener('loadeddata', () => elem.classList.add('loaded'));
        }
    });

    // ===== Defer non-critical scripts =====
    setTimeout(() => {
        document.querySelectorAll('script[data-defer="true"]').forEach(script => {
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

    // ===== Debug log (can be removed in production) =====
    console.log('Performance optimization script loaded.');

});
