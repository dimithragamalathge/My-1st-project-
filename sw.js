const CACHE = 'dover-cottage-v1';
const SHELL = [
  '/My-1st-project-/',
  '/My-1st-project-/index.html',
  '/My-1st-project-/manifest.json',
  '/My-1st-project-/icons/icon-192.png',
  '/My-1st-project-/icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network first, fall back to cache for the app shell
self.addEventListener('fetch', e => {
  // Only handle same-origin requests — let Supabase calls go through normally
  if (!e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
