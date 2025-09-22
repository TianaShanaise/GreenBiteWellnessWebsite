// to get input from the form and store it in the local storage
let form = document.getElementById("feedbackform");
let submitBtn = document.getElementById("submitbtn");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let messageInput = document.getElementById("message");
 

submitBtn.addEventListener("click", function(e) {
    e.preventDefault(); // prevents the page being refreshed


    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert("Please fill in all fields.");
        return;
    }


    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailInput.value.match(emailPattern)) {
        alert("Please enter a valid email.");
        return;
    }

    // to Save feedback to localStorage
    let feedback = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,

    };

    let feedbackList = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbackList.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbackList));

    confirmation.textContent = "Thank you for your feedback!";
    confirmation.style.color = "green";

    // Reset form
    form.reset();
});

//for FAQs
let faqButtons = document.querySelectorAll(".faqquestion");

function Answer(e) {
    let answer = e.currentTarget.nextElementSibling;   //this refers to the next elemet after the button
    answer.style.display = answer.style.display === "block" ? "none" : "block";    //by clicking it will show or hide the answer.
}

faqButtons.forEach(btn => btn.addEventListener("click", Answer));

//registering the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => console.log(" Service Worker registered"))
    .catch(err => console.log(" Service worker registration failed:", err));
}