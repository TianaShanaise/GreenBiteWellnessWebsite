let recipedata;

//loading the content from the json file
fetch("../JSON/recipes.json")
.then (recipe => recipe.json())  //converting to a json object
.then (data=> {
    recipedata = data;
    setRecipeClick();
}
)


function setRecipeClick() {
    document.querySelectorAll(".recipe-image").forEach(img => {
        img.addEventListener("click", () => {
            let recipeId = img.dataset.id;
            showRecipe(recipeId);
        })
    }
)
}

function showRecipe(id) {
    let recipe;
    for (let category in recipedata.categories) {
        recipe = recipedata.categories[category].find(r => r.id === id)
        if (recipe) {
            break;   //if the recipe is found, the function stops searching.
        }
    }
    if (!recipe){
        return;
    }


//to add details to the modal
document.getElementById("recipetitle").textContent = recipe.title;

let ingredientsList = document.getElementById("recipeingredients");
ingredientsList.innerHTML = "";
recipe.ingredients.forEach( item => {
    let li = document.createElement("li");
    li.textContent = item;
    ingredientsList.appendChild(li);   //appendChild has been used 
}
);


let stepsList = document.getElementById("recipesteps");
stepsList.innerHTML = "";
recipe.steps.forEach( item => {
    let li = document.createElement("li");
    li.textContent = item;
    stepsList.appendChild(li);  
}
);

let nutritionTable = document.getElementById("recipenutrition");
nutritionTable.innerHTML = "";
for (let n in recipe.nutrition) {
    let row = document.createElement("tr");
    row.innerHTML = `<td><b>${n}</b></td><td>${recipe.nutrition[n]}</td>`;
    nutritionTable.appendChild(row);
}

document.getElementById("recipemodal").style.display = "block";  //shows the pop up modal

}


//code to close the pop up modal
document.querySelector(".closebutton").onclick = () => 
    document.getElementById("recipemodal").style.display = "none";

window.onclick = e => {
    if (e.target === document.getElementById("recipemodal")) {
        document.getElementById("recipemodal").style.display = "none";
    }
};

//registering the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => console.log(" Service Worker registered"))
    .catch(err => console.log(" Service worker registration failed:", err));
}



