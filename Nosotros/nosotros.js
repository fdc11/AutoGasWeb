/* =====================================================================
   nosotros.js — AutoGas · Página Nosotros
   1. Adelanto del video en "Recorre nuestro taller": mudo, en bucle,
      solo cuando está en pantalla (respeta "reducir movimiento" y
      "ahorro de datos": en ese caso queda la imagen fija).
   2. Ventana del video completo: se abre con cualquier [data-abrir-video],
      descarga el video recién al abrir, se cierra con la X, Escape o
      clic fuera, y devuelve el foco al botón que la abrió.
   Lo compartido (menú de celular, .reveal, cifras, año) está en ../Comun/comun.js.
   ===================================================================== */
(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ahorraDatos = !!(navigator.connection && navigator.connection.saveData);

    /* ---------- 1. Adelanto mudo ---------- */
    const teaser = document.getElementById('videoTeaser');
    if (teaser && !reduceMotion && !ahorraDatos && 'IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const p = teaser.play();
                    if (p && p.catch) p.catch(() => { /* autoplay bloqueado: queda el poster */ });
                } else if (!teaser.paused) {
                    teaser.pause();
                }
            });
        }, { threshold: 0.25 }).observe(teaser);
    }

    /* ---------- 2. Ventana del video ---------- */
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('videoNosotros');
    const cerrar = document.getElementById('videoCerrar');
    const abridores = document.querySelectorAll('[data-abrir-video]');
    if (!modal || !video || !cerrar || !abridores.length) return;

    let ultimoFoco = null;

    function cargarFuente() {
        if (video.querySelector('source')) return;
        const hd = window.matchMedia('(min-width: 901px)').matches && !ahorraDatos;
        const s = document.createElement('source');
        s.src = hd ? video.dataset.hd : video.dataset.sd;
        s.type = 'video/mp4';
        video.append(s);
        video.load();
    }

    function abrir(e) {
        if (e) e.preventDefault();
        ultimoFoco = document.activeElement;
        cargarFuente();
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        if (teaser && !teaser.paused) teaser.pause();
        cerrar.focus();
        const p = video.play();
        if (p && p.catch) p.catch(() => { /* sin autoplay: la persona usa los controles */ });
    }

    function cerrarModal() {
        video.pause();
        modal.hidden = true;
        document.body.style.overflow = '';
        if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
    }

    abridores.forEach(b => b.addEventListener('click', abrir));
    cerrar.addEventListener('click', cerrarModal);
    // Clic en el fondo oscuro (fuera del video y del texto)
    modal.addEventListener('click', e => { if (e.target === modal) cerrarModal(); });

    document.addEventListener('keydown', e => {
        if (modal.hidden) return;
        if (e.key === 'Escape') { cerrarModal(); return; }
        // Mantener el foco dentro de la ventana
        if (e.key === 'Tab') {
            const focos = [cerrar, video];
            const i = focos.indexOf(document.activeElement);
            e.preventDefault();
            focos[(i + (e.shiftKey ? -1 : 1) + focos.length) % focos.length].focus();
        }
    });
})();
