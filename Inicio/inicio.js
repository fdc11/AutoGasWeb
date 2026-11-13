/* =====================================================================
   inicio.js — AutoGas · Página de Inicio
   1. (La portada ahora es una foto fija, sin video)
   2. Video del taller: botón de play propio, se descarga solo al reproducir
   3. Sedes: pestañas accesibles (clic y flechas del teclado)
   4. Carrusel de marcas: bucle continuo
   5. Reseñas (copiadas a mano en resenas-google.js): promedio + carrusel
   Lo compartido (menú de celular, .reveal, cifras que cuentan, año del
   footer) está en ../Comun/comun.js.
   ===================================================================== */
(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ahorraDatos = !!(navigator.connection && navigator.connection.saveData);

    /* ---------- 2. Video del taller: portada fija + ventana ----------
       El video no se descarga hasta que la persona abre la ventana.
       720p en computadora; 480p en celular o con "ahorro de datos". */
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('videoExpertos');
    const cerrar = document.getElementById('videoCerrar');
    const carga = document.getElementById('videoCarga');
    const abridores = document.querySelectorAll('[data-abrir-video]');
    if (modal && video && cerrar && abridores.length) {
        let ultimoFoco = null;
        const mostrarCarga = (si) => { if (carga) carga.hidden = !si; };

        const cargarFuente = () => {
            if (video.getAttribute('src')) return;
            const hd = window.matchMedia('(min-width: 901px)').matches && !ahorraDatos;
            video.src = hd ? video.dataset.hd : video.dataset.sd;
        };

        ['waiting', 'loadstart'].forEach(ev => video.addEventListener(ev, () => { if (!video.paused || ev === 'loadstart') mostrarCarga(true); }));
        ['playing', 'canplay', 'pause', 'error'].forEach(ev => video.addEventListener(ev, () => mostrarCarga(false)));

        const abrir = () => {
            ultimoFoco = document.activeElement;
            modal.hidden = false;
            document.body.style.overflow = 'hidden';
            cargarFuente();
            cerrar.focus();
            const p = video.play();
            if (p && p.catch) p.catch(() => mostrarCarga(false)); // sin autoplay: la persona usa los controles
        };

        const cerrarModal = () => {
            video.pause();
            mostrarCarga(false);
            if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
            modal.hidden = true;
            document.body.style.overflow = '';
            if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
        };

        abridores.forEach(b => b.addEventListener('click', abrir));
        cerrar.addEventListener('click', cerrarModal);
        // Clic en el fondo oscuro cierra
        modal.addEventListener('click', e => { if (e.target === modal) cerrarModal(); });
        // Esc cierra; Tab no se sale de la ventana
        modal.addEventListener('keydown', e => {
            if (e.key === 'Escape') { e.preventDefault(); cerrarModal(); return; }
            if (e.key !== 'Tab') return;
            const f = [...modal.querySelectorAll('button, a[href], video')].filter(el => el.offsetParent !== null);
            if (!f.length) return;
            const primero = f[0], ultimo = f[f.length - 1];
            if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
            else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
        });
        // Al terminar, vuelve al inicio para verlo otra vez
        video.addEventListener('ended', () => { video.currentTime = 0; });
    }

    /* ---------- 3. Sedes ---------- */
    const tabs = Array.from(document.querySelectorAll('.ig-sede-tab'));
    if (tabs.length) {
        const activar = (tab, enfocar) => {
            tabs.forEach(t => {
                const on = t === tab;
                t.classList.toggle('is-active', on);
                t.setAttribute('aria-selected', on ? 'true' : 'false');
                t.tabIndex = on ? 0 : -1;
                const panel = document.getElementById(t.getAttribute('aria-controls'));
                if (panel) panel.hidden = !on;
            });
            if (enfocar) tab.focus();
        };
        tabs.forEach((t, i) => {
            t.addEventListener('click', () => activar(t, false));
            t.addEventListener('keydown', e => {
                let j = null;
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') j = (i + 1) % tabs.length;
                else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
                else if (e.key === 'Home') j = 0;
                else if (e.key === 'End') j = tabs.length - 1;
                if (j === null) return;
                e.preventDefault();
                activar(tabs[j], true);
            });
        });
    }

    /* ---------- 4. Carrusel de marcas ----------
       Se duplica la lista para que el movimiento no tenga cortes.
       La copia se oculta a lectores de pantalla. */
    const mq = document.getElementById('marcasCarrusel');
    const mqList = mq && mq.querySelector('.ig-mq-list');
    if (mq && mqList && !reduceMotion) {
        const copia = mqList.cloneNode(true);
        copia.setAttribute('aria-hidden', 'true');
        copia.querySelectorAll('img').forEach(img => { img.alt = ''; });
        mq.appendChild(copia);
        mq.classList.add('is-running');
    }

    /* ---------- 5. Reseñas ----------
       Datos en resenas-google.js (copiados a mano desde Google Maps).
       - Muestra el PROMEDIO ENTRE SEDES, ponderado por el número de reseñas.
       - Carrusel con scroll nativo (dedo/trackpad), flechas, contador y barra.
       - Avanza solo cada 6 s salvo "reducir movimiento"; se pausa con el mouse
         encima, con el foco, al tocarlo, fuera de pantalla y con el botón (WCAG 2.2.2).
       Todo el texto entra con textContent: nada de una reseña se ejecuta. */
    const RES = window.RESENAS_GOOGLE;
    const resLista = document.getElementById('resLista');
    if (RES && RES.sedes && resLista) {
        const nodo = (tag, clase, texto) => {
            const n = document.createElement(tag);
            if (clase) n.className = clase;
            if (texto != null) n.textContent = texto;
            return n;
        };
        const decimal = n => n.toFixed(1).replace('.', ',');
        const estrellas = n => { const r = Math.round(n); return '★★★★★'.slice(0, r) + '☆☆☆☆☆'.slice(0, 5 - r); };
        const iniciales = nombre => nombre.replace(/\./g, '').split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase() || 'G';
        const linkSeguro = url => (/^https:\/\//.test(url || '') ? url : '');
        const dos = n => String(n).padStart(2, '0');
        const comillas = () => {
            const SVG = 'http://www.w3.org/2000/svg';
            const s = document.createElementNS(SVG, 'svg');
            s.setAttribute('class', 'ig-resena-q');
            s.setAttribute('width', '32'); s.setAttribute('height', '26'); s.setAttribute('viewBox', '0 0 40 32');
            s.setAttribute('fill', 'currentColor'); s.setAttribute('aria-hidden', 'true');
            const p = document.createElementNS(SVG, 'path');
            p.setAttribute('d', 'M15 2C8 4 2 10.5 2 19v11h14V16H9.5c.6-4.6 3.6-8 7.5-9.7L15 2zm22 0c-7 2-13 8.5-13 17v11h14V16h-6.5c.6-4.6 3.6-8 7.5-9.7L37 2z');
            s.append(p);
            return s;
        };

        // Promedio ponderado entre sedes
        let suma = 0, total = 0;
        Object.values(RES.sedes).forEach(s => {
            if (typeof s.puntaje === 'number' && s.total > 0) { suma += s.puntaje * s.total; total += s.total; }
        });
        if (total) {
            const prom = Math.round((suma / total) * 10) / 10;
            const p = document.getElementById('resPuntaje');
            const e = document.getElementById('resEstrellas');
            p.textContent = decimal(prom); p.hidden = false;
            e.textContent = estrellas(prom); e.hidden = false;
            e.setAttribute('aria-label', decimal(prom) + ' de 5 estrellas');
            document.getElementById('resTotal').textContent =
                'Promedio en Google · ' + total.toLocaleString('es-PE') + ' reseñas';
        }

        // Tarjetas
        const lista = (RES.resenas || []).filter(r => r && RES.sedes[r.sede] && String(r.texto || '').trim());
        lista.forEach((r, k) => {
            const sede = RES.sedes[r.sede];
            const autor = String(r.autor || 'Cliente de Google');
            const li = nodo('li', 'ig-resena');
            li.setAttribute('aria-label', 'Reseña ' + (k + 1) + ' de ' + lista.length);

            const top = nodo('div', 'ig-resena-top');
            // Sin estrellas por reseña: el archivo no guarda la nota de cada una
            top.append(comillas(), nodo('span', 'ig-resena-sede', 'Sede ' + sede.nombre));

            const pie = nodo('div', 'ig-resena-pie');
            const avatar = nodo('span', 'ig-resena-avatar', iniciales(autor));
            avatar.setAttribute('aria-hidden', 'true');
            const quien = nodo('div');
            quien.append(nodo('p', 'ig-resena-autor', autor));
            const meta = nodo('p', 'ig-resena-meta');
            const url = linkSeguro(sede.maps);
            if (url) {
                const a = nodo('a', null, 'Reseña de Google');
                a.href = url; a.target = '_blank'; a.rel = 'noopener';
                a.setAttribute('aria-label', 'Ver las reseñas de AutoGas ' + sede.nombre + ' en Google Maps (se abre en una pestaña nueva)');
                meta.append(a);
            } else {
                meta.textContent = 'Reseña de Google';
            }
            quien.append(meta);
            pie.append(avatar, quien);

            li.append(top, nodo('p', 'ig-resena-txt', String(r.texto).trim()), pie);
            resLista.append(li);
        });

        // Carrusel
        const carrusel = document.getElementById('resCarrusel');
        const controles = document.getElementById('resControles');
        const btnPrev = document.getElementById('resPrev');
        const btnNext = document.getElementById('resNext');
        const btnPausa = document.getElementById('resPausa');
        const elActual = document.getElementById('resActual');
        const elPasos = document.getElementById('resPasos');
        const barra = document.getElementById('resBarra');
        const tarjetas = Array.from(resLista.children);
        let pasos = 1, actual = 0, pausadoPorUsuario = false, hover = false, foco = false, enPantalla = false;

        const paso = () => (tarjetas.length > 1 ? tarjetas[1].offsetLeft - tarjetas[0].offsetLeft : resLista.clientWidth) || 1;
        const visibles = () => Math.max(1, Math.round((resLista.clientWidth + 1) / paso()));
        const indice = () => Math.min(pasos - 1, Math.round(resLista.scrollLeft / paso()));

        function ir(i) {
            i = (i + pasos) % pasos;
            resLista.scrollTo({ left: i * paso(), behavior: reduceMotion ? 'auto' : 'smooth' });
        }
        function actualizar() {
            actual = indice();
            elActual.textContent = dos(actual + 1);
            barra.style.width = ((actual + 1) / pasos * 100) + '%';
        }
        function medir() {
            pasos = Math.max(1, tarjetas.length - visibles() + 1);
            elPasos.textContent = dos(pasos);
            controles.hidden = pasos <= 1;
            actualizar();
        }
        function actualizarPausa() {
            btnPausa.classList.toggle('is-pausado', pausadoPorUsuario);
            btnPausa.setAttribute('aria-label', pausadoPorUsuario ? 'Reanudar el carrusel' : 'Pausar el carrusel');
        }

        let tick = null;
        resLista.addEventListener('scroll', () => {
            if (tick) return;
            tick = requestAnimationFrame(() => { tick = null; actualizar(); });
        }, { passive: true });
        btnPrev.addEventListener('click', () => ir(actual - 1));
        btnNext.addEventListener('click', () => ir(actual + 1));

        let resizeT;
        window.addEventListener('resize', () => { clearTimeout(resizeT); resizeT = setTimeout(medir, 150); });
        medir();

        if (!reduceMotion && tarjetas.length > 1) {
            btnPausa.hidden = false;
            btnPausa.addEventListener('click', () => { pausadoPorUsuario = !pausadoPorUsuario; actualizarPausa(); });
            carrusel.addEventListener('mouseenter', () => { hover = true; });
            carrusel.addEventListener('mouseleave', () => { hover = false; });
            carrusel.addEventListener('focusin', () => { foco = true; });
            carrusel.addEventListener('focusout', e => { if (!carrusel.contains(e.relatedTarget)) foco = false; });
            // Si la persona desliza con el dedo, ya está leyendo: no le movemos el carrusel
            resLista.addEventListener('touchstart', () => { pausadoPorUsuario = true; actualizarPausa(); }, { passive: true });
            if ('IntersectionObserver' in window) {
                new IntersectionObserver(en => { enPantalla = en[0].isIntersecting; }, { threshold: 0.4 }).observe(carrusel);
            } else {
                enPantalla = true;
            }
            setInterval(() => {
                if (pausadoPorUsuario || hover || foco || !enPantalla || document.hidden || pasos <= 1) return;
                ir(actual + 1);
            }, 6000);
        }
    }
})();
