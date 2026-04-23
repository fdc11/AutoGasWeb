/* =============================================
   servicios.js — AutoGas
   Navbar · Hero · Scroll reveal · Counters
   Parallax · Slider · Star rating · Formulario
============================================= */

/* -----------------------------------------------
   TOGGLE GRUPOS DE SERVICIOS
----------------------------------------------- */
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
        if (el) setTimeout(() => el.classList.add('visible'), 200 + i * 160);
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



    /* -----------------------------------------------
       7. TESTIMONIOS SLIDER — dinámico desde BD
       Carga reseñas reales desde get_comentarios.php
       Fallback a datos estáticos si falla el fetch
    ----------------------------------------------- */

    // Datos de respaldo (si PHP no responde)
    const testimoniosFallback = [
        {
            nombre: 'Carlos Quispe',
            sede: 'Ica',
            servicio: 'Conversión GNV',
            calificacion: 5,
            comentario: 'Excelente servicio. Me instalaron el kit GNV en un día y el ahorro en combustible es notable. El equipo es muy profesional y me explicaron todo el proceso paso a paso.'
        },
        {
            nombre: 'María Fernández',
            sede: 'Lima',
            servicio: 'Mecánica General',
            calificacion: 5,
            comentario: 'Vine por un problema de frenos y me los solucionaron al instante. Precios justos, sin cobros extras. Definitivamente vuelvo.'
        },
        {
            nombre: 'Roberto Vargas',
            sede: 'Huancayo',
            servicio: 'Conversión GLP',
            calificacion: 4,
            comentario: 'Buena atención y trabajo de calidad. El cilindro toroidal quedó perfecto y no perdí el maletero. Recomendado.'
        },
        {
            nombre: 'Lucía Torres',
            sede: 'Trujillo',
            servicio: 'Revisión Técnica',
            calificacion: 5,
            comentario: 'El diagnóstico fue muy completo. Detectaron un problema que otros talleres no habían visto. Gran trabajo del equipo técnico.'
        },
        {
            nombre: 'Juan Paredes',
            sede: 'Arequipa',
            servicio: 'Mantenimiento Kit GNV',
            calificacion: 5,
            comentario: 'Llevo 2 años viniendo para el mantenimiento anual de mi kit GNV. Siempre puntual y transparente en los presupuestos.'
        },
        {
            nombre: 'Ana Huanca',
            sede: 'Chincha',
            servicio: 'Filtros y Repuestos',
            calificacion: 4,
            comentario: 'Encontré todos los repuestos que necesitaba y a buen precio. El trato fue muy amable y me dieron buena asesoría técnica.'
        }
    ];

    const track    = document.getElementById('testimoniosTrack');
    const dotsWrap = document.getElementById('sliderDots');
    const btnPrev  = document.getElementById('sliderPrev');
    const btnNext  = document.getElementById('sliderNext');

    // Cargar desde BD y arrancar slider
    async function cargarTestimonios() {
        let testimoniosData = testimoniosFallback;
        try {
            const res = await fetch('get_comentarios.php');
            if (res.ok) {
                const json = await res.json();
                if (Array.isArray(json) && json.length >= 3) {
                    testimoniosData = json;
                }
            }
        } catch (_) { /* Sin PHP usa fallback silenciosamente */ }
        iniciarSlider(testimoniosData);
    }

    function iniciarSlider(testimoniosData) {
        if (!track) return;
        let current = 0;
        let perView = getPerView();
        let maxIdx  = Math.max(0, testimoniosData.length - perView);
        let autoTimer = null;

        function getPerView() {
            if (window.innerWidth <= 768)  return 1;
            if (window.innerWidth <= 1100) return 2;
            return 3;
        }

        function renderStars(n) {
            let html = '';
            for (let i = 1; i <= 5; i++) {
                const cls = i <= n ? 'filled' : 'empty';
                html += `<svg class="estrella-svg ${cls}" viewBox="0 0 24 24"
                            fill="${i <= n ? 'currentColor' : 'none'}"
                            stroke="currentColor" stroke-width="1.8">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                         </svg>`;
            }
            return html;
        }

        function getInitials(name) {
            return name.split(' ').slice(0, 2).map(w => w[0].toUpperCase()).join('');
        }

        function escHtml(str) {
            const d = document.createElement('div');
            d.appendChild(document.createTextNode(str));
            return d.innerHTML;
        }

        function renderCards() {
            track.innerHTML = '';
            testimoniosData.forEach(t => {
                const card = document.createElement('div');
                card.className = 'testimonio-card';
                card.innerHTML = `
                    <div class="card-estrellas">${renderStars(t.calificacion)}</div>
                    <p class="card-comentario">${escHtml(t.comentario)}</p>
                    <div class="card-meta">
                        <div class="card-avatar">${getInitials(t.nombre)}</div>
                        <div>
                            <div class="card-nombre">${escHtml(t.nombre)}</div>
                            <div class="card-sede">Sede ${escHtml(t.sede)} · ${escHtml(t.servicio)}</div>
                        </div>
                    </div>
                    <div class="card-verified" title="Reseña verificada por AutoGas">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4caf7d" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                        Opinión Verificada
                    </div>`;
                track.appendChild(card);
            });
            renderDots();
            updateTrack();
        }

        function renderDots() {
            if (!dotsWrap) return;
            dotsWrap.innerHTML = '';
            for (let i = 0; i <= maxIdx; i++) {
                const dot = document.createElement('button');
                dot.className = 'slider-dot' + (i === current ? ' active' : '');
                dot.setAttribute('aria-label', `Grupo ${i + 1}`);
                dot.addEventListener('click', () => goTo(i));
                dotsWrap.appendChild(dot);
            }
        }

        function updateTrack() {
            const cards = track.querySelectorAll('.testimonio-card');
            if (!cards.length) return;
            const gap = 24;
            const trackW = track.parentElement.offsetWidth;
            const cardW  = (trackW - gap * (perView - 1)) / perView;

            cards.forEach(el => { el.style.minWidth = cardW + 'px'; });
            track.style.transform = `translateX(-${current * (cardW + gap)}px)`;

            if (dotsWrap) {
                dotsWrap.querySelectorAll('.slider-dot').forEach((d, i) =>
                    d.classList.toggle('active', i === current));
            }
        }

        function goTo(idx) {
            current = Math.max(0, Math.min(idx, maxIdx));
            updateTrack();
        }

        function next() { goTo(current < maxIdx ? current + 1 : 0); }
        function prev() { goTo(current > 0 ? current - 1 : maxIdx); }

        function startAuto() {
            stopAuto();
            autoTimer = setInterval(next, 5000);
        }
        function stopAuto() {
            if (autoTimer) clearInterval(autoTimer);
        }

        if (btnPrev) btnPrev.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });
        if (btnNext) btnNext.addEventListener('click', () => { next(); stopAuto(); startAuto(); });

        // Swipe
        let touchX = 0;
        track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend',   e => {
            const diff = touchX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
        }, { passive: true });

        // Resize
        window.addEventListener('resize', () => {
            perView = getPerView();
            maxIdx  = Math.max(0, testimoniosData.length - perView);
            if (current > maxIdx) current = maxIdx;
            renderDots();
            updateTrack();
        }, { passive: true });

        renderCards();
        startAuto();
    } // end iniciarSlider

    cargarTestimonios(); // 🔄 Inicia carga dinámica desde BD


    /* -----------------------------------------------
       8. STAR RATING (formulario)
    ----------------------------------------------- */
    const starContainer = document.getElementById('starRating');
    const starInput     = document.getElementById('resena-calificacion');

    if (starContainer && starInput) {
        const btns = starContainer.querySelectorAll('.star-btn');

        function setRating(val) {
            starInput.value = val;
            btns.forEach(b =>
                b.classList.toggle('active', parseInt(b.dataset.value) <= val));
        }

        btns.forEach(btn => {
            btn.addEventListener('click', () =>
                setRating(parseInt(btn.dataset.value)));

            btn.addEventListener('mouseenter', () => {
                const hover = parseInt(btn.dataset.value);
                btns.forEach(b =>
                    b.classList.toggle('active', parseInt(b.dataset.value) <= hover));
            });
        });

        starContainer.addEventListener('mouseleave', () => {
            const cur = parseInt(starInput.value) || 0;
            btns.forEach(b =>
                b.classList.toggle('active', parseInt(b.dataset.value) <= cur));
        });
    }


    /* -----------------------------------------------
       9. FORMULARIO RESEÑA
       POST a guardar_comentario.php
       Respuesta esperada: { success: true } o { success: false, message: "..." }
    ----------------------------------------------- */
    const form      = document.getElementById('resenaForm');
    const btnSubmit = document.getElementById('btnSubmitResena');
    const successEl = document.getElementById('formSuccess');
    const errorEl   = document.getElementById('formError');
    const errorMsg  = document.getElementById('formErrorMsg');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nombre      = form.elements['nombre'].value.trim();
            const sede        = form.elements['sede'].value;
            const servicio    = form.elements['servicio'].value;
            const calificacion = parseInt(form.elements['calificacion'].value, 10);
            const comentario  = form.elements['comentario'].value.trim();

            if (!nombre || !sede || !servicio || !calificacion || !comentario) {
                showError('Por favor completa todos los campos y selecciona una calificación.');
                return;
            }

            setLoading(true);
            hideMessages();

            try {
                const res  = await fetch('guardar_comentario.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, sede, servicio, calificacion, comentario })
                });

                let data = {};
                try { data = await res.json(); } catch (_) {}

                if (res.ok && data.success !== false) {
                    showSuccess(nombre, comentario, sede, servicio, calificacion);
                    resetForm();
                } else {
                    showError(data.message || 'No se pudo enviar tu reseña. Intenta de nuevo.');
                }
            } catch (_) {
                // Simulación en entorno local (sin servidor PHP)
                if (window.location.protocol === 'file:' || window.location.hostname === 'localhost') {
                    showSuccess(nombre, comentario, sede, servicio, calificacion);
                    resetForm();
                } else {
                    showError('Error de conexión. Verifica tu internet e intenta de nuevo.');
                }
            } finally {
                setLoading(false);
            }
        });
    }

    function setLoading(on) {
        if (!btnSubmit) return;
        btnSubmit.disabled = on;
        const txt     = btnSubmit.querySelector('.btn-text');
        const loading = btnSubmit.querySelector('.btn-loading');
        const arrow   = btnSubmit.querySelector('.btn-arrow');
        if (txt)     txt.style.display     = on ? 'none' : 'inline';
        if (loading) loading.style.display = on ? 'inline-flex' : 'none';
        if (arrow)   arrow.style.display   = on ? 'none' : 'inline';
    }

    function showSuccess(nombre, comentario, sede, servicio, calificacion) {
        if (successEl) successEl.style.display = 'flex';
        if (errorEl)   errorEl.style.display   = 'none';

        // WOW: inject the new review at the top of the slider
        if (track && nombre && comentario) {
            const stars = Array.from({length: 5}, (_, i) => {
                const filled = i < calificacion ? 'currentColor' : 'none';
                return `<svg class="estrella-svg ${i < calificacion ? 'filled' : 'empty'}" viewBox="0 0 24 24" fill="${filled}" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
            }).join('');

            const ini = nombre.split(' ').slice(0,2).map(w => w[0].toUpperCase()).join('');
            const newCard = document.createElement('div');
            newCard.className = 'testimonio-card new-review-wow';
            newCard.innerHTML = `
                <div class="card-estrellas">${stars}</div>
                <p class="card-comentario">"${comentario.replace(/</g,'&lt;')}"</p>
                <div class="card-meta">
                    <div class="card-avatar">${ini}</div>
                    <div>
                        <div class="card-nombre">${nombre.replace(/</g,'&lt;')}</div>
                        <div class="card-sede">Sede ${sede} · ${servicio}</div>
                    </div>
                </div>
                <div class="card-verified">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4caf7d" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                    Tu reseña fue enviada
                </div>`;
            track.prepend(newCard);
            track.scrollTo({ left: 0, behavior: 'smooth' });
            setTimeout(() => newCard.classList.add('visible'), 50);
        }
    }

    function showError(msg) {
        if (errorEl)  { errorEl.style.display = 'flex'; }
        if (errorMsg) { errorMsg.textContent = msg; }
        if (successEl) successEl.style.display = 'none';
    }

    function hideMessages() {
        if (successEl) successEl.style.display = 'none';
        if (errorEl)   errorEl.style.display   = 'none';
    }

    function resetForm() {
        if (form) form.reset();
        const si = document.getElementById('resena-calificacion');
        if (si) si.value = '0';
        document.querySelectorAll('.star-btn').forEach(b => b.classList.remove('active'));
    }

});/* =============================================
   ASISTENTE IA v2 — Servicios específicos AutoGas
   Keywords ampliadas, español peruano
============================================= */

const SERVICIOS_IA = [

    // ── FRENOS ──────────────────────────────────────────────────────
    {
        id: 'frenos', nombre: 'Reparación de Frenos', grupo: 'Mecánica General',
        desc: 'Diagnóstico y reparación integral: pastillas, discos, líquido y bomba de freno.',
        href: '#mecanica', color: '#ef4444', icon: '🛑',
        keywords: [
            'freno','frenos','frenado','frenar','frena','frenando',
            'no frena','frena mal','frena tarde','frena poco','frena raro',
            'pastilla','pastillas','disco','discos','tambor','tambores',
            'liquido freno','liquido de frenos','pedal','pedal blando',
            'pedal se hunde','pedal duro','pedal fondo','abs','sistema abs',
            'vibra al frenar','vibración freno','pulsacion freno',
            'chirria','chirrido','chirrian','ruido al frenar','ruido freno',
            'raspa al frenar','rechinido','squeal','freno de mano',
            'freno de emergencia','handbrake'
        ]
    },

    // ── DIRECCIÓN ───────────────────────────────────────────────────
    {
        id: 'direccion', nombre: 'Reparación de Dirección', grupo: 'Mecánica General',
        desc: 'Corrección de dirección hidráulica o eléctrica, cremallera y terminales.',
        href: '#mecanica', color: '#ef4444', icon: '🔧',
        keywords: [
            'direccion','dirección','volante','timón','jala','jalando',
            'jala a un lado','se va solo','desvia','desvía','desvio',
            'volante duro','volante pesado','dificil girar','cuesta girar',
            'cremallera','terminal','rotula','manga','rótula',
            'ruido al girar','ruido volante','traquea al girar',
            'alineacion','alineación','alineado','convergencia',
            'servo','servodirección','direccion hidraulica','direccion electrica',
            'liquido direccion','aceite direccion'
        ]
    },

    // ── REFRIGERACIÓN ───────────────────────────────────────────────
    {
        id: 'refrigeracion', nombre: 'Reparación de Refrigeración', grupo: 'Mecánica General',
        desc: 'Radiador, termostato y bomba de agua. Evita que tu motor se recaliente.',
        href: '#mecanica', color: '#ef4444', icon: '🌡️',
        keywords: [
            'calienta','caliente','recalienta','recalentamiento','temperatura',
            'se calienta','se recalienta','temperatura alta','sube temperatura',
            'aguja sube','indicador temperatura','tablero temperatura',
            'agua motor','pierde agua','consume agua','falta agua',
            'refrigerante','anticongelante','radiador','termostato',
            'bomba agua','electróventilador','ventilador radiador',
            'vapor','vapores','echa vapor','humo blanco','humo motor',
            'sobrecalentamiento','overheat','calentón','se calientea'
        ]
    },

    // ── EMBRAGUE ────────────────────────────────────────────────────
    {
        id: 'embrague', nombre: 'Reparación de Embrague', grupo: 'Mecánica General',
        desc: 'Diagnóstico y cambio del sistema de embrague: disco, plato y collarín.',
        href: '#mecanica', color: '#ef4444', icon: '⚙️',
        keywords: [
            'embrague','clutch','cloch','patina','resbala','resbalamiento',
            'no agarra','no jala al soltar','pierde fuerza al subir',
            'cambio duro','marchas duras','no entra marcha','cuesta cambiar',
            'pedal embrague','embrague blando','embrague duro','embrague bajo',
            'vibra al arrancar','tiembla al soltar clutch','huele quemado',
            'olor quemado','disco clutch','plato presion','collarin',
            'transmision manual','caja manual','no suelta bien'
        ]
    },

    // ── CULATA ──────────────────────────────────────────────────────
    {
        id: 'culata', nombre: 'Diagnóstico y Reparación de Culata', grupo: 'Mecánica General',
        desc: 'Inspección y reparación de culata para evitar daños mayores al motor.',
        href: '#mecanica', color: '#ef4444', icon: '🔩',
        keywords: [
            'culata','junta culata','empaque culata','humo blanco escape',
            'aceite con agua','agua con aceite','aceite lechoso','emulsión',
            'pierde compresión','baja compresion','falla compresion',
            'burbuja radiador','burbujas en agua','recalentar motor',
            'motor golpea','consume refrigerante mucho','pierde refrigerante rapido'
        ]
    },

    // ── MOTOR ───────────────────────────────────────────────────────
    {
        id: 'motor', nombre: 'Reparación Completa de Motor', grupo: 'Mecánica General',
        desc: 'Desmontaje y reparación total. Recuperamos la potencia original.',
        href: '#mecanica', color: '#ef4444', icon: '🏎️',
        keywords: [
            'motor','reparar motor','revisar motor','overhaul','golpeteo',
            'golpea motor','taca taca','ruido motor','motor ruidoso',
            'motor consume aceite','pierde aceite','aceite bajo siempre',
            'pistones','anillos','biela','cigüeñal','bancada',
            'motor sin fuerza','sin potencia','motor viejo','motor cansado',
            'motor lento','no jala','motor fumando','echa humo azul',
            'humo azul','quema aceite'
        ]
    },

    // ── CAMBIO ACEITE ───────────────────────────────────────────────
    {
        id: 'aceite', nombre: 'Cambio de Aceite', grupo: 'Mantenimiento Preventivo',
        desc: 'Cambio de aceite de motor, caja y corona. Castrol, Shell, Chevron, Valvoline.',
        href: '#mecanica', color: '#f97316', icon: '🛢️',
        keywords: [
            'aceite','cambio aceite','aceite motor','aceite sucio','aceite negro',
            'aceite bajo','bajo de aceite','nivel aceite','gotea aceite',
            'pierde aceite','fuga aceite','aceite viejo','aceite quemado',
            'kilometraje aceite','servicio aceite','mantenimiento aceite',
            'filtro aceite','aceite caja','aceite diferencial','lubricación'
        ]
    },

    // ── BATERÍA ─────────────────────────────────────────────────────
    {
        id: 'bateria', nombre: 'Diagnóstico de Baterías', grupo: 'Mantenimiento Preventivo',
        desc: 'Revisión de batería y sistema eléctrico. Detectamos fallas antes de quedar varado.',
        href: '#mecanica', color: '#f97316', icon: '🔋',
        keywords: [
            'bateria','batería','no arranca','no prende','no enciende',
            'no da arranque','se queda muerto','se muere','arranque lento',
            'arranque flojo','no tiene fuerza para arrancar',
            'alternador','carga bateria','no carga','descarga rapido',
            'bateria muerta','bateria vieja','bateria descargada',
            'luces debiles','luces bajan','voltaje bajo','bornes',
            'sistema electrico','electrico','corriente','sin corriente'
        ]
    },

    // ── DIAGNÓSTICO VEHICULAR ───────────────────────────────────────
    {
        id: 'diagnostico_vehicular', nombre: 'Revisión y Diagnóstico Vehicular', grupo: 'Mantenimiento Preventivo',
        desc: 'Scanner OBD2 completo para detectar códigos de falla y evaluar el estado general.',
        href: '#mecanica', color: '#f97316', icon: '🔍',
        keywords: [
            'check engine','luz motor','luz naranja','luz tablero','testigo',
            'código error','codigo falla','obd','scanner','diagnóstico',
            'no sé qué tiene','no se que tiene','falla rara','algo raro',
            'revision general','chequeo','evaluar','inspección general',
            'ver qué tiene','qué tiene mi carro','que le pasa',
            'falla esporádica','falla a veces','falla intermitente'
        ]
    },

    // ── INYECTORES ──────────────────────────────────────────────────
    {
        id: 'inyectores', nombre: 'Limpieza de Inyectores', grupo: 'Mantenimiento Preventivo',
        desc: 'Limpieza de inyectores a gasolina para recuperar potencia y reducir consumo.',
        href: '#mecanica', color: '#f97316', icon: '💉',
        keywords: [
            'inyector','inyectores','gasta mucho','consume mucho','alto consumo',
            'gasto mucho combustible','mucha gasolina','gasolina se acaba rapido',
            'rendimiento bajo','poco rendimiento','mal rendimiento',
            'motor tiembla ralenti','tiembla en freno','tiembla parado',
            'ralenti malo','ralenti bajo','ralenti irregular','se apaga parado',
            'tartamudea','jalona','jalona al acelerar','corte motor',
            'humo negro','negro por el tubo','exceso humo'
        ]
    },

    // ── AFINAMIENTO ─────────────────────────────────────────────────
    {
        id: 'afinamiento', nombre: 'Afinamiento Electrónico', grupo: 'Mantenimiento Preventivo',
        desc: 'Calibración electrónica del motor para optimizar rendimiento y reducir consumo.',
        href: '#mecanica', color: '#f97316', icon: '⚡',
        keywords: [
            'afinar','afinamiento','afine','afino','calibrar motor',
            'motor irregular','arranca mal','arranque dificil','cuesta arrancar',
            'motor no jala','sin jale','le falta jale','potencia baja',
            'rendimiento bajo','consumo alto','gasta mucho',
            'bujia mala','bujias viejas','encendido malo',
            'motor tose','tosca','toca','explosiones escape',
            'motor poco listo','no responde bien','aceleracion mala'
        ]
    },

    // ── FLUIDOS ─────────────────────────────────────────────────────
    {
        id: 'fluidos', nombre: 'Cambio de Fluidos', grupo: 'Mantenimiento Preventivo',
        desc: 'Renovación de fluidos de frenos, dirección y refrigeración.',
        href: '#mecanica', color: '#f97316', icon: '💧',
        keywords: [
            'fluido','fluidos','liquido','liquidos','cambio liquido',
            'liquido frenos','fluido frenos','liquido embrague',
            'liquido dirección','aceite caja','aceite diferencial',
            'cambio fluidos','mantenimiento fluidos','fluido viejo',
            'fluido oscuro','cambiar líquidos'
        ]
    },

    // ── CONVERSIÓN GLP ──────────────────────────────────────────────
    {
        id: 'conversion_glp', nombre: 'Conversión a GLP', grupo: 'Conversión GNV/GLP',
        desc: 'Gas Licuado de Petróleo. Ahorra hasta 50% con instalación rápida y segura.',
        href: '#conversion', color: '#3b82f6', icon: '⛽',
        keywords: [
            'glp','gas licuado','conversion glp','convertir glp','instalar glp',
            'kit glp','cilindro glp','toroidal','propano','butano',
            'poner gas','instalar gas','quiero gas','cambiar a gas',
            'gasolina cara','gasolina sube','gasto mucho gasolina',
            'ahorrar combustible','economizar','reducir gasto',
            'quiero convertir','conversion gas','gas para mi carro'
        ]
    },

    // ── CONVERSIÓN GNV ──────────────────────────────────────────────
    {
        id: 'conversion_gnv', nombre: 'Conversión a GNV', grupo: 'Conversión GNV/GLP',
        desc: 'Gas Natural Vehicular. Hasta 60% de ahorro con financiamiento FISE.',
        href: '#conversion', color: '#0ea5e9', icon: '🔵',
        keywords: [
            'gnv','gas natural','conversion gnv','convertir gnv','instalar gnv',
            'kit gnv','gas vehicular','fise','subsidio','subsidio gas',
            'financiamiento','bono gas','poner gas','instalar gas',
            'quiero gas','cambiar a gas','gasolina cara','gasolina sube',
            'gasto mucho gasolina','ahorrar combustible','economizar',
            'reducir gasto','quiero convertir','gas natural vehicular'
        ]
    },

    // ── INYECCIÓN DIRECTA ───────────────────────────────────────────
    {
        id: 'inyeccion_directa', nombre: 'Conversión Inyección Directa', grupo: 'Conversión GNV/GLP',
        desc: 'Para motores con inyección directa. Tecnología avanzada que preserva el rendimiento.',
        href: '#conversion', color: '#6366f1', icon: '🚀',
        keywords: [
            'inyeccion directa','motor gdi','motor tsi','motor tfsi',
            'motor turbo','turbo','turbocargado','motor moderno',
            'carro nuevo gas','vehiculo nuevo gas','motor ultimo modelo gas',
            'conversion especial','motor complejo gas'
        ]
    },

    // ── DIESEL DUAL ─────────────────────────────────────────────────
    {
        id: 'diesel_dual', nombre: 'Diesel Dual Fuel', grupo: 'Conversión GNV/GLP',
        desc: 'Combina gas y diésel en motores diésel. Reduce costos sin perder potencia.',
        href: '#conversion', color: '#8b5cf6', icon: '🚛',
        keywords: [
            'diesel','diésel','diesel dual','camion','camión','furgon','furgón',
            'minibus','bus','moto taxi diesel','camioneta diesel',
            'motor diesel gas','convertir diesel','diesel gnv','diesel glp',
            'dual fuel','gasoil','petróleo'
        ]
    },

    // ── CERTIFICACIÓN ANUAL ─────────────────────────────────────────
    {
        id: 'cert_anual', nombre: 'Certificación Anual GNV/GLP', grupo: 'Certificaciones y Trámites',
        desc: 'Revisión técnica anual obligatoria del sistema de gas. Nos encargamos de todo.',
        href: '#conversion', color: '#22c55e', icon: '📋',
        keywords: [
            'certificacion','certificado','certificado gas','revision anual',
            'vencio certificado','certificado vencido','renovar certificado',
            'tramite gas','papeles gas','documento gas','habilitacion gas',
            'revision tecnica gas','inspeccion gas','certificar sistema'
        ]
    },

    // ── CAMBIO CARACTERÍSTICAS ──────────────────────────────────────
    {
        id: 'cambio_caract', nombre: 'Trámite Cambio de Características', grupo: 'Certificaciones y Trámites',
        desc: 'Registramos la conversión en los documentos oficiales de tu vehículo.',
        href: '#conversion', color: '#22c55e', icon: '📄',
        keywords: [
            'cambio caracteristicas','tarjeta propiedad','registro conversion',
            'sunarp','mtc','documento conversion','inscribir gas',
            'legalizar','tramite conversion','papeles conversion',
            'cambio documentos','actualizar tarjeta','tarjeta propiedad gas'
        ]
    },

    // ── QUINQUENAL ──────────────────────────────────────────────────
    {
        id: 'quinquenal', nombre: 'Inspección Quinquenal', grupo: 'Certificaciones y Trámites',
        desc: 'Inspección de cilindros cada 5 años. Obligatoria para seguir usando el sistema de gas.',
        href: '#conversion', color: '#22c55e', icon: '🔎',
        keywords: [
            'quinquenal','5 años gas','cilindro vencido','cilindro vence',
            'revision cilindro','inspeccion cilindro','prueba hidraulica',
            'cilindro 5 años','cilindro gas vencido','renovar cilindro',
            'cilindro caducado','plazo cilindro'
        ]
    },

    // ── FISE ────────────────────────────────────────────────────────
    {
        id: 'fise', nombre: 'Financiamiento FISE', grupo: 'Certificaciones y Trámites',
        desc: 'Subsidio del Gobierno Peruano para tu conversión a gas. Sin costo adicional.',
        href: '#conversion', color: '#22c55e', icon: '💰',
        keywords: [
            'fise','subsidio','financiamiento','credito','cuotas',
            'bono gas','gobierno paga','estado paga','apoyo gobierno',
            'conversion barata','precio bajo conversion','pagar facil gas',
            'como financiar','ayuda economica','prestamo gas'
        ]
    },

    // ── CHIP GAS ────────────────────────────────────────────────────
    {
        id: 'chip_gas', nombre: 'Desbloqueo y Reprogramación de Chip', grupo: 'Mantenimiento Sistema de Gas',
        desc: 'Reprogramación del chip del sistema de gas para optimizar rendimiento.',
        href: '#conversion', color: '#ec4899', icon: '💾',
        keywords: [
            'chip gas','chip bloqueado','desbloquear chip','programar chip',
            'chip gnv','chip glp','ecu gas','centralita gas',
            'error electronico gas','falla chip','resetear chip',
            'configurar gas','reprogramar sistema gas','chip dañado'
        ]
    },

    // ── ESCANEO GAS ─────────────────────────────────────────────────
    {
        id: 'escaneo_gas', nombre: 'Escaneo y Calibración de Gas', grupo: 'Mantenimiento Sistema de Gas',
        desc: 'Diagnóstico electrónico y calibración del sistema de gas para funcionamiento correcto.',
        href: '#conversion', color: '#ec4899', icon: '📡',
        keywords: [
            'calibrar gas','calibracion gas','escaneo gas','scanner gas',
            'diagnostico gas','ajustar gas','mezcla gas','regulacion gas',
            'gas mal calibrado','gas no funciona bien','gas irregular',
            'consumo gas alto','gas gasta mucho','afinar gas',
            'inyectores gas','calibrar inyectores gas'
        ]
    },

    // ── FILTRO GAS ──────────────────────────────────────────────────
    {
        id: 'filtro_gas', nombre: 'Cambio de Filtros de Gas', grupo: 'Mantenimiento Sistema de Gas',
        desc: 'Reemplazo de filtros del sistema de gas para mantener la pureza del combustible.',
        href: '#conversion', color: '#ec4899', icon: '🔄',
        keywords: [
            'filtro gas','filtro gnv','filtro glp','cambio filtro gas',
            'filtro sucio gas','filtro tapado gas','mantenimiento filtro',
            'filtro vaporizado','filtro obstruido','servicio gas filtro',
            'pierde potencia en gas','gas sin fuerza'
        ]
    },

    // ── FUGAS GAS ───────────────────────────────────────────────────
    {
        id: 'fugas', nombre: 'Revisión de Fugas de Gas', grupo: 'Mantenimiento Sistema de Gas',
        desc: 'Detección y corrección de fugas. Tu seguridad es lo primero.',
        href: '#conversion', color: '#ec4899', icon: '⚠️',
        keywords: [
            'fuga gas','fuga','huele gas','olor gas','gas se escapa',
            'huele a gas','huele raro','olor combustible','olor extraño',
            'perdida gas','peligro gas','riesgo gas','gas peligroso',
            'cilindro fuga','conducto fuga','manguera fuga',
            'escape gas','riesgo explosion','explosión gas'
        ]
    },

    // ── OBTURADOR ───────────────────────────────────────────────────
    {
        id: 'obturador', nombre: 'Limpieza de Obturador', grupo: 'Mantenimiento Sistema de Gas',
        desc: 'Limpieza del obturador para arranque correcto y flujo estable de gas.',
        href: '#conversion', color: '#ec4899', icon: '🔧',
        keywords: [
            'obturador','no arranca en gas','no prende en gas','gas no prende',
            'cambia a gasolina solo','se pasa a gasolina','no usa gas',
            'gas no activa','sistema no cambia gas','fallo arranque gas',
            'valvula gas','no pasa gas','obturador sucio','obturador tapado'
        ]
    },

    // ── CONDUCTORES GAS ─────────────────────────────────────────────
    {
        id: 'conductores', nombre: 'Inspección de Conductores de Gas', grupo: 'Mantenimiento Sistema de Gas',
        desc: 'Revisión de conductores de gas y agua para detectar desgaste.',
        href: '#conversion', color: '#ec4899', icon: '🔗',
        keywords: [
            'conductor gas','manguera gas','tubo gas','tuberia gas',
            'conexion gas','conducto gas','manguera deteriorada','manguera rota',
            'manguera vieja','presion gas baja','pierde presion',
            'gas sin presion','manguera dañada'
        ]
    },

    // ── FILTRO AIRE ─────────────────────────────────────────────────
    {
        id: 'filtro_aire', nombre: 'Cambio de Filtro de Aire', grupo: 'Repuestos y Componentes',
        desc: 'Filtro limpio = mejor rendimiento y menor consumo de combustible.',
        href: '#repuestos', color: '#eab308', icon: '💨',
        keywords: [
            'filtro aire','aire motor','filtro tapado','filtro sucio',
            'potencia baja','motor sin fuerza','aceleracion lenta',
            'consumo alto','gasta mucho','cambio filtro aire',
            'mantenimiento filtro','servicio filtro'
        ]
    },

    // ── BUJÍAS ──────────────────────────────────────────────────────
    {
        id: 'bujias', nombre: 'Cambio de Bujías', grupo: 'Repuestos y Componentes',
        desc: 'Bujías de calidad para ignición perfecta, mejor arranque y menor consumo.',
        href: '#repuestos', color: '#eab308', icon: '⚡',
        keywords: [
            'bujia','bujías','bujias','bujia mala','bujia vieja',
            'arranque malo','cuesta arrancar','motor falla','motor tiembla',
            'motor vibra','encendido falla','chispa','ignición',
            'consume mucho','gasta mucho','bujia gastada','cambio bujias',
            'platinos','cables bujia','falla un cilindro'
        ]
    },

    // ── SUPRESORES ──────────────────────────────────────────────────
    {
        id: 'supresores', nombre: 'Cambio de Supresores', grupo: 'Repuestos y Componentes',
        desc: 'Protegen el sistema de encendido en vehículos a gas contra retroceso de llama.',
        href: '#repuestos', color: '#eab308', icon: '🛡️',
        keywords: [
            'supresor','retroceso','retroceso llama','supresores',
            'bujia quemada gas','bobina dañada gas','encendido dañado gas',
            'sistema ignicion gas','falla encendido gas','proteccion bujia'
        ]
    },

    // ── CAÑA DE BOBINA ──────────────────────────────────────────────
    {
        id: 'bobina', nombre: 'Cambio de Caña de Bobina', grupo: 'Repuestos y Componentes',
        desc: 'Conduce alta tensión de la bobina a las bujías. Clave para encendido eficiente.',
        href: '#repuestos', color: '#eab308', icon: '🔌',
        keywords: [
            'bobina','caña bobina','cable bujia','cables encendido',
            'distribuidor','fallo cilindro','misfire','cilindro falla',
            'motor cojea','motor renguea','falla un cilindro',
            'chispa bujia','cable encendido','alta tension'
        ]
    },
];

/* ─────────── Motor de análisis ─────────────────────────── */
function iaNormalizar(str) {
    return str.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function iaCalcularScores(texto) {
    const textoNorm = iaNormalizar(texto);

    return SERVICIOS_IA.map(servicio => {
        let score = 0;
        const encontrados = [];

        servicio.keywords.forEach(kw => {
            const kwNorm = iaNormalizar(kw);
            // Buscar como substring (cubre plurales, conjugaciones)
            if (textoNorm.includes(kwNorm)) {
                const peso = kwNorm.split(' ').length; // frases pesan más
                score += peso;
                encontrados.push(kw);
            }
        });

        const maxScore = servicio.keywords.reduce((acc, kw) => {
            return acc + iaNormalizar(kw).split(' ').length;
        }, 0);

        // Amplificador para mostrar % visualmente atractivo
        let pct = maxScore > 0 ? Math.round((score / maxScore) * 100 * 4) : 0;
        pct = Math.min(pct, 99);

        return { ...servicio, score, pct, encontrados };
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

/* ─────────── Función principal ─────────────────────────── */
window.analizarProblema = function () {
    const input      = document.getElementById('iaInput');
    const resultados = document.getElementById('iaResultados');
    const lista      = document.getElementById('iaLista');
    const vacio      = document.getElementById('iaVacio');
    const btn        = document.getElementById('iaBtn');
    if (!input || !resultados || !lista) return;

    const texto = input.value.trim();
    if (texto.length < 3) {
        input.style.borderColor = '#df0415';
        input.focus();
        setTimeout(() => input.style.borderColor = '', 1500);
        return;
    }

    btn.disabled = true;
    btn.innerHTML = `<svg style="animation:ia-spin .7s linear infinite;display:inline-block;vertical-align:middle" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>&nbsp;Analizando...`;

    setTimeout(() => {
        const scores = iaCalcularScores(texto);

        btn.disabled = false;
        btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>&nbsp;Analizar`;

        if (scores.length === 0) {
            resultados.style.display = 'none';
            vacio.style.display = 'flex';
            return;
        }

        vacio.style.display = 'none';

        const etiqueta = (i, pct) => {
            if (i === 0 && pct >= 10) return `<span class="ia-badge ia-badge-top">⭐ Más recomendado</span>`;
            if (pct >= 8) return `<span class="ia-badge ia-badge-ok">✓ Recomendado</span>`;
            return `<span class="ia-badge ia-badge-low">Posible</span>`;
        };

        lista.innerHTML = scores.map((s, i) => `
            <div class="ia-item" style="--ia-color:${s.color}">
                <div class="ia-item-head">
                    <div class="ia-item-left">
                        <span class="ia-item-icon">${s.icon}</span>
                        <div>
                            <div class="ia-item-nombre">${s.nombre}</div>
                            <div class="ia-item-grupo">${s.grupo}</div>
                        </div>
                    </div>
                    <div class="ia-item-right">
                        ${etiqueta(i, s.pct)}
                        <div class="ia-item-pct" style="color:${s.color}">${s.pct}%</div>
                    </div>
                </div>
                <div class="ia-bar-bg">
                    <div class="ia-bar-fill" style="width:0%;background:${s.color}" data-w="${s.pct}%"></div>
                </div>
                <div class="ia-item-desc">${s.desc}</div>
                <a href="${s.href}" class="ia-item-link" style="color:${s.color}">
                    Ver servicio &rarr;
                </a>
            </div>
        `).join('');

        resultados.style.display = 'block';

        requestAnimationFrame(() => {
            setTimeout(() => {
                lista.querySelectorAll('.ia-bar-fill').forEach(bar => {
                    bar.style.width = bar.dataset.w;
                });
            }, 60);
        });

        resultados.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 600);
};

/* ─────────── Init contador ─────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    const iaInput = document.getElementById('iaInput');
    if (!iaInput) return;
    iaInput.addEventListener('input', () => {
        const c = document.getElementById('iaCharCount');
        if (c) c.textContent = iaInput.value.length;
    });
    iaInput.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            analizarProblema();
        }
    });
});

/* ─────────── Estilos ───────────────────────────────────── */
(function () {
    const css = `
@keyframes ia-spin { to { transform: rotate(360deg); } }
.asistente-ia { background: linear-gradient(180deg,#080808 0%,#0f0f0f 100%); padding:90px 0 80px; border-bottom:1px solid rgba(255,255,255,0.05); }
.asistente-inner { max-width:820px; margin:0 auto; padding:0 24px; }
.asistente-header { text-align:center; margin-bottom:44px; }
.asistente-title { font-family:'Barlow Condensed',sans-serif; font-size:clamp(2.2rem,5vw,3.2rem); font-weight:800; color:#fff; letter-spacing:1px; line-height:1.05; margin:14px 0 16px; text-transform:uppercase; }
.asistente-title .accent { color:#df0415; }
.asistente-desc { color:rgba(255,255,255,0.5); font-size:0.95rem; max-width:540px; margin:0 auto; line-height:1.75; }
.asistente-box { background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:28px; }
.asistente-textarea { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:3px; color:#fff; font-family:'Barlow',sans-serif; font-size:0.95rem; line-height:1.65; padding:14px 16px; resize:none; outline:none; box-sizing:border-box; transition:border-color .25s; }
.asistente-textarea:focus { border-color:rgba(223,4,21,.45); background:rgba(255,255,255,.06); }
.asistente-textarea::placeholder { color:rgba(255,255,255,.2); }
.asistente-input-footer { display:flex; justify-content:space-between; align-items:center; margin-top:10px; }
.ia-char-count { font-size:.73rem; color:rgba(255,255,255,.28); }
.ia-btn { display:inline-flex; align-items:center; gap:7px; background:#df0415; color:#fff; border:none; padding:10px 24px; font-family:'Barlow Condensed',sans-serif; font-size:.92rem; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; cursor:pointer; border-radius:3px; transition:background .2s,transform .1s; }
.ia-btn:hover { background:#b8000f; }
.ia-btn:active { transform:scale(.98); }
.ia-btn:disabled { opacity:.55; cursor:not-allowed; }
.ia-resultados { margin-top:30px; border-top:1px solid rgba(255,255,255,.06); padding-top:26px; }
.ia-resultados-titulo { display:flex; align-items:center; gap:8px; font-family:'Barlow Condensed',sans-serif; font-size:.68rem; letter-spacing:2.5px; text-transform:uppercase; color:rgba(255,255,255,.35); margin-bottom:20px; }
.ia-lista { display:flex; flex-direction:column; gap:12px; }
.ia-item { background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.07); border-left:3px solid var(--ia-color); border-radius:3px; padding:16px 18px 14px; transition:background .2s; }
.ia-item:hover { background:rgba(255,255,255,.05); }
.ia-item-head { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:10px; }
.ia-item-left { display:flex; align-items:center; gap:12px; }
.ia-item-icon { font-size:1.3rem; line-height:1; flex-shrink:0; }
.ia-item-nombre { font-weight:700; font-size:.92rem; color:#fff; line-height:1.3; }
.ia-item-grupo { font-size:.7rem; color:rgba(255,255,255,.35); margin-top:2px; font-family:'Barlow Condensed',sans-serif; letter-spacing:.5px; text-transform:uppercase; }
.ia-item-right { display:flex; flex-direction:column; align-items:flex-end; gap:4px; flex-shrink:0; }
.ia-item-pct { font-family:'Barlow Condensed',sans-serif; font-size:1.5rem; font-weight:800; line-height:1; }
.ia-badge { font-family:'Barlow Condensed',sans-serif; font-size:.65rem; letter-spacing:1px; text-transform:uppercase; padding:2px 8px; border-radius:20px; white-space:nowrap; }
.ia-badge-top { background:rgba(223,4,21,.15); color:#f87171; border:1px solid rgba(223,4,21,.3); }
.ia-badge-ok  { background:rgba(34,197,94,.12); color:#86efac; border:1px solid rgba(34,197,94,.25); }
.ia-badge-low { background:rgba(255,255,255,.05); color:rgba(255,255,255,.4); border:1px solid rgba(255,255,255,.1); }
.ia-bar-bg { background:rgba(255,255,255,.06); height:3px; border-radius:2px; overflow:hidden; margin-bottom:10px; }
.ia-bar-fill { height:100%; border-radius:2px; transition:width .9s cubic-bezier(.4,0,.2,1); }
.ia-item-desc { font-size:.8rem; color:rgba(255,255,255,.4); line-height:1.55; margin-bottom:10px; }
.ia-item-link { display:inline-flex; align-items:center; gap:5px; font-family:'Barlow Condensed',sans-serif; font-size:.75rem; font-weight:700; letter-spacing:1px; text-transform:uppercase; text-decoration:none; opacity:.8; transition:opacity .2s; }
.ia-item-link:hover { opacity:1; }
.ia-cta-btn { display:inline-flex; align-items:center; gap:8px; margin-top:22px; background:#df0415; color:#fff; text-decoration:none; padding:12px 28px; font-family:'Barlow Condensed',sans-serif; font-size:.92rem; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; border-radius:3px; transition:background .2s; }
.ia-cta-btn:hover { background:#b8000f; }
.ia-vacio { display:none; align-items:center; gap:10px; margin-top:22px; padding:16px 18px; border:1px solid rgba(255,255,255,.07); border-radius:3px; color:rgba(255,255,255,.38); font-size:.85rem; line-height:1.5; }
@media(max-width:600px){.ia-item-head{flex-direction:column;gap:8px}.ia-item-right{flex-direction:row;align-items:center;gap:10px}.ia-item-pct{font-size:1.2rem}}
    `;
    const s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
})();