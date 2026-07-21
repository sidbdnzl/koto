const hamburger = document.querySelector(".header__hamburger");
const gnav = document.querySelector(".gnav");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    gnav.classList.toggle("active");
});

document.querySelectorAll(".faqitem").forEach(item => {
    const unit = item.querySelector(".faqunit");
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

const Mobileswiper = new Swiper('.mobileswiper', {
    autoplay: {
        delay: 5000,
        disableOnInteraction: true,
    },
    pagination: {
        el: '.mobileswiper-pagination',
        clickable: true,
    },
});


// *-------------------------------------
// ここから俺が書く
// -------------------------------------*


const Modalswiper = new Swiper('.modal__swiper', {
    autoplay: {
        delay: 2500,
        disableOnInteraction: true,
    },
    pagination: {
        el: '.modal__pagenation',
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

//メアドコピー 0718
document.addEventListener('DOMContentLoaded', () => {
    const emailBtn = document.querySelector('.price__gmail');

    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const emailText = 'koto.zukuri.lab@gmail.com';

            navigator.clipboard.writeText(emailText).then(() => {
                alert('メールアドレスをコピーしました！');
            });
        });
    }
});
