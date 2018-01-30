---
title: Creando un blog con Jekyll 7 - Publicando el blog
layout: post
date: 2017-07-26
tags:
- tutoriales
- jekyll
- github
- git
img_dest: jekyll-7.png
category: jekyll
description: En esta ultima entrega de esta serie de tutoriales veremos como publicar nuestro blog o sitio web, tanto en GitHub Pages como en cualquier otro servidor, aunque este no soporte Jekyll.
---

Y tras varios meses de parón, algo que comento en otra entrada, seguimos con una nueva entrega de esta serie de tutoriales dedicados a Jekyll.

En esta entrega vamos a ver como publicar nuestro blog o sitio web, bien en las Github pages o en cualquier alojamiento.

Para el primero recurriremos a **Git**, mientras que para un alojamiento estándar recurriremos al clásico FTP.

## Github Pages

Uno de los servicios de los que disponemos en Github son las **Github Pages**, las cuales nos permiten alojar nuestra pagina persona y/o la de nuestros proyectos, no podemos usarlo, por ejemplo, para un blog dedicado al manga.

Como ya comente en anteriores entregas Github Pages soporta Jekyll gracias a una versión algo especial, ya que no podremos usar plugins de terceros, como el que uso yo para mostrar la lista del archivo de entradas.

lo primero que necesitaremos es instalar **Git**. La mayoría de distribuciones lo tienen en sus repositorios, por lo que basta con recurrir a su gestor de paquetes para instalarlo. P.e en Arch Linux y derivadas `pacman -S git`
Para Windows necesitaremos descargar el instalador.

Antes de nada crearemos un nuevo proyecto en Github cuyo nombre sera el el tu usuario, o el de la organización, seguido de .github.io. La url de este blog es un ejemplo.

Una vez creado en la nueva pagina del proyecto nos indica los comandos que debemos de ejecutar, si bien el primero, el crear un archivo README.md, lo descartamos. Para ello abrimos una terminal y nos dirigimos hasta la carpeta donde se encuentra el blog. Para hacer esto en **Windows** hay que ejecutar la terminal que instala Git, no desde la consola de comandos. Si usamos algún plugin que no soporte Github Pages debemos de hacerlo desde la carpeta **_site**

### ¿Y si quiero publicarlo dentro de un proyecto?
En este caso hay 2 métodos: creando un branch llamado **gh-pages** o dentro de una carpeta llamada **doc** en la raiz del proyecto. Para la primera debemos de estar cambiando continuamente entre el brach gh-pages y el resto, mientras que esto no es necesario para el segundo. Prueba ambos métodos y usa el que más te guste o se adapte a tus necesidades, si bien para el segundo recomiendo meter el contenido de **_site**

## A cualquier alojamiento

Como ya comente Jekyll genera archivos estáticos dentro de la carpeta **_site**, por lo que podemos subir el contenido de dicha carpeta a cualquier alojamiento, la pagina de las Rolotaku es un ejemplo de ello ya que esta alojada en un servidor que no soporta Ruby.

Para ello solo necesitamos un cliente **FTP**, siendo el más recomendado FileZilla, el cual esta disponible tanto para Windows como para GNU/Linux, por lo que podemos descargarnos el instalador desde su pagina web o mediante el gestor de paquetes de nuestra distribución.

Una vez descargado lo ejecutamos y veremos algo similar a esto:

![captura Filezilla](/img/tutorial_jekyll/filezilla_1.png)

Por la ventana izquierda navegaremos por nuestro sistema, mientras que en la derecha lo haremos por el servidor FTP.

Vamos a añadir el servidor. Para ellos vamos a *Archivo -> Gestor de sitios*/ (o mediante *Ctrl+S* y veremos lo siguiente:

![captura gestor sitios Filezilla](/img/tutorial_jekyll/filezilla_2.png)

Agregamos los datos proporcionados por tu alojamiento y pulsamos en Conectar.

Ahora en la ventana de la derecha nos podemos mover por los directorios del servidor, así que nos dirigimos a donde tengamos que subir los ficheros. En algunos casos se suben a la carpeta raíz, pero en algunos casos hay que subirlos a una determinada ruta, si bien suelen indicarla mediante algún archivo de texto. Si o sabes donde consulta la documentación del alojamiento o ponte en contacto con ellos.

Y con esto hemos terminado esta entrega. En la [pagina de Jekyll](http://jekyllrb.com/docs/deployment-methods/) podéis ver otros métodos de publicar la pagina. Nos leemos en la siguiente entrada.
