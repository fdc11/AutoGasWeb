'use strict';

/* ──────────────────────────────────────────
   NAVBAR
────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

function toggleMenu() {
    const nav = document.getElementById('mobileNav');
    const ham = document.getElementById('hamburger');
    const open = nav.classList.toggle('open');
    ham.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
}
document.addEventListener('click', (e) => {
    const nav = document.getElementById('mobileNav');
    const ham = document.getElementById('hamburger');
    if (nav.classList.contains('open') && !nav.contains(e.target) && !ham.contains(e.target)) {
        nav.classList.remove('open');
        document.body.style.overflow = '';
    }
});

/* ──────────────────────────────────────────
   CARGAR ARTÍCULO
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id     = params.get('id');

    if (!id || typeof NOTICIAS === 'undefined') {
        mostrarNoEncontrado();
        return;
    }

    const noticia = getNoticiaById(id);
    if (!noticia) {
        mostrarNoEncontrado();
        return;
    }

    renderArticulo(noticia);
    renderRelacionados(noticia);
});

/* ──────────────────────────────────────────
   RENDER ARTÍCULO
────────────────────────────────────────── */
function renderArticulo(n) {
    // Meta título
    document.title = `${n.titulo} | AutoGas`;

    // Hero bg
    const heroBg = document.getElementById('artHeroBg');
    if (heroBg && n.imagen) {
        heroBg.style.backgroundImage = `url('${n.imagen}')`;
    }

    // Badge categoría
    const catInfo  = (typeof CATEGORIA_LABELS !== 'undefined' && CATEGORIA_LABELS[n.categoria]) || { label: n.categoria };
    const badgeEl  = document.getElementById('artCatBadge');
    badgeEl.textContent = catInfo.label || n.categoria;
    badgeEl.className   = `art-cat-badge ${n.categoria}`;

    // Título
    document.getElementById('artTitle').textContent = n.titulo;

    // Meta
    document.getElementById('artFecha').textContent = n.fecha;
    document.getElementById('artRead').textContent  = `${n.lectura} min de lectura`;

    // Contenido
    const body = document.getElementById('artBody');
    body.innerHTML = n.contenido;
}

/* ──────────────────────────────────────────
   RELACIONADOS (misma categoría, excluyendo actual)
────────────────────────────────────────── */
function renderRelacionados(actual) {
    const data = typeof NOTICIAS !== 'undefined' ? NOTICIAS : [];
    const rel  = data
        .filter(n => n.id !== actual.id && n.categoria === actual.categoria)
        .slice(0, 2);

    // Si no hay de la misma cat, toma los primeros distintos
    const relleno = rel.length < 2
        ? data.filter(n => n.id !== actual.id && !rel.includes(n)).slice(0, 2 - rel.length)
        : [];
    const todos = [...rel, ...relleno];

    const grid = document.getElementById('relacionadosGrid');
    const aside = document.getElementById('artRelacionados');

    if (todos.length === 0) {
        aside.style.display = 'none';
        return;
    }

    grid.innerHTML = '';
    todos.forEach(n => {
        const catInfo = (typeof CATEGORIA_LABELS !== 'undefined' && CATEGORIA_LABELS[n.categoria]) || { label: n.categoria };
        const card    = document.createElement('a');
        card.href     = `articulo.html?id=${n.id}`;
        card.className = 'rel-card';
        card.innerHTML = `
            <img class="rel-img" src="${n.imagen}" alt="${n.titulo}"
                 onerror="this.style.display='none'">
            <div class="rel-info">
                <span class="rel-cat">${catInfo.label || n.categoria}</span>
                <span class="rel-titulo">${n.titulo}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* ──────────────────────────────────────────
   NO ENCONTRADO
────────────────────────────────────────── */
function mostrarNoEncontrado() {
    document.getElementById('artHero').style.minHeight = '40vh';
    document.getElementById('artTitle').textContent    = 'Artículo no encontrado';
    document.getElementById('artCatBadge').style.display = 'none';
    document.getElementById('artFecha').textContent    = '';
    document.getElementById('artRead').textContent     = '';

    const body = document.getElementById('artBody');
    body.innerHTML = `
        <div class="art-not-found">
            <h2>No encontramos este artículo</h2>
            <p>El artículo que buscas no existe o fue eliminado.</p>
            <a href="publicacion.html" class="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                Ver todas las publicaciones
            </a>
        </div>
    `;
    document.getElementById('artRelacionados').style.display = 'none';
}