# Reseñas de Google en el Inicio

La sección "Lo que dicen nuestros clientes" del Inicio muestra las reseñas de Google Maps
de las sedes Ica, Lima, Huancayo y Trujillo. El navegador le pide los datos a
`api/resenas.php`, y ese archivo consulta a Google desde el servidor. Así la clave
nunca llega al navegador.

**Sin clave, o en Vercel (donde no hay PHP), la sección igual funciona:** muestra
los botones "Ver todas en Google" y "Dejar mi reseña" de cada sede, sin tarjetas.

## 1. Crear la clave (una sola vez)

1. Entra a https://console.cloud.google.com y crea un proyecto, por ejemplo "AutoGas Web".
2. **Facturación:** vincula una cuenta de facturación. Google pide tarjeta, pero las
   reseñas usan la SKU *Place Details Enterprise + Atmosphere*, que trae
   **1.000 consultas gratis al mes**.
3. **APIs y servicios → Biblioteca:** activa **Places API (New)**.
4. **APIs y servicios → Credenciales → Crear credenciales → Clave de API.** Después, en la clave:
   - *Restricciones de API:* elige solo **Places API (New)**.
   - *Restricciones de aplicación:* **Direcciones IP**, con la IP del servidor del hosting.
     Para probar en XAMPP, déjala temporalmente sin restricción de aplicación y ponla
     cuando subas al hosting.
5. **Google Maps Platform → Cuotas → Places API (New):** baja *GetPlace requests per minute*
   a 10. Es una protección extra.
6. **Facturación → Presupuestos y alertas:** crea un presupuesto de USD 1 con alertas por
   correo. Así te avisan si algo raro pasa.

## 2. Poner la clave en la web

- Opción A (recomendada si el hosting lo permite): crea la variable de entorno
  `GOOGLE_PLACES_API_KEY` con tu clave.
- Opción B: copia `api/config.example.php` como `api/config.local.php` y pega la clave.
  - `config.local.php` está en `.gitignore`: **no se sube a GitHub**.
  - `.htaccess` bloquea su descarga desde la web.
  - Al hosting súbelo por FTP o el administrador de archivos, nunca por Git.

Prueba en XAMPP: abre `http://localhost/AutoGasWeb/api/resenas.php?sede=ica`.
Debe devolver un JSON con `puntaje`, `total` y `resenas`.

## 3. Tope de gasto

Google **no** permite poner un tope diario a esta API, así que `resenas.php` lleva su
propia cuenta en `api/_uso/contador.json`:

- Máximo `LIMITE_DIA = 30` consultas al día y `LIMITE_MES = 950` al mes, siempre por
  debajo de las 1.000 gratis.
- Al llegar al tope, la página muestra los enlaces a Google en vez de las tarjetas.
- Si el servidor no puede escribir en `api/_uso/`, **no consulta a Google**. Da permisos
  de escritura a esa carpeta en el hosting.
- Solo se consulta cuando un visitante baja hasta la sección, y solo la sede que elige.

Si quieres mostrar reseñas a más visitantes, sube los límites en `resenas.php`. Cada
1.000 consultas extra cuestan unos USD 25; revisa la tabla de precios vigente de Google.

## 4. Reglas de Google que ya cumple el código

- No guarda reseñas (`Cache-Control: no-store`). Solo el ID de lugar está permitido guardarlo.
- Muestra el autor, su foto y el enlace a su perfil, más el enlace a cada reseña en Google Maps.
- Avisa que la fuente es Google Maps, cómo se filtran las reseñas (4 y 5 estrellas, por
  relevancia) y que Google no las verifica. Marca las reseñas traducidas.

## 5. Añadir o cambiar una sede

Agrega el `place_id` en `SEDES` (en `resenas.php`) y en `SEDES_RESENAS` (en
`Inicio/inicio.js`). Después agrega su pestaña en `Inicio/inicio.html`.
