/* =============================================
   servicios.js — AutoGas
   Navbar · Hero · Scroll reveal · Counters
   Parallax
   ("Deja tu reseña" lleva a Google Maps; las reseñas se muestran
    solo en el Inicio, desde Inicio/resenas-google.js)
============================================= */

/* -----------------------------------------------
   TOGGLE GRUPOS DE SERVICIOS
----------------------------------------------- */
/**
 * Toggles the visibility of service groups (Mecánica, Conversión, Repuestos).
 * Collapses all other open groups before expanding the selected one.
 * 
 * @param {string} id - The ID of the service group to toggle.
 */
function toggleGrupo(id) {
    const todos = ['mecanica', 'conversion', 'repuestos'];
    const colapsable = document.getElementById('grupo-' + id);
    const btn = colapsable.previousElementSibling.querySelector('.grupo-toggle-btn');
    const label = btn.querySelector('.grupo-toggle-label');
    const isOpen = colapsable.classList.contains('abierto');

    // Cerrar TODOS primero
    todos.forEach(gid => {
        const col = document.getElementById('grupo-' + gid);
        if (!col) return;
        const b = col.previousElementSibling.querySelector('.grupo-toggle-btn');
        const lbl = b.querySelector('.grupo-toggle-label');
        col.style.maxHeight = '0';
        col.classList.remove('abierto');
        b.setAttribute('aria-expanded', 'false');
        lbl.textContent = gid === 'repuestos' ? 'Ver productos' : 'Ver servicios';
        // Resetear animaciones internas
        col.querySelectorAll('.subgrupo, .servicio-card, .repuesto-card').forEach(el => {
            el.classList.remove('grupo-visible');
        });
    });

    // Si estaba cerrado, abrirlo
    if (!isOpen) {
        colapsable.classList.add('abierto');
        colapsable.style.maxHeight = colapsable.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
        label.textContent = 'Ocultar servicios';

        // Animar subgrupos y cards con stagger
        const animables = colapsable.querySelectorAll('.subgrupo, .servicio-card, .repuesto-card');
        animables.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('grupo-visible');
            }, 60 + i * 55);
        });

        // Scroll suave al botón
        setTimeout(() => {
            btn.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
    }
}

/**
 * Toggles an accordion item open or closed.
 * Closes all other accordion items first.
 * 
 * @param {string} id - The ID of the accordion to toggle.
 */
function toggleAcordeon(id) {
    const acordeon = document.getElementById(id);
    const body = acordeon.querySelector('.acordeon-body');
    const trigger = acordeon.querySelector('.acordeon-trigger');
    const isOpen = acordeon.classList.contains('open');

    // Cerrar todos y resetear animaciones de sus items
    document.querySelectorAll('.acordeon').forEach(ac => {
        ac.classList.remove('open');
        const b = ac.querySelector('.acordeon-body');
        const t = ac.querySelector('.acordeon-trigger');
        b.style.maxHeight = '0';
        if (t) t.setAttribute('aria-expanded', 'false');
        ac.querySelectorAll('.ac-item').forEach(item => {
            item.classList.remove('ac-item--visible');
        });
    });

    // Abrir el clickeado (si estaba cerrado)
    if (!isOpen) {
        acordeon.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');

        // Animar items con stagger
        const items = acordeon.querySelectorAll('.ac-item');
        items.forEach((item, i) => {
            setTimeout(() => {
                item.classList.add('ac-item--visible');
            }, 80 + i * 45);
        });

        // Scroll suave hacia el acordeón
        setTimeout(() => {
            acordeon.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    /* 1–3. Menú, menú de celular y portada: El menú y el footer ahora están en ../Comun/comun.js y comun.css */


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
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));


    /* -----------------------------------------------
       5. COUNTER ANIMATION
    ----------------------------------------------- */
    const counters = document.querySelectorAll('.impacto-num[data-target]');

    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1800;
        const start = performance.now();

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

    counters.forEach(c => counterObserver.observe(c));

});


/* -----------------------------------------------
   SERVICIOS — la foto de cada categoría cambia según
   el subgrupo que estás viendo (solo en computadora)
----------------------------------------------- */
(function () {
    const escritorio = window.matchMedia('(min-width: 1025px)');
    if (!('IntersectionObserver' in window)) return;

    document.querySelectorAll('.svc-cat').forEach(seccion => {
        const fotos = Array.from(seccion.querySelectorAll('.svc-photo img'));
        const grupos = Array.from(seccion.querySelectorAll('.svc-group'));
        if (fotos.length < 2 || !grupos.length) return;

        const activar = i => fotos.forEach((f, k) => f.classList.toggle('is-active', k === Math.min(i, fotos.length - 1)));

        const obs = new IntersectionObserver(entradas => {
            if (!escritorio.matches) return;
            entradas.forEach(e => {
                if (e.isIntersecting) activar(grupos.indexOf(e.target));
            });
        }, { rootMargin: '-45% 0px -50% 0px' });

        grupos.forEach(g => obs.observe(g));
        escritorio.addEventListener('change', () => { if (!escritorio.matches) activar(0); });
    });
})();
