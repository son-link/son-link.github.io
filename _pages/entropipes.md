---
layout: page
title: EntroPipes
permalink: /proyectos/entroopies/
description: 'Rellena las lineas antes de que lleguen al limite'
platforms: ['Linux', 'Windows', 'Mac', 'Nintendo 3DS']
---

SpaceBlocks es mi segundo videojuego programado en **LUA** y con el framework [Löve](http://love2d.org) y esta basado en un juego que viene en muchas maquinitas LCD

El juego es sencillo. Solo hay que disparar hasta completar las lineas para borrarlas antes de que lleguen al limite. Hay 4 naves disponibles, para que juegues con la que más te guste.

### Como se juega:

* **Teclas izquierda y derecha**: Mover la nave/seleccionar una
* **Espacio:** Disparar
* **P:** Pausar/Jugar

## Instalación:

### Linux:
Necesitas tener instalado **Löve** 0.9.0 o superior. En la mayoría de distribuciones esta bajo el nombre de love. por ejemplo para instalarlo en Arch Linux y deribadas -> Archlinux**: `pacman -S love`

Para ejecutarlo solo hay que pulsar 2 veces sobre el archivo **EntroPipes.love**. Si no es así abra una terminal y ejecute `love path/to/EntroPipes.love` ó `love path/to/EntroPipesFolder/`.
Otro truco consiste en crear un ejecutable:
`cat /usr/bin/love EntroPipes.love > entropipes`

### Windows:
Solo tienes que descomprimir el zip y pulsar 2 veces en EntroPipes.exe

### Nintendo 3DS:
Descomprime el zip en el directorio raiz de la tarjeta SD
Ademas necesitas una **flash cart** o tener instalado algún **Hax** *(Menuhax, BrowserHax, etc)*

### Capturas:
![Pantalla principal](https://github.com/son-link/EntroPipes/raw/master/img/main_screen.png)
![Pantalla de juego](https://github.com/son-link/EntroPipes/raw/master/ingame_screen.png)

Datos del proyecto:

* **Estado del proyecto:** Estable
* **Versión actual:** r3-2Z
* **Plataformas:** {{ page.platforms | join: ', '}}

### Enlaces

* [Repositorio](https://github.com/son-link/EntroPipes)

### Descargas:
* [Windows 32 bits](https://dl.dropboxusercontent.com/u/58286032/juegos/EntroPipes/EntroPipes-win32.zip)

* [Windows 64 bits](https://dl.dropboxusercontent.com/u/58286032/juegos/EntroPipes/EntroPipes-win64.zip)

* [Nintendo 3DS](https://dl.dropboxusercontent.com/u/58286032/juegos/EntroPipes/EntroPipes-3ds.zip)
