/* =====================================================================
   inicio.js — AutoGas
   (El menú, la aparición al hacer scroll y el año del footer
    están en ../Comun/comun.js)
   3. Calculadora de ahorro
   4. Sedes: pestañas + mapa
   5. Carrusel de marcas
   6. Video de portada
   7. Año del footer
   8. Reseñas de Google por sede
   ===================================================================== */
(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    /* ---------- 8. Reseñas de Google por sede ----------
       MODO MANUAL (USAR_API = false): las reseñas salen de resenas-google.js,
       copiadas a mano desde Google Maps.
       MODO AUTOMÁTICO (USAR_API = true): se piden a ../api/resenas.php, que
       consulta Google con una clave de Google Cloud (ver api/README.md).
       Todo el texto se inserta con textContent: nada de lo escrito en una
       reseña puede ejecutarse en la página. */
    const USAR_API = false;
    const SEDES_RESENAS = {
        ica:      { id: 'ChIJ-cH_FMDjEJERt0_WLrs4rQA', maps: 'https://maps.app.goo.gl/YMV6tFCKN7JVeh2y5' },
        lima:     { id: 'ChIJqxd8OJ_PBZERg-K0zRF7974', maps: 'https://maps.app.goo.gl/iNqeFaF4HxDeTaQY8' },
        huancayo: { id: 'ChIJ-RKreZmXDpERY0k7XdvJfQc', maps: 'https://maps.app.goo.gl/npbMCgnDuciJp9Vi6' },
        trujillo: { id: 'ChIJQ3wZaak9rZERs4gU_sGumN0', maps: 'https://maps.app.goo.gl/51nNhVFkDhbSYz3G8' }
    };
    const MOSTRAR = 3; // tarjetas visibles por sede
    const resTabs = Array.from(document.querySelectorAll('.resenas-tabs [data-resena]'));
    const resPanel = document.getElementById('resPanel');
    if (resTabs.length && resPanel) {
        const $ = id => document.getElementById(id);
        const lista = $('resLista'), estado = $('resEstado');
        const cache = {}; // solo en memoria, durante esta visita
        let actual = 'ica', pedido = 0;

        const nodo = (tag, clase, texto) => {
            const n = document.createElement(tag);
            if (clase) n.className = clase;
            if (texto != null) n.textContent = texto;
            return n;
        };
        const estrellasTxt = n => '★★★★★'.slice(0, Math.round(n)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(n));
        const decimal = n => n.toFixed(1).replace('.', ',');
        const iniciales = nombre => nombre.split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0]).join('').toUpperCase() || 'G';
        const linkSeguro = url => (/^https:\/\//.test(url || '') ? url : '');

        // Reseñas copiadas a mano (resenas-google.js) con el mismo formato que la API
        function datosManuales(sede) {
            const base = window.RESENAS_GOOGLE && window.RESENAS_GOOGLE.sedes && window.RESENAS_GOOGLE.sedes[sede];
            if (!base) return null;
            const s = SEDES_RESENAS[sede];
            return {
                puntaje: typeof base.puntaje === 'number' ? base.puntaje : null,
                total: base.total || null,
                mapsUrl: s.maps,
                resenas: (base.resenas || [])
                    .filter(r => r && r.estrellas >= 4 && String(r.texto || '').trim())
                    .map(r => ({
                        autor: String(r.autor || 'Cliente de Google'), autorUrl: '', foto: '',
                        estrellas: Number(r.estrellas), texto: String(r.texto).trim(),
                        traducida: false, hace: String(r.fecha || ''), url: s.maps
                    }))
            };
        }

        function enlacesSede(sede, datos) {
            const s = SEDES_RESENAS[sede];
            $('resVer').href = (datos && linkSeguro(datos.mapsUrl)) || s.maps;
            if ($('resNotaLink')) $('resNotaLink').href = $('resVer').href;
            $('resDejar').href = 'https://search.google.com/local/writereview?placeid=' + encodeURIComponent(s.id);
        }

        function tarjeta(r) {
            const li = nodo('li', 'resena');
            const head = nodo('div', 'resena-head');
            let avatar;
            if (linkSeguro(r.foto)) {
                avatar = nodo('img', 'resena-avatar');
                avatar.src = r.foto; avatar.alt = ''; avatar.width = 44; avatar.height = 44;
                avatar.loading = 'lazy'; avatar.referrerPolicy = 'no-referrer';
                avatar.addEventListener('error', () => avatar.replaceWith(nodo('span', 'resena-avatar', iniciales(r.autor))), { once: true });
            } else {
                avatar = nodo('span', 'resena-avatar', iniciales(r.autor));
            }
            avatar.setAttribute('aria-hidden', 'true');
            const quien = nodo('div');
            const autor = linkSeguro(r.autorUrl) ? nodo('a', 'resena-autor', r.autor) : nodo('span', 'resena-autor', r.autor);
            if (autor.tagName === 'A') { autor.href = r.autorUrl; autor.target = '_blank'; autor.rel = 'noopener'; }
            quien.append(autor, nodo('p', 'resena-meta', ['Reseña de Google', r.hace].filter(Boolean).join(' · ')));
            head.append(avatar, quien);

            const est = nodo('p', 'resena-stars', estrellasTxt(r.estrellas));
            est.setAttribute('aria-label', r.estrellas + ' de 5 estrellas');
            li.append(head, est, nodo('p', 'resena-texto', '“' + r.texto + '”'));
            if (linkSeguro(r.url)) {
                const ver = nodo('a', 'resena-link', r.traducida ? 'Traducida por Google · ver original' : 'Ver en Google Maps');
                ver.href = r.url; ver.target = '_blank'; ver.rel = 'noopener';
                li.append(ver);
            }
            return li;
        }

        function pintar(sede, datos) {
            enlacesSede(sede, datos);
            lista.replaceChildren();
            const puntaje = $('resPuntaje'), est = $('resEstrellas'), total = $('resTotal');
            if (!datos) {
                puntaje.hidden = est.hidden = true;
                total.textContent = 'Reseñas en Google Maps';
                estado.textContent = 'No pudimos cargar las reseñas en este momento. Míralas directamente en Google Maps.';
                return;
            }
            if (typeof datos.puntaje === 'number') {
                puntaje.textContent = decimal(datos.puntaje); puntaje.hidden = false;
                est.textContent = estrellasTxt(datos.puntaje); est.hidden = false;
                est.setAttribute('aria-label', decimal(datos.puntaje) + ' de 5 estrellas');
            } else { puntaje.hidden = est.hidden = true; }
            total.textContent = 'en Google' + (datos.total ? ' · ' + datos.total.toLocaleString('es-PE') + ' reseñas' : '');
            (datos.resenas || []).slice(0, MOSTRAR).forEach(r => lista.append(tarjeta(r)));
            estado.textContent = lista.children.length ? '' : 'Lee lo que opinan nuestros clientes de esta sede en Google Maps.';
        }

        async function cargar(sede) {
            const n = ++pedido;
            if (cache[sede] !== undefined) { pintar(sede, cache[sede]); return; }
            if (!USAR_API) { cache[sede] = datosManuales(sede); pintar(sede, cache[sede]); return; }
            resPanel.setAttribute('aria-busy', 'true');
            estado.textContent = 'Cargando reseñas…';
            let datos = null;
            try {
                const ctrl = new AbortController();
                const t = setTimeout(() => ctrl.abort(), 10000);
                const r = await fetch('../api/resenas.php?sede=' + encodeURIComponent(sede), { signal: ctrl.signal, headers: { Accept: 'application/json' } });
                clearTimeout(t);
                const tipo = r.headers.get('content-type') || '';
                if (r.ok && tipo.includes('application/json')) datos = await r.json();
            } catch (_) { datos = null; } // sin conexión, tiempo agotado o servidor sin PHP
            if (datos && (datos.disponible === false || !Array.isArray(datos.resenas))) datos = null;
            if (datos) cache[sede] = datos; // los errores no se guardan: se reintenta al volver a la pestaña
            if (n !== pedido) return; // el usuario ya cambió de pestaña
            resPanel.removeAttribute('aria-busy');
            pintar(sede, datos);
        }

        function elegir(sede, enfocar) {
            actual = sede;
            resTabs.forEach(t => {
                const on = t.dataset.resena === sede;
                t.classList.toggle('is-active', on);
                t.setAttribute('aria-selected', on ? 'true' : 'false');
                t.tabIndex = on ? 0 : -1;
                if (on) { resPanel.setAttribute('aria-labelledby', t.id); if (enfocar) t.focus(); }
            });
            enlacesSede(sede, cache[sede]);
            cargar(sede);
        }

        resTabs.forEach((t, i) => {
            t.addEventListener('click', () => elegir(t.dataset.resena));
            t.addEventListener('keydown', e => {
                let j = null;
                if (e.key === 'ArrowRight') j = (i + 1) % resTabs.length;
                if (e.key === 'ArrowLeft') j = (i - 1 + resTabs.length) % resTabs.length;
                if (e.key === 'Home') j = 0;
                if (e.key === 'End') j = resTabs.length - 1;
                if (j === null) return;
                e.preventDefault();
                elegir(resTabs[j].dataset.resena, true);
            });
        });

        // Primera carga: cuando la sección está por aparecer en pantalla
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver(entries => {
                if (!entries.some(en => en.isIntersecting)) return;
                io.disconnect();
                cargar(actual);
            }, { rootMargin: '400px 0px' });
            io.observe(resPanel);
        } else {
            cargar(actual);
        }
    }

    /* ---------- 7. Año del footer ---------- */
    const anio = document.getElementById('anio');
    if (anio) anio.textContent = new Date().getFullYear();
})();
