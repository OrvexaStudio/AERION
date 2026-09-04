const CACHE_NAME = "aerion-cache-v1";

const APP_FILES = [
    "./",
    "./index.html",
    "./logo.png",
    "./manifest.json",

    "./dashboard/index.html",
    "./logbook/index.html",
    "./training/index.html",
    "./theory/index.html",
    "./quiz/index.html",
    "./simulator/index.html",
    "./goals/index.html",
    "./statistics/index.html",
    "./settings/index.html",

    "./css/global.css",
    "./css/dashboard.css",
    "./css/logbook.css",
    "./css/training.css",
    "./css/theory.css",
    "./css/quiz.css",
    "./css/simulator.css",
    "./css/goals.css",
    "./css/statistics.css",
    "./css/settings.css",

    "./js/app.js",
    "./js/storage.js",
    "./js/dashboard.js",
    "./js/logbook.js",
    "./js/training.js",
    "./js/theory.js",
    "./js/quiz.js",
    "./js/simulator.js",
    "./js/goals.js",
    "./js/statistics.js",
    "./js/settings.js"
];


/* =========================================================
   INSTALL
========================================================= */

self.addEventListener("install", event => {

    event.waitUntil(

        caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll(APP_FILES))

    );

    self.skipWaiting();

});


/* =========================================================
   ACTIVATE
========================================================= */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(cacheNames => {

                return Promise.all(

                    cacheNames
                        .filter(name => {
                            return name !== CACHE_NAME;
                        })
                        .map(name => {
                            return caches.delete(name);
                        })

                );

            })

    );

    self.clients.claim();

});


/* =========================================================
   FETCH
   NETWORK FIRST
========================================================= */

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {
        return;
    }


    event.respondWith(

        fetch(event.request)

            .then(response => {

                if (
                    !response ||
                    response.status !== 200
                ) {
                    return response;
                }


                const responseClone =
                    response.clone();


                caches
                    .open(CACHE_NAME)
                    .then(cache => {

                        cache.put(
                            event.request,
                            responseClone
                        );

                    });


                return response;

            })

            .catch(() => {

                return caches.match(
                    event.request
                );

            })

    );

});
