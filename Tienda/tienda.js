// =============================================
// NÚMEROS DE WHATSAPP POR SEDE
// (mismo sistema que contacto.js)
// =============================================
const WSP_SEDES = {
    '1': '51978421654',   // Ica
    '2': '51939067488',   // Lima
    '3': '51XXXXXXXXX',   // Trujillo  ← pon el número real
    '4': '51XXXXXXXXX',   // Chincha   ← pon el número real
    '5': '51XXXXXXXXX',   // Huancayo  ← pon el número real
    '6': '51XXXXXXXXX',   // Nasca     ← pon el número real
    '7': '51XXXXXXXXX',   // Arequipa  ← pon el número real
};

const NOMBRES_SEDES = {
    '1': 'Ica', '2': 'Lima', '3': 'Trujillo',
    '4': 'Chincha', '5': 'Huancayo', '6': 'Nasca', '7': 'Arequipa'
};

// =============================================
// CATÁLOGO DE PRODUCTOS
// (agrega todos los que quieras después)
// =============================================
const CATALOGO = {
    aceites: {
        label: 'Aceites y Lubricantes',
        productos: [
            {
                id: 'ac01', marca: 'Shell', nombre: 'Helix Ultra 5W-40',
                desc: 'Aceite sintético de última generación. Protección máxima del motor.',
                precio: 89.90, badge: 'Más vendido',
                // IMAGEN: foto en fondo blanco, estilo Tiffany, botella Shell Helix
                img: 'Imagenes/prod-shell-helix-5w40.png'
            },
            {
                id: 'ac02', marca: 'Castrol', nombre: 'Edge 5W-30',
                desc: 'Tecnología de titanio FST. Para motores modernos exigentes.',
                precio: 94.90, badge: null,
                img: 'Imagenes/prod-castrol-edge-5w30.png'
            },
            {
                id: 'ac03', marca: 'Mobil', nombre: 'Super 3000 X1 5W-40',
                desc: 'Fórmula avanzada para motores gasolina y GNV. Alto desempeño.',
                precio: 79.90, badge: null,
                img: 'Imagenes/prod-mobil-super3000.png'
            },
            {
                id: 'ac04', marca: 'Valvoline', nombre: 'Advanced Full Synthetic 5W-30',
                desc: 'Protección superior contra desgaste, depósitos y sludge.',
                precio: 84.90, badge: 'Nuevo',
                img: 'Imagenes/prod-valvoline-adv5w30.png'
            },
            {
                id: 'ac05', marca: 'Chevron', nombre: 'Havoline 20W-50',
                desc: 'Para motores con alto kilometraje. Rendimiento garantizado.',
                precio: 52.90, badge: null,
                img: 'Imagenes/prod-chevron-havoline.png'
            },
            {
                id: 'ac06', marca: 'Shell', nombre: 'Rimula R4 X 15W-40',
                desc: 'Aceite mineral para motores diésel de trabajo pesado.',
                precio: 64.90, badge: null,
                img: 'Imagenes/prod-shell-rimula.png'
            },
        ]
    },
    repuestos: {
        label: 'Repuestos',
        productos: [
            {
                id: 're01', marca: 'Bosch', nombre: 'Bujía Super 4',
                desc: 'Bujía de encendido de alto rendimiento para todo tipo de motor.',
                precio: 18.90, badge: 'Original',
                img: 'Imagenes/prod-bosch-bujia.png'
            },
            {
                id: 're02', marca: 'NGK', nombre: 'Bujía Iridium IX',
                desc: 'Punta de iridio ultrafina. Mayor durabilidad y ahorro de combustible.',
                precio: 29.90, badge: null,
                img: 'Imagenes/prod-ngk-iridium.png'
            },
            {
                id: 're03', marca: 'Bosch', nombre: 'Pastillas de Freno BP456',
                desc: 'Sistema de frenado preciso y silencioso para uso urbano y carretera.',
                precio: 95.00, badge: null,
                img: 'Imagenes/prod-bosch-pastillas.png'
            },
            {
                id: 're04', marca: 'Gates', nombre: 'Correa de Distribución K025605XS',
                desc: 'Alta resistencia a temperaturas extremas. Para motores Toyota/Kia.',
                precio: 145.00, badge: null,
                img: 'Imagenes/prod-gates-correa.png'
            },
        ]
    },
    refrigerantes: {
        label: 'Refrigerantes',
        productos: [
            {
                id: 'rf01', marca: 'Prestone', nombre: 'All Vehicles Antifreeze 1L',
                desc: 'Fórmula universal. Compatible con todos los sistemas de refrigeración.',
                precio: 32.90, badge: 'Universal',
                img: 'Imagenes/prod-prestone-1l.png'
            },
            {
                id: 'rf02', marca: 'Prestone', nombre: 'All Vehicles Antifreeze 4L',
                desc: 'Pack familiar de larga duración. Protege hasta -37°C.',
                precio: 95.00, badge: null,
                img: 'Imagenes/prod-prestone-4l.png'
            },
            {
                id: 'rf03', marca: 'Shell', nombre: 'Coolant Premium 1L',
                desc: 'Refrigerante premium OAT. Larga vida útil, sin silicatos.',
                precio: 38.90, badge: null,
                img: 'Imagenes/prod-shell-coolant.png'
            },
            {
                id: 'rf04', marca: 'Toyota', nombre: 'Long Life Coolant 1L',
                desc: 'Refrigerante original Toyota. Para Toyota, Kia, Mazda y Subaru.',
                precio: 45.00, badge: 'Original',
                img: 'Imagenes/prod-toyota-coolant.png'
            },
        ]
    },
    filtros: {
        label: 'Filtros y Componentes',
        productos: [
            {
                id: 'fi01', marca: 'Mann', nombre: 'Filtro de Aceite W712/75',
                desc: 'Filtración de alta eficiencia para motores gasolina y GNV.',
                precio: 22.90, badge: null,
                img: 'Imagenes/prod-mann-aceite.png'
            },
            {
                id: 'fi02', marca: 'Bosch', nombre: 'Filtro de Aire S0073',
                desc: 'Captura el 99.9% de partículas. Más potencia, menos consumo.',
                precio: 38.90, badge: 'Best Seller',
                img: 'Imagenes/prod-bosch-aire.png'
            },
            {
                id: 'fi03', marca: 'Mann', nombre: 'Filtro de Combustible WK842/2',
                desc: 'Protege el sistema de inyección. Compatible con múltiples marcas.',
                precio: 29.90, badge: null,
                img: 'Imagenes/prod-mann-combustible.png'
            },
            {
                id: 'fi04', marca: 'Bosch', nombre: 'Filtro de Habitáculo 1987432362',
                desc: 'Con carbón activado. Elimina polvo, bacterias y olores del habitáculo.',
                precio: 45.00, badge: null,
                img: 'Imagenes/prod-bosch-habitaculo.png'
            },
        ]
    }
};

