---
layout: post
title:  "Creando un blog con Jekyll 2. Añadiendo entradas y paginas"
date:   2016-03-19
tags:
- tutoriales
- jekyll
img_dest: jekyll-2.png
category: jekyll
---


En esta segunda entrega del tutorial voy a explicar como publicar nuevos artículos, además de como añadir resaltado de sintaxis en el caso de que en tu blog vayas a publicar entradas con código fuente.

Como ya comente en la primera entrega todas nuestras entradas irán dentro de la carpeta _post y cuyos nombres deben de empezar con una fecha sen el formato inglés seguido del nombre, por ejemplo **2016-03-19-mi-primera-entrada**

Como también comente en la anterior entrega para poder dar formato a nuestras entradas se usa el formato Markdown, un sistema simple que se creo para dar formato y que fuese más fácil de leer, algo similar al BBCode que se usa en los foros. Podremos definir cabeceras (del H1 al H5), texto en negrita o cursiva, añadir imágenes, etc. Veamos algunos ejemplos:


```md
# Esto es una cabecera H1
## Esto es una cabezera H2
...
##### Esto es una cabezera H5

**Texto en negrita**

*Texto en cursiva*

Lista ordenada:

1. Lista ordenada
2. Lista ordenada

Lista desordenada

* Un elemento de una lista
* otro elemento de una lista

[Un enlace](http://github.io)

![Github logo](/img/GitHub_Logo.png)

`una linea de código`

```

Cuyo resultado seria:

# Esto es una cabecera H1
## Esto es una cabezera H2
##### Esto es una cabezera H5

**Texto en negrita**

*Texto en cursiva*

Lista ordenada:

1. Lista ordenada
2. Lista ordenada

Lista desordenada:

* Un elemento de una lista
* otro elemento de una lista

[Un enlace](http://github.io)

![Github logo](/img/GitHub_Logo.png)

En [esta web](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) podéis encontrar más ejemplos, incluidos algunos propios de Github. Hay varios editores que facilitan la escritura, como [CuteMarkEd](http://cloose.github.io/CuteMarkEd/), disponible para GNU/Linux y Windows siendo el usado por un servidor

Las paginas irán dentro de la carpeta principal, si bien más tarde se puede configurar que estén en otra sub-carpeta. Ademas las paginas pueden ser escritas directamente en HTML.

Lo que si tienen en común tanto las paginas como las entradas es que hay una serie de lineas que deben de situarse en la cabecera:

```yaml
layout: post
title:  "Creando un blog con Jekyll 2. Añadiendo entradas y paginas"
date:   2016-03-19
```

La primera linea indica que piel se va a usar. Para las paginas se usara pages. En próximas entregas veremos esto en profundidad.

Las siguientes lineas no necesitan explicación. Hay más variables, ademas de que podemos añadir algunas propias, pero eso se vera más adelante. Para las páginas existe otra que nos permite configurar el enlace permanente, esto es, la url donde se encontrara:

```yml
permalink: /sobre/
```

En este caso la pagina estará en http://localhost:4000/sobre

Y esto es todo por hoy. En la siguiente entrega empezaremos a ver las etiquetas Liquid, indispensable para modificar y crear el diseño, ademas de usarlas en las paginas.
