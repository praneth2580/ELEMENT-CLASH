const CACHE_NAME = "element-clash-cache-v1";
const urlsToCache = ["/", "/ELEMENT-CLASH/", "/index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});


// {
//     "src": "screenshots/mobile_1.png",
//     "type": "image/png",
//     "sizes": "1082x2402",
//     "label": "Main Menu - Mobile"
//   },
//   {
//     "src": "screenshots/mobile_2.png",
//     "type": "image/png",
//     "sizes": "1082x2402",
//     "label": "Main Menu - Mobile"
//   },
//   {
//     "src": "screenshots/mobile_3.png",
//     "type": "image/png",
//     "sizes": "1082x2402",
//     "label": "Main Menu - Mobile"
//   },
//   {
//     "src": "screenshots/desktop_4.png",
//     "type": "image/png",
//     "sizes": "3840x2160",
//     "label": "Game Board - Desktop"
//   },
//   {
//     "src": "screenshots/desktop_3.png",
//     "type": "image/png",
//     "sizes": "3840x2160",
//     "label": "Game Board - Desktop"
//   },
//   {
//     "src": "screenshots/desktop_2.png",
//     "type": "image/png",
//     "sizes": "3840x2160",
//     "label": "Game Board - Desktop"
//   },
//   {
//     "src": "screenshots/desktop_1.png",
//     "type": "image/png",
//     "sizes": "3840x2160",
//     "label": "Game Board - Desktop"
//   }