const AERION_UPDATE_INTERVAL = 30 * 1000;

async function registerAERIONServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        return;
    }

    try {
        const serviceWorkerURL = new URL(
            "../service-worker.js",
            document.baseURI
        );

        const registration =
            await navigator.serviceWorker.register(
                serviceWorkerURL,
                {
                    scope: "../"
                }
            );

        const checkForUpdates = () => {
            registration.update();
        };

        checkForUpdates();

        setInterval(
            checkForUpdates,
            AERION_UPDATE_INTERVAL
        );

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
