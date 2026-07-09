const hamburger = document.querySelector(".header__hamburger");
const gnav = document.querySelector(".gnav");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    gnav.classList.toggle("active");
});

const swiper = new Swiper('.swiper', {
    autoplay: {
        delay: 5000,
        disableOnInteraction: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});


document.querySelectorAll(".faq__item").forEach(item => {
    const unit = item.querySelector(".faq__unit");
    const icon = item.querySelector("i");

    unit.addEventListener("click", () => {
        item.classList.toggle("active");

        if (item.classList.contains("active")) {
            icon.classList.replace("fa-plus", "fa-minus");
        } else {
            icon.classList.replace("fa-minus", "fa-plus");
        }
    });
});