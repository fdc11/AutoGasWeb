/**
 * contacto.js — AutoGas Perú
 * Lógica completa del formulario multi-step de cotización:
 *  - Navegación entre steps con validación por campo
 *  - Barra de progreso animada
 *  - Selección de sede mediante cards
 *  - Carga de disponibilidad horaria desde get_disponibilidad.php
 *  - Resumen de confirmación en Step 4
 *  - Envío a guardar_cita.php vía fetch (JSON)
 *  - Animación de éxito SVG
 */

/* =========================================
   ESTADO GLOBAL DEL FORMULARIO
========================================= */
const state = {
    currentStep: 1,
    totalSteps: 4,
    data: {
        nombres:     '',
        apellidos:   '',
        celular:     '',
        correo:      '',
        marca:       '',
        modelo:      '',
        placa:       '',
        kilometraje: '',
        combustible: '',
        servicio:    '',
        sedeId:      null,
        sedeNombre:  '',
        fecha:       '',
        hora:        ''
    }
};

/* =========================================
   NAVBAR — scroll + hamburguesa
========================================= */
function toggleMenu() {
    const nav = document.getElementById('mobileNav');
    nav.classList.toggle('open');
}

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

/* =========================================
   SCROLL REVEAL
========================================= */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
});

/* =========================================
   VALIDACIONES POR CAMPO
========================================= */
const validators = {
    nombres:     v => v.trim().length >= 2,
    apellidos:   v => v.trim().length >= 2,
    celular:     v => /^9\d{8}$/.test(v.trim()),
    correo:      v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    marca:       v => v.trim().length >= 2,
    modelo:      v => v.trim().length >= 2,
    placa:       v => /^[A-Z0-9]{3}-[A-Z0-9]{3}$/i.test(v.trim()),
    kilometraje: v => parseInt(v) > 0 && parseInt(v) <= 999999,
    combustible: v => v !== '',
    servicio:    v => v !== '',
};

const errorMessages = {
    nombres:     'Ingresa tu nombre (mín. 2 caracteres)',
    apellidos:   'Ingresa tus apellidos (mín. 2 caracteres)',
    celular:     'Número de 9 dígitos, debe empezar con 9',
    correo:      'Ingresa un correo electrónico válido',
    marca:       'Ingresa la marca del vehículo',
    modelo:      'Ingresa el modelo del vehículo',
    placa:       'Formato: ABC-123 o ABC-34F',
    kilometraje: 'Ingresa un kilometraje válido',
    combustible: 'Selecciona el combustible actual',
    servicio:    'Selecciona el servicio que deseas',
};

/**
 * Valida un campo individual y actualiza su UI
 */
function validateField(fieldId) {
    const input = document.getElementById(fieldId);
    if (!input) return true;

    const val = input.value;
    const isValid = validators[fieldId] ? validators[fieldId](val) : true;
    const errEl = document.getElementById(`err-${fieldId}`);
    const statusEl = input.parentElement.querySelector('.field-status');

    if (val === '' || val === null) {
        input.classList.remove('valid', 'error');
        if (statusEl) { statusEl.className = 'field-status'; }
        if (errEl) errEl.textContent = '';
        return false;
    }

    if (isValid) {
        input.classList.add('valid');
        input.classList.remove('error');
        if (statusEl) { statusEl.className = 'field-status show ok'; }
        if (errEl) errEl.textContent = '';
    } else {
        input.classList.add('error');
        input.classList.remove('valid');
        if (statusEl) { statusEl.className = 'field-status show err'; }
        if (errEl) errEl.textContent = errorMessages[fieldId] || 'Campo inválido';
    }

    return isValid;
}

/**
 * Valida todos los campos de un step y retorna true si todo OK
 */
