let mobileMenu = document.getElementById("mobile-menu");
let navList = document.querySelector(".nav-list");

mobileMenu.addEventListener("click", () => {
  navList.classList.toggle("active");
});
