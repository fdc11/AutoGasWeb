/* =====================================================================
   comun.js — AutoGas
   Comportamiento compartido por todas las páginas:
   1. Menú de celular (panel que entra desde la derecha)
   2. Aparición de elementos al hacer scroll (.reveal)
   3. Año del footer
   Cada página agrega solo lo suyo en su propio JS.
   ===================================================================== */
(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- 1. Menú de celular ----------
       Se cierra con la X, con Escape o al elegir un enlace. */
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('navClose');
    let menuAbierto = false;

    function setMenu(open) {
        if (!toggle || !menu) return;
        menuAbierto = open;
        menu.classList.toggle('is-open', open);
        menu.inert = !open;
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) {
            setTimeout(() => closeBtn && closeBtn.focus(), 60);
        } else {
            toggle.focus();
        }
    }

    if (toggle && menu) {
        toggle.addEventListener('click', () => setMenu(true));
        if (closeBtn) closeBtn.addEventListener('click', () => setMenu(false));
        menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

        document.addEventListener('keydown', e => {
            if (!menuAbierto) return;
            if (e.key === 'Escape') { setMenu(false); return; }
            // Mantener el foco dentro del menú mientras está abierto
            if (e.key === 'Tab') {
                const focusables = menu.querySelectorAll('a, button');
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });
        window.matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches && menuAbierto) setMenu(false); });
    }

    /* ---------- 2. Aparición al hacer scroll ---------- */
    const reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || reduceMotion) {
        reveals.forEach(el => el.classList.add('is-visible'));
    } else {
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                // Escalonado suave entre elementos hermanos que entran juntos
                const siblings = el.parentElement ? Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal')) : [];
                const i = Math.max(0, siblings.indexOf(el));
                el.style.transitionDelay = Math.min(i * 80, 320) + 'ms';
                el.classList.add('is-visible');
                io.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => io.observe(el));
    }

    /* ---------- 3. Año del footer ---------- */
    const anio = document.getElementById('anio');
    if (anio) anio.textContent = new Date().getFullYear();
})();
