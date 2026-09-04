const AERION_STORAGE_KEY = "aerion_data";


const QUESTIONS = [

    {
        id: "al-01",
        subject: "Air Law",
        difficulty: "easy",
        question: "Qual è lo scopo principale delle Rules of the Air?",
        answers: [
            "Stabilire le regole per la conduzione sicura dei voli",
            "Determinare il prezzo del carburante",
            "Definire la manutenzione dell'aeromobile",
            "Stabilire gli stipendi dei piloti"
        ],
        correct: 0,
        explanation:
            "Le Rules of the Air definiscono le regole applicabili alla conduzione dei voli."
    },

    {
        id: "al-02",
        subject: "Air Law",
        difficulty: "medium",
        question: "Cosa identifica principalmente un'area di spazio aereo controllato?",
        answers: [
            "La presenza di servizi ATS secondo la classificazione applicabile",
            "La presenza obbligatoria di una pista in cemento",
            "Il divieto assoluto di ingresso",
            "La presenza di un aeroporto internazionale"
        ],
        correct: 0,
        explanation:
            "Lo spazio aereo controllato è associato alla fornitura dei servizi ATS previsti dalla relativa classificazione."
    },

    {
        id: "hp-01",
        subject: "Human Performance",
        difficulty: "easy",
        question: "Quale fattore può contribuire significativamente alla perdita di prestazioni del pilota?",
        answers: [
            "La fatica",
            "Una corretta idratazione",
            "Un adeguato riposo",
            "Una buona alimentazione"
        ],
        correct: 0,
        explanation:
            "La fatica può ridurre attenzione, capacità decisionali e tempi di reazione."
    },

    {
        id: "hp-02",
        subject: "Human Performance",
        difficulty: "medium",
        question: "Quale effetto può avere l'ipossia sulle prestazioni?",
        answers: [
            "Riduzione delle capacità cognitive",
            "Aumento della precisione visiva",
            "Aumento della capacità decisionale",
            "Riduzione del consumo di ossigeno"
        ],
        correct: 0,
        explanation:
            "La riduzione della disponibilità di ossigeno può compromettere le funzioni cognitive e le prestazioni."
    },

    {
        id: "met-01",
        subject: "Meteorology",
        difficulty: "easy",
        question: "Cosa rappresenta un METAR?",
        answers: [
            "Un report meteorologico aeronautico di osservazione",
            "Una carta di navigazione",
            "Un piano di volo",
            "Un bollettino di manutenzione"
        ],
        correct: 0,
        explanation:
            "Il METAR è un messaggio standardizzato relativo alle condizioni meteorologiche osservate presso un aerodromo."
    },

    {
        id: "met-02",
        subject: "Meteorology",
        difficulty: "medium",
        question: "Quale fenomeno è particolarmente associato ai cumulonembi?",
        answers: [
            "Temporali e forte attività convettiva",
            "Cielo sempre sereno",
            "Assenza di turbolenza",
            "Riduzione costante del vento a zero"
        ],
        correct: 0,
        explanation:
            "I cumulonembi sono associati a intensa convezione, temporali, turbolenza e altri fenomeni significativi."
    },

    {
        id: "com-01",
        subject: "Communications",
        difficulty: "easy",
        question: "Qual è l'obiettivo principale delle comunicazioni aeronautiche?",
        answers: [
            "Garantire uno scambio di informazioni chiaro e standardizzato",
            "Ridurre il consumo di carburante",
            "Calcolare il peso dell'aeromobile",
            "Determinare la rotta magnetica"
        ],
        correct: 0,
        explanation:
            "Le comunicazioni standardizzate permettono uno scambio efficace delle informazioni operative."
    },

    {
        id: "pof-01",
        subject: "Principles of Flight",
        difficulty: "easy",
        question: "Quale forza si oppone principalmente al peso durante il volo livellato?",
        answers: [
            "Portanza",
            "Resistenza",
            "Spinta",
            "Coppia"
        ],
        correct: 0,
        explanation:
            "In volo livellato e stabilizzato, la portanza bilancia il peso."
    },

    {
        id: "pof-02",
        subject: "Principles of Flight",
        difficulty: "medium",
        question: "Cosa accade quando l'angolo d'attacco supera il valore critico?",
        answers: [
            "L'ala può entrare in stallo",
            "La portanza aumenta indefinitamente",
            "La resistenza diventa zero",
            "Il peso dell'aeromobile diminuisce"
        ],
        correct: 0,
        explanation:
            "Superato l'angolo d'attacco critico, il flusso può separarsi e l'ala entrare in stallo."
    },

    {
        id: "ops-01",
        subject: "Operational Procedures",
        difficulty: "easy",
        question: "Perché vengono utilizzate le checklist?",
        answers: [
            "Per ridurre il rischio di omissioni nelle procedure",
            "Per aumentare automaticamente la velocità",
            "Per sostituire completamente il giudizio del pilota",
            "Per evitare il briefing"
        ],
        correct: 0,
        explanation:
            "Le checklist aiutano a garantire che gli elementi critici delle procedure vengano considerati."
    },

    {
        id: "fpp-01",
        subject: "Flight Performance & Planning",
        difficulty: "medium",
        question: "Perché il peso dell'aeromobile è importante nel performance planning?",
        answers: [
            "Influenza prestazioni come decollo, salita e atterraggio",
            "Non influenza le prestazioni",
            "Determina solamente la frequenza radio",
            "Influenza esclusivamente la navigazione"
        ],
        correct: 0,
        explanation:
            "Il peso influenza diverse prestazioni dell'aeromobile e deve essere considerato nella pianificazione."
    },

    {
        id: "agk-01",
        subject: "Aircraft General Knowledge",
        difficulty: "easy",
        question: "Qual è la funzione principale dell'anemometro?",
        answers: [
            "Indicare la velocità relativa dell'aeromobile rispetto all'aria",
            "Indicare la quota",
            "Indicare la prua magnetica",
            "Indicare la temperatura esterna"
        ],
        correct: 0,
        explanation:
            "L'anemometro indica la velocità indicata dell'aeromobile rispetto alla massa d'aria."
    },

    {
        id: "nav-01",
        subject: "Navigation",
        difficulty: "easy",
        question: "A cosa serve principalmente una carta aeronautica?",
        answers: [
            "A rappresentare informazioni utili alla navigazione",
            "A calcolare la temperatura del motore",
            "A determinare il peso massimo al decollo",
            "A sostituire il manuale di volo"
        ],
        correct: 0,
        explanation:
            "Le carte aeronautiche forniscono informazioni geografiche e aeronautiche necessarie alla navigazione."
    },

    {
        id: "nav-02",
        subject: "Navigation",
        difficulty: "hard",
        question: "Quale effetto ha generalmente un vento al traverso sulla navigazione?",
        answers: [
            "Può richiedere una correzione di prua",
            "Non modifica mai la traiettoria al suolo",
            "Riduce sempre la velocità indicata a zero",
            "Elimina la necessità di pianificare"
        ],
        correct: 0,
        explanation:
            "Il vento al traverso tende a spostare l'aeromobile dalla traiettoria desiderata, richiedendo una correzione di prua."
    }

];


