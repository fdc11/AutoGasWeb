'use strict';

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── MOBILE MENU ── */
/**
 * Toggles the visibility of the mobile navigation menu.
 */
function toggleMenu() {
    document.getElementById('mobileNav').classList.toggle('open');
}

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    revealEls.forEach((el) => { obs.observe(el); });
}

/* ── FEED FILTROS ── */
const feedItems = Array.from(document.querySelectorAll('#feedGrid .feed-item'));
const feedPills = document.querySelectorAll('.feed-filters .feed-pill');
const feedEmpty = document.getElementById('feedEmpty');

feedPills.forEach((pill) => {
    pill.addEventListener('click', () => {
        feedPills.forEach((p) => { p.classList.remove('active'); });
        pill.classList.add('active');

        const tipo = pill.dataset.tipo;
        let visibles = 0;

        feedItems.forEach((item) => {
            const mostrar = tipo === 'todos' || item.dataset.tipo === tipo;
            item.style.display = mostrar ? '' : 'none';
            if (mostrar) visibles++;
        });

        if (feedEmpty) {
            feedEmpty.classList.toggle('visible', visibles === 0);
        }
    });
});

/* ── NOTICIAS — render desde noticias-data.js ── */
const noticiasGrid  = document.getElementById('noticiasGrid');
const noticiasEmpty = document.getElementById('noticiasEmpty');
const noticiasPills = document.querySelectorAll('.noticias-filters .feed-pill');
let activeCat       = 'todos';

const LABELS = {
    gnv:           'Conversiones GNV',
    glp:           'Conversiones GLP',
    mantenimiento: 'Mantenimiento',
    noticias:      'Noticias',
    tips:          'Tips'
};

/**
 * Renders the list of news articles based on the currently selected category filter.
 * Uses data from the global NOTICIAS array.
 */
function renderNoticias() {
    if (typeof NOTICIAS === 'undefined' || !noticiasGrid) return;

    const filtradas = activeCat === 'todos'
        ? NOTICIAS
        : NOTICIAS.filter((n) => n.categoria === activeCat);

    noticiasGrid.innerHTML = '';

    if (filtradas.length === 0) {
        if (noticiasEmpty) noticiasEmpty.classList.add('visible');
        return;
    }
    if (noticiasEmpty) noticiasEmpty.classList.remove('visible');

    filtradas.forEach((n, i) => {
        const label = LABELS[n.categoria] || n.categoria;
        const card  = document.createElement('article');
        card.className = 'noticia-card';
        card.style.animationDelay = (i * 0.06) + 's';
        card.innerHTML =
            `<div class="noticia-img">
                <img src="${n.imagen}" alt="${n.titulo}" loading="lazy" onerror="this.style.display='none'">
                <span class="cat-badge ${n.categoria}">${label}</span>
            </div>
            <div class="noticia-body">
                <div class="noticia-meta">
                    <time>${n.fecha}</time>
                    <span class="noticia-sep">·</span>
                    <span>${n.lectura} min</span>
                </div>
                <h3 class="noticia-titulo">${n.titulo}</h3>
                <p class="noticia-extracto">${n.extracto}</p>
                <a href="articulo.html?id=${n.id}" class="noticia-link">
                    Leer artículo
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
            </div>`;
        noticiasGrid.appendChild(card);
    });
}

noticiasPills.forEach((pill) => {
    pill.addEventListener('click', () => {
        noticiasPills.forEach((p) => { p.classList.remove('active'); });
        pill.classList.add('active');
        activeCat = pill.dataset.cat;
        renderNoticias();
    });
});

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
    renderNoticias();
});