/* =============================================================================
   AutoGas · Asistente de Orientación Automática (v3)
   -----------------------------------------------------------------------------
   Motor de diagnóstico orientativo BASADO EN REGLAS (no usa IA generativa).

   Cómo funciona:
     1. Normaliza el texto (minúsculas, sin tildes) y lo divide en cláusulas.
     2. Detecta SÍNTOMAS mediante patrones flexibles:
          · límites de palabra (no hay coincidencias dentro de otras palabras)
          · comodín de prefijo  ->  "chirri*" = chirría, chirriando, chirrido…
          · hasta 2 palabras intermedias  ->  "pedal se hunde" detecta
            "el pedal del freno se hunde"
          · tolerancia a errores de tipeo (distancia de edición 1)
          · negaciones ("no huele a gas", "los frenos están bien")
          · exclusiones por contexto ("consume mucho aceite" ≠ consumo de gasolina)
     3. Cada síntoma aporta un PESO a uno o varios servicios del catálogo.
     4. El puntaje se convierte en un nivel de coincidencia (Alta / Media / Baja),
        sin porcentajes inflados.
     5. La URGENCIA es la del síntoma más grave detectado (0 a 3).
     6. Si el caso es ambiguo, propone una PREGUNTA DE SEGUIMIENTO para afinar.

   Es orientación referencial: el diagnóstico definitivo se hace en taller.
============================================================================= */
(function (global) {
    'use strict';

    /* ─────────────────────────────────────────────────────────────────────────
       1. CATÁLOGO DE SERVICIOS
       seccion = id de la sección de la página · card = título de la tarjeta
       terminos = menciones directas del servicio (peso menor que un síntoma)
    ───────────────────────────────────────────────────────────────────────── */
    const GRUPOS = {
        mecanica:   { nombre: 'Mecánica General',              color: '#ef4444', icono: 'llave' },
        preventivo: { nombre: 'Mantenimiento Preventivo',      color: '#f97316', icono: 'medidor' },
        conversion: { nombre: 'Conversión GNV/GLP',            color: '#3b82f6', icono: 'surtidor' },
        tramites:   { nombre: 'Certificaciones y Trámites',    color: '#22c55e', icono: 'documento' },
        gas:        { nombre: 'Mantenimiento Sistema de Gas',  color: '#a855f7', icono: 'llama' },
        repuestos:  { nombre: 'Repuestos y Componentes',       color: '#eab308', icono: 'caja' }
    };

    const SERVICIOS = {
        frenos: { nombre: 'Reparación de Frenos', grupo: 'mecanica', seccion: 'mecanica', card: 'Frenos, Dirección',
            desc: 'Revisión y reparación integral: pastillas, discos, líquido y bomba de freno.',
            terminos: ['freno', 'frenos', 'pastilla*', 'disco* de freno', 'zapata*', 'abs'] },
        direccion: { nombre: 'Reparación de Dirección', grupo: 'mecanica', seccion: 'mecanica', card: 'Frenos, Dirección',
            desc: 'Dirección hidráulica o eléctrica, cremallera, terminales y rótulas.',
            terminos: ['direccion', 'cremallera', 'rotula*', 'terminal* de direccion', 'servodireccion', 'alineacion'] },
        refrigeracion: { nombre: 'Reparación de Refrigeración', grupo: 'mecanica', seccion: 'mecanica', card: 'Frenos, Dirección',
            desc: 'Radiador, termostato, bomba de agua y electroventilador. Evita que el motor se recaliente.',
            terminos: ['radiador', 'termostato', 'bomba de agua', 'refrigerante', 'anticongelante', 'refrigeracion', 'electroventilador'] },
        embrague: { nombre: 'Reparación de Embrague', grupo: 'mecanica', seccion: 'mecanica', card: 'Sistema de Embrague',
            desc: 'Revisión y cambio del sistema de embrague: disco, plato y collarín.',
            terminos: ['embrague', 'clutch', 'cloch', 'cluch', 'collarin'] },
        culata: { nombre: 'Diagnóstico y Reparación de Culata', grupo: 'mecanica', seccion: 'mecanica', card: 'Culata',
            desc: 'Inspección de culata y junta para evitar daños mayores al motor.',
            terminos: ['culata', 'junta de culata', 'empaque de culata'] },
        motor: { nombre: 'Reparación Completa de Motor', grupo: 'mecanica', seccion: 'mecanica', card: 'Reparación Completa de Motor',
            desc: 'Desmontaje, rectificación y reparación total para recuperar la potencia original.',
            terminos: ['overhaul', 'reparar el motor', 'reparacion de motor', 'piston*', 'anillos', 'biela*', 'ciguenal', 'bancada'] },
        aceite: { nombre: 'Cambio de Aceite', grupo: 'preventivo', seccion: 'mecanica', card: 'Cambio de Aceite',
            desc: 'Aceite de motor, caja y corona con marcas Castrol, Shell, Chevron y Valvoline.',
            terminos: ['aceite', 'cambio de aceite', 'filtro de aceite', 'lubricante'] },
        bateria: { nombre: 'Diagnóstico de Baterías', grupo: 'preventivo', seccion: 'mecanica', card: 'Diagnóstico de Baterías',
            desc: 'Batería, alternador y sistema de carga. Detectamos la falla antes de que te deje varado.',
            terminos: ['bateria', 'alternador', 'bornes'] },
        diagnostico_vehicular: { nombre: 'Revisión y Diagnóstico Vehicular', grupo: 'preventivo', seccion: 'mecanica', card: 'Revisión y Diagnóstico Vehicular',
            desc: 'Escaneo OBD2 completo para leer códigos de falla y evaluar el estado general.',
            terminos: ['diagnostico', 'scanner', 'escaner', 'chequeo general'] },
        inyectores: { nombre: 'Limpieza de Inyectores', grupo: 'preventivo', seccion: 'mecanica', card: 'Limpieza de Inyectores',
            desc: 'Limpieza por ultrasonido para recuperar potencia y reducir el consumo.',
            terminos: ['inyector*', 'limpieza de inyectores'] },
        afinamiento: { nombre: 'Afinamiento Electrónico', grupo: 'preventivo', seccion: 'mecanica', card: 'Afinamiento Electrónico',
            desc: 'Puesta a punto electrónica del motor: arranque, ralentí, potencia y consumo.',
            terminos: ['afinamiento', 'afinar', 'afinado', 'afine', 'puesta a punto'] },
        fluidos: { nombre: 'Cambio de Fluidos', grupo: 'preventivo', seccion: 'mecanica', card: 'Cambio de Fluidos',
            desc: 'Renovación de líquidos de frenos, dirección y refrigeración.',
            terminos: ['fluido*', 'liquido*'] },
        conversion_glp: { nombre: 'Conversión a GLP', grupo: 'conversion', seccion: 'conversion', card: 'Conversión a GLP',
            desc: 'Gas Licuado de Petróleo: instalación rápida y amplia red de grifos en provincia.',
            terminos: ['glp', 'gas licuado'] },
        conversion_gnv: { nombre: 'Conversión a GNV', grupo: 'conversion', seccion: 'conversion', card: 'Conversión a GNV',
            desc: 'Gas Natural Vehicular: el combustible más económico, con opción de financiamiento FISE.',
            terminos: ['gnv', 'gas natural'] },
        inyeccion_directa: { nombre: 'Conversión Inyección Directa', grupo: 'conversion', seccion: 'conversion', card: 'Inyección Directa',
            desc: 'Conversión especializada para motores modernos de inyección directa.',
            terminos: ['inyeccion directa', 'gdi', 'tsi', 'tfsi'] },
        diesel_dual: { nombre: 'Diesel Dual Fuel', grupo: 'conversion', seccion: 'conversion', card: 'Diesel Dual Fuel',
            desc: 'Sistema mixto gas + diésel para reducir costos sin perder potencia.',
            terminos: ['diesel', 'dual fuel'] },
        cert_anual: { nombre: 'Certificación Anual GNV/GLP', grupo: 'tramites', seccion: 'conversion', card: 'Certificación Anual',
            desc: 'Revisión anual obligatoria del sistema de gas. Nos encargamos del trámite.',
            terminos: ['certificado*', 'certificacion*'] },
        cambio_caract: { nombre: 'Trámite Cambio de Características', grupo: 'tramites', seccion: 'conversion', card: 'Cambio de Características',
            desc: 'Registramos la conversión en la tarjeta de propiedad y documentos oficiales.',
            terminos: ['cambio de caracteristicas', 'tarjeta de propiedad', 'sunarp'] },
        quinquenal: { nombre: 'Inspección Quinquenal', grupo: 'tramites', seccion: 'conversion', card: 'Inspección Quinquenal',
            desc: 'Inspección obligatoria de cilindros cada 5 años.',
            terminos: ['quinquenal'] },
        fise: { nombre: 'Financiamiento FISE', grupo: 'tramites', seccion: 'conversion', card: 'Financiamiento FISE',
            desc: 'Financia tu conversión a GNV con el programa del Estado peruano.',
            terminos: ['fise'] },
        chip_gas: { nombre: 'Desbloqueo y Reprogramación de Chip', grupo: 'gas', seccion: 'conversion', card: 'Desbloqueo de Chip',
            desc: 'Desbloqueo y reprogramación del chip para volver a cargar gas.',
            terminos: ['chip'] },
        escaneo_gas: { nombre: 'Escaneo y Calibración de Gas', grupo: 'gas', seccion: 'conversion', card: 'Escaneo y Calibración',
            desc: 'Escaneo electrónico y calibración del sistema de gas para un funcionamiento óptimo.',
            terminos: ['calibracion', 'calibrar', 'escaneo'] },
        filtro_gas: { nombre: 'Cambio de Filtros de Gas', grupo: 'gas', seccion: 'conversion', card: 'Cambio de Filtros de Gas',
            desc: 'Reemplazo de filtros de fase líquida y gaseosa del sistema de gas.',
            terminos: ['filtro de gas', 'filtro del gas'] },
        fugas: { nombre: 'Revisión de Fugas de Gas', grupo: 'gas', seccion: 'conversion', card: 'Revisión de Fugas',
            desc: 'Detección y corrección de fugas con equipo especializado. Tu seguridad es lo primero.',
            terminos: ['fuga*'] },
        obturador: { nombre: 'Limpieza de Obturador', grupo: 'gas', seccion: 'conversion', card: 'Limpieza de Obturador',
            desc: 'Limpieza del obturador para un arranque y paso a gas correctos.',
            terminos: ['obturador'] },
        conductores: { nombre: 'Inspección de Conductores de Gas', grupo: 'gas', seccion: 'conversion', card: 'Inspección de Conductores',
            desc: 'Revisión de mangueras y conductos de gas y agua para detectar desgaste.',
            terminos: ['manguera*', 'conductor*'] },
        filtro_aire: { nombre: 'Cambio de Filtro de Aire', grupo: 'repuestos', seccion: 'repuestos', card: 'Filtro de Aire',
            desc: 'Un filtro limpio mejora la respuesta del motor y reduce el consumo.',
            terminos: ['filtro de aire', 'filtro del aire'] },
        bujias: { nombre: 'Cambio de Bujías', grupo: 'repuestos', seccion: 'repuestos', card: 'Bujías',
            desc: 'Bujías de calidad para un encendido limpio, mejor arranque y menor consumo.',
            terminos: ['bujia*'] },
        supresores: { nombre: 'Cambio de Supresores', grupo: 'repuestos', seccion: 'repuestos', card: 'Supresores',
            desc: 'Protegen el encendido de vehículos a gas contra el retroceso de llama.',
            terminos: ['supresor*'] },
        bobina: { nombre: 'Cambio de Caña de Bobina', grupo: 'repuestos', seccion: 'repuestos', card: 'Caña de Bobina',
            desc: 'Lleva la alta tensión de la bobina a las bujías. Clave para un encendido eficiente.',
            terminos: ['bobina*', 'cana de bobina', 'cable* de bujia*'] }
    };

    /* Servicios de "consulta" (no reparan fallas). Si el usuario describe una
       falla, se les baja el peso para no recomendar una conversión ante un
       problema mecánico. */
    const SERVICIOS_CONSULTA = ['conversion_glp', 'conversion_gnv', 'inyeccion_directa', 'diesel_dual', 'fise', 'cambio_caract'];

    /* ─────────────────────────────────────────────────────────────────────────
       2. CATÁLOGO DE SÍNTOMAS
       urg: 0 preventivo · 1 revisar · 2 pronto · 3 no conducir
       servicios: { idServicio: peso }
       excluir: palabras que, cerca de la coincidencia, la invalidan
       aclarar: pregunta de seguimiento para afinar el resultado
    ───────────────────────────────────────────────────────────────────────── */
    const SINTOMAS = [
        /* ── SEGURIDAD CRÍTICA ─────────────────────────────────────────── */
        { id: 'olor_gas', label: 'Olor o fuga de gas', urg: 3,
          consejo: 'Cierra la válvula del cilindro, no enciendas el motor ni fumes cerca y ventila el vehículo.',
          patrones: ['olor a gas', 'huele a gas', 'olor de gas', 'olor gas', 'huele gas', 'fuga de gas', 'fuga gas',
                     'se escapa el gas', 'escape de gas', 'pierde gas', 'perdida de gas', 'silba el cilindro', 'silbido en el cilindro'],
          servicios: { fugas: 7, conductores: 3 } },

        { id: 'no_frena', label: 'Frenado deficiente', urg: 3,
          consejo: 'Evita conducir: una pérdida de frenado es un riesgo inmediato para ti y para otros.',
          patrones: ['no frena', 'frena poco', 'frena mal', 'frena tarde', 'tarda en frenar', 'cuesta frenar', 'sin frenos',
                     'perdi los frenos', 'se quedo sin freno*', 'no responde el freno', 'frenos no responden', 'no agarra el freno'],
          servicios: { frenos: 7, fluidos: 2 } },

        { id: 'pedal_hunde', label: 'Pedal de freno blando o se hunde', urg: 3,
          consejo: 'Un pedal que se hunde suele indicar fuga de líquido o falla de bomba. No conduzcas hasta revisarlo.',
          patrones: ['pedal se hunde', 'pedal blando', 'pedal esponjoso', 'pedal llega al fondo', 'pedal hasta el fondo',
                     'pedal al fondo', 'pedal se va al fondo', 'pedal baja'],
          excluir: ['embrague', 'clutch', 'cloch', 'cluch'],
          servicios: { frenos: 7, fluidos: 3 } },

        { id: 'recalienta', label: 'Motor se recalienta', urg: 3,
          consejo: 'Detente en un lugar seguro y apaga el motor. No abras el radiador en caliente.',
          patrones: ['se recalienta', 'recalient*', 'se calienta', 'calienta mucho', 'sobrecalent*', 'temperatura alta',
                     'temperatura sube', 'sube la temperatura', 'aguja de temperatura', 'aguja sube', 'calenton', 'overheat'],
          servicios: { refrigeracion: 7, culata: 2 } },

        { id: 'aceite_agua', label: 'Aceite mezclado con agua', urg: 3,
          consejo: 'Suele indicar junta de culata dañada. Seguir manejando puede fundir el motor.',
          patrones: ['aceite con agua', 'agua con aceite', 'aceite lechoso', 'aceite blanco', 'mayonesa', 'aceite en el agua',
                     'aceite en el radiador', 'agua en el aceite', 'emulsion'],
          servicios: { culata: 8, motor: 2, refrigeracion: 1 } },

        { id: 'luz_aceite', label: 'Luz de presión de aceite', urg: 3,
          consejo: 'Apaga el motor y revisa el nivel. Manejar sin presión de aceite puede dañar el motor en minutos.',
          patrones: ['luz de aceite', 'testigo de aceite', 'presion de aceite', 'alarma de aceite', 'aceitera', 'foco de aceite'],
          servicios: { aceite: 5, motor: 3 } },

        { id: 'golpeteo', label: 'Golpeteo metálico en el motor', urg: 3,
          consejo: 'Un golpeteo metálico puede ser biela o falta de lubricación. Evita exigir el motor.',
          patrones: ['golpeteo', 'golpea el motor', 'motor golpea', 'cascabel*', 'taca taca', 'tac tac', 'ruido metalico', 'suena a metal'],
          servicios: { motor: 6, aceite: 1.5, afinamiento: 1 } },

        { id: 'olor_gasolina', label: 'Olor a gasolina', urg: 3,
          consejo: 'Riesgo de incendio: no enciendas el motor cerca de fuentes de calor y revísalo cuanto antes.',
          patrones: ['olor a gasolina', 'huele a gasolina', 'olor a combustible', 'huele a combustible', 'gotea gasolina',
                     'fuga de gasolina', 'pierde gasolina', 'chorrea gasolina'],
          servicios: { inyectores: 4, diagnostico_vehicular: 4, conductores: 1 } },

        { id: 'check_parpadea', label: 'Check engine parpadeando', urg: 3,
          consejo: 'Una luz de motor que parpadea suele indicar un fallo de encendido grave. Reduce la velocidad y no exijas el motor.',
          patrones: ['check engine parpadea', 'check parpadea', 'luz del motor parpadea', 'parpadea el check', 'check engine parpadeando'],
          servicios: { diagnostico_vehicular: 5, bobina: 2.5, bujias: 2.5 } },

        /* ── PRONTO (urg 2) ────────────────────────────────────────────── */
        { id: 'vapor', label: 'Sale vapor del motor', urg: 2,
          patrones: ['vapor', 'echa vapor', 'bota vapor', 'sale vapor', 'humea el capot', 'humo del capot', 'sale humo del capot'],
          servicios: { refrigeracion: 5, culata: 1.5 } },

        { id: 'pierde_refrigerante', label: 'Pérdida de refrigerante', urg: 2,
          patrones: ['pierde agua', 'pierde refrigerante', 'consume agua', 'consume refrigerante', 'falta agua', 'falta refrigerante',
                     'baja el agua', 'baja el refrigerante', 'gotea agua', 'charco de agua', 'fuga de agua', 'fuga de refrigerante',
                     'manguera del radiador'],
          servicios: { refrigeracion: 5, culata: 2 } },

        { id: 'humo_blanco', label: 'Humo blanco por el escape', urg: 2,
          patrones: ['humo blanco', 'humo blanquecino'],
          servicios: { culata: 5, refrigeracion: 2 } },

        { id: 'burbujas', label: 'Burbujas en el refrigerante', urg: 2,
          patrones: ['burbuj*'],
          servicios: { culata: 5, refrigeracion: 1.5 } },

        { id: 'humo_azul', label: 'Humo azul / consume aceite', urg: 2,
          patrones: ['humo azul', 'humo azulado', 'humo gris', 'quema aceite', 'consume aceite', 'come aceite', 'gasta aceite', 'baja el aceite'],
          servicios: { motor: 6, aceite: 1.5 } },

        { id: 'fuga_aceite', label: 'Fuga de aceite', urg: 2,
          patrones: ['pierde aceite', 'gotea aceite', 'fuga de aceite', 'mancha de aceite', 'charco de aceite', 'chorrea aceite', 'bota aceite'],
          servicios: { aceite: 4, motor: 3 } },

        { id: 'volante_duro', label: 'Volante duro o pesado', urg: 2,
          patrones: ['volante duro', 'timon duro', 'volante pesado', 'timon pesado', 'direccion dura', 'direccion pesada',
                     'cuesta girar', 'dificil girar', 'cuesta mover el volante', 'cuesta mover el timon'],
          servicios: { direccion: 7, fluidos: 1.5 } },

        { id: 'embrague_patina', label: 'Embrague patina', urg: 2,
          patrones: ['patina el embrague', 'embrague patina', 'patina', 'embrague resbala', 'revoluciona pero no avanza',
                     'acelera pero no avanza', 'sube de revoluciones pero no avanza', 'embrague alto', 'agarra arriba', 'agarra muy alto'],
          excluir: ['llanta*', 'rueda*', 'arena', 'barro'],
          servicios: { embrague: 7 } },

        { id: 'olor_quemado', label: 'Olor a quemado', urg: 2,
          patrones: ['olor a quemado', 'huele a quemado', 'olor quemado', 'huele quemado', 'olor a jebe', 'huele a jebe', 'olor a goma quemada'],
          servicios: { embrague: 3, frenos: 2.5, aceite: 1, motor: 1 },
          aclarar: { pregunta: '¿Cuándo notas el olor a quemado?', opciones: [
              { texto: 'Al arrancar en subida o al soltar el embrague', agrega: 'al arrancar en subida patina el embrague' },
              { texto: 'Después de frenar mucho', agrega: 'despues de frenar mucho, ruido al frenar' },
              { texto: 'Sale del motor con el carro encendido', agrega: 'pierde aceite en el motor' } ] } },

        { id: 'no_arranca', label: 'No arranca', urg: 2,
          patrones: ['no arranca', 'no prende', 'no enciende', 'no quiere arrancar', 'no quiere prender', 'no da arranque', 'no hay arranque', 'no parte'],
          excluir: ['gas', 'gnv', 'glp'],
          servicios: { bateria: 3.5, afinamiento: 2, bujias: 2, diagnostico_vehicular: 1.5 },
          aclarar: { pregunta: '¿Qué pasa cuando giras la llave?', opciones: [
              { texto: 'No hace nada o solo suena un clic', agrega: 'solo hace clic' },
              { texto: 'El motor gira pero no prende', agrega: 'gira pero no prende' },
              { texto: 'Arranca en gasolina, pero no pasa a gas', agrega: 'no pasa a gas' } ] } },

        { id: 'se_apaga', label: 'El motor se apaga solo', urg: 2,
          patrones: ['se apaga', 'se me apaga', 'se para el motor', 'se muere', 'se queda muerto', 'se ahoga y se apaga'],
          excluir: ['luz', 'luces', 'radio', 'tablero', 'pantalla'],
          servicios: { afinamiento: 3, inyectores: 2, bateria: 1.5, obturador: 1.5, diagnostico_vehicular: 1.5 },
          aclarar: { pregunta: '¿En qué momento se apaga?', opciones: [
              { texto: 'Cuando estoy usando gas', agrega: 'se apaga en gas' },
              { texto: 'Al detenerme o en ralentí', agrega: 'ralenti inestable' },
              { texto: 'Mientras manejo y bajan las luces', agrega: 'luces debiles, bateria' } ] } },

        { id: 'falla_cilindro', label: 'Fallo de encendido / cilindro', urg: 2,
          patrones: ['falla un cilindro', 'cilindro falla', 'cojea', 'renguea', 'misfire', 'falla de encendido', 'tartamudea',
                     'jalonea', 'jalona', 'da jalones', 'tironea', 'petardea', 'petardeo', 'tose', 'explosion* en el escape'],
          servicios: { bobina: 4, bujias: 4, afinamiento: 2, supresores: 1.5, inyectores: 1.5 } },

        { id: 'check_engine', label: 'Luz de check engine', urg: 2,
          patrones: ['check engine', 'chek engine', 'check', 'luz del motor', 'luz de motor', 'luz amarilla', 'luz naranja',
                     'testigo del motor', 'foco del motor', 'codigo de falla', 'codigo de error', 'obd'],
          servicios: { diagnostico_vehicular: 6, afinamiento: 1 },
          aclarar: { pregunta: '¿Cómo se comporta la luz del motor?', opciones: [
              { texto: 'Parpadea', agrega: 'check engine parpadea' },
              { texto: 'Está fija', agrega: 'luz fija' },
              { texto: 'Se prende y apaga a ratos', agrega: 'falla a ratos' } ] } },

        { id: 'luz_abs', label: 'Luz de ABS o frenos', urg: 2,
          patrones: ['luz abs', 'luz del abs', 'testigo abs', 'luz de freno*', 'testigo de freno*'],
          servicios: { frenos: 5, diagnostico_vehicular: 2.5 } },

        { id: 'retroceso', label: 'Retroceso de llama / explosión', urg: 2,
          patrones: ['retroceso', 'retroceso de llama', 'explosion en el multiple', 'explosion en la admision', 'revienta', 'reviento',
                     'contraexplosion', 'backfire', 'explota el filtro'],
          servicios: { supresores: 6, bujias: 2, bobina: 1.5, escaneo_gas: 1.5 } },

        { id: 'humo_generico', label: 'Sale humo', urg: 2, generico: ['humo_blanco', 'humo_azul', 'humo_negro', 'vapor'],
          patrones: ['humo', 'bota humo', 'echa humo', 'sale humo', 'humea'],
          servicios: { diagnostico_vehicular: 1.5, culata: 1, motor: 1, inyectores: 1 },
          aclarar: { pregunta: '¿De qué color es el humo?', opciones: [
              { texto: 'Blanco', agrega: 'humo blanco' },
              { texto: 'Azul o gris', agrega: 'humo azul' },
              { texto: 'Negro', agrega: 'humo negro' },
              { texto: 'Sale del capó, no del escape', agrega: 'sale vapor del capot' } ] } },

        /* ── REVISAR (urg 1) ───────────────────────────────────────────── */
        { id: 'ruido_freno', label: 'Ruido al frenar', urg: 1,
          patrones: ['ruido al frenar', 'suena al frenar', 'chirri* al frenar', 'rechin* al frenar', 'chilla* al frenar', 'raspa* al frenar',
                     'cruje al frenar', 'frenos suenan', 'frenos chirri*', 'frenos rechin*', 'frenos chilla*',
                     'chirri* los frenos', 'rechin* los frenos', 'chilla* los frenos', 'suenan los frenos', 'chirri*', 'rechin*'],
          servicios: { frenos: 6 } },

        { id: 'vibra_freno', label: 'Vibración al frenar', urg: 1,
          patrones: ['vibra al frenar', 'tiembla al frenar', 'vibra cuando freno', 'vibra cuando frena'],
          servicios: { frenos: 5, direccion: 1 } },

        { id: 'liquido_freno', label: 'Líquido de frenos', urg: 1,
          patrones: ['liquido de freno*', 'liquido freno*'],
          servicios: { fluidos: 4, frenos: 2.5 } },

        { id: 'cambio_frenos', label: 'Mantenimiento de frenos', urg: 0,
          patrones: ['cambio de pastillas', 'cambiar pastillas', 'cambiar las pastillas', 'pastillas gastadas', 'rectificar discos',
                     'rectificado de discos', 'cambio de frenos', 'revision de frenos', 'revisar los frenos', 'mantenimiento de frenos'],
          servicios: { frenos: 6 } },

        { id: 'freno_mano', label: 'Freno de mano', urg: 1,
          patrones: ['freno de mano', 'freno de emergencia', 'freno de parqueo'],
          servicios: { frenos: 4 } },

        { id: 'jala_lado', label: 'Se desvía hacia un lado', urg: 1,
          patrones: ['jala a un lado', 'jala hacia un lado', 'jala a la derecha', 'jala a la izquierda', 'se va a un lado', 'se va de lado',
                     'se va a la derecha', 'se va a la izquierda', 'se desvia', 'se jala', 'no va recto', 'no anda recto'],
          servicios: { direccion: 6 } },

        { id: 'ruido_girar', label: 'Ruido al girar', urg: 1,
          patrones: ['ruido al girar', 'suena al girar', 'traque* al girar', 'cruje al girar', 'ruido al voltear', 'suena al voltear',
                     'ruido en las curvas', 'suena en las curvas', 'ruido al doblar', 'suena al doblar'],
          servicios: { direccion: 6 } },

        { id: 'volante_vibra', label: 'Vibración en el volante', urg: 1,
          patrones: ['volante vibra', 'timon vibra', 'vibra el volante', 'vibra el timon', 'volante tiembla', 'timon tiembla'],
          servicios: { direccion: 4, frenos: 1.5 } },

        { id: 'cambios_duros', label: 'Cambios duros o raspan', urg: 1,
          patrones: ['cambios duros', 'marchas duras', 'no entran los cambios', 'no entra la marcha', 'no entran las marchas', 'cuesta meter',
                     'cuesta cambiar', 'raspa al cambiar', 'cruje al cambiar', 'rechina al cambiar', 'suena al cambiar', 'se sale la marcha',
                     'se sale el cambio', 'no entra el cambio'],
          servicios: { embrague: 6, fluidos: 1 } },

        { id: 'pedal_embrague', label: 'Problema en el embrague', urg: 1,
          patrones: ['pedal de embrague', 'pedal del embrague', 'embrague duro', 'embrague blando', 'embrague se hunde', 'embrague bajo',
                     'embrague suena', 'ruido en el embrague'],
          servicios: { embrague: 6 } },

        { id: 'ventilador', label: 'Ventilador del radiador', urg: 1,
          patrones: ['ventilador no prende', 'ventilador no funciona', 'ventilador no gira', 'ventilador del radiador', 'electroventilador'],
          servicios: { refrigeracion: 6 } },

        { id: 'sin_fuerza', label: 'Pérdida de potencia', urg: 1,
          patrones: ['sin fuerza', 'no tiene fuerza', 'perdio fuerza', 'pierde fuerza', 'le falta fuerza', 'sin potencia', 'pierde potencia',
                     'perdio potencia', 'no jala', 'sin jale', 'le falta jale', 'no sube las cuestas', 'le cuesta subir', 'no acelera',
                     'acelera lento', 'aceleracion lenta', 'no responde al acelerar', 'esta lento', 'esta pesado'],
          servicios: { afinamiento: 3, filtro_aire: 2.5, inyectores: 2, bujias: 2, motor: 1.5, escaneo_gas: 1, filtro_gas: 1 },
          aclarar: { pregunta: '¿Cuándo pierde fuerza?', opciones: [
              { texto: 'Solo cuando uso gas', agrega: 'pierde potencia en gas' },
              { texto: 'También con gasolina', agrega: 'motor tiembla y pierde fuerza con gasolina' },
              { texto: 'El motor acelera pero el carro no avanza', agrega: 'revoluciona pero no avanza' } ] } },

        { id: 'gas_sin_fuerza', label: 'Pierde potencia usando gas', urg: 1,
          patrones: ['pierde potencia en gas', 'pierde fuerza en gas', 'sin fuerza en gas', 'con gas no jala', 'en gas no jala',
                     'gas sin fuerza', 'con gas pierde', 'en gas pierde', 'con gas se pone lento', 'en gas esta lento'],
          servicios: { escaneo_gas: 5, filtro_gas: 4.5, supresores: 1, obturador: 1 } },

        { id: 'motor_tiembla', label: 'Motor tiembla / ralentí irregular', urg: 1,
          patrones: ['motor tiembla', 'tiembla el motor', 'tiembla en ralenti', 'tiembla parado', 'tiembla en neutro', 'vibra el motor',
                     'motor vibra', 'ralenti irregular', 'ralenti inestable', 'ralenti bajo', 'ralenti alto', 'se acelera solo',
                     'sube y baja de revoluciones', 'revoluciones suben y bajan', 'cabecea', 'esta tosco', 'motor tosco'],
          servicios: { afinamiento: 3.5, bujias: 3, inyectores: 3, bobina: 2, obturador: 0.5 } },

        { id: 'cuesta_arrancar', label: 'Arranque difícil', urg: 1,
          patrones: ['gira pero no prende', 'gira pero no arranca', 'da vueltas pero no prende', 'da arranque pero no prende',
                     'cuesta arrancar', 'arranca mal', 'arranque dificil', 'demora en arrancar', 'demora en prender', 'cuesta prender',
                     'dificil de arrancar', 'arranca a la segunda', 'arranca al segundo intento', 'no arranca en las mananas',
                     'no arranca en frio', 'en frio no arranca',
                     'falla el arranque', 'falla al arrancar', 'falla en el arranque', 'problemas para arrancar', 'problema de arranque'],
          servicios: { afinamiento: 4, bujias: 3.5, inyectores: 2, bobina: 1.5, filtro_aire: 0.5 } },

        { id: 'bateria_debil', label: 'Batería débil o sin carga', urg: 1,
          patrones: ['solo hace clic', 'hace clic', 'hace click', 'arranque lento', 'arranque flojo', 'gira lento', 'bateria baja',
                     'bateria descargada', 'bateria muerta', 'bateria vieja', 'se descarga', 'se descargo', 'luces debiles', 'luces bajan',
                     'luz de bateria', 'testigo de bateria', 'no carga la bateria', 'bornes sulfatados', 'sulfat*',
                     'pasar corriente', 'empujar el carro', 'empujarlo para arrancar', 'cables de corriente'],
          servicios: { bateria: 7 } },

        { id: 'electrico', label: 'Falla eléctrica', urg: 1,
          patrones: ['sistema electrico', 'corto circuito', 'cortocircuito', 'fusible*', 'tablero se apaga', 'radio se apaga',
                     'luces parpadean', 'falla electrica', 'problema electrico'],
          servicios: { bateria: 3.5, diagnostico_vehicular: 3 } },

        { id: 'gas_no_arranca', label: 'No arranca o no pasa a gas', urg: 1,
          patrones: ['no arranca en gas', 'no arranca con gas', 'no prende en gas', 'no prende con gas', 'no pasa a gas', 'no cambia a gas',
                     'no cambia al gas', 'no entra el gas', 'se pasa a gasolina', 'se cambia a gasolina', 'regresa a gasolina',
                     'vuelve a gasolina', 'no usa el gas', 'no agarra el gas', 'no agarra gas'],
          servicios: { obturador: 6, escaneo_gas: 3, chip_gas: 1.5, filtro_gas: 1 } },

        { id: 'gas_se_apaga', label: 'Se apaga usando gas', urg: 1,
          patrones: ['se apaga en gas', 'se apaga con gas', 'se apaga al cambiar a gas', 'se apaga al pasar a gas', 'con gas se apaga',
                     'en gas se apaga'],
          servicios: { obturador: 5, escaneo_gas: 4, filtro_gas: 1.5 } },

        { id: 'gas_falla', label: 'Falla del sistema de gas', urg: 1,
          patrones: ['gas mal calibrado', 'falla con gas', 'falla en gas', 'en gas falla', 'con gas falla', 'gas no funciona',
                     'gas irregular', 'conmutador parpadea', 'pita el conmutador', 'suena el conmutador', 'luz del conmutador',
                     'alarma del gas', 'pitido del gas'],
          servicios: { escaneo_gas: 6, chip_gas: 1.5, obturador: 1.5 } },

        { id: 'no_carga_gas', label: 'No te dejan cargar gas', urg: 1,
          patrones: ['no me dejan cargar', 'no puedo cargar gas', 'no me cargan gas', 'no me cargan', 'no me venden gas', 'grifo no carga',
                     'no me deja cargar', 'no dejan cargar', 'chip bloqueado', 'bloqueo de chip', 'bloquearon el chip', 'infogas', 'chip vencido'],
          servicios: { chip_gas: 5, cert_anual: 5, quinquenal: 1.5 },
          aclarar: { pregunta: '¿Cuándo hiciste tu última certificación anual?', opciones: [
              { texto: 'Hace más de un año', agrega: 'certificado vencido' },
              { texto: 'Está vigente', agrega: 'desbloquear chip' },
              { texto: 'El cilindro tiene más de 5 años', agrega: 'cilindro vencido quinquenal' } ] } },

        { id: 'manguera_gas', label: 'Mangueras o conductos de gas', urg: 1,
          patrones: ['manguera de gas', 'manguera del gas', 'mangueras de gas', 'tuberia de gas', 'caneria de gas', 'conexion de gas',
                     'presion de gas', 'baja presion de gas', 'manguera rajada', 'manguera reseca', 'manguera vieja', 'manguera rota'],
          servicios: { conductores: 6, fugas: 1.5 } },

        { id: 'humo_negro', label: 'Humo negro por el escape', urg: 1,
          patrones: ['humo negro', 'negro por el tubo', 'hollin', 'tubo de escape negro'],
          servicios: { inyectores: 4.5, afinamiento: 3, filtro_aire: 2 } },

        { id: 'aceite_bajo', label: 'Nivel de aceite bajo', urg: 1,
          patrones: ['aceite bajo', 'nivel de aceite', 'bajo de aceite', 'falta aceite', 'poco aceite'],
          servicios: { aceite: 5, motor: 1 } },

        { id: 'ruido_motor', label: 'Ruido en el motor', urg: 1,
          patrones: ['ruido en el motor', 'ruido del motor', 'ruido motor', 'motor hace ruido', 'motor suena', 'suena el motor', 'motor ruidoso'],
          servicios: { motor: 2.5, diagnostico_vehicular: 2.5, afinamiento: 1 } },

        { id: 'intermitente', label: 'Falla intermitente o poco clara', urg: 1,
          patrones: ['falla a veces', 'a veces falla', 'de vez en cuando', 'intermitente', 'a ratos', 'falla rara', 'algo raro',
                     'no se que tiene', 'no se que le pasa', 'ruido raro', 'hace cosas raras'],
          servicios: { diagnostico_vehicular: 4 } },

        { id: 'ruido_generico', label: 'Ruido', urg: 1,
          generico: ['ruido_freno', 'ruido_girar', 'cambios_duros', 'ruido_motor', 'golpeteo', 'intermitente', 'pedal_embrague'],
          patrones: ['ruido', 'ruidos', 'sonido raro', 'suena feo', 'suena raro'],
          servicios: { diagnostico_vehicular: 1.5, motor: 0.5 },
          aclarar: { pregunta: '¿Cuándo aparece el ruido?', opciones: [
              { texto: 'Al frenar', agrega: 'ruido al frenar' },
              { texto: 'Al girar el volante', agrega: 'ruido al girar' },
              { texto: 'Al cambiar de marcha', agrega: 'suena al cambiar' },
              { texto: 'Viene del motor', agrega: 'ruido en el motor' } ] } },

        /* ── PREVENTIVO / CONSULTA (urg 0) ─────────────────────────────── */
        { id: 'consumo_alto', label: 'Consumo alto de combustible', urg: 0,
          patrones: ['consume mucho', 'gasta mucho', 'gasto mucho', 'alto consumo', 'consumo alto', 'mucho consumo', 'consume demasiado',
                     'gasta demasiado', 'chupa mucho', 'traga mucho', 'se acaba rapido', 'mal rendimiento', 'poco rendimiento',
                     'rendimiento bajo', 'rinde poco', 'no rinde', 'mucha gasolina', 'mucho combustible', 'gasta mas de lo normal'],
          excluir: ['aceite', 'agua', 'refrigerante', 'gas', 'gnv', 'glp', 'bateria'],
          servicios: { inyectores: 3.5, afinamiento: 3.5, filtro_aire: 2, bujias: 2, conversion_gnv: 1, conversion_glp: 1 },
          aclarar: { pregunta: '¿Tu vehículo ya funciona a gas (GNV/GLP)?', opciones: [
              { texto: 'Sí, ya uso gas', agrega: 'consume mucho gas' },
              { texto: 'No, solo gasolina', agrega: 'motor tiembla en ralenti' },
              { texto: 'Quiero ahorrar pasándome a gas', agrega: 'quiero convertir a gas para ahorrar' } ] } },

        { id: 'consumo_gas', label: 'Consumo alto de gas', urg: 0,
          patrones: ['consume mucho gas', 'gasta mucho gas', 'gas se acaba rapido', 'gas no rinde', 'gas rinde poco', 'consumo de gas alto',
                     'mucho consumo de gas', 'gasta mas gas'],
          servicios: { escaneo_gas: 6, filtro_gas: 2.5, chip_gas: 1 } },

        { id: 'mantenimiento', label: 'Mantenimiento preventivo', urg: 0,
          patrones: ['mantenimiento', 'mantenimiento preventivo', 'service', 'servicio general', 'revision general', 'chequeo general',
                     'chequeo', 'viaje largo', 'antes de viajar', 'voy a viajar', 'carro usado', 'auto usado', 'compre un carro', 'compre un auto'],
          servicios: { diagnostico_vehicular: 4.5, aceite: 2, fluidos: 1.5, afinamiento: 1.5, filtro_aire: 1 } },

        { id: 'cambio_aceite', label: 'Cambio de aceite', urg: 0,
          patrones: ['cambio de aceite', 'cambiar el aceite', 'cambiar aceite', 'toca cambio de aceite', 'aceite sucio', 'aceite negro',
                     'aceite viejo', 'aceite vencido', 'filtro de aceite', 'servicio de aceite', '5000 km', '5000 kilometros'],
          servicios: { aceite: 7 } },

        { id: 'cambio_fluidos', label: 'Cambio de fluidos', urg: 0,
          patrones: ['cambio de liquidos', 'cambiar liquidos', 'cambio de fluidos', 'cambiar fluidos', 'liquido de direccion',
                     'refrigerante viejo', 'liquido sucio', 'fluido oscuro'],
          servicios: { fluidos: 6 } },

        { id: 'alineacion', label: 'Alineación y desgaste de llantas', urg: 0,
          patrones: ['alineacion', 'alinear', 'balanceo', 'convergencia', 'llantas gastadas de un lado', 'desgaste irregular'],
          servicios: { direccion: 4.5 } },

        { id: 'convertir_gas', label: 'Quieres convertir a gas', urg: 0, tipo: 'consulta',
          patrones: ['convertir* a gas', 'pasar* a gas', 'poner gas', 'instalar gas', 'cambiar a gas', 'quiero gas',
                     'conversion a gas', 'convertir mi carro', 'convertir mi auto', 'kit de gas', 'ahorrar combustible', 'ahorrar',
                     'economizar', 'gasolina cara', 'gasolina esta cara', 'sube la gasolina', 'gastar menos'],
          servicios: { conversion_gnv: 4.5, conversion_glp: 4.5, fise: 1 },
          aclarar: { pregunta: '¿Qué tipo de gas te interesa?', opciones: [
              { texto: 'GNV (gas natural)', agrega: 'gnv' },
              { texto: 'GLP (gas licuado)', agrega: 'glp' },
              { texto: 'Mi motor es diésel', agrega: 'motor diesel' },
              { texto: 'Mi motor es turbo / inyección directa', agrega: 'inyeccion directa' } ] } },

        { id: 'gnv', label: 'GNV', urg: 0, tipo: 'consulta',
          patrones: ['gnv', 'gas natural', 'gas natural vehicular'],
          servicios: { conversion_gnv: 3.5, fise: 1 } },

        { id: 'glp', label: 'GLP', urg: 0, tipo: 'consulta',
          patrones: ['glp', 'gas licuado', 'propano', 'toroidal'],
          servicios: { conversion_glp: 3.5 } },

        { id: 'diesel', label: 'Motor diésel', urg: 0, tipo: 'consulta',
          patrones: ['diesel', 'petroleo', 'camion', 'minibus', 'furgon', 'dual fuel', 'motor diesel'],
          servicios: { diesel_dual: 6 } },

        { id: 'inyeccion_directa', label: 'Motor de inyección directa', urg: 0, tipo: 'consulta',
          patrones: ['inyeccion directa', 'gdi', 'tsi', 'tfsi', 'motor turbo', 'ecoboost', 'skyactiv'],
          servicios: { inyeccion_directa: 6 } },

        { id: 'fise', label: 'Financiamiento', urg: 0, tipo: 'consulta',
          patrones: ['fise', 'financiamiento', 'financiar', 'credito', 'cuotas', 'subsidio', 'bono', 'pagar en partes', 'prestamo'],
          servicios: { fise: 6, conversion_gnv: 2 } },

        { id: 'certificado', label: 'Certificación anual', urg: 0,
          patrones: ['certificado', 'certificacion', 'certificar', 'revision anual', 'inspeccion anual', 'certificado vencido',
                     'vencio el certificado', 'renovar certificado', 'renovar el certificado'],
          servicios: { cert_anual: 7 } },

        { id: 'quinquenal', label: 'Cilindro por vencer (quinquenal)', urg: 0,
          patrones: ['quinquenal', 'cilindro vencido', 'cilindro vence', 'vence el cilindro', 'vencio el cilindro', 'prueba hidrostatica',
                     'prueba hidraulica', 'revision del cilindro', 'cilindro tiene 5 anos', 'cilindro de 5 anos', 'cinco anos'],
          servicios: { quinquenal: 7 } },

        { id: 'tramite', label: 'Trámite documentario', urg: 0, tipo: 'consulta',
          patrones: ['tarjeta de propiedad', 'sunarp', 'cambio de caracteristicas', 'legalizar', 'regularizar', 'inscribir la conversion',
                     'papeles', 'documentos', 'tramite', 'tramites'],
          servicios: { cambio_caract: 5, cert_anual: 1.5 } },

        { id: 'chip', label: 'Chip del sistema de gas', urg: 0,
          patrones: ['desbloquear chip', 'desbloquear el chip', 'reprogramar chip', 'reprogramar el chip', 'programar chip', 'chip del gas',
                     'chip de gas', 'centralita', 'computadora del gas'],
          servicios: { chip_gas: 6 } },

        { id: 'calibrar_gas', label: 'Calibración de gas', urg: 0,
          patrones: ['calibrar el gas', 'calibracion del gas', 'calibrar gas', 'escaneo del gas', 'escanear el gas'],
          servicios: { escaneo_gas: 6 } },

        { id: 'filtro_gas', label: 'Filtros del sistema de gas', urg: 0,
          patrones: ['filtro de gas', 'filtro del gas', 'filtro gnv', 'filtro glp', 'filtro de fase', 'filtros de gas'],
          servicios: { filtro_gas: 7 } },

        { id: 'filtro_aire', label: 'Filtro de aire', urg: 0,
          patrones: ['filtro de aire', 'filtro del aire', 'purificador'],
          servicios: { filtro_aire: 7 } },

        { id: 'bujias', label: 'Bujías', urg: 0,
          patrones: ['bujia*', 'chispa', 'ignicion'],
          servicios: { bujias: 5, bobina: 1 } },

        { id: 'bobina', label: 'Bobina / cables de encendido', urg: 0,
          patrones: ['bobina*', 'cana de bobina', 'cable* de bujia*', 'cables de alta', 'distribuidor'],
          servicios: { bobina: 6 } },

        { id: 'supresor', label: 'Supresores', urg: 0,
          patrones: ['supresor*'],
          servicios: { supresores: 7 } },

        { id: 'obturador', label: 'Obturador', urg: 0,
          patrones: ['obturador'],
          servicios: { obturador: 7 } },

        { id: 'inyectores', label: 'Inyectores', urg: 0,
          patrones: ['inyector*', 'limpieza de inyectores', 'limpiar inyectores'],
          servicios: { inyectores: 6 } },

        { id: 'afinamiento', label: 'Afinamiento', urg: 0,
          patrones: ['afinamiento', 'afinar', 'afinado', 'afine', 'puesta a punto'],
          servicios: { afinamiento: 6 } },

        { id: 'scanner', label: 'Escaneo del vehículo', urg: 0,
          patrones: ['scanner', 'escaner', 'escanear', 'diagnostico completo', 'revision completa', 'revisar todo'],
          servicios: { diagnostico_vehicular: 4 } }
    ];

    /* ─────────────────────────────────────────────────────────────────────────
       3. UTILIDADES DE TEXTO
    ───────────────────────────────────────────────────────────────────────── */
    const NEGACIONES = new Set(['no', 'nunca', 'ni', 'sin', 'tampoco', 'jamas']);
    const CORTES_NEGACION = new Set(['pero', 'sino', 'aunque', 'y', 'o', 'que', 'porque', 'cuando']);
    const VERBOS_ESTADO = new Set(['esta', 'estan', 'funciona', 'funcionan', 'anda', 'andan', 'va', 'van', 'estaban', 'estaba', 'quedo', 'quedaron']);
    const ESTADOS_OK = new Set(['bien', 'ok', 'normal', 'normales', 'perfecto', 'perfectos', 'perfecta', 'perfectas', 'impecable']);
    const MAX_HUECO = 2; // palabras intermedias permitidas entre tokens de un patrón

    function normalizar(str) {
        return String(str || '').toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '');
    }

    /** Divide el texto en cláusulas (por signos de puntuación) y tokens. */
    function tokenizar(texto) {
        return normalizar(texto)
            .replace(/[.;:!?¡¿,\n\r()]+/g, ' | ')
            .replace(/[^a-z0-9| ]+/g, ' ')
            .split('|')
            .map(c => c.trim().split(/\s+/).filter(Boolean))
            .filter(c => c.length);
    }

    function compilarPatron(p) {
        return normalizar(p).replace(/[^a-z0-9* ]+/g, ' ').trim().split(/\s+/).map(t => {
            const prefijo = t.endsWith('*');
            return { t: prefijo ? t.slice(0, -1) : t, prefijo };
        });
    }

    /** Distancia de Levenshtein con corte temprano (solo nos importa ≤ 1). */
    function distancia(a, b) {
        if (Math.abs(a.length - b.length) > 1) return 2;
        if (a.length === b.length) { // letras intercambiadas: "frneo" ≈ "freno"
            const d = [];
            for (let i = 0; i < a.length && d.length < 3; i++) if (a[i] !== b[i]) d.push(i);
            if (d.length === 2 && d[1] === d[0] + 1 && a[d[0]] === b[d[1]] && a[d[1]] === b[d[0]]) return 1;
        }
        const m = a.length, n = b.length;
        let prev = Array.from({ length: n + 1 }, (_, j) => j);
        for (let i = 1; i <= m; i++) {
            const cur = [i];
            let minFila = i;
            for (let j = 1; j <= n; j++) {
                cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
                if (cur[j] < minFila) minFila = cur[j];
            }
            if (minFila > 1) return 2;
            prev = cur;
        }
        return prev[n];
    }

    /** ¿La palabra coincide con el token del patrón? Devuelve fuerza 0–1. */
    function coincideToken(palabra, pt) {
        const t = pt.t;
        if (pt.prefijo) {
            if (palabra.startsWith(t)) return 1;
            if (t.length >= 5 && palabra.length >= t.length && distancia(palabra.slice(0, t.length), t) <= 1) return 0.85;
            return 0;
        }
        if (palabra === t) return 1;
        // plurales simples
        if (palabra === t + 's' || palabra === t + 'es' || (t.endsWith('s') && palabra === t.slice(0, -1))) return 1;
        // errores de tipeo
        if (t.length >= 5 && distancia(palabra, t) <= 1) return 0.85;
        return 0;
    }

    /** Busca un patrón (con huecos) dentro de una cláusula. */
    function buscarEnClausula(clausula, patron) {
        let mejor = null;
        for (let i = 0; i < clausula.length; i++) {
            const f0 = coincideToken(clausula[i], patron[0]);
            if (!f0) continue;
            let fuerza = f0, pos = i, ok = true;
            for (let k = 1; k < patron.length; k++) {
                // patrones de 2 palabras: máx. 1 intermedia; de 3+: máx. 2; tras negación: máx. 1
                const hueco = (patron.length <= 2 || (k === 1 && NEGACIONES.has(patron[0].t))) ? 1 : MAX_HUECO;
                let encontrado = -1, f = 0;
                for (let j = pos + 1; j <= Math.min(clausula.length - 1, pos + 1 + hueco); j++) {
                    f = coincideToken(clausula[j], patron[k]);
                    if (f) { encontrado = j; break; }
                }
                if (encontrado < 0) { ok = false; break; }
                fuerza = Math.min(fuerza, f);
                pos = encontrado;
            }
            if (ok && (!mejor || fuerza > mejor.fuerza)) mejor = { inicio: i, fin: pos, fuerza };
            if (mejor && mejor.fuerza === 1) break;
        }
        return mejor;
    }

    /** ¿La coincidencia está negada? ("no huele a gas", "los frenos están bien") */
    function estaNegada(clausula, m, patron) {
        if (NEGACIONES.has(patron[0].t)) return false; // el patrón ya incluye la negación
        // Negación previa (hasta 3 palabras antes, sin cruzar conectores)
        for (let i = m.inicio - 1; i >= Math.max(0, m.inicio - 3); i--) {
            const w = clausula[i];
            if (CORTES_NEGACION.has(w)) break;
            if (NEGACIONES.has(w)) return true;
        }
        // Estado normal posterior ("están bien", "funcionan normal", "ok")
        for (let i = m.fin + 1; i <= Math.min(clausula.length - 1, m.fin + 3); i++) {
            const w = clausula[i];
            if (CORTES_NEGACION.has(w)) break;
            if (w === 'ok' || w === 'normal' || w === 'normales') return true;
            if (VERBOS_ESTADO.has(w) && ESTADOS_OK.has(clausula[i + 1])) return true;
        }
        return false;
    }

    function estaExcluida(clausula, m, excluir) {
        if (!excluir) return false;
        const desde = Math.max(0, m.inicio - 3), hasta = Math.min(clausula.length - 1, m.fin + 3);
        for (let i = desde; i <= hasta; i++) {
            if (excluir.some(pt => coincideToken(clausula[i], pt))) return true;
        }
        return false;
    }

    /** Mejor coincidencia de una lista de patrones en todo el texto. */
    function detectar(clausulas, patrones, excluir) {
        let mejor = null;
        for (const p of patrones) {
            for (let c = 0; c < clausulas.length; c++) {
                const m = buscarEnClausula(clausulas[c], p.tokens);
                if (!m) continue;
                if (estaNegada(clausulas[c], m, p.tokens)) continue;
                if (estaExcluida(clausulas[c], m, excluir)) continue;
                if (!mejor || m.fuerza > mejor.fuerza || (m.fuerza === mejor.fuerza && p.tokens.length > mejor.largo)) {
                    mejor = { fuerza: m.fuerza, largo: p.tokens.length, texto: p.texto, clausula: c, inicio: m.inicio, fin: m.fin };
                }
            }
        }
        return mejor;
    }

    /* Precompilación */
    SINTOMAS.forEach(s => {
        s._patrones = s.patrones.map(p => ({ texto: p, tokens: compilarPatron(p) }));
        s._excluir = s.excluir ? s.excluir.map(e => compilarPatron(e)[0]) : null;
    });
    Object.keys(SERVICIOS).forEach(id => {
        const s = SERVICIOS[id];
        s.id = id;
        s._terminos = s.terminos.map(p => ({ texto: p.replace(/\*/g, ''), tokens: compilarPatron(p) }));
    });

    /* ─────────────────────────────────────────────────────────────────────────
       4. MOTOR DE ANÁLISIS
    ───────────────────────────────────────────────────────────────────────── */
    const UMBRAL_ALTA = 6, UMBRAL_MEDIA = 3;

    function nivel(score) {
        return score >= UMBRAL_ALTA ? 'alta' : score >= UMBRAL_MEDIA ? 'media' : 'baja';
    }

    /**
     * Analiza la descripción del usuario.
     * @param {string} texto
     * @param {Set<string>} [respondidas] ids de preguntas de seguimiento ya respondidas
     */
    function analizar(texto, respondidas) {
        respondidas = respondidas || new Set();
        const clausulas = tokenizar(texto);
        const scores = {}, razones = {};
        const sumar = (id, valor, razon) => {
            scores[id] = (scores[id] || 0) + valor;
            (razones[id] = razones[id] || []);
            if (razon && !razones[id].includes(razon)) razones[id].push(razon);
        };

        // 4.1 Síntomas
        const hallazgos = [];
        SINTOMAS.forEach(s => {
            const m = detectar(clausulas, s._patrones, s._excluir);
            if (m) hallazgos.push({ sintoma: s, fuerza: m.fuerza, frase: m.texto });
        });

        // Un síntoma genérico ("sale humo") se descarta si ya hay uno específico ("humo blanco")
        const ids = new Set(hallazgos.map(h => h.sintoma.id));
        for (let i = hallazgos.length - 1; i >= 0; i--) {
            const gen = hallazgos[i].sintoma.generico;
            if (gen && gen.some(id => ids.has(id))) hallazgos.splice(i, 1);
        }

        const hayFalla = hallazgos.some(h => h.sintoma.urg >= 1);

        hallazgos.forEach(h => {
            Object.entries(h.sintoma.servicios).forEach(([id, peso]) => {
                sumar(id, peso * h.fuerza, h.sintoma.label);
            });
        });

        // 4.2 Menciones directas del servicio (máx. 2 por servicio)
        Object.values(SERVICIOS).forEach(serv => {
            let n = 0;
            for (const t of serv._terminos) {
                if (n >= 2) break;
                const m = detectar(clausulas, [t], null);
                if (m) { sumar(serv.id, 3 * m.fuerza, `Mencionaste “${t.texto}”`); n++; }
            }
        });

        // 4.3 Si hay una falla, los servicios de consulta pierden peso
        if (hayFalla) SERVICIOS_CONSULTA.forEach(id => { if (scores[id]) scores[id] *= 0.35; });

        // 4.4 Ranking
        let ranking = Object.entries(scores)
            .filter(([, v]) => v > 0)
            .sort((a, b) => b[1] - a[1])
            .map(([id, score]) => ({ ...SERVICIOS[id], score: Math.round(score * 10) / 10, nivel: nivel(score), razones: razones[id] || [] }));

        const sinCoincidencias = ranking.length === 0;
        if (sinCoincidencias) {
            ranking = [{ ...SERVICIOS.diagnostico_vehicular, score: 0, nivel: 'baja',
                razones: ['No identificamos un síntoma específico en tu descripción'] }];
        }

        const top = ranking[0].score;
        const resultados = ranking.filter((r, i) => i === 0 || r.score >= Math.max(1.5, top * 0.3)).slice(0, 4);

        // 4.5 Confianza global: nivel del primero, rebajado si hay empate técnico
        let confianza = resultados[0].nivel;
        if (resultados[1] && resultados[1].score >= top * 0.85 && resultados[1].id !== resultados[0].id) {
            confianza = confianza === 'alta' ? 'media' : 'baja';
        }

        // 4.6 Urgencia
        const urgentes = hallazgos.slice().sort((a, b) => b.sintoma.urg - a.sintoma.urg);
        const urgencia = urgentes.length ? urgentes[0].sintoma.urg : (sinCoincidencias ? null : 0);
        const conConsejo = urgentes.find(h => h.sintoma.urg === urgencia && h.sintoma.consejo);

        // 4.7 Pregunta de seguimiento (solo si el resultado no es concluyente)
        let aclaracion = null;
        if (confianza !== 'alta' || hallazgos.length === 1) {
            const candidatos = hallazgos
                .filter(h => h.sintoma.aclarar && !respondidas.has(h.sintoma.id))
                .filter(h => !(hayFalla && h.sintoma.tipo === 'consulta'))
                .sort((a, b) => (b.sintoma.urg - a.sintoma.urg) ||
                    (Math.max(...Object.values(b.sintoma.servicios)) - Math.max(...Object.values(a.sintoma.servicios))));
            if (candidatos.length && (confianza !== 'alta' || candidatos[0].sintoma.id === hallazgos[0].sintoma.id)) {
                const s = candidatos[0].sintoma;
                aclaracion = { id: s.id, pregunta: s.aclarar.pregunta, opciones: s.aclarar.opciones };
            }
        }

        return {
            sintomas: hallazgos
                .filter(h => h.sintoma.tipo !== 'consulta' || !hayFalla)
                .sort((a, b) => b.sintoma.urg - a.sintoma.urg)
                .map(h => ({ id: h.sintoma.id, label: h.sintoma.label, urg: h.sintoma.urg })),
            resultados,
            confianza,
            urgencia,
            consejo: conConsejo ? conConsejo.sintoma.consejo : null,
            aclaracion,
            sinCoincidencias
        };
    }

    const Motor = { analizar, tokenizar, SERVICIOS, SINTOMAS, GRUPOS };

    /* Exportación para pruebas en Node */
    if (typeof module !== 'undefined' && module.exports) { module.exports = Motor; return; }
    global.AutoGasDiagnostico = Motor;

    /* ─────────────────────────────────────────────────────────────────────────
       5. INTERFAZ
    ───────────────────────────────────────────────────────────────────────── */
    const ICONOS = {
        llave: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
        medidor: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
        surtidor: '<path d="M3 22h12"/><path d="M4 9h10"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
        documento: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/>',
        llama: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
        caja: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
        alerta: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
        reloj: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
        info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
        check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
        flecha: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
        lupa: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
        reiniciar: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
        pregunta: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
        calendario: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
        whatsapp: '<path fill="currentColor" stroke="none" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.83 9.83 0 0 1 9.88 9.89c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z"/>'
    };
    const svg = (nombre, size) =>
        `<svg width="${size || 18}" height="${size || 18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS[nombre]}</svg>`;

    const URGENCIAS = {
        3: { clase: 'u3', icono: 'alerta', titulo: 'Atención inmediata', texto: 'No recomendamos conducir el vehículo hasta que un técnico lo revise.' },
        2: { clase: 'u2', icono: 'reloj', titulo: 'Revisión pronto', texto: 'Agenda una revisión en los próximos días: el problema puede empeorar y encarecer la reparación.' },
        1: { clase: 'u1', icono: 'info', titulo: 'Revisión recomendada', texto: 'No parece una emergencia, pero conviene revisarlo antes de que avance.' },
        0: { clase: 'u0', icono: 'check', titulo: 'Servicio programable', texto: 'Puedes agendarlo cuando te convenga.' }
    };
    const NIVELES = { alta: { txt: 'Alta', seg: 3 }, media: { txt: 'Media', seg: 2 }, baja: { txt: 'Baja', seg: 1 } };

    const SEDES = [
        ['Ica', '51978421654'], ['Lima', '51942623696'], ['Huancayo', '51942867212'], ['Nasca', '51939067488'],
        ['Trujillo', '51937695830'], ['Chincha', '51930210613'], ['Arequipa', '51975338252']
    ];

    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    const medidor = (niv, color) => {
        const n = NIVELES[niv];
        return `<span class="dx-meter" style="--c:${color}" aria-label="Coincidencia ${n.txt.toLowerCase()}">
            ${[1, 2, 3].map(i => `<i class="${i <= n.seg ? 'on' : ''}"></i>`).join('')}
            <b>${n.txt}</b></span>`;
    };

    const estado = { respondidas: new Set(), ultimo: null, textoBase: '' };

    function render(r, texto) {
        const cont = document.getElementById('dxResultado');
        const principal = r.resultados[0];
        const g0 = GRUPOS[principal.grupo];
        const otros = r.resultados.slice(1);
        let html = '';

        // Urgencia
        if (r.urgencia !== null) {
            const u = URGENCIAS[r.urgencia];
            html += `<div class="dx-urg ${u.clase}" role="${r.urgencia === 3 ? 'alert' : 'status'}">
                <span class="dx-urg-ico">${svg(u.icono, 20)}</span>
                <div><strong>${u.titulo}</strong><p>${u.texto}${r.consejo ? ` <span class="dx-urg-tip">${esc(r.consejo)}</span>` : ''}</p></div>
            </div>`;
        } else {
            html += `<div class="dx-urg un" role="status">
                <span class="dx-urg-ico">${svg('pregunta', 20)}</span>
                <div><strong>No identificamos un síntoma concreto</strong>
                <p>Prueba indicando qué notas (ruido, olor, humo, luz en el tablero) y cuándo ocurre (al frenar, en frío, usando gas…).</p></div>
            </div>`;
        }

        // Síntomas + confianza
        html += `<div class="dx-resumen">
            <div class="dx-resumen-col">
                <span class="dx-kicker">Síntomas detectados</span>
                <div class="dx-chips">${r.sintomas.length
                    ? r.sintomas.map(s => `<span class="dx-chip dx-chip-u${s.urg}">${esc(s.label)}</span>`).join('')
                    : '<span class="dx-chip dx-chip-vacio">Ninguno específico</span>'}</div>
            </div>
            <div class="dx-resumen-col dx-resumen-conf">
                <span class="dx-kicker">Precisión del análisis</span>
                ${medidor(r.confianza, '#df0415')}
            </div>
        </div>`;

        // Pregunta de seguimiento
        if (r.aclaracion) {
            html += `<div class="dx-aclarar">
                <div class="dx-aclarar-head">${svg('pregunta', 16)}<span>Afinemos el análisis · ${esc(r.aclaracion.pregunta)}</span></div>
                <div class="dx-aclarar-ops">${r.aclaracion.opciones.map((o, i) =>
                    `<button type="button" class="dx-op" data-aclarar="${esc(r.aclaracion.id)}" data-i="${i}">${esc(o.texto)}</button>`).join('')}</div>
            </div>`;
        }

        // Servicio principal
        html += `<article class="dx-top" style="--g:${g0.color}">
            <span class="dx-kicker">${r.sinCoincidencias ? 'Te sugerimos empezar por' : 'Servicio más indicado'}</span>
            <div class="dx-top-head">
                <span class="dx-ico">${svg(g0.icono, 22)}</span>
                <div class="dx-top-tit">
                    <h3>${esc(principal.nombre)}</h3>
                    <span class="dx-grupo">${esc(g0.nombre)}</span>
                </div>
                ${r.sinCoincidencias ? '' : medidor(principal.nivel, g0.color)}
            </div>
            <p class="dx-desc">${esc(principal.desc)}</p>
            ${principal.razones.length ? `<div class="dx-porque"><span>Por qué lo sugerimos</span>
                <ul>${principal.razones.slice(0, 4).map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
            <button type="button" class="dx-link" data-ir="${principal.id}">Ver detalle del servicio ${svg('flecha', 14)}</button>
        </article>`;

        // Otras posibilidades
        if (otros.length) {
            html += `<div class="dx-otros"><span class="dx-kicker">También podría ser</span>
                ${otros.map(o => {
                    const g = GRUPOS[o.grupo];
                    return `<button type="button" class="dx-otro" data-ir="${o.id}" style="--g:${g.color}">
                        <span class="dx-ico dx-ico-sm">${svg(g.icono, 16)}</span>
                        <span class="dx-otro-txt"><b>${esc(o.nombre)}</b><small>${esc(o.razones[0] || g.nombre)}</small></span>
                        ${medidor(o.nivel, g.color)}
                        <span class="dx-otro-go">${svg('flecha', 14)}</span>
                    </button>`;
                }).join('')}
            </div>`;
        }

        // Acciones
        html += `<div class="dx-acciones">
            <div class="dx-wsp">
                <label for="dxSede" class="dx-kicker">Consulta directa con un asesor</label>
                <div class="dx-wsp-row">
                    <select id="dxSede" class="dx-select">${SEDES.map(([n, t]) => `<option value="${t}">Sede ${n}</option>`).join('')}</select>
                    <button type="button" class="dx-btn-wsp" id="dxWsp">${svg('whatsapp', 16)} Enviar por WhatsApp</button>
                </div>
            </div>
            <div class="dx-acciones-sec">
                <a href="../Contacto/contacto.html" class="dx-btn-sec">${svg('calendario', 15)} Agendar cita</a>
                <button type="button" class="dx-btn-ghost" id="dxReset">${svg('reiniciar', 15)} Nueva consulta</button>
            </div>
        </div>`;

        cont.innerHTML = html;
        cont.hidden = false;
        cont.classList.remove('dx-in');
        void cont.offsetWidth;
        cont.classList.add('dx-in');

        // Eventos
        cont.querySelectorAll('[data-ir]').forEach(b => b.addEventListener('click', () => irAServicio(b.dataset.ir)));
        cont.querySelectorAll('[data-aclarar]').forEach(b => b.addEventListener('click', () => {
            const s = SINTOMAS.find(x => x.id === b.dataset.aclarar);
            const op = s.aclarar.opciones[+b.dataset.i];
            estado.respondidas.add(s.id);
            const input = document.getElementById('iaInput');
            const extra = op.agrega.charAt(0).toUpperCase() + op.agrega.slice(1);
            input.value = (input.value.trim().replace(/[.\s]+$/, '') + '. ' + extra + '.').slice(0, 400);
            actualizarContador();
            ejecutar(true);
        }));
        document.getElementById('dxWsp').addEventListener('click', () => {
            const numero = document.getElementById('dxSede').value;
            const msg = `Hola AutoGas, usé el asistente de su web.\n\n` +
                `*Problema:* ${texto}\n` +
                `*Servicio sugerido:* ${principal.nombre}` +
                (otros.length ? `\n*También:* ${otros.map(o => o.nombre).join(', ')}` : '') +
                `\n\n¿Me pueden ayudar con una cita?`;
            window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
        });
        document.getElementById('dxReset').addEventListener('click', reiniciar);
    }

    function irAServicio(id) {
        const serv = SERVICIOS[id];
        if (!serv) return;
        const col = document.getElementById('grupo-' + serv.seccion);
        if (col && !col.classList.contains('abierto') && typeof global.toggleGrupo === 'function') {
            global.toggleGrupo(serv.seccion);
        }
        setTimeout(() => {
            const titulos = document.querySelectorAll(`#${serv.seccion} .servicio-card-title`);
            const card = Array.from(titulos).find(t => normalizar(t.textContent).includes(normalizar(serv.card)));
            const destino = card ? card.closest('.servicio-card') : document.getElementById(serv.seccion);
            if (!destino) return;
            const y = destino.getBoundingClientRect().top + window.scrollY - 110;
            window.scrollTo({ top: y, behavior: 'smooth' });
            if (card) {
                destino.classList.remove('dx-flash');
                void destino.offsetWidth;
                destino.classList.add('dx-flash');
            }
        }, col && col.classList.contains('abierto') ? 50 : 450);
    }

    function actualizarContador() {
        const input = document.getElementById('iaInput');
        const c = document.getElementById('iaCharCount');
        if (c && input) c.textContent = input.value.length;
    }

    function setCargando(on) {
        const btn = document.getElementById('iaBtn');
        if (!btn) return;
        btn.disabled = on;
        btn.classList.toggle('is-loading', on);
        btn.innerHTML = on
            ? `<span class="dx-spin" aria-hidden="true"></span> Analizando`
            : `${svg('lupa', 15)} Analizar`;
    }

    function ejecutar(desdeAclaracion) {
        const input = document.getElementById('iaInput');
        const texto = input.value.trim();
        if (texto.length < 4) {
            input.classList.add('dx-error');
            input.focus();
            setTimeout(() => input.classList.remove('dx-error'), 1400);
            return;
        }
        if (!desdeAclaracion) estado.respondidas.clear();
        setCargando(true);
        document.getElementById('dxEjemplos').classList.add('dx-oculto');
        // Breve pausa para dar feedback visual del procesamiento
        setTimeout(() => {
            const r = analizar(texto, estado.respondidas);
            estado.ultimo = r;
            setCargando(false);
            render(r, texto);
            const cont = document.getElementById('dxResultado');
            const top = cont.getBoundingClientRect().top + window.scrollY - 100;
            if (Math.abs(window.scrollY - top) > 120) window.scrollTo({ top, behavior: 'smooth' });
        }, 380);
    }

    function reiniciar() {
        const input = document.getElementById('iaInput');
        const cont = document.getElementById('dxResultado');
        input.value = '';
        actualizarContador();
        estado.respondidas.clear();
        cont.hidden = true;
        cont.innerHTML = '';
        document.getElementById('dxEjemplos').classList.remove('dx-oculto');
        document.getElementById('asistente-ia').scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => input.focus({ preventScroll: true }), 400);
    }

    // API pública usada por el HTML (compatibilidad con onclick existente)
    global.analizarProblema = () => ejecutar(false);

    document.addEventListener('DOMContentLoaded', () => {
        const input = document.getElementById('iaInput');
        if (!input) return;
        input.addEventListener('input', actualizarContador);
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ejecutar(false); }
        });
        document.querySelectorAll('#dxEjemplos [data-ejemplo]').forEach(b => b.addEventListener('click', () => {
            input.value = b.dataset.ejemplo;
            actualizarContador();
            ejecutar(false);
        }));
    });
})(typeof window !== 'undefined' ? window : globalThis);
