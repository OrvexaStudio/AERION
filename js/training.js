const AERION_STORAGE_KEY = "aerion_data";


const TRAINING_SYLLABUS = [

    {
        id: "preflight",
        name: "Pre-flight Preparation",
        description: "Preparazione del volo e controlli preliminari",

        skills: [

            "Aircraft documentation and limitations",
            "Pre-flight inspection",
            "Cockpit preparation",
            "Weight and balance",
            "Performance calculations",
            "Weather briefing",
            "NOTAM and aeronautical information",
            "Flight planning",
            "Navigation equipment preparation"

        ]
    },


    {
        id: "basic-handling",
        name: "Basic Aircraft Handling",
        description: "Controllo dell'aeromobile e manovre fondamentali",

        skills: [

            "Aircraft attitude and instrument interpretation",
            "Straight and level flight",
            "Climbing",
            "Descending",
            "Medium turns",
            "Steep turns",
            "Slow flight",
            "Stall recognition",
            "Stall recovery",
            "Trim technique"

        ]
    },


    {
        id: "takeoff",
        name: "Take-off & Climb",
        description: "Procedure di decollo e salita",

        skills: [

            "Normal take-off",
            "Crosswind take-off",
            "Rejected take-off",
            "Take-off briefing",
            "Initial climb",
            "Best rate / best angle climb",
            "Engine parameters monitoring"

        ]
    },


    {
        id: "circuit",
        name: "Circuit & Landing",
        description: "Circuito di traffico e atterraggio",

        skills: [

            "Traffic circuit procedures",
            "Circuit joining",
            "Approach configuration",
            "Normal landing",
            "Crosswind landing",
            "Go-around",
            "Short-field landing",
            "Soft-field landing",
            "Landing after glide approach"

        ]
    },


    {
        id: "navigation",
        name: "Navigation",
        description: "Navigazione VFR e cross-country",

        skills: [

            "Pilotage",
            "Dead reckoning",
            "Use of charts",
            "Navigation log",
            "Heading calculation",
            "Wind correction",
            "Groundspeed calculation",
            "Position fixing",
            "Diversion procedures",
            "Lost procedures",
            "Cross-country flight planning"

        ]
    },


    {
        id: "emergency",
        name: "Abnormal & Emergency Procedures",
        description: "Gestione delle principali situazioni anomale",

        skills: [

            "Engine failure",
            "Forced landing",
            "Precautionary landing",
            "Engine fire procedure",
            "Electrical failure",
            "Radio failure",
            "Abnormal engine indications",
            "Emergency checklist discipline",
            "Emergency communication"

        ]
    },


    {
        id: "solo",
        name: "Solo & Consolidation",
        description: "Consolidamento delle competenze e volo solo",

        skills: [

            "First supervised solo preparation",
            "First solo flight",
            "Solo circuit consolidation",
            "Solo navigation preparation",
            "Solo cross-country",
            "Independent pre-flight preparation",
            "Independent flight planning",
            "Independent post-flight procedures"

        ]
    }

];


