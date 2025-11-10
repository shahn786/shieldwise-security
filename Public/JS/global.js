/**
 * Global JavaScript - ShieldWise Security
 * Handles video lazy loading and other global functionality
 */

(function() {
  'use strict';

  // Video Lazy Loading with IntersectionObserver
  function initializeLazyVideos() {
    const videos = document.querySelectorAll('video[data-lazy="true"]');
    
    if (!videos.length) return;

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const video = entry.target;
            const sources = video.querySelectorAll('source[data-src]');
            
            // Load video sources
            sources.forEach(function(source) {
              source.src = source.getAttribute('data-src');
              source.removeAttribute('data-src');
            });
            
            // Load video and play
            video.load();
            video.play().catch(function(error) {
              console.log('Video autoplay prevented:', error);
            });
            
            // Stop observing this video
            observer.unobserve(video);
          }
        });
      }, {
        rootMargin: '50px 0px', // Start loading 50px before video enters viewport
        threshold: 0.01
      });

      // Observe all lazy videos
      videos.forEach(function(video) {
        videoObserver.observe(video);
      });

      console.log('✅ Video lazy loading initialized for', videos.length, 'videos');
    } else {
      // Fallback for browsers without IntersectionObserver
      videos.forEach(function(video) {
        const sources = video.querySelectorAll('source[data-src]');
        sources.forEach(function(source) {
          source.src = source.getAttribute('data-src');
          source.removeAttribute('data-src');
        });
        video.load();
      });
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLazyVideos);
  } else {
    initializeLazyVideos();
  }

})();
