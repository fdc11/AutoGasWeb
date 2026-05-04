/* =============================================
   sedes.js — AutoGas
   Navbar · Hero · Filtros · Modal · Leaflet
============================================= */

/* --------------------------------------------------
   DATA — Sedes
   ► Para cambiar el link de Google Maps de cada sede,
     edita el campo "maps" con la URL que quieras.
     Tip: abre Google Maps, busca la dirección exacta,
     y copia la URL del navegador.
-------------------------------------------------- */
const SEDES_DATA = {
    ica: {
        ciudad:   'Ica',
        region:   'Región Ica',
        address:  'Av. Fernando León de Vivero N°304 - Ref. Frente al Cementerio General de Saraja',
        maps:     'https://maps.app.goo.gl/PZdiW36SM2awhmtSA',
        lat: -14.0677, lng: -75.7286,
        areas: [
            { tipo: 'atencion', nombre: 'Atención al Cliente', telefono: '984851714' },
            { tipo: 'ventas',   nombre: 'Ventas',              telefono: '978421654' },
            { tipo: 'soporte',  nombre: 'Soporte Técnico',     telefono: '942058613' }
        ],
        whatsapp: '51984851714'
    },
    lima: {
        ciudad:   'Lima',
        region:   'Región Lima',
        address:  'Jr. San Lino N°6318 - Los Olivos, Lima',
        maps:     'https://maps.app.goo.gl/c628PPCCC9cx2U5w5',
        lat: -11.9785, lng: -77.0694,
        areas: [
            { tipo: 'atencion', nombre: 'Atención al Cliente', telefono: '942623696' },
            { tipo: 'ventas',   nombre: 'Ventas',              telefono: '971799721' },
            { tipo: 'soporte',  nombre: 'Soporte Técnico',     telefono: '969952447' }
        ],
        whatsapp: '51942623696'
    },
    huancayo: {
        ciudad:   'Huancayo',
        region:   'Región Junín',
        address:  'Prol. Julio Sumar N°698, El Tambo - Huancayo',
        maps:     'https://maps.app.goo.gl/GkT1hSnraskuAcUq9',
        lat: -12.0431, lng: -75.2048,
        areas: [
            { tipo: 'atencion', nombre: 'Atención al Cliente', telefono: '942867212' },
            { tipo: 'ventas',   nombre: 'Ventas',              telefono: '975829713' },
            { tipo: 'soporte',  nombre: 'Soporte Técnico',     telefono: '975750903' }
        ],
        whatsapp: '51942867212'
    },
    trujillo: {
        ciudad:   'Trujillo',
        region:   'Región La Libertad',
        address:  'Av. Tupac Amaru 1633 - Urb. Alto Mochica',
        maps:     'https://maps.app.goo.gl/o6rotDnpewJ7Aiwq5',
        lat: -8.0784, lng: -79.0326,
        areas: [
            { tipo: 'ventas',  nombre: 'Ventas',          telefono: '937695830' },
            { tipo: 'soporte', nombre: 'Soporte Técnico', telefono: '974596922' }
        ],
        whatsapp: '51937695830'
    },
    nasca: {
        ciudad:   'Nasca',
        region:   'Región Ica',
        address:  'Av. Los Incas N°201 - Ref. Frente a la Agencia Ormeño',
        maps:     'https://maps.app.goo.gl/V51hHVnhix8rHUdR6',
        lat: -14.8294, lng: -74.9389,
        areas: [
            { tipo: 'ventas',  nombre: 'Ventas',          telefono: '939067488' },
            { tipo: 'soporte', nombre: 'Soporte Técnico', telefono: '976812208' }
        ],
        whatsapp: '51939067488'
    },
    arequipa: {
        ciudad:   'Arequipa',
        region:   'Región Arequipa',
        address:  'Av. Túpac Amaru N°714 - Campo Marte Paucarpata',
        maps:     'https://maps.app.goo.gl/qG2XawRA8xHF2MTb7',
        lat: -16.4205, lng: -71.4949,
        areas: [
            { tipo: 'ventas',  nombre: 'Ventas',          telefono: '975338252' },
            { tipo: 'soporte', nombre: 'Soporte Técnico', telefono: '949496098' }
        ],
        whatsapp: '51975338252'
    },
    chincha: {
        ciudad:   'Chincha',
        region:   'Región Ica',
        address:  'Prolongación Lima N°636 - Chincha Alta',
        maps:     'https://maps.app.goo.gl/Yd5pahYnQDLtYxWVA',
        lat: -13.4098, lng: -76.1350,
        areas: [
            { tipo: 'ventas', nombre: 'Ventas', telefono: '930210613' }
        ],
        whatsapp: '51930210613'
    }
};

