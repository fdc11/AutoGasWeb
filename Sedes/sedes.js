/* =====================================================================
   sedes.js — AutoGas
   Lo propio de la página Sedes (el menú, las animaciones al hacer
   scroll y el año del footer están en ../Comun/comun.js):
   1. Galería de cada sede (miniaturas + deslizar en celular)
   2. Visor de fotos a pantalla completa
   3. Filtros por servicio
   4. Barra de ciudades: marca la sede que estás viendo
   5. Mapa interactivo (Leaflet)
   ===================================================================== */

/* ---------------------------------------------------------------
   Datos para el mapa interactivo.
   ► La dirección, los teléfonos y las fotos de cada sede se editan
     directamente en sedes.html. Aquí solo van las coordenadas.
   ► Para cambiar el link de Google Maps, edita "Cómo llegar" en
     sedes.html (y "maps" aquí, si lo usas en el mapa).
--------------------------------------------------------------- */
const SEDES_MAPA = {
    ica:      { ciudad: 'Ica',      lat: -14.05906, lng: -75.74256, address: 'Av. Fernando León de Vivero N.º 304 — Ref. frente al Cementerio General de Saraja', areas: ['Atención al cliente', 'Ventas', 'Soporte técnico'] },
    lima:     { ciudad: 'Lima',     lat: -11.95456, lng: -77.07081, address: 'Jr. San Lino N.º 6318, Los Olivos, Lima', areas: ['Atención al cliente', 'Ventas', 'Soporte técnico'] },
    huancayo: { ciudad: 'Huancayo', lat: -12.04594, lng: -75.21781, address: 'Prol. Julio Sumar N.º 698, El Tambo, Huancayo', areas: ['Atención al cliente', 'Ventas', 'Soporte técnico'], principal: true },
    trujillo: { ciudad: 'Trujillo', lat: -8.08931,  lng: -79.03844, address: 'Av. Túpac Amaru 1633, Urb. Alto Mochica', areas: ['Ventas', 'Soporte técnico'] },
    nasca:    { ciudad: 'Nasca',    lat: -14.82806, lng: -74.94569, address: 'Av. Los Incas N.º 201 — Ref. frente a la agencia Ormeño', areas: ['Ventas', 'Soporte técnico'] },
    arequipa: { ciudad: 'Arequipa', lat: -16.42856, lng: -71.49956, address: 'Av. Túpac Amaru N.º 714, Campo Marte, Paucarpata', areas: ['Ventas', 'Soporte técnico'] },
    chincha:  { ciudad: 'Chincha',  lat: -13.45056, lng: -76.13681, address: 'Prolongación Lima N.º 636, Chincha Alta', areas: ['Ventas'] }
};

