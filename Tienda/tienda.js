// =============================================
// NÚMEROS DE WHATSAPP POR SEDE
// =============================================
const WSP_SEDES = {
    '1': '51978421654',   // Ica
    '2': '51942623696',   // Lima
    '3': '51937695830',   // Trujillo
    '4': '51930210613',   // Chincha
    '5': '51942867212',   // Huancayo
    '6': '51939067488',   // Nasca
    '7': '51975338252',   // Arequipa
};

const NOMBRES_SEDES = {
    '1': 'Ica', '2': 'Lima', '3': 'Trujillo',
    '4': 'Chincha', '5': 'Huancayo', '6': 'Nasca', '7': 'Arequipa'
};

// =============================================
// CATÁLOGO DE PRODUCTOS
// =============================================
const CATALOGO = {
    aceites: {
        label: 'Aceites y Lubricantes',
        productos: [
            {
                id: 'ac01', marca: 'Shell', nombre: 'Helix Ultra 5W-40',
                desc: 'Aceite sintético de última generación. Protección máxima del motor.',
                precio: 89.90, badge: 'Más vendido',
                img: 'Imagenes/AceiteShellEjemplo.jpg'
            },
            {
                id: 'ac02', marca: 'Castrol', nombre: 'Edge 5W-30',
                desc: 'Tecnología de titanio FST. Para motores modernos exigentes.',
                precio: 94.90, badge: null,
                img: 'Imagenes/AceiteShellEjemplo.jpg'
            },
            {
                id: 'ac03', marca: 'Mobil', nombre: 'Super 3000 X1 5W-40',
                desc: 'Fórmula avanzada para motores gasolina y GNV. Alto desempeño.',
                precio: 79.90, badge: null,
                img: 'Imagenes/AceiteShellEjemplo.jpg'
            },
            {
                id: 'ac04', marca: 'Valvoline', nombre: 'Advanced Full Synthetic 5W-30',
                desc: 'Protección superior contra desgaste, depósitos y sludge.',
                precio: 84.90, badge: 'Nuevo',
                img: 'Imagenes/AceiteShellEjemplo.jpg'
            },
            {
                id: 'ac05', marca: 'Chevron', nombre: 'Havoline 20W-50',
                desc: 'Para motores con alto kilometraje. Rendimiento garantizado.',
                precio: 52.90, badge: null,
                img: 'Imagenes/AceiteShellEjemplo.jpg'
            },
            {
                id: 'ac06', marca: 'Shell', nombre: 'Rimula R4 X 15W-40',
                desc: 'Aceite mineral para motores diésel de trabajo pesado.',
                precio: 64.90, badge: null,
                img: 'Imagenes/AceiteShellEjemplo.jpg'
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
                img: 'Imagenes/PastillasDeFreno.jpg'
            },
            {
                id: 're02', marca: 'NGK', nombre: 'Bujía Iridium IX',
                desc: 'Punta de iridio ultrafina. Mayor durabilidad y ahorro de combustible.',
                precio: 29.90, badge: null,
                img: 'Imagenes/PastillasDeFreno.jpg'
            },
            {
                id: 're03', marca: 'Bosch', nombre: 'Pastillas de Freno BP456',
                desc: 'Sistema de frenado preciso y silencioso para uso urbano y carretera.',
                precio: 95.00, badge: null,
                img: 'Imagenes/PastillasDeFreno.jpg'
            },
            {
                id: 're04', marca: 'Gates', nombre: 'Correa de Distribución K025605XS',
                desc: 'Alta resistencia a temperaturas extremas. Para motores Toyota/Kia.',
                precio: 145.00, badge: null,
                img: 'Imagenes/PastillasDeFreno.jpg'
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
                img: 'Imagenes/RefrigerantePreston.jpg'
            },
            {
                id: 'rf02', marca: 'Prestone', nombre: 'All Vehicles Antifreeze 4L',
                desc: 'Pack familiar de larga duración. Protege hasta -37°C.',
                precio: 95.00, badge: null,
                img: 'Imagenes/RefrigerantePreston.jpg'
            },
            {
                id: 'rf03', marca: 'Shell', nombre: 'Coolant Premium 1L',
                desc: 'Refrigerante premium OAT. Larga vida útil, sin silicatos.',
                precio: 38.90, badge: null,
                img: 'Imagenes/RefrigerantePreston.jpg'
            },
            {
                id: 'rf04', marca: 'Toyota', nombre: 'Long Life Coolant 1L',
                desc: 'Refrigerante original Toyota. Para Toyota, Kia, Mazda y Subaru.',
                precio: 45.00, badge: 'Original',
                img: 'Imagenes/RefrigerantePreston.jpg'
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
                img: 'Imagenes/FiltroDeAceiteEjemplo.jpg'
            },
            {
                id: 'fi02', marca: 'Bosch', nombre: 'Filtro de Aire S0073',
                desc: 'Captura el 99.9% de partículas. Más potencia, menos consumo.',
                precio: 38.90, badge: 'Best Seller',
                img: 'Imagenes/FiltroDeAceiteEjemplo.jpg'
            },
            {
                id: 'fi03', marca: 'Mann', nombre: 'Filtro de Combustible WK842/2',
                desc: 'Protege el sistema de inyección. Compatible con múltiples marcas.',
                precio: 29.90, badge: null,
                img: 'Imagenes/FiltroDeAceiteEjemplo.jpg'
            },
            {
                id: 'fi04', marca: 'Bosch', nombre: 'Filtro de Habitáculo 1987432362',
                desc: 'Con carbón activado. Elimina polvo, bacterias y olores del habitáculo.',
                precio: 45.00, badge: null,
                img: 'Imagenes/FiltroDeAceiteEjemplo.jpg'
            },
        ]
    }
};

