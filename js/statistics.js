/* =========================================================
   AERION — Statistics
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const data = getAerionData();

    updateProfile(data);
    updateDate();
    renderOverview(data);
    renderProgress(data);
    renderActivity(data);
    renderFlightStats(data);
    renderSubjectStats(data);

});


/* =========================================================
   PROFILE
   ========================================================= */

function updateProfile(data) {

    const name = data.profile?.name || "Francesco";

    const profileName = document.getElementById("profileName");
    const profileInitial = document.getElementById("profileInitial");

    if (profileName) {
        profileName.textContent = name;
    }

    if (profileInitial) {
        profileInitial.textContent = name.charAt(0).toUpperCase();
    }

}


/* =========================================================
   DATE
   ========================================================= */

function updateDate() {

    const element = document.getElementById("currentDate");

    if (!element) return;

    const now = new Date();

    element.textContent = now.toLocaleDateString("it-IT", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

}


/* =========================================================
   OVERVIEW
   ========================================================= */

function renderOverview(data) {

    const flightMinutes =
        Number(data.flight?.totalMinutes || 0);

    const studyMinutes =
        Number(data.study?.totalMinutes || 0);

    const simulatorMinutes =
        getSimulatorMinutes(data);

    const overall =
        calculateOverallProgress(data);

    const flightElement =
        document.getElementById("flightTime");

    const studyElement =
        document.getElementById("studyTime");

    const simulatorElement =
        document.getElementById("simulatorTime");

    const overallElement =
        document.getElementById("overallProgress");


    if (flightElement) {
        flightElement.textContent =
            formatHours(flightMinutes);
    }

    if (studyElement) {
        studyElement.textContent =
            formatHours(studyMinutes);
    }

    if (simulatorElement) {
        simulatorElement.textContent =
            formatHours(simulatorMinutes);
    }

    if (overallElement) {
        overallElement.textContent =
            `${overall}%`;
    }

}


/* =========================================================
   PROGRESS
   ========================================================= */

function renderProgress(data) {

    const theory =
        calculateTheoryProgress(data);

    const training =
        calculateTrainingProgress(data);

    const flight =
        calculateFlightProgress(data);

    const overall =
        calculateOverallProgress(data);


    setText("theoryProgress", `${theory}%`);
    setText("trainingProgress", `${training}%`);
    setText("flightProgress", `${flight}%`);
    setText("progressRingValue", `${overall}%`);


    setWidth("theoryBar", theory);
    setWidth("trainingBar", training);
    setWidth("flightBar", flight);


    const ring =
        document.querySelector(".progress-ring");

    if (ring) {

        const degrees =
            Math.round((overall / 100) * 360);

        ring.style.background =
            `conic-gradient(
                var(--accent) 0deg,
                var(--accent) ${degrees}deg,
                rgba(255,255,255,.07) ${degrees}deg,
                rgba(255,255,255,.07) 360deg
            )`;

    }

}


/* =========================================================
   THEORY
   ========================================================= */

function calculateTheoryProgress(data) {

    const theory = data.theory || {};

    const subjects = Object.values(theory);

    if (!subjects.length) {
        return 0;
    }

    let completed = 0;

    subjects.forEach(subject => {

        if (
            subject.status === "completed" ||
            subject.completed === true
        ) {
            completed++;
        }

    });

    return Math.round(
        (completed / subjects.length) * 100
    );

}


/* =========================================================
   TRAINING
   ========================================================= */

function calculateTrainingProgress(data) {

    const training = data.training || {};

    if (
        Number.isFinite(Number(training.total)) &&
        Number(training.total) > 0
    ) {

        return Math.round(
            (Number(training.completed || 0) /
            Number(training.total)) * 100
        );

    }


    const skills =
        Array.isArray(training.skills)
            ? training.skills
            : [];


    if (!skills.length) {
        return 0;
    }


    const completed =
        skills.filter(skill =>
            skill.status === "completed"
        ).length;


    return Math.round(
        (completed / skills.length) * 100
    );

}


/* =========================================================
   FLIGHT
   ========================================================= */

function calculateFlightProgress(data) {

    const current =
        Number(data.flight?.totalMinutes || 0);

    const target =
        Number(data.flight?.targetMinutes || (45 * 60));

    if (target <= 0) {
        return 0;
    }

    return Math.min(
        100,
        Math.round((current / target) * 100)
    );

}


/* =========================================================
   OVERALL
   ========================================================= */

function calculateOverallProgress(data) {

    const theory =
        calculateTheoryProgress(data);

    const training =
        calculateTrainingProgress(data);

    const flight =
        calculateFlightProgress(data);


    return Math.round(
        (theory + training + flight) / 3
    );

}


/* =========================================================
   ACTIVITY
   ========================================================= */

function renderActivity(data) {

    const container =
        document.getElementById("activityStats");

    if (!container) return;


    const activity =
        Array.isArray(data.activity)
            ? [...data.activity]
            : [];


    if (!activity.length) {

        container.innerHTML = `
            <div class="statistics-empty">
                Nessuna attività registrata.
            </div>
        `;

        return;
    }


    activity.sort((a, b) => {

        const dateA =
            new Date(a.date || a.createdAt || 0);

        const dateB =
            new Date(b.date || b.createdAt || 0);

        return dateB - dateA;

    });


    const latest =
        activity.slice(0, 6);


    container.innerHTML =
        latest.map(item => {

            const type =
                item.type ||
                item.category ||
                "activity";


            const title =
                item.title ||
                item.name ||
                getActivityTitle(type);


            const value =
                item.value ||
                item.duration ||
                "";


            const date =
                formatActivityDate(
                    item.date ||
                    item.createdAt
                );


            return `
                <div class="activity-stat">

                    <div class="activity-icon">
                        ${getActivityIcon(type)}
                    </div>

                    <div class="activity-info">
                        <strong>${escapeHTML(title)}</strong>
                        <span>${escapeHTML(date)}</span>
                    </div>

                    <div class="activity-value">
                        ${escapeHTML(String(value))}
                    </div>

                </div>
            `;

        }).join("");

}


/* =========================================================
   FLIGHT STATS
   ========================================================= */

function renderFlightStats(data) {

    const container =
        document.getElementById("flightStats");

    if (!container) return;


    const flights =
        Array.isArray(data.flights)
            ? data.flights
            : [];


    const totalMinutes =
        Number(data.flight?.totalMinutes || 0);


    const totalFlights =
        flights.length;


    const average =
        totalFlights > 0
            ? Math.round(totalMinutes / totalFlights)
            : 0;


    const longest =
        flights.reduce(
            (max, flight) =>
                Math.max(
                    max,
                    Number(flight.durationMinutes || 0)
                ),
            0
        );


    const soloFlights =
        flights.filter(flight =>
            String(flight.type || "")
                .toLowerCase()
                .includes("solo")
        ).length;


    container.innerHTML = `

        <div class="flight-stat">

            <span class="flight-stat-label">
                TOTAL FLIGHTS
            </span>

            <strong>
                ${totalFlights}
            </strong>

            <small>
                voli registrati
            </small>

        </div>


        <div class="flight-stat">

            <span class="flight-stat-label">
                AVERAGE
            </span>

            <strong>
                ${formatHours(average)}
            </strong>

            <small>
                durata media
            </small>

        </div>


        <div class="flight-stat">

            <span class="flight-stat-label">
                LONGEST FLIGHT
            </span>

            <strong>
                ${formatHours(longest)}
            </strong>

            <small>
                volo più lungo
            </small>

        </div>


        <div class="flight-stat">

            <span class="flight-stat-label">
                SOLO
            </span>

            <strong>
                ${soloFlights}
            </strong>

            <small>
                voli solo
            </small>

        </div>


        <div class="flight-stat">

            <span class="flight-stat-label">
                PPL TARGET
            </span>

            <strong>
                ${formatHours(totalMinutes)}
            </strong>

            <small>
                su ${formatHours(
                    Number(data.flight?.targetMinutes || 2700)
                )}
            </small>

        </div>


        <div class="flight-stat">

            <span class="flight-stat-label">
                REMAINING
            </span>

            <strong>
                ${formatHours(
                    Math.max(
                        0,
                        Number(data.flight?.targetMinutes || 2700)
                        - totalMinutes
                    )
                )}
            </strong>

            <small>
                al completamento PPL
            </small>

        </div>

    `;

}


/* =========================================================
   SUBJECTS
   ========================================================= */

function renderSubjectStats(data) {

    const container =
        document.getElementById("subjectStats");

    if (!container) return;


    const theory =
        data.theory || {};

    const subjects =
        Object.values(theory);


    if (!subjects.length) {

        container.innerHTML = `
            <div class="statistics-empty">
                Nessun dato teorico disponibile.
            </div>
        `;

        return;
    }


    container.innerHTML =
        subjects.map(subject => {

            const percentage =
                getSubjectProgress(subject);


            return `
                <div class="subject-row">

                    <span class="subject-name">
                        ${escapeHTML(
                            subject.name || "Materia"
                        )}
                    </span>

                    <div class="subject-track">
                        <div
                            class="subject-fill"
                            style="width:${percentage}%"
                        ></div>
                    </div>

                    <span class="subject-percentage">
                        ${percentage}%
                    </span>

                </div>
            `;

        }).join("");

}


/* =========================================================
   SUBJECT PROGRESS
   ========================================================= */

function getSubjectProgress(subject) {

    if (!subject) {
        return 0;
    }


    if (
        subject.status === "completed" ||
        subject.completed === true
    ) {
        return 100;
    }


    if (
        typeof subject.progress === "number"
    ) {
        return Math.max(
            0,
            Math.min(100, Math.round(subject.progress))
        );
    }


    if (
        typeof subject.confidence === "number"
    ) {
        return Math.max(
            0,
            Math.min(100, Math.round(subject.confidence))
        );
    }


    return 0;

}


/* =========================================================
   SIMULATOR
   ========================================================= */

function getSimulatorMinutes(data) {

    const sessions =
        Array.isArray(data.simulatorSessions)
            ? data.simulatorSessions
            : Array.isArray(data.simulator)
                ? data.simulator
                : [];


    return sessions.reduce(
        (total, session) =>
            total +
            Number(
                session.durationMinutes ||
                session.duration ||
                0
            ),
        0
    );

}


/* =========================================================
   HELPERS
   ========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }

}


function setWidth(id, percentage) {

    const element =
        document.getElementById(id);

    if (element) {
        element.style.width =
            `${Math.max(
                0,
                Math.min(100, percentage)
            )}%`;
    }

}


function formatHours(minutes) {

    const total =
        Math.max(0, Number(minutes) || 0);

    const hours =
        Math.floor(total / 60);

    const mins =
        total % 60;


    return `${hours}:${String(mins).padStart(2, "0")}`;

}


function formatActivityDate(value) {

    if (!value) {
        return "Data non disponibile";
    }


    const date =
        new Date(value);


    if (Number.isNaN(date.getTime())) {
        return "Data non disponibile";
    }


    return date.toLocaleDateString(
        "it-IT",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function getActivityTitle(type) {

    const titles = {
        flight: "Volo registrato",
        theory: "Studio teorico",
        training: "Training completato",
        quiz: "Quiz completato",
        simulator: "Sessione simulatore",
        goal: "Obiettivo aggiornato"
    };


    return titles[type] || "Attività registrata";

}


function getActivityIcon(type) {

    const icons = {
        flight: "✈",
        theory: "▣",
        training: "◉",
        quiz: "✓",
        simulator: "▸",
        goal: "◎"
    };


    return icons[type] || "•";

}


function escapeHTML(value) {

    if (
        typeof window.escapeHTML === "function"
    ) {
        return window.escapeHTML(value);
    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
