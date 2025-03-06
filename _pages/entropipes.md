---
layout: page
title: Entropipes
permalink: /proyectos/entropies/
description: 'Un juego de puzzles en el que tienes que conectar todas las tuberías antes de que se agote el juego.'
platforms: ['Linux', 'Windows', 'Web', 'Consolas Emuladoras']
img_dest: entropipes.png
onmenu: false
proyect: true
---
![Portada](/img/proyectos/entropipes.png)

EntroPipes es un juego del genero de puzzles en el que debes de rotar las tuberías hasta resolver cada puzzle antes de que se acabe el tiempo. Ademas cada partida sera distinta ya que el orden de los puzzle cambia en cada partida. Hay 4 niveles de dificultad (4x4, 6x4, 6x6 y 8x6), pudiendo seleccionar en cual de ellos jugar.

Al final de cada nivel de dificultad se guarda la mejor puntuación, por lo que tendrás que ser rápido resolviendo los puzzles para obtener más puntos.

El juego a sido programado en Python usando el motor retro [Pyxel](https://github.com/kitao/pyxel/).

También hay disponible online un [editor de niveles](https://son_link.codeberg.page/entropipes_editor/), por lo que podras crear y añadir tus propios puzzles, incluso compartirlos o pedir que se añadan a los listados oficiales.

### Como se juega:

|Teclado|Mando|Acción|
|-------|-----|------|
|Flechas|D-Pad/Cruceta|Seleccionar nivel, seleccionar dificultad, moverse por el puzzle|
|Z|A|Seleccionar opción del menú, rotar tubería|
|Enter|Start|Pausar/resumir el juego|
|Espacio|Select|En pausa para volver al menú inicial|


## Instalación:

Solo tienes que descargar el archivo correspondiente para tu sistema operativo, descomprimirlo y hacer doble click sobre el ejecutable.

### Capturas:

#### Pantalla de inicio
![Pantalla principal](/img/img_dest/entropipes.png)

#### Jugando
![Vídeo del juego](/img/entropipes/entropipes.gif)

Datos del proyecto:

* **Estado del proyecto:** Estable
* **Versión actual:** 1.0.0
* **Plataformas:** {{ page.platforms | join: ', '}}

### Enlaces

* [Repositorio](https://codeberg.org/son_link/EntroPipes)
* [Descargas](https://codeberg.org/son_link/EntroPipes/releases)
* [PortMaster](https://portmaster.games/detail.html?name=entropipes)