// to implement breathing animation
let circle = document.querySelector(".breathingcircle");
let text = document.getElementById("breathingtext");

function startbreathinganimation() {
    let inhale = true;
    setInterval(() => {
        if(inhale) {
            circle.style.transform = "scale(1.3)";
            text.textContent = "Inhale...";
        } else {
            circle.style.transform = "scale(1)";
            text.textContent = "Exhale...";
        }
        inhale = !inhale;
    }, 3000); 
}

startbreathinganimation();


//to add a timer
let timerDisplay = document.getElementById("timerdisplay");
let startBtn = document.getElementById("starttimer");
let timerDuration = 10 * 60; // 10 minutes in seconds as js works with seconds
let timerInterval;

function updateTimerDisplay(seconds) {
    let minute = Math.floor(seconds / 60).toString().padStart(2, '0');  //makes sure that the string is at least 2 characters long and if not it adds 0 at the start.
    let second = (seconds % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minute}:${second}`;
}


function startTimer() {
    timerInterval = setInterval(() => {
        if (timerDuration <= 0) {
            clearInterval(timerInterval);
            incrementSession();
            alert("Session Completed!");
        } else {
            timerDuration--;
            updateTimerDisplay(timerDuration);
        }
    }, 1000);
}
startBtn.addEventListener("click", startTimer);


//to add sounds
let sounds = {
    rain: new Audio("../audio/rain.mp3"),
    forest: new Audio("../audio/forest.mp3"),
    ocean: new Audio("../audio/ocean.mp3")
};

document.querySelectorAll(".soundbtn").forEach(btn => {
    btn.addEventListener("click", () => {
        let sound = sounds[btn.dataset.sound];
        if(sound.paused) sound.play();
        else sound.pause();
    });
});

//to track number of sessions
let sessionCount = localStorage.getItem("sessions") || 0;   // returns zero if sessions is null through "|| 0"
document.getElementById("sessioncount").textContent = sessionCount;

function incrementSession() {
    sessionCount++;
    localStorage.setItem("sessions", sessionCount);
    document.getElementById("sessioncount").textContent = sessionCount;
}

//registering the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => console.log(" Service Worker registered"))
    .catch(err => console.log(" Service worker registration failed:", err));
}




