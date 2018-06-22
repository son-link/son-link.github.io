---
layout: page
title: Vid4Web
permalink: /proyectos/vid4web/
description: 'Convierte tus vídeos a formatos compatibles con los navegadores'
platforms: ['Linux', 'Windows', 'Mac']
img_dest: vid4web.png
onmenu: false
---

Vid4Web es un pequeña aplicación que permite convertir tus vídeos a los formatos soportados los navegadores web: **WebM** y **MP4**, usando el conocido **FFMPEG**, por lo que son muchos los formatos desde los cuales puedes convertir (siempre y cuando este compilado con soporte para esos formatos).

Esta escrito en **Javascript** para **NodeJS** y puede instalarse vía **NPM**, y usa **libui-node** para crear la interfaz gráfica.

![Captura de pantalla de Vid4Web](/img/img_dest/proyectos/vid4web.png)

Por ahora solo puedes seleccionar 3 resoluciones de vídeo: **SD** (858x480px), **HD** (1280x720px) y **FullHD** (1920x1080) y no se puede escoger el bitrate del vídeo (he puestos los recomendados para cada resolución) y el audio, pero en un futuro añadiré campos personalizados

### Datos del proyecto:

* **Estado del proyecto:** Estable
* **Versión actual:** 0.2.0
* **Plataformas:** {{ page.platforms | join: ', '}}

### Requisitos:

* **NodeJS**
* **NPM**

### Enlaces

* [Repositorio](https://github.com/son-link/vid4web)
* [NPMJS](https://www.npmjs.com/package/vid4web)
* [libui-node](https://github.com/parro-it/libui-node)