function getData() {

    let data = JSON.parse(
        localStorage.getItem(AERION_STORAGE_KEY)
    );

    if (!data) {

        data = {

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
    }

    if (!data.training) {

        data.training = {
            completed: 0,
            total: 0,
            skills: {}
        };
    }

    if (!data.training.skills) {
        data.training.skills = {};
    }

    return data;
}


function saveData(data) {

    localStorage.setItem(
        AERION_STORAGE_KEY,
        JSON.stringify(data)
    );

}


function createSkillId(categoryId, index) {

    return `${categoryId}-${index}`;

}


function initializeSkills(data) {

    TRAINING_SYLLABUS.forEach(category => {

        category.skills.forEach((name, index) => {

            const id = createSkillId(
                category.id,
                index
            );

            if (!data.training.skills[id]) {

                data.training.skills[id] = {

                    id,
                    name,

                    status: "not-started",

                    confidence: 0,

                    lastTrained: null,

                    notes: ""

                };

            }

        });

    });

}


function getAllSkills(data) {

    return Object.values(
        data.training.skills
    );

}


function calculateProgress(data) {

    const skills = getAllSkills(data);

    if (!skills.length) {
        return 0;
    }

    const completed = skills.filter(
        skill => skill.status === "completed"
    ).length;

    return Math.round(
        completed / skills.length * 100
    );

}


function calculateCategoryProgress(
    category,
    data
) {

    const skills = category.skills.map(
        (_, index) =>
            data.training.skills[
                createSkillId(category.id, index)
            ]
    );

    if (!skills.length) {
        return 0;
    }

    const completed = skills.filter(
        skill => skill.status === "completed"
    ).length;

    return Math.round(
        completed / skills.length * 100
    );

}


function updateTrainingStats(data) {

    const skills = getAllSkills(data);

    data.training.total = skills.length;

    data.training.completed =
        skills.filter(
            skill => skill.status === "completed"
        ).length;

}


function render() {

    const data = getData();

    initializeSkills(data);
    updateTrainingStats(data);

    saveData(data);

    renderHeader(data);
    renderSummary(data);
    renderCategories(data);

}


function renderHeader(data) {

    const progress = calculateProgress(data);

    document.getElementById(
        "overallProgress"
    ).textContent = `${progress}%`;

    document.getElementById(
        "overallProgressBar"
    ).style.width = `${progress}%`;

    document.getElementById(
        "completedSkills"
    ).textContent =
        `${data.training.completed} / ${data.training.total}`;

    document.getElementById(
        "profileName"
    ).textContent =
        data.profile?.name || "Francesco";

    document.getElementById(
        "profileInitial"
    ).textContent =
        (data.profile?.name || "F")
        .charAt(0)
        .toUpperCase();

    updateDate();

}


function renderSummary(data) {

    const skills = getAllSkills(data);

    const completed =
        skills.filter(
            s => s.status === "completed"
        ).length;

    const training =
        skills.filter(
            s => s.status === "training"
        ).length;

    const notStarted =
        skills.filter(
            s => s.status === "not-started"
        ).length;

    document.getElementById(
        "completedCount"
    ).textContent = completed;

    document.getElementById(
        "trainingCount"
    ).textContent = training;

    document.getElementById(
        "notStartedCount"
    ).textContent = notStarted;


    const next =
        TRAINING_SYLLABUS
            .flatMap(category =>
                category.skills.map(
                    (_, index) =>
                        data.training.skills[
                            createSkillId(
                                category.id,
                                index
                            )
                        ]
                )
            )
            .find(
                skill =>
                    skill.status !== "completed"
            );


    document.getElementById(
        "nextSkill"
    ).textContent =
        next ? next.name : "PPL Complete";

    document.getElementById(
        "skillTotal"
    ).textContent =
        `${skills.length} skills`;

}


function renderCategories(data) {

    const container =
        document.getElementById(
            "trainingContainer"
        );

    container.innerHTML = "";


    TRAINING_SYLLABUS.forEach(
        (category, categoryIndex) => {

            const progress =
                calculateCategoryProgress(
                    category,
                    data
                );


            const categoryElement =
                document.createElement("div");

            categoryElement.className =
                "training-category";


            const header =
                document.createElement("div");

            header.className =
                "category-header";

            header.innerHTML = `

                <div class="category-title">

                    <div class="category-number">
                        ${String(categoryIndex + 1).padStart(2, "0")}
                    </div>

                    <div>
                        <h3>${category.name}</h3>
                        <span>${category.description}</span>
                    </div>

                </div>


                <div class="category-progress">

                    <div class="category-progress-bar">

                        <div
                            class="category-progress-fill"
                            style="width:${progress}%"
                        ></div>

                    </div>

                    <strong>${progress}%</strong>

                </div>

            `;


            const skillsList =
                document.createElement("div");

            skillsList.className =
                "skills-list";


            category.skills.forEach(
                (name, index) => {

                    const id =
                        createSkillId(
                            category.id,
                            index
                        );

                    const skill =
                        data.training.skills[id];


                    const row =
                        document.createElement("div");

                    row.className =
                        "skill-row";


                    const statusClass =
                        skill.status === "completed"
                            ? "completed"
                            : skill.status === "training"
                                ? "training"
                                : "";


                    const statusText =
                        skill.status === "completed"
                            ? "Completata"
                            : skill.status === "training"
                                ? "In addestramento"
                                : "Da iniziare";


                    row.innerHTML = `

                        <div class="skill-main">

                            <div class="skill-status ${statusClass}"></div>

                            <div>

                                <div class="skill-name">
                                    ${escapeHTML(name)}
                                </div>

                                <div class="skill-meta">

                                    <span>${statusText}</span>

                                    ${
                                        skill.lastTrained
                                            ? `<span>Ultimo training: ${formatDate(skill.lastTrained)}</span>`
                                            : ""
                                    }

                                    ${
                                        skill.confidence
                                            ? `<span>Confidenza: ${skill.confidence}/5</span>`
                                            : ""
                                    }

                                </div>

                            </div>

                        </div>


                        <div class="skill-actions">

                            <button
                                class="status-button"
                                data-action="cycle"
                                data-id="${id}">
                                ${statusText}
                            </button>

                            <button
                                class="status-button"
                                data-action="details"
                                data-id="${id}">
                                Dettagli
                            </button>

                        </div>


                        <div class="skill-details">

                            <div class="detail-grid">

                                <div class="detail-field">

                                    <label>Confidenza</label>

                                    <select
                                        data-field="confidence"
                                        data-id="${id}">

                                        <option value="0">Non valutata</option>
                                        <option value="1">1 — Da migliorare</option>
                                        <option value="2">2 — Base</option>
                                        <option value="3">3 — Discreta</option>
                                        <option value="4">4 — Buona</option>
                                        <option value="5">5 — Ottima</option>

                                    </select>

                                </div>


                                <div class="detail-field">

                                    <label>Ultimo training</label>

                                    <input
                                        type="date"
                                        data-field="lastTrained"
                                        data-id="${id}"
                                    >

                                </div>

                            </div>


                            <div class="detail-field">

                                <label>Note</label>

                                <textarea
                                    data-field="notes"
                                    data-id="${id}"
                                    placeholder="Note personali, errori da correggere, punti da ripassare..."
                                ></textarea>

                            </div>

                            <br>

                            <button
                                class="save-details"
                                data-action="save"
                                data-id="${id}">
                                Salva
                            </button>

                        </div>

                    `;


                    const confidence =
                        row.querySelector(
                            `[data-field="confidence"]`
                        );

                    confidence.value =
                        skill.confidence || 0;


                    const dateInput =
                        row.querySelector(
                            `[data-field="lastTrained"]`
                        );

                    dateInput.value =
                        skill.lastTrained || "";


                    const notes =
                        row.querySelector(
                            `[data-field="notes"]`
                        );

                    notes.value =
                        skill.notes || "";


                    skillsList.appendChild(row);

                }
            );


            categoryElement.appendChild(header);
            categoryElement.appendChild(skillsList);

            container.appendChild(
                categoryElement
            );

        }
    );


    attachEvents();

}


function attachEvents() {

    document
        .querySelectorAll(
            '[data-action="cycle"]'
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    cycleStatus(
                        button.dataset.id
                    );

                }
            );

        });


    document
        .querySelectorAll(
            '[data-action="details"]'
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    const row =
                        button.closest(".skill-row");

                    row.classList.toggle("open");

                }
            );

        });


    document
        .querySelectorAll(
            '[data-action="save"]'
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    saveSkillDetails(
                        button.dataset.id,
                        button.closest(".skill-row")
                    );

                }
            );

        });

}


