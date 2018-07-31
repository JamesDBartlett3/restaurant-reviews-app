var staticCache = "rest-rev-v0.0";
let restPics = ['1.jpg', '10.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg'];


self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(staticCache).then(cache => {
            return cache.addAll([
                '/',
                'css/styes.css',
                'data/restaurants.json',

            ])
        })
    );
});

self.addEventListener('fetch', e => {
    if(event.request.mode === 'navigate') {
        event.respondWith(
            fetch(e.request).catch(r => {
                return new Response('<p>You are currently offline.</p>',
                { headers: { 'Content-Type': 'text/html' } });
            })
        );
    }
});
