const STORAGE_KEY = "aerion_data";


const PPL_SUBJECTS = [

    {
        id: "air-law",
        code: "01",
        name: "Air Law",
        topics: [

            "International law",
            "ICAO and international aviation framework",
            "Rules of the Air",
            "General rules",
            "Visual flight rules",
            "Instrument flight rules",
            "Airspace classification",
            "Controlled and uncontrolled airspace",
            "Air traffic services",
            "Aircraft documents",
            "Pilot licensing",
            "Pilot responsibilities",
            "Aircraft registration",
            "Flight plans",
            "Right of way",
            "Signals and markings",
            "Aerodrome operations",
            "Rules regarding aircraft operations"

        ]
    },


    {
        id: "human-performance",
        code: "02",
        name: "Human Performance",
        topics: [

            "Human factors",
            "Human information processing",
            "Attention",
            "Memory",
            "Decision making",
            "Situational awareness",
            "Stress",
            "Fatigue",
            "Sleep",
            "Workload",
            "Alcohol",
            "Drugs and medication",
            "Vision",
            "Hearing",
            "Spatial orientation",
            "Spatial disorientation",
            "Motion sickness",
            "Hypoxia",
            "Hyperventilation",
            "Carbon monoxide",
            "G-forces",
            "Temperature effects",
            "Pilot fitness"

        ]
    },


    {
        id: "meteorology",
        code: "03",
        name: "Meteorology",
        topics: [

            "The atmosphere",
            "Atmospheric composition",
            "Atmospheric pressure",
            "Temperature",
            "Temperature lapse rate",
            "Pressure systems",
            "Altimetry",
            "Wind",
            "Wind measurement",
            "Surface wind",
            "Upper winds",
            "Turbulence",
            "Convection",
            "Cloud formation",
            "Cloud classification",
            "Visibility",
            "Precipitation",
            "Fog",
            "Mist and haze",
            "Air masses",
            "Weather fronts",
            "Warm fronts",
            "Cold fronts",
            "Occluded fronts",
            "Thunderstorms",
            "Icing",
            "Freezing level",
            "Mountain waves",
            "Jet streams",
            "Weather hazards",
            "METAR",
            "TAF",
            "SIGMET",
            "Weather charts",
            "Weather radar",
            "Satellite imagery",
            "Meteorological briefing"

        ]
    },


    {
        id: "communications",
        code: "04",
        name: "Communications",
        topics: [

            "Radio communication principles",
            "VHF communication",
            "Radio frequencies",
            "Aviation phonetic alphabet",
            "Numbers and pronunciation",
            "Standard phraseology",
            "Call signs",
            "ATC communication",
            "Ground communication",
            "Tower communication",
            "Approach communication",
            "Area communication",
            "ATC clearances",
            "Readback",
            "Transponder codes",
            "Emergency communication",
            "Distress calls",
            "Urgency calls",
            "Communication failure",
            "Radio discipline"

        ]
    },


    {
        id: "principles-of-flight",
        code: "05",
        name: "Principles of Flight",
        topics: [

            "Basic aerodynamics",
            "Atmospheric effects on flight",
            "Airflow",
            "Pressure distribution",
            "Lift",
            "Weight",
            "Thrust",
            "Drag",
            "Parasite drag",
            "Induced drag",
            "Angle of attack",
            "Stall",
            "Stall speed",
            "Load factor",
            "Manoeuvring speed",
            "Centre of gravity",
            "Stability",
            "Longitudinal stability",
            "Lateral stability",
            "Directional stability",
            "Flight controls",
            "Ailerons",
            "Elevator",
            "Rudder",
            "Trim",
            "Flaps",
            "Turns",
            "Climbing flight",
            "Descending flight",
            "Gliding flight",
            "Flight envelope"

        ]
    },


    {
        id: "operational-procedures",
        code: "06",
        name: "Operational Procedures",
        topics: [

            "General operating procedures",
            "Pre-flight preparation",
            "Aircraft inspection",
            "Checklists",
            "Normal procedures",
            "Abnormal procedures",
            "Emergency procedures",
            "Passenger safety",
            "Passenger briefing",
            "Fuel management",
            "Fire procedures",
            "Engine failure",
            "Forced landing",
            "Precautionary landing",
            "Emergency equipment",
            "Survival equipment",
            "Ditching",
            "Wake turbulence",
            "Bird strike",
            "Dangerous goods",
            "Safety procedures",
            "Accident prevention",
            "Occurrence reporting"

        ]
    },


    {
        id: "flight-performance",
        code: "07",
        name: "Flight Performance & Planning",
        topics: [

            "Aircraft mass",
            "Aircraft balance",
            "Centre of gravity",
            "Weight and balance calculations",
            "Aircraft performance",
            "Take-off performance",
            "Landing performance",
            "Climb performance",
            "Cruise performance",
            "Descent performance",
            "Density altitude",
            "Pressure altitude",
            "Temperature effects",
            "Runway effects",
            "Wind effects",
            "Fuel consumption",
            "Fuel reserves",
            "Fuel planning",
            "Endurance",
            "Range",
            "Flight planning",
            "Operational flight plan",
            "Performance calculations"

        ]
    },


    {
        id: "aircraft-general-knowledge",
        code: "08",
        name: "Aircraft General Knowledge",
        topics: [

            "Aircraft structure",
            "Fuselage",
            "Wings",
            "Empennage",
            "Flight controls",
            "Landing gear",
            "Engine fundamentals",
            "Piston engines",
            "Engine operation",
            "Engine limitations",
            "Propellers",
            "Propeller operation",
            "Fuel system",
            "Fuel tanks",
            "Fuel pumps",
            "Oil system",
            "Electrical system",
            "Battery",
            "Alternator",
            "Hydraulic systems",
            "Pitot-static system",
            "Airspeed indicator",
            "Altimeter",
            "Vertical speed indicator",
            "Magnetic compass",
            "Gyroscopic instruments",
            "Vacuum systems",
            "Avionics",
            "Aircraft limitations",
            "Aircraft documentation"

        ]
    },


    {
        id: "navigation",
        code: "09",
        name: "Navigation",
        topics: [

            "Shape and movement of the Earth",
            "Latitude",
            "Longitude",
            "Coordinates",
            "Great circles",
            "Rhumb lines",
            "Time systems",
            "UTC",
            "Local time",
            "Magnetic variation",
            "Magnetic deviation",
            "Aeronautical charts",
            "Chart symbols",
            "Chart scale",
            "Distance measurement",
            "Direction",
            "Track",
            "Heading",
            "Bearing",
            "Relative bearing",
            "True north",
            "Magnetic north",
            "True heading",
            "Magnetic heading",
            "Airspeed",
            "IAS",
            "TAS",
            "GS",
            "Wind",
            "Wind triangle",
            "Drift",
            "Dead reckoning",
            "Position fixing",
            "Radio navigation",
            "VOR",
            "NDB",
            "ADF",
            "GNSS",
            "GPS principles",
            "Navigation planning",
            "Diversion procedures",
            "Navigation logs"

        ]
    }

];


