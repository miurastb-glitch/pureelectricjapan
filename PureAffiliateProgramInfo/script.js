document.addEventListener('DOMContentLoaded', () => {
    // 1. ナビゲーションのアクティブ設定とメニュー初期化
    setActiveNavigation();
    initHeaderMenu();

    // 2. アコーディオンなどの非共通部分の初期化
    initAccordion();
    initSmoothScroll();

    // 3. 商品スライドショーの初期化
    initProductSlideshow();
});

// アクティブページのナビゲーション強調表示
function setActiveNavigation() {
    const currentPath = window.location.pathname;
    let filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    // パスが空またはスラッシュのみの場合は index.html とみなす
    if (!filename || filename === '/') {
        filename = 'index.html';
    }

    const navLinks = document.querySelectorAll('.header-nav a, .footer-nav a');
    navLinks.forEach(link => {
        // パスやパラメータを除外して比較
        const href = link.getAttribute('href');
        if (href === filename) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ヘッダーメニュー（モバイル対応ハンバーガーメニュー）の初期化
function initHeaderMenu() {
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.header-menu-toggle');
    const headerMenu = document.querySelector('.header-menu');

    if (!header || !menuToggle || !headerMenu) return;

    const closeMenu = () => {
        header.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'メニューを開く');
        document.body.classList.remove('menu-open');
    };

    menuToggle.addEventListener('click', () => {
        const isOpen = header.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        menuToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
        document.body.classList.toggle('menu-open', isOpen);
    });

    headerMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
        if (!header.classList.contains('menu-open')) return;

        const isInsideMenu = headerMenu.contains(event.target);
        const isToggle = menuToggle.contains(event.target);

        if (!isInsideMenu && !isToggle) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

// アコーディオンの初期化
function initAccordion() {
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            acc.classList.toggle('active');
            const panel = acc.nextElementSibling;

            if (panel) {
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        });
    });
}

// スムーズスクロールの初期化
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// スライドショーのスクロールアニメーション初期化 (IntersectionObserver)
function initProductSlideshow() {
    const slideshow = document.getElementById('product-slideshow');
    if (!slideshow) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                slideshow.classList.add('play-animation');
            } else {
                slideshow.classList.remove('play-animation');
            }
        });
    }, {
        threshold: 0.1 // 10%以上表示されたら検知
    });

    observer.observe(slideshow);
}
