/* =========================================================
   AERION — Settings
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const data = getAerionData();

    initializeSettings(data);
    updateSettingsProfile(data);
    updateDate();

});


/* =========================================================
   INITIALIZE
========================================================= */

function initializeSettings(data) {

    const nameInput =
        document.getElementById("profileNameInput");

    const roleInput =
        document.getElementById("profileRoleInput");

    const flightTargetInput =
        document.getElementById("flightTargetInput");


    /* PROFILE */

    if (nameInput) {
        nameInput.value =
            data.profile?.name || "Francesco";
    }

    if (roleInput) {
        roleInput.value =
            data.profile?.role || "PPL Student";
    }


    /* FLIGHT TARGET */

    if (flightTargetInput) {

        const targetMinutes =
            Number(
                data.flight?.targetMinutes ||
                45 * 60
            );

        flightTargetInput.value =
            Math.round(targetMinutes / 60);

    }


    /* BUTTONS */

    const saveProfileButton =
        document.getElementById(
            "saveProfileButton"
        );

    const saveTrainingButton =
        document.getElementById(
            "saveTrainingButton"
        );

    const resetDataButton =
        document.getElementById(
            "resetDataButton"
        );


    if (saveProfileButton) {

        saveProfileButton.addEventListener(
            "click",
            saveProfile
        );

    }


    if (saveTrainingButton) {

        saveTrainingButton.addEventListener(
            "click",
            saveTrainingSettings
        );

    }


    if (resetDataButton) {

        resetDataButton.addEventListener(
            "click",
            resetAerionData
        );

    }

}


/* =========================================================
   PROFILE
========================================================= */

function updateSettingsProfile(data) {

    const name =
        data.profile?.name || "Francesco";


    const profileName =
        document.getElementById(
            "settingsProfileName"
        );

    const profileInitial =
        document.getElementById(
            "settingsInitial"
        );

    const sidebarName =
        document.getElementById(
            "profileName"
        );

    const sidebarInitial =
        document.getElementById(
            "profileInitial"
        );


    if (profileName) {
        profileName.textContent =
            name;
    }


    if (profileInitial) {
        profileInitial.textContent =
            name.charAt(0).toUpperCase();
    }


    if (sidebarName) {
        sidebarName.textContent =
            name;
    }


    if (sidebarInitial) {
        sidebarInitial.textContent =
            name.charAt(0).toUpperCase();
    }

}


/* =========================================================
   SAVE PROFILE
========================================================= */

function saveProfile() {

    const input =
        document.getElementById(
            "profileNameInput"
        );


    if (!input) {
        return;
    }


    const name =
        input.value.trim();


    if (!name) {

        showSettingsMessage(
            "Inserisci un nome valido.",
            "error"
        );

        input.focus();

        return;
    }


    const data =
        getAerionData();


    if (!data.profile) {
        data.profile = {};
    }


    data.profile.name =
        name;


    saveAerionData(data);

    updateSettingsProfile(data);


    showSettingsMessage(
        "Profilo aggiornato.",
        "success"
    );

}


/* =========================================================
   SAVE TRAINING SETTINGS
========================================================= */

function saveTrainingSettings() {

    const input =
        document.getElementById(
            "flightTargetInput"
        );


    if (!input) {
        return;
    }


    const hours =
        Number(input.value);


    if (
        !Number.isFinite(hours) ||
        hours <= 0
    ) {

        showSettingsMessage(
            "Inserisci un numero di ore valido.",
            "error"
        );

        input.focus();

        return;
    }


    const data =
        getAerionData();


    if (!data.flight) {
        data.flight = {};
    }


    data.flight.targetMinutes =
        Math.round(hours * 60);


    saveAerionData(data);


    showSettingsMessage(
        "Impostazioni di volo aggiornate.",
        "success"
    );

}


/* =========================================================
   RESET DATA
========================================================= */

function resetAerionData() {

    const confirmed =
        window.confirm(
            "Sei sicuro di voler eliminare tutti i dati di AERION?\n\n" +
            "Verranno eliminati voli, teoria, training, quiz, " +
            "simulatore, obiettivi e attività."
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(
        AERION_STORAGE_KEY
    );


    const freshData =
        getAerionData();


    initializeSettings(freshData);

    updateSettingsProfile(freshData);


    showSettingsMessage(
        "Dati ripristinati.",
        "success"
    );

}


/* =========================================================
   MESSAGE
========================================================= */

function showSettingsMessage(
    message,
    type = "success"
) {

    let element =
        document.getElementById(
            "settingsMessage"
        );


    if (!element) {

        element =
            document.createElement("div");

        element.id =
            "settingsMessage";

        element.style.position =
            "fixed";

        element.style.right =
            "28px";

        element.style.bottom =
            "28px";

        element.style.zIndex =
            "9999";

        element.style.padding =
            "13px 17px";

        element.style.borderRadius =
            "12px";

        element.style.border =
            "1px solid rgba(255,255,255,.12)";

        element.style.backdropFilter =
            "blur(18px)";

        element.style.webkitBackdropFilter =
            "blur(18px)";

        element.style.fontSize =
            "11px";

        element.style.fontWeight =
            "600";

        element.style.transition =
            "opacity .25s ease, transform .25s ease";

        document.body.appendChild(
            element
        );

    }


    if (type === "error") {

        element.style.background =
            "rgba(255,70,70,.12)";

        element.style.color =
            "#ff9b9b";

    } else {

        element.style.background =
            "rgba(126,226,173,.10)";

        element.style.color =
            "var(--success)";

    }


    element.textContent =
        message;

    element.style.opacity =
        "1";

    element.style.transform =
        "translateY(0)";


    clearTimeout(
        window.aerionSettingsMessageTimer
    );


    window.aerionSettingsMessageTimer =
        setTimeout(() => {

            element.style.opacity =
                "0";

            element.style.transform =
                "translateY(5px)";

        }, 2600);

}
