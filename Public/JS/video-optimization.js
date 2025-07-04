
// Image and Video optimization - enhanced for performance
document.addEventListener('DOMContentLoaded', function () {
  // --- Image Lazy Loading ---
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const image = entry.target;
          if (image && image.dataset && image.dataset.src) {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
          }
          image.classList.add('loaded');
          observer.unobserve(image);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px 0px'
    });

    document.querySelectorAll('img[data-src]').forEach(image => {
      imageObserver.observe(image);
    });

    // --- Video Lazy Loading & Optimization ---
    const videoObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        const video = entry.target;
        if (entry.isIntersecting) {
          if (video.paused) {
            if (video.getAttribute('preload') === 'none') {
              video.setAttribute('preload', 'auto');
            }
            setTimeout(() => {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.then(() => {
                  video.classList.add('loaded');
                }).catch(error => {
                  // Autoplay might be blocked on some browsers
                  console.log("Video autoplay prevented:", error);
                });
              }
            }, 100);
          }
        } else {
          // Pause low-priority videos when out of view
          if (!video.paused && video.getAttribute('data-load-priority') === 'low') {
            video.pause();
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '100px 0px'
    });

    document.querySelectorAll('video').forEach(video => {
      videoObserver.observe(video);
      video.addEventListener('error', function (e) {
        console.log("Video error:", e);
        if (video.parentNode) {
          video.parentNode.style.backgroundColor = '#111';
        }
      });
    });

    // --- Special Second Video Optimization ---
    const secondVideo = document.getElementById('background-video12');
    if (secondVideo) {
      const secondVideoObserver = new IntersectionObserver(function (entries, observer) {
        if (entries[0].isIntersecting) {
          secondVideo.setAttribute('preload', 'auto');
          observer.unobserve(secondVideo);
        }
      }, {
        rootMargin: '500px 0px'
      });
      secondVideoObserver.observe(secondVideo);
    }
  }

  // --- Smooth Scrolling for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && document.querySelector(targetId)) {
        e.preventDefault();
        document.querySelector(targetId).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // --- FAQ Accordion Animation ---
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', function () {
      const icon = this.querySelector('.faq-icon');
      if (icon) {
        icon.textContent = (icon.textContent === '+') ? '-' : '+';
      }
    });
  });

  // --- Add 'loaded' Class for Critical Images/Videos ---
  const criticalMedia = document.querySelectorAll('img[fetchpriority="high"], video[fetchpriority="high"]');
  criticalMedia.forEach(elem => {
    if (
      (elem.tagName === 'IMG' && elem.complete) ||
      (elem.tagName === 'VIDEO' && elem.readyState >= 3)
    ) {
      elem.classList.add('loaded');
    } else {
      elem.addEventListener('load', () => {
        elem.classList.add('loaded');
      });
      if (elem.tagName === 'VIDEO') {
        elem.addEventListener('loadeddata', () => {
          elem.classList.add('loaded');
        });
      }
    }
  });

  // --- Defer Non-Critical Scripts ---
  setTimeout(() => {
    const deferredScripts = document.querySelectorAll('script[data-defer="true"]');
    deferredScripts.forEach(script => {
      const newScript = document.createElement('script');
      [...script.attributes].forEach(attr => {
        if (attr.name !== 'data-defer') {
          newScript.setAttribute(attr.name, attr.value);
        }
      });
      newScript.text = script.innerHTML;
      script.parentNode.replaceChild(newScript, script);
    });
  }, 3000);
});
