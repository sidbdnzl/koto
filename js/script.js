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
document.querySelectorAll('.pc-price__gmail, .sp-price__gmail').forEach((btn) => {
    btn.addEventListener('click', () => {
        const email = btn.innerText.trim();

        // コピー処理
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        alert('メールアドレスをコピーしました！');
    });
});




//タブ切り替え
document.addEventListener('DOMContentLoaded', () => {
    // 複合利用（2つ選択時）の料金テーブルマッピング
    const comboPrices = {
        'counter,table': [7000, 12600, 21000, 37800],
        'counter,kitchen': [11000, 19800, 33000, 59400],
        'kitchen,table': [9500, 17100, 28500, 51300]
    };

    // 数値を3桁カンマ区切りにする関数
    const formatNumber = (num) => {
        const parsed = Number(num);
        return isNaN(parsed) ? '0' : parsed.toLocaleString();
    };

    // 透明度（opacity）アニメーションを再生させる関数
    const triggerOpacityAnimation = (elements) => {
        elements.forEach(el => {
            if (!el) return;
            el.classList.remove('is-text-fadeIn');
            void el.offsetWidth; // リフロー発生でアニメーションリセット
            el.classList.add('is-text-fadeIn');
        });
    };

    // ----------------------------------------------------
    // TAB 1 (スペース利用) の制御
    // ----------------------------------------------------
    const sub1Container = document.getElementById('js-sub1-switches');
    if (sub1Container) {
        const sub1Checkboxes = sub1Container.querySelectorAll('input[type="checkbox"]');
        const sub1Title = document.getElementById('js-sub1-title');
        const priceSpans = document.querySelectorAll('.sp-price__tab-content:nth-of-type(1) .js-price');

        const updateTab1 = (changedInput, isInitial = false) => {
            let checked = Array.from(sub1Checkboxes).filter(cb => cb.checked);

            // 3つ目が押されたら古い選択を外す
            if (checked.length > 2) {
                const firstChecked = checked.find(cb => cb !== changedInput);
                if (firstChecked) firstChecked.checked = false;
                checked = Array.from(sub1Checkboxes).filter(cb => cb.checked);
            }

            // 0個選択防止（最低1つ選択）
            if (checked.length === 0 && changedInput) {
                changedInput.checked = true;
                checked = [changedInput];
            }

            if (checked.length === 1) {
                const target = checked[0];
                if (sub1Title) sub1Title.textContent = target.dataset.name || '';

                const singlePrices = [
                    target.getAttribute('data-price-1'),
                    target.getAttribute('data-price-2'),
                    target.getAttribute('data-price-3'),
                    target.getAttribute('data-price-4')
                ];

                priceSpans.forEach((span, i) => {
                    if (singlePrices[i] !== null && singlePrices[i] !== undefined) {
                        span.textContent = formatNumber(singlePrices[i]);
                    }
                });

            } else if (checked.length === 2) {
                const values = checked.map(cb => cb.value);
                const names = checked.map(cb => cb.dataset.name || '');
                if (sub1Title) sub1Title.innerHTML = `${names[0]} & ${names[1]}`;

                let key = values.join(',');
                if (!comboPrices[key]) {
                    key = values.reverse().join(',');
                }

                const prices = comboPrices[key];
                if (prices) {
                    priceSpans.forEach((span, i) => {
                        if (prices[i] !== undefined) {
                            span.textContent = formatNumber(prices[i]);
                        }
                    });
                }
            }

            // 初回以外は透明度アニメーション実行
            if (!isInitial) {
                const targetElements = [sub1Title, ...Array.from(priceSpans)].filter(Boolean);
                triggerOpacityAnimation(targetElements);
            }
        };

        sub1Checkboxes.forEach(cb => {
            cb.addEventListener('change', (e) => updateTab1(e.target));
        });

        updateTab1(null, true);
    }

    // ----------------------------------------------------
    // TAB 2 (コトコトボックス) の制御
    // ----------------------------------------------------
    const sub2Container = document.getElementById('js-sub2-switches');
    if (sub2Container) {
        const sub2Radios = sub2Container.querySelectorAll('input[type="radio"]');
        const sub2Title = document.getElementById('js-sub2-title');
        const boxPriceSpans = document.querySelectorAll('.js-box-price');

        const updateTab2 = (isInitial = false) => {
            const checked = sub2Container.querySelector('input[type="radio"]:checked');
            if (!checked) return;

            if (sub2Title) sub2Title.textContent = checked.dataset.name || '';

            const boxPrices = [
                checked.getAttribute('data-price-1'),
                checked.getAttribute('data-price-2'),
                checked.getAttribute('data-price-3'),
                checked.getAttribute('data-price-4')
            ];

            boxPriceSpans.forEach((span, i) => {
                if (boxPrices[i] !== null && boxPrices[i] !== undefined) {
                    span.textContent = formatNumber(boxPrices[i]);
                }
            });

            if (!isInitial) {
                const targetElements = [sub2Title, ...Array.from(boxPriceSpans)].filter(Boolean);
                triggerOpacityAnimation(targetElements);
            }
        };

        sub2Radios.forEach(radio => {
            radio.addEventListener('change', () => updateTab2());
        });

        updateTab2(true);
    }
});



// ===============================================
// 出店者の声（初期表示で#ダミー1を自動選択＆絞り込み）
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.voice__item');
    const select = document.querySelector('.voice__pulldown');

    // 絞り込み処理
    const filter = () => {
        const selected = select.value.replace('#', '').trim();

        items.forEach(item => {
            // カード内に選択したタグの文字が含まれているか判定
            const hasTag = item.querySelector('.unit-link').textContent.includes(selected);
            item.style.display = hasTag ? '' : 'none';
        });
    };

    // ① プルダウンを変えたとき
    select.addEventListener('change', filter);

    // ② カードの中のタグをクリックしたとき
    document.querySelectorAll('.unit-link-src').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            select.value = link.textContent.trim(); // プルダウンを変更
            filter(); // 再実行
        });
    });

    // ③ ページを開いたときに初回実行
    filter();
});