function cycleStatus(id) {

    const data = getData();

    initializeSkills(data);


    const skill =
        data.training.skills[id];


    if (skill.status === "not-started") {

        skill.status = "training";

    } else if (skill.status === "training") {

        skill.status = "completed";

    } else {

        skill.status = "not-started";

    }


    if (
        skill.status === "training" ||
        skill.status === "completed"
    ) {

        skill.lastTrained =
            new Date()
                .toISOString()
                .split("T")[0];

    }


    updateTrainingStats(data);

    addActivity(
        data,
        skill
    );

    saveData(data);

    render();

}


function saveSkillDetails(id, row) {

    const data = getData();

    initializeSkills(data);


    const skill =
        data.training.skills[id];


    const confidence =
        row.querySelector(
            '[data-field="confidence"]'
        );

    const lastTrained =
        row.querySelector(
            '[data-field="lastTrained"]'
        );

    const notes =
        row.querySelector(
            '[data-field="notes"]'
        );


    skill.confidence =
        Number(confidence.value);

    skill.lastTrained =
        lastTrained.value || null;

    skill.notes =
        notes.value.trim();


    saveData(data);

    render();

}


function addActivity(data, skill) {

    if (!data.activity) {
        data.activity = [];
    }


    data.activity.unshift({

        type: "training",

        title:
            `${skill.name} — ${getStatusLabel(skill.status)}`,

        date:
            new Date().toISOString()

    });


    data.activity =
        data.activity.slice(0, 30);

}


function getStatusLabel(status) {

    if (status === "completed") {
        return "Completata";
    }

    if (status === "training") {
        return "In addestramento";
    }

    return "Da iniziare";

}


function formatDate(date) {

    if (!date) {
        return "";
    }

    return new Date(
        `${date}T12:00:00`
    ).toLocaleDateString(
        "it-IT",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}


function updateDate() {

    const element =
        document.getElementById(
            "currentDate"
        );

    if (!element) {
        return;
    }

    element.textContent =
        new Date().toLocaleDateString(
            "it-IT",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

}


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


render();
