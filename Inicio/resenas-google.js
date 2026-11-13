/* =====================================================================
   resenas-google.js — Reseñas de Google Maps que se muestran en el Inicio
   ---------------------------------------------------------------------
   Se copian A MANO desde Google Maps (no se actualizan solas).
   Para cambiar o añadir una reseña, edita solo este archivo.

   1) "sedes": puntaje y número de reseñas de cada sede en Google.
      El Inicio calcula solo el PROMEDIO ENTRE SEDES (ponderado por el
      número de reseñas, igual que lo haría Google). Actualiza estos
      números cuando cambien en Google Maps.
   2) "resenas": las que se muestran en el carrusel, en este orden.
      { autor: 'Gabriel A.', sede: 'ica',
        texto: 'Texto exacto de la reseña' },

   Reglas para no meterse en problemas:
   - Copia reseñas REALES, con el texto tal como está en Google. No inventes
     ni corrijas el texto (solo puedes cortar una muy larga con "…").
   - NOMBRE: solo el primer nombre y la inicial del primer apellido
     ("Gabriel Andrés Aquino Chamorro" -> "Gabriel A."). Este archivo es
     público (cualquiera puede abrirlo), así que nunca pongas el nombre completo.
   - "sede" tiene que ser una de las claves de "sedes" (ica, lima, ...).
   ===================================================================== */
window.RESENAS_GOOGLE = {
    actualizado: 'noviembre 2026', // cuándo copiaste los datos

    sedes: {
        ica:      { nombre: 'Ica',      puntaje: 4.1, total: 28, maps: 'https://maps.app.goo.gl/YMV6tFCKN7JVeh2y5' },
        lima:     { nombre: 'Lima',     puntaje: 4.3, total: 11, maps: 'https://maps.app.goo.gl/iNqeFaF4HxDeTaQY8' },
        huancayo: { nombre: 'Huancayo', puntaje: 4.2, total: 39, maps: 'https://maps.app.goo.gl/npbMCgnDuciJp9Vi6' },
        trujillo: { nombre: 'Trujillo', puntaje: 4.7, total: 29, maps: 'https://maps.app.goo.gl/51nNhVFkDhbSYz3G8' },
        arequipa: { nombre: 'Arequipa', puntaje: 3.8, total: 12, maps: 'https://maps.app.goo.gl/pmEsLW2fEREyAEgY7' }
        // Nasca aún no tiene reseñas en Google: agrégalas aquí cuando tengan.
    },

    resenas: [
        { autor: 'Gabriel A.', sede: 'huancayo',
          texto: 'Muy buena experiencia, atencion rápida, buen diagnóstico, sinceros, y precios Justos, muy recomendado desde la atención de las señoritas hasta los mecánicos.' },
        { autor: 'Jazmin G.', sede: 'ica',
          texto: 'Si deseas calidad en el servicio y buenos precios, la mejor opción es AutoGas Ica, es por ello que siempre para lleno, aunque de igual manera su atención es veloz y eficaz.' },
        { autor: 'Pool P.', sede: 'lima',
          texto: 'Servicio super recomendado. La atención tanto previa cita como la técnica es muy buena. Desde que llegas te asignan un técnico. Cuentan con elevadores, scaner y computadores para la calibración se gas. Se ve que tienen las herramientas…' },
        { autor: 'Jose A.', sede: 'arequipa',
          texto: 'Empresa para la instalación del sistema de gas para autos muy profesionales y con buenos precios. Recomendable' },
        { autor: 'Luis V.', sede: 'trujillo',
          texto: 'Su carro en las manos de los mejores.. garantizado' },
        { autor: 'David V.', sede: 'ica',
          texto: 'Felicitar la atención, trabajo y recomendaciones del técnico Yeferson muy atinada su trabajo.' },
        { autor: 'Storm P.', sede: 'huancayo',
          texto: 'Un buen lugar donde puedes hacer convertir tu vehículo a glp y gnv te dan un diagnóstico efectivo en cuanto a los problemas que tiene tu vehículo y te dan una pronta solución para que vayas con confianza y tu vehículo quede con una garantía.' },
        { autor: 'Elvis R.', sede: 'ica',
          texto: 'Son buenísimos, hoy me atendieron dos personas el supervisor y creo que admirador y excelentes personas, Felicitaciones. Muy buen equipo de trabajo.' }
    ]
};
