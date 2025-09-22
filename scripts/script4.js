//to generate the workout
let button = document.getElementById("button");
let output = document.getElementById("workoutdiv");

function generateWorkout() {
    //adds selected body parts to a list
    let bodyParts = [];
    if (document.getElementById("arms").checked) bodyParts.push("arms");
    if (document.getElementById("legs").checked) bodyParts.push("legs");
    if (document.getElementById("fullbody").checked) bodyParts.push("fullbody");

    // Adds selected equipment to a list
    let equipments = [];
    if (document.getElementById("none").checked) equipments.push("none");
    if (document.getElementById("dumbells").checked) equipments.push("dumbells");
    if (document.getElementById("band").checked) equipments.push("band");

    fetch("../JSON/exercises.json")
    .then (response => response.json())
    .then (data => {
        let filtereddata = data.filter (e =>    //filters accoring to what the user selected
            bodyParts.includes(e.bodypart) && equipments.includes(e.equipment)
        );

        if (filtereddata.length > 0) {
            let random = filtereddata[Math.floor(Math.random() * filtereddata.length)]
             output.innerHTML = `
                    <h4>Generated Exercise:</h4>
                    <p><strong>Name:</strong> ${random.name}</p>
                    <p><strong>Sets:</strong> ${random.sets}</p>
                    <p><strong>Duration:</strong> ${random.duration} seconds</p>
                `;
            } else {
                output.innerHTML = "<p>No exercises match your selection.</p>";
            }
        });
}

button.addEventListener("click", generateWorkout);


//for the countdown function
let countdown = document.getElementById("countdown");
let start = document.getElementById("startcountdown");
let alarm = document.getElementById("beep");

let StartValue = 30;
let interval;

function startcountdown() {
    clearInterval(interval);    //resets if already running
    let startvalue = StartValue;
    countdown.textContent = startvalue;

    interval = setInterval(() => {
        startvalue--;
        countdown.textContent = startvalue;

        //this is to animate the number
        countdown.classList.add("animate");
        setTimeout(() => countdown.classList.remove("animate"), 200);

        if (startvalue <= 0) {
            clearInterval(interval);
            alarm.play();
        }
    }, 1000)
}

start.addEventListener("click", startcountdown);

//registering the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => console.log(" Service Worker registered"))
    .catch(err => console.log(" Service worker registration failed:", err));
}