function validateStep(step) {
    let valid = true;

    if (step === 1) {
        const fields = ['nombres', 'apellidos', 'celular', 'correo'];
        fields.forEach(f => {
            const input = document.getElementById(f);
            if (input && input.value.trim() === '') {
                input.classList.add('error');
                const errEl = document.getElementById(`err-${f}`);
                if (errEl) errEl.textContent = 'Este campo es obligatorio';
                const statusEl = input.parentElement.querySelector('.field-status');
                if (statusEl) statusEl.className = 'field-status show err';
                valid = false;
            } else {
                if (!validateField(f)) valid = false;
            }
        });
    }

    if (step === 2) {
        const fields = ['marca', 'modelo', 'placa', 'kilometraje', 'combustible', 'servicio'];
        fields.forEach(f => {
            const input = document.getElementById(f);
            if (input && (input.value === '' || input.value.trim() === '')) {
                input.classList.add('error');
                const errEl = document.getElementById(`err-${f}`);
                if (errEl) errEl.textContent = 'Este campo es obligatorio';
                const statusEl = input.parentElement.querySelector('.field-status');
                if (statusEl) statusEl.className = 'field-status show err';
                valid = false;
            } else {
                if (!validateField(f)) valid = false;
            }
        });
    }

    if (step === 3) {
        if (!state.data.sedeId) {
            document.getElementById('err-sede').textContent = 'Selecciona una sede';
            valid = false;
        }
        if (!state.data.fecha) {
            const errFecha = document.getElementById('err-fecha');
            if (errFecha) errFecha.textContent = 'Selecciona una fecha';
            valid = false;
        }
        if (!state.data.hora) {
            const errHora = document.getElementById('err-hora');
            if (errHora) errHora.textContent = 'Selecciona un horario';
            valid = false;
        }
    }

    return valid;
}

/* =========================================
   NAVEGACIÓN ENTRE STEPS
========================================= */
function nextStep() {
    if (!validateStep(state.currentStep)) return;

    saveStepData(state.currentStep);

    if (state.currentStep < state.totalSteps) {
        goToStep(state.currentStep + 1);
    }
}

function prevStep() {
    if (state.currentStep > 1) {
        goToStep(state.currentStep - 1);
    }
}

function goToStep(targetStep) {
    const currentEl = document.getElementById(`step${state.currentStep}`);
    const targetEl  = document.getElementById(`step${targetStep}`);
    const goingBack = targetStep < state.currentStep;

    currentEl.style.animation = goingBack
        ? 'stepOut 0.3s ease forwards'
        : 'stepOut 0.3s ease forwards';
    currentEl.style.animationDirection = goingBack ? 'reverse' : 'normal';

    setTimeout(() => {
        currentEl.classList.remove('active');
        currentEl.style.animation = '';
        targetEl.classList.add('active');
        state.currentStep = targetStep;
        updateProgress();

        if (targetStep === 4) buildConfirmationGrid();

        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 280);
}

/**
 * Guarda los valores del step actual en state.data
 */
function saveStepData(step) {
    if (step === 1) {
        state.data.nombres   = document.getElementById('nombres').value.trim();
        state.data.apellidos = document.getElementById('apellidos').value.trim();
        state.data.celular   = document.getElementById('celular').value.trim();
        state.data.correo    = document.getElementById('correo').value.trim();
    }
    if (step === 2) {
        state.data.marca       = document.getElementById('marca').value;
        state.data.modelo      = document.getElementById('modelo').value.trim();
        state.data.placa       = document.getElementById('placa').value.trim().toUpperCase();
        state.data.kilometraje = document.getElementById('kilometraje').value;
        state.data.combustible = document.getElementById('combustible').value;
        state.data.servicio    = document.getElementById('servicio').value;
    }
}

/* =========================================
   ACTUALIZAR BARRA DE PROGRESO
========================================= */
function updateProgress() {
    const pct = (state.currentStep / state.totalSteps) * 100;
    document.getElementById('progressFill').style.width = `${pct}%`;

    document.querySelectorAll('.pstep').forEach(el => {
        const n = parseInt(el.dataset.step);
        el.classList.remove('active', 'done');
        if (n === state.currentStep) el.classList.add('active');
        if (n < state.currentStep)   el.classList.add('done');
    });

    document.querySelectorAll('.pstep-line').forEach((line, idx) => {
        if (idx + 2 <= state.currentStep) {
            line.classList.add('done');
        } else {
            line.classList.remove('done');
        }
    });

    const btnAnterior  = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const btnEnviar    = document.getElementById('btnEnviar');

    btnAnterior.style.display  = state.currentStep > 1 ? 'inline-flex' : 'none';
    btnSiguiente.style.display = state.currentStep < state.totalSteps ? 'inline-flex' : 'none';
    btnEnviar.style.display    = state.currentStep === state.totalSteps ? 'inline-flex' : 'none';
}

/* =========================================
   CARDS DE SEDE
========================================= */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sede-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.sede-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            state.data.sedeId     = card.dataset.sedeId;
            state.data.sedeNombre = card.dataset.sedeNombre;

            document.getElementById('err-sede').textContent = '';

            const picker = document.getElementById('datetimePicker');
            picker.style.display = 'block';

            document.getElementById('fecha').value = '';
            state.data.fecha = '';
            state.data.hora  = '';
            document.getElementById('horasWrap').style.display = 'none';
        });
    });

    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        const hoy = new Date();
        hoy.setDate(hoy.getDate() + 1);
        fechaInput.min = hoy.toISOString().split('T')[0];

        fechaInput.addEventListener('change', () => {
            const fecha = fechaInput.value;
            if (!fecha) return;
            state.data.fecha = fecha;
            state.data.hora  = '';
            document.getElementById('err-fecha').textContent = '';
            // ✅ FIX 1: ahora se pasa también el sede_id para filtrar por sede correctamente
            cargarDisponibilidad(fecha, state.data.sedeId);
        });
    }

    ['nombres', 'apellidos', 'celular', 'correo'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => validateField(id));
            el.addEventListener('blur',  () => validateField(id));
        }
    });

    ['marca', 'modelo', 'placa', 'kilometraje', 'combustible', 'servicio'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input',  () => validateField(id));
            el.addEventListener('blur',   () => validateField(id));
            if (el.tagName === 'SELECT') el.addEventListener('change', () => validateField(id));
        }
    });

    const placaInput = document.getElementById('placa');
    if (placaInput) {
        placaInput.addEventListener('input', (e) => {
            const cursorPos = placaInput.selectionStart;
            let val = placaInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            if (val.length > 3) {
                val = val.slice(0, 3) + '-' + val.slice(3, 6);
            }
            placaInput.value = val;
            // Ajustar cursor tras inserción del guión
            if (val.length === 4 && cursorPos === 3) {
                placaInput.setSelectionRange(4, 4);
            }
        });
        placaInput.addEventListener('keydown', (e) => {
            // Si el usuario borra y está justo después del guión, borra el guión también
            if (e.key === 'Backspace') {
                const pos = placaInput.selectionStart;
                if (pos === 4 && placaInput.value[3] === '-') {
                    e.preventDefault();
                    placaInput.value = placaInput.value.slice(0, 3);
                    placaInput.setSelectionRange(3, 3);
                }
            }
        });
    }

    updateProgress();
});

