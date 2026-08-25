document.addEventListener('DOMContentLoaded', () => {

    // --- ANIMATION OBSERVER ---
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');
                observer.unobserve(entry.target); // One-time animation
            }
        });
    }, observerOptions);

    // Helper to setup animation
    // elem: element or selector string
    // classes: array of classes for initial state (e.g., ['anim-target', 'anim-hidden', 'anim-up'])
    const setupAnim = (elem, classes) => {
        const el = typeof elem === 'string' ? document.querySelector(elem) : elem;
        if (el) {
            el.classList.add(...classes, 'anim-target');
            observer.observe(el);
        }
    };

    const setupAnimAll = (selector, classes, stagger = 0) => {
        const els = document.querySelectorAll(selector);
        els.forEach((el, index) => {
            el.classList.add(...classes, 'anim-target');
            if (stagger > 0) {
                el.style.transitionDelay = `${index * stagger}s`;
            }
            observer.observe(el);
        });
    };

    // --- SECTIONS CONFIGURATION ---

    // ① HERO
    // BG: opacity 0.9->1, scale 1.03->1 (0.8s)
    setupAnim('.hero-bg', ['anim-hidden', 'anim-scale-up-init', 'duration-800']);
    // Title: translateY +20px->0, opacity 0->1 (0.6s)
    setupAnim('.hero h1', ['anim-hidden', 'anim-up', 'duration-600']);
    // Sub-copy (Japanese): same as title? User said "Title". Let's assume just H1. 
    // Wait, user listed "Main Visual, Title, Sub-copy, CTA".
    // Sub-copy:
    setupAnim('.hero .jp-sub', ['anim-hidden', 'anim-up', 'duration-600', 'delay-100']); // Slight delay
    setupAnim('.hero .hero-desc', ['anim-hidden', 'anim-up', 'duration-600', 'delay-200']);
    // CTA: translateY +10px->0, opacity 0->1, delay 0.2s (relative to what? let's just use fixed delay)
    setupAnim('.hero .btn', ['anim-hidden', 'anim-up', 'duration-600', 'delay-400']); /* 200ms after text */

    // ② VARIETY (Overview)
    // Edition List (Image): translateX -20px->0, opacity 0->1, delay 0.12s
    // "Mobile: Fade up". We can use media queries in CSS to switch 'anim-left' to 'anim-up' if strictly needed, 
    // but user said "Automated switch to fade-up is OK".
    // I will use anim-left for all as base, maybe strictly fade-up for mobile via CSS override if I added that class.
    // For now, let's stick to simple translate.
    setupAnim('.sec2-img', ['anim-hidden', 'anim-left', 'duration-600', 'delay-120']);

    // ③ ADAM NORRIS (About) / Story (Section 06)
    // Image: opacity 0->1 (0.6s)
    setupAnim('.about-img', ['anim-hidden', 'duration-600']);
    // Text: opacity 0->1 (delay 0.2s)
    setupAnim('.about .text-col', ['anim-hidden', 'duration-600', 'delay-200']);

    // ④ MCL38 (Edition 02)
    // Accent (Line under heading): ScaleX 0->1 (0.4s)
    // We don't have an explicit line element. I'll animate the Heading itself or create a pseudo? 
    // Let's animate the heading and the label.
    // User said "Accent element UNDER heading".
    // Let's assume the user might have imagined a line.
    // I will animate the heading (H2) and label with simple fade/slide.
    // Wait, strict requirement: "Accent scaleX 0->1".
    // IF there isn't one, I cannot animate it. I'll add a border-bottom to H2 in animation state?
    // Let's just animate the H2 reveal.
    // Image: translateY +30px->0, opacity 0->1
    setupAnim('#edition-02 .product-img', ['anim-hidden', 'anim-up', 'duration-600']);

    // ⑤ CHROME (Edition 01)
    // Image: opacity 0->1, blur 2px->0 (0.5s)
    setupAnim('#edition-01 .product-img', ['anim-hidden', 'anim-blur', 'duration-600']); // Using 0.6s closest to 0.5s
    // Text: opacity 0->1, delay 0.15s
    setupAnim('#edition-01 .text-col', ['anim-hidden', 'duration-600', 'delay-150']);

    // ⑥ ABOUT PURE ELECTRIC (Section 06 / or 07 intro? User said "Each block scrolls trigger")
    // If this refers to Section 07 Text blocks (intro):
    setupAnim('.tech .sec7-con01', ['anim-hidden', 'anim-up', 'duration-600']);

    // ⑦ TECHNOLOGY (Grid 3 col)
    // "PC Hover ... SP Tap ... " -> This is CSS.
    // However, I should animate their ENTRY too.
    // It's not explicitly listed in "Movements" for animation entry, but usually everything enters.
    // User didn't specify ENTRY for Section 07, just Hover/Tap.
    // But good practice is to fade them in? 
    // User: "About Pure Electric (No. 6) ... All blocks ...". Maybe Section 07 blocks are counted there?
    // Let's fade in Section 07 container.
    setupAnim('.grid-3-col', ['anim-hidden', 'anim-up', 'duration-600']);

    // ⑧ FROM TRACK TO STREET (Section 08)
    // Wide visual (bg? or image?): opacity 0->1, translateX -20px->0
    setupAnim('.heritage-full-img', ['anim-hidden', 'anim-left', 'duration-800']);
    // Copy: opacity 0->1, delay 0.2s
    setupAnim('#heritage .container', ['anim-hidden', 'duration-600', 'delay-200']); // Animate the text container

    // ⑨ FINAL CTA
    // Pulse (Always) -> Added class .pulse-anim in CSS.
    // We need to ADD this class. It runs infinitely.
    const finalBtn = document.querySelector('#final-cta .btn-primary');
    if (finalBtn) finalBtn.classList.add('pulse-anim');

    // Gallery Logic (Existing)
    window.changeImage = function (element) {
        // Find the closest gallery container
        const container = element.closest('.gallery-container');
        if (!container) return;

        // Find main image in this container
        const mainImg = container.querySelector('.main-img');

        // Remove active class from all thumbs in this container
        const thumbs = container.querySelectorAll('.thumb-img');
        thumbs.forEach(img => img.classList.remove('active'));

        // Add active class to clicked thumb
        element.classList.add('active');

        // Update main image source
        // smooth transition
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = element.src;
            mainImg.style.opacity = '1';
        }, 300);
    }
});