// =============================================
// ESTADO DE LA TIENDA
// =============================================
let estadoTienda = {
    categoriaActual: null,
    productoActual: null,
    cantidad: 1,
    sedeId: null,
    productosOrdenados: []
};

// =============================================
// NAVBAR — scroll
// =============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// =============================================
// HERO — fade-in
// =============================================
window.addEventListener('load', () => {
    ['.hero-badge--anim', '.hero-title--anim', '.hero-sub--anim', '.hero-actions--anim']
        .forEach((sel, i) => {
            const el = document.querySelector(sel);
            if (el) setTimeout(() => el.classList.add('visible'), 200 + i * 160);
        });
    iniciarReveal();
});

// =============================================
// MENÚ MÓVIL
// =============================================
function toggleMenu() {
    const h = document.getElementById('hamburger');
    const m = document.getElementById('mobileNav');
    h.classList.toggle('open');
    m.classList.toggle('open');
    document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
}

// =============================================
// SCROLL REVEAL
// =============================================
function iniciarReveal() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// =============================================
// NAVEGACIÓN: VER CATEGORÍA
// =============================================
function verCategoria(catId) {
    const cat = CATALOGO[catId];
    if (!cat) return;

    estadoTienda.categoriaActual = catId;
    estadoTienda.productosOrdenados = [...cat.productos];

    // Ocultar vista categorías
    document.getElementById('viewCats').style.display = 'none';
    document.getElementById('headerCats').style.display = 'none';
    document.getElementById('headerProds').style.display = 'block';

    // Actualizar headers
    document.getElementById('prodLabel').textContent = 'Tienda / ' + cat.label;
    document.getElementById('prodTitle').textContent = cat.label.toUpperCase();

    // Breadcrumb
    const bc = document.getElementById('breadcrumb');
    bc.classList.add('visible');
    document.getElementById('bcNombre').textContent = cat.label;

    // Mostrar productos
    document.getElementById('viewProds').style.display = 'block';
    renderizarProductos(estadoTienda.productosOrdenados);

    // Scroll al store
    document.getElementById('store').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// =============================================
// VOLVER A CATEGORÍAS
// =============================================
function volverCategorias() {
    estadoTienda.categoriaActual = null;

    document.getElementById('viewProds').style.display = 'none';
    document.getElementById('headerProds').style.display = 'none';
    document.getElementById('breadcrumb').classList.remove('visible');
    document.getElementById('viewCats').style.display = 'grid';
    document.getElementById('headerCats').style.display = 'block';

    document.getElementById('store').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// =============================================
// RENDERIZAR PRODUCTOS
// =============================================
function renderizarProductos(productos) {
    const grid = document.getElementById('prodsGrid');
    const count = document.getElementById('prodsCount');
    count.textContent = productos.length + ' producto' + (productos.length !== 1 ? 's' : '');

    grid.innerHTML = productos.map(p => `
        <div class="prod-card">
            <div class="prod-img">
                <img src="${p.img}" alt="${p.nombre}" loading="lazy"
                     onerror="this.style.padding='2rem';this.src='../Inicio/Imagenes/AutoGasLogo2.png'" />
                ${p.badge ? `<span class="prod-badge">${p.badge}</span>` : ''}
            </div>
            <div class="prod-info">
                <div class="prod-marca">${p.marca}</div>
                <div class="prod-nombre">${p.nombre}</div>
                <div class="prod-desc">${p.desc}</div>
                <div class="prod-footer">
                    <div class="prod-precio"><span>S/</span>${p.precio.toFixed(2)}</div>
                    <button class="prod-btn" onclick="abrirModal('${p.id}')">Pedir</button>
                </div>
            </div>
        </div>
    `).join('');
}

// =============================================
// ORDENAR PRODUCTOS
// =============================================
function ordenarProductos() {
    const orden = document.getElementById('ordenSelect').value;
    const cat = CATALOGO[estadoTienda.categoriaActual];
    if (!cat) return;

    let prods = [...cat.productos];
    if (orden === 'asc') prods.sort((a, b) => a.precio - b.precio);
    else if (orden === 'desc') prods.sort((a, b) => b.precio - a.precio);

    estadoTienda.productosOrdenados = prods;
    renderizarProductos(prods);
}

// =============================================
// MODAL WHATSAPP
// =============================================
function buscarProducto(id) {
    for (const cat of Object.values(CATALOGO)) {
        const p = cat.productos.find(x => x.id === id);
        if (p) return p;
    }
    return null;
}

function abrirModal(prodId) {
    const p = buscarProducto(prodId);
    if (!p) return;

    estadoTienda.productoActual = p;
    estadoTienda.cantidad = 1;
    estadoTienda.sedeId = null;

    // Llenar preview
    document.getElementById('modalPreview').innerHTML = `
        <img src="${p.img}" alt="${p.nombre}"
             onerror="this.src='../Inicio/Imagenes/AutoGasLogo2.png'" />
        <div>
            <div class="modal-preview-marca">${p.marca}</div>
            <div class="modal-preview-nombre">${p.nombre}</div>
            <div class="modal-preview-precio"><span>S/</span>${p.precio.toFixed(2)}</div>
        </div>
    `;

    document.getElementById('qtyDisplay').textContent = 1;
    document.getElementById('modalTotal').textContent = '';
    document.getElementById('btnWsp').disabled = true;

    // Limpiar selección de sedes
    document.querySelectorAll('.sede-opt').forEach(s => s.classList.remove('selected'));

    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function cerrarModal(e) {
    if (e.target === document.getElementById('modalOverlay')) cerrarModalBtn();
}
function cerrarModalBtn() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

// =============================================
// CANTIDAD
// =============================================
function cambiarCantidad(delta) {
    const nueva = Math.max(1, estadoTienda.cantidad + delta);
    estadoTienda.cantidad = nueva;
    document.getElementById('qtyDisplay').textContent = nueva;
    actualizarTotal();
}

// =============================================
// SEDE
// =============================================
function elegirSede(el) {
    document.querySelectorAll('.sede-opt').forEach(s => s.classList.remove('selected'));
    el.classList.add('selected');
    estadoTienda.sedeId = el.dataset.id;
    actualizarTotal();
}

// =============================================
// TOTAL + HABILITAR BOTÓN
// =============================================
function actualizarTotal() {
    const p = estadoTienda.productoActual;
    if (!p) return;
    const total = (p.precio * estadoTienda.cantidad).toFixed(2);
    const totalEl = document.getElementById('modalTotal');
    const btnWsp = document.getElementById('btnWsp');

    if (estadoTienda.sedeId) {
        const sede = NOMBRES_SEDES[estadoTienda.sedeId];
        totalEl.textContent = `${estadoTienda.cantidad} × S/ ${p.precio.toFixed(2)} = S/ ${total} — Sede ${sede}`;
        btnWsp.disabled = false;
    } else {
        totalEl.textContent = estadoTienda.cantidad > 1
            ? `${estadoTienda.cantidad} × S/ ${p.precio.toFixed(2)} = S/ ${total} — Elige tu sede`
            : '';
        btnWsp.disabled = true;
    }
}

// =============================================
// ENVIAR POR WHATSAPP
// (igual que contacto.js — mismo sistema)
// =============================================
function enviarWsp() {
    const p = estadoTienda.productoActual;
    const sedeId = estadoTienda.sedeId;
    if (!p || !sedeId) return;

    const numero = WSP_SEDES[sedeId];
    const sede = NOMBRES_SEDES[sedeId];
    const total = (p.precio * estadoTienda.cantidad).toFixed(2);

    const mensaje =
        `Hola AutoGas ${sede} 👋\n\n` +
        `Quiero hacer un pedido desde la tienda online:\n\n` +
        `🛒 *Producto:* ${p.marca} ${p.nombre}\n` +
        `🔢 *Cantidad:* ${estadoTienda.cantidad}\n` +
        `💰 *Precio unitario:* S/ ${p.precio.toFixed(2)}\n` +
        `💳 *Total:* S/ ${total}\n\n` +
        `¿Tienen disponibilidad? ¿Puedo coordinar el recojo o la entrega?`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    cerrarModalBtn();
}

// =============================================
// TICKER — swipe móvil
// (mismo código que inicio.js)
// =============================================
(function () {
    const track = document.getElementById('tickerTrack');
    if (!track) return;
    let touchStartX = 0, currentOffset = 0, resumeTimer = null, isSwiping = false;

    function getCurrentCSSOffset() {
        const m = new DOMMatrix(window.getComputedStyle(track).transform);
        return m.m41;
    }
    function pauseAnimation() {
        const o = getCurrentCSSOffset();
        track.style.animation = 'none';
        track.style.transform = `translateX(${o}px)`;
        currentOffset = o;
    }
    function resumeAnimation() {
        const half = track.scrollWidth / 2;
        let n = currentOffset % -half;
        if (n > 0) n -= half;
        const progress = Math.abs(n) / half;
        const remaining = 30 * (1 - progress);
        track.style.transform = `translateX(${n}px)`;
        track.style.animation = `tickerMove ${remaining}s linear 1 forwards`;
        track.addEventListener('animationend', function onEnd() {
            track.removeEventListener('animationend', onEnd);
            track.style.animation = 'tickerMove 30s linear infinite';
        }, { once: true });
    }

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX; isSwiping = false;
        clearTimeout(resumeTimer); pauseAnimation();
    }, { passive: true });
    track.addEventListener('touchmove', (e) => {
        const dx = e.touches[0].clientX - touchStartX;
        if (Math.abs(dx) > 5) isSwiping = true;
        currentOffset += dx * 1.5;
        track.style.transform = `translateX(${currentOffset}px)`;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', () => {
        if (!isSwiping) { resumeAnimation(); return; }
        resumeTimer = setTimeout(resumeAnimation, 1500);
    });
})();