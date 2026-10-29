/* =====================================================================
   inicio.js — AutoGas
   1. Menú móvil
   2. Aparición de elementos al hacer scroll
   3. Calculadora de ahorro
   4. Sedes: pestañas + mapa
   5. Carrusel de marcas
   6. Video de portada
   7. Año del footer
   ===================================================================== */
(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- 1. Menú móvil ----------
       Panel que entra desde la derecha (mismo efecto que Nosotros).
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
            // Esperamos a que empiece a entrar el panel para mover el foco
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
        // Si se agranda la pantalla con el menú abierto, se cierra solo
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

    /* ---------- 4. Sedes: pestañas + mapa ----------
       Se muestra UNA sede a la vez. Se elige con las pestañas
       (clic o flechas del teclado) o tocando un punto del mapa. */
    const tabs = Array.from(document.querySelectorAll('.sede-tab[data-sede]'));
    const panels = document.querySelectorAll('.sede-detail[data-sede]');
    const pins = document.querySelectorAll('.pin[data-sede]');

    function activarSede(id, enfocar) {
        tabs.forEach(t => {
            const on = t.dataset.sede === id;
            t.classList.toggle('is-active', on);
            t.setAttribute('aria-selected', on ? 'true' : 'false');
            t.tabIndex = on ? 0 : -1;
            if (on && enfocar) t.focus();
            // En celular las pestañas se deslizan: dejamos visible la elegida
            if (on) t.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
        });
        panels.forEach(p => p.classList.toggle('is-active', p.dataset.sede === id));
        pins.forEach(p => p.classList.toggle('is-active', p.dataset.sede === id));
    }

    tabs.forEach((t, i) => {
        t.addEventListener('click', () => activarSede(t.dataset.sede));
        t.addEventListener('keydown', e => {
            let j = null;
            if (e.key === 'ArrowRight') j = (i + 1) % tabs.length;
            if (e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
            if (e.key === 'Home') j = 0;
            if (e.key === 'End') j = tabs.length - 1;
            if (j === null) return;
            e.preventDefault();
            activarSede(tabs[j].dataset.sede, true);
        });
    });
    pins.forEach(p => p.addEventListener('click', () => activarSede(p.dataset.sede)));

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

    /* ---------- 6. Video de portada ----------
       Si el usuario pidió menos movimiento o ahorro de datos, no se
       descarga el video y queda la imagen fija (poster). */
    const video = document.getElementById('heroVideo');
    if (video) {
        const ahorraDatos = navigator.connection && navigator.connection.saveData;
        if (reduceMotion || ahorraDatos) {
            video.removeAttribute('autoplay');
            video.pause();
            video.querySelectorAll('source').forEach(s => s.remove());
            video.load();
        } else {
            const p = video.play();
            if (p && p.catch) p.catch(() => { /* el navegador bloqueó el autoplay: queda el poster */ });
        }
    }

    /* ---------- 7. Año del footer ---------- */
    const anio = document.getElementById('anio');
    if (anio) anio.textContent = new Date().getFullYear();
})();
