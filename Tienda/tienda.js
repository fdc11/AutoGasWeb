// =============================================
// NÚMEROS DE WHATSAPP POR SEDE
// =============================================
const WSP_SEDES = {
    '1': '51978421654',   // Ica
    '2': '51942623696',   // Lima
    '3': '51937695830',   // Trujillo
    '5': '51942867212',   // Huancayo
    '6': '51939067488',   // Nasca
    '7': '51975338252',   // Arequipa
};

const NOMBRES_SEDES = {
    '1': 'Ica', '2': 'Lima', '3': 'Trujillo',
    '5': 'Huancayo', '6': 'Nasca', '7': 'Arequipa'
};

// =============================================
// CATÁLOGO DE PRODUCTOS
// =============================================
// Precios en 0.00 a propósito: la administradora carga los precios reales.
// Fotos: Imagenes/Productos/<código>.webp (convertidas a WebP de máx. 800 px desde las carpetas por categoría).
const CATALOGO = {
    aceites: {
        label: 'Aceites y Lubricantes',
        productos: [
            { id: 'p10110456', sku: '10110456', marca: "ACDelco", nombre: "Aceite ACDelco 5W-30 1 GL", desc: "Aceite de motor · 5W-30 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10110456.webp' },
            { id: 'p10110803', sku: '10110803', marca: "ACDelco", nombre: "Full Synthetic SAE 10W-30 1 L", desc: "Aceite de motor sintético · 10W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110803.webp' },
            { id: 'p10110389', sku: '10110389', marca: "Castrol", nombre: "Aceite para engranajes 8W-90", desc: "Aceite de transmisión · 8W-90", precio: 0.00, img: 'Imagenes/Productos/10110389.webp' },
            { id: 'p10110919', sku: '10110919', marca: "Castrol", nombre: "Axle GL-5 80W-90 1 L", desc: "Aceite de diferencial · 80W-90 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110919.webp' },
            { id: 'p10110635', sku: '10110635', marca: "Castrol", nombre: "Edge 5W-40 1 L", desc: "Aceite de motor sintético · 5W-40 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110635.webp' },
            { id: 'p10110640', sku: '10110640', marca: "Castrol", nombre: "Edge 5W-40 4 L", desc: "Aceite de motor sintético · 5W-40 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10110640.webp' },
            { id: 'p10110380', sku: '10110380', marca: "Castrol", nombre: "GTX 10W-30 1 L", desc: "Aceite de motor · 10W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110380.webp' },
            { id: 'p10110937', sku: '10110937', marca: "Castrol", nombre: "GTX 10W-30 4 L", desc: "Aceite de motor · 10W-30 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10110937.webp' },
            { id: 'p10110800', sku: '10110800', marca: "Castrol", nombre: "GTX Full Synthetic 5W-30 1 GL", desc: "Aceite de motor sintético · 5W-30 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10110800.webp' },
            { id: 'p10110799', sku: '10110799', marca: "Castrol", nombre: "GTX Full Synthetic 5W-30 1 L", desc: "Aceite de motor sintético · 5W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110799.webp' },
            { id: 'p10110014', sku: '10110014', marca: "Castrol", nombre: "GTX Gas 20W-50 1 GL", desc: "Aceite de motor · 20W-50 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10110014.webp' },
            { id: 'p10110015', sku: '10110015', marca: "Castrol", nombre: "GTX Gas 20W-50 1 L", desc: "Aceite de motor · 20W-50 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110015.webp' },
            { id: 'p10110279', sku: '10110279', marca: "Castrol", nombre: "HD SAE 50", desc: "Aceite de motor · SAE 50 · Protección contra la descomposición térmica", precio: 0.00, img: 'Imagenes/Productos/10110279.webp' },
            { id: 'p10110023', sku: '10110023', marca: "Castrol", nombre: "Magnatec 10W-30 1 GL", desc: "Aceite de motor · 10W-30 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10110023.webp' },
            { id: 'p10110024', sku: '10110024', marca: "Castrol", nombre: "Magnatec 10W-30 1 L", desc: "Aceite de motor · 10W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110024.webp' },
            { id: 'p10110025', sku: '10110025', marca: "Castrol", nombre: "Magnatec 10W-40 1 GL", desc: "Aceite de motor · 10W-40 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10110025.webp' },
            { id: 'p10110401', sku: '10110401', marca: "Castrol", nombre: "Magnatec 10W-40 1 L", desc: "Aceite de motor · 10W-40 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110401.webp' },
            { id: 'p10110071', sku: '10110071', marca: "Castrol", nombre: "Magnatec 20W-50 1 GL", desc: "Aceite de motor · 20W-50 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10110071.webp' },
            { id: 'p10110070', sku: '10110070', marca: "Castrol", nombre: "Magnatec 20W-50 1 L", desc: "Aceite de motor · 20W-50 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110070.webp' },
            { id: 'p10110084', sku: '10110084', marca: "Castrol", nombre: "Magnatec 5W-40 1 L", desc: "Aceite de motor · 5W-40 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110084.webp' },
            { id: 'p10110026', sku: '10110026', marca: "Castrol", nombre: "Magnatec Stop-Start 5W-30 1 GL", desc: "Aceite de motor · 5W-30 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10110026.webp' },
            { id: 'p10110033', sku: '10110033', marca: "Castrol", nombre: "Magnatec Stop-Start 5W-30 1 L", desc: "Aceite de motor · 5W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110033.webp' },
            { id: 'p10110634', sku: '10110634', marca: "Castrol", nombre: "Transmax 75W-90 1 L", desc: "Aceite de transmisión · 75W-90 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110634.webp' },
            { id: 'p10110597', sku: '10110597', marca: "Castrol", nombre: "Vecton LD 15W-40 1 GL", desc: "Aceite de motor diésel · 15W-40 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10110597.webp' },
            { id: 'p10110777', sku: '10110777', marca: "Chevron", nombre: "Semisintético 10W-30 1 L", desc: "Aceite de motor semisintético · 10W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110777.webp' },
            { id: 'p10110490', sku: '10110490', marca: "Chevron", nombre: "Semisintético 20W-50 1 L", desc: "Aceite de motor semisintético · 20W-50 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110490.webp' },
            { id: 'p10111119', sku: '10111119', marca: "Liqui Moly", nombre: "Aceite de caja GL4-GL5 sintético 75W-90 1 L (LM1407)", desc: "Aceite de transmisión sintético · 75W-90 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10111119.webp' },
            { id: 'p10111120', sku: '10111120', marca: "Liqui Moly", nombre: "Aceite de caja GL5 sintético 75W-90 1 L", desc: "Aceite de transmisión sintético · 75W-90 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10111120.webp' },
            { id: 'p10111114', sku: '10111114', marca: "Liqui Moly", nombre: "Aceite de caja sintético 75W-140 1 L", desc: "Aceite de transmisión sintético · 75W-140 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10111114.webp' },
            { id: 'p10110559', sku: '10110559', marca: "Liqui Moly", nombre: "Aceite para caja de doble embrague 8100", desc: "Aceite de transmisión DCT", precio: 0.00, img: 'Imagenes/Productos/10110559.webp' },
            { id: 'p10111240', sku: '10111240', marca: "Liqui Moly", nombre: "Aceite para diésel 15W-40 1 GL", desc: "Aceite de motor diésel · 15W-40 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10111240.webp' },
            { id: 'p10110200', sku: '10110200', marca: "Liqui Moly", nombre: "Aceite para diésel sin aditivo 15W-40 1 GL", desc: "Aceite de motor diésel · 15W-40 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10110200.webp' },
            { id: 'p10111131', sku: '10111131', marca: "Liqui Moly", nombre: "Molygen New Generation 0W-20 1 L", desc: "Aceite de motor sintético · 0W-20 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10111131.webp' },
            { id: 'p10111132', sku: '10111132', marca: "Liqui Moly", nombre: "Molygen New Generation 0W-20 4 L", desc: "Aceite de motor sintético · 0W-20 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10111132.webp' },
            { id: 'p10110935', sku: '10110935', marca: "Liqui Moly", nombre: "Molygen New Generation 10W-30 1 L", desc: "Aceite de motor · 10W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110935.webp' },
            { id: 'p10110928', sku: '10110928', marca: "Liqui Moly", nombre: "Molygen New Generation 10W-30 4 L", desc: "Aceite de motor · 10W-30 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10110928.webp' },
            { id: 'p10111129', sku: '10111129', marca: "Liqui Moly", nombre: "Molygen New Generation 10W-40 1 L", desc: "Aceite de motor · 10W-40 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10111129.webp' },
            { id: 'p10111130', sku: '10111130', marca: "Liqui Moly", nombre: "Molygen New Generation 10W-40 4 L / 1 GL", desc: "Aceite de motor · 10W-40 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10111130.webp' },
            { id: 'p10110929', sku: '10110929', marca: "Liqui Moly", nombre: "Molygen New Generation 5W-30 1 L", desc: "Aceite de motor sintético · 5W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110929.webp' },
            { id: 'p10111319', sku: '10111319', marca: "Liqui Moly", nombre: "Molygen New Generation 5W-30 1 L (cilindro)", desc: "Aceite de motor sintético · 5W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10111319.webp' },
            { id: 'p10111212', sku: '10111212', marca: "Liqui Moly", nombre: "Molygen New Generation 5W-30 4 L", desc: "Aceite de motor sintético · 5W-30 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10111212.webp' },
            { id: 'p10110470', sku: '10110470', marca: "Liqui Moly", nombre: "Molygen New Generation DPF 5W-30 4 L", desc: "Aceite de motor sintético · 5W-30 · 4 litros · Para filtro de partículas", precio: 0.00, img: 'Imagenes/Productos/10110470.webp' },
            { id: 'p10111127', sku: '10111127', marca: "Liqui Moly", nombre: "Molygen New Generation 5W-40 1 L", desc: "Aceite de motor sintético · 5W-40 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10111127.webp' },
            { id: 'p10111128', sku: '10111128', marca: "Liqui Moly", nombre: "Molygen New Generation 5W-40 4 L", desc: "Aceite de motor sintético · 5W-40 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10111128.webp' },
            { id: 'p10111125', sku: '10111125', marca: "Liqui Moly", nombre: "Special Tec AA 0W-20 1 L", desc: "Aceite de motor sintético · 0W-20 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10111125.webp' },
            { id: 'p10111126', sku: '10111126', marca: "Liqui Moly", nombre: "Special Tec AA 0W-20 4 L", desc: "Aceite de motor sintético · 0W-20 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10111126.webp' },
            { id: 'p10110970', sku: '10110970', marca: "Liqui Moly", nombre: "Special Tec AA 10W-30 1 L", desc: "Aceite de motor · 10W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110970.webp' },
            { id: 'p10110855', sku: '10110855', marca: "Liqui Moly", nombre: "Special Tec AA 10W-30 4 L", desc: "Aceite de motor · 10W-30 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10110855.webp' },
            { id: 'p10110968', sku: '10110968', marca: "Liqui Moly", nombre: "Special Tec AA 5W-30 1 L", desc: "Aceite de motor sintético · 5W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110968.webp' },
            { id: 'p10110925', sku: '10110925', marca: "Liqui Moly", nombre: "Special Tec AA 5W-30 4 L", desc: "Aceite de motor sintético · 5W-30 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10110925.webp' },
            { id: 'p10111116', sku: '10111116', marca: "Liqui Moly", nombre: "Top Tec 4100 5W-40 1 L", desc: "Aceite de motor sintético · 5W-40 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10111116.webp' },
            { id: 'p10111115', sku: '10111115', marca: "Liqui Moly", nombre: "Top Tec 4100 5W-40 4 L", desc: "Aceite de motor sintético · 5W-40 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10111115.webp' },
            { id: 'p10111225', sku: '10111225', marca: "Liqui Moly", nombre: "Top Tec 4100 5W-40 5 L", desc: "Aceite de motor sintético · 5W-40 · 5 litros", precio: 0.00, img: 'Imagenes/Productos/10111225.webp' },
            { id: 'p10111243', sku: '10111243', marca: "Liqui Moly", nombre: "Top Tec 4200 5W-30 5 L", desc: "Aceite de motor sintético · 5W-30 · 5 litros", precio: 0.00, img: 'Imagenes/Productos/10111243.webp' },
            { id: 'p10111118', sku: '10111118', marca: "Liqui Moly", nombre: "Top Tec 4300 5W-30 1 L", desc: "Aceite de motor sintético · 5W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10111118.webp' },
            { id: 'p10111117', sku: '10111117', marca: "Liqui Moly", nombre: "Top Tec 4300 5W-30 5 L", desc: "Aceite de motor sintético · 5W-30 · 5 litros", precio: 0.00, img: 'Imagenes/Productos/10111117.webp' },
            { id: 'p10110560', sku: '10110560', marca: "Liqui Moly", nombre: "Top Tec ATF 1200 (LM3681)", desc: "Aceite para transmisión automática", precio: 0.00, img: 'Imagenes/Productos/10110560.webp' },
            { id: 'p10111222', sku: '10111222', marca: "Liqui Moly", nombre: "Top Tec ATF 1400", desc: "Aceite para transmisión automática", precio: 0.00, img: 'Imagenes/Productos/10111222.webp' },
            { id: 'p10111223', sku: '10111223', marca: "Liqui Moly", nombre: "Top Tec ATF 1800", desc: "Aceite para transmisión automática", precio: 0.00, img: 'Imagenes/Productos/10111223.webp' },
            { id: 'p10110585', sku: '10110585', marca: "Mobil", nombre: "Mobil 1 Premium 5W-30 1 GL", desc: "Aceite de motor sintético · 5W-30 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10110585.webp' },
            { id: 'p10110434', sku: '10110434', marca: "Mobil", nombre: "Super Gas 10W-30 1 L", desc: "Aceite de motor · 10W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110434.webp' },
            { id: 'p10110579', sku: '10110579', marca: "Mobil", nombre: "Super Gas 10W-30 1 GL", desc: "Aceite de motor · 10W-30 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10110579.webp' },
            { id: 'p10110433', sku: '10110433', marca: "Mobil", nombre: "Super Gas 5W-30 1 L", desc: "Aceite de motor · 5W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110433.webp' },
            { id: 'p10110568', sku: '10110568', marca: "Mobil", nombre: "Super Gas 5W-30 1 GL", desc: "Aceite de motor · 5W-30 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10110568.webp' },
            { id: 'p10110563', sku: '10110563', marca: "Mobil", nombre: "Super Sintético 100% 5W-30 1 L", desc: "Aceite de motor sintético · 5W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110563.webp' },
            { id: 'p10110017', sku: '10110017', marca: "Shell", nombre: "Helix HX5 20W-50 1 L", desc: "Aceite de motor · 20W-50 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110017.webp' },
            { id: 'p10110018', sku: '10110018', marca: "Shell", nombre: "Helix HX5 20W-50 4 L", desc: "Aceite de motor · 20W-50 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10110018.webp' },
            { id: 'p10110019', sku: '10110019', marca: "Shell", nombre: "Helix HX7 10W-30 1 L", desc: "Aceite de motor · 10W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110019.webp' },
            { id: 'p10110020', sku: '10110020', marca: "Shell", nombre: "Helix HX7 10W-30 4 L", desc: "Aceite de motor · 10W-30 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10110020.webp' },
            { id: 'p10110399', sku: '10110399', marca: "Shell", nombre: "Helix HX7 Professional 10W-40 1 L", desc: "Aceite de motor · 10W-40 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110399.webp' },
            { id: 'p10110403', sku: '10110403', marca: "Shell", nombre: "Helix HX7 Professional 10W-40 4 L", desc: "Aceite de motor · 10W-40 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10110403.webp' },
            { id: 'p10110021', sku: '10110021', marca: "Shell", nombre: "Helix HX8 Professional 5W-30 1 L", desc: "Aceite de motor sintético · 5W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110021.webp' },
            { id: 'p10110022', sku: '10110022', marca: "Shell", nombre: "Helix HX8 Professional 5W-30 4 L", desc: "Aceite de motor sintético · 5W-30 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10110022.webp' },
            { id: 'p10110274', sku: '10110274', marca: "Shell", nombre: "Helix Ultra 5W-30 1 L", desc: "Aceite de motor sintético · 5W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110274.webp' },
            { id: 'p10110921', sku: '10110921', marca: "Shell", nombre: "Helix Ultra 5W-30 4 L", desc: "Aceite de motor sintético · 5W-30 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10110921.webp' },
            { id: 'p10110599', sku: '10110599', marca: "Vistony", nombre: "Attom S300 5W-30 1 GL", desc: "Aceite de motor · 5W-30 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10110599.webp' },
            { id: 'p10110665', sku: '10110665', marca: "Vistony", nombre: "Attom S400 5W-30 API SQ 1 L", desc: "Aceite de motor · 5W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110665.webp' },
            { id: 'p10110648', sku: '10110648', marca: "Vistony", nombre: "Attom S400 5W-30 API SQ 1 GL", desc: "Aceite de motor · 5W-30 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10110648.webp' },
            { id: 'p10110601', sku: '10110601', marca: "Vistony", nombre: "Blindax Super Gas 20W-50 1 GL", desc: "Aceite de motor · 20W-50 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10110601.webp' },
            { id: 'p10110656', sku: '10110656', marca: "Vistony", nombre: "Sintek S200 10W-30 1 L", desc: "Aceite de motor · 10W-30 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110656.webp' },
            { id: 'p10110600', sku: '10110600', marca: "Vistony", nombre: "Sintek S200 10W-30 1 GL", desc: "Aceite de motor · 10W-30 · 1 galón", precio: 0.00, img: 'Imagenes/Productos/10110600.webp' },
            { id: 'p10110655', sku: '10110655', marca: "Vistony", nombre: "Sintek S210 10W-40 1 L", desc: "Aceite de motor · 10W-40 · 1 litro", precio: 0.00, img: 'Imagenes/Productos/10110655.webp' },
            { id: 'p10110657', sku: '10110657', marca: "Vistony", nombre: "Sintek S210 10W-40 4 L", desc: "Aceite de motor · 10W-40 · 4 litros", precio: 0.00, img: 'Imagenes/Productos/10110657.webp' },
            { id: 'p10110004', sku: '10110004', marca: "Valvoline", nombre: "Aceite ATF (Mercon / Dexron III) para dirección", desc: "Aceite para dirección hidráulica", precio: 0.00, img: 'Imagenes/Productos/10110004.webp' },
        ]
    },
    repuestos: {
        label: 'Repuestos',
        productos: [
            { id: 'p10110729', sku: '10110729', marca: "Genérico", nombre: "Sello de tapón de drenaje del cárter", desc: "Para el tapón de drenaje del aceite de motor", precio: 0.00, img: 'Imagenes/Productos/10110729.webp' },
        ]
    },
    refrigerantes: {
        label: 'Refrigerantes',
        productos: [
        ]
    },
    filtros: {
        label: 'Filtros y Componentes',
        productos: [
            { id: 'p10111291', sku: '10111291', marca: "ACDelco", nombre: "Elemento filtro de aceite 93171212", desc: "Compatible con Chevrolet Equinox, Orlando, Captiva 2.4", precio: 0.00, img: 'Imagenes/Productos/10111291.webp' },
            { id: 'p10111289', sku: '10111289', marca: "ACDelco", nombre: "Filtro de aceite 12737086", desc: "Compatible con Chevrolet Captiva 1.5", precio: 0.00, img: 'Imagenes/Productos/10111289.webp' },
            { id: 'p10110639', sku: '10110639', marca: "Bosch", nombre: "Filtro de aceite 0986AF1042", desc: "Compatible con Ford Ranger, Suzuki Jimny, Swift, Toyota Hilux, Land Cruiser, 4Runner", precio: 0.00, img: 'Imagenes/Productos/10110639.webp' },
            { id: 'p10110588', sku: '10110588', marca: "Bosch", nombre: "Filtro de aceite 90915-YZZE1", desc: "Compatible con Toyota Tercel, Yaris, Probox", precio: 0.00, img: 'Imagenes/Productos/10110588.webp' },
            { id: 'p10111139', sku: '10111139', marca: "Filcar", nombre: "Elemento filtro de aceite 26350-2J000", desc: "Compatible con Hyundai Elantra, Sonata, Tucson, Kia Sportage", precio: 0.00, img: 'Imagenes/Productos/10111139.webp' },
            { id: 'p10110755', sku: '10110755', marca: "Hyundai", nombre: "Filtro de aceite 26300-02752", desc: "Compatible con Kia Picanto, Rio, Hyundai Accent, Soluto, Verna, Nissan Frontier 2.4L, Mitsubishi L200 2.4L", precio: 0.00, img: 'Imagenes/Productos/10110755.webp' },
            { id: 'p10110079', sku: '10110079', marca: "Hyundai", nombre: "Filtro de aceite 26300-2Y500", desc: "Compatible con Kia Rio, Picanto, Mazda 2, CX-5, Mazda 3", precio: 0.00, img: 'Imagenes/Productos/10110079.webp' },
            { id: 'p10110080', sku: '10110080', marca: "Hyundai", nombre: "Filtro de aceite 26300-35505", desc: "Compatible con Kia Sorento, Hyundai Elantra, Sonata, Santa Fe, Tucson, Great Wall H3", precio: 0.00, img: 'Imagenes/Productos/10110080.webp' },
            { id: 'p10111302', sku: '10111302', marca: "Hyundai", nombre: "Filtro de aceite 26320-2F000", desc: "Compatible con Hyundai Santa Fe II 06-12, Kia Sorento II, Kia Carnival, Tucson", precio: 0.00, img: 'Imagenes/Productos/10111302.webp' },
            { id: 'p10110510', sku: '10110510', marca: "Hyundai", nombre: "Filtro de aceite 26330-4A001", desc: "Compatible con Hyundai H100, H-1, H-350, Kia K2700 (rosca M26x1.5)", precio: 0.00, img: 'Imagenes/Productos/10110510.webp' },
            { id: 'p10111300', sku: '10111300', marca: "Hyundai", nombre: "Filtro de aceite 26350-2S000", desc: "Compatible con Hyundai Tucson, Kia Sportage, Sorento, Santa Fe 2.5L 20-22", precio: 0.00, img: 'Imagenes/Productos/10111300.webp' },
            { id: 'p10111154', sku: '10111154', marca: "IHP", nombre: "Elemento filtro de aceite 11427635557", desc: "Compatible con BMW 316i", precio: 0.00, img: 'Imagenes/Productos/10111154.webp' },
            { id: 'p10111165', sku: '10111165', marca: "IHP", nombre: "Elemento filtro de aceite SH40X20136", desc: "Compatible con Foton Aucan, Changan Hunter F70, JAC T6", precio: 0.00, img: 'Imagenes/Productos/10111165.webp' },
            { id: 'p10110672', sku: '10110672', marca: "Kusa", nombre: "Filtro de aceite 06D115562", desc: "Compatible con Volkswagen Golf, Amarok VI 2009 (059115651G / 06D115466)", precio: 0.00, img: 'Imagenes/Productos/10110672.webp' },
            { id: 'p10110471', sku: '10110471', marca: "Kusa", nombre: "Filtro de aceite 3007", desc: "Compatible con Kia, Hyundai (rosca 20x1.5)", precio: 0.00, img: 'Imagenes/Productos/10110471.webp' },
            { id: 'p10110404', sku: '10110404', marca: "Kusa", nombre: "Filtro de aceite 3001", desc: "Compatible con Toyota Yaris (rosca 3/4-16)", precio: 0.00, img: 'Imagenes/Productos/10110404.webp' },
            { id: 'p10110949', sku: '10110949', marca: "Genérico", nombre: "Elemento filtro de aceite 26350-2M000", desc: "Compatible con Hyundai Accent, Elantra 1.6 20-up, Kia Rio 1.6 20-up", precio: 0.00, img: 'Imagenes/Productos/10110949.webp' },
            { id: 'p10110093', sku: '10110093', marca: "Maxfil", nombre: "Filtro de aceite 04152-0R010", desc: "Compatible con Toyota 4Runner 2007 (ML19547)", precio: 0.00, img: 'Imagenes/Productos/10110093.webp' },
            { id: 'p10110088', sku: '10110088', marca: "Maxfil", nombre: "Filtro de aceite 1056022300", desc: "Compatible con Geely Okavango, Coolray", precio: 0.00, img: 'Imagenes/Productos/10110088.webp' },
            { id: 'p10110078', sku: '10110078', marca: "Maxfil", nombre: "Filtro de aceite 1109.X3", desc: "Compatible con Peugeot Boxer, Citroën Jumper, Fiat Fiorino (EO-24070)", precio: 0.00, img: 'Imagenes/Productos/10110078.webp' },
            { id: 'p10110091', sku: '10110091', marca: "Maxfil", nombre: "Filtro de aceite 15208-BN30A", desc: "Compatible con Nissan Frontier, NP300", precio: 0.00, img: 'Imagenes/Productos/10110091.webp' },
            { id: 'p10110092', sku: '10110092', marca: "Maxfil", nombre: "Filtro de aceite 16400-3XN1A", desc: "Compatible con Nissan Urban", precio: 0.00, img: 'Imagenes/Productos/10110092.webp' },
            { id: 'p10110090', sku: '10110090', marca: "Maxfil", nombre: "Filtro de aceite 16405-01T70", desc: "Compatible con Nissan Frontier, Navara, Urban", precio: 0.00, img: 'Imagenes/Productos/10110090.webp' },
            { id: 'p10110296', sku: '10110296', marca: "Maxfil", nombre: "Filtro de aceite 7701070114", desc: "Compatible con Nissan NP300, Qashqai", precio: 0.00, img: 'Imagenes/Productos/10110296.webp' },
            { id: 'p10111303', sku: '10111303', marca: "Millard", nombre: "Filtro de aceite 030115561P", desc: "Compatible con Volkswagen Golf, Polo, Jetta", precio: 0.00, img: 'Imagenes/Productos/10111303.webp' },
            { id: 'p10111175', sku: '10111175', marca: "Millard", nombre: "Filtro de aceite ML-321", desc: "Compatible con Ford Escape, Fusion, Mazda 3, 5, 6, CX-7", precio: 0.00, img: 'Imagenes/Productos/10111175.webp' },
            { id: 'p10110297', sku: '10110297', marca: "Millard", nombre: "Filtro de aceite ML10060", desc: "Compatible con Chevrolet Captiva, Colorado, Silverado", precio: 0.00, img: 'Imagenes/Productos/10110297.webp' },
            { id: 'p10110300', sku: '10110300', marca: "Millard", nombre: "Filtro de aceite ML11212", desc: "Compatible con Hyundai Elantra, Tucson, Kia Sorento", precio: 0.00, img: 'Imagenes/Productos/10110300.webp' },
            { id: 'p10110792', sku: '10110792', marca: "Millard", nombre: "Filtro de aceite ML3387", desc: "Compatible con Chevrolet Onix, Prisma, Spin, Aveo 1.6, Mitsubishi Montero", precio: 0.00, img: 'Imagenes/Productos/10110792.webp' },
            { id: 'p10110791', sku: '10110791', marca: "Millard", nombre: "Filtro de aceite ML3593", desc: "Compatible con Kia Picanto, Rio, Hyundai Accent, Soluto, Verna, Nissan Frontier 2.4L, Mitsubishi L200 2.4L", precio: 0.00, img: 'Imagenes/Productos/10110791.webp' },
            { id: 'p10111207', sku: '10111207', marca: "Millard", nombre: "Filtro de aceite ML3600", desc: "Compatible con Chery Grand Tiger 4x2 (12-14), Ford EcoSport (04-05), Fiesta (01-04), Focus (01-08), Jeep Cherokee Liberty", precio: 0.00, img: 'Imagenes/Productos/10111207.webp' },
            { id: 'p10110794', sku: '10110794', marca: "Millard", nombre: "Filtro de aceite ML3614", desc: "Compatible con Ford Fiesta, EcoSport, Mazda BT-50, Suzuki Grand Vitara, Toyota 4Runner", precio: 0.00, img: 'Imagenes/Productos/10110794.webp' },
            { id: 'p10110795', sku: '10110795', marca: "Millard", nombre: "Filtro de aceite ML3807", desc: "Compatible con Kia Sorento, Hyundai Elantra, Sonata, Santa Fe, Tucson, Great Wall H3", precio: 0.00, img: 'Imagenes/Productos/10110795.webp' },
            { id: 'p10110606', sku: '10110606', marca: "Millard", nombre: "Filtro de aceite ML4967", desc: "Compatible con Geely Cross 1.5, Toyota Avensis, Corolla, RAV4, Tercel", precio: 0.00, img: 'Imagenes/Productos/10110606.webp' },
            { id: 'p10111237', sku: '10111237', marca: "Millard", nombre: "Filtro de aceite ML49675", desc: "Compatible con Geely Cross 1.5, Toyota Avensis, Corolla, RAV4, Tercel", precio: 0.00, img: 'Imagenes/Productos/10111237.webp' },
            { id: 'p10110798', sku: '10110798', marca: "Millard", nombre: "Filtro de aceite ML4997", desc: "Compatible con Chevrolet Spark, Chery, Daewoo Tico, Lifan, Suzuki, Toyota", precio: 0.00, img: 'Imagenes/Productos/10110798.webp' },
            { id: 'p10110295', sku: '10110295', marca: "Millard", nombre: "Filtro de aceite ML5548", desc: "Compatible con Volkswagen CrossFox, Golf, Polo 1.6", precio: 0.00, img: 'Imagenes/Productos/10110295.webp' },
            { id: 'p10110074', sku: '10110074', marca: "Millard", nombre: "Filtro de aceite ML57961", desc: "Compatible con Renault, Mitsubishi L200 2.4L", precio: 0.00, img: 'Imagenes/Productos/10110074.webp' },
            { id: 'p10110082', sku: '10110082', marca: "Millard", nombre: "Filtro de aceite ML92095", desc: "Compatible con Chevrolet Sail, Aveo, Spark GT, Aveo 1.2L", precio: 0.00, img: 'Imagenes/Productos/10110082.webp' },
            { id: 'p10110069', sku: '10110069', marca: "Millard", nombre: "Filtro de aceite ML96796", desc: "Compatible con Toyota Corolla, Yaris 1.3L, Corolla 1.3L 09-14", precio: 0.00, img: 'Imagenes/Productos/10110069.webp' },
            { id: 'p10110977', sku: '10110977', marca: "Renault", nombre: "Filtro de aceite 7700730077", desc: "Compatible con Jeep Cherokee 87-90, Comanche, Wagoneer 87-90, Wrangler 87-90", precio: 0.00, img: 'Imagenes/Productos/10110977.webp' },
            { id: 'p10110638', sku: '10110638', marca: "Wanlanda", nombre: "Filtro de aceite WO-51502", desc: "Compatible con Peugeot (BLS-87 / C-2105 / ML5566)", precio: 0.00, img: 'Imagenes/Productos/10110638.webp' },
            { id: 'p10110484', sku: '10110484', marca: "Genérico", nombre: "Elemento filtro de aceite 1017100XED95", desc: "Compatible con Great Wall Poer Pick Up", precio: 0.00, img: 'Imagenes/Productos/10110484.webp' },
            { id: 'p10110280', sku: '10110280', marca: "Genérico", nombre: "Elemento filtro de aceite 12605566", desc: "Compatible con Chevrolet Captiva 2.4 (FPL-3014K / ML9018)", precio: 0.00, img: 'Imagenes/Productos/10110280.webp' },
            { id: 'p10110473', sku: '10110473', marca: "Genérico", nombre: "Elemento filtro de aceite 68079744AA", desc: "Compatible con Jeep Grand Cherokee, Chrysler, Dodge Caravan, Volkswagen", precio: 0.00, img: 'Imagenes/Productos/10110473.webp' },
            { id: 'p10110486', sku: '10110486', marca: "Genérico", nombre: "Filtro de aceite 06L-115-562", desc: "Compatible con Volkswagen Golf, Passat, Tiguan 16", precio: 0.00, img: 'Imagenes/Productos/10110486.webp' },
            { id: 'p10110637', sku: '10110637', marca: "Genérico", nombre: "Filtro de aceite 06K115562", desc: "Compatible con Volkswagen Tiguan, Polo, Audi 2014", precio: 0.00, img: 'Imagenes/Productos/10110637.webp' },
            { id: 'p10110618', sku: '10110618', marca: "Genérico", nombre: "Filtro de aceite 1017110XED95", desc: "Compatible con Great Wall Haval, Poer", precio: 0.00, img: 'Imagenes/Productos/10110618.webp' },
            { id: 'p10110694', sku: '10110694', marca: "Genérico", nombre: "Filtro de aceite 1012014-FD2301", desc: "Compatible con Dongfeng ZNA 2022, Rich 7", precio: 0.00, img: 'Imagenes/Productos/10110694.webp' },
            { id: 'p10110693', sku: '10110693', marca: "Genérico", nombre: "Filtro de aceite Dongfeng Rich 7", desc: "Compatible con Dongfeng ZNA 2022, Rich 7", precio: 0.00, img: 'Imagenes/Productos/10110693.webp' },
            { id: 'p10110509', sku: '10110509', marca: "Genérico", nombre: "Filtro de aceite 1010301FA", desc: "Compatible con Foton Forland TM2, JAC camioncito (BLS-1001 / DL-212)", precio: 0.00, img: 'Imagenes/Productos/10110509.webp' },
            { id: 'p10110595', sku: '10110595', marca: "Genérico", nombre: "Filtro de aceite 1010320FD060", desc: "Compatible con JAC T8, T6 (rosca M20x1.5)", precio: 0.00, img: 'Imagenes/Productos/10110595.webp' },
            { id: 'p10110325', sku: '10110325', marca: "Genérico", nombre: "Filtro de aceite 1010320FE010", desc: "Compatible con JAC Pickup T6, T8", precio: 0.00, img: 'Imagenes/Productos/10110325.webp' },
            { id: 'p10110292', sku: '10110292', marca: "Genérico", nombre: "Filtro de aceite 10103320FE010", desc: "Compatible con JAC Pickup T6, T8 (8104102P3010)", precio: 0.00, img: 'Imagenes/Productos/10110292.webp' },
            { id: 'p10110508', sku: '10110508', marca: "Genérico", nombre: "Filtro de aceite 1109-AL", desc: "Compatible con Peugeot, Citroën", precio: 0.00, img: 'Imagenes/Productos/10110508.webp' },
            { id: 'p10110485', sku: '10110485', marca: "Genérico", nombre: "Filtro de aceite 1109-T3", desc: "Compatible con Suzuki SX4 1.6L 07, Mini Cooper 06-10, Ford Fiesta MK7 1.5L", precio: 0.00, img: 'Imagenes/Productos/10110485.webp' },
            { id: 'p10110287', sku: '10110287', marca: "Genérico", nombre: "Filtro de aceite 126368358", desc: "Compatible con Chevrolet Trailblazer 2.5L 12, Colorado 2.5L", precio: 0.00, img: 'Imagenes/Productos/10110287.webp' },
            { id: 'p10110331', sku: '10110331', marca: "Genérico", nombre: "Filtro de aceite 12636838", desc: "Compatible con Chevrolet Trailblazer 2.5L 12, Colorado 2.5L", precio: 0.00, img: 'Imagenes/Productos/10110331.webp' },
            { id: 'p10110497', sku: '10110497', marca: "Genérico", nombre: "Filtro de aceite 152082327R", desc: "Compatible con Renault Duster, Logan (152095084R)", precio: 0.00, img: 'Imagenes/Productos/10110497.webp' },
            { id: 'p10110496', sku: '10110496', marca: "Genérico", nombre: "Filtro de aceite 1621803009", desc: "Compatible con Mercedes Benz, SsangYong Actyon 2.0L / 2.3L 07-16, Rexton 2.3L, Korando 2.0L", precio: 0.00, img: 'Imagenes/Productos/10110496.webp' },
            { id: 'p10110405', sku: '10110405', marca: "Genérico", nombre: "Filtro de aceite 1721803009", desc: "Compatible con SsangYong Korando (A1721840025)", precio: 0.00, img: 'Imagenes/Productos/10110405.webp' },
            { id: 'p10110487', sku: '10110487', marca: "Genérico", nombre: "Filtro de aceite 25195785", desc: "Compatible con Chevrolet Aveo 1.4L 14, Optra 1.4L 14, Tracker 16", precio: 0.00, img: 'Imagenes/Productos/10110487.webp' },
            { id: 'p10110406', sku: '10110406', marca: "Genérico", nombre: "Filtro de aceite 8-98165071-0", desc: "Compatible con Mazda BT-50, Isuzu (58-98175071-0)", precio: 0.00, img: 'Imagenes/Productos/10110406.webp' },
            { id: 'p10110326', sku: '10110326', marca: "Genérico", nombre: "Filtro de aceite 6711803009", desc: "Compatible con SsangYong Korando, Rexton, Tivoli", precio: 0.00, img: 'Imagenes/Productos/10110326.webp' },
            { id: 'p10110494', sku: '10110494', marca: "Genérico", nombre: "Filtro de aceite 68001297AA", desc: "Compatible con Audi TT V6 04-10, A3 06-13, Volkswagen Jetta, Eurovan, R32 04-14, Jeep Compass 06-09, Patriot 08", precio: 0.00, img: 'Imagenes/Productos/10110494.webp' },
            { id: 'p10110677', sku: '10110677', marca: "Genérico", nombre: "Filtro de aceite 68191349AA", desc: "Compatible con Jeep Grand Cherokee 2014", precio: 0.00, img: 'Imagenes/Productos/10110677.webp' },
            { id: 'p10110493', sku: '10110493', marca: "Genérico", nombre: "Filtro de aceite E4G16-1012040", desc: "Compatible con Chery A3 1.6L 10, Tiggo 1.6L 13-16", precio: 0.00, img: 'Imagenes/Productos/10110493.webp' },
            { id: 'p10110495', sku: '10110495', marca: "Genérico", nombre: "Filtro de aceite EO 30140", desc: "Compatible con BMW Serie 1, 3, 5, X1, X3, X5, X6, Z4", precio: 0.00, img: 'Imagenes/Productos/10110495.webp' },
            { id: 'p10110491', sku: '10110491', marca: "Genérico", nombre: "Filtro de aceite F4J16-1012030", desc: "Compatible con Jetour X70 Plus", precio: 0.00, img: 'Imagenes/Productos/10110491.webp' },
            { id: 'p10110330', sku: '10110330', marca: "Genérico", nombre: "Filtro de aceite FE0063", desc: "Compatible con Chevrolet Colorado 2.8L 2017-2024 (94771044)", precio: 0.00, img: 'Imagenes/Productos/10110330.webp' },
            { id: 'p10111421', sku: '10111421', marca: "Genérico", nombre: "Filtro de aceite FL-2137", desc: "Compatible con Ford Ranger, Mazda BT-50, Volkswagen Amarok TDI", precio: 0.00, img: 'Imagenes/Productos/10111421.webp' },
            { id: 'p10110436', sku: '10110436', marca: "Genérico", nombre: "Filtro de aceite ML19626", desc: "Compatible con Chevrolet Cruze 1.8, Sonic, Tracker 1.8", precio: 0.00, img: 'Imagenes/Productos/10110436.webp' },
            { id: 'p10110435', sku: '10110435', marca: "Genérico", nombre: "Filtro de aceite ML32094", desc: "Compatible con JAC 2.8", precio: 0.00, img: 'Imagenes/Productos/10110435.webp' },
            { id: 'p10110332', sku: '10110332', marca: "Genérico", nombre: "Filtro de aceite ML44155", desc: "Compatible con Toyota RAV4 2.5L", precio: 0.00, img: 'Imagenes/Productos/10110332.webp' },
            { id: 'p10110339', sku: '10110339', marca: "Genérico", nombre: "Filtro de aceite ML65020", desc: "Compatible con Suzuki Alto 1.0, Baleno 1.4, Ertiga 1.4, Swift 1.2", precio: 0.00, img: 'Imagenes/Productos/10110339.webp' },
            { id: 'p10110415', sku: '10110415', marca: "Genérico", nombre: "Filtro de aceite ML9814", desc: "Compatible con Peugeot, Citroën Berlingo 1.6", precio: 0.00, img: 'Imagenes/Productos/10110415.webp' },
            { id: 'p10110731', sku: '10110731', marca: "Genérico", nombre: "Filtro de aceite MS1-6744-AA", desc: "Compatible con Ford Territory 1.8L 2023", precio: 0.00, img: 'Imagenes/Productos/10110731.webp' },
        ]
    },
    aditivos: {
        label: 'Aditivos y Limpiadores',
        productos: [
            { id: 'p10110880', sku: '10110880', marca: "Liqui Moly", nombre: "Ceratec 300 ml (3721)", desc: "Protección antifricción con cerámica para el motor · 300 ml", precio: 0.00, img: 'Imagenes/Productos/10110880.webp' },
            { id: 'p10110874', sku: '10110874', marca: "Liqui Moly", nombre: "Elevador de octanaje y potencia 200 ml", desc: "Aditivo para gasolina · 200 ml", precio: 0.00, img: 'Imagenes/Productos/10110874.webp' },
            { id: 'p10110833', sku: '10110833', marca: "Liqui Moly", nombre: "Limpia contacto 400 ml", desc: "Limpiador de contactos eléctricos · 400 ml", precio: 0.00, img: 'Imagenes/Productos/10110833.webp' },
            { id: 'p10110964', sku: '10110964', marca: "Liqui Moly", nombre: "Limpia radiador", desc: "Limpieza del sistema de refrigeración", precio: 0.00, img: 'Imagenes/Productos/10110964.webp' },
            { id: 'p10110825', sku: '10110825', marca: "Liqui Moly", nombre: "Limpia válvulas 150 ml", desc: "Limpieza de válvulas y cámara de combustión · 150 ml", precio: 0.00, img: 'Imagenes/Productos/10110825.webp' },
            { id: 'p10111217', sku: '10111217', marca: "Liqui Moly", nombre: "Limpiador de cambios automáticos", desc: "Limpieza de la transmisión automática antes del cambio de aceite", precio: 0.00, img: 'Imagenes/Productos/10111217.webp' },
            { id: 'p10110822', sku: '10110822', marca: "Liqui Moly", nombre: "Limpiador de catalizador 300 ml", desc: "Limpieza del catalizador y sistema de escape · 300 ml", precio: 0.00, img: 'Imagenes/Productos/10110822.webp' },
            { id: 'p10111210', sku: '10111210', marca: "Liqui Moly", nombre: "Limpiador de inyección diésel", desc: "Limpieza del sistema de inyección diésel", precio: 0.00, img: 'Imagenes/Productos/10111210.webp' },
            { id: 'p10111109', sku: '10111109', marca: "Liqui Moly", nombre: "Limpiador de inyectores Eco", desc: "Limpieza de inyectores de gasolina", precio: 0.00, img: 'Imagenes/Productos/10111109.webp' },
            { id: 'p10111312', sku: '10111312', marca: "Liqui Moly", nombre: "Oil Additiv antifricción de motor 300 ml (2500)", desc: "Reduce fricción y desgaste del motor · 300 ml", precio: 0.00, img: 'Imagenes/Productos/10111312.webp' },
            { id: 'p10110823', sku: '10110823', marca: "Liqui Moly", nombre: "Aditivo para buzos hidráulicos 300 ml", desc: "Elimina el ruido de buzos hidráulicos · 300 ml", precio: 0.00, img: 'Imagenes/Productos/10110823.webp' },
            { id: 'p10110975', sku: '10110975', marca: "Liqui Moly", nombre: "Aditivo para lavado de motor 300 ml", desc: "Limpieza interna del motor antes del cambio de aceite · 300 ml", precio: 0.00, img: 'Imagenes/Productos/10110975.webp' },
            { id: 'p10110824', sku: '10110824', marca: "Liqui Moly", nombre: "Aditivo para vehículos a gas GLP 300 ml", desc: "Protección de válvulas en motores a GLP · 300 ml", precio: 0.00, img: 'Imagenes/Productos/10110824.webp' },
            { id: 'p10110688', sku: '10110688', marca: "Liqui Moly", nombre: "Súper limpiador de inyección diésel 250 ml", desc: "Limpieza intensiva del sistema de inyección diésel · 250 ml", precio: 0.00, img: 'Imagenes/Productos/10110688.webp' },
            { id: 'p10110826', sku: '10110826', marca: "Liqui Moly", nombre: "Tapa fuga para radiador", desc: "Sella fugas pequeñas del sistema de refrigeración", precio: 0.00, img: 'Imagenes/Productos/10110826.webp' },
            { id: 'p10111211', sku: '10111211', marca: "Liqui Moly", nombre: "Tapafugas de aceite de motor 300 ml", desc: "Detiene fugas de aceite del motor · 300 ml", precio: 0.00, img: 'Imagenes/Productos/10111211.webp' },
            { id: 'p10110603', sku: '10110603', marca: "Liqui Moly", nombre: "Viscoplus estabilizador de viscosidad (LM2502)", desc: "Estabiliza la viscosidad del aceite de motor", precio: 0.00, img: 'Imagenes/Productos/10110603.webp' },
        ]
    },
};

// =============================================
// DATOS DE CADA CATEGORÍA (tarjetas y cabecera)
// Para cambiar las fotos: reemplaza la ruta de "img".
// =============================================
const CATEGORIAS_INFO = {
    aceites: {
        num: '01', corto: 'Aceites',
        titulo: 'Aceites y <em>Lubricantes</em>',
        desc: 'Liqui Moly, Castrol, Shell, Mobil, Vistony y más. Motor, caja y transmisión.',
        img: 'Imagenes/AceitesCaraEjemplo.webp'
    },
    filtros: {
        num: '02', corto: 'Filtros',
        titulo: 'Filtros y <em>Componentes</em>',
        desc: 'Filtros de aceite Millard, Hyundai, Maxfil, Bosch y más, para las marcas del mercado peruano.',
        img: 'Imagenes/RefrigeranteEjemplo.webp'
    },
    aditivos: {
        num: '03', corto: 'Aditivos',
        titulo: 'Aditivos y <em>Limpiadores</em>',
        desc: 'Limpiadores de inyectores, tapafugas, antifricción y más de Liqui Moly.',
        img: 'Imagenes/AceitesLubricantesCover.jpg'
    },
    refrigerantes: {
        num: '04', corto: 'Refrigerantes',
        titulo: '<em>Refrigerantes</em>',
        desc: 'Fórmulas de larga duración para mantener tu motor a la temperatura correcta.',
        img: 'Imagenes/PrestoneEjemploCara.webp'
    },
    repuestos: {
        num: '05', corto: 'Repuestos',
        titulo: '<em>Repuestos</em>',
        desc: 'Repuestos y accesorios para el mantenimiento de tu auto.',
        img: 'Imagenes/ComponentesCaraEjemplo.webp'
    }
};

// Productos que salen en "Los más pedidos" (por id)
// TODO: cámbialos por los que de verdad más se venden (usa el id: 'p' + código del producto)
const MAS_PEDIDOS = ['p10111212', 'p10110929', 'p10110795', 'p10110975'];

// Imagen de reemplazo si la foto del producto no existe todavía
const IMG_PENDIENTE = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">' +
    '<rect width="200" height="200" fill="#f4f4f4"/>' +
    '<path d="M70 80h60v50H70z M82 80v-8h36v8" fill="none" stroke="#c4c4c4" stroke-width="5" stroke-linejoin="round"/>' +
    '<text x="100" y="160" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#8a8a8a">Foto pendiente</text>' +
    '</svg>');

// Si una foto de producto no carga (o aún no existe), se muestra IMG_PENDIENTE.
// Reemplaza al antiguo onerror="..." en línea (bloqueado por el CSP).
document.addEventListener('error', e => {
    const img = e.target;
    if (img.tagName !== 'IMG' || !img.hasAttribute('data-respaldo') || img.dataset.fallo) return;
    img.dataset.fallo = '1';
    img.src = IMG_PENDIENTE;
}, true);

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
    orden: 'default',
    sel: {},               // filtros marcados: { marca: ['Castrol'], visc: ['5W-30'], ... }
    abiertos: {}           // acordeones abiertos: { marca: true }
};

// =============================================
// CARRITO — Estado y persistencia (localStorage)
// =============================================
let carritoItems = [];          // [{id, marca, nombre, precio, img, qty}]
let carritoSedeId = null;

function cargarCarritoStorage() {
    try {
        const raw = localStorage.getItem('autogas_carrito');
        // Seguridad: del almacenamiento solo se confía en el id y la cantidad;
        // nombre, marca, precio y foto se toman siempre del catálogo.
        const guardados = JSON.parse(raw || '[]');
        carritoItems = (Array.isArray(guardados) ? guardados : [])
            .filter(i => i && typeof i.id === 'string' && buscarProducto(i.id))
            .map(i => {
                const p = buscarProducto(i.id);
                const qty = Math.min(99, Math.max(1, parseInt(i.qty, 10) || 1));
                return { id: p.id, sku: p.sku, marca: p.marca, nombre: p.nombre, precio: p.precio, img: p.img, qty };
            });
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

// Menú y menú de celular: El menú y el footer ahora están en ../Comun/comun.js

document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const panel = $('filtersPanel');
    if (panel && panel.classList.contains('open')) { cerrarFiltros(); return; }
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
                <img src="${p.img || IMG_PENDIENTE}" alt="${escaparHTML(p.marca + ' ' + p.nombre)}" loading="lazy" decoding="async" data-respaldo />
            </div>
            <div class="t-prod-info">
                <p class="t-prod-marca">${escaparHTML(p.marca)}</p>
                <h3 class="t-prod-nombre">${escaparHTML(p.nombre)}</h3>
                ${conDescripcion ? `<p class="t-prod-desc">${escaparHTML(p.desc)}</p>` : ''}
                <p class="t-prod-precio">${soles(p.precio)}</p>
                <div class="t-prod-actions">
                    <div class="t-qty">
                        <button type="button" data-accion="cambiarQtyCard" data-args='["${p.id}",-1]' aria-label="Quitar uno">−</button>
                        <span data-qty="${p.id}" aria-live="polite">${qtyCard[p.id] || 1}</span>
                        <button type="button" data-accion="cambiarQtyCard" data-args='["${p.id}",1]' aria-label="Agregar uno">+</button>
                    </div>
                    <button type="button" class="t-add" data-accion="agregarAlCarritoDesdeCard" data-args='["${p.id}","$el"]'>Agregar</button>
                </div>
            </div>
        </article>`;
}

// =============================================
// VISTA INICIO: categorías + más pedidos
// =============================================
function htmlCategoria(id, info, grande) {
    const n = CATALOGO[id].productos.length;
    const cta = n ? 'Ver productos ' : 'Muy pronto ';
    return `
        <a class="t-cat${grande ? ' t-cat--big' : ''}${n ? '' : ' t-cat--pronto'}" href="#${id}" data-cat="${id}">
            <div class="t-cat-info">
                <span class="t-cat-num">${info.num}</span>
                <h3 class="t-cat-name">${CATALOGO[id].label}</h3>
                <p class="t-cat-desc">${info.desc}</p>
                <span class="t-cat-go">${cta}${ICONO_FLECHA}</span>
            </div>
            <div class="t-cat-media${info.logo ? ' t-cat-media--logo' : ''}">
                <img src="${info.img}" alt="" loading="lazy" decoding="async" />
            </div>
            <span class="t-cat-bar"></span>
        </a>`;
}

// Mosaico: la primera categoría (Aceites) va grande; el resto, al lado.
// En celular: Aceites a todo el ancho y las otras 4 en 2×2.
function renderizarInicio() {
    $('catsGrid').innerHTML = Object.entries(CATEGORIAS_INFO)
        .map(([id, info], i) => htmlCategoria(id, info, i === 0)).join('');

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
    reiniciarFiltros();
    cerrarFiltros(false);
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
        document.title = 'AutoGas | Tienda — Aceites, Aditivos, Filtros y Repuestos';
        if (!primeraCarga && (ruta.ancla === 'tienda' || ruta.ancla === 'store' || ruta.ancla === 'categorias')) {
            $('categorias').scrollIntoView({ behavior: 'auto', block: 'start' });
        } else if (!primeraCarga) {
            window.scrollTo({ top: 0, behavior: 'auto' });
        } else if (ruta.ancla === 'store' || ruta.ancla === 'categorias' || ruta.ancla === 'tienda') {
            requestAnimationFrame(() => $('categorias').scrollIntoView({ block: 'start' }));
        }
    }
    // Avisa al menú (comun.js) que cambió la posición
    window.dispatchEvent(new Event('scroll'));
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
        ? base.filter(p => normalizar(p.nombre + ' ' + p.marca + ' ' + p.desc + ' ' + (p.sku || '')).includes(qInput))
        : base;

    // Filtros del panel (marca, viscosidad, presentación, tipo)
    const grupos = gruposDeLaVista();
    renderizarFiltros(grupos, prods);
    prods = aplicarFiltros(prods, grupos, null);

    const orden = $('ordenSelect').value;
    if (orden === 'asc') prods.sort((a, b) => a.precio - b.precio);
    else if (orden === 'desc') prods.sort((a, b) => b.precio - a.precio);
    else if (orden === 'marca') prods.sort((a, b) => a.marca.localeCompare(b.marca));

    renderizarProductos(prods);
    actualizarContadoresFiltros(prods.length);
}

// =============================================
// FILTROS — definición de cada grupo
// "val" saca el valor del producto; "orden" ordena las opciones.
// =============================================
const ORDEN_PRESENTACION = ['1 litro', '4 litros', '5 litros', '1 galón'];
const ORDEN_TIPO = ['Motor', 'Diésel', 'Transmisión', 'Dirección'];

function numViscosidad(v) {
    const m = /^(\d+)W-(\d+)$/.exec(v);
    return m ? (+m[1]) * 1000 + (+m[2]) : 1e9; // "SAE 50" al final
}

const GRUPOS_FILTRO = {
    marca: {
        titulo: 'Marca',
        val: p => p.marca,
        orden: (a, b) => (a === 'Genérico') - (b === 'Genérico') || a.localeCompare(b, 'es')
    },
    visc: {
        titulo: 'Viscosidad', pastillas: true,
        val: p => { const m = /\b(\d{1,2}W-\d{2,3}|SAE \d+)\b/.exec(p.desc); return m ? m[1] : ''; },
        orden: (a, b) => numViscosidad(a) - numViscosidad(b)
    },
    pres: {
        titulo: 'Presentación',
        val: p => { const m = /(1 litro|4 litros|5 litros|1 galón)/.exec(p.desc); return m ? m[1] : ''; },
        orden: (a, b) => ORDEN_PRESENTACION.indexOf(a) - ORDEN_PRESENTACION.indexOf(b)
    },
    tipo: {
        titulo: 'Tipo',
        val: p => {
            const d = normalizar(p.desc);
            if (d.includes('transmision') || d.includes('diferencial')) return 'Transmisión';
            if (d.includes('diesel')) return 'Diésel';
            if (d.includes('direccion')) return 'Dirección';
            return 'Motor';
        },
        orden: (a, b) => ORDEN_TIPO.indexOf(a) - ORDEN_TIPO.indexOf(b)
    }
};

// Qué filtros tiene cada categoría (las que no salen aquí solo filtran por marca)
const FILTROS_POR_CATEGORIA = {
    aceites: ['marca', 'visc', 'pres', 'tipo']
};

function gruposDeLaVista() {
    const ids = (estadoTienda.vista === 'cat' && FILTROS_POR_CATEGORIA[estadoTienda.categoriaActual]) || ['marca'];
    return ids.map(id => ({ id, ...GRUPOS_FILTRO[id] }));
}

function esMovil() {
    return window.matchMedia('(max-width: 900px)').matches;
}

function reiniciarFiltros() {
    estadoTienda.sel = {};
    // En escritorio se abren Marca y Viscosidad; en celular solo Marca
    estadoTienda.abiertos = esMovil() ? { marca: true } : { marca: true, visc: true };
}

function marcados(grupoId) {
    return estadoTienda.sel[grupoId] || [];
}

// Aplica todos los filtros menos "ignorar" (así cada grupo cuenta
// sus opciones según lo demás que esté marcado)
function aplicarFiltros(prods, grupos, ignorar) {
    return prods.filter(p => grupos.every(g => {
        if (g.id === ignorar) return true;
        const elegidos = marcados(g.id);
        return elegidos.length === 0 || elegidos.includes(g.val(p));
    }));
}

const ICONO_CHEVRON = '<svg class="t-acc-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
const ICONO_X = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

function htmlAcordeon(id, titulo, badge, cuerpo, extraClase) {
    const abierto = !!estadoTienda.abiertos[id];
    return `
        <div class="t-acc${extraClase ? ' ' + extraClase : ''}">
            <button type="button" class="t-acc-head" data-acc="${id}" aria-expanded="${abierto}" aria-controls="acc-${id}">
                <span>${titulo}${badge ? ` <span class="t-acc-badge">(${badge})</span>` : ''}</span>
                ${ICONO_CHEVRON}
            </button>
            <div class="t-acc-body" id="acc-${id}"${abierto ? '' : ' hidden'}>${cuerpo}</div>
        </div>`;
}

function renderizarFiltros(grupos, prodsBusqueda) {
    const catalogo = $('catalogo');
    const body = $('filtersBody');
    const vacia = prodsBusqueda.length === 0 && marcadosTotal() === 0;

    // Recordar qué casilla tenía el foco para devolvérselo al redibujar
    const act = document.activeElement;
    const foco = act && body.contains(act)
        ? (act.dataset.acc ? '[data-acc="' + act.dataset.acc + '"]'
            : act.name ? 'input[name="' + act.name + '"][value="' + CSS.escape(act.value) + '"]' : null)
        : null;

    let html = '';
    // "Ordenar por" dentro del panel (solo se ve en celular)
    const ordenActual = $('ordenSelect').value;
    const ordenes = [...$('ordenSelect').options].map(o => ({ v: o.value, t: o.textContent }));
    html += htmlAcordeon('orden', 'Ordenar por', '',
        ordenes.map(o => `
            <label class="t-opt">
                <input type="radio" name="f-orden" value="${o.v}"${o.v === ordenActual ? ' checked' : ''} />
                <span class="t-opt-name">${escaparHTML(o.t)}</span>
            </label>`).join(''), 't-acc--movil');

    let gruposVisibles = 0;
    grupos.forEach(g => {
        const base = aplicarFiltros(prodsBusqueda, grupos, g.id);
        const conteo = {};
        base.forEach(p => { const v = g.val(p); if (v) conteo[v] = (conteo[v] || 0) + 1; });
        const elegidos = marcados(g.id);
        elegidos.forEach(v => { if (!(v in conteo)) conteo[v] = 0; });
        const valores = Object.keys(conteo).sort(g.orden);
        // Un grupo con una sola opción no sirve para filtrar
        if (valores.length < 2 && elegidos.length === 0) return;
        gruposVisibles++;
        html += htmlAcordeon(g.id, g.titulo, elegidos.length || '',
            `<div class="t-opts${g.pastillas ? ' t-opts--pastillas' : ''}">` +
            valores.map(v => `
                <label class="t-opt">
                    <input type="checkbox" name="f-${g.id}" value="${escaparHTML(v)}"${elegidos.includes(v) ? ' checked' : ''} />
                    <span class="t-opt-name">${escaparHTML(v)}</span>
                    <span class="t-opt-count">${conteo[v]}</span>
                </label>`).join('') + '</div>');
    });

    body.innerHTML = html;
    catalogo.classList.toggle('sin-filtros', gruposVisibles === 0);
    catalogo.classList.toggle('vacia', vacia);
    if (foco) { const el = body.querySelector(foco); if (el) el.focus(); }

    renderizarChips(grupos);
}

function marcadosTotal() {
    return Object.values(estadoTienda.sel).reduce((s, l) => s + l.length, 0);
}

function renderizarChips(grupos) {
    const cont = $('activeChips');
    const chips = [];
    grupos.forEach(g => marcados(g.id).forEach(v => chips.push(
        `<button type="button" class="t-chip" data-quitar-grupo="${g.id}" data-quitar-valor="${escaparHTML(v)}" aria-label="Quitar filtro ${escaparHTML(v)}">${escaparHTML(v)} ${ICONO_X}</button>`)));
    cont.hidden = chips.length === 0;
    cont.innerHTML = chips.length
        ? `<span class="t-chips-label">Filtrando por:</span>${chips.join('')}<button type="button" class="t-chips-clear" data-limpiar-filtros>Limpiar</button>`
        : '';
}

function actualizarContadoresFiltros(n) {
    const total = marcadosTotal();
    const badge = $('filtersOpenCount');
    badge.hidden = total === 0;
    badge.textContent = total;
    $('filtersApply').textContent = 'Ver ' + n + (n === 1 ? ' producto' : ' productos');
}

function cambiarFiltro(grupoId, valor, activo) {
    const lista = marcados(grupoId).filter(v => v !== valor);
    if (activo) lista.push(valor);
    estadoTienda.sel = { ...estadoTienda.sel, [grupoId]: lista };
    filtrarYRenderizar();
}

function limpiarFiltros() {
    estadoTienda.sel = {};
    filtrarYRenderizar();
}

// ---- Panel en celular: abrir / cerrar ----
let _focoAntesFiltros = null;
function abrirFiltros() {
    const panel = $('filtersPanel');
    _focoAntesFiltros = document.activeElement;
    panel.classList.add('open');
    $('filtersOpen').setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('filtersClose').focus(), 50);
}

function cerrarFiltros(devolverFoco) {
    const panel = $('filtersPanel');
    if (!panel || !panel.classList.contains('open')) return;
    panel.classList.remove('open');
    $('filtersOpen').setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (devolverFoco !== false && _focoAntesFiltros && _focoAntesFiltros.focus) _focoAntesFiltros.focus();
}

function iniciarFiltros() {
    const body = $('filtersBody');

    // Abrir / cerrar cada acordeón
    body.addEventListener('click', e => {
        const head = e.target.closest('[data-acc]');
        if (!head) return;
        const id = head.dataset.acc;
        estadoTienda.abiertos[id] = !estadoTienda.abiertos[id];
        head.setAttribute('aria-expanded', estadoTienda.abiertos[id]);
        $('acc-' + id).hidden = !estadoTienda.abiertos[id];
    });

    // Marcar / desmarcar opciones
    body.addEventListener('change', e => {
        const inp = e.target;
        if (inp.name === 'f-orden') {
            $('ordenSelect').value = inp.value;
            filtrarYRenderizar();
        } else if (inp.name && inp.name.startsWith('f-')) {
            cambiarFiltro(inp.name.slice(2), inp.value, inp.checked);
        }
    });

    // Etiquetas de filtros activos
    $('activeChips').addEventListener('click', e => {
        const chip = e.target.closest('[data-quitar-grupo]');
        if (chip) { cambiarFiltro(chip.dataset.quitarGrupo, chip.dataset.quitarValor, false); return; }
        if (e.target.closest('[data-limpiar-filtros]')) limpiarFiltros();
    });

    $('filtersClearTop').addEventListener('click', limpiarFiltros);
    $('filtersClearBottom').addEventListener('click', limpiarFiltros);
    $('filtersOpen').addEventListener('click', abrirFiltros);
    $('filtersClose').addEventListener('click', () => cerrarFiltros());
    $('filtersApply').addEventListener('click', () => {
        cerrarFiltros();
        $('catalogo').scrollIntoView({ block: 'start' });
    });

    // Si se agranda la pantalla con el panel abierto, se cierra
    window.matchMedia('(max-width: 900px)').addEventListener('change', ev => {
        if (!ev.matches) cerrarFiltros(false);
    });
}

function renderizarProductos(productos) {
    const grid = $('prodsGrid');
    const n = productos.length;
    $('prodsCount').innerHTML = `<strong>${n}</strong> producto${n !== 1 ? 's' : ''}`;

    const catVacia = estadoTienda.vista === 'cat' && CATALOGO[estadoTienda.categoriaActual].productos.length === 0;
    if (catVacia) {
        grid.innerHTML = `
            <div class="t-empty">
                <p class="t-empty-title">Muy pronto</p>
                <p>Estamos subiendo los productos de esta categoría. Mientras tanto, pregúntanos por WhatsApp en tu sede.</p>
                <a class="t-btn" href="#tienda">Ver otras categorías</a>
            </div>`;
        return;
    }
    if (n === 0) {
        grid.innerHTML = `
            <div class="t-empty">
                <p class="t-empty-title">Sin resultados</p>
                <p>No encontramos productos con esa búsqueda o filtros. Prueba con otra palabra o escríbenos por WhatsApp.</p>
                <button type="button" class="t-btn" data-accion="limpiarBusqueda">Limpiar búsqueda y filtros</button>
            </div>`;
        return;
    }
    grid.innerHTML = productos.map(p => htmlProducto(p, true)).join('');
}

function limpiarBusqueda() {
    $('searchInput').value = '';
    estadoTienda.sel = {};
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
    else carritoItems.push({ id: p.id, sku: p.sku, marca: p.marca, nombre: p.nombre, precio: p.precio, img: p.img, qty });

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
    toast.innerHTML = `${ICONO_CHECK}<span></span><button type="button" data-accion="toggleCarrito">Ver pedido</button>`;
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
                    <img src="${item.img || IMG_PENDIENTE}" alt="" data-respaldo />
                </div>
                <div>
                    <p class="cart-item-marca">${escaparHTML(item.marca)}</p>
                    <p class="cart-item-nombre">${escaparHTML(item.nombre)}</p>
                    <p class="cart-item-meta">${soles(item.precio)} c/u ·
                        <button type="button" class="cart-link" data-accion="eliminarItem" data-args='["${item.id}"]'>Quitar</button></p>
                </div>
            </div>
            <div class="cart-item-qty">
                <div class="t-qty">
                    <button type="button" data-accion="cambiarCantidadItem" data-args='["${item.id}",-1]' aria-label="Quitar uno de ${escaparHTML(item.nombre)}">−</button>
                    <span>${item.qty}</span>
                    <button type="button" data-accion="cambiarCantidadItem" data-args='["${item.id}",1]' aria-label="Agregar uno de ${escaparHTML(item.nombre)}">+</button>
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
        `- ${i.marca} ${i.nombre}${i.sku ? ' [Cód. ' + i.sku + ']' : ''} × ${i.qty}` +
        (i.precio > 0 ? ` — ${soles(i.precio * i.qty)}` : '')).join('\n');

    let msg = `Hola AutoGas ${sede} 👋\n\n*Cliente:* ${nombre} ${apellido}\n`;
    if (vehiculo) msg += `*Vehículo:* ${vehiculo}\n`;
    msg += `\n🛒 *Mi pedido:*\n${lineas}\n\n` +
        (total > 0 ? `💳 *Total estimado:* ${soles(total)}\n\n` : `💳 *Precio:* por confirmar con la sede\n\n`) +
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
            <button type="button" class="toast-wsp-close" data-accion="cerrarToastWsp" aria-label="Cerrar">✕</button>`;
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
    iniciarFiltros();

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
