const hamburger = document.querySelector(".header__hamburger");
const gnav = document.querySelector(".gnav");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    gnav.classList.toggle("active");
});