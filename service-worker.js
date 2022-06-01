const staticCacheStorage = 'static-cache-storage';
const staticCacheUrlRequests = [
    '/',
    '/index.html',
    '/pages/gallery.html',
    '/css/style.css',
    '/script/index.js', 
    '/script/gallery.js',
    '/images/icons/logo96x96.png',
    '/images/icons/logo192x192.png',
    '/images/icons/logo512x512.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
]; 

/* --> Listen For Service Worker Being Installed <-- */
self.addEventListener('install', event => {
    console.log("service worker has been installed", new Date().toLocaleTimeString());
    self.skipWaiting();
    
    event.waitUntil(
        //Access the caches API and open a cache
        caches.open(staticCacheStorage).then(cache => {
        console.log("caching shell assets");
        //Add our static files to our cache storage
        cache.addAll(staticCacheUrlRequests);
        })
    ); 
});

/* --> Listen For Service Worker Being Activated <-- */
self.addEventListener('activate', event => {
    console.log("service worker has been activated", new Date().toLocaleTimeString());
    self.skipWaiting();
});

/* --> Listen For Fetch Requests <-- */
self.addEventListener('fetch', event => {
    console.log("fetch event", event);
    event.respondWith(
        caches.match(event.request).then(cacheRespons => {
            return cacheRespons || fetch(event.request);
        })
    )
}); 