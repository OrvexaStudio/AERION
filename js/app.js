const AERION_STORAGE_KEY = "aerion_data";

const defaultData = {
    profile: {
        name: "Francesco",
        role: "PPL Student"
    },

    flight: {
        totalMinutes: 0,
        targetMinutes: 45 * 60
    },

    study: {
        totalMinutes: 0
    },

    theory: {},

    training: {
        completed: 0,
        total: 0
    },

    quizzes: [],

    simulator: [],

    goals: [],

    activity: []
};


/* =========================
   STORAGE
========================= */

function getAerionData() {

    const stored = localStorage.getItem(AERION_STORAGE_KEY);

    if (!stored) {
        localStorage.setItem(
            AERION_STORAGE_KEY,
            JSON.stringify(defaultData)
        );

        return structuredClone(defaultData);
    }

    try {
        return JSON.parse(stored);
    } catch (error) {

        console.error(
            "AERION storage error:",
            error
        );

        localStorage.setItem(
            AERION_STORAGE_KEY,
            JSON.stringify(defaultData)
        );

        return structuredClone(defaultData);
    }
}


function saveAerionData(data) {

    localStorage.setItem(
        AERION_STORAGE_KEY,
        JSON.stringify(data)
    );
}


/* =========================
   TIME
========================= */

function formatMinutes(totalMinutes) {

    const minutes = Number(totalMinutes) || 0;

    const hours = Math.floor(minutes / 60);

    const remainingMinutes = minutes % 60;

    return `${hours}:${String(remainingMinutes).padStart(2, "0")}`;
}


function formatStudyMinutes(totalMinutes) {

    const minutes = Number(totalMinutes) || 0;

    const hours = Math.floor(minutes / 60);

    const remainingMinutes = minutes % 60;

    return `${hours}h ${String(remainingMinutes).padStart(2, "0")}m`;
}


/* =========================
   THEORY
========================= */

function calculateTheoryProgress(data) {

    const subjects = Object.values(data.theory || {});

    if (!subjects.length) {
        return 0;
    }

    let totalTopics = 0;
    let completedTopics = 0;

    subjects.forEach(subject => {

        if (!subject.topics) {
            return;
        }

        subject.topics.forEach(topic => {

            totalTopics++;

            if (topic.status === "consolidated") {
                completedTopics++;
            }

        });

    });

    if (!totalTopics) {
        return 0;
    }

    return Math.round(
        (completedTopics / totalTopics) * 100
    );
}


/* =========================
   PPL OVERALL
========================= */

function calculateOverallProgress(data) {

    const theory = calculateTheoryProgress(data);

    const flight = Math.min(
        100,
        Math.round(
            (
                data.flight.totalMinutes /
                data.flight.targetMinutes
            ) * 100
        )
    );

    const training = data.training.total > 0
        ? Math.round(
            (
                data.training.completed /
                data.training.total
            ) * 100
        )
        : 0;

    return Math.round(
        (
            theory +
            flight +
            training
        ) / 3
    );
}


/* =========================
   DATE
========================= */

function updateDate() {

    const element =
        document.getElementById("currentDate");

    if (!element) {
        return;
    }

    const now = new Date();

    const formatter =
        new Intl.DateTimeFormat(
            "it-IT",
            {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

    element.textContent =
        formatter.format(now);
}


/* =========================
   DASHBOARD
========================= */

function updateDashboard() {

    const data = getAerionData();

    const theoryProgress =
        calculateTheoryProgress(data);

    const overallProgress =
        calculateOverallProgress(data);

    const flightHours =
        formatMinutes(
            data.flight.totalMinutes
        );

    const studyTime =
        formatStudyMinutes(
            data.study.totalMinutes
        );


    const overallElement =
        document.getElementById(
            "overallProgress"
        );

    if (overallElement) {
        overallElement.textContent =
            `${overallProgress}%`;
    }


    const progressBar =
        document.getElementById(
            "overallProgressBar"
        );

    if (progressBar) {
        progressBar.style.width =
            `${overallProgress}%`;
    }


    const flightHoursElement =
        document.getElementById(
            "flightHours"
        );

    if (flightHoursElement) {
        flightHoursElement.textContent =
            flightHours;
    }


    const metricFlight =
        document.getElementById(
            "metricFlightTime"
        );

    if (metricFlight) {
        metricFlight.textContent =
            flightHours;
    }


    const metricStudy =
        document.getElementById(
            "metricStudyTime"
        );

    if (metricStudy) {
        metricStudy.textContent =
            studyTime;
    }


    const metricTheory =
        document.getElementById(
            "metricTheory"
        );

    if (metricTheory) {
        metricTheory.textContent =
            `${theoryProgress}%`;
    }


    const metricTraining =
        document.getElementById(
            "metricTraining"
        );

    if (metricTraining) {

        const trainingProgress =
            data.training.total > 0
                ? Math.round(
                    (
                        data.training.completed /
                        data.training.total
                    ) * 100
                )
                : 0;

        metricTraining.textContent =
            `${trainingProgress}%`;
    }


    const theoryText =
        document.getElementById(
            "theoryProgressText"
        );

    if (theoryText) {
        theoryText.textContent =
            `Theory ${theoryProgress}%`;
    }


    renderRecentActivity(data);
}


/* =========================
   ACTIVITY
========================= */

function renderRecentActivity(data) {

    const container =
        document.getElementById(
            "recentActivity"
        );

    const count =
        document.getElementById(
            "activityCount"
        );

    if (!container) {
        return;
    }

    const activities =
        Array.isArray(data.activity)
            ? data.activity
            : [];


    if (count) {
        count.textContent =
            activities.length;
    }


    if (!activities.length) {

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">○</div>

                <strong>No activity yet</strong>

                <span>
                    Your training activity will appear here.
                </span>
            </div>
        `;

        return;
    }


    container.innerHTML =
        activities
            .slice(0, 8)
            .map(activity => {

                return `
                    <div class="activity-item">

                        <div class="activity-marker"></div>

                        <div class="activity-info">

                            <strong>
                                ${escapeHTML(activity.title)}
                            </strong>

                            <span>
                                ${escapeHTML(activity.description || "")}
                            </span>

                        </div>

                        <time>
                            ${escapeHTML(activity.date || "")}
                        </time>

                    </div>
                `;

            })
            .join("");
}


/* =========================
   SECURITY
========================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================
   INIT
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        getAerionData();

        updateDate();

        updateDashboard();

    }
);