// =============================================
// ESTADO DE LA TIENDA
// =============================================
let estadoTienda = {
    categoriaActual: null,
    productoActual: null,       // legacy, ya no se usa
    cantidad: 1,                // legacy
    sedeId: null,
    productosOrdenados: []
};

// =============================================
// CARRITO — Estado y persistencia (localStorage)
// =============================================
let carritoItems = [];          // [{id, marca, nombre, precio, img, qty}]
let carritoSedeId = null;

function cargarCarritoStorage() {
    try {
        const raw = localStorage.getItem('autogas_carrito');
        if (raw) carritoItems = JSON.parse(raw);
        const sede = localStorage.getItem('autogas_sede');
        if (sede) carritoSedeId = sede;
    } catch (e) { carritoItems = []; }
}

function guardarCarritoStorage() {
    try {
        localStorage.setItem('autogas_carrito', JSON.stringify(carritoItems));
        if (carritoSedeId) localStorage.setItem('autogas_sede', carritoSedeId);
        else localStorage.removeItem('autogas_sede');
    } catch (e) { }
}

// =============================================
// NAVBAR — scroll
// =============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// =============================================
// HERO — fade-in + init
// =============================================
window.addEventListener('load', () => {
    ['.hero-badge--anim', '.hero-title--anim', '.hero-sub--anim', '.hero-actions--anim']
        .forEach((sel, i) => {
            const el = document.querySelector(sel);
            if (el) setTimeout(() => el.classList.add('visible'), 200 + i * 160);
        });
    iniciarReveal();
    iniciarBrandsReveal();

    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const q = this.value.trim().toLowerCase();
            const clearBtn = document.getElementById('searchClear');
            if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';
            const cat = CATALOGO[estadoTienda.categoriaActual];
            if (!cat) return;
            const filtrados = q
                ? cat.productos.filter(p =>
                    p.nombre.toLowerCase().includes(q) ||
                    p.marca.toLowerCase().includes(q) ||
                    p.desc.toLowerCase().includes(q))
                : cat.productos;
            renderizarProductos(filtrados);
        });
    }

    // Cargar carrito guardado y restaurar sede si había
    cargarCarritoStorage();
    renderizarCarrito();
    actualizarFabCount();

    // Restaurar sede seleccionada visualmente
    if (carritoSedeId) {
        document.querySelectorAll('.cart-sede').forEach(s => {
            s.classList.toggle('selected', s.dataset.id === carritoSedeId);
        });
        actualizarInfoSede(carritoSedeId);
    }

    // Habilitar/deshabilitar botón al escribir
    ['cartNombre', 'cartApellido'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', actualizarBtnWsp);
    });
});

