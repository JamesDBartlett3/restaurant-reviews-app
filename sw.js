var staticCache = "rest-rev-v0.2";

let restCSS = [
    '/css/styles.css'
]

let restDATA = [
    '/data/restaurants.json'
]

let restHTML = [
    '/index.html',
    '/restaurant.html',
	'/restaurant.html?id=1',
	'/restaurant.html?id=2',
	'/restaurant.html?id=3',
	'/restaurant.html?id=4',
	'/restaurant.html?id=5',
	'/restaurant.html?id=6',
	'/restaurant.html?id=7',
	'/restaurant.html?id=8',
	'/restaurant.html?id=9',
	'/restaurant.html?id=10'
]

let restIMG = [
    '/img/1.jpg', '/img/10.jpg', '/img/2.jpg', '/img/3.jpg', '/img/4.jpg',
    '/img/5.jpg', '/img/6.jpg', '/img/7.jpg', '/img/8.jpg', '/img/9.jpg'
];

let restJS = [
    '/js/dbhelper.js',
    /* '/private/mapbox_api_key.js', */
	'/js/key.js',
    '/js/main.js',
    '/js/register-sw.js',
    '/js/restaurant_info.js'
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
        .catch(error => {
            console.log('Failed to open one or more caches. Error message: ', error);
        })
    )
});


self.addEventListener('fetch', e => {
    if (e.request.url.hostname !== 'localhost') {
        e.request.mode = 'no-cors';
    }

    e.respondWith(caches.match(e.request).then(cRes => {
        if(cRes) {
            return cRes;
        }
        let reqClone = e.request.clone();
        return fetch(reqClone).then(fRes => {
            if(!fRes) {
                console.log('Fetch of cloned request from cache failed.');
                return fRes;
            }
            let resClone = fRes.clone();
            caches.open(staticCache).then(c => {
                c.put(e.request, resClone);
            });
            return fRes;
        })
        .catch(error => {
            console.error('You are in offline mode. Error message: ', error);
            // return new Response('You are in offline mode. Error message: ' + error);
			return fRes;
        })
    }))
});
