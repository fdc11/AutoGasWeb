/* =============================================
   nosotros.js — AutoGas
   Scroll reveal · Counters · Navbar · Hamburger
============================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------------
       1. NAVBAR — scroll behavior
    ----------------------------------------------- */
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // run on load in case page is already scrolled


    /* -----------------------------------------------
       2. HAMBURGER / MOBILE MENU
    ----------------------------------------------- */
    const hamburger  = document.getElementById('hamburger');
    const mobileNav  = document.getElementById('mobileNav');

    window.toggleMenu = function () {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.classList.toggle('active', isOpen);
    };

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('open') &&
            !mobileNav.contains(e.target) &&
            !hamburger.contains(e.target)) {
            mobileNav.classList.remove('open');
            hamburger.classList.remove('active');
        }
    });


    /* -----------------------------------------------
       3. HERO — animate on load
    ----------------------------------------------- */
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        setTimeout(() => heroBg.classList.add('loaded'), 100);
    }

    const heroAnims = [
        '.hero-badge--anim',
        '.hero-title--anim',
        '.hero-sub--anim',
        '.hero-actions--anim'
    ];

    heroAnims.forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (el) {
            setTimeout(() => el.classList.add('visible'), 200 + i * 160);
        }
    });


    /* -----------------------------------------------
       4. SCROLL REVEAL — IntersectionObserver
    ----------------------------------------------- */
    const revealEls = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));


    /* -----------------------------------------------
       5. COUNTER ANIMATION — triggered on viewport entry
    ----------------------------------------------- */
    const counters = document.querySelectorAll('.impacto-num');

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1800;
        const start = performance.now();

        function easeOutExpo(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }

        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.round(easeOutExpo(progress) * target);
            el.textContent = value.toLocaleString('es-PE');
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(counter => counterObserver.observe(counter));


    /* -----------------------------------------------
       6. TIMELINE DOT — highlight on scroll
    ----------------------------------------------- */
    const tlDots = document.querySelectorAll('.tl-dot');

    const dotObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.borderColor = 'var(--red)';
                entry.target.style.background   = 'var(--red)';
            }
        });
    }, { threshold: 0.8 });

    tlDots.forEach(dot => dotObserver.observe(dot));


    /* -----------------------------------------------
       8. MARQUEE — accessibility
    ----------------------------------------------- */
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        marqueeTrack.setAttribute('role', 'marquee');
        marqueeTrack.setAttribute('aria-label', 'Certificaciones y alianzas de AutoGas');
    }

});