/* =========================================
   CARGAR DISPONIBILIDAD HORARIA
========================================= */
const HORAS_TALLER = [
    '08:00','09:00','10:00','11:00','12:00',
    '13:00','14:00','15:00','16:00','17:00'
];

// ✅ FIX 1: función ahora recibe sede_id y lo envía al PHP
async function cargarDisponibilidad(fecha, sedeId) {
    const horasWrap = document.getElementById('horasWrap');
    const horasGrid = document.getElementById('horasGrid');
    horasGrid.innerHTML = '<span style="color:rgba(255,255,255,0.3);font-size:0.82rem;">Cargando horarios...</span>';
    horasWrap.style.display = 'block';

    let ocupadas = [];
    try {
        // Ahora le pasa tanto fecha como sede_id al backend
        const res  = await fetch(`get_disponibilidad.php?fecha=${fecha}&sede_id=${sedeId}`);
        const data = await res.json();
        ocupadas = data.ocupadas || [];
    } catch (e) {
        ocupadas = [];
    }

    horasGrid.innerHTML = '';
    HORAS_TALLER.forEach(hora => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'hora-btn' + (ocupadas.includes(hora) ? ' ocupada' : '');
        btn.textContent = hora;
        btn.dataset.hora = hora;

        if (!ocupadas.includes(hora)) {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.hora-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                state.data.hora = hora;
                document.getElementById('err-hora').textContent = '';
            });
        }
        horasGrid.appendChild(btn);
    });
}

