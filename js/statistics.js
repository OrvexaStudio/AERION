/* =========================================================
   AERION — Statistics
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const data = getAerionData();

    renderProfile(data);
    renderStatistics(data);

});


/* =========================================================
   MAIN
========================================================= */

function renderStatistics(data) {

    renderOverview(data);

    renderProgress(data);

    renderActivity(data);

    renderFlightStats(data);

    renderSubjectStats(data);

}


/* =========================================================
   PROFILE
========================================================= */

function renderProfile(data) {

    const name =
        data.profile?.name || "Francesco";

    const profileName =
        document.getElementById("profileName");

    const profileInitial =
        document.getElementById("profileInitial");

    if (profileName) {
        profileName.textContent = name;
    }

    if (profileInitial) {
        profileInitial.textContent =
            name.charAt(0).toUpperCase();
    }

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


    setText(
        "flightTime",
        formatMinutes(flightMinutes)
    );

    setText(
        "studyTime",
        formatMinutes(studyMinutes)
    );

    setText(
        "simulatorTime",
        formatMinutes(simulatorMinutes)
    );

    setText(
        "overallProgress",
        `${overall}%`
    );

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


    setText(
        "theoryProgress",
        `${theory}%`
    );

    setText(
        "trainingProgress",
        `${training}%`
    );

    setText(
        "flightProgress",
        `${flight}%`
    );

    setText(
        "progressRingValue",
        `${overall}%`
    );


    setWidth(
        "theoryBar",
        theory
    );

    setWidth(
        "trainingBar",
        training
    );

    setWidth(
        "flightBar",
        flight
    );


    updateProgressRing(overall);

}


/* =========================================================
   TRAINING PROGRESS
========================================================= */

function calculateTrainingProgress(data) {

    const training =
        data.training || {};

    const total =
        Number(training.total || 0);

    const completed =
        Number(training.completed || 0);


    if (total <= 0) {
        return 0;
    }


    return Math.min(
        100,
        Math.round(
            (completed / total) * 100
        )
    );

}


/* =========================================================
   FLIGHT PROGRESS
========================================================= */

function calculateFlightProgress(data) {

    const current =
        Number(data.flight?.totalMinutes || 0);

    const target =
        Number(
            data.flight?.targetMinutes ||
            45 * 60
        );


    if (target <= 0) {
        return 0;
    }


    return Math.min(
        100,
        Math.round(
            (current / target) * 100
        )
    );

}


/* =========================================================
   PROGRESS RING
========================================================= */

function updateProgressRing(progress) {

    const ring =
        document.querySelector(".progress-ring");

    if (!ring) {
        return;
    }


    const value =
        Math.max(
            0,
            Math.min(100, progress)
        );


    const degrees =
        Math.round(
            (value / 100) * 360
        );


    ring.style.background =
        `
        conic-gradient(
            var(--accent) 0deg,
            var(--accent) ${degrees}deg,
            rgba(255,255,255,.07) ${degrees}deg,
            rgba(255,255,255,.07) 360deg
        )
        `;

}


/* =========================================================
   ACTIVITY
========================================================= */

function renderActivity(data) {

    const container =
        document.getElementById(
            "activityStats"
        );


    if (!container) {
        return;
    }


    const activities =
        Array.isArray(data.activity)
            ? [...data.activity]
            : [];


    if (!activities.length) {

        container.innerHTML = `
            <div class="statistics-empty">
                Nessuna attività registrata.
            </div>
        `;

        return;
    }


    activities.sort((a, b) => {

        const dateA =
            new Date(
                a.date ||
                a.createdAt ||
                0
            );

        const dateB =
            new Date(
                b.date ||
                b.createdAt ||
                0
            );

        return dateB - dateA;

    });


    container.innerHTML =
        activities
            .slice(0, 6)
            .map(activity => {

                const title =
                    activity.title ||
                    "Attività registrata";

                const description =
                    activity.description ||
                    "";

                const date =
                    activity.date ||
                    activity.createdAt ||
                    "";


                return `
                    <div class="activity-stat">

                        <div class="activity-icon">
                            •
                        </div>

                        <div class="activity-info">

                            <strong>
                                ${escapeHTML(title)}
                            </strong>

                            <span>
                                ${escapeHTML(
                                    description ||
                                    formatActivityDate(date)
                                )}
                            </span>

                        </div>

                        <div class="activity-value">
                            ${escapeHTML(
                                formatActivityDate(date)
                            )}
                        </div>

                    </div>
                `;

            })
            .join("");

}


