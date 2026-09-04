const AERION_UPDATE_INTERVAL = 30 * 1000;

async function registerAERIONServiceWorker() {

    if (!("serviceWorker" in navigator)) {
        return;
    }

    try {

        const appRoot =
            new URL(
                "../",
                document.querySelector(
                    'link[rel="manifest"]'
                )?.href ||
                document.baseURI
            );

        const serviceWorkerURL =
            new URL(
                "service-worker.js",
                appRoot
            );

        const registration =
            await navigator.serviceWorker.register(
                serviceWorkerURL,
                {
                    scope: appRoot.pathname
                }
            );

        const checkForUpdates = () => {

            registration.update();

        };

        /* Controllo immediato */

        checkForUpdates();


        /* Controllo automatico ogni 30 secondi */

        setInterval(
            checkForUpdates,
            AERION_UPDATE_INTERVAL
        );


        /* Controllo quando l'app torna visibile */

        document.addEventListener(
            "visibilitychange",
            () => {

                if (
                    document.visibilityState ===
                    "visible"
                ) {

                    checkForUpdates();

                }

            }
        );


        /* Nuova versione disponibile */

        navigator.serviceWorker.addEventListener(
            "controllerchange",
            () => {

                window.location.reload();

            }
        );

    } catch (error) {

        console.error(
            "AERION Service Worker error:",
            error
        );

    }

}

registerAERIONServiceWorker();
