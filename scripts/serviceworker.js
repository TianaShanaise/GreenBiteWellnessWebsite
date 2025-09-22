const CACHE_NAME = "greenbite-cache-v1";
const urlsToCache = [
  "../pages/index.html",
  "../pages/page2.html",
  "../pages/page3.html",
  "../pages/page4.html",
  "../pages/page5.html",
  "../pages/page6.html",
  "../styles/style1.css",
  "../styles/style2.css",
  "../styles/style3.css",
  "../styles/style4.css",
  "../styles/style5.css",
  "../styles/style6.css",
  "../scripts/script1.js",
  "../scripts/script2.js",
  "../scripts/script3.js",
  "../scripts/script4.js",
  "../scripts/script5.js",
  "../scripts/script6.js",
  "../scripts/hamburgher.js",
  "../favicons/favicon-192x192.png",
  "../favicons/favicon-32x32.png",
  "../favicons/favicon-512x512.png",
  "../favicons/favicon-16x16.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
