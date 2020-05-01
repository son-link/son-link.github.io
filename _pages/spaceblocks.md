---
layout: page
title: SpaceBlocks
permalink: /proyectos/spaceblocks/
description: 'Rellena las lineas antes de que lleguen al limite'
platforms: ['Linux', 'Windows', 'Mac']
img_dest: spaceblocks.png
onmenu: false
---

SpaceBlocks es mi segundo videojuego programado en **LUA** y con el framework [Löve](http://love2d.org) y esta basado en un juego que viene en muchas maquinitas LCD

El juego es sencillo. Solo hay que disparar hasta completar las lineas para borrarlas antes de que lleguen al limite. Hay 4 naves disponibles, para que juegues con la que más te guste.

### Como se juega:

* **Teclas izquierda y derecha**: Mover la nave/seleccionar una
* **Espacio:** Disparar
* **P:** Pausar/Jugar

## Instalación:

### Linux:
Necesitas tener instalado **Löve** 0.9.0 o superior. En la mayoría de distribuciones esta bajo el nombre de love. por ejemplo para instalarlo en Arch Linux y derivadas: `pacman -S love`

Para ejecutarlo solo hay que pulsar 2 veces sobre el archivo **SpaceBlocks.love**. Si no es así, abre una terminal y ejecuta `love ruta/a/SpaceBlocks.love` ó `love path/to/SpaceBlocksFolder/`.

Otro truco consiste en crear un ejecutable:
`cat /usr/bin/love SpaceBlocks.love > SpaceBlocks`

### Windows:
Solo tienes que descomprimir el zip y pulsar 2 veces en SpaceBlocks.exe

### Capturas:
![Pantalla de juego](https://github.com/son-link/SpaceBlocks/raw/master/screenshot.png)

Datos del proyecto:

* **Estado del proyecto:** Estable
* **Versión actual:** r2
* **Plataformas:** {{ page.platforms | join: ', '}}

### Enlaces

* [Repositorio](https://github.com/son-link/SpaceBlocks)
* [Página oficial en itch.io](https://son-link.itch.io/spaceblocks)
