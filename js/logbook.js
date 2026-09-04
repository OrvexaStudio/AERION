const STORAGE_KEY = "aerion_data";


/* =========================
   STORAGE
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


    if (!data.flight) {

        data.flight = {
            totalMinutes: 0,
            targetMinutes: 45 * 60
        };

    }


    if (!Array.isArray(data.flights)) {
        data.flights = [];
    }


    if (!Array.isArray(data.activity)) {
        data.activity = [];
    }


    return data;
}


function saveData(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}


/* =========================
   TIME
========================= */

function durationToMinutes(value) {

    const match =
        String(value)
            .trim()
            .match(/^(\d{1,3}):([0-5]\d)$/);

    if (!match) {
        return null;
    }


    const hours =
        Number(match[1]);

    const minutes =
        Number(match[2]);


    return (
        hours * 60 +
        minutes
    );

}


function minutesToDuration(totalMinutes) {

    const minutes =
        Math.max(
            0,
            Number(totalMinutes) || 0
        );


    const hours =
        Math.floor(minutes / 60);


    const remaining =
        minutes % 60;


    return `${hours}:${String(
        remaining
    ).padStart(2, "0")}`;

}


/* =========================
   DATE
========================= */

function formatDate(dateString) {

    if (!dateString) {
        return "—";
    }


    const date =
        new Date(
            `${dateString}T12:00:00`
        );


    return new Intl.DateTimeFormat(
        "it-IT",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    ).format(date);

}


function updateCurrentDate() {

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
   SUMMARY
========================= */

function calculateTotalFlightTime(
    data
) {

    return data.flights.reduce(
        (total, flight) => {

            return total +
                Number(
                    flight.durationMinutes
                );

        },
        0
    );

}


function updateSummary(data) {

    const total =
        calculateTotalFlightTime(data);


    const target =
        data.flight.targetMinutes ||
        45 * 60;


    const remaining =
        Math.max(
            0,
            target - total
        );


    const percentage =
        Math.min(
            100,
            Math.round(
                (total / target) * 100
            )
        );


    document.getElementById(
        "totalFlightTime"
    ).textContent =
        minutesToDuration(total);


    document.getElementById(
        "remainingFlightTime"
    ).textContent =
        minutesToDuration(remaining);


    document.getElementById(
        "flightCount"
    ).textContent =
        data.flights.length;


    document.getElementById(
        "historyCount"
    ).textContent =
        data.flights.length;


    document.getElementById(
        "flightPercentage"
    ).textContent =
        `${percentage}%`;


    document.getElementById(
        "flightProgressHours"
    ).textContent =
        `${minutesToDuration(total)} / 45:00`;


    document.getElementById(
        "flightProgressBar"
    ).style.width =
        `${percentage}%`;

}


/* =========================
   RENDER
========================= */

function renderFlights(data) {

    const container =
        document.getElementById(
            "flightList"
        );


    if (!data.flights.length) {

        container.innerHTML = `

            <div class="empty-logbook">

                <div class="empty-logbook-icon">
                    ✈
                </div>

                <strong>
                    No flights logged yet
                </strong>

                <span>
                    Add your first flight to start
                    building your PPL flight history.
                </span>

            </div>

        `;

        return;
    }


    const sortedFlights =
        [...data.flights]
            .sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            );


    container.innerHTML =
        sortedFlights
            .map(flight => `

                <div
                    class="flight-row"
                    data-flight-id="${flight.id}"
                >

                    <div class="flight-date">
                        ${escapeHTML(
                            formatDate(flight.date)
                        )}
                    </div>


                    <div class="flight-route">

                        <strong>
                            ${escapeHTML(
                                flight.departure
                            )}
                            →
                            ${escapeHTML(
                                flight.arrival
                            )}
                        </strong>

                        <span>
                            ${escapeHTML(
                                flight.aircraft ||
                                "Aircraft not specified"
                            )}
                        </span>

                    </div>


                    <div class="flight-time">
                        ${minutesToDuration(
                            flight.durationMinutes
                        )}
                    </div>


                    <div class="flight-type">
                        ${escapeHTML(
                            flight.type
                        )}
                    </div>


                    <button
                        class="delete-flight"
                        type="button"
                        data-delete-flight="${flight.id}"
                        title="Delete flight"
                    >
                        ×
                    </button>

                </div>

            `)
            .join("");


    document
        .querySelectorAll(
            "[data-delete-flight]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteFlight(
                        button.dataset
                            .deleteFlight
                    );

                }
            );

        });

}


