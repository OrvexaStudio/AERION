/* =========================================================
   AERION — Simulator
   ========================================================= */

const STORAGE_KEY = "aerion_data";
const SIMULATOR_KEY = "simulatorSessions";

const FOCUS_LABELS = {
    "Procedure": "Procedure",
    "Navigation": "Navigazione",
    "Take-off": "Decollo",
    "Landing": "Atterraggio",
    "Emergency": "Emergenze",
    "Aircraft Handling": "Aircraft Handling",
    "IFR": "IFR",
    "VFR": "VFR"
};


/* =========================================================
   STORAGE
   ========================================================= */

function getData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            return JSON.parse(saved);
        }
    } catch (error) {
        console.error("Errore lettura dati AERION:", error);
    }

    return {
        profile: {
            name: "Francesco",
            role: "PPL Student"
        }
    };
}


function saveData(data) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}


function getSessions() {
    const data = getData();

    if (!Array.isArray(data[SIMULATOR_KEY])) {
        data[SIMULATOR_KEY] = [];
        saveData(data);
    }

    return data[SIMULATOR_KEY];
}


function saveSessions(sessions) {
    const data = getData();

    data[SIMULATOR_KEY] = sessions;

    saveData(data);
}


/* =========================================================
   HELPERS
   ========================================================= */

function parseDuration(value) {

    if (!value) {
        return 0;
    }

    const text = String(value).trim();

    const match = text.match(/^(\d+)\s*:\s*(\d{1,2})$/);

    if (match) {
        const hours = Number(match[1]);
        const minutes = Number(match[2]);

        if (minutes >= 60) {
            return 0;
        }

        return hours * 60 + minutes;
    }

    const decimal = Number(
        text.replace(",", ".")
    );

    if (!Number.isNaN(decimal) && decimal > 0) {
        return Math.round(decimal * 60);
    }

    return 0;
}


function formatDuration(minutes) {

    const total = Math.max(
        0,
        Number(minutes) || 0
    );

    const hours = Math.floor(total / 60);
    const mins = total % 60;

    return `${hours}:${String(mins).padStart(2, "0")}`;
}


function formatDate(dateString) {

    if (!dateString) {
        return "—";
    }

    const date = new Date(
        `${dateString}T12:00:00`
    );

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString(
        "it-IT",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );
}


function formatShortDate(dateString) {

    if (!dateString) {
        return "—";
    }

    const date = new Date(
        `${dateString}T12:00:00`
    );

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString(
        "it-IT",
        {
            day: "2-digit",
            month: "2-digit"
        }
    );
}


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   PROFILE / DATE
   ========================================================= */

function renderProfile() {

    const data = getData();

    const name =
        data.profile?.name ||
        "Francesco";

    const initial =
        name.charAt(0).toUpperCase();

    const nameElement =
        document.getElementById("profileName");

    const initialElement =
        document.getElementById("profileInitial");

    if (nameElement) {
        nameElement.textContent = name;
    }

    if (initialElement) {
        initialElement.textContent = initial;
    }
}


function renderDate() {

    const element =
        document.getElementById("currentDate");

    if (!element) {
        return;
    }

    const today = new Date();

    element.textContent =
        today.toLocaleDateString(
            "it-IT",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );
}


/* =========================================================
   SUMMARY
   ========================================================= */

function renderSummary() {

    const sessions = getSessions();

    const totalMinutes =
        sessions.reduce(
            (total, session) =>
                total +
                Number(session.durationMinutes || 0),
            0
        );

    const sessionCount =
        document.getElementById("sessionCount");

    const totalTime =
        document.getElementById("totalSimulatorTime");

    const summaryTime =
        document.getElementById("summaryTime");

    const lastSession =
        document.getElementById("lastSession");

    const mainFocus =
        document.getElementById("mainFocus");

    const historyCount =
        document.getElementById("historyCount");


    if (sessionCount) {
        sessionCount.textContent =
            sessions.length;
    }

    if (totalTime) {
        totalTime.textContent =
            formatDuration(totalMinutes);
    }

    if (summaryTime) {
        summaryTime.textContent =
            formatDuration(totalMinutes);
    }

    if (historyCount) {
        historyCount.textContent =
            sessions.length;
    }


    const sorted = [...sessions].sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );


    if (lastSession) {

        lastSession.textContent =
            sorted.length
                ? formatShortDate(sorted[0].date)
                : "—";
    }


    const focusCounts = {};

    sessions.forEach(session => {

        const focus = session.focus;

        if (!focus) {
            return;
        }

        focusCounts[focus] =
            (focusCounts[focus] || 0) + 1;
    });


    const focusEntries =
        Object.entries(focusCounts)
            .sort((a, b) => b[1] - a[1]);


    if (mainFocus) {

        mainFocus.textContent =
            focusEntries.length
                ? FOCUS_LABELS[focusEntries[0][0]] ||
                  focusEntries[0][0]
                : "—";
    }
}


/* =========================================================
   FOCUS BREAKDOWN
   ========================================================= */

