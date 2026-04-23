// =============================================
// NAVBAR — scroll
// =============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// =============================================
// HERO — fade-in de elementos
// =============================================
window.addEventListener('load', () => {
    const heroAnims = [
        '.hero-badge--anim',
        '.hero-title--anim',
        '.hero-sub--anim',
        '.hero-actions--anim'
    ];
    heroAnims.forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (el) setTimeout(() => el.classList.add('visible'), 200 + i * 160);
    });
});

// =============================================
// MENÚ MÓVIL
// =============================================
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav  = document.getElementById('mobileNav');
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
}

// =============================================
// SCROLL REVEAL
// =============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => revealObserver.observe(el));

// =============================================
// COUNTER ANIMATION
// =============================================
function animateCounter(el, target, duration = 1800) {
    const isLarge = target >= 1000;
    const step    = target / (duration / 16);
    let   current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = isLarge
                ? (target / 1000).toFixed(0) + 'K'
                : target;
            clearInterval(timer);
        } else {
            el.textContent = isLarge
                ? (current / 1000).toFixed(1).replace('.0', '')
                : Math.floor(current);
        }
    }, 16);
}

document.querySelectorAll('.sband-item').forEach(item => {
    const numEl = item.querySelector('.sband-num');
    if (!numEl) return;
    const target = parseInt(numEl.dataset.target);
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCounter(numEl, target);
                obs.disconnect();
            }
        });
    }, { threshold: 0.5 });
    obs.observe(item);
});

// =============================================
// CRED ITEMS — scroll reveal
// =============================================
document.querySelectorAll('.cred-item')
    .forEach(el => revealObserver.observe(el));

// =============================================
// AREA CARDS — touch/click flip for mobile
// =============================================
document.querySelectorAll('.area-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// =============================================
// CALCULADORA DE AHORRO
// =============================================
let esTaxista = false;

function toggleTipo() {
    esTaxista = document.getElementById('switchTipo').checked;
    const tip = document.getElementById('calc-tip');
    if (esTaxista) {
        tip.textContent = 'Taxista o conductor de app: Uber, InDrive, Beat. Recuperas la inversión en ~2 meses trabajando.';
        tip.className = 'calc-tip taxista-tip';
    } else {
        tip.textContent = 'Conductor de uso diario: familia, trabajo, viajes.';
        tip.className = 'calc-tip particular-tip';
    }
    calcularAhorro();
}

function animarNumero(el, valor) {
    const start = 0;
    const end = valor;
    const duration = 700;
    const startTime = performance.now();
    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = 'S/ ' + Math.floor(eased * (end - start) + start).toLocaleString('es-PE');
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

function calcularAhorro() {
    const gasto = parseFloat(document.getElementById('gastoActual').value) || 0;
    if (gasto <= 0) {
        document.getElementById('calcResult').style.display = 'none';
        return;
    }

    // GNV/GLP cuesta ~38-40% del precio de gasolina en Perú
    const factorGNV = esTaxista ? 0.35 : 0.40;
    const gastoGNV = gasto * factorGNV;
    const ahorro = gasto - gastoGNV;
    const inversionEquipo = esTaxista ? 1800 : 2200;
    const mesesRecupero = (inversionEquipo / ahorro).toFixed(1);

    document.getElementById('calcResult').style.display = 'block';
    animarNumero(document.getElementById('resActual'), gasto);
    animarNumero(document.getElementById('resGNV'), Math.round(gastoGNV));
    animarNumero(document.getElementById('resAhorro'), Math.round(ahorro));
    
    const recovery = document.getElementById('resRecovery');
    recovery.textContent = `🚀 Recuperas la inversión del equipo en solo ${mesesRecupero} meses. ¡Después es pura ganancia!`;
}