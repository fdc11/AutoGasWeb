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
// DATOS DE CADA CATEGORÍA (tarjetas y cabecera)
// Para cambiar las fotos: reemplaza la ruta de "img".
// =============================================
const CATEGORIAS_INFO = {
    aceites: {
        num: '01', corto: 'Aceites',
        titulo: 'Aceites y <em>Lubricantes</em>',
        desc: 'Shell, Castrol, Mobil, Valvoline. Motor protegido, rendimiento al tope.',
        img: 'Imagenes/AceitesCaraEjemplo.webp'
    },
    repuestos: {
        num: '02', corto: 'Repuestos',
        titulo: '<em>Repuestos</em>',
        desc: 'Bujías, pastillas de freno y correas para las marcas del mercado peruano.',
        img: 'Imagenes/ComponentesCaraEjemplo.webp'
    },
    refrigerantes: {
        num: '03', corto: 'Refrigerantes',
        titulo: '<em>Refrigerantes</em>',
        desc: 'Fórmulas de larga duración para mantener tu motor a la temperatura correcta.',
        img: 'Imagenes/PrestoneEjemploCara.webp'
    },
    filtros: {
        num: '04', corto: 'Filtros',
        titulo: 'Filtros y <em>Componentes</em>',
        desc: 'Filtros de aceite, aire, combustible y habitáculo.',
        img: 'Imagenes/RefrigeranteEjemplo.webp'
    }
};

// Productos que salen en "Los más pedidos" (por id)
const MAS_PEDIDOS = ['ac01', 'rf01', 'fi02', 're02'];

// Imagen de reemplazo si la foto del producto no existe todavía
const IMG_PENDIENTE = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">' +
    '<rect width="200" height="200" fill="#f4f4f4"/>' +
    '<path d="M70 80h60v50H70z M82 80v-8h36v8" fill="none" stroke="#c4c4c4" stroke-width="5" stroke-linejoin="round"/>' +
    '<text x="100" y="160" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#8a8a8a">Foto pendiente</text>' +
    '</svg>');

const ICONO_FLECHA = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const ICONO_ATRAS = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>';
const ICONO_CHECK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

// =============================================
// ESTADO DE LA TIENDA
// =============================================
let estadoTienda = {
    vista: 'home',          // 'home' | 'cat' | 'buscar'
    categoriaActual: null,
    busqueda: '',
    orden: 'default'
};

// =============================================
// CARRITO — Estado y persistencia (localStorage)
// =============================================
let carritoItems = [];          // [{id, marca, nombre, precio, img, qty}]
let carritoSedeId = null;

