import os
import re

base_dir = r'c:\xampp\htdocs\AutoGasWeb'

pages = [
    {'path': 'Inicio/inicio.html', 'root': '../', 'active': 'INICIO'},
    {'path': 'Nosotros/nosotros.html', 'root': '../', 'active': 'NOSOTROS'},
    {'path': 'Servicios/servicios.html', 'root': '../', 'active': 'SERVICIOS'},
    {'path': 'Sedes/sedes.html', 'root': '../', 'active': 'SEDES'},
    {'path': 'Tienda/tienda.html', 'root': '../', 'active': 'TIENDA'},
    {'path': 'Contacto/contacto.html', 'root': '../', 'active': 'COTIZAR'}
]

navbar_template = '''    <!-- ==================== NAVBAR ==================== -->
    <header class="navbar" id="navbar">
        <a href="__ROOT__Inicio/inicio.html" style="display:inline-flex; align-items:center;">
            <img src="__ROOT__Inicio/Imagenes/AutoGasLogo2.png" alt="AutoGas Logo" class="logo">
        </a>
        <nav>
            <ul class="nav-links">
                <li><a href="__ROOT__Inicio/inicio.html"__ACTIVE_INICIO__>INICIO</a></li>
                <li><a href="__ROOT__Nosotros/nosotros.html"__ACTIVE_NOSOTROS__>Nosotros</a></li>
                <li><a href="__ROOT__Servicios/servicios.html"__ACTIVE_SERVICIOS__>Servicios</a></li>
                <li><a href="__ROOT__Sedes/sedes.html"__ACTIVE_SEDES__>Sedes</a></li>
                <li><a href="__ROOT__Tienda/tienda.html"__ACTIVE_TIENDA__>Tienda</a></li>
                <li><a href="__ROOT__Contacto/contacto.html" class="nav-cta"__ACTIVE_CONTACTO__>Cotizar</a></li>
            </ul>
        </nav>
        <div class="hamburger" id="hamburger" onclick="toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>
    <div class="mobile-nav" id="mobileNav">
        <a href="__ROOT__Inicio/inicio.html" onclick="toggleMenu()">Inicio</a>
        <a href="__ROOT__Nosotros/nosotros.html" onclick="toggleMenu()">Nosotros</a>
        <a href="__ROOT__Servicios/servicios.html" onclick="toggleMenu()">Servicios</a>
        <a href="__ROOT__Sedes/sedes.html" onclick="toggleMenu()">Sedes</a>
        <a href="__ROOT__Tienda/tienda.html" onclick="toggleMenu()">Tienda</a>
        <a href="__ROOT__Contacto/contacto.html" onclick="toggleMenu()">Cotizar</a>
    </div>'''

footer_template = '''    <!-- ==================== FOOTER ==================== -->
    <footer class="footer">
        <div class="footer-inner">
            <div class="footer-brand">
                <a href="__ROOT__Inicio/inicio.html">
                    <img src="__ROOT__Inicio/Imagenes/AutoGasLogo2.png" alt="AutoGas" class="footer-logo" />
                </a>
                <p class="footer-tagline">Convierte. Ahorra. Domina.</p>
                <div class="footer-socials">
                    <a href="https://www.instagram.com/autogasica" target="_blank" rel="noopener" aria-label="Instagram">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href="https://www.facebook.com/IcaAutoGas/" target="_blank" rel="noopener" aria-label="Facebook">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="https://www.tiktok.com/@autogas_ica" target="_blank" rel="noopener" aria-label="TikTok">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                    </a>
                </div>
            </div>
            <div class="footer-nav">
                <h4>Navegación</h4>
                <ul>
                    <li><a href="__ROOT__Inicio/inicio.html">Inicio</a></li>
                    <li><a href="__ROOT__Nosotros/nosotros.html">Nosotros</a></li>
                    <li><a href="__ROOT__Servicios/servicios.html">Servicios</a></li>
                    <li><a href="__ROOT__Sedes/sedes.html">Sedes</a></li>
                    <li><a href="__ROOT__Tienda/tienda.html">Tienda</a></li>
                    <li><a href="__ROOT__Contacto/contacto.html">Cotizar</a></li>
                </ul>
            </div>
            <div class="footer-nav">
                <h4>Tienda</h4>
                <ul>
                    <li><a href="#" onclick="verCategoria('aceites');return false;">Aceites y Lubricantes</a></li>
                    <li><a href="#" onclick="verCategoria('repuestos');return false;">Repuestos</a></li>
                    <li><a href="#" onclick="verCategoria('refrigerantes');return false;">Refrigerantes</a></li>
                    <li><a href="#" onclick="verCategoria('filtros');return false;">Filtros y Componentes</a></li>
                </ul>
            </div>
            <div class="footer-contact">
                <h4>Contacto</h4>
                <ul>
                    <li>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        7 Sedes en todo el Perú
                    </li>
                    <li>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 010 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
                        WhatsApp por sede
                    </li>
                    <li>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        contacto@autogas.pe
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 AutoGas Perú. Todos los derechos reservados.</p>
            <p>Diseñado para quienes exigen lo mejor.</p>
        </div>
    </footer>'''

for page in pages:
    file_path = os.path.join(base_dir, page['path'])
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Generate specific navbar
    nav = navbar_template.replace('__ROOT__', page['root'])
    # clear actives
    nav = nav.replace('__ACTIVE_INICIO__', '')
    nav = nav.replace('__ACTIVE_NOSOTROS__', '')
    nav = nav.replace('__ACTIVE_SERVICIOS__', '')
    nav = nav.replace('__ACTIVE_SEDES__', '')
    nav = nav.replace('__ACTIVE_TIENDA__', '')
    nav = nav.replace('__ACTIVE_CONTACTO__', '')
    
    # set active
    active_map = {
        'INICIO': '__ACTIVE_INICIO__',
        'NOSOTROS': '__ACTIVE_NOSOTROS__',
        'SERVICIOS': '__ACTIVE_SERVICIOS__',
        'SEDES': '__ACTIVE_SEDES__',
        'TIENDA': '__ACTIVE_TIENDA__',
        'COTIZAR': '__ACTIVE_CONTACTO__'
    }
    nav_to_insert = nav
    if page['active']:
        if page['active'] == 'COTIZAR':
            nav_to_insert = nav.replace('class="nav-cta"', 'class="nav-cta active"')
        else:
            nav_to_insert = nav.replace(f'__ACTIVE_{page["active"]}__', ' class="nav-link active"')
    
    # Remove all markers
    nav_to_insert = re.sub(r'__ACTIVE_[A-Z]+__', '', nav_to_insert)

    # Reemplazo seguro del navbar
    # El navbar original empieza en <!--.*?NAVBAR.*?--> o <header class="navbar" o <nav class="navbar"
    # y termina en <div class="mobile-nav".*?</div>
    nav_pattern = r'(?s)(<!--\s*=*?\s*NAVBAR\s*=*?\s*-->\s*<(?:header|nav)\s+class="navbar".*?<div\s+class="mobile-nav".*?</div>)'
    content = re.sub(nav_pattern, nav_to_insert, content, count=1)
    
    # Generate footer
    foot_to_insert = footer_template.replace('__ROOT__', page['root'])
    foot_pattern = r'(?s)(<!--\s*=*?\s*FOOTER\s*=*?\s*-->\s*)?<footer\b[^>]*>.*?</footer>'
    content = re.sub(foot_pattern, foot_to_insert, content, count=1)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Patched: {page['path']}")
