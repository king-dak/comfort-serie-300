const CACHE_NAME = 'comfort-serie-300-v2026-11-05-13';
const APP_SHELL = ['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./extensions.js'];
const NET_TIMEOUT = 4000; // ms avant de basculer sur le cache (réseau lent / instable)

self.addEventListener('install', e => e.waitUntil((async () => {
  const c = await caches.open(CACHE_NAME);
  await Promise.all(APP_SHELL.map(u => c.add(u).catch(() => {})));
  await self.skipWaiting();
})()));
self.addEventListener('activate', e => e.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k.startsWith('comfort-serie-300-') && k !== CACHE_NAME).map(k => caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('message', e => { if (e.data?.type === 'SKIP_WAITING') self.skipWaiting(); });

function fetchWithTimeout(req) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), NET_TIMEOUT);
    fetch(req).then(r => { clearTimeout(t); resolve(r); }, err => { clearTimeout(t); reject(err); });
  });
}

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith((async () => {
    try {
      const response = await fetchWithTimeout(r);
      // On ne met en cache que les réponses complètes (pas de 206 / opaques)
      if (response && response.ok && response.status === 200) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(c => c.put(r, copy)).catch(() => {});
      }
      return response;
    } catch (err) {
      const cached = await caches.match(r, { ignoreSearch: r.mode === 'navigate' });
      if (cached) return cached;
      if (r.mode === 'navigate') return (await caches.match('./index.html')) || Response.error();
      return Response.error();
    }
  })());
});