/* =========================
   DATA
========================= */

function getData() {

    const stored =
        localStorage.getItem(STORAGE_KEY);

    let data;

    try {

        data = stored
            ? JSON.parse(stored)
            : {};

    } catch {

        data = {};

    }


    if (!data.theory) {
        data.theory = {};
    }


    PPL_SUBJECTS.forEach(subject => {

        if (!data.theory[subject.id]) {

            data.theory[subject.id] = {

                id: subject.id,

                name: subject.name,

                topics: subject.topics.map(
                    (name, index) => ({
                        id: `${subject.id}-${index}`,
                        name,
                        status: "not-started",
                        studyMinutes: 0,
                        reviews: 0,
                        confidence: 0,
                        lastStudied: null
                    })
                )

            };

        }

    });


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );


    return data;
}


function saveData(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}


/* =========================
   PROGRESS
========================= */

function getSubjectProgress(subject) {

    if (!subject.topics.length) {
        return 0;
    }


    const completed =
        subject.topics.filter(
            topic =>
                topic.status === "consolidated"
        ).length;


    return Math.round(
        (
            completed /
            subject.topics.length
        ) * 100
    );

}


function getTheoryStats(data) {

    let total = 0;

    let completed = 0;


    Object.values(data.theory)
        .forEach(subject => {

            subject.topics.forEach(topic => {

                total++;

                if (
                    topic.status ===
                    "consolidated"
                ) {
                    completed++;
                }

            });

        });


    return {
        total,
        completed,
        percentage: total
            ? Math.round(
                (completed / total) * 100
            )
            : 0
    };

}


/* =========================
   RENDER
========================= */

