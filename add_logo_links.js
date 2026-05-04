const fs = require('fs');
const path = require('path');

const directories = ['Inicio', 'Nosotros', 'Servicios', 'Sedes', 'Contacto', 'Publicaciones'];
const baseDir = 'c:/Users/AUTOGAS/Documents/AutoGasB2B/AutoGasWeb';

for (const dir of directories) {
    const fullDir = path.join(baseDir, dir);
    if (!fs.existsSync(fullDir)) continue;
    
    const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.html'));
    
    for (const file of files) {
        const filePath = path.join(fullDir, file);
        let html = fs.readFileSync(filePath, 'utf8');
        
        // Wrap logo images in navbar and footer if not already wrapped
        // Look for <img ... AutoGasLogo2.png ... class="logo"> or class="footer-logo"
        
        // Regex logic:
        // Match <img> tags that contain AutoGasLogo
        // Exclude if immediately preceded by <a href=...>
        // But doing this with regex is tricky. 
        // Let's replace ONLY if it's not preceded by '<a ' (with some whitespace allowance).
        // Since the files are well formatted, we can just replace:
        // <img src="[path]AutoGasLogo[2]?.png" [attributes]>
        
        const imgRegex = /(<img\s+src="[^"]*AutoGasLogo[^"]*\.png"\s+alt="AutoGas(?: Logo)?"\s+class="(?:logo|footer-logo)">)/g;
        
        let changed = false;
        html = html.replace(imgRegex, (match, p1, offset, string) => {
            // check if there's an <a> tag right before it
            const before = string.slice(Math.max(0, offset - 50), offset);
            if (before.includes('<a href="/AutoGasWeb/Inicio/inicio.html"')) {
                return match; // already wrapped
            }
            changed = true;
            return `<a href="/AutoGasWeb/Inicio/inicio.html" style="display:inline-flex; align-items:center;">\n${' '.repeat(8)}${match}\n${' '.repeat(4)}</a>`;
        });
        
        if (changed) {
            fs.writeFileSync(filePath, html, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
}
