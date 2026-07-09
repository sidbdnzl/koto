const hamburger = document.querySelector(".header__hamburger");
const gnav = document.querySelector(".gnav");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    gnav.classList.toggle("active");
});
















const swiper = new Swiper('.swiper', {
    autoplay: {
        delay: 2500,
        disableOnInteraction: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
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