function renderSubjects() {

    const data = getData();

    const container =
        document.getElementById(
            "subjectsContainer"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        PPL_SUBJECTS
            .map((definition, index) => {

                const subject =
                    data.theory[
                        definition.id
                    ];

                const progress =
                    getSubjectProgress(
                        subject
                    );


                return `

                    <section
                        class="subject glass"
                        data-subject="${subject.id}"
                    >

                        <button
                            class="subject-header"
                            type="button"
                        >

                            <div class="subject-number">
                                ${definition.code}
                            </div>


                            <div class="subject-main">

                                <div class="subject-title">
                                    ${subject.name}
                                </div>

                                <div class="subject-meta">
                                    ${subject.topics.length}
                                    topics
                                </div>

                            </div>


                            <div class="subject-percentage">
                                ${progress}%
                            </div>


                            <div class="subject-chevron">
                                ›
                            </div>

                        </button>


                        <div class="subject-body">

                            <div class="subject-progress">

                                <div
                                    style="width:${progress}%"
                                ></div>

                            </div>


                            <div class="topic-list">

                                ${subject.topics
                                    .map(topic => `

                                        <div
                                            class="topic ${
                                                topic.status ===
                                                "consolidated"
                                                    ? "completed"
                                                    : ""
                                            }"
                                            data-topic-id="${topic.id}"
                                            data-subject-id="${subject.id}"
                                        >

                                            <div
                                                class="topic-checkbox"
                                            >
                                                ✓
                                            </div>

                                            <div class="topic-name">
                                                ${topic.name}
                                            </div>

                                        </div>

                                    `)
                                    .join("")}

                            </div>

                        </div>

                    </section>

                `;

            })
            .join("");


    setupSubjectEvents();

    updateTheoryHeader(data);

}


/* =========================
   EVENTS
========================= */

function setupSubjectEvents() {

    document
        .querySelectorAll(".subject-header")
        .forEach(header => {

            header.addEventListener(
                "click",
                () => {

                    const subject =
                        header.closest(
                            ".subject"
                        );

                    subject.classList.toggle(
                        "open"
                    );

                }
            );

        });


    document
        .querySelectorAll(".topic")
        .forEach(topicElement => {

            topicElement.addEventListener(
                "click",
                () => {

                    const subjectId =
                        topicElement.dataset
                            .subjectId;

                    const topicId =
                        topicElement.dataset
                            .topicId;


                    toggleTopic(
                        subjectId,
                        topicId
                    );

                }
            );

        });

}


/* =========================
   TOGGLE TOPIC
========================= */

function toggleTopic(
    subjectId,
    topicId
) {

    const data = getData();


    const subject =
        data.theory[subjectId];


    const topic =
        subject.topics.find(
            item =>
                item.id === topicId
        );


    if (!topic) {
        return;
    }


    if (
        topic.status ===
        "consolidated"
    ) {

        topic.status =
            "not-started";

    } else {

        topic.status =
            "consolidated";

        topic.lastStudied =
            new Date()
                .toISOString();

        topic.reviews =
            Number(topic.reviews || 0) + 1;

    }


    saveData(data);

    addActivity(
        data,
        topic.status === "consolidated"
            ? `Completed: ${topic.name}`
            : `Reopened: ${topic.name}`,
        subject.name
    );

    saveData(data);

    renderSubjects();

}


/* =========================
   ACTIVITY
========================= */

function addActivity(
    data,
    title,
    description
) {

    if (!Array.isArray(data.activity)) {
        data.activity = [];
    }


    data.activity.unshift({

        id:
            Date.now(),

        type:
            "theory",

        title,

        description,

        date:
            new Date()
                .toLocaleDateString(
                    "it-IT",
                    {
                        day: "2-digit",
                        month: "short"
                    }
                )

    });


    data.activity =
        data.activity.slice(0, 50);

}


/* =========================
   HEADER
========================= */

function updateTheoryHeader(data) {

    const stats =
        getTheoryStats(data);


    const overall =
        document.getElementById(
            "theoryOverall"
        );


    const bar =
        document.getElementById(
            "theoryProgressBar"
        );


    const counter =
        document.getElementById(
            "topicCounter"
        );


    if (overall) {
        overall.textContent =
            `${stats.percentage}%`;
    }


    if (bar) {
        bar.style.width =
            `${stats.percentage}%`;
    }


    if (counter) {

        counter.textContent =
            `${stats.completed} / ${stats.total} topics consolidated`;

    }


    updateDate();

}


/* =========================
   DATE
========================= */

function updateDate() {

    const element =
        document.getElementById(
            "currentDate"
        );


    if (!element) {
        return;
    }


    element.textContent =
        new Intl.DateTimeFormat(
            "it-IT",
            {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        ).format(new Date());

}


/* =========================
   INIT
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        getData();

        renderSubjects();

    }
);