function renderFocusBreakdown() {

    const container =
        document.getElementById("focusBreakdown");

    if (!container) {
        return;
    }

    const sessions = getSessions();

    if (!sessions.length) {

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">○</div>

                <strong>Nessun dato</strong>

                <span>
                    Registra una sessione per vedere
                    le aree allenate.
                </span>
            </div>
        `;

        return;
    }


    const counts = {};

    sessions.forEach(session => {

        if (!session.focus) {
            return;
        }

        counts[session.focus] =
            (counts[session.focus] || 0) + 1;
    });


    const entries =
        Object.entries(counts)
            .sort((a, b) => b[1] - a[1]);


    if (!entries.length) {

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">○</div>

                <strong>Nessun focus registrato</strong>

                <span>
                    Specifica un'area di allenamento
                    nelle tue sessioni.
                </span>
            </div>
        `;

        return;
    }


    const max =
        Math.max(
            ...entries.map(entry => entry[1])
        );


    container.innerHTML =
        entries.map(
            ([focus, count]) => {

                const percentage =
                    Math.round(
                        (count / max) * 100
                    );

                return `
                    <div class="focus-item">

                        <div class="focus-info">

                            <div class="focus-name">

                                <span>
                                    ${escapeHTML(
                                        FOCUS_LABELS[focus] ||
                                        focus
                                    )}
                                </span>

                                <span>
                                    ${count}
                                    ${count === 1 ? "sessione" : "sessioni"}
                                </span>

                            </div>

                            <div class="focus-track">

                                <div
                                    class="focus-fill"
                                    style="width:${percentage}%"
                                ></div>

                            </div>

                        </div>

                    </div>
                `;
            }
        )
        .join("");
}


/* =========================================================
   HISTORY
   ========================================================= */

function renderHistory() {

    const container =
        document.getElementById("simulatorHistory");

    if (!container) {
        return;
    }

    const sessions =
        [...getSessions()].sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        );


    if (!sessions.length) {

        container.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ○
                </div>

                <strong>
                    Nessuna sessione registrata
                </strong>

                <span>
                    Le tue sessioni al simulatore
                    appariranno qui.
                </span>

            </div>
        `;

        return;
    }


    container.innerHTML =
        sessions.map(session => {

            const simulator =
                session.simulatorType || "Simulator";

            const aircraft =
                session.aircraft || "Aircraft";

            const route =
                session.route || "Nessuna rotta";

            const focus =
                FOCUS_LABELS[session.focus] ||
                session.focus ||
                "Training";


            return `
                <article
                    class="simulator-session"
                    data-id="${escapeHTML(session.id)}"
                >

                    <div class="session-date">
                        ${formatDate(session.date)}
                    </div>


                    <div class="session-main">

                        <div class="session-title">

                            <strong>
                                ${escapeHTML(aircraft)}
                            </strong>

                            <span class="session-type">
                                ${escapeHTML(simulator)}
                            </span>

                        </div>

                        <div class="session-route">
                            ${escapeHTML(route)}
                        </div>

                    </div>


                    <span class="session-focus">
                        ${escapeHTML(focus)}
                    </span>


                    <span class="session-duration">
                        ${formatDuration(
                            session.durationMinutes
                        )}
                    </span>


                    <button
                        type="button"
                        class="delete-session"
                        data-id="${escapeHTML(session.id)}"
                        title="Elimina sessione"
                        aria-label="Elimina sessione"
                    >
                        ×
                    </button>

                </article>
            `;
        })
        .join("");
}


/* =========================================================
   FORM
   ========================================================= */

function setDefaultDate() {

    const input =
        document.getElementById("sessionDate");

    if (!input) {
        return;
    }

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(today.getDate())
            .padStart(2, "0");

    input.value =
        `${year}-${month}-${day}`;
}


function handleFormSubmit(event) {

    event.preventDefault();

    const date =
        document.getElementById("sessionDate").value;

    const simulatorType =
        document.getElementById("simulatorType").value;

    const aircraft =
        document.getElementById("aircraft").value.trim();

    const durationInput =
        document.getElementById("duration").value.trim();

    const route =
        document.getElementById("route").value.trim();

    const focus =
        document.getElementById("focus").value;

    const notes =
        document.getElementById("sessionNotes").value.trim();


    const durationMinutes =
        parseDuration(durationInput);


    if (!date ||
        !simulatorType ||
        !aircraft ||
        !focus) {

        alert(
            "Compila tutti i campi obbligatori."
        );

        return;
    }


    if (durationMinutes <= 0) {

        alert(
            "Inserisci una durata valida, ad esempio 1:30."
        );

        return;
    }


    const session = {

        id:
            `sim-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`,

        date,

        simulatorType,

        aircraft,

        durationMinutes,

        route,

        focus,

        notes,

        createdAt:
            new Date().toISOString()

    };


    const sessions =
        getSessions();

    sessions.push(session);

    saveSessions(sessions);


    event.target.reset();

    setDefaultDate();

    renderAll();


    if (typeof updateDashboard === "function") {
        updateDashboard();
    }
}


/* =========================================================
   DELETE
   ========================================================= */

function deleteSession(id) {

    const sessions =
        getSessions();

    const session =
        sessions.find(
            item => item.id === id
        );

    if (!session) {
        return;
    }


    const confirmed =
        confirm(
            "Vuoi eliminare questa sessione?"
        );

    if (!confirmed) {
        return;
    }


    const updated =
        sessions.filter(
            item => item.id !== id
        );

    saveSessions(updated);

    renderAll();
}


function handleHistoryClick(event) {

    const button =
        event.target.closest(
            ".delete-session"
        );

    if (!button) {
        return;
    }

    const id =
        button.dataset.id;

    deleteSession(id);
}


/* =========================================================
   RENDER
   ========================================================= */

function renderAll() {

    renderProfile();

    renderDate();

    renderSummary();

    renderFocusBreakdown();

    renderHistory();
}


/* =========================================================
   INIT
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderAll();

        setDefaultDate();


        const form =
            document.getElementById(
                "simulatorForm"
            );

        if (form) {
            form.addEventListener(
                "submit",
                handleFormSubmit
            );
        }


        const history =
            document.getElementById(
                "simulatorHistory"
            );

        if (history) {
            history.addEventListener(
                "click",
                handleHistoryClick
            );
        }

    }
);