function cargarCarritoStorage() {
    try {
        const raw = localStorage.getItem('autogas_carrito');
        if (raw) carritoItems = JSON.parse(raw) || [];
        const sede = localStorage.getItem('autogas_sede');
        if (sede && WSP_SEDES[sede]) carritoSedeId = sede;
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
// HELPERS
// =============================================
function $(id) { return document.getElementById(id); }

function soles(n) { return 'S/ ' + n.toFixed(2); }

function escaparHTML(txt) {
    return String(txt).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

function normalizar(txt) {
    return String(txt).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function buscarProducto(id) {
    for (const cat of Object.values(CATALOGO)) {
        const p = cat.productos.find(x => x.id === id);
        if (p) return p;
    }
    return null;
}

function todosLosProductos() {
    return Object.values(CATALOGO).flatMap(c => c.productos);
}

// =============================================
// NAVBAR — scroll (igual que el resto de páginas)
// =============================================
const navbar = $('navbar');
function actualizarNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}
window.addEventListener('scroll', actualizarNavbar, { passive: true });

// =============================================
// MENÚ MÓVIL
// =============================================
function toggleMenu() {
    const nav = $('mobileNav');
    const hamburger = $('hamburger');
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

document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const nav = $('mobileNav');
    if (nav && nav.classList.contains('open')) { toggleMenu(); return; }
    const overlay = $('cartOverlay');
    if (overlay && overlay.classList.contains('open')) toggleCarrito();
});

// =============================================
// TARJETAS DE PRODUCTO (se usan en todas las grillas)
// =============================================
function htmlProducto(p, conDescripcion) {
    return `
        <article class="t-prod" data-id="${p.id}">
            <div class="t-prod-media">
                <img src="${p.img}" alt="${escaparHTML(p.marca + ' ' + p.nombre)}" loading="lazy" decoding="async"
                     onerror="this.onerror=null;this.src=IMG_PENDIENTE" />
                ${p.badge ? `<span class="t-badge">${escaparHTML(p.badge)}</span>` : ''}
            </div>
            <div class="t-prod-info">
                <p class="t-prod-marca">${escaparHTML(p.marca)}</p>
                <h3 class="t-prod-nombre">${escaparHTML(p.nombre)}</h3>
                ${conDescripcion ? `<p class="t-prod-desc">${escaparHTML(p.desc)}</p>` : ''}
                <p class="t-prod-precio">${soles(p.precio)}</p>
                <div class="t-prod-actions">
                    <div class="t-qty">
                        <button type="button" onclick="cambiarQtyCard('${p.id}',-1)" aria-label="Quitar uno">−</button>
                        <span data-qty="${p.id}" aria-live="polite">${qtyCard[p.id] || 1}</span>
                        <button type="button" onclick="cambiarQtyCard('${p.id}',1)" aria-label="Agregar uno">+</button>
                    </div>
                    <button type="button" class="t-add" onclick="agregarAlCarritoDesdeCard('${p.id}', this)">Agregar</button>
                </div>
            </div>
        </article>`;
}

// =============================================
// VISTA INICIO: categorías + más pedidos
// =============================================
function renderizarInicio() {
    $('catsGrid').innerHTML = Object.entries(CATEGORIAS_INFO).map(([id, info]) => `
        <a class="t-cat" href="#${id}">
            <div class="t-cat-info">
                <span class="t-cat-num">${info.num}</span>
                <h3 class="t-cat-name">${CATALOGO[id].label}</h3>
                <p class="t-cat-desc">${info.desc}</p>
                <span class="t-cat-go">Ver ${CATALOGO[id].productos.length} productos ${ICONO_FLECHA}</span>
            </div>
            <div class="t-cat-media">
                <img src="${info.img}" alt="" loading="lazy" decoding="async" />
            </div>
            <span class="t-cat-bar"></span>
        </a>`).join('');

    const top = MAS_PEDIDOS.map(buscarProducto).filter(Boolean);
    $('topGrid').innerHTML = top.map(p => htmlProducto(p, false)).join('');
}

// =============================================
// BARRA DE CATEGORÍAS + BLOQUE "¿BUSCAS OTRA COSA?"
// =============================================
function renderizarNavCategorias(catActual) {
    $('catTabs').innerHTML = Object.entries(CATEGORIAS_INFO).map(([id, info]) => `
        <a class="t-tab" href="#${id}" ${id === catActual ? 'aria-current="page"' : ''}>${info.corto}</a>
    `).join('');

    $('moreLinks').innerHTML = Object.entries(CATEGORIAS_INFO)
        .filter(([id]) => id !== catActual)
        .map(([id, info]) => `<a href="#${id}">${info.corto}</a>`)
        .join('') +
        `<a href="#tienda" class="is-all">${ICONO_ATRAS} Todas las categorías</a>`;
}

// =============================================
// ROUTER — cada categoría tiene su propia dirección
// (tienda.html#aceites). Así funciona el botón "atrás"
// del navegador y se puede compartir el link.
// =============================================
function leerRuta() {
    const hash = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (CATALOGO[hash]) return { vista: 'cat', cat: hash };
    if (hash.startsWith('buscar=')) {
        const q = hash.slice(7).trim();
        if (q) return { vista: 'buscar', q };
    }
    return { vista: 'home', ancla: hash };
}

function aplicarRuta(primeraCarga) {
    const ruta = leerRuta();
    const esHome = ruta.vista === 'home';

    $('tHero').hidden = !esHome;
    $('viewHome').hidden = !esHome;
    $('catHead').hidden = esHome;
    $('catBar').hidden = esHome;
    $('viewCat').hidden = esHome;
    $('store').classList.toggle('is-cat', !esHome);

    estadoTienda.vista = ruta.vista;
    estadoTienda.orden = 'default';
    $('ordenSelect').value = 'default';
    $('searchInput').value = '';

    if (ruta.vista === 'cat') {
        const info = CATEGORIAS_INFO[ruta.cat];
        estadoTienda.categoriaActual = ruta.cat;
        estadoTienda.busqueda = '';
        $('catHeadImg').src = info.img;
        $('crumbActual').textContent = CATALOGO[ruta.cat].label;
        $('catTitle').innerHTML = info.titulo;
        $('catDesc').textContent = info.desc;
        $('searchInput').placeholder = 'Buscar en ' + info.corto.toLowerCase() + '…';
        document.title = 'AutoGas | ' + CATALOGO[ruta.cat].label + ' — Tienda';
        renderizarNavCategorias(ruta.cat);
        filtrarYRenderizar();
        window.scrollTo({ top: 0, behavior: 'auto' });
    } else if (ruta.vista === 'buscar') {
        estadoTienda.categoriaActual = null;
        estadoTienda.busqueda = ruta.q;
        $('catHeadImg').src = 'Imagenes/IMG_3214.webp';
        $('crumbActual').textContent = 'Búsqueda';
        $('catTitle').innerHTML = 'Resultados para <em></em>';
        $('catTitle').querySelector('em').textContent = '“' + ruta.q + '”';
        $('catDesc').textContent = 'Buscamos en todas las categorías de la tienda.';
        $('searchInput').placeholder = 'Buscar en toda la tienda…';
        $('searchInput').value = ruta.q;
        document.title = 'AutoGas | Buscar “' + ruta.q + '” — Tienda';
        renderizarNavCategorias(null);
        filtrarYRenderizar();
        window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
        estadoTienda.categoriaActual = null;
        estadoTienda.busqueda = '';
        document.title = 'AutoGas | Tienda — Aceites, Refrigerantes, Filtros y Repuestos';
        if (!primeraCarga && (ruta.ancla === 'tienda' || ruta.ancla === 'store' || ruta.ancla === 'categorias')) {
            $('categorias').scrollIntoView({ behavior: 'auto', block: 'start' });
        } else if (!primeraCarga) {
            window.scrollTo({ top: 0, behavior: 'auto' });
        } else if (ruta.ancla === 'store' || ruta.ancla === 'categorias' || ruta.ancla === 'tienda') {
            requestAnimationFrame(() => $('categorias').scrollIntoView({ block: 'start' }));
        }
    }
    actualizarNavbar();
}

window.addEventListener('hashchange', () => aplicarRuta(false));

function irACategorias() {
    const overlay = $('cartOverlay');
    if (overlay.classList.contains('open')) toggleCarrito();
    if (location.hash === '#tienda') aplicarRuta(false);
    else location.hash = 'tienda';
}

// =============================================
// LISTADO DE PRODUCTOS: búsqueda + orden
// =============================================
function filtrarYRenderizar() {
    const qInput = normalizar($('searchInput').value.trim());
    let base;
    if (estadoTienda.vista === 'cat') {
        base = [...CATALOGO[estadoTienda.categoriaActual].productos];
    } else {
        base = todosLosProductos();
    }

    let prods = qInput
        ? base.filter(p => normalizar(p.nombre + ' ' + p.marca + ' ' + p.desc).includes(qInput))
        : base;

    const orden = $('ordenSelect').value;
    if (orden === 'asc') prods.sort((a, b) => a.precio - b.precio);
    else if (orden === 'desc') prods.sort((a, b) => b.precio - a.precio);
    else if (orden === 'marca') prods.sort((a, b) => a.marca.localeCompare(b.marca));

    renderizarProductos(prods);
}

function renderizarProductos(productos) {
    const grid = $('prodsGrid');
    const n = productos.length;
    $('prodsCount').innerHTML = `<strong>${n}</strong> producto${n !== 1 ? 's' : ''}`;

    if (n === 0) {
        grid.innerHTML = `
            <div class="t-empty">
                <p class="t-empty-title">Sin resultados</p>
                <p>No encontramos productos con esa búsqueda. Prueba con otra palabra o escríbenos por WhatsApp.</p>
                <button type="button" class="t-btn" onclick="limpiarBusqueda()">Limpiar búsqueda</button>
            </div>`;
        return;
    }
    grid.innerHTML = productos.map(p => htmlProducto(p, true)).join('');
}

function limpiarBusqueda() {
    $('searchInput').value = '';
    if (estadoTienda.vista === 'buscar') { irACategorias(); return; }
    filtrarYRenderizar();
    $('searchInput').focus();
}

// =============================================
// CANTIDAD EN TARJETA
// =============================================
const qtyCard = {}; // {prodId: cantidad}

function cambiarQtyCard(prodId, delta) {
    qtyCard[prodId] = Math.max(1, Math.min(99, (qtyCard[prodId] || 1) + delta));
    document.querySelectorAll('[data-qty="' + prodId + '"]').forEach(el => el.textContent = qtyCard[prodId]);
}

function agregarAlCarritoDesdeCard(prodId, btn) {
    const qty = qtyCard[prodId] || 1;
    const p = buscarProducto(prodId);
    if (!p) return;

    const existente = carritoItems.find(i => i.id === prodId);
    if (existente) existente.qty = Math.min(99, existente.qty + qty);
    else carritoItems.push({ id: p.id, marca: p.marca, nombre: p.nombre, precio: p.precio, img: p.img, qty });

    qtyCard[prodId] = 1;
    document.querySelectorAll('[data-qty="' + prodId + '"]').forEach(el => el.textContent = '1');

    if (btn) {
        btn.innerHTML = ICONO_CHECK + ' Agregado';
        btn.classList.add('is-added');
        setTimeout(() => { btn.textContent = 'Agregar'; btn.classList.remove('is-added'); }, 1400);
    }

    guardarCarritoStorage();
    renderizarCarrito();
    actualizarFabCount();
    dispararPulseRing();
    mostrarToastAdd(p.nombre, qty);
}

// =============================================
// TOAST: producto agregado
// =============================================
let _toastAddTimer = null;
function mostrarToastAdd(nombre, qty) {
    let toast = $('toastAdd');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastAdd';
        toast.className = 'toast-add';
        toast.setAttribute('role', 'status');
        document.body.appendChild(toast);
    }
    toast.innerHTML = `${ICONO_CHECK}<span></span><button type="button" onclick="toggleCarrito()">Ver pedido</button>`;
    toast.querySelector('span').textContent = (qty > 1 ? qty + ' × ' : '') + nombre + ' agregado';
    clearTimeout(_toastAddTimer);
    toast.classList.add('visible');
    _toastAddTimer = setTimeout(() => toast.classList.remove('visible'), 3000);
}

// =============================================
// CARRITO — cantidades, quitar, vaciar
// =============================================
function cambiarCantidadItem(id, delta) {
    const item = carritoItems.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, Math.min(99, item.qty + delta));
    guardarCarritoStorage();
    renderizarCarrito();
    actualizarFabCount();
}

