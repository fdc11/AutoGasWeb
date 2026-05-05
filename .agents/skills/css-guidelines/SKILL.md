---
name: css-guidelines
description: Reglas estrictas de diseño, colores y UI/UX para el proyecto AutoGasWeb. Úsalo cada vez que edites o crees estilos CSS.
---

# AutoGasWeb CSS Guidelines

Cuando trabajes en el diseño o modifiques los archivos CSS de AutoGasWeb, sigue estas instrucciones:

## 1. Diseño y Estética
- El diseño debe ser muy premium, moderno y corporativo.
- Utiliza colores que inspiren confianza relacionados con el gas vehicular y el medio ambiente (ejemplo: verdes vibrantes, blancos limpios, grises oscuros para texto).
- No uses colores genéricos básicos (blue, red, green). Usa paletas armoniosas (HSL o HEX específicos).
- Asegúrate de incluir micro-animaciones (transiciones suaves) al hacer hover sobre botones o enlaces.

## 2. Reglas Técnicas
- **Solo Vanilla CSS:** No utilices Tailwind CSS ni otros frameworks de CSS a menos que el usuario lo solicite explícitamente.
- **Responsividad:** Asegúrate siempre de que las vistas sean compatibles con dispositivos móviles usando media queries y que la etiqueta `<meta name="viewport" ...>` esté correcta.
- **Sin FOUC:** Mantén las fuentes locales y evita cargas externas que provoquen saltos visuales.

## 3. Flujo de Trabajo
- Siempre revisa `inicio.css` o los archivos base antes de crear nuevas clases para evitar duplicar utilidades que ya existen.