let quizState = {

    questions: [],
    current: 0,
    correct: 0,
    answered: false,
    lastConfig: null

};


function getData() {

    let data =
        JSON.parse(
            localStorage.getItem(
                AERION_STORAGE_KEY
            )
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
                total: 0,
                skills: {}
            },

            quizzes: [],
            simulator: [],
            goals: [],
            activity: []

        };

    }

    if (!data.quizzes) {
        data.quizzes = [];
    }

    if (!data.activity) {
        data.activity = [];
    }

    return data;

}


function saveData(data) {

    localStorage.setItem(
        AERION_STORAGE_KEY,
        JSON.stringify(data)
    );

}


function initialize() {

    updateDate();
    populateSubjects();
    updateGlobalAccuracy();
    renderHistory();

    document
        .getElementById("startQuizButton")
        .addEventListener(
            "click",
            startQuiz
        );

    document
        .getElementById("nextQuestionButton")
        .addEventListener(
            "click",
            nextQuestion
        );

    document
        .getElementById("quitQuizButton")
        .addEventListener(
            "click",
            quitQuiz
        );

    document
        .getElementById("backHomeButton")
        .addEventListener(
            "click",
            showHome
        );

    document
        .getElementById("retryQuizButton")
        .addEventListener(
            "click",
            retryQuiz
        );

}


function populateSubjects() {

    const select =
        document.getElementById(
            "subjectSelect"
        );

    const subjects =
        [...new Set(
            QUESTIONS.map(
                question =>
                    question.subject
            )
        )];

    subjects.forEach(subject => {

        const option =
            document.createElement(
                "option"
            );

        option.value = subject;
        option.textContent = subject;

        select.appendChild(option);

    });

}


