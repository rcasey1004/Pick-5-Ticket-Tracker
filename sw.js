const CACHE_NAME = 'f5-tracker-v2';
const ASSETS = [
  './index.html',
  './manifest.json'
];

// Install and Cache
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate and take control immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Offline-First Fetch Strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