// =============================================
// MENÚ MÓVIL
// =============================================
function toggleMenu() {
    const nav = document.getElementById('mobileNav');
    const hamburger = document.getElementById('hamburger');
    const isOpen = nav.classList.contains('open');

    if (isOpen) {
        nav.classList.remove('open');
        hamburger.classList.remove('is-open');
        document.body.style.overflow = '';
        nav.querySelectorAll('.mnav-item').forEach(el => el.classList.remove('visible'));
    } else {
        nav.classList.add('open');
        hamburger.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        nav.querySelectorAll('.mnav-item').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), 60 + i * 60);
        });
    }
}

// Cerrar con Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const nav = document.getElementById('mobileNav');
        if (nav && nav.classList.contains('open')) toggleMenu();
    }
});

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

    document.getElementById('viewCats').style.display = 'none';
    document.getElementById('headerCats').style.display = 'none';
    document.getElementById('headerProds').style.display = 'block';

    document.getElementById('prodLabel').textContent = 'Tienda / ' + cat.label;
    document.getElementById('prodTitle').textContent = cat.label.toUpperCase();

    const bc = document.getElementById('breadcrumb');
    bc.classList.add('visible');
    document.getElementById('bcNombre').textContent = cat.label;

    const searchWrap = document.getElementById('searchWrap');
    if (searchWrap) {
        searchWrap.style.display = 'block';
        const searchInput = document.getElementById('searchInput');
        const searchClear = document.getElementById('searchClear');
        if (searchInput) searchInput.value = '';
        if (searchClear) searchClear.style.display = 'none';
    }

    const viewProds = document.getElementById('viewProds');
    viewProds.style.display = 'block';
    viewProds.style.opacity = '0';
    viewProds.style.transform = 'translateY(16px)';
    renderizarProductos(estadoTienda.productosOrdenados);

    requestAnimationFrame(() => {
        viewProds.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        viewProds.style.opacity = '1';
        viewProds.style.transform = 'translateY(0)';
        setTimeout(() => { viewProds.style.transition = ''; }, 450);
    });

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

    const searchWrap = document.getElementById('searchWrap');
    if (searchWrap) searchWrap.style.display = 'none';

    document.getElementById('store').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// =============================================
