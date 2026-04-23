'use strict';

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll', function() {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── MOBILE MENU ── */
function toggleMenu() {
    document.getElementById('mobileNav').classList.toggle('open');
}

/* ── SCROLL REVEAL ── */
var revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
    var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    revealEls.forEach(function(el) { obs.observe(el); });
}

/* ── FEED FILTROS ── */
var feedItems = Array.from(document.querySelectorAll('#feedGrid .feed-item'));
var feedPills = document.querySelectorAll('.feed-filters .feed-pill');
var feedEmpty = document.getElementById('feedEmpty');

feedPills.forEach(function(pill) {
    pill.addEventListener('click', function() {
        feedPills.forEach(function(p) { p.classList.remove('active'); });
        pill.classList.add('active');

        var tipo = pill.dataset.tipo;
        var visibles = 0;

        feedItems.forEach(function(item) {
            var mostrar = tipo === 'todos' || item.dataset.tipo === tipo;
            item.style.display = mostrar ? '' : 'none';
            if (mostrar) visibles++;
        });

        feedEmpty.classList.toggle('visible', visibles === 0);
    });
});

/* ── NOTICIAS — render desde noticias-data.js ── */
var noticiasGrid  = document.getElementById('noticiasGrid');
var noticiasEmpty = document.getElementById('noticiasEmpty');
var noticiasPills = document.querySelectorAll('.noticias-filters .feed-pill');
var activeCat     = 'todos';

var LABELS = {
    gnv:           'Conversiones GNV',
    glp:           'Conversiones GLP',
    mantenimiento: 'Mantenimiento',
    noticias:      'Noticias',
    tips:          'Tips'
};

function renderNoticias() {
    if (typeof NOTICIAS === 'undefined') return;

    var filtradas = activeCat === 'todos'
        ? NOTICIAS
        : NOTICIAS.filter(function(n) { return n.categoria === activeCat; });

    noticiasGrid.innerHTML = '';

    if (filtradas.length === 0) {
        noticiasEmpty.classList.add('visible');
        return;
    }
    noticiasEmpty.classList.remove('visible');

    filtradas.forEach(function(n, i) {
        var label = LABELS[n.categoria] || n.categoria;
        var card  = document.createElement('article');
        card.className = 'noticia-card';
        card.style.animationDelay = (i * 0.06) + 's';
        card.innerHTML =
            '<div class="noticia-img">' +
                '<img src="' + n.imagen + '" alt="' + n.titulo + '" loading="lazy" onerror="this.style.display=\'none\'">' +
                '<span class="cat-badge ' + n.categoria + '">' + label + '</span>' +
            '</div>' +
            '<div class="noticia-body">' +
                '<div class="noticia-meta">' +
                    '<time>' + n.fecha + '</time>' +
                    '<span class="noticia-sep">·</span>' +
                    '<span>' + n.lectura + ' min</span>' +
                '</div>' +
                '<h3 class="noticia-titulo">' + n.titulo + '</h3>' +
                '<p class="noticia-extracto">' + n.extracto + '</p>' +
                '<a href="articulo.html?id=' + n.id + '" class="noticia-link">' +
                    'Leer artículo' +
                    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
                '</a>' +
            '</div>';
        noticiasGrid.appendChild(card);
    });
}

noticiasPills.forEach(function(pill) {
    pill.addEventListener('click', function() {
        noticiasPills.forEach(function(p) { p.classList.remove('active'); });
        pill.classList.add('active');
        activeCat = pill.dataset.cat;
        renderNoticias();
    });
});

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', function() {
    renderNoticias();
});