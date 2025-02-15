---
layout: page
title: JukeboxJS
permalink: /proyectos/jukeboxjs/
description: 'Componente Web para insertar en tu web un reproductor de audio'
platforms: ['Web']
onmenu: false
proyect: true
---
JukeboxJS es un Componente Web (Web Component en inglés) para poder añadir a tu web un reproductor de audio, pudiendo reproducir tanto ficheros en tu web, remotos, incluso listas de reproducción en formato M3U o texto plano.

Al usar estándares web, no tiene ninguna dependencia, por lo que es bajar, añadir un archivo JavaScript y añadir la etiqueta donde quieras añadirlo.

![Captura de JukeboxJS](/img/proyectos/jukeboxjs.png)

## Como usarlo

### Descargando el código

Solo tienes que clonar el repositorio, darle a descargar el zip (Code -> Download ZIP) y copiar el fichero **jukeboxjs.js** y la carpeta **assets** a la carpeta donde esté el código de tu web y añadir jukebox.js a tu web usando la etiqueta &lt;script>.

También puedes copiar el fichero **jukeboxjs.cdn.js**, que lleva integrado los iconos.

```html
<script src="jukebox.js"></script>
```

### CDN

También es posible usar la versión CDN, por lo que solo tienes que importar el JavaScript, el cual además contiene los iconos, por lo que no requiere importar los iconos.

```html
<script src="https://cdn.jsdelivr.net/gh/son-link/jukeboxjs@main/jukeboxjs.cdn.js"></script>
```

## Como usar la etiqueta

Para añadir el reproductor a tu página, debes de añadir la siguiente etiqueta:

```html
<jubebox-js />
```

## Parámetros de la etiqueta

* **src**: La URL al archivo de audio a reproducir.
* **playlist**: La URL a una lista de reproducción con los archivos a reproducir. Puede ser un archivo de texto con una URL por línea, o usando el formato M3U format (recomendado si quieres mostrar el artista y el título de la canción).
* **color-text**: El color del textp
* **color-bg**: El color de fondo y del texto de la pista actual en la lista de reproducción
* **color-btn**: El color de los botones, del tirador de los deslizadores y el color de fondo de la pista actual en la lista de reproducción
color-playlist: The background color of the playlist
* **color-range**: El color, o colores, de los deslizadores. Pueden ser 2 colores, separados por comas, si quieres un gradiente, o un solo color

**Nota**: Los colores pueden estar en formato hexadecimal (p. ej. #rrggbb), RGB (p. ej. rgb(255, 0, 150)) o RGBA (p. ej. rgba(255, 0, 150, 0.5)).

## Datos del proyecto:

* **Estado del proyecto:** Estable
* **Plataformas:** {{ page.platforms | join: ', '}}

### Enlaces

* [Repositorio](https://github.com/son-link/bestodon)
* [Sitio web](https://son-link.github.io/bestodon/)
