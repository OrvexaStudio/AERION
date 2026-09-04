const AERION_UPDATE_INTERVAL = 60 * 1000;

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

        await registration.update();

        setInterval(() => {
            registration.update();
        }, AERION_UPDATE_INTERVAL);

        document.addEventListener(
            "visibilitychange",
            () => {
                if (
                    document.visibilityState === "visible"
                ) {
                    registration.update();
                }
            }
        );

        navigator.serviceWorker.addEventListener(
            "message",
            event => {
                if (
                    event.data?.type ===
                    "AERION_UPDATE_AVAILABLE"
                ) {
                    window.location.reload();
                }
            }
        );

    } catch (error) {
        console.error(
            "AERION PWA error:",
            error
        );
    }
}

registerAERIONServiceWorker();
