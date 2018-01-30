---
title: Crear un tema para Jekyll
layout: post
date: 2018-01-15
tags:
- tutoriales
- jekyll
- temas
img_dest: jekyll-1.png
category: jekyll
description: En este nuevo tutorial del sistema de contenido, Jekyll, enseño como crear nuestro propio tema, lo que facilita trabajar con el diseño separandolo del resto del blog o sitio web.
---

Desde que termine mi serie de tutoriales sobre como crear un blog con Jekyll este sistema de blog ha sacado nuevas versiones con nuevas opciones, mejoras y otros cambios, de hecho por varios de esos cambios voy a actualizar mis tutoriales.

Una novedad que trajo Jekyll 3.6 es la creación y uso de temas, lo que nos permite como usuarios cambiar el diseño de manera mucho más fácil, y como desarrolladores nos permite separar el diseño del blog, además de poder subirlos para que otros lo descarguen, de hecho explicare como subir el tema a [RubyGems](https://rubygems.org) para su descarga a través de gem o bundle.

Para poder seguir este tutorial se requiere tener conocimientos de HTML y CSS, además recomiendo repasar mis tutoriales, sobre todo [el tercero](https://son-link.github.io/jekyll/2016/04/06/creando-blog-jekyll-3.html) que es donde empiezo a hablar de las etiquetas **Liquid**, si antes no las has usado ya que son necesarias. De todos modos iré explicando algunas de ellas.

## Iniciar un tema.

Jekyll tiene una opción para iniciar una nueva plantilla con lo necesario para empezar. Abrimos una terminal, nos movemos al directorio donde estará nuestro tema y ejecutamos el siguiente comando:

```yaml
jekyll new-theme <nombre>
```
Este comando nos creara una nueva carpeta con el nombre indicado y dentro de esta una serie de carpetas y ficheros:

* _includes: En esta carpeta añadiremos trozos de plantillas que se usaran en diversos diseños, por ejemplo la cabecera y el pie de página.
* _layouts: aquí es donde irán los distintos diseños. Por defecto nos añade 3: **default.html** para el diseño por defecto (por ejemplo la pagina de inicio), **post** para la pagina que mostrara una entrada y **page.html** para la pagina que muestra justo una página.
* _sass: Si vas a usar la extensión para CSS [SASS](http://sass-lang.com/).
* assets: Aquí ira todo aquello que se vaya a necesitar para el tema, como hojas de estilo, ficheros javascript, imágenes, etc.
* Gemfile: En este fichero iremos añadiendo las *gemas* que vayamos a necesitar, como algunos plugins de Jekyll (jekyll-paginator, jekyll-seo-tag, etc)
* LICENSE.txt: Este fichero contiene los términos de la licencia que usara nuestro tema. Por defecto son los de la licencia MIT. Se puede cambiar por otras como la GNU/GPL, Creative Commons, etc.
* README.md: aquí iremos detallando cosas del tema, desde una descripción hasta detalles de como instalarlo, opciones, como colaborar. etc.
* nombre.gemspec: en este fichero se guardan detalles necesarios para la creación de nuestra gema para poder instalar el tema y subirla a RubyGems.

Aparte de estas carpetas y archivos inicia un repositorio **Git** para que solo tengamos que añadir la url del repositorio, ademas de un .gitignore, en el cual se indica a git que archivos y/o carpetas no se subirán al repositorio.
