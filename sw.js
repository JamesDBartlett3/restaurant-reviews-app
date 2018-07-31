var staticCache = "rest-rev-v0.0";
/*
let restCSS = [
    'css/styles.css'
]

let restDATA = [
    'data/restaurants.json'
]

let restHTML = [
    '/skeleton',
    '/index.html',
    '/restaurant.html'
]

let restIMG = [
    'img/1.jpg', 'img/10.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg',
    'img/5.jpg', 'img/6.jpg', 'img/7.jpg', 'img/8.jpg', 'img/9.jpg'
];

let restJS = [
    'js/dbhelper.js',
    'private/mapbox_api_key.js',
    'js/main.js',
    'js/register-sw.js',
    'js/restaurant_info.js'
];



self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(staticCache)
        .then(cache => {
            cache.addAll(restCSS);
            cache.addAll(restDATA);
            cache.addAll(restHTML);
            cache.addAll(restIMG);
            cache.addAll(restJS);
        })
    )
});
 */

self.addEventListener('fetch', e => {
    if (e.request.method == 'GET') {
        e.respondWith(caches.open(staticCache).then(cache => {
            return fetch(e.request).then(req => {
                const reqClone = req.clone();
                cache.put(e.request, reqClone)
                .then(() => {});
                return req;

            })
        }))
    }
});
