---
title: Convertir una imagen y un audio a vídeo
layout: post
date: 2018-05-21 10:55:00 +0200
tags:
  - ffmpeg
  - video
  - audio
  - imagen
category: tutoriales
img_dest: convertir-audio-imagen-a-video.png
description: Hay casos en los que necesitamos hacer un video con una imagen acompañada de un audio, por ejemplo, para un tema que hayamos compuesto. Veremos como podemos hacerlo de manera rápida y sencilla con FFMPEG
---

Desde hace un tiempo tengo un canal de **YouTube** dedicado a la música dance de los 90 y hace poco decidí empezar a subir temas, para lo cual necesitaba pasarlo a video con una imagen de fondo. En un principio pensé en usar **Kdenlive**, pero pensé que para hacer lo que yo quería debería de bastarme con usar **FFMPEG**. El comando que uso es el siguiente:

```sh
ffmpeg -loop 1 -i /ruta/a/imagen -i ruta/a/audio -c:v libvpx -c:a libvorbis -b:a 192k -b:v 1M -vf scale=1920:1080 -auto-alt-ref 0 -r 1 -y /archivo/de/salida.webm
```

Vamos a repasar los parámetros

* -loop 1: Con esto le indicamos a FFMPEG que la conversión termina cuando se llega al final del audio, de lo contrario entrara en un bucle infinito.

* -i: sirve para indicar los ficheros de entrada. En este caso tenemos 2, uno para la imagen y otro para el audio. Da igual el orden en el que los pongas.

* -c:v libvpx : Le indicamos que codec de vídeo vamos a usar para el vídeo de salida. En este caso uso VP8 ya que el video de salia estará en el formato libre WebM de Google. Si quieres usar MP4 cambialo por libx264

* -c:v libvpx : Le indicamos que codec de vídeo vamos a usar para el vídeo de salida. En este caso uso VP8 ya que el video de salia estará en el formato libre WebM de Google. Si quieres usar MP4 cambialo por libx264

* -c:a libvorbis : Es como el anterior, solo que para el codec de audio. En este caso indico Vorbis (OGG). Si quieres usar MP4 cambialo a aac

* -b:a 192k : Indicamos el **bitrate** del audio. 192k es el usado en los videos **FullHD (1080)** en **YouTube** con una buena calidad. Eso si, si vas a usar un fichero de un bitrate menos esto no hará que aumente su calidad, solo el tamaño (1.8MB por minuto).

* -b:v 1M : Lo mismo de antes pero para el vídeo. Al ser una imagen fija no necesitamos más y este bitrate al menos a mi me da buen resultado. Puedes aumentarlo si vas a usar resolución 4K o ves que tu imagen no se ve bien.

* -vf scale=1920:1080 : Este parámetro sirve para usar los filtros de vídeo. En este caso lo que hace es escalar la imagen a resolución **FullHD**, aunque las imágenes que uso ya están a este tamaño. Un vídeo **HD** tiene una resolución de 1280:720, y uno **SD** 854:480.

* -auto-alt-ref 0: Durante mis primeras pruebas me saltaba un error por que no me di cuenta que la imagen tenia una zona transparente y daba error. Con esta linea se soluciona

* -r 1: Indicamos los **Fotogramas Por Segundo (FPS)** del vídeo. Como es una imagen estática le indicamos que sera solo de 1 en lugar de los habituales 25 y 30, ademas de que ocupara menos espacio y la conversión sera más rápida.

* -y: Por defecto si el fichero de salida existe FFMPEG pregunta si se quiere sobrescribir. Con este parámetro le confirmamos que lo haga sin que nos lo pregunte.

Por ultimo le pasamos la ruta y el nombre del archivo de salida y empezara la conversión. Depende de las opciones y de tu ordenador tardara más o menos (a mi me tarda una media de 15/20 minutos en FullHD, normal con una CPU de hace 10 años)

Hay más opciones, como poner varias imágenes, añadir algún efecto, etc, pero eso ya es más complejo. Ademas actualmente estoy trabajando en un script para facilitar la tarea, con una interfaz básica usando Kdialog (y más adelante también con Zenity y linea de comandos) Ya anunciare en este blog y en las redes cuando esta lista una versión estable y pulida.

Espero que este tutorial os sirva.

### Enlaces:

* [FFMPEG](https://ffmpeg.org/)
* [I Love 90's Dance Music](https://www.youtube.com/channel/UCcqJMWUOW4Ts8ROVa5Hl0VQ)