/* =========================================
   GRID DE CONFIRMACIÓN (STEP 4)
========================================= */
function buildConfirmationGrid() {
    const d = state.data;
    const grid = document.getElementById('confirmGrid');

    grid.innerHTML = `
        <div class="confirm-block">
            <div class="confirm-block-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Datos personales
            </div>
            <div class="confirm-row">
                <span class="confirm-key">Nombre</span>
                <span class="confirm-val">${d.nombres} ${d.apellidos}</span>
            </div>
            <div class="confirm-row">
                <span class="confirm-key">Celular</span>
                <span class="confirm-val">${d.celular}</span>
            </div>
            ${d.correo ? `
            <div class="confirm-row">
                <span class="confirm-key">Correo</span>
                <span class="confirm-val">${d.correo}</span>
            </div>` : ''}
        </div>

        <div class="confirm-block">
            <div class="confirm-block-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                Vehículo
            </div>
            <div class="confirm-row">
                <span class="confirm-key">Marca / Modelo</span>
                <span class="confirm-val">${d.marca} ${d.modelo}</span>
            </div>
            <div class="confirm-row">
                <span class="confirm-key">Placa</span>
                <span class="confirm-val">${d.placa}</span>
            </div>
            <div class="confirm-row">
                <span class="confirm-key">Kilometraje</span>
                <span class="confirm-val">${parseInt(d.kilometraje).toLocaleString()} km</span>
            </div>
            <div class="confirm-row">
                <span class="confirm-key">Combustible</span>
                <span class="confirm-val">${d.combustible}</span>
            </div>
        </div>

        <div class="confirm-block">
            <div class="confirm-block-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
                Servicio solicitado
            </div>
            <div class="confirm-row">
                <span class="confirm-key">Servicio</span>
                <span class="confirm-val" style="color:var(--red)">${d.servicio}</span>
            </div>
        </div>

        <div class="confirm-block">
            <div class="confirm-block-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Sede y fecha
            </div>
            <div class="confirm-row">
                <span class="confirm-key">Sede</span>
                <span class="confirm-val">${d.sedeNombre}</span>
            </div>
            <div class="confirm-row">
                <span class="confirm-key">Fecha</span>
                <span class="confirm-val">${formatFecha(d.fecha)}</span>
            </div>
            <div class="confirm-row">
                <span class="confirm-key">Hora</span>
                <span class="confirm-val">${d.hora} hrs</span>
            </div>
        </div>
    `;
}

function formatFecha(fechaStr) {
    if (!fechaStr) return '';
    const [y, m, d] = fechaStr.split('-');
    const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
    return `${d} ${meses[parseInt(m)-1]} ${y}`;
}

/* =========================================
   ENVÍO DEL FORMULARIO
   → Sin BD. Abre WhatsApp directo.
========================================= */
function enviarFormulario() {
    const btnEnviar  = document.getElementById('btnEnviar');
    const btnText    = btnEnviar.querySelector('.btn-text');
    const btnSpinner = btnEnviar.querySelector('.btn-spinner');

    btnText.style.display    = 'none';
    btnSpinner.style.display = 'inline-flex';
    btnEnviar.disabled = true;

    // Pequeña pausa visual para que no sea instantáneo
    setTimeout(() => {
        mostrarExito();
    }, 700);
}

/* =========================================
   NÚMEROS DE WHATSAPP POR SEDE
========================================= */
const WSP_SEDES = {
    '1': '51978421654',  // Ica
    '2': '51939067488',  // Lima
    '3': '51942867212',  // Arequipa
    '4': '51942623696',  // Huancayo
    '5': '51937695830',  // Trujillo
    '6': '51930210613',  // Nasca
    '7': '51975338252',  // Chincha
};

/* =========================================
   GENERAR MENSAJE DE WHATSAPP
========================================= */
function generarMensajeWSP(d) {
    const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    const partes = d.fecha.split('-');
    const fechaLegible = partes[2] + ' de ' + meses[parseInt(partes[1])-1] + ' de ' + partes[0];

    const lineas = [
        'Hola AutoGas ' + d.sedeNombre + ', le escribo para confirmar mi cita.',
        '',
        'DATOS PERSONALES',
        'Nombre: ' + d.nombres + ' ' + d.apellidos,
        'Celular: ' + d.celular,
        d.correo ? 'Correo: ' + d.correo : null,
        '',
        'VEHICULO',
        'Marca y modelo: ' + d.marca + ' ' + d.modelo,
        'Placa: ' + d.placa,
        'Kilometraje: ' + parseInt(d.kilometraje).toLocaleString('es-PE') + ' km',
        'Combustible actual: ' + d.combustible,
        '',
        'SERVICIO SOLICITADO',
        d.servicio,
        '',
        'CITA',
        'Sede: ' + d.sedeNombre,
        'Fecha: ' + fechaLegible,
        'Hora: ' + d.hora + ' hrs',
        '',
        'Quedo a la espera de su confirmacion. Gracias.'
    ].filter(l => l !== null);

    return encodeURIComponent(lineas.join('\n'));
}

/* =========================================
   ABRIR WHATSAPP DE LA SEDE
========================================= */
function abrirWhatsApp(d) {
    const numero = WSP_SEDES[String(d.sedeId)];
    if (!numero) return;
    const mensaje = generarMensajeWSP(d);
    const url = 'https://wa.me/' + numero + '?text=' + mensaje;
    window.open(url, '_blank');
}

/* =========================================
   ANIMACIÓN DE ÉXITO
========================================= */
function mostrarExito() {
    const overlay = document.getElementById('successOverlay');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Abrir WhatsApp de la sede seleccionada con los datos del cliente
    setTimeout(() => abrirWhatsApp(state.data), 600);
}