var staticCache = "rest-rev-v0.0";

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
