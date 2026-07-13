const hamburger = document.querySelector(".header__hamburger");
const gnav = document.querySelector(".gnav");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    gnav.classList.toggle("active");
});

const Mobileswiper = new Swiper('.mobile__swiper', {
    autoplay: {
        delay: 5000,
        disableOnInteraction: true,
    },
    pagination: {
        el: '.mobile__swiper-pagination',
        clickable: true,
    },
});

const Modalswiper = new Swiper('.modalswiper', {
    autoplay: {
        delay: 2500,
        disableOnInteraction: true,
    },
    pagination: {
        el: '.modalpagenation',
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


document.addEventListener('DOMContentLoaded', () => {
    const eventItems = document.querySelectorAll('.events__item');
    const overlay = document.querySelector('.modal-overlay'); // 修正：overlayを取得
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.modal__close');

    // 1. すべてのイベントアイテムにクリックイベントを設定
    eventItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            // aタグ（ハッシュタグなど）のクリックならモーダルを開かない
            if (e.target.closest('a')) return;

            // overlayに対してクラスを付与する（CSSでoverlayごと表示コントロールするため）
            if (overlay) overlay.classList.add('is-open');
        });
    });

    // 2. ×ボタンを押したらモーダルを閉じる
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (overlay) overlay.classList.remove('is-open');
        });
    }

    // 3. モーダルの背景（overlay）を押したら閉じる
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            // クリックされたのが「modal-overlay」そのものだったら閉じる
            //（中のmodalコンテンツ部分をクリックしたときは閉じないようにする）
            if (e.target === overlay) {
                overlay.classList.remove('is-open');
            }
        });
    }
});

const time = document.querySelector(".mainvisual__time");
const topicsTitle = document.querySelector(".mainvisual__topics-title");

function updateClock() {
    const now = new Date();

    const month = now.getMonth() + 1;
    const day = now.getDate();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    topicsTitle.textContent = `${month}/${day}のTOPICS`;
    time.textContent = `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);