function startQuiz() {

    const subject =
        document.getElementById(
            "subjectSelect"
        ).value;

    const count =
        Number(
            document.getElementById(
                "questionCount"
            ).value
        );

    const difficulty =
        document.getElementById(
            "difficultySelect"
        ).value;


    let available =
        QUESTIONS.filter(question => {

            const subjectMatch =
                subject === "all" ||
                question.subject === subject;

            const difficultyMatch =
                difficulty === "all" ||
                question.difficulty === difficulty;

            return (
                subjectMatch &&
                difficultyMatch
            );

        });


    if (!available.length) {

        alert(
            "Non ci sono abbastanza domande per questa combinazione."
        );

        return;

    }


    available =
        shuffle(
            [...available]
        );


    quizState.questions =
        available.slice(
            0,
            Math.min(count, available.length)
        );

    quizState.current = 0;
    quizState.correct = 0;
    quizState.answered = false;

    quizState.lastConfig = {
        subject,
        count: quizState.questions.length,
        difficulty
    };


    document
        .getElementById("quizHome")
        .classList.add("hidden");

    document
        .getElementById("quizResult")
        .classList.add("hidden");

    document
        .getElementById("quizSession")
        .classList.remove("hidden");


    renderQuestion();

}


function renderQuestion() {

    const question =
        quizState.questions[
            quizState.current
        ];

    const total =
        quizState.questions.length;

    const number =
        quizState.current + 1;


    quizState.answered = false;


    document.getElementById(
        "questionNumber"
    ).textContent =
        `Domanda ${number} di ${total}`;


    document.getElementById(
        "sessionScore"
    ).textContent =
        `${quizState.correct} / ${quizState.current}`;


    document.getElementById(
        "questionProgress"
    ).style.width =
        `${number / total * 100}%`;


    document.getElementById(
        "sessionSubject"
    ).textContent =
        question.subject;


    document.getElementById(
        "questionSubjectBadge"
    ).textContent =
        question.subject;


    document.getElementById(
        "questionDifficulty"
    ).textContent =
        getDifficultyLabel(
            question.difficulty
        );


    document.getElementById(
        "questionText"
    ).textContent =
        question.question;


    const answers =
        document.getElementById(
            "answersContainer"
        );

    answers.innerHTML = "";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "answer-button";

            button.textContent =
                answer;

            button.addEventListener(
                "click",
                () =>
                    selectAnswer(
                        index
                    )
            );

            answers.appendChild(button);

        }
    );


    document.getElementById(
        "answerFeedback"
    ).textContent = "";


    document.getElementById(
        "nextQuestionButton"
    ).disabled = true;

    document.getElementById(
        "nextQuestionButton"
    ).textContent =
        number === total
            ? "Vedi risultato"
            : "Continua";

}


