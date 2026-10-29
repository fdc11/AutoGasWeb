/* =============================================
   servicios.js — AutoGas
   Navbar · Hero · Scroll reveal · Counters
   Parallax · Slider · Star rating · Formulario
   BD: Supabase (reemplaza PHP + MySQL local)
============================================= */

/* ─── Supabase config ────────────────────────────────────────────────────── */
const SUPABASE_URL = 'https://jyfnsyruaupzvtycrkbx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5Zm5zeXJ1YXVwenZ0eWNya2J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4OTcwNzMsImV4cCI6MjA5NDQ3MzA3M30.5TthKej3TdqKXZ-uRs-ui2YokwPxy5-v73YV12f5g34';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* ─── Anti-spam: honeypot + trampa de tiempo + throttle local ──────────────── */
const resenaFormLoadedAt = Date.now();
const RESENA_THROTTLE_MS = 60000; // 1 envío por minuto por navegador

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

    window.toggleMenu = function toggleMenu() {
        const nav = document.getElementById('mobileNav');
        const h = document.getElementById('hamburger');
        const isOpen = nav.classList.contains('open');

        if (isOpen) {
            nav.classList.remove('open');
            h.classList.remove('is-open');
            document.body.style.overflow = '';
            nav.querySelectorAll('.mnav-item').forEach(el => el.classList.remove('visible'));
        } else {
            nav.classList.add('open');
            h.classList.add('is-open');
            document.body.style.overflow = 'hidden';
            nav.querySelectorAll('.mnav-item').forEach((el, i) => {
                setTimeout(() => el.classList.add('visible'), 60 + i * 60);
            });
        }
    };

    // Cerrar con Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const nav = document.getElementById('mobileNav');
            if (nav && nav.classList.contains('open')) window.toggleMenu();
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
       7. TESTIMONIOS — Grid paginado v3
       3 cols desktop / 2 tablet / 1 mobile
       Sin transform bug, sin espacio vacío
    ----------------------------------------------- */


    const gridContainer = document.getElementById('testimoniosTrack');
    const dotsWrap = document.getElementById('sliderDots');
    const btnPrev = document.getElementById('sliderPrev');
    const btnNext = document.getElementById('sliderNext');

    // ── Helpers ────────────────────────────────────────────────────────────
    function renderStars(n) {
        let h = '';
        for (let i = 1; i <= 5; i++) {
            const f = i <= n;
            h += `<svg class="estrella-svg ${f ? 'filled' : 'empty'}" viewBox="0 0 24 24"
                    fill="${f ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>`;
        }
        return h;
    }

    function getInitials(name) {
        const ini = String(name || '').trim().split(/\s+/).filter(Boolean)
            .slice(0, 2).map(w => w[0].toUpperCase()).join('');
        return escHtml(ini || '?');
    }

    function getAvatarColor(name) {
        name = String(name || '');
        let hash = 0;
        for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
        return `hsl(${Math.abs(hash % 360)}, 58%, 42%)`;
    }

    function formatFecha(s) {
        if (!s) return '';
        const d = new Date(s);
        if (isNaN(d.getTime())) return '';
        const m = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return `${m[d.getMonth()]} ${d.getFullYear()}`;
    }

    function escHtml(str) {
        const d = document.createElement('div');
        d.appendChild(document.createTextNode(str));
        return d.innerHTML;
    }

    function getPerPage() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }

    // ── Sistema de paginación por grid ─────────────────────────────────────
    function iniciarGrid(data) {
        if (!gridContainer) return;

        gridContainer.className = 'testimonios-grid';

        let page = 0;
        let perPage = getPerPage();
        let autoTimer = null;

        function totalPages() { return Math.ceil(data.length / perPage); }

        function renderPage() {
            perPage = getPerPage();
            gridContainer.innerHTML = '';

            const slice = data.slice(page * perPage, page * perPage + perPage);
            slice.forEach(t => {
                const card = document.createElement('div');
                card.className = 'testimonio-card';
                const color = getAvatarColor(t.nombre);
                const fecha = formatFecha(t.fecha);
                card.innerHTML = `
                    <div class="card-estrellas">${renderStars(t.calificacion)}</div>
                    <p class="card-comentario">${escHtml(t.comentario)}</p>
                    ${fecha ? `<div class="card-fecha">${fecha}</div>` : ''}
                    <div class="card-meta">
                        <div class="card-avatar"
                             style="background:${color}22;border-color:${color};color:${color}">
                            ${getInitials(t.nombre)}
                        </div>
                        <div>
                            <div class="card-nombre">${escHtml(t.nombre)}</div>
                            <div class="card-sede">Sede ${escHtml(t.sede)} · ${escHtml(t.servicio)}</div>
                        </div>
                    </div>
                    <div class="card-verified">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                             stroke="#4caf7d" stroke-width="2.5">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            <polyline points="9 12 11 14 15 10"/>
                        </svg>
                        Opinión Verificada
                    </div>`;
                gridContainer.appendChild(card);
            });

            renderDots();
        }

        function renderDots() {
            if (!dotsWrap) return;
            dotsWrap.innerHTML = '';
            for (let i = 0; i < totalPages(); i++) {
                const dot = document.createElement('button');
                dot.className = 'slider-dot' + (i === page ? ' active' : '');
                dot.setAttribute('aria-label', `Página ${i + 1}`);
                dot.addEventListener('click', () => { goTo(i); resetAuto(); });
                dotsWrap.appendChild(dot);
            }
        }

        function goTo(p) {
            page = Math.max(0, Math.min(p, totalPages() - 1));
            renderPage();
        }

        function next() { goTo(page < totalPages() - 1 ? page + 1 : 0); }
        function prev() { goTo(page > 0 ? page - 1 : totalPages() - 1); }

        function startAuto() {
            stopAuto();
            if (totalPages() > 1) autoTimer = setInterval(next, 6000);
        }
        function stopAuto() { if (autoTimer) clearInterval(autoTimer); }
        function resetAuto() { stopAuto(); startAuto(); }

        document.addEventListener('visibilitychange', () => {
            document.hidden ? stopAuto() : startAuto();
        });

        // Swipe en móvil
        let touchX = 0;
        gridContainer.addEventListener('touchstart', e => {
            touchX = e.touches[0].clientX;
        }, { passive: true });
        gridContainer.addEventListener('touchend', e => {
            const diff = touchX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetAuto(); }
        }, { passive: true });

        // Resize: recalcular si cambia el breakpoint
        let lastPer = perPage;
        window.addEventListener('resize', () => {
            const np = getPerPage();
            if (np !== lastPer) { lastPer = np; page = 0; renderPage(); }
        }, { passive: true });

        if (btnPrev) btnPrev.addEventListener('click', () => { prev(); resetAuto(); });
        if (btnNext) btnNext.addEventListener('click', () => { next(); resetAuto(); });

        // Rating promedio
        if (data.length) {
            const avg = (data.reduce((a, t) => a + (t.calificacion || 0), 0) / data.length).toFixed(1);
            const avgEl = document.getElementById('ratingAverage');
            if (avgEl) {
                const full = Math.floor(parseFloat(avg));
                let stars = '';
                for (let i = 1; i <= 5; i++) {
                    const f = i <= full;
                    stars += `<svg class="estrella-svg ${f ? 'filled' : 'empty'}" viewBox="0 0 24 24"
                        fill="${f ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>`;
                }
                avgEl.innerHTML = `
                    <span class="rating-num">${avg}</span>
                    <div class="rating-detail">
                        <div class="rating-stars">${stars}</div>
                        <span class="rating-count">Basado en ${data.length} reseña${data.length !== 1 ? 's' : ''}</span>
                    </div>`;
            }
        }

        renderPage();
        startAuto();
    }

    // ── Sin reseñas: no inventamos nada, invitamos a opinar ────────────────
    const sliderControls = document.querySelector('.slider-controls');

    function mostrarSinResenas(fallo) {
        if (!gridContainer) return;
        gridContainer.className = 'testimonios-grid testimonios-grid--vacio';
        gridContainer.innerHTML = `
            <div class="testimonios-vacio" data-vacio>
                <p class="testimonios-vacio-titulo">${fallo
                    ? 'No pudimos cargar las reseñas en este momento.'
                    : 'Aún no hay reseñas publicadas.'}</p>
                <p class="testimonios-vacio-texto">${fallo
                    ? 'Vuelve a intentarlo en unos minutos.'
                    : '¿Ya te atendimos? Sé el primero en contar tu experiencia.'}</p>
                ${fallo ? '' : '<a class="testimonios-vacio-btn" href="#dejar-resena">Dejar mi reseña</a>'}
            </div>`;
        if (sliderControls) sliderControls.hidden = true;
        const avgEl = document.getElementById('ratingAverage');
        if (avgEl) { avgEl.innerHTML = ''; avgEl.hidden = true; }
    }

    // ── Carga con skeleton ─────────────────────────────────────────────────
    async function cargarTestimonios() {
        if (gridContainer) {
            gridContainer.className = 'testimonios-grid';
            gridContainer.innerHTML = '';
            for (let i = 0; i < 3; i++) {
                const sk = document.createElement('div');
                sk.className = 'testimonio-card skeleton-card';
                sk.innerHTML = `
                    <div class="skeleton-stars"></div>
                    <div class="skeleton-text skeleton-text--long"></div>
                    <div class="skeleton-text skeleton-text--medium"></div>
                    <div class="skeleton-text skeleton-text--short"></div>
                    <div class="card-meta">
                        <div class="card-avatar skeleton-avatar"></div>
                        <div>
                            <div class="skeleton-text skeleton-text--name"></div>
                            <div class="skeleton-text skeleton-text--sede"></div>
                        </div>
                    </div>`;
                gridContainer.appendChild(sk);
            }
        }

        let data = [];
        let fallo = false;
        try {
            // ── Supabase: trae reseñas aprobadas, las más recientes primero ──
            const { data: rows, error } = await supabaseClient
                .from('resenas')
                .select('*')
                .eq('estado', 'Aprobado')
                .order('creado_en', { ascending: false })
                .limit(50);

            if (error) throw error;

            if (Array.isArray(rows) && rows.length > 0) {
                data = rows.map(r => ({
                    nombre: r.nombre || 'Anónimo',
                    sede: r.sede || 'No especificada',
                    servicio: r.servicio || 'General',
                    calificacion: r.calificacion || 5,
                    comentario: r.comentario || '',
                    fecha: r.creado_en || ''
                }));
            }
        } catch (_) { fallo = true; }

        if (data.length) iniciarGrid(data);
        else mostrarSinResenas(fallo);

        // ── Tiempo real: cuando se aprueba una reseña aparece al instante ──
        supabaseClient.channel('custom-insert-channel')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'resenas' }, (payload) => {
                const row = payload.new;
                if (row.estado === 'Aprobado') {
                    const nueva = {
                        nombre: row.nombre || 'Anónimo',
                        sede: row.sede || 'No especificada',
                        servicio: row.servicio || 'General',
                        calificacion: row.calificacion || 5,
                        comentario: row.comentario || '',
                        fecha: row.creado_en || ''
                    };
                    // Prepend al grid actual sin recargar toda la lista
                    if (gridContainer) {
                        const color = getAvatarColor(nueva.nombre);
                        const ini = getInitials(nueva.nombre);
                        const card = document.createElement('div');
                        card.className = 'testimonio-card new-review-wow';
                        card.innerHTML = `
                            <div class="card-estrellas">${renderStars(nueva.calificacion)}</div>
                            <p class="card-comentario">"${escHtml(nueva.comentario)}"</p>
                            <div class="card-meta">
                                <div class="card-avatar" style="background:${color};border-color:${color}33">${ini}</div>
                                <div>
                                    <div class="card-nombre">${escHtml(nueva.nombre)}</div>
                                    <div class="card-sede">Sede ${escHtml(nueva.sede)} · ${escHtml(nueva.servicio)}</div>
                                </div>
                            </div>
                            <div class="card-verified">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                Opinión Verificada
                            </div>`;
                        gridContainer.prepend(card);
                        setTimeout(() => card.classList.add('visible'), 50);
                    }
                }
            })
            .subscribe();
    }

    cargarTestimonios(); // 🔄 Inicia carga desde Supabase

    /* -----------------------------------------------
       8. STAR RATING (formulario)
    ----------------------------------------------- */
    const starContainer = document.getElementById('starRating');
    const starInput = document.getElementById('resena-calificacion');

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
       INSERT directo a Supabase (sin PHP)
    ----------------------------------------------- */
    const form = document.getElementById('resenaForm');
    const btnSubmit = document.getElementById('btnSubmitResena');
    const successEl = document.getElementById('formSuccess');
    const errorEl = document.getElementById('formError');
    const errorMsg = document.getElementById('formErrorMsg');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Honeypot: campo invisible que solo un bot llenaría
            const honeypot = form.elements['web'];
            if (honeypot && honeypot.value.trim() !== '') {
                return; // silencioso: no delatamos la detección
            }
            // Trampa de tiempo: un envío en menos de 3s del primer render es casi siempre un bot
            if (Date.now() - resenaFormLoadedAt < 3000) {
                return;
            }
            // Throttle local: máximo un envío por minuto desde este navegador
            let lastSubmit = 0;
            try { lastSubmit = parseInt(localStorage.getItem('autogas_resena_last') || '0', 10); } catch (_) { }
            if (Date.now() - lastSubmit < RESENA_THROTTLE_MS) {
                showError('Ya enviaste una reseña hace poco. Intenta de nuevo en un momento.');
                return;
            }

            const nombre = form.elements['nombre'].value.trim();
            const sede = form.elements['sede'].value;
            const servicio = form.elements['servicio'].value;
            const calificacion = parseInt(form.elements['calificacion'].value, 10);
            const comentario = form.elements['comentario'].value.trim();

            if (!nombre || !sede || !servicio || !calificacion || !comentario) {
                showError('Por favor completa todos los campos y selecciona una calificación.');
                // Shake animation en star-rating si no hay calificación
                if (!calificacion && starContainer) {
                    starContainer.classList.add('shake-error');
                    setTimeout(() => starContainer.classList.remove('shake-error'), 500);
                }
                return;
            }
            if (nombre.length > 80 || comentario.length > 600) {
                showError('El nombre o el comentario son demasiado largos.');
                return;
            }

            setLoading(true);
            hideMessages();

            let guardada = false;
            try {
                // ── Supabase: insert directo, sin PHP ──────────────────────
                const { error } = await supabaseClient
                    .from('resenas')
                    .insert({ nombre, sede, servicio, calificacion, comentario });

                if (error) throw error;
                guardada = true;
            } catch (err) {
                // Rate limit o validación
                const msg = err.message || '';
                if (msg.includes('check') || msg.includes('constraint')) {
                    showError('Revisa que todos los campos sean válidos e intenta de nuevo.');
                } else {
                    showError('Error de conexión. Verifica tu internet e intenta de nuevo.');
                }
            } finally {
                setLoading(false);
            }

            // La reseña ya está guardada: nada de aquí abajo puede mostrar
            // "Error de conexión" ni provocar que el cliente la reenvíe.
            if (!guardada) return;
            try { localStorage.setItem('autogas_resena_last', String(Date.now())); } catch (_) { }
            hideMessages();
            try {
                showSuccess(nombre, comentario, sede, servicio, calificacion);
            } catch (_) {
                if (successEl) successEl.style.display = 'flex';
            }
            resetForm();
        });
    }

    function setLoading(on) {
        if (!btnSubmit) return;
        btnSubmit.disabled = on;
        const txt = btnSubmit.querySelector('.btn-text');
        const loading = btnSubmit.querySelector('.btn-loading');
        const arrow = btnSubmit.querySelector('.btn-arrow');
        if (txt) txt.style.display = on ? 'none' : 'inline';
        if (loading) loading.style.display = on ? 'inline-flex' : 'none';
        if (arrow) arrow.style.display = on ? 'none' : 'inline';
    }

    function showSuccess(nombre, comentario, sede, servicio, calificacion) {
        if (successEl) successEl.style.display = 'flex';
        if (errorEl) errorEl.style.display = 'none';

        // WOW: inject the new review at the top of the slider
        if (gridContainer && nombre && comentario) {
            const stars = Array.from({ length: 5 }, (_, i) => {
                const filled = i < calificacion ? 'currentColor' : 'none';
                return `<svg class="estrella-svg ${i < calificacion ? 'filled' : 'empty'}" viewBox="0 0 24 24" fill="${filled}" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
            }).join('');

            const ini = getInitials(nombre);
            const avatarColor = getAvatarColor(nombre);
            // Si estaba el aviso de "aún no hay reseñas", se reemplaza por la tarjeta
            const vacio = gridContainer.querySelector('[data-vacio]');
            if (vacio) { vacio.remove(); gridContainer.className = 'testimonios-grid'; }
            const newCard = document.createElement('div');
            newCard.className = 'testimonio-card new-review-wow';
            newCard.innerHTML = `
                <div class="card-estrellas">${stars}</div>
                <p class="card-comentario">"${escHtml(comentario)}"</p>
                <div class="card-meta">
                    <div class="card-avatar" style="background:${avatarColor};border-color:${avatarColor}33">${ini}</div>
                    <div>
                        <div class="card-nombre">${escHtml(nombre)}</div>
                        <div class="card-sede">Sede ${escHtml(sede)} · ${escHtml(servicio)}</div>
                    </div>
                </div>
                <div class="card-verified card-verified--pending">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    Tu reseña está pendiente de verificación
                </div>`;
            gridContainer.prepend(newCard);
            // No need to scroll if grid is multi-line, but if it's horizontal:
            // gridContainer.scrollTo({ left: 0, behavior: 'smooth' });
            setTimeout(() => newCard.classList.add('visible'), 50);
        }
    }

    function showError(msg) {
        if (errorEl) { errorEl.style.display = 'flex'; }
        if (errorMsg) { errorMsg.textContent = msg; }
        if (successEl) successEl.style.display = 'none';
    }

    function hideMessages() {
        if (successEl) successEl.style.display = 'none';
        if (errorEl) errorEl.style.display = 'none';
    }

    function resetForm() {
        if (form) form.reset();
        const si = document.getElementById('resena-calificacion');
        if (si) si.value = '0';
        document.querySelectorAll('.star-btn').forEach(b => b.classList.remove('active'));
    }

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
