---
title: 'Tutorial Pyxel 01: Introducción'
layout: post
date: '2025-03-04 16:00:00'
tags:
- pyxel
- python
- juegos
- tutorial
category: pyxel
img_dest: pyxel/01_introduccion.png
description: Esta es la primera entrega de como desarrollar juegos con el motor para Python Pyxel
---
## Introducción

Hola, y bienvenido/a/e a esta primera entrega de mi tutorial de programación de juegos con **Python** y **Pyxel**.

Pyxel es un motor de juegos para Python y programado en Rust con el que podemos hacer juegos con estética retro y algunas limitaciones, como pasaba con las consolas y ordenadores de los 80 e inicios de los 90, similar a lo que nos ofrecen **PICO-8** y **TIC-80**.

Entre sus características nos encontramos con:

* Una paleta de 16 colores
* 3 bancos de imágenes de 256x256
* 8 mapas de mosaicos de 256x256, incluso podemos cargar mapas hechos con **Tiled**
* 4 canales con 64 sonidos definibles
* 8 pistas de música que pueden combinar cualquier sonido
* Entradas de teclado, ratón y gamepad
* Herramientas de edición de imágenes y sonidos
* Colores, canales y bancos ampliables
* Soporte para Linux, Windows, Mac y navegadores web

A lo largo del tutorial iré enseñando el uso de su API, así como el uso de varias de las herramientas incluidas. Para ello he optado por enseñar a hacer un clon de Pong, un juego de sobra conocido y sencillo de programar, lo que lo hace ideal para ir dando los primeros casos.

El código fuente de cada entrega estará publicado en [este repositorio](https://codeberg.org/son_link/tutorial_pyxel) bajo licencia MIT

## Requisitos

* Saber programar en Python a un nivel básico (declaración de variables, sentencias, bucles, comparadores lógicos, definió de funciones y programación orienta a objetos), o al menos tener unos conocimientos de programación en otros lenguajes. Si quieres aprender Python, te recomiendo [este tutorial](https://www.luisllamas.es/curso-python/) de **Luis Llamas**
* Un editor de texto o IDE, el que más te guste.
* Saber manejarse por la terminal.
* Tener instalado Python, su gestor de paquetes **pip** y **venv**
	* **Ubuntu**, **Debian** y derivadas: `apt install python3 python3-pip python3-venv`
	* **Arch Linux**, **Manjaro** y derivadas: `pacman -S python python-pip python-venv`
	* **Windows**: Descargar el instalador [desde su web](https://www.python.org/downloads/) e instalar.

* Ganas de aprender ;)

## Iniciando el proyecto

Para empezar a desarrollar el juego vamos a necesitar crear una carpeta que contendrá los ficheros de él, por ejemplo **pyng**. Una vez creada abrimos una terminal y nos movemos hasta la carpeta creada con el comando **cd**. Si usas Windows, no abras **PowerShell**, ya que por defecto no sabrá donde está instalado Python. En vez de eso abre el **menú de Windows**, pulsa en **Python &lt;versión>** y finalmente en **Python &lt;versión>**.

Lo siguiente es generar un entorno virtual. La ventaja de usar entornos virtuales es que tendremos solo los paquetes y las versiones que necesitemos para nuestros proyectos, así se evita cualquier conflicto con otros paquetes, o que algún otro proyecto o programa deje de funcionar por necesitar una versión anterior de alguno de ellos. Además, en Linux desde hace un tiempo es el único modo, sin contar instalarlos usando el gestor de paquetes de la distribución, justo por los motivos indicados.

Con la terminal abierta, y estando la carpeta del proyecto, ejecutamos el siguiente comando:

`python3 -m venv .venv`

Este comando creará una carpeta llamada **.venv** donde estará el entorno virtual, aunque puede tener otro nombre. Para activar el entorno ejecuta uno de los siguientes comandos:

* Linux: `. .venv/bin/activate`
* Windows `.venv\Script\activate`

Si usas **VSCode** o **VSCodium**, ambos tienen integrado lo necesario para crear entornos virtuales, incluso activarlos al arrancar. Para ello sigue estos pasos:

* Pulsa la tecla **F1** y escribe **Python: Create Environment** y pulsa la tecla intro. Te saldrán dos opciones: *Venv* y *Conda*. Seleccionamos **Venv**.
* Ahora te pedirá seleccionar el intérprete de Python a usar. En Linux te saldrán varias rutas hacia un ejecutable de la misma versión, y de otras versiones en caso de tener varias instaladas. Seleccionamos la de Python 3 que está en **/usr/bin**
* Y ya tenemos el entorno listo

Por último, en una terminal, y con el entorno activado (en VSCode y VSCodium se hace de manera automática), procedemos a la instalación de Pyxel y sus dependencias. Para ello ejecutamos el siguiente comando:

`pip3 install pyxel`

Una vez finalizada la instalación ya podemos empezar a programar nuestro juego.

## Hola mundo

Vamos a empezar programando el típico Hola mundo. Creamos un nuevo fichero, por ejemplo, holamundo.py y añadimos las siguientes líneas:

```python
import pyxel

def draw():
    pyxel.text(8, 8, "Hola Pyxel", 7)

def update():
    pass

pyxel.init(128, 128)
pyxel.run(update, draw)
```

Voy a explicar este código:

* Primero importamos Pyxel
* Definimos 2 funciones, **draw** y **update**. Ambas son ejecutadas en cada fotograma, siendo en **draw** donde definiremos el código encargado de dibujar en pantalla, en este ejemplo un texto, así como imágenes, el mapa, formas geométricas, etc. En la función **update** irá el código encargado de, entre otros, de saber si se ha pulsado una tecla, un botón del mando, cambiar la posición de los elementos, etc. En este primer ejemplo simplemente no hace nada.
* **pyxel.text()** es la función encarga de imprimir en pantalla un texto, siendo, en este orden, la posición desde el borde izquierdo, la posición desde el borde superior, el texto a mostrar y su color, en este caso, el blanco.
* Con **pyxel.init()** iniciamos Pyxel, siendo los únicos parámetros obligatorios el ancho y el alto de nuestra ventana respectivamente. Hay más opciones, pero eso lo veremos en siguientes entregas.
* Y finalmente con **pyxel.run()** se empieza a ejecutar el motor, indicando, en este orden, la funciones encargadas de actualizar y dibujar.

> Nota: pyxel.run() debe de ir al final de definir el resto de componentes iniciales del juego, salvo las funciones, de lo contrario el juego fallara. No definas, por ejemplo, variables necesarias del juego después de el.

Si arrancamos el ejemplo veremos lo siguiente:

![](/img/tuto_pyxel/primer_ejemplo.png)

Y hasta aquí esta primera entrega. Espero que esta primera entrega haya sido de vuestro agrado. Si tenéis dudas, podéis contestar en [este post de Mastodon](https://mastodon.social/@son_link/114275024417324075)