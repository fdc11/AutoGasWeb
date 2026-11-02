/* =====================================================================
   resenas-google.js — Reseñas de Google Maps que se muestran en el Inicio
   ---------------------------------------------------------------------
   Se copian A MANO desde Google Maps (no se actualizan solas).
   Para cambiar o añadir una reseña, edita solo este archivo:

     { autor: 'Nombre tal como sale en Google', estrellas: 5,
       texto: 'Texto exacto de la reseña', fecha: 'octubre 2026' },

   Reglas para no meterse en problemas:
   - Copia reseñas REALES, con el nombre y el texto tal como están en Google.
     No inventes ni corrijas el texto (salvo cortar una reseña muy larga con "…").
   - Actualiza "puntaje" y "total" cuando cambien en Google (la sección
     dice que el puntaje incluye todas las reseñas).
   - Se muestran hasta 3 por sede.
   ===================================================================== */
window.RESENAS_GOOGLE = {
    actualizado: 'noviembre 2026', // cuándo copiaste los datos
    sedes: {
        ica: {
            puntaje: 4.1, total: 28,
            resenas: [
                // PENDIENTE: pegar aquí las reseñas de Ica
            ]
        },
        lima: {
            puntaje: 4.3, total: 11,
            resenas: [
                // PENDIENTE: pegar aquí las reseñas de Lima
            ]
        },
        huancayo: {
            puntaje: 4.2, total: 39,
            resenas: [
                // PENDIENTE: pegar aquí las reseñas de Huancayo
            ]
        },
        trujillo: {
            puntaje: 4.7, total: 29,
            resenas: [
                // PENDIENTE: pegar aquí las reseñas de Trujillo
            ]
        }
    }
};