function selectAnswer(index) {

    if (quizState.answered) {
        return;
    }

    quizState.answered = true;


    const question =
        quizState.questions[
            quizState.current
        ];

    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        (button, buttonIndex) => {

            button.disabled = true;

            if (
                buttonIndex ===
                question.correct
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    const feedback =
        document.getElementById(
            "answerFeedback"
        );


    if (index === question.correct) {

        quizState.correct++;

        feedback.textContent =
            `Corretto. ${question.explanation}`;

    } else {

        buttons[index].classList.add(
            "wrong"
        );

        feedback.textContent =
            `Risposta errata. ${question.explanation}`;

    }


    document.getElementById(
        "sessionScore"
    ).textContent =
        `${quizState.correct} / ${quizState.current + 1}`;


    document.getElementById(
        "nextQuestionButton"
    ).disabled = false;

}


function nextQuestion() {

    quizState.current++;

    if (
        quizState.current >=
        quizState.questions.length
    ) {

        finishQuiz();

        return;

    }

    renderQuestion();

}


function finishQuiz() {

    const total =
        quizState.questions.length;

    const correct =
        quizState.correct;

    const wrong =
        total - correct;

    const percentage =
        Math.round(
            correct / total * 100
        );


    const data = getData();


    const result = {

        id:
            generateId(),

        date:
            new Date().toISOString(),

        subject:
            quizState.lastConfig.subject,

        difficulty:
            quizState.lastConfig.difficulty,

        total,

        correct,

        wrong,

        percentage

    };


    data.quizzes.unshift(result);

    data.quizzes =
        data.quizzes.slice(0, 50);


    data.activity.unshift({

        type: "quiz",

        title:
            `Quiz completato — ${percentage}%`,

        date:
            new Date().toISOString()

    });

    data.activity =
        data.activity.slice(0, 30);


    saveData(data);


    document
        .getElementById("quizSession")
        .classList.add("hidden");

    document
        .getElementById("quizResult")
        .classList.remove("hidden");


    document.getElementById(
        "resultPercentage"
    ).textContent =
        `${percentage}%`;

    document.getElementById(
        "resultCorrect"
    ).textContent =
        `${correct} / ${total} corrette`;

    document.getElementById(
        "resultCorrectCount"
    ).textContent =
        correct;

    document.getElementById(
        "resultWrongCount"
    ).textContent =
        wrong;

    document.getElementById(
        "resultAccuracy"
    ).textContent =
        `${percentage}%`;


    updateGlobalAccuracy();

}


function retryQuiz() {

    document
        .getElementById("quizResult")
        .classList.add("hidden");

    document
        .getElementById("quizSession")
        .classList.remove("hidden");


    quizState.current = 0;
    quizState.correct = 0;


    let questions =
        QUESTIONS.filter(question => {

            const subject =
                quizState.lastConfig.subject;

            const difficulty =
                quizState.lastConfig.difficulty;

            return (
                (subject === "all" ||
                    question.subject === subject) &&
                (difficulty === "all" ||
                    question.difficulty === difficulty)
            );

        });


    quizState.questions =
        shuffle([...questions])
            .slice(
                0,
                quizState.lastConfig.count
            );


    renderQuestion();

}


function quitQuiz() {

    if (
        !confirm(
            "Vuoi uscire dal quiz? Il progresso della sessione verrà perso."
        )
    ) {

        return;

    }

    showHome();

}


function showHome() {

    document
        .getElementById("quizSession")
        .classList.add("hidden");

    document
        .getElementById("quizResult")
        .classList.add("hidden");

    document
        .getElementById("quizHome")
        .classList.remove("hidden");


    updateGlobalAccuracy();
    renderHistory();

}


function updateGlobalAccuracy() {

    const data = getData();

    const quizzes = data.quizzes || [];

    const element =
        document.getElementById(
            "globalAccuracy"
        );


    if (!quizzes.length) {

        element.textContent = "—";

        return;

    }


    const totalQuestions =
        quizzes.reduce(
            (sum, quiz) =>
                sum + quiz.total,
            0
        );

    const totalCorrect =
        quizzes.reduce(
            (sum, quiz) =>
                sum + quiz.correct,
            0
        );


    element.textContent =
        `${Math.round(
            totalCorrect /
            totalQuestions *
            100
        )}%`;

}


function renderHistory() {

    const data = getData();

    const container =
        document.getElementById(
            "quizHistory"
        );


    container.innerHTML = "";


    if (!data.quizzes.length) {

        container.innerHTML = `
            <div class="history-row">
                <div class="history-main">
                    <strong>Nessun quiz completato</strong>
                    <span>Inizia il tuo primo test teorico.</span>
                </div>
            </div>
        `;

        return;

    }


    data.quizzes
        .slice(0, 10)
        .forEach(quiz => {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "history-row";


            row.innerHTML = `

                <div class="history-main">

                    <strong>
                        ${escapeHTML(
                            quiz.subject === "all"
                                ? "PPL — Tutte le materie"
                                : quiz.subject
                        )}
                    </strong>

                    <span>
                        ${formatDate(quiz.date)}
                    </span>

                </div>


                <div class="history-value">
                    ${quiz.total} domande
                </div>


                <div class="history-value">
                    ${quiz.correct}/${quiz.total}
                </div>


                <div class="history-score">
                    ${quiz.percentage}%
                </div>

            `;


            container.appendChild(row);

        });

}


function getDifficultyLabel(difficulty) {

    if (difficulty === "easy") {
        return "Base";
    }

    if (difficulty === "hard") {
        return "Avanzata";
    }

    return "Intermedia";

}


function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }

    return array;

}


function formatDate(date) {

    return new Date(date)
        .toLocaleDateString(
            "it-IT",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );

}


function generateId() {

    if (
        window.crypto &&
        crypto.randomUUID
    ) {

        return crypto.randomUUID();

    }

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .slice(2)
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


function updateDate() {

    document.getElementById(
        "currentDate"
    ).textContent =
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


initialize();
