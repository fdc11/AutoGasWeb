/* =============================================================================
   AutoGas · Orientación automática
   -----------------------------------------------------------------------------
   Guía simple para el cliente: compara la descripción del problema con
   palabras clave de cada servicio y sugiere hasta 3 servicios.

   - Ignora mayúsculas y tildes.
   - Coincide solo con palabras completas y acepta plurales (freno / frenos).
   - "*" al final de una palabra acepta variantes: "chirri*" = chirría, chirrido…
   - Las frases de varias palabras valen más que una palabra suelta.

   Para mejorarla basta con agregar frases en la lista "claves" del servicio.
============================================================================= */
(function () {
    'use strict';

    const SERVICIOS = [
        // ── Mecánica General ──────────────────────────────────────────────
        { id: 'frenos', nombre: 'Reparación de Frenos', grupo: 'Mecánica General', seccion: 'mecanica', card: 'Frenos',
          desc: 'Pastillas, discos, líquido y bomba de freno.',
          aviso: 'Si el freno responde poco o el pedal se hunde, evita conducir el vehículo hasta revisarlo.',
          claves: ['freno', 'frena', 'frenar', 'frenado', 'pastilla', 'disco de freno', 'zapata', 'abs', 'pedal se hunde',
                   'pedal blando', 'no frena', 'frena poco', 'frena mal', 'ruido al frenar', 'chirri*', 'rechin*',
                   'vibra al frenar', 'freno de mano'] },
        { id: 'direccion', nombre: 'Reparación de Dirección', grupo: 'Mecánica General', seccion: 'mecanica', card: 'Frenos',
          desc: 'Dirección hidráulica o eléctrica, cremallera y terminales.',
          claves: ['direccion', 'volante', 'timon', 'volante duro', 'timon duro', 'jala a un lado', 'se va de lado',
                   'se desvia', 'cremallera', 'terminal', 'rotula', 'ruido al girar', 'alineacion'] },
        { id: 'refrigeracion', nombre: 'Reparación de Refrigeración', grupo: 'Mecánica General', seccion: 'mecanica', card: 'Frenos',
          desc: 'Radiador, termostato y bomba de agua.',
          aviso: 'Si el motor se recalienta, detén el vehículo y no abras el radiador en caliente.',
          claves: ['recalient*', 'se calienta', 'temperatura', 'radiador', 'termostato', 'bomba de agua', 'refrigerante',
                   'pierde agua', 'vapor', 'ventilador', 'anticongelante'] },
        { id: 'embrague', nombre: 'Reparación de Embrague', grupo: 'Mecánica General', seccion: 'mecanica', card: 'Embrague',
          desc: 'Disco, plato y collarín de embrague.',
          claves: ['embrague', 'clutch', 'cloch', 'patina', 'cambios duros', 'no entra la marcha', 'no entran los cambios',
                   'olor a quemado', 'collarin'] },
        { id: 'culata', nombre: 'Diagnóstico y Reparación de Culata', grupo: 'Mecánica General', seccion: 'mecanica', card: 'Culata',
          desc: 'Inspección de culata y junta para evitar daños mayores.',
          claves: ['culata', 'junta de culata', 'humo blanco', 'aceite con agua', 'agua con aceite', 'aceite lechoso', 'burbuja*'] },
        { id: 'motor', nombre: 'Reparación Completa de Motor', grupo: 'Mecánica General', seccion: 'mecanica', card: 'Reparación Completa de Motor',
          desc: 'Desmontaje y reparación total del motor.',
          claves: ['reparar motor', 'reparacion de motor', 'overhaul', 'golpeteo', 'motor golpea', 'humo azul', 'quema aceite',
                   'consume aceite', 'pierde aceite', 'ruido en el motor', 'biela', 'piston*'] },

        // ── Mantenimiento Preventivo ─────────────────────────────────────
        { id: 'aceite', nombre: 'Cambio de Aceite', grupo: 'Mantenimiento Preventivo', seccion: 'mecanica', card: 'Cambio de Aceite',
          desc: 'Aceite de motor, caja y corona.',
          claves: ['aceite', 'cambio de aceite', 'filtro de aceite', 'luz de aceite', 'aceite negro', 'aceite bajo', 'kilometraje'] },
        { id: 'bateria', nombre: 'Diagnóstico de Baterías', grupo: 'Mantenimiento Preventivo', seccion: 'mecanica', card: 'Baterías',
          desc: 'Batería, alternador y sistema eléctrico.',
          claves: ['bateria', 'no arranca', 'no prende', 'no enciende', 'arranque lento', 'hace clic', 'se descarga',
                   'alternador', 'luces debiles', 'electrico'] },
        { id: 'diagnostico', nombre: 'Revisión y Diagnóstico Vehicular', grupo: 'Mantenimiento Preventivo', seccion: 'mecanica', card: 'Revisión y Diagnóstico',
          desc: 'Escaneo completo para detectar códigos de falla.',
          claves: ['check engine', 'luz del motor', 'luz en el tablero', 'testigo', 'scanner', 'escaner', 'diagnostico',
                   'revision general', 'falla rara', 'no se que tiene', 'a veces falla', 'ruido raro'] },
        { id: 'inyectores', nombre: 'Limpieza de Inyectores', grupo: 'Mantenimiento Preventivo', seccion: 'mecanica', card: 'Inyectores',
          desc: 'Recupera potencia y reduce el consumo de gasolina.',
          claves: ['inyector', 'consume mucho', 'gasta mucho', 'consumo alto', 'mucha gasolina', 'mucho combustible',
                   'humo negro', 'tiembla', 'ralenti', 'jalonea'] },
        { id: 'afinamiento', nombre: 'Afinamiento Electrónico', grupo: 'Mantenimiento Preventivo', seccion: 'mecanica', card: 'Afinamiento',
          desc: 'Puesta a punto para mejorar arranque, potencia y consumo.',
          claves: ['afinamiento', 'afinar', 'no arranca', 'cuesta arrancar', 'arranca mal', 'falla el arranque', 'sin fuerza', 'pierde fuerza',
                   'no jala', 'sin potencia', 'se apaga', 'tiembla', 'consume mucho', 'gasta mucho'] },
        { id: 'fluidos', nombre: 'Cambio de Fluidos', grupo: 'Mantenimiento Preventivo', seccion: 'mecanica', card: 'Fluidos',
          desc: 'Líquidos de frenos, dirección y refrigeración.',
          claves: ['fluido', 'liquido', 'liquido de frenos', 'liquido de direccion', 'cambio de liquidos'] },

        // ── Conversión GNV/GLP ───────────────────────────────────────────
        { id: 'glp', nombre: 'Conversión a GLP', grupo: 'Conversión GNV/GLP', seccion: 'conversion', card: 'Conversión a GLP',
          desc: 'Gas Licuado de Petróleo.',
          claves: ['glp', 'gas licuado', 'convertir a gas', 'pasar a gas', 'instalar gas', 'ahorrar', 'gasolina cara'] },
        { id: 'gnv', nombre: 'Conversión a GNV', grupo: 'Conversión GNV/GLP', seccion: 'conversion', card: 'Conversión a GNV',
          desc: 'Gas Natural Vehicular, con opción de financiamiento FISE.',
          claves: ['gnv', 'gas natural', 'convertir a gas', 'pasar a gas', 'instalar gas', 'ahorrar', 'gasolina cara'] },
        { id: 'inyeccion_directa', nombre: 'Conversión Inyección Directa', grupo: 'Conversión GNV/GLP', seccion: 'conversion', card: 'Inyección Directa',
          desc: 'Para motores modernos de inyección directa.',
          claves: ['inyeccion directa', 'gdi', 'tsi', 'turbo'] },
        { id: 'diesel', nombre: 'Diesel Dual Fuel', grupo: 'Conversión GNV/GLP', seccion: 'conversion', card: 'Diesel Dual Fuel',
          desc: 'Sistema mixto gas + diésel.',
          claves: ['diesel', 'petroleo', 'camion', 'dual fuel'] },

        // ── Certificaciones y Trámites ───────────────────────────────────
        { id: 'cert_anual', nombre: 'Certificación Anual GNV/GLP', grupo: 'Certificaciones y Trámites', seccion: 'conversion', card: 'Certificación Anual',
          desc: 'Revisión anual obligatoria del sistema de gas.',
          claves: ['certificado', 'certificacion', 'revision anual', 'no me dejan cargar', 'certificado vencido'] },
        { id: 'cambio_caract', nombre: 'Trámite Cambio de Características', grupo: 'Certificaciones y Trámites', seccion: 'conversion', card: 'Cambio de Características',
          desc: 'Registro de la conversión en tus documentos.',
          claves: ['tarjeta de propiedad', 'sunarp', 'cambio de caracteristicas', 'tramite', 'papeles', 'documentos'] },
        { id: 'quinquenal', nombre: 'Inspección Quinquenal', grupo: 'Certificaciones y Trámites', seccion: 'conversion', card: 'Quinquenal',
          desc: 'Inspección de cilindros cada 5 años.',
          claves: ['quinquenal', 'cilindro vencido', 'vence el cilindro', 'prueba hidraulica', 'cinco anos', '5 anos'] },
        { id: 'fise', nombre: 'Financiamiento FISE', grupo: 'Certificaciones y Trámites', seccion: 'conversion', card: 'FISE',
          desc: 'Financia tu conversión a GNV.',
          claves: ['fise', 'financiamiento', 'financiar', 'credito', 'cuotas', 'subsidio'] },

        // ── Mantenimiento Sistema de Gas ─────────────────────────────────
        { id: 'chip', nombre: 'Desbloqueo y Reprogramación de Chip', grupo: 'Mantenimiento Sistema de Gas', seccion: 'conversion', card: 'Chip',
          desc: 'Desbloqueo del chip para volver a cargar gas.',
          claves: ['chip', 'chip bloqueado', 'no me dejan cargar', 'no puedo cargar gas', 'reprogramar'] },
        { id: 'escaneo_gas', nombre: 'Escaneo y Calibración de Gas', grupo: 'Mantenimiento Sistema de Gas', seccion: 'conversion', card: 'Escaneo y Calibración',
          desc: 'Calibración del sistema de gas.',
          claves: ['calibrar', 'calibracion', 'falla con gas', 'falla en gas', 'consume mucho gas', 'pierde fuerza en gas', 'conmutador'] },
        { id: 'filtro_gas', nombre: 'Cambio de Filtros de Gas', grupo: 'Mantenimiento Sistema de Gas', seccion: 'conversion', card: 'Filtros de Gas',
          desc: 'Filtros del sistema de gas.',
          claves: ['filtro de gas', 'filtro del gas', 'pierde fuerza en gas', 'sin fuerza en gas'] },
        { id: 'fugas', nombre: 'Revisión de Fugas de Gas', grupo: 'Mantenimiento Sistema de Gas', seccion: 'conversion', card: 'Fugas',
          desc: 'Detección y corrección de fugas.',
          aviso: 'Si percibes olor a gas, cierra la válvula del cilindro, no enciendas el motor y comunícate con nosotros.',
          claves: ['fuga', 'olor a gas', 'huele a gas', 'escape de gas', 'pierde gas'] },
        { id: 'obturador', nombre: 'Limpieza de Obturador', grupo: 'Mantenimiento Sistema de Gas', seccion: 'conversion', card: 'Obturador',
          desc: 'Para un arranque y paso a gas correctos.',
          claves: ['obturador', 'no pasa a gas', 'no cambia a gas', 'no arranca en gas', 'se pasa a gasolina', 'se apaga en gas'] },
        { id: 'conductores', nombre: 'Inspección de Conductores de Gas', grupo: 'Mantenimiento Sistema de Gas', seccion: 'conversion', card: 'Conductores',
          desc: 'Revisión de mangueras y conductos de gas.',
          claves: ['manguera', 'conductor', 'tuberia de gas', 'presion de gas'] },

        // ── Repuestos y Componentes ──────────────────────────────────────
        { id: 'filtro_aire', nombre: 'Cambio de Filtro de Aire', grupo: 'Repuestos y Componentes', seccion: 'repuestos', card: 'Filtro de Aire',
          desc: 'Mejor respuesta del motor y menor consumo.',
          claves: ['filtro de aire', 'sin fuerza', 'pierde fuerza'] },
        { id: 'bujias', nombre: 'Cambio de Bujías', grupo: 'Repuestos y Componentes', seccion: 'repuestos', card: 'Bujías',
          desc: 'Encendido limpio y mejor arranque.',
          claves: ['bujia', 'no arranca', 'cuesta arrancar', 'arranca mal', 'falla un cilindro', 'tiembla', 'chispa'] },
        { id: 'supresores', nombre: 'Cambio de Supresores', grupo: 'Repuestos y Componentes', seccion: 'repuestos', card: 'Supresores',
          desc: 'Protegen el encendido de vehículos a gas.',
          claves: ['supresor', 'retroceso', 'explosion', 'revienta'] },
        { id: 'bobina', nombre: 'Cambio de Caña de Bobina', grupo: 'Repuestos y Componentes', seccion: 'repuestos', card: 'Bobina',
          desc: 'Conduce la alta tensión a las bujías.',
          claves: ['bobina', 'cable de bujia', 'falla un cilindro', 'cojea'] }
    ];

    /* ── Motor de coincidencias ─────────────────────────────────────────── */
    const normalizar = s => String(s || '').toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9*\s]/g, ' ').replace(/\s+/g, ' ').trim();

    // "disco de freno" -> /\b(?:disco(?:s|es)?\s+de(?:s|es)?\s+freno(?:s|es)?)\b/
    const aRegex = clave => new RegExp('\\b(?:' + normalizar(clave).split(' ').map(w =>
        w.endsWith('*') ? w.slice(0, -1) + '[a-z]*' : w + '(?:s|es)?').join('\\s+') + ')\\b');

    SERVICIOS.forEach(s => {
        s._claves = s.claves.map(c => ({ texto: normalizar(c), re: aRegex(c), peso: c.trim().split(/\s+/).length }));
    });

    function analizar(texto) {
        const t = normalizar(texto).replace(/\*/g, '');
        return SERVICIOS
            .map(s => {
                const ok = s._claves.filter(c => c.re.test(t));
                // Una frase larga no suma además sus palabras sueltas ("cambio de aceite" no suma "aceite")
                const utiles = ok.filter(c => !ok.some(o => o.peso > c.peso && o.texto.includes(c.texto.replace('*', ''))));
                return { ...s, puntaje: utiles.reduce((a, c) => a + c.peso, 0) };
            })
            .filter(s => s.puntaje > 0)
            .sort((a, b) => b.puntaje - a.puntaje)
            .slice(0, 3);
    }

    if (typeof module !== 'undefined' && module.exports) { module.exports = { analizar, SERVICIOS }; return; }

    /* ── Interfaz (panel del globo flotante) ────────────────────────────── */
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const $ = id => document.getElementById(id);
    const esCelular = () => window.matchMedia('(max-width: 640px)').matches;

    function render(resultados) {
        const box = $('iaResultados');
        const lista = $('iaLista');
        const aviso = $('iaAviso');
        const vacio = $('iaVacio');

        if (!resultados.length) {
            box.hidden = true;
            vacio.hidden = false;
            bajarAlFinal();
            return;
        }
        vacio.hidden = true;

        const conAviso = resultados.find(r => r.aviso);
        aviso.hidden = !conAviso;
        aviso.textContent = conAviso ? conAviso.aviso : '';

        lista.innerHTML = resultados.map((r, i) => `
            <li class="ia-item">
                <button type="button" class="ia-item-link" data-id="${r.id}">
                    <span class="ia-num">${String(i + 1).padStart(2, '0')}</span>
                    <span>
                        <span class="ia-item-nombre">${esc(r.nombre)}</span>
                        <span class="ia-item-grupo">${esc(r.grupo)} · ${esc(r.desc)}</span>
                        <span class="ia-item-ver">Ver en la página</span>
                    </span>
                </button>
            </li>`).join('');

        lista.querySelectorAll('[data-id]').forEach(b => b.addEventListener('click', () => irAServicio(b.dataset.id)));
        box.hidden = false;
        bajarAlFinal();
    }

    function bajarAlFinal() {
        const body = $('oaBody');
        if (body) requestAnimationFrame(() => body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' }));
    }

    function irAServicio(id) {
        const s = SERVICIOS.find(x => x.id === id);
        if (!s) return;
        const items = Array.from(document.querySelectorAll(`#${s.seccion} .svc-item`));
        const item = items.find(li => normalizar(li.querySelector('.svc-name').textContent).includes(normalizar(s.card)));
        const destino = item || document.getElementById(s.seccion);
        if (esCelular()) window.toggleOrientacion(false);
        if (!destino) return;
        window.scrollTo({ top: destino.getBoundingClientRect().top + window.scrollY - window.innerHeight / 3, behavior: 'smooth' });
        if (item) {
            item.classList.remove('svc-item--hl');
            void item.offsetWidth;
            item.classList.add('svc-item--hl');
        }
    }

    window.toggleOrientacion = function (forzar) {
        const panel = $('oaPanel');
        const bubble = $('oaBubble');
        const abrir = typeof forzar === 'boolean' ? forzar : panel.hidden;
        panel.hidden = !abrir;
        bubble.setAttribute('aria-expanded', abrir ? 'true' : 'false');
        if (esCelular()) document.body.style.overflow = abrir ? 'hidden' : '';
        if (abrir) setTimeout(() => $('iaInput').focus(), 60);
        else bubble.focus();
    };

    window.analizarProblema = function () {
        const input = $('iaInput');
        const texto = input.value.trim();
        if (texto.length < 3) {
            input.classList.add('ia-error');
            input.focus();
            setTimeout(() => input.classList.remove('ia-error'), 1500);
            return;
        }
        const pregunta = $('oaPregunta');
        pregunta.textContent = texto;
        pregunta.hidden = false;
        render(analizar(texto));
        input.value = '';
        $('iaCharCount').textContent = '0';
    };

    window.reiniciarAsistente = function () {
        const input = $('iaInput');
        input.value = '';
        $('iaCharCount').textContent = '0';
        $('oaPregunta').hidden = true;
        $('iaResultados').hidden = true;
        $('iaVacio').hidden = true;
        input.focus();
    };

    document.addEventListener('DOMContentLoaded', () => {
        const input = $('iaInput');
        if (!input) return;
        input.addEventListener('input', () => {
            $('iaCharCount').textContent = input.value.length;
        });
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); window.analizarProblema(); }
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && !$('oaPanel').hidden) window.toggleOrientacion(false);
        });
    });
})();