/* Área icons (SVG strings) */
const AREA_ICONS = {
    atencion: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12 19.79 19.79 0 01.07 3.4 2 2 0 012.03 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
    ventas:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
    soporte:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M20 12h2M2 12h2M12 20v2M12 2v2"/></svg>`
};

/* Phone SVG */
const PHONE_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12 19.79 19.79 0 01.07 3.4 2 2 0 012.03 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`;

/* =============================================
   DOM READY
============================================= */
document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------------
       1. NAVBAR — scroll behavior
    ----------------------------------------------- */
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();


    /* -----------------------------------------------
       2. HAMBURGER / MOBILE MENU
    ----------------------------------------------- */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    window.toggleMenu = function () {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.classList.toggle('active', isOpen);
    };

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
    if (heroBg) setTimeout(() => heroBg.classList.add('loaded'), 100);

    const heroAnims = ['.hero-badge--anim', '.hero-title--anim', '.hero-sub--anim', '.hero-actions--anim'];
    heroAnims.forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (el) setTimeout(() => el.classList.add('visible'), 200 + i * 160);
    });


    /* -----------------------------------------------
       4. SCROLL REVEAL — IntersectionObserver
    ----------------------------------------------- */
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));


    /* -----------------------------------------------
       5. PARALLAX — hero background
    ----------------------------------------------- */
    const heroBgEl = document.querySelector('.hero-bg');

    window.addEventListener('scroll', () => {
        if (!heroBgEl) return;
        heroBgEl.style.transform = `scale(1) translateY(${window.scrollY * 0.25}px)`;
    }, { passive: true });


    /* -----------------------------------------------
       6. FILTROS — pill filter sin reload
    ----------------------------------------------- */
    const filterPills = document.querySelectorAll('.filter-pill');
    const sedeCards   = document.querySelectorAll('.sede-card');
    const noResults   = document.getElementById('noResults');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filter = pill.dataset.filter;
            let visibleCount = 0;

            sedeCards.forEach((card) => {
                const servicios = card.dataset.servicios || '';
                const show = filter === 'todos' || servicios.includes(filter);

                if (show) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(24px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, visibleCount * 60);
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                    card.style.opacity = '';
                    card.style.transform = '';
                    card.style.transition = '';
                }
            });

            noResults.style.display = visibleCount === 0 ? 'flex' : 'none';
        });
    });


    /* -----------------------------------------------
       7. MODAL — abrir/cerrar
    ----------------------------------------------- */
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose   = document.getElementById('modalClose');

    /**
     * Builds the content of the modal with data from the specified sede.
     * @param {string} sedeKey - The key of the sede in SEDES_DATA.
     */
    function buildModalContent(sedeKey) {
        const data = SEDES_DATA[sedeKey];
        if (!data) return;

        document.getElementById('modalRegion').textContent      = data.region;
        document.getElementById('modalTitle').textContent       = data.ciudad;
        document.getElementById('modalAddressText').textContent = data.address;
        document.getElementById('modalAddress').href            = data.maps;

        // WhatsApp link
        const waBtn = document.getElementById('modalWhatsApp');
        waBtn.href = `https://wa.me/${data.whatsapp}?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20las%20conversiones%20GNV%2FGLP%20en%20la%20sede%20${encodeURIComponent(data.ciudad)}`;

        // Áreas
        const areasEl = document.getElementById('modalAreas');
        areasEl.innerHTML = data.areas.map(area => `
            <div class="modal-area-row">
                <div class="modal-area-icon ${area.tipo}">
                    ${AREA_ICONS[area.tipo] || ''}
                </div>
                <div class="modal-area-info">
                    <div class="modal-area-name">${area.nombre}</div>
                    <div class="modal-area-phone">${area.telefono}</div>
                </div>
                <a href="tel:${area.telefono.replace(/\D/g,'')}" class="modal-area-call" title="Llamar">
                    ${PHONE_ICON}
                </a>
            </div>
        `).join('');
    }

    /**
     * Opens the sede details modal and disables body scrolling.
     * @param {string} sedeKey - The key of the sede in SEDES_DATA.
     */
    function openModal(sedeKey) {
        buildModalContent(sedeKey);
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Closes the sede details modal and restores body scrolling.
     */
    function closeModal() {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Botones "Ver detalles" en cards
    document.querySelectorAll('.sede-card-btn').forEach(btn => {
        btn.addEventListener('click', () => openModal(btn.dataset.sede));
    });

    // Botón cerrar
    modalClose.addEventListener('click', closeModal);

    // Clic fuera del modal
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
    });


    /* -----------------------------------------------
       8. LEAFLET MAP — inicialización
    ----------------------------------------------- */
    initLeafletMap();

    /**
     * Initializes the Leaflet map, adds tile layers, and places markers for each sede.
     */
    function initLeafletMap() {
        if (typeof L === 'undefined') return;

        const map = L.map('leafletMap', {
            center: [-12.5, -75.8],
            zoom:   6,
            zoomControl: true,
            attributionControl: true
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        function createMarkerIcon(isMain) {
            const size = isMain ? 14 : 11;
            return L.divIcon({
                className: '',
                html: `
                    <div style="
                        position:relative;
                        width:${size * 2 + 8}px;
                        height:${size * 2 + 8}px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                    ">
                        <div style="
                            position:absolute;
                            width:${size * 2 + 8}px;
                            height:${size * 2 + 8}px;
                            background:rgba(223,4,21,0.25);
                            border-radius:50%;
                            animation:leafletPulse 2s ease-out infinite;
                        "></div>
                        <div style="
                            width:${size}px;
                            height:${size}px;
                            background:#df0415;
                            border:2px solid #fff;
                            border-radius:50%;
                            box-shadow:0 0 8px rgba(223,4,21,0.7);
                            position:relative;
                            z-index:1;
                        "></div>
                    </div>
                `,
                iconSize:   [size * 2 + 8, size * 2 + 8],
                iconAnchor: [size + 4, size + 4]
            });
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes leafletPulse {
                0%   { transform:scale(0.5); opacity:0.8; }
                100% { transform:scale(2);   opacity:0; }
            }
        `;
        document.head.appendChild(style);

        Object.entries(SEDES_DATA).forEach(([key, sede]) => {
            const isMain = key === 'ica';
            const marker = L.marker([sede.lat, sede.lng], { icon: createMarkerIcon(isMain) });

            const areasHtml = sede.areas
                .map(a => `<span style="font-size:0.65rem;font-family:'Barlow',sans-serif;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#999;">${a.nombre}</span>`)
                .join('<br>');

            const popupContent = `
                <div style="min-width:200px;padding:4px 2px;">
                    <div class="map-popup-city">${sede.ciudad}</div>
                    <div class="map-popup-address">${sede.address}</div>
                    <div style="margin-bottom:12px;line-height:1.8;">${areasHtml}</div>
                    <button class="map-popup-btn" onclick="window.__openModalFromMap('${key}')">
                        ${PHONE_ICON}
                        Ver contacto
                    </button>
                </div>
            `;

            marker.bindPopup(popupContent, {
                maxWidth: 260,
                minWidth: 220,
                closeButton: true,
                className: 'autogas-popup'
            });

            marker.on('click', () => highlightCard(key));
            marker.addTo(map);
        });

        window.__openModalFromMap = function(sedeKey) {
            openModal(sedeKey);
            map.closePopup();
        };
    }


    /* -----------------------------------------------
       9. HIGHLIGHT CARD desde mapa
    ----------------------------------------------- */
    /**
     * Highlights the corresponding sede card in the DOM and scrolls it into view.
     * @param {string} sedeKey - The key of the sede in SEDES_DATA.
     */
    function highlightCard(sedeKey) {
        document.querySelectorAll('.sede-card').forEach(c => c.classList.remove('highlighted'));

        const card = document.getElementById(`card-${sedeKey}`);
        if (!card) return;

        card.classList.add('highlighted');

        const rect = card.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        setTimeout(() => card.classList.remove('highlighted'), 3000);
    }

    window.highlightSedeCard = highlightCard;

});