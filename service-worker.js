const CACHE_NAME = "aerion-runtime-v1";


/* INSTALL */

self.addEventListener(
    "install",
    event => {
        self.skipWaiting();
    }
);


/* ACTIVATE */

self.addEventListener(
    "activate",
    event => {
        event.waitUntil(
            caches.keys().then(
                cacheNames => {
                    return Promise.all(
                        cacheNames
                            .filter(
                                name =>
                                    name !== CACHE_NAME
                            )
                            .map(
                                name =>
                                    caches.delete(name)
                            )
                    );
                }
            )
        );

        self.clients.claim();
    }
);


/* FETCH */

self.addEventListener(
    "fetch",
    event => {
        const request = event.request;

        if (request.method !== "GET") {
            return;
        }

        const url = new URL(request.url);

        if (
            url.origin !== self.location.origin
        ) {
            return;
        }

        const isAppAsset =
            request.destination === "document" ||
            request.destination === "script" ||
            request.destination === "style" ||
            request.destination === "manifest" ||
            request.destination === "image";

        if (!isAppAsset) {
            return;
        }

        event.respondWith(
            fetch(
                new Request(request, {
                    cache: "no-store"
                })
            )
                .then(response => {

                    if (
                        response &&
                        response.ok
                    ) {
                        const clone =
                            response.clone();

                        caches
                            .open(CACHE_NAME)
                            .then(cache => {
                                cache.put(
                                    request,
                                    clone
                                );
                            });
                    }

                    return response;
                })
                .catch(() => {
                    return caches.match(request);
                })
        );
    }
);


/* UPDATE MESSAGE */

self.addEventListener(
    "message",
    event => {
        if (
            event.data?.type ===
            "CHECK_FOR_UPDATE"
        ) {
            self.registration.update();
        }
    }
);


/* NEW VERSION */

self.addEventListener(
    "controllerchange",
    () => {
        self.clients
            .matchAll({
                type: "window",
                includeUncontrolled: true
            })
            .then(clients => {
                clients.forEach(client => {
                    client.postMessage({
                        type:
                            "AERION_UPDATE_AVAILABLE"
                    });
                });
            });
    }
);
