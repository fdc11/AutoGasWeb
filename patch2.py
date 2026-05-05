import os
import re

base_dir = r'c:\xampp\htdocs\AutoGasWeb'
pages = [
    {'path': 'Inicio/inicio.html'},
    {'path': 'Nosotros/nosotros.html'},
    {'path': 'Servicios/servicios.html'},
    {'path': 'Sedes/sedes.html'},
    {'path': 'Tienda/tienda.html'},
    {'path': 'Contacto/contacto.html'}
]

for page in pages:
    file_path = os.path.join(base_dir, page['path'])
    if not os.path.exists(file_path): continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Limpiar cualquier </nav> residual despues del mobile-nav
    # o </header> residual.
    # El mobile nav fue inyectado correctamente, busquemos:
    # </div>\s*</nav>\s*<!-- =+ HERO
    content = re.sub(r'(</div>\s*)</nav>\s*(?=<!--)', r'\1', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