// RENDERIZAR PRODUCTOS — ESTILO LUXURY
// =============================================
function renderizarProductos(productos) {
    const grid = document.getElementById('prodsGrid');
    const count = document.getElementById('prodsCount');
    count.textContent = productos.length + ' producto' + (productos.length !== 1 ? 's' : '');

    if (productos.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1;padding:4rem 2rem;text-align:center;">
                <div style="font-size:2.5rem;margin-bottom:1rem;">🔍</div>
                <p style="font-family:var(--font-cond);font-size:1.2rem;font-weight:700;text-transform:uppercase;color:var(--white);margin-bottom:0.5rem;">Sin resultados</p>
                <p style="color:var(--gray);font-size:0.9rem;margin-bottom:1.5rem;">No encontramos productos que coincidan con tu búsqueda.</p>
                <button onclick="limpiarBusqueda()" style="background:var(--red);border:none;color:#fff;font-family:var(--font-cond);font-size:0.8rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:0.6rem 1.4rem;border-radius:2px;cursor:pointer;">Limpiar búsqueda</button>
            </div>`;
        return;
    }

    grid.innerHTML = productos.map(p => `
        <div class="prod-card" data-id="${p.id}">
            <div class="prod-img" onclick="abrirModal('${p.id}')">
                <img src="${p.img}" alt="${p.nombre}" loading="lazy"
                     onerror="this.style.padding='2rem';this.src='../Inicio/Imagenes/AutoGasLogo2.png'" />
                ${p.badge ? `<span class="prod-badge">${p.badge}</span>` : ''}
                <div class="prod-img-overlay" onclick="event.stopPropagation();agregarAlCarritoDesdeCard('${p.id}', event)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                    Agregar al carrito
                </div>
            </div>
            <div class="prod-info">
                <div class="prod-marca">${p.marca}</div>
                <div class="prod-nombre">${p.nombre}</div>
                <div class="prod-desc">${p.desc}</div>
                <div class="prod-footer-full">
                    <div class="prod-footer-top">
                        <div class="prod-precio">
                            ${p.precioRef ? `<span class="prod-precio-ref">S/ ${p.precioRef.toFixed(2)}</span>` : ''}
                            <span class="prod-precio-currency">S/</span>${p.precio.toFixed(2)}
                        </div>
                    </div>
                    <div class="prod-footer-actions">
                        <div class="prod-qty-controls">
                            <button class="prod-qty-btn" onclick="cambiarQtyCard('${p.id}', -1)" aria-label="Restar">−</button>
                            <span class="prod-qty-num" id="qty-${p.id}">1</span>
                            <button class="prod-qty-btn" onclick="cambiarQtyCard('${p.id}', 1)" aria-label="Sumar">+</button>
                        </div>
                        <button class="prod-add-btn-full" onclick="agregarAlCarritoDesdeCard('${p.id}', event)">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <line x1="12" y1="5" x2="12" y2="19"/>
                                <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    activarCarrusel();
}

// =============================================
// CARRUSEL DE FOTOS POR HOVER (ESTILO BALENCIAGA)
// =============================================
function activarCarrusel() {
    document.querySelectorAll('.prod-card').forEach(card => {
        const prodId = card.dataset.id;
        const p = buscarProducto(prodId);
        if (!p || !p.imgs || p.imgs.length < 2) return;

        const img = card.querySelector('.prod-img img');
        let intervalo = null;
        let idx = 0;

        card.addEventListener('mouseenter', () => {
            idx = 0;
            intervalo = setInterval(() => {
                idx = (idx + 1) % p.imgs.length;
                img.style.opacity = '0';
                setTimeout(() => {
                    img.src = p.imgs[idx];
                    img.style.opacity = '1';
                }, 200);
            }, 800);
        });

        card.addEventListener('mouseleave', () => {
            clearInterval(intervalo);
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = p.imgs[0];
                img.style.opacity = '1';
            }, 200);
        });
    });
}

