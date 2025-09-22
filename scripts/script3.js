let form = document.getElementById("form");
let ageinput = document.getElementById("age");
let activitylevelinput = document.getElementById("activitylevel");
let heightinput = document.getElementById("height");
let weightinput = document.getElementById("weight"); 


//creating an animation function
function animateCounter(element, target) {
    let current = 0;
    let increment = target / 100; // Adjust 100 for speed

    let counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target; // stops at exact value
            clearInterval(counter);
        }
        element.textContent = Math.floor(current); // shows whole numbers
    }, 20); // updates every 20ms
}



function calculateCalories() {

    let age = ageinput.value.trim();
    let activitylevel = activitylevelinput.value.trim();
    let height = heightinput.value.trim();
    let weight = weightinput.value.trim();

    if (isNaN(age) || isNaN(height) || isNaN(weight)) {
    alert("Please fill in age, height, and weight");
    return; 
}

if (isNaN(activitylevel)) {
    alert("Please select your activity level");
    return; 
}

    let gender;
    if (document.getElementById("male").checked) {
        gender = "male";
    } else if (document.getElementById("female").checked) {
        gender = "female";
    } else {
        alert("Please select a gender");
        return;                           //  this will stop the calculation if no gender is selected
    }

    //calculating BMR 
    let BMR;
    if (gender === "male") {
        BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    }
    else {
        BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    //calculating TDEE
    let TDEE = BMR * activitylevel;

    //calculating macronutrients
    let carbs =  (TDEE * 0.50) / 4;
    let protein = (TDEE * 0.20) / 4;
    let fats = (TDEE * 0.30) / 9;


//trigger the animated counters
animateCounter(document.getElementById("bmrCounter"), BMR);
animateCounter(document.getElementById("tdeeCounter"), TDEE);
animateCounter(document.getElementById("carbsCounter"), carbs);
animateCounter(document.getElementById("proteinCounter"), protein);
animateCounter(document.getElementById("fatCounter"), fats);

}

form.addEventListener("submit", function(event) {
    event.preventDefault();   //prevents the page from refreshing when the user clicks submit
    calculateCalories();
})

//registering the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => console.log(" Service Worker registered"))
    .catch(err => console.log(" Service worker registration failed:", err));
}