(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sedes = Array.from(document.querySelectorAll('.sede'));

    /* ---------- 1. Galería de cada sede ---------- */
    function fotosDe(sede) {
        return Array.from(sede.querySelectorAll('.sede-thumb'));
    }

    function mostrarFoto(sede, i) {
        const thumbs = fotosDe(sede);
        if (!thumbs.length) return;
        const idx = (i + thumbs.length) % thumbs.length;
        const t = thumbs[idx];
        const img = sede.querySelector('.sede-foto');
        const ciudad = sede.querySelector('.sede-ciudad').textContent.trim();

        thumbs.forEach(b => b.removeAttribute('aria-current'));
        t.setAttribute('aria-current', 'true');
        sede.dataset.foto = idx;
        sede.querySelector('.sede-contador').textContent = (idx + 1) + ' / ' + thumbs.length;

        const cambiar = () => {
            img.src = t.dataset.src;
            img.width = t.dataset.w;
            img.height = t.dataset.h;
            img.alt = 'Sede AutoGas ' + ciudad + ', foto ' + (idx + 1) + ' de ' + thumbs.length;
        };
        if (reduceMotion) { cambiar(); return; }
        img.classList.add('is-cambiando');
        setTimeout(() => {
            cambiar();
            const listo = () => img.classList.remove('is-cambiando');
            if (img.complete) listo(); else img.addEventListener('load', listo, { once: true });
        }, 180);
    }

    sedes.forEach(sede => {
        fotosDe(sede).forEach((t, i) => t.addEventListener('click', () => mostrarFoto(sede, i)));
        sede.querySelector('.sede-ampliar').addEventListener('click', () => abrirVisor(sede, Number(sede.dataset.foto || 0)));

        // Deslizar con el dedo sobre la foto grande para pasar fotos
        const main = sede.querySelector('.sede-main');
        let x0 = null, y0 = null;
        main.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
        main.addEventListener('touchend', e => {
            if (x0 === null) return;
            const dx = e.changedTouches[0].clientX - x0;
            const dy = e.changedTouches[0].clientY - y0;
            x0 = null;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
                e.preventDefault(); // que no abra el visor
                mostrarFoto(sede, Number(sede.dataset.foto || 0) + (dx < 0 ? 1 : -1));
            }
        });
    });

    /* ---------- 2. Visor de fotos ---------- */
    const visor = document.getElementById('visor');
    const vImg = document.getElementById('visorImg');
    const vCiudad = document.getElementById('visorCiudad');
    const vCont = document.getElementById('visorContador');
    let vSede = null, vIdx = 0, vOrigen = null;

    function pintarVisor() {
        const thumbs = fotosDe(vSede);
        vIdx = (vIdx + thumbs.length) % thumbs.length;
        const ciudad = vSede.querySelector('.sede-ciudad').textContent.trim();
        vImg.src = thumbs[vIdx].dataset.src;
        vImg.alt = 'Sede AutoGas ' + ciudad + ', foto ' + (vIdx + 1) + ' de ' + thumbs.length;
        vCiudad.textContent = ciudad;
        vCont.textContent = (vIdx + 1) + ' / ' + thumbs.length;
    }

    function abrirVisor(sede, i) {
        if (!visor || typeof visor.showModal !== 'function') return;
        vSede = sede; vIdx = i; vOrigen = document.activeElement;
        pintarVisor();
        visor.showModal();
        document.body.style.overflow = 'hidden';
    }

    if (visor) {
        const mover = d => { vIdx += d; pintarVisor(); };
        document.getElementById('visorPrev').addEventListener('click', () => mover(-1));
        document.getElementById('visorNext').addEventListener('click', () => mover(1));
        document.getElementById('visorCerrar').addEventListener('click', () => visor.close());
        visor.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') mover(-1);
            if (e.key === 'ArrowRight') mover(1);
        });
        visor.addEventListener('close', () => {
            document.body.style.overflow = '';
            // Deja la galería en la última foto vista
            if (vSede) mostrarFoto(vSede, vIdx);
            if (vOrigen) vOrigen.focus();
        });
        let vx = null;
        visor.addEventListener('touchstart', e => { vx = e.touches[0].clientX; }, { passive: true });
        visor.addEventListener('touchend', e => {
            if (vx === null) return;
            const dx = e.changedTouches[0].clientX - vx;
            vx = null;
            if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
        });
    }

    /* ---------- 3. Filtros por servicio ---------- */
    const filtros = document.querySelectorAll('.filtro');
    const saltos = document.querySelectorAll('.sede-salto a');
    const sinResultados = document.getElementById('sinResultados');

    function aplicarFiltro(filtro) {
        let visibles = 0;
        sedes.forEach(sede => {
            const ok = filtro === 'todos' || (sede.dataset.servicios || '').split(' ').includes(filtro);
            sede.hidden = !ok;
            // Alterna foto izquierda / derecha solo entre las que se ven
            sede.classList.toggle('sede-rev', ok && visibles % 2 === 1);
            if (ok) visibles++;
        });
        saltos.forEach(a => {
            const sede = document.getElementById(a.dataset.sede);
            a.parentElement.hidden = !sede || sede.hidden;
        });
        sinResultados.hidden = visibles !== 0;
    }

    filtros.forEach(btn => btn.addEventListener('click', () => {
        filtros.forEach(b => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
        aplicarFiltro(btn.dataset.filtro);
    }));

    /* ---------- 4. Barra de ciudades ---------- */
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                saltos.forEach(a => a.classList.toggle('is-active', a.dataset.sede === entry.target.id));
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sedes.forEach(s => io.observe(s));
    }

    /* ---------- 5. Mapa interactivo (Leaflet) ---------- */
    function iniciarMapa() {
        const el = document.getElementById('leafletMap');
        if (!el || typeof L === 'undefined') return;

        const map = L.map(el, { center: [-12.5, -75.8], zoom: 6, scrollWheelZoom: false });

        // Mosaicos gratuitos de OpenStreetMap (sin API key); el CSS los oscurece
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19
        }).addTo(map);

        Object.entries(SEDES_MAPA).forEach(([id, s]) => {
            const tam = s.principal ? 34 : 28;
            const icon = L.divIcon({
                className: '',
                html: '<div class="mapa-marcador' + (s.principal ? ' es-principal' : '') + '" style="width:' + tam + 'px;height:' + tam + 'px"><span></span></div>',
                iconSize: [tam, tam],
                iconAnchor: [tam / 2, tam / 2]
            });

            const popup = document.createElement('div');
            popup.innerHTML =
                '<p class="map-popup-city"></p>' +
                '<p class="map-popup-address"></p>' +
                '<p class="map-popup-areas"></p>' +
                '<button type="button" class="map-popup-btn">Ver sede y contacto</button>';
            popup.querySelector('.map-popup-city').textContent = s.ciudad;
            popup.querySelector('.map-popup-address').textContent = s.address;
            popup.querySelector('.map-popup-areas').innerHTML = s.areas.map(a => a.replace(/</g, '&lt;')).join('<br>');
            popup.querySelector('.map-popup-btn').addEventListener('click', () => {
                map.closePopup();
                const sede = document.getElementById(id);
                if (sede) {
                    if (sede.hidden) document.querySelector('.filtro[data-filtro="todos"]').click();
                    sede.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
                }
            });

            L.marker([s.lat, s.lng], { icon: icon, title: 'Sede ' + s.ciudad, alt: 'Sede ' + s.ciudad })
                .bindPopup(popup, { maxWidth: 260, minWidth: 220 })
                .addTo(map);
        });
    }

    iniciarMapa();
})();
