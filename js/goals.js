/* =========================================================
   AERION — Goals
   ========================================================= */

const STORAGE_KEY = "aerion_data";
const GOALS_KEY = "goals";


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


function getGoals() {
    const data = getData();

    if (!Array.isArray(data[GOALS_KEY])) {
        data[GOALS_KEY] = [];
        saveData(data);
    }

    return data[GOALS_KEY];
}


function saveGoals(goals) {
    const data = getData();

    data[GOALS_KEY] = goals;

    saveData(data);
}


/* =========================================================
   HELPERS
   ========================================================= */

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function formatDate(dateString) {

    if (!dateString) {
        return "Nessuna scadenza";
    }

    const date =
        new Date(`${dateString}T12:00:00`);

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

    const date =
        new Date(`${dateString}T12:00:00`);

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


function todayString() {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(today.getDate())
            .padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function getProgress(goal) {

    let progress =
        Number(goal.progress);

    if (Number.isNaN(progress)) {
        progress = 0;
    }

    return Math.min(
        100,
        Math.max(0, Math.round(progress))
    );
}


function isCompleted(goal) {
    return (
        goal.completed === true ||
        getProgress(goal) >= 100
    );
}


function isOverdue(goal) {

    if (!goal.deadline || isCompleted(goal)) {
        return false;
    }

    return goal.deadline < todayString();
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


/* =========================================================
   SUMMARY
   ========================================================= */

function renderSummary() {

    const goals = getGoals();

    const total =
        goals.length;

    const completed =
        goals.filter(isCompleted).length;

    const active =
        goals.filter(
            goal => !isCompleted(goal)
        ).length;

    const average =
        total
            ? Math.round(
                goals.reduce(
                    (sum, goal) =>
                        sum + getProgress(goal),
                    0
                ) / total
            )
            : 0;


    const totalElement =
        document.getElementById("totalGoals");

    const completedElement =
        document.getElementById("completedGoals");

    const activeElement =
        document.getElementById("activeGoals");

    const averageElement =
        document.getElementById("averageProgress");

    const countElement =
        document.getElementById("goalCount");


    if (totalElement) {
        totalElement.textContent = total;
    }

    if (completedElement) {
        completedElement.textContent = completed;
    }

    if (activeElement) {
        activeElement.textContent = active;
    }

    if (averageElement) {
        averageElement.textContent =
            `${average}%`;
    }

    if (countElement) {
        countElement.textContent =
            total;
    }
}


/* =========================================================
   GOALS RENDER
   ========================================================= */

function renderGoals() {

    const container =
        document.getElementById("goalsContainer");

    if (!container) {
        return;
    }

    const goals =
        [...getGoals()].sort(
            (a, b) => {

                if (
                    isCompleted(a) &&
                    !isCompleted(b)
                ) {
                    return 1;
                }

                if (
                    !isCompleted(a) &&
                    isCompleted(b)
                ) {
                    return -1;
                }

                if (!a.deadline) {
                    return 1;
                }

                if (!b.deadline) {
                    return -1;
                }

                return (
                    new Date(a.deadline) -
                    new Date(b.deadline)
                );
            }
        );


    if (!goals.length) {

        container.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ○
                </div>

                <strong>
                    Nessun obiettivo
                </strong>

                <span>
                    Crea il tuo primo obiettivo
                    per iniziare a monitorare
                    il tuo percorso.
                </span>

            </div>
        `;

        return;
    }


    container.innerHTML =
        goals.map(goal => {

            const progress =
                getProgress(goal);

            const completed =
                isCompleted(goal);

            const overdue =
                isOverdue(goal);

            const category =
                goal.category ||
                "Personal";

            const description =
                goal.description ||
                "Nessuna descrizione";


            return `
                <article
                    class="goal-card ${completed ? "completed" : ""}"
                    data-id="${escapeHTML(goal.id)}"
                >

                    <div class="goal-top">

                        <div class="goal-info">

                            <h4 class="goal-title">
                                ${escapeHTML(goal.title)}
                            </h4>

                            <p class="goal-description">
                                ${escapeHTML(description)}
                            </p>

                        </div>

                        <span class="goal-category">
                            ${escapeHTML(category)}
                        </span>

                    </div>


                    <div class="goal-progress">

                        <div class="goal-progress-info">

                            <span>
                                Progresso
                            </span>

                            <strong>
                                ${progress}%
                            </strong>

                        </div>

                        <div class="goal-progress-track">

                            <div
                                class="goal-progress-fill"
                                style="width:${progress}%"
                            ></div>

                        </div>

                    </div>


                    <div class="goal-footer">

                        <span class="goal-deadline ${overdue ? "overdue" : ""}">

                            ${
                                completed
                                    ? "Obiettivo completato"
                                    : goal.deadline
                                        ? (
                                            overdue
                                                ? `Scaduto · ${formatDate(goal.deadline)}`
                                                : `Scadenza · ${formatDate(goal.deadline)}`
                                        )
                                        : "Nessuna scadenza"
                            }

                        </span>


                        <div class="goal-actions">

                            ${
                                !completed
                                    ? `
                                        <button
                                            type="button"
                                            class="goal-action progress-action"
                                            data-id="${escapeHTML(goal.id)}"
                                        >
                                            +10%
                                        </button>
                                    `
                                    : ""
                            }

                            <button
                                type="button"
                                class="goal-action delete"
                                data-id="${escapeHTML(goal.id)}"
                            >
                                Elimina
                            </button>

                        </div>

                    </div>

                </article>
            `;
        })
        .join("");
}


/* =========================================================
   NEXT GOAL
   ========================================================= */

function renderNextGoal() {

    const container =
        document.getElementById("nextGoal");

    if (!container) {
        return;
    }

    const activeGoals =
        getGoals()
            .filter(
                goal => !isCompleted(goal)
            )
            .sort(
                (a, b) => {

                    if (!a.deadline) {
                        return 1;
                    }

                    if (!b.deadline) {
                        return -1;
                    }

                    return (
                        new Date(a.deadline) -
                        new Date(b.deadline)
                    );
                }
            );


    if (!activeGoals.length) {

        container.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ✓
                </div>

                <strong>
                    Tutto completato
                </strong>

                <span>
                    Crea un nuovo obiettivo
                    per continuare il percorso.
                </span>

            </div>
        `;

        return;
    }


    const goal =
        activeGoals[0];

    const progress =
        getProgress(goal);


    container.innerHTML = `

        <div class="next-goal-card">

            <div class="next-goal-label">
                NEXT TARGET
            </div>

            <h4>
                ${escapeHTML(goal.title)}
            </h4>

            <p>
                ${escapeHTML(
                    goal.description ||
                    "Continua a lavorare su questo obiettivo."
                )}
            </p>

            <div class="next-goal-progress">

                <div class="next-goal-progress-track">

                    <div
                        class="next-goal-progress-fill"
                        style="width:${progress}%"
                    ></div>

                </div>

            </div>

            <div class="next-goal-meta">

                <span>
                    ${progress}% completato
                </span>

                <span>
                    ${
                        goal.deadline
                            ? formatShortDate(goal.deadline)
                            : "∞"
                    }
                </span>

            </div>

        </div>
    `;
}


/* =========================================================
   MILESTONES
   ========================================================= */

function renderMilestones() {

    const container =
        document.getElementById(
            "milestonesContainer"
        );

    if (!container) {
        return;
    }

    const completed =
        getGoals()
            .filter(isCompleted)
            .sort(
                (a, b) =>
                    new Date(
                        b.completedAt || b.updatedAt || 0
                    ) -
                    new Date(
                        a.completedAt || a.updatedAt || 0
                    )
            )
            .slice(0, 5);


    if (!completed.length) {

        container.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ○
                </div>

                <strong>
                    Nessun traguardo raggiunto
                </strong>

                <span>
                    I milestone completati
                    appariranno qui.
                </span>

            </div>
        `;

        return;
    }


    container.innerHTML =
        completed.map(goal => {

            const date =
                goal.completedAt ||
                goal.updatedAt ||
                goal.createdAt;

            return `
                <div class="milestone-item">

                    <div class="milestone-icon">
                        ✓
                    </div>

                    <div class="milestone-info">

                        <strong>
                            ${escapeHTML(goal.title)}
                        </strong>

                        <span>
                            ${escapeHTML(
                                goal.category ||
                                "Personal"
                            )}
                        </span>

                    </div>

                    <div class="milestone-date">
                        ${formatShortDate(
                            date
                                ? date.slice(0, 10)
                                : null
                        )}
                    </div>

                </div>
            `;
        })
        .join("");
}


/* =========================================================
   MODAL
   ========================================================= */

function openGoalModal() {

    const modal =
        document.getElementById("goalModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("hidden");

    setTimeout(() => {

        const title =
            document.getElementById("goalTitle");

        if (title) {
            title.focus();
        }

    }, 50);
}


function closeGoalModal() {

    const modal =
        document.getElementById("goalModal");

    if (!modal) {
        return;
    }

    modal.classList.add("hidden");
}


function resetGoalForm() {

    const form =
        document.getElementById("goalForm");

    if (form) {
        form.reset();
    }

    const progress =
        document.getElementById("goalTarget");

    if (progress) {
        progress.value = 0;
    }
}


/* =========================================================
   CREATE GOAL
   ========================================================= */

function handleGoalSubmit(event) {

    event.preventDefault();


    const title =
        document.getElementById("goalTitle")
            .value
            .trim();

    const description =
        document.getElementById("goalDescription")
            .value
            .trim();

    const category =
        document.getElementById("goalCategory")
            .value;

    const deadline =
        document.getElementById("goalDeadline")
            .value;

    const progress =
        Math.min(
            100,
            Math.max(
                0,
                Number(
                    document.getElementById(
                        "goalTarget"
                    ).value
                ) || 0
            )
        );


    if (!title) {
        return;
    }


    const now =
        new Date().toISOString();

    const goal = {

        id:
            `goal-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`,

        title,

        description,

        category,

        deadline,

        progress,

        completed:
            progress >= 100,

        createdAt: now,

        updatedAt: now,

        completedAt:
            progress >= 100
                ? now
                : null
    };


    const goals =
        getGoals();

    goals.push(goal);

    saveGoals(goals);


    resetGoalForm();

    closeGoalModal();

    renderAll();
}


/* =========================================================
   UPDATE PROGRESS
   ========================================================= */

function increaseProgress(id) {

    const goals =
        getGoals();

    const goal =
        goals.find(
            item => item.id === id
        );

    if (!goal) {
        return;
    }


    const current =
        getProgress(goal);

    const newProgress =
        Math.min(
            100,
            current + 10
        );


    goal.progress =
        newProgress;

    goal.updatedAt =
        new Date().toISOString();


    if (newProgress >= 100) {

        goal.completed =
            true;

        goal.completedAt =
            new Date().toISOString();
    }


    saveGoals(goals);

    renderAll();
}


/* =========================================================
   DELETE
   ========================================================= */

function deleteGoal(id) {

    const goals =
        getGoals();

    const goal =
        goals.find(
            item => item.id === id
        );

    if (!goal) {
        return;
    }


    const confirmed =
        confirm(
            `Vuoi eliminare l'obiettivo "${goal.title}"?`
        );

    if (!confirmed) {
        return;
    }


    saveGoals(
        goals.filter(
            item => item.id !== id
        )
    );

    renderAll();
}


/* =========================================================
   EVENTS
   ========================================================= */

function handleGoalsClick(event) {

    const progressButton =
        event.target.closest(
            ".progress-action"
        );

    if (progressButton) {

        increaseProgress(
            progressButton.dataset.id
        );

        return;
    }


    const deleteButton =
        event.target.closest(
            ".goal-action.delete"
        );

    if (deleteButton) {

        deleteGoal(
            deleteButton.dataset.id
        );
    }
}


function setupModal() {

    const addButton =
        document.getElementById(
            "addGoalButton"
        );

    const closeButton =
        document.getElementById(
            "closeGoalModal"
        );

    const cancelButton =
        document.getElementById(
            "cancelGoalButton"
        );

    const backdrop =
        document.querySelector(
            ".modal-backdrop"
        );

    const form =
        document.getElementById(
            "goalForm"
        );


    if (addButton) {
        addButton.addEventListener(
            "click",
            openGoalModal
        );
    }

    if (closeButton) {
        closeButton.addEventListener(
            "click",
            closeGoalModal
        );
    }

    if (cancelButton) {
        cancelButton.addEventListener(
            "click",
            closeGoalModal
        );
    }

    if (backdrop) {
        backdrop.addEventListener(
            "click",
            closeGoalModal
        );
    }

    if (form) {
        form.addEventListener(
            "submit",
            handleGoalSubmit
        );
    }


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeGoalModal();
            }

        }
    );
}


/* =========================================================
   RENDER ALL
   ========================================================= */

function renderAll() {

    renderProfile();

    renderDate();

    renderSummary();

    renderGoals();

    renderNextGoal();

    renderMilestones();
}


/* =========================================================
   INIT
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderAll();

        setupModal();

        const goalsContainer =
            document.getElementById(
                "goalsContainer"
            );

        if (goalsContainer) {

            goalsContainer.addEventListener(
                "click",
                handleGoalsClick
            );

        }

    }
);
