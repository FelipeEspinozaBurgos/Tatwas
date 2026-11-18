# Tatwámetro

Calculadora y reloj en vivo de los ciclos de los cinco Tatwas descritos por Krumm Heller, a partir de la salida del sol y la ubicación seleccionada.

Captura de pantalla: pendiente de agregar.

## Funcionalidades

- Reloj en vivo con el Tatwa actual, sus atributos y cuenta regresiva.
- Tabla diaria de los 60 periodos desde el amanecer.
- Ubicaciones predefinidas, ubicación del navegador y coordenadas manuales.
- Guía de referencia y temas claro/oscuro.

## Stack y estructura

HTML estático, JavaScript vanilla y SCSS compilado a CSS. No requiere una compilación para servir el sitio.

```text
assets/img/     Iconos e imagen para compartir
css/            CSS compilado que se publica
js/             Datos, símbolos y lógica de la aplicación
scss/           Fuentes de estilos por responsabilidad
scripts/        Generación de iconos
```

## Desarrollo

Requiere Node.js y npm. Instala las dependencias y usa los comandos necesarios:

```sh
npm install
npm run sass:watch
npm run sass:build
npm run icons
```

`sass:watch` recompila los cambios SCSS mientras trabajas; ejecuta `sass:build` para crear el CSS comprimido que se publica. `icons` regenera las imágenes desde `favicon.webp`.

## Despliegue en Netlify

Publica la carpeta `page/` con el directorio de publicación `.` y sin comando de build. El archivo `css/style.css` está incluido para que Netlify pueda servir el sitio estático directamente.

## Actualización

Modifica los archivos en `js/` para actualizar datos y comportamiento; cambia los parciales de `scss/` para ajustar estilos. Vuelve a generar `css/style.css` con `npm run sass:build`. Si cambia el favicon de origen, ejecuta `npm run icons`.

## Créditos y aviso

Contenido basado en las enseñanzas esotéricas de Dr. Krumm Heller (Huiracocha). Los horarios de salida del sol se calculan con [SunCalc](https://github.com/mourner/suncalc).

La información es de orientación esotérica y no sustituye consejo médico, legal ni financiero.

## Licencia

MIT. Consulta [LICENSE](LICENSE).
