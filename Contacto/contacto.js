/* =====================================================================
   contacto.js — AutoGas (página Cotizar)
   Formulario en 2 pasos. Al enviar arma el mensaje y abre el WhatsApp
   de la sede elegida. (El menú y el footer están en ../Comun/comun.js)
   ► Los números de WhatsApp de cada sede están en contacto.html,
     en el value de cada opción de sede.
   ===================================================================== */
(function () {
    'use strict';

    const form = document.getElementById('cotForm');
    if (!form) return;

    const $ = id => document.getElementById(id);
    const paso1 = $('paso1');
    const paso2 = $('paso2');
    const listo = $('listo');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const valor = id => ($(id) ? $(id).value.trim() : '');
    const elegido = name => form.querySelector('input[name="' + name + '"]:checked');

    /* ---------- Errores ---------- */
    function error(id, texto) {
        const p = $('err-' + id);
        if (p) p.textContent = texto || '';
        const input = $(id);
        if (input) input.setAttribute('aria-invalid', texto ? 'true' : 'false');
    }
    function limpiarErrores(ids) { ids.forEach(id => error(id, '')); }

    // Al corregir un campo, su error desaparece
    form.addEventListener('input', e => { if (e.target.id) error(e.target.id, ''); });
    form.addEventListener('change', e => { if (e.target.type === 'radio') error(e.target.name, ''); });

    /* ---------- Pasos ---------- */
    function irAPaso(n) {
        paso1.hidden = n !== 1;
        paso2.hidden = n !== 2;
        $('progresoPaso').textContent = 'Paso ' + n + ' de 2';
        $('progresoSigue').textContent = n === 1 ? 'Sigue: tus datos' : 'Último paso';
        $('progresoBarra').style.width = n === 1 ? '50%' : '100%';
        const titulo = n === 1 ? $('formTitulo') : $('paso2Titulo');
        enfocar(titulo);
    }

    function enfocar(el) {
        if (!el) return;
        const caja = form.closest('.cotizar-caja');
        const arriba = caja.getBoundingClientRect().top;
        if (arriba < 80) caja.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        el.focus({ preventScroll: true });
    }

    function primerError(ids) {
        const id = ids.find(i => $('err-' + i) && $('err-' + i).textContent);
        if (!id) return;
        const el = $(id) || form.querySelector('input[name="' + id + '"]');
        if (el) el.focus();
    }

    /* Paso 1: tu auto */
    $('btnSiguiente').addEventListener('click', () => {
        const ids = ['servicio', 'marca', 'modelo', 'anio'];
        limpiarErrores(ids);
        let ok = true;
        if (!elegido('servicio')) { error('servicio', 'Elige qué necesitas'); ok = false; }
        if (!valor('marca')) { error('marca', 'Escribe la marca'); ok = false; }
        if (!valor('modelo')) { error('modelo', 'Escribe el modelo'); ok = false; }
        const anio = parseInt(valor('anio'), 10);
        const max = new Date().getFullYear() + 1;
        if (!(anio >= 1980 && anio <= max)) { error('anio', 'Escribe el año (ej.: 2018)'); ok = false; }
        if (!ok) { primerError(ids); return; }
        irAPaso(2);
    });

    $('btnAtras').addEventListener('click', () => irAPaso(1));

    /* Paso 2: tus datos → WhatsApp */
    form.addEventListener('submit', e => {
        e.preventDefault();
        if (valor('empresa')) return; // anti-spam

        const ids = ['nombre', 'celular', 'sede'];
        limpiarErrores(ids);
        let ok = true;
        if (valor('nombre').length < 2) { error('nombre', 'Escribe tu nombre'); ok = false; }
        const cel = valor('celular').replace(/\D/g, '');
        if (!/^9\d{8}$/.test(cel)) { error('celular', 'Escribe un celular de 9 dígitos que empiece con 9'); ok = false; }
        const sede = elegido('sede');
        if (!sede) { error('sede', 'Elige una sede'); ok = false; }
        if (!ok) { primerError(ids); return; }

        const mensaje = armarMensaje(cel);
        const url = 'https://wa.me/' + sede.value + '?text=' + encodeURIComponent(mensaje);

        $('listoSede').textContent = sede.dataset.ciudad;
        $('listoMensaje').textContent = mensaje;
        $('listoWa').href = url;
        form.hidden = true;
        listo.hidden = false;
        enfocar($('listoTitulo'));

        window.open(url, '_blank', 'noopener');
    });

    function armarMensaje(cel) {
        const servicio = elegido('servicio').value;
        const combustible = elegido('combustible');
        const auto = [valor('marca'), valor('modelo'), valor('anio')].join(' ');
        const fecha = valor('fecha');
        const lineas = [
            'Hola, soy ' + valor('nombre') + '. Quiero cotizar: ' + servicio + '.',
            'Auto: ' + auto + (combustible ? ' (' + combustible.value.toLowerCase() + ')' : ''),
            valor('placa') ? 'Placa: ' + valor('placa').toUpperCase() : '',
            valor('km') ? 'Kilometraje: ' + valor('km') : '',
            fecha ? 'Fecha preferida: ' + fecha.split('-').reverse().join('/') : '',
            valor('nota') ? 'Comentario: ' + valor('nota') : '',
            'Mi celular: ' + cel
        ];
        return lineas.filter(Boolean).join('\n');
    }

    /* Otra cotización */
    $('btnOtra').addEventListener('click', () => {
        form.reset();
        listo.hidden = true;
        form.hidden = false;
        irAPaso(1);
    });

    /* La fecha no puede ser antes de hoy */
    const fecha = $('fecha');
    if (fecha) {
        const hoy = new Date();
        hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
        fecha.min = hoy.toISOString().slice(0, 10);
    }
})();
