---
layout: page
title: EntroPipes
permalink: /proyectos/entropies/
description: 'Rellena las lineas antes de que lleguen al limite'
platforms: ['Linux', 'Windows', 'Mac', 'Android']
img_dest: entropipes.png
onmenu: false
---

EntroPipes es mi segundo videojuego programado en **LUA** y con el framework [Löve](http://love2d.org) y esta basado en un juego que viene en muchas maquinitas LCD

### Como se juega:

El juego es sencillo. Solo pulsar sobre las tuberías para girarlas hasta resolver el puzzle.

Pulsa **Esc** en Linux/Windows o el **botón atrás** en Android para mostrar el menú de pausa. Se si pulsan en el menú principal se sale del juego. En otros sub-menús se retorna al menú principal.

## Instalación:

### Linux:
Necesitas tener instalado **Löve** 0.9.0 o superior. En la mayoría de distribuciones esta bajo el nombre de love. por ejemplo para instalarlo en Arch Linux y deribadas -> Archlinux**: `pacman -S love`

Para ejecutarlo solo hay que pulsar 2 veces sobre el archivo **EntroPipes.love**. Si no es así abra una terminal y ejecute `love path/to/EntroPipes.love` ó `love path/to/EntroPipesFolder/`.
Otro truco consiste en crear un ejecutable:
`cat /usr/bin/love EntroPipes.love > entropipes`

### Windows:
Solo tienes que descomprimir el zip y pulsar 2 veces en EntroPipes.exe

### Android:

Descarga el **apk** en tu móvil a tablet, o descargala en tu PC e instala vía ADB o tranferiendola a tu móvil e instalarla pulsando en ella en el navegador de archivos que uses.

Testeado en Android 4.2, 5 y 6.

### Capturas:
![Pantalla principal](https://github.com/son-link/EntroPipes/raw/master/main_screen.png)
![Pantalla de juego](https://github.com/son-link/EntroPipes/raw/master/ingame_screen.png)

Datos del proyecto:

* **Estado del proyecto:** Estable
* **Versión actual:** r3-2
* **Plataformas:** {{ page.platforms | join: ', '}}

### Enlaces

* [Repositorio](https://github.com/son-link/EntroPipes)

### Descargas:
* [Windows 32 bits](https://dl.dropboxusercontent.com/u/58286032/juegos/EntroPipes/EntroPipes-win32.zip)

* [Windows 64 bits](https://dl.dropboxusercontent.com/u/58286032/juegos/EntroPipes/EntroPipes-win64.zip)

* [APK para Android](https://dl.dropboxusercontent.com/u/58286032/juegos/EntroPipes/EntroPipes.apk)
