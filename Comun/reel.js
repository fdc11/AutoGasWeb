/* =============================================================
   REEL DE VIDEO — Nosotros e Inicio (estilos en Comun/reel.css)

   Dos modos sobre el mismo <video>:
   · "preview": clip mudo en bucle (~1-2 MB) que corre solo mientras
     la sección está en pantalla. Cada tramo del clip es un capítulo.
   · "full": el video completo con sonido. Solo se descarga cuando la
     persona toca la bocina, el video o una escena.
   ============================================================= */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-reel]').forEach(iniciarReel);
});

function iniciarReel(sec) {
    const video   = sec.querySelector('.reel-video');
    const bocina  = sec.querySelector('.reel-sonido');
    const ahora   = sec.querySelector('.reel-ahora');
    const barras  = [...sec.querySelectorAll('.reel-barras i')];
    const escenas = [...sec.querySelectorAll('.reel-esc')];
    if (!video || !escenas.length) return;

    const inicios  = escenas.map(b => parseFloat(b.dataset.t) || 0);
    const nombres  = escenas.map(b => b.dataset.nombre || '');
    // Qué capítulo muestra cada tramo de la vista previa (p. ej. "1,2,3,4,5,6")
    const mapa     = (video.dataset.previewMapa || '').split(',').map(Number).filter(n => !isNaN(n));
    const grande   = window.matchMedia('(min-width: 901px)');
    const srcPrev  = () => (grande.matches && video.dataset.previewHd) || video.dataset.preview;
    const srcFull  = () => (grande.matches ? video.dataset.fullHd : video.dataset.fullSd) || video.dataset.fullHd;

    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        || (navigator.connection && navigator.connection.saveData);

    let modo = 'nada';      // nada | preview | full
    let visible = false;
    let activo = -1;

    const pintar = (idx, avance) => {
        if (idx !== activo) {
            activo = idx;
            escenas.forEach((b, i) => {
                b.classList.toggle('activo', i === idx);
                if (i === idx) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
            });
            if (ahora && escenas[idx]) {
                ahora.innerHTML = '';
                const n = document.createElement('b');
                n.textContent = String(idx + 1).padStart(2, '0');
                ahora.append(n, nombres[idx]);
            }
        }
        const lleno = i => (i < idx ? 1 : i === idx ? Math.max(0, Math.min(1, avance)) : 0);
        barras.forEach((el, i) => { el.style.transform = `scaleX(${lleno(i)})`; });
        escenas.forEach((b, i) => {
            const l = b.querySelector('.reel-esc-linea i');
            if (l) l.style.transform = `scaleX(${lleno(i)})`;
        });
    };

    const ponerBocina = conSonido => {
        bocina.setAttribute('aria-pressed', conSonido ? 'true' : 'false');
        bocina.setAttribute('aria-label', conSonido ? 'Silenciar el video' : 'Activar el sonido del video');
    };

    const cargar = (src, alListo) => {
        video.src = src;
        video.load();
        video.addEventListener('loadedmetadata', alListo, { once: true });
    };

    const iniciarPreview = () => {
        if (quieto || !video.dataset.preview) return;
        modo = 'preview';
        video.muted = true; video.loop = true;
        ponerBocina(false);
        cargar(srcPrev(), () => { if (visible && modo === 'preview') video.play().catch(() => {}); });
    };

    const verCompleto = (desde, conSonido = true) => {
        const arrancar = () => {
            try { video.currentTime = desde; } catch (e) { /* algunos navegadores esperan a 'canplay' */ }
            video.muted = !conSonido;
            ponerBocina(conSonido);
            video.play().catch(() => { video.muted = true; ponerBocina(false); video.play().catch(() => {}); });
        };
        if (modo === 'full') { arrancar(); return; }
        modo = 'full';
        video.loop = false;
        cargar(srcFull(), arrancar);
    };

    // Capítulo actual a partir del tiempo del video
    video.addEventListener('timeupdate', () => {
        const t = video.currentTime;
        if (modo === 'preview' && mapa.length && video.duration) {
            const tramo = video.duration / mapa.length;
            const k = Math.min(mapa.length - 1, Math.floor(t / tramo));
            pintar(mapa[k], (t - k * tramo) / tramo);
        } else if (modo === 'full') {
            let i = 0;
            while (i + 1 < inicios.length && t >= inicios[i + 1]) i++;
            const fin = inicios[i + 1] || video.duration || t + 1;
            pintar(i, (t - inicios[i]) / (fin - inicios[i]));
        }
    });

    // Al terminar el video completo vuelve la vista previa muda
    video.addEventListener('ended', () => { if (modo === 'full') { activo = -1; iniciarPreview(); } });

    // Bocina: en la vista previa abre el video completo desde la escena actual;
    // en el video completo solo activa o silencia el sonido.
    bocina.hidden = false;
    video.controls = false;
    bocina.addEventListener('click', () => {
        if (modo === 'full') {
            video.muted = !video.muted;
            ponerBocina(!video.muted);
            if (video.paused) video.play().catch(() => {});
        } else {
            verCompleto(inicios[Math.max(0, activo)] || 0, true);
        }
    });

    // Tocar el video: en la vista previa abre el completo; en el completo pausa o sigue
    video.addEventListener('click', () => {
        if (modo === 'full') { if (video.paused) video.play().catch(() => {}); else video.pause(); }
        else verCompleto(inicios[Math.max(0, activo)] || 0, true);
    });

    escenas.forEach((b, i) => b.addEventListener('click', () => {
        verCompleto(inicios[i], modo === 'full' ? !video.muted : true);
        pintar(i, 0);
    }));

    // Solo corre mientras se ve; fuera de pantalla se pausa
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(entradas => {
            entradas.forEach(e => {
                visible = e.isIntersecting;
                if (visible) {
                    if (modo === 'nada') iniciarPreview();
                    else if (modo === 'preview') video.play().catch(() => {});
                } else if (!video.paused) {
                    video.pause();
                }
            });
        }, { threshold: 0.35 }).observe(video);
    } else {
        visible = true; iniciarPreview();
    }

    pintar(mapa.length ? mapa[0] : 0, 0);
}
