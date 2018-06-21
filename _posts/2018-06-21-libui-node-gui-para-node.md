---
title: 'Libui-node: Crea interfaces gráficas con NodeJS de forma nativa'
layout: post
date: 2018-06-21 16:25:00 +0200
tags:
  - nodejs
  - gui
  - libui
  - libui-node
category: programacion
img_dest: libui-node.png
description: Hasta la fecha la manera más rápida y sencilla de hacer interfaces gráficas para nuestras aplicaciones en NodeJS era usando Electron y NW.js, pero eso puede cambiar gracias a libbui.
---

Hasta la fecha la manera más rápida y sencilla de hacer interfaces gráficas para nuestras aplicaciones en **NodeJS** era usando **Electron** y **NW.js**, pero el resultado de ellos son aplicaciones pesadas (por encima de los 100Mb en el caso de la primera, y 200Mb en el segundo, lo cual es una burrada). También hay un par de bindings para usar **GTK y Qt**, pero ambos proyectos están abandonados. Ahora gracias a **[libui-node](https://github.com/parro-it/libui-node)**, un binding para NodeJS de **[libui](https://github.com/andlabs/libui)** podemos crear interfaces de manera sencilla y que usa las librerías nativas de Windows, Mac y GNU/Linux, en este ultimo usando **GTK**, el cual a la hora de escribir este articulo aun esta en una fase temprana de desarrollo, por lo que muchas características aun no están implementadas.

Libui-node es fácil de usar, por lo que resulta sencillo de desarrollar con el dentro de las limitaciones que tiene.

Por el momento libui tiene implementado, entre otros:

* Ventanas.
* Dialogos de mensajes.
* Cajas horizontales y verticales.
* Rejillas.
* Diálogos de abrir y guardar ficheros.
* Etiquetas.
* Pestañas.
* Barra de progreso.
* Formularios.
* Menús.

Y lo que de momento no tiene implementado:

* Tablas (si bien actualmente se esta trabajando en ello).
* Inserción de imágenes.
* Iconos.
* Área de desplazamiento.

En la siguiente captura podéis ver varios de los elementos que ya están implementados:

![ejemplo de libui-node](/img/libui-node.png)

Ahora te preguntaras ¿Merece la pena usar libui en esta fase temprana?. Mi respuesta es que si no vas a necesitar crear una interfaz compleja ni nada de lo que aun no esta implementado, si, lo puedes usar, solo que también hay que tener en cuenta posibles fallos, si bien con ello puedes colaborar avisando de ello a los desarrolladores. Yo por ejemplo lo use para crear un programa sencillito para convertir vídeos a formatos soportados por los navegadores web, [Vid4Web](https://github.com/son-link/vid4web)

linui-node esta bien documentado y viene unos cuantos ejemplos (de hecho la captura es uno de ellos), por lo que en poco tiempo estarás ya creando una interfaz gráfica.

Por ultimo, ademas de libui-node existen otros bildings de libui para otros lenguajes de programación, como **Python**, **LUA** o **PHP**

## Enlaces:

* [libui-node](https://github.com/parro-it/libui-node)
* [libui](https://github.com/andlabs/libui)