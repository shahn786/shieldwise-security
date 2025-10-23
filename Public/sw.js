// Service Worker for ShieldWise Security - Enhanced Performance & Offline Support
const CACHE_VERSION = 'v2-compressed';
const CACHE_NAME = `shieldwise-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

// Resources to cache for optimal performance
const CACHE_URLS = [
  '/',
  '/services/',
  '/services/apartment-security',
  '/services/commercial-security',
  '/services/mobile-patrol',
  '/get-quote',
  '/contact',
  '/css/critical-path.css',
  '/css/apartment-security.css',
  '/js/critical.js',
  '/fonts/inter-var.woff2',
  '/img/logo.png',
  '/img/hero-security-service.webp',
  // Added compressed video assets to cache
  '/videos/shieldwise-promo-compressed.mp4',
  '/videos/shieldwise-promo-compressed.webm',
  '/manifest.json',
  OFFLINE_URL
];

// Install event - cache critical resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Caching critical resources');
        return cache.addAll(CACHE_URLS);
      })
      .then(() => {
        console.log('SW: Installation complete');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('SW: Installation failed', error);
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('SW: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('SW: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('SW: Serving from cache', event.request.url);
          return response;
        }

        console.log('SW: Fetching from network', event.request.url);
        return fetch(event.request)
          .then(fetchResponse => {
            // Check if we received a valid response
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              // For missing images, return a fallback
              if (event.request.url.includes('/img/') && fetchResponse.status === 404) {
                return caches.match('/img/favicon.ico') || fetchResponse;
              }
              // For video files that fail, return the offline page
              if (event.request.url.includes('/videos/') && fetchResponse.status !== 200) {
                return caches.match(OFFLINE_URL);
              }
              return fetchResponse;
            }

            // Clone the response for caching
            const responseToCache = fetchResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                // Cache successful responses
                cache.put(event.request, responseToCache);
              });

            return fetchResponse;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            // For missing images, return favicon as fallback
            if (event.request.url.includes('/img/')) {
              return caches.match('/img/favicon.ico');
            }
            // For video files that fail to fetch, return the offline page
            if (event.request.url.includes('/videos/')) {
              return caches.match(OFFLINE_URL);
            }
          });
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'quote-request') {
    event.waitUntil(
      handleQuoteSync()
    );
  }
});

// Handle quote form sync when back online
async function handleQuoteSync() {
  try {
    const requests = await getStoredRequests();
    for (const request of requests) {
      await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });
    }
    await clearStoredRequests();
    console.log('SW: Quote requests synced successfully');
  } catch (error) {
    console.error('SW: Quote sync failed', error);
  }
}

// Push notifications for security alerts
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Security alert notification',
    icon: '/img/icons/icon-192x192.png',
    badge: '/img/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/alerts'
    },
    actions: [
      {
        action: 'view',
        title: 'View Alert',
        icon: '/img/icons/view-icon.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/img/icons/dismiss-icon.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('ShieldWise Security Alert', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

// Handle messages from main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_UPDATE') {
    event.waitUntil(
      updateCache(event.data.urls)
    );
  }
});

// Update cache with new URLs
async function updateCache(urls) {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(urls);
}

// Store quote requests for offline sync
async function storeQuoteRequest(data) {
  const db = await openDB();
  const tx = db.transaction(['quotes'], 'readwrite');
  await tx.objectStore('quotes').add(data);
}

// Get stored quote requests
async function getStoredRequests() {
  const db = await openDB();
  const tx = db.transaction(['quotes'], 'readonly');
  return tx.objectStore('quotes').getAll();
}

// Clear stored requests after sync
async function clearStoredRequests() {
  const db = await openDB();
  const tx = db.transaction(['quotes'], 'readwrite');
  return tx.objectStore('quotes').clear();
}

// Simple IndexedDB wrapper
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ShieldWiseDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('quotes')) {
        db.createObjectStore('quotes', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

// Performance monitoring
self.addEventListener('fetch', event => {
  // Track navigation timing
  if (event.request.destination === 'document') {
    const startTime = performance.now();

    event.respondWith(
      handleRequest(event.request).then(response => {
        const endTime = performance.now();
        const duration = endTime - startTime;

        // Report performance metrics
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'PERFORMANCE_METRIC',
              metric: 'navigation_timing',
              duration: duration,
              url: event.request.url
            });
          });
        });

        return response;
      })
    );
  }
});

// Generic request handler
async function handleRequest(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}