/* =========================================================
   FLIGHT STATISTICS
========================================================= */

function renderFlightStats(data) {

    const container =
        document.getElementById(
            "flightStats"
        );


    if (!container) {
        return;
    }


    const flights =
        Array.isArray(data.flights)
            ? data.flights
            : [];


    const totalMinutes =
        Number(
            data.flight?.totalMinutes || 0
        );


    const targetMinutes =
        Number(
            data.flight?.targetMinutes ||
            45 * 60
        );


    const totalFlights =
        flights.length;


    const average =
        totalFlights > 0
            ? Math.round(
                totalMinutes /
                totalFlights
            )
            : 0;


    const longest =
        flights.reduce(
            (maximum, flight) => {

                return Math.max(
                    maximum,
                    Number(
                        flight.durationMinutes || 0
                    )
                );

            },
            0
        );


    const soloFlights =
        flights.filter(flight => {

            return String(
                flight.type || ""
            )
            .toLowerCase()
            .includes("solo");

        }).length;


    const remaining =
        Math.max(
            0,
            targetMinutes -
            totalMinutes
        );


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
                ${formatMinutes(average)}
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
                ${formatMinutes(longest)}
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
                ${formatMinutes(totalMinutes)}
            </strong>

            <small>
                su ${formatMinutes(targetMinutes)}
            </small>

        </div>


        <div class="flight-stat">

            <span class="flight-stat-label">
                REMAINING
            </span>

            <strong>
                ${formatMinutes(remaining)}
            </strong>

            <small>
                al completamento PPL
            </small>

        </div>

    `;

}


/* =========================================================
   THEORY SUBJECTS
========================================================= */

function renderSubjectStats(data) {

    const container =
        document.getElementById(
            "subjectStats"
        );


    if (!container) {
        return;
    }


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
        subjects
            .map(subject => {

                const topics =
                    Array.isArray(subject.topics)
                        ? subject.topics
                        : [];


                const total =
                    topics.length;


                const completed =
                    topics.filter(
                        topic =>
                            topic.status ===
                            "consolidated"
                    ).length;


                const percentage =
                    total > 0
                        ? Math.round(
                            (completed / total) * 100
                        )
                        : 0;


                return `
                    <div class="subject-row">

                        <span class="subject-name">
                            ${escapeHTML(
                                subject.name ||
                                "Materia"
                            )}
                        </span>

                        <div class="subject-track">

                            <div
                                class="subject-fill"
                                style="
                                    width:${percentage}%;
                                "
                            ></div>

                        </div>

                        <span class="subject-percentage">
                            ${percentage}%
                        </span>

                    </div>
                `;

            })
            .join("");

}


/* =========================================================
   SIMULATOR
========================================================= */

function getSimulatorMinutes(data) {

    const sessions =
        Array.isArray(data.simulator)
            ? data.simulator
            : [];


    return sessions.reduce(
        (total, session) => {

            return total +
                Number(
                    session.durationMinutes ||
                    session.duration ||
                    0
                );

        },
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


function setWidth(id, value) {

    const element =
        document.getElementById(id);

    if (!element) {
        return;
    }


    element.style.width =
        `${Math.max(
            0,
            Math.min(100, value)
        )}%`;

}


function formatActivityDate(value) {

    if (!value) {
        return "Data non disponibile";
    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return String(value);
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
