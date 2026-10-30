/* =====================================================================
   comun.js — AutoGas
   Comportamiento compartido por todas las páginas:
   1. Menú de celular (panel que entra desde la derecha)
   2. Aparición de elementos al hacer scroll (.reveal)
   3. Año del footer
   4. Menú transparente sobre la portada, con color al bajar
   5. Cifras que cuentan de 0 a su valor al aparecer ([data-contar])
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

    /* ---------- 4. Menú transparente → con color al bajar ----------
       Si una página no tiene portada oscura arriba, agrega
       data-header="solid" al <body> y el menú siempre tendrá color. */
    const header = document.querySelector('.site-header');
    if (header) {
        const siempreSolido = document.body.dataset.header === 'solid';
        const actualizar = () => header.classList.toggle('is-solid', siempreSolido || window.scrollY > 40);
        window.addEventListener('scroll', actualizar, { passive: true });
        actualizar();
    }

    /* ---------- 5. Cifras que cuentan ----------
       Pon data-contar en el número: "+2 000", "7 sedes", "+15 años"…
       Cuenta solo la parte numérica y deja igual el resto del texto. */
    const cifras = document.querySelectorAll('[data-contar]');
    if (cifras.length && !reduceMotion && 'IntersectionObserver' in window) {
        const formato = (n, conEspacio) => conEspacio ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0') : String(n);
        const partes = el => {
            const m = el.textContent.match(/^(\D*)(\d[\d\s\u00A0]*\d|\d)(.*)$/s);
            if (!m) return null;
            return { antes: m[1], valor: parseInt(m[2].replace(/\D/g, ''), 10), espacio: /\s|\u00A0/.test(m[2]), despues: m[3] };
        };
        const contar = el => {
            const p = el._cifra; const t0 = performance.now(); const dur = 1400;
            const paso = t => {
                const k = Math.min(1, (t - t0) / dur);
                const e = 1 - Math.pow(1 - k, 3); // frena al final
                el.textContent = p.antes + formato(Math.round(p.valor * e), p.espacio) + p.despues;
                if (k < 1) requestAnimationFrame(paso);
            };
            requestAnimationFrame(paso);
        };
        const ioCifras = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                ioCifras.unobserve(entry.target);
                setTimeout(() => contar(entry.target), 250);
            });
        }, { threshold: 0.6 });
        cifras.forEach(el => {
            const p = partes(el);
            if (!p) return;
            el._cifra = p;
            el.setAttribute('aria-label', el.textContent.trim()); // los lectores de pantalla leen el valor final
            el.textContent = p.antes + '0' + p.despues;
            ioCifras.observe(el);
        });
    }
})();
