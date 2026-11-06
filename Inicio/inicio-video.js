/* Video horizontal de Inicio (inyección directa): botón grande de "play" encima del video.
   El video no se descarga hasta que la persona lo reproduce (preload="none"). */
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('videoExpertos');
    if (!video) return;
    const boton = video.parentElement.querySelector('.expertos-play');

    // Con JavaScript mostramos el botón propio y ocultamos los controles hasta empezar
    video.controls = false;
    boton.hidden = false;

    const reproducir = () => {
        boton.hidden = true;
        video.controls = true;
        const p = video.play();
        if (p && p.catch) p.catch(() => { boton.hidden = false; });
    };
    boton.addEventListener('click', reproducir);

    // Al terminar, vuelve a mostrar el botón para verlo otra vez
    video.addEventListener('ended', () => {
        video.controls = false;
        video.currentTime = 0;
        boton.hidden = false;
    });

    // Si la persona baja y el video queda fuera de pantalla, se pausa
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
            entries.forEach(e => { if (!e.isIntersecting && !video.paused) video.pause(); });
        }, { threshold: 0.2 }).observe(video);
    }
});
