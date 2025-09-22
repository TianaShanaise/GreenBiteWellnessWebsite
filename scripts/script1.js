// to make the images in the hero section auto-rotate
let images = document.querySelectorAll(".slide");  //adds the images to an array like thing
let currentSlide = 0;   //this is the variable to store the currently accessed index in the array

function showSlide(index) {
    images.forEach(
        (slide, i ) => {
            slide.classList.remove("active")   //hides all the slides and makes it visible only to the css program
            if (i === index) slide.classList.add("active");   //shows the slide that is at the index
        }
    );
}


setInterval (
    () => {
        currentSlide ++;
        if (currentSlide >= images.length) 
            currentSlide = 0;   
        showSlide(currentSlide);
    } , 5000    //displays a new slide every 5 seconds
);

//To print a health tip each day
let healthTipBox = document.getElementById("health-tip");
async function showHealthTip() {
    const response = await fetch('../JSON/healthTips.json');
    const data = await response.json();
    const tips = data.healthTips;

    const startDate = new Date('2025-09-18');
    const today = new Date();
    const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

    const healthTipIndex = daysPassed % tips.length;

    healthTipBox.innerText = tips[healthTipIndex];   
}
window.onload = showHealthTip;

// To store the emails entered in the newsletter section in the local storage
let subscribe = document.getElementById("subscribe");
let email = document.getElementById("email");
let emailalert = document.getElementById("alert");

function getEmail() {
    if (email.value.trim()) {   //checks if a value has been entered.
        let availableEmails = JSON.parse(localStorage.getItem("Emails")) || [];    // '||' states to use the existing array but if there isn't one, use a new array

        availableEmails.push(email.value.trim());
        localStorage.setItem("Emails", JSON.stringify(availableEmails));

        emailalert.textContent = "Thank you for subscribing!";
        emailalert.style.display = "block";

        setTimeout(
            () => {emailalert.style.display = "none"}, 3000
        )
        email.value = "";
        // alert("Thank you for subscribing")
    }
}
subscribe.addEventListener("click", getEmail);

//registering the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => console.log(" Service Worker registered"))
    .catch(err => console.log(" Service worker registration failed:", err));
}



