/* =============================================
   noticias-data.js — AutoGas
   ─────────────────────────────────────────────
   Para agregar una noticia nueva:
   1. Copia el bloque { id: ... } completo
   2. Cambia el id (debe ser único, siguiente número)
   3. Cambia titulo, categoria, fecha, imagen,
      extracto y contenido
   4. Guarda el archivo. Listo.

   Categorías disponibles:
   "gnv" | "glp" | "mantenimiento" | "noticias" | "tips"
============================================= */

const NOTICIAS = [

    {
        id: 1,
        titulo: "¿Vale la pena convertir tu auto a GNV en 2025?",
        categoria: "gnv",
        fecha: "15 Mayo, 2025",
        imagen: "../Inicio/Imagenes/Taller11.jpg",
        extracto: "El precio del GNV sigue siendo hasta 60% más económico que la gasolina. Analizamos costos, beneficios y qué autos son ideales para la conversión.",
        lectura: 6,
        contenido: `
            <p>El Gas Natural Vehicular (GNV) se ha consolidado como la opción más rentable para conductores peruanos que buscan reducir su gasto en combustible. Con precios hasta un 60% menores que la gasolina, la conversión a GNV se paga sola en promedio en 12 a 18 meses.</p>

            <h2>¿Qué vehículos pueden convertirse?</h2>
            <p>La gran mayoría de autos con motor a gasolina pueden convertirse a GNV. Los más compatibles son los de motor atmosférico de 4 cilindros, aunque también existen kits para motores turbo y de mayor cilindrada. Los híbridos y eléctricos no aplican.</p>

            <h2>Costos del proceso</h2>
            <p>Una conversión GNV completa en AutoGas incluye el kit certificado, la instalación por técnicos especializados y la documentación para el SETAME. El precio varía según el tipo de kit y el vehículo, pero nuestros asesores te dan una cotización sin costo.</p>

            <h2>El beneficio FISE</h2>
            <p>Como taller autorizado FISE, podemos acceder al subsidio gubernamental que reduce significativamente el costo de tu conversión. Solo necesitas tu DNI, tarjeta de propiedad y cumplir con los requisitos del programa.</p>

            <h2>Conclusión</h2>
            <p>Si tu auto tiene más de 2 años y recorres más de 1,500 km al mes, la conversión a GNV es una decisión que tiene sentido económico claro. Acércate a cualquiera de nuestras sedes para una evaluación gratuita.</p>
        `
    },

    {
        id: 2,
        titulo: "GNV vs GLP: ¿Cuál conviene más para tu uso diario?",
        categoria: "glp",
        fecha: "8 Mayo, 2025",
        imagen: "../Inicio/Imagenes/Taller3.jpg",
        extracto: "Comparativa técnica y económica entre los dos combustibles alternativos más usados en el Perú.",
        lectura: 4,
        contenido: `
            <p>Tanto el GNV como el GLP son alternativas limpias y económicas a la gasolina. Sin embargo, tienen diferencias importantes que debes conocer antes de decidir cuál va mejor con tu estilo de vida.</p>

            <h2>GNV — Gas Natural Vehicular</h2>
            <p>El GNV se almacena en cilindros de alta presión. Es el combustible más barato del mercado peruano y está disponible en estaciones de toda la red nacional. Ideal para uso urbano e interurbano con rutas conocidas.</p>

            <h2>GLP — Gas Licuado de Petróleo</h2>
            <p>El GLP ofrece mayor densidad energética, lo que se traduce en más autonomía por carga. Es ideal para SUVs, pickups y vehículos que hacen recorridos largos. La instalación es más compacta que la del GNV.</p>

            <h2>¿Cuál elegir?</h2>
            <p>Si usas tu auto principalmente en ciudad y quieres el máximo ahorro: GNV. Si haces viajes frecuentes a provincia o tienes un vehículo grande: GLP. En ambos casos, AutoGas tiene el kit y el equipo para asesorarte.</p>
        `
    },

    {
        id: 3,
        titulo: "El mantenimiento del kit GNV que muchos ignoran",
        categoria: "mantenimiento",
        fecha: "2 Mayo, 2025",
        imagen: "../Inicio/Imagenes/Taller14.jpg",
        extracto: "Revisiones obligatorias, intervalos recomendados y señales de alerta que no debes pasar por alto.",
        lectura: 5,
        contenido: `
            <p>Tener un kit GNV instalado no es solo enchufar y listo. Como cualquier sistema mecánico, requiere mantenimiento periódico para garantizar su seguridad y rendimiento óptimo.</p>

            <h2>¿Cada cuánto se debe revisar?</h2>
            <p>El kit GNV debe revisarse cada 10,000 km o una vez al año, lo que ocurra primero. Esta revisión incluye inspección de mangueras, regulador de presión, válvulas de corte y el estado del cilindro.</p>

            <h2>Señales de que algo está mal</h2>
            <p>Olor a gas en el interior del vehículo, pérdida de potencia repentina al usar gas, o el sistema que se pasa a gasolina solo son señales claras de que necesitas una revisión inmediata.</p>

            <h2>El cilindro también vence</h2>
            <p>Los cilindros de GNV tienen una vida útil certificada. Pasado ese periodo, deben ser reemplazados obligatoriamente por seguridad y requisito legal. En AutoGas te avisamos con tiempo.</p>
        `
    },

    {
        id: 4,
        titulo: "AutoGas renueva convenio oficial FISE 2025-2026",
        categoria: "noticias",
        fecha: "27 Marzo, 2025",
        imagen: "../Inicio/Imagenes/Taller12.jpg",
        extracto: "Continuamos siendo taller autorizado. Tus conversiones califican para el subsidio energético del Estado peruano.",
        lectura: 3,
        contenido: `
            <p>Con orgullo comunicamos que AutoGas ha renovado su convenio oficial con el Fondo de Inclusión Social Energético (FISE) del Ministerio de Energía y Minas del Perú para el periodo 2025-2026.</p>

            <h2>¿Qué significa esto para ti?</h2>
            <p>Que al convertir tu vehículo en cualquiera de nuestras sedes, puedes acceder al beneficio FISE que subsidia parte del costo de la conversión. Este beneficio está dirigido a conductores de menores ingresos con vehículos de uso particular o taxi.</p>

            <h2>Requisitos básicos</h2>
            <p>DNI vigente, tarjeta de propiedad del vehículo, y que el auto cumpla con las condiciones técnicas para la conversión. Nuestros asesores te guían en todo el proceso sin costo adicional.</p>

            <h2>Disponible en todas nuestras sedes</h2>
            <p>El beneficio FISE está disponible en todas las sedes de AutoGas a nivel nacional. Acércate con tu documentación y te atendemos de inmediato.</p>
        `
    },

    {
        id: 5,
        titulo: "5 señales de que tu motor necesita revisión urgente",
        categoria: "tips",
        fecha: "18 Abril, 2025",
        imagen: "../Inicio/Imagenes/Taller4.jpg",
        extracto: "Aprende a leer lo que tu vehículo te dice antes de que un problema menor se convierta en una falla costosa.",
        lectura: 4,
        contenido: `
            <p>Tu vehículo siempre da señales antes de fallar. El problema es que muchos conductores las ignoran hasta que el daño ya es mayor. Aquí las 5 señales más importantes que no debes pasar por alto.</p>

            <h2>1. Luz del motor encendida</h2>
            <p>La luz de "Check Engine" no siempre indica una falla grave, pero tampoco se debe ignorar. Puede ser desde un sensor dañado hasta un problema de inyección. Con nuestro scanner europeo lo diagnosticamos en minutos.</p>

            <h2>2. Consumo de combustible elevado</h2>
            <p>Si notas que tu auto está consumiendo más de lo normal sin cambiar tu forma de manejar, algo está afectando la eficiencia del motor. Puede ser un filtro de aire tapado, bujías gastadas o una falla en el sistema de inyección.</p>

            <h2>3. Ruidos anormales al arrancar</h2>
            <p>Golpeteos, chirridos o ruidos metálicos al arrancar son señales claras de problemas en el sistema de distribución, correa de accesorios o en el sistema de escape.</p>

            <h2>4. Humo del escape</h2>
            <p>El humo blanco puede indicar refrigerante quemado. El azul, aceite quemado. El negro, mezcla rica de combustible. Cada color tiene una causa específica que hay que atender.</p>

            <h2>5. Pérdida de potencia</h2>
            <p>Si sientes que tu auto ya no responde como antes, especialmente en cuestas, es momento de una revisión completa. Las causas pueden ser varias pero siempre tienen solución.</p>
        `
    },

    {
        id: 6,
        titulo: "Kits GLP de cuarta generación: la opción premium",
        categoria: "glp",
        fecha: "15 Marzo, 2025",
        imagen: "../Inicio/Imagenes/Taller5.jpg",
        extracto: "La tecnología GLP de inyección directa ya llegó a Perú. Todo sobre su instalación y ventajas en vehículos grandes.",
        lectura: 6,
        contenido: `
            <p>Los kits GLP de cuarta generación representan lo más avanzado en tecnología de combustibles alternativos. A diferencia de los sistemas anteriores, estos kits trabajan con inyección secuencial directa, lo que elimina prácticamente cualquier pérdida de potencia.</p>

            <h2>¿Qué los hace diferentes?</h2>
            <p>Los sistemas de cuarta generación inyectan el GLP en fase líquida directamente en el múltiple de admisión, sincronizados con la inyección original del vehículo. El resultado es una combustión más eficiente y un rendimiento casi idéntico al de la gasolina.</p>

            <h2>Compatibilidad con SUVs y pickups</h2>
            <p>Estos kits son especialmente recomendados para vehículos con motores de 6 o más cilindros, SUVs de alta gama y pickups de uso intensivo. En AutoGas contamos con técnicos certificados para su instalación.</p>

            <h2>Garantía y certificación</h2>
            <p>Todos los kits que instalamos en AutoGas cuentan con certificación de homologación y garantía del fabricante. Además, incluimos el trámite de aprobación ante el SETAME.</p>
        `
    }

];

/* ─────────────────────────────────────────────
   No modifiques nada debajo de esta línea
───────────────────────────────────────────── */
/**
 * Retrieves a news article object by its unique ID.
 * @param {number|string} id - The unique identifier of the article.
 * @returns {Object|null} The article object if found, otherwise null.
 */
function getNoticiaById(id) {
    return NOTICIAS.find(n => n.id === parseInt(id)) || null;
}

/**
 * Retrieves a list of news articles matching a specific category.
 * @param {string} cat - The category to filter by (e.g. 'gnv', 'glp'). Use 'todos' to get all articles.
 * @returns {Array} An array of article objects matching the category.
 */
function getNoticiasByCategoria(cat) {
    if (cat === 'todos') return NOTICIAS;
    return NOTICIAS.filter(n => n.categoria === cat);
}

const CATEGORIA_LABELS = {
    gnv:          { label: 'Conversiones GNV', color: 'badge-gnv' },
    glp:          { label: 'Conversiones GLP', color: 'badge-glp' },
    mantenimiento:{ label: 'Mantenimiento',    color: 'badge-mant' },
    noticias:     { label: 'Noticias',         color: 'badge-news' },
    tips:         { label: 'Tips',             color: 'badge-tips' }
};