function eliminarItem(id) {
    carritoItems = carritoItems.filter(i => i.id !== id);
    guardarCarritoStorage();
    renderizarCarrito();
    actualizarFabCount();
}

function vaciarCarrito() {
    carritoItems = [];
    guardarCarritoStorage();
    renderizarCarrito();
    actualizarFabCount();
}

// =============================================
// CARRITO — dibujar
// =============================================
function renderizarCarrito() {
    const hayItems = carritoItems.length > 0;
    $('cartEmpty').style.display = hayItems ? 'none' : 'flex';
    $('cartBody').style.display = hayItems ? 'flex' : 'none';

    const totalQty = carritoItems.reduce((s, i) => s + i.qty, 0);
    $('cartHeadCount').textContent = hayItems ? '· ' + totalQty + (totalQty === 1 ? ' producto' : ' productos') : '';

    if (!hayItems) { actualizarBtnWsp(); return; }

    $('cartItemsList').innerHTML = carritoItems.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-prod">
                <div class="cart-item-img">
                    <img src="${item.img}" alt="" onerror="this.onerror=null;this.src=IMG_PENDIENTE" />
                </div>
                <div>
                    <p class="cart-item-marca">${escaparHTML(item.marca)}</p>
                    <p class="cart-item-nombre">${escaparHTML(item.nombre)}</p>
                    <p class="cart-item-meta">${soles(item.precio)} c/u ·
                        <button type="button" class="cart-link" onclick="eliminarItem('${item.id}')">Quitar</button></p>
                </div>
            </div>
            <div class="cart-item-qty">
                <div class="t-qty">
                    <button type="button" onclick="cambiarCantidadItem('${item.id}', -1)" aria-label="Quitar uno de ${escaparHTML(item.nombre)}">−</button>
                    <span>${item.qty}</span>
                    <button type="button" onclick="cambiarCantidadItem('${item.id}', 1)" aria-label="Agregar uno de ${escaparHTML(item.nombre)}">+</button>
                </div>
            </div>
            <p class="cart-item-sub">${soles(item.precio * item.qty)}</p>
        </div>
    `).join('');

    const total = carritoItems.reduce((s, i) => s + i.precio * i.qty, 0);
    $('cartSubLabel').textContent = 'Productos (' + totalQty + ')';
    $('cartSubAmount').textContent = soles(total);
    $('cartTotalAmount').textContent = soles(total);
    actualizarBtnWsp();
}

function actualizarFabCount() {
    const totalQty = carritoItems.reduce((s, i) => s + i.qty, 0);
    const badge = $('cartCount');
    badge.textContent = totalQty > 99 ? '99+' : totalQty;
    badge.style.display = totalQty > 0 ? 'flex' : 'none';
    $('cartFab').setAttribute('aria-label', totalQty > 0 ? `Abrir carrito, ${totalQty} productos` : 'Abrir carrito');
}

function dispararPulseRing() {
    const ring = $('cartPulseRing');
    if (!ring) return;
    ring.classList.remove('firing');
    void ring.offsetWidth;
    ring.classList.add('firing');
    ring.addEventListener('animationend', () => ring.classList.remove('firing'), { once: true });
}

// =============================================
// CARRITO — abrir / cerrar
// =============================================
let _focoAntesCarrito = null;
function toggleCarrito() {
    const overlay = $('cartOverlay');
    const abrir = !overlay.classList.contains('open');
    overlay.classList.toggle('open', abrir);
    document.body.style.overflow = abrir ? 'hidden' : '';
    const toast = $('toastAdd');
    if (toast) toast.classList.remove('visible');
    if (abrir) {
        _focoAntesCarrito = document.activeElement;
        setTimeout(() => overlay.querySelector('.cart-close').focus(), 50);
    } else if (_focoAntesCarrito && _focoAntesCarrito.focus) {
        _focoAntesCarrito.focus();
    }
}

function cerrarCarritoOverlay(e) {
    if (e.target === $('cartOverlay')) toggleCarrito();
}

// =============================================
// CARRITO — sede
// =============================================
function elegirSedeCarrito(el) {
    carritoSedeId = el.dataset.id;
    marcarSede();
    $('cartSedesBlock').querySelector('.cart-sedes-grid').classList.remove('error');
    guardarCarritoStorage();
    actualizarBtnWsp();
}

function marcarSede() {
    document.querySelectorAll('.cart-sede').forEach(s => {
        const on = s.dataset.id === carritoSedeId;
        s.classList.toggle('selected', on);
        s.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    const info = $('cartSedeInfo');
    if (carritoSedeId) {
        const n = WSP_SEDES[carritoSedeId];
        info.textContent = `Tu pedido llega al WhatsApp de AutoGas ${NOMBRES_SEDES[carritoSedeId]}: +${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5, 8)} ${n.slice(8)}`;
        info.hidden = false;
    } else {
        info.hidden = true;
    }
}

// =============================================
// CARRITO — botón de WhatsApp: dice qué falta
// =============================================
function camposFaltantes() {
    const faltan = [];
    if (!$('cartNombre').value.trim()) faltan.push('nombre');
    if (!$('cartApellido').value.trim()) faltan.push('apellido');
    if (!carritoSedeId) faltan.push('sede');
    return faltan;
}

function actualizarBtnWsp() {
    const btn = $('cartBtnWsp');
    const hint = $('cartHint');
    const faltan = camposFaltantes();
    const listo = carritoItems.length > 0 && faltan.length === 0;

    btn.setAttribute('aria-disabled', listo ? 'false' : 'true');
    $('cartBtnText').textContent = listo && carritoSedeId
        ? 'Enviar pedido a sede ' + NOMBRES_SEDES[carritoSedeId]
        : 'Enviar pedido por WhatsApp';

    if (listo) {
        hint.textContent = 'Se abre WhatsApp con tu pedido listo. Solo dale enviar.';
        hint.classList.remove('is-missing');
    } else {
        const etiquetas = { nombre: 'tu nombre', apellido: 'tu apellido', sede: 'elegir sede' };
        hint.textContent = 'Falta: ' + faltan.map(f => etiquetas[f]).join(', ');
        hint.classList.add('is-missing');
    }
}

function enviarCarritoWsp() {
    const faltan = camposFaltantes();
    if (carritoItems.length === 0) return;

    if (faltan.length) {
        if (faltan.includes('nombre')) $('cartNombre').classList.add('error');
        if (faltan.includes('apellido')) $('cartApellido').classList.add('error');
        if (faltan.includes('sede')) $('cartSedesBlock').querySelector('.cart-sedes-grid').classList.add('error');
        const primero = faltan[0] === 'nombre' ? $('cartNombre')
            : faltan[0] === 'apellido' ? $('cartApellido')
                : $('cartSedesBlock').querySelector('.cart-sede');
        primero.focus();
        if (faltan[0] === 'sede') primero.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return;
    }

    const nombre = $('cartNombre').value.trim();
    const apellido = $('cartApellido').value.trim();
    const vehiculo = $('cartVehiculo').value.trim();
    const sede = NOMBRES_SEDES[carritoSedeId];
    const numero = WSP_SEDES[carritoSedeId];
    const total = carritoItems.reduce((s, i) => s + i.precio * i.qty, 0);

    const lineas = carritoItems.map(i =>
        `- ${i.marca} ${i.nombre} × ${i.qty} — ${soles(i.precio * i.qty)}`).join('\n');

    let msg = `Hola AutoGas ${sede} 👋\n\n*Cliente:* ${nombre} ${apellido}\n`;
    if (vehiculo) msg += `*Vehículo:* ${vehiculo}\n`;
    msg += `\n🛒 *Mi pedido:*\n${lineas}\n\n` +
        `💳 *Total estimado:* ${soles(total)}\n\n` +
        `Por favor confirmar disponibilidad antes de coordinar recojo o entrega.`;

    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    toggleCarrito();
    mostrarToastWsp();
}

// =============================================
// TOAST — confirmación de WhatsApp
// =============================================
function mostrarToastWsp() {
    let toast = $('toastWsp');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastWsp';
        toast.className = 'toast-wsp';
        toast.setAttribute('role', 'status');
        toast.innerHTML = `
            <div class="toast-wsp-icon">${ICONO_CHECK}</div>
            <div>
                <div class="toast-wsp-title">¡Pedido listo! Revisa WhatsApp</div>
                <div class="toast-wsp-sub">Se abrió WhatsApp con tu pedido. Solo dale <strong style="color:#fff">Enviar</strong> para confirmarlo.</div>
            </div>
            <button type="button" class="toast-wsp-close" onclick="cerrarToastWsp()" aria-label="Cerrar">✕</button>`;
        document.body.appendChild(toast);
    }
    setTimeout(() => toast.classList.add('visible'), 50);
    setTimeout(cerrarToastWsp, 7000);
}

function cerrarToastWsp() {
    const toast = $('toastWsp');
    if (toast) toast.classList.remove('visible');
}

// =============================================
// INICIO
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    renderizarInicio();

    // Buscador del hero → vista de resultados
    $('heroSearchForm').addEventListener('submit', e => {
        e.preventDefault();
        const q = $('heroSearch').value.trim();
        if (!q) { $('heroSearch').focus(); return; }
        location.hash = 'buscar=' + encodeURIComponent(q);
    });

    // Buscador y orden dentro de una categoría
    $('searchInput').addEventListener('input', filtrarYRenderizar);
    $('ordenSelect').addEventListener('change', filtrarYRenderizar);

    // Carrito
    cargarCarritoStorage();
    marcarSede();
    renderizarCarrito();
    actualizarFabCount();
    ['cartNombre', 'cartApellido'].forEach(id => {
        $(id).addEventListener('input', () => {
            $(id).classList.remove('error');
            actualizarBtnWsp();
        });
    });

    aplicarRuta(true);
});