/* =========================
   ADD FLIGHT
========================= */

function addFlight(event) {

    event.preventDefault();


    const date =
        document.getElementById(
            "flightDate"
        ).value;


    const aircraft =
        document.getElementById(
            "flightAircraft"
        ).value.trim();


    const departure =
        document.getElementById(
            "flightDeparture"
        ).value.trim()
            .toUpperCase();


    const arrival =
        document.getElementById(
            "flightArrival"
        ).value.trim()
            .toUpperCase();


    const duration =
        document.getElementById(
            "flightDuration"
        ).value.trim();


    const type =
        document.getElementById(
            "flightType"
        ).value;


    const notes =
        document.getElementById(
            "flightNotes"
        ).value.trim();


    const durationMinutes =
        durationToMinutes(duration);


    if (
        durationMinutes === null ||
        durationMinutes <= 0
    ) {

        alert(
            "Inserisci una durata valida, ad esempio 01:30."
        );

        return;
    }


    const data =
        getData();


    const flight = {

        id:
            crypto.randomUUID
            ? crypto.randomUUID()
            : String(Date.now()),

        date,

        aircraft,

        departure,

        arrival,

        durationMinutes,

        type,

        notes

    };


    data.flights.push(flight);


    data.flight.totalMinutes =
        calculateTotalFlightTime(data);


    data.activity.unshift({

        id: Date.now(),

        type: "flight",

        title:
            `Flight ${departure} → ${arrival}`,

        description:
            `${minutesToDuration(
                durationMinutes
            )} — ${type}`,

        date:
            formatDate(date)

    });


    data.activity =
        data.activity.slice(0, 50);


    saveData(data);


    closeModal();

    resetForm();

    renderAll();

}


/* =========================
   DELETE
========================= */

function deleteFlight(id) {

    const data =
        getData();


    const flight =
        data.flights.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!flight) {
        return;
    }


    const confirmed =
        confirm(
            "Vuoi eliminare questo volo?"
        );


    if (!confirmed) {
        return;
    }


    data.flights =
        data.flights.filter(
            item =>
                String(item.id) !==
                String(id)
        );


    data.flight.totalMinutes =
        calculateTotalFlightTime(data);


    data.activity.unshift({

        id: Date.now(),

        type: "flight-delete",

        title:
            `Deleted flight ${flight.departure} → ${flight.arrival}`,

        description:
            minutesToDuration(
                flight.durationMinutes
            ),

        date:
            formatDate(flight.date)

    });


    data.activity =
        data.activity.slice(0, 50);


    saveData(data);


    renderAll();

}


/* =========================
   MODAL
========================= */

function openModal() {

    const modal =
        document.getElementById(
            "flightModal"
        );


    modal.classList.add(
        "visible"
    );


    const dateInput =
        document.getElementById(
            "flightDate"
        );


    if (!dateInput.value) {

        dateInput.value =
            new Date()
                .toISOString()
                .split("T")[0];

    }

}


function closeModal() {

    document
        .getElementById(
            "flightModal"
        )
        .classList.remove(
            "visible"
        );

}


function resetForm() {

    document
        .getElementById(
            "flightForm"
        )
        .reset();

}


/* =========================
   SECURITY
========================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================
   RENDER ALL
========================= */

function renderAll() {

    const data =
        getData();


    updateSummary(data);

    renderFlights(data);

    updateCurrentDate();

}


/* =========================
   INIT
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        getData();

        renderAll();


        document
            .getElementById(
                "openFlightModal"
            )
            .addEventListener(
                "click",
                openModal
            );


        document
            .getElementById(
                "closeFlightModal"
            )
            .addEventListener(
                "click",
                closeModal
            );


        document
            .getElementById(
                "cancelFlight"
            )
            .addEventListener(
                "click",
                closeModal
            );


        document
            .getElementById(
                "flightForm"
            )
            .addEventListener(
                "submit",
                addFlight
            );


        document
            .getElementById(
                "flightModal"
            )
            .addEventListener(
                "click",
                event => {

                    if (
                        event.target.id ===
                        "flightModal"
                    ) {

                        closeModal();

                    }

                }
            );

    }
);