// =============================================
// BUSCAR PRODUCTO (helper)
// =============================================
function buscarProducto(id) {
    for (const cat of Object.values(CATALOGO)) {
        const p = cat.productos.find(x => x.id === id);
        if (p) return p;
    }
    return null;
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
// BÚSQUEDA
// =============================================
function limpiarBusqueda() {
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    if (searchInput) searchInput.value = '';
    if (searchClear) searchClear.style.display = 'none';
    const cat = CATALOGO[estadoTienda.categoriaActual];
    if (cat) renderizarProductos(cat.productos);
}

// =============================================
// abrirModal — ahora solo agrega al carrito
// (mantenemos el nombre para no romper onclick en HTML de productos)
// =============================================
function abrirModal(prodId) {
    agregarAlCarrito(prodId);
}

// =============================================
// CANTIDAD EN CARD — estado local por producto
// =============================================
const qtdCard = {}; // {prodId: cantidad}

function cambiarQtyCard(prodId, delta) {
    if (!qtdCard[prodId]) qtdCard[prodId] = 1;
    qtdCard[prodId] = Math.max(1, qtdCard[prodId] + delta);
    const el = document.getElementById('qty-' + prodId);
    if (el) el.textContent = qtdCard[prodId];
}

function agregarAlCarritoDesdeCard(prodId, e) {
    if (e) e.stopPropagation();
    const qty = qtdCard[prodId] || 1;
    const p = buscarProducto(prodId);
    if (!p) return;

    const existente = carritoItems.find(i => i.id === prodId);
    if (existente) {
        existente.qty += qty;
    } else {
        carritoItems.push({
            id: p.id, marca: p.marca, nombre: p.nombre,
            precio: p.precio, img: p.img, qty
        });
    }

    // Reset qty visual
    qtdCard[prodId] = 1;
    const qtyEl = document.getElementById('qty-' + prodId);
    if (qtyEl) qtyEl.textContent = '1';

    // Feedback visual en la card
    const card = document.querySelector(`.prod-card[data-id="${prodId}"]`);
    if (card) {
        const btn = card.querySelector('.prod-add-btn-full');
        if (btn) {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> ¡Agregado!`;
            btn.style.background = '#1a7a3a';
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
            }, 1400);
        }
    }

    guardarCarritoStorage();
    renderizarCarrito();
    actualizarFabCount();
    dispararPulseRing();
    mostrarToastAdd(p.nombre, qty);
}

// =============================================
// TOAST: producto agregado al carrito
// =============================================
let _toastAddTimer = null;
function mostrarToastAdd(nombre, qty) {
    let toast = document.getElementById('toastAdd');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastAdd';
        toast.className = 'toast-add';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
        </svg>
        ${qty > 1 ? qty + ' × ' : ''}${nombre} — en tu carrito`;
    clearTimeout(_toastAddTimer);
    toast.classList.add('visible');
    _toastAddTimer = setTimeout(() => toast.classList.remove('visible'), 2400);
}

// =============================================
// CARRITO — AGREGAR PRODUCTO (mantener para compatibilidad)
// =============================================
function agregarAlCarrito(prodId) {
    const p = buscarProducto(prodId);
    if (!p) return;

    const existente = carritoItems.find(i => i.id === prodId);
    if (existente) {
        existente.qty += 1;
    } else {
        carritoItems.push({
            id: p.id,
            marca: p.marca,
            nombre: p.nombre,
            precio: p.precio,
            img: p.img,
            qty: 1
        });
    }

    guardarCarritoStorage();
    renderizarCarrito();
    actualizarFabCount();
    dispararPulseRing();
}

// =============================================
// CARRITO — CAMBIAR CANTIDAD DE UN ITEM
// =============================================
function cambiarCantidadItem(id, delta) {
    const item = carritoItems.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    guardarCarritoStorage();
    renderizarCarrito();
}

// =============================================
// CARRITO — ELIMINAR ITEM
// =============================================
function eliminarItem(id) {
    carritoItems = carritoItems.filter(i => i.id !== id);
    guardarCarritoStorage();
    renderizarCarrito();
    actualizarFabCount();
}

// =============================================
// CARRITO — VACIAR
// =============================================
function vaciarCarrito() {
    carritoItems = [];
    carritoSedeId = null;
    guardarCarritoStorage();
    renderizarCarrito();
    actualizarFabCount();
    // Resetear sede
    document.querySelectorAll('.cart-sede').forEach(s => s.classList.remove('selected'));
    const sedeInfo = document.getElementById('cartSedeInfo');
    if (sedeInfo) sedeInfo.style.display = 'none';
}

// =============================================
// CARRITO — RENDERIZAR PANEL
// =============================================
function renderizarCarrito() {
    const empty = document.getElementById('cartEmpty');
    const itemsSection = document.getElementById('cartItems');
    const formSection = document.getElementById('cartFormSection');
    const lista = document.getElementById('cartItemsList');

    const hayItems = carritoItems.length > 0;

    if (empty) empty.style.display = hayItems ? 'none' : 'flex';
    if (itemsSection) itemsSection.style.display = hayItems ? 'block' : 'none';
    if (formSection) formSection.style.display = hayItems ? 'block' : 'none';

    if (!hayItems || !lista) return;

    lista.innerHTML = carritoItems.map(item => `
        <div class="cart-item cart-item-entering" data-id="${item.id}">
            <div class="cart-item-img">
                <img src="${item.img}" alt="${item.nombre}"
                     onerror="this.src='../Inicio/Imagenes/AutoGasLogo2.png'" />
            </div>
            <div class="cart-item-info">
                <div class="cart-item-marca">${item.marca}</div>
                <div class="cart-item-nombre">${item.nombre}</div>
                <div class="cart-item-qty">
                    <button class="cart-qty-btn" onclick="cambiarCantidadItem('${item.id}', -1)">−</button>
                    <span class="cart-qty-num">${item.qty}</span>
                    <button class="cart-qty-btn" onclick="cambiarCantidadItem('${item.id}', 1)">+</button>
                </div>
            </div>
            <div class="cart-item-right">
                <span class="cart-item-precio">S/ ${(item.precio * item.qty).toFixed(2)}</span>
                <button class="cart-item-remove" onclick="eliminarItem('${item.id}')">Quitar</button>
            </div>
        </div>
    `).join('');

    actualizarTotal();
    actualizarBtnWsp();
}

// =============================================
// CARRITO — TOTAL
// =============================================
function actualizarTotal() {
    const total = carritoItems.reduce((sum, i) => sum + i.precio * i.qty, 0);
    const el = document.getElementById('cartTotalAmount');
    if (el) el.textContent = 'S/ ' + total.toFixed(2);
}

// =============================================
// CARRITO — FAB COUNT
// =============================================
function actualizarFabCount() {
    const totalQty = carritoItems.reduce((s, i) => s + i.qty, 0);
    const badge = document.getElementById('cartCount');
    if (!badge) return;
    if (totalQty > 0) {
        badge.textContent = totalQty > 99 ? '99+' : totalQty;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// =============================================
// CARRITO — PULSE RING AL AGREGAR
// =============================================
function dispararPulseRing() {
    const ring = document.getElementById('cartPulseRing');
    if (!ring) return;
    ring.classList.remove('firing');
    // Force reflow
    void ring.offsetWidth;
    ring.classList.add('firing');
    ring.addEventListener('animationend', () => ring.classList.remove('firing'), { once: true });
}

// =============================================
// CARRITO — TOGGLE PANEL
// =============================================
function toggleCarrito() {
    const overlay = document.getElementById('cartOverlay');
    if (!overlay) return;
    const isOpen = overlay.classList.contains('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
}

function cerrarCarritoOverlay(e) {
    if (e.target === document.getElementById('cartOverlay')) toggleCarrito();
}

// =============================================
// CARRITO — ELEGIR SEDE
// =============================================
function elegirSedeCarrito(el) {
    document.querySelectorAll('.cart-sede').forEach(s => s.classList.remove('selected'));
    el.classList.add('selected');
    carritoSedeId = el.dataset.id;
    guardarCarritoStorage();
    actualizarInfoSede(carritoSedeId);
    actualizarBtnWsp();
}

function actualizarInfoSede(sedeId) {
    const infoEl = document.getElementById('cartSedeInfo');
    const infoText = document.getElementById('cartSedeInfoText');
    if (!infoEl || !infoText) return;
    const nombre = NOMBRES_SEDES[sedeId];
    const numero = WSP_SEDES[sedeId];
    const formatted = '+' + numero.slice(0, 2) + ' ' + numero.slice(2, 5) + ' ' + numero.slice(5, 8) + ' ' + numero.slice(8);
    infoText.textContent = `Vía WhatsApp Directo · ${nombre} ${formatted}`;
    infoEl.style.display = 'flex';
}

// =============================================
// CARRITO — HABILITAR/DESHABILITAR BOTÓN WSP
// =============================================
function actualizarBtnWsp() {
    const btn = document.getElementById('cartBtnWsp');
    if (!btn) return;
    const nombre = (document.getElementById('cartNombre') || {}).value || '';
    const apellido = (document.getElementById('cartApellido') || {}).value || '';
    const listo = carritoItems.length > 0 && carritoSedeId && nombre.trim() && apellido.trim();
    btn.disabled = !listo;
}

// =============================================
// CARRITO — ENVIAR POR WHATSAPP
// =============================================
function enviarCarritoWsp() {
    const nombre = (document.getElementById('cartNombre') || {}).value || '';
    const apellido = (document.getElementById('cartApellido') || {}).value || '';
    const vehiculo = (document.getElementById('cartVehiculo') || {}).value || '';

    // Validación campos obligatorios
    let valido = true;
    ['cartNombre', 'cartApellido'].forEach(id => {
        const el = document.getElementById(id);
        if (el && !el.value.trim()) {
            el.classList.add('error');
            setTimeout(() => el.classList.remove('error'), 600);
            valido = false;
        }
    });
    if (!valido) return;
    if (!carritoSedeId || carritoItems.length === 0) return;

    const sede = NOMBRES_SEDES[carritoSedeId];
    const numero = WSP_SEDES[carritoSedeId];
    const total = carritoItems.reduce((s, i) => s + i.precio * i.qty, 0);

    const lineasProductos = carritoItems.map(i =>
        `- ${i.marca} ${i.nombre} × ${i.qty} — S/ ${(i.precio * i.qty).toFixed(2)}`
    ).join('\n');

    let msg =
        `Hola AutoGas ${sede} 👋\n\n` +
        `*Cliente:* ${nombre.trim()} ${apellido.trim()}\n`;

    if (vehiculo.trim()) {
        msg += `*Vehículo:* ${vehiculo.trim()}\n`;
    }

    msg +=
        `\n🛒 *Mi pedido:*\n${lineasProductos}\n\n` +
        `💳 *Total estimado:* S/ ${total.toFixed(2)}\n\n` +
        `Por favor confirmar disponibilidad antes de coordinar recojo o entrega.`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');

    // Cerrar carrito
    toggleCarrito();

    // Toast de confirmación
    mostrarToastWsp();
}

// =============================================
// TOAST — CONFIRMACIÓN WHATSAPP
// =============================================
function mostrarToastWsp() {
    let toast = document.getElementById('toastWsp');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastWsp';
        toast.className = 'toast-wsp';
        toast.innerHTML = `
            <div class="toast-wsp-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.525 5.845L0 24l6.335-1.509A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.81 9.81 0 01-5.003-1.368l-.359-.214-3.722.976.994-3.636-.234-.374A9.817 9.817 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                </svg>
            </div>
            <div class="toast-wsp-body">
                <div class="toast-wsp-title">¡Pedido listo! Revisa WhatsApp</div>
                <div class="toast-wsp-sub">Se abrió WhatsApp con tu pedido. Solo dale <strong style="color:#fff">Enviar</strong> al mensaje para confirmarlo. 🚀</div>
            </div>
            <button class="toast-wsp-close" onclick="cerrarToastWsp()" aria-label="Cerrar">✕</button>
        `;
        document.body.appendChild(toast);
    }
    setTimeout(() => toast.classList.add('visible'), 50);
    // Auto-cerrar en 7 segundos
    setTimeout(() => cerrarToastWsp(), 7000);
}

function cerrarToastWsp() {
    const toast = document.getElementById('toastWsp');
    if (toast) toast.classList.remove('visible');
}

// =============================================
// BRANDS — reveal animado con stagger
// =============================================
function iniciarBrandsReveal() {
    const header = document.querySelector('.brands-header');
    const items = document.querySelectorAll('.t-item');

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('brands-header')) {
                    entry.target.classList.add('visible');
                } else {
                    // stagger por índice
                    const idx = Array.from(items).indexOf(entry.target);
                    setTimeout(() => entry.target.classList.add('visible'), idx * 100);
                }
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (header) obs.observe(header);
    items.forEach(item => obs.observe(item));
}

// =============================================
// TICKER — swipe móvil
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