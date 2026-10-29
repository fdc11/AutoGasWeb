/* =====================================================================
   inicio.js — AutoGas
   1. Menú móvil
   2. Aparición de elementos al hacer scroll
   3. Calculadora de ahorro
   4. Mapa de sedes (punto ↔ tarjeta)
   5. Carrusel de marcas
   6. Año del footer
   ===================================================================== */
(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- 1. Menú móvil ---------- */
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');

    function setMenu(open) {
        if (!toggle || !menu) return;
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        menu.hidden = !open;
        menu.classList.toggle('is-open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }

    if (toggle && menu) {
        toggle.addEventListener('click', () => setMenu(menu.hidden));
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); }
        });
        // Si se agranda la pantalla con el menú abierto, se cierra solo
        window.matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
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

    /* ---------- 3. Calculadora de ahorro ----------
       Con gas se paga aprox. el 40% de lo que se gasta en gasolina.
       Para cambiar la referencia, modifica FACTOR_GAS. */
    const FACTOR_GAS = 0.40;
    const gastoInput = document.getElementById('calcGasto');
    const outGas = document.getElementById('calcGas');
    const outAhorro = document.getElementById('calcAhorro');
    const outAnual = document.getElementById('calcAnual');
    const form = document.getElementById('calc');

    const soles = n => 'S/ ' + Math.round(n).toLocaleString('es-PE');

    function calcular() {
        const gasto = Math.min(99999, Math.max(0, parseFloat(gastoInput.value) || 0));
        const conGas = gasto * FACTOR_GAS;
        const ahorro = gasto - conGas;
        outGas.textContent = soles(conGas);
        outAhorro.textContent = soles(ahorro);
        outAnual.textContent = soles(ahorro * 12);
    }

    if (gastoInput && outGas && outAhorro && outAnual) {
        gastoInput.addEventListener('input', calcular);
        calcular();
    }
    if (form) form.addEventListener('submit', e => e.preventDefault());

    /* ---------- 4. Mapa de sedes ---------- */
    const pins = document.querySelectorAll('.pin[data-sede]');
    const cards = document.querySelectorAll('.sede-card[data-sede]');

    function activarSede(id) {
        pins.forEach(p => {
            const on = p.dataset.sede === id;
            p.classList.toggle('is-active', on);
            p.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        cards.forEach(c => c.classList.toggle('is-active', c.dataset.sede === id));
    }

    pins.forEach(p => p.addEventListener('click', () => {
        activarSede(p.dataset.sede);
        const card = document.querySelector('.sede-card[data-sede="' + p.dataset.sede + '"]');
        // En celular la lista queda debajo del mapa: llevamos al usuario a la tarjeta
        if (card && window.matchMedia('(max-width: 900px)').matches) {
            card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        }
    }));
    cards.forEach(c => {
        c.addEventListener('mouseenter', () => activarSede(c.dataset.sede));
        c.addEventListener('focusin', () => activarSede(c.dataset.sede));
    });

    /* ---------- 5. Carrusel de marcas ----------
       Se duplica la lista para que el movimiento sea continuo.
       La copia se oculta a lectores de pantalla. */
    const marquee = document.querySelector('.marquee');
    const track = marquee && marquee.querySelector('.marquee-track');
    const list = track && track.querySelector('.marquee-list');
    if (marquee && track && list && !reduceMotion) {
        const copia = list.cloneNode(true);
        copia.setAttribute('aria-hidden', 'true');
        copia.querySelectorAll('img').forEach(img => { img.alt = ''; });
        track.appendChild(copia);
        marquee.classList.add('is-running');
    }

    /* ---------- 6. Año del footer ---------- */
    const anio = document.getElementById('anio');
    if (anio) anio.textContent = new Date().getFullYear();
})();
