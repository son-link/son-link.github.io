---
title: Creando un blog con Jekyll 3 - Variables y etiquetas Liquid
layout: post
date: 2016-04-06
tags:
- tutoriales
- jekyll
img_dest: jekyll-3.png
category: jekyll
description: En este tercera entrega del tutorial empezaremos a familiarizarlos con el lenguaje de etiquetas Liquid el cual es necesario para trabajar con las plantillas
---

Bienvenidos a la tercera entrega de esta serie de tutoriales de **Jekyll**. En esta entrega empezaremos a familiarizarnos con el lenguaje de etiquetas Líquid así como definir y usar variables.

# Variables:

Para empezar esta parte del tutorial vamos a conocer como se crean y donde las variables. En Jekyll, como en otros lenguajes de programación, tendremos variables globales, como la configuración del blog, y locales, que solo estará disponibles en otras paginas, plantillas, etc, ademas de poder definir variables de tipo normal, arrays y arrays asociativas.

Las variables globales se pueden definir dentro del archivo de configuración **_config.yml** o en ficheros y subcarpetas dentro del directorio **_data**. Los ficheros dentro de dicha carpeta pueden estar en formato YMAL (como el propio archivo de configuración), JSON y CSV.

En cuanto a las variables locales están se definen dentro de dos zonas: la cabecera de la pagina, entre los --- (como ejemplo la fecha y el titulo de una entrada). Liquid tiene un tag que también nos permite definir variables dentro de la pagina, para por ejemplo, guardar el resultado de un filtro
## Definiendo variables:

### Variable estándar:
Es aquella que solo tener un valor, su sintaxis es la siguiente:

```yml
nombre: valor
```

En Liquid es:

```text
{% raw %}{% assign nombre = 'Alfonso' %}{% endraw %}

```

### Array:
Es aquella que tiene una serie de valores. Se pueden definir de dos maneras:

```yml
nombre: [1,2,3]
```
ó

```yml
nombre:
- 1
- 2
- 3
```

### Array asociativa:

Parecida a la anterior, solo que podemos definir un nombre a cada valor.

```yml
autores:
- nombre: Alfonso
  twitter: sonlink

- nombre: 'Mr Jekyll'
  twitter: MrHyde
```

Al final dejare unos enlaces a la documentación de Jekyll donde se explica esto, así como las variables propias de el.

# Liquid:
Con el podremos acceder a las variables del blog (o las nuestras), usar sentencias **if**, bucles **for**, incluir plantillas, usar filtros, etc, además de que podemos crear nuestros propios filtros, pero eso es quizás algo que vemos más adelante.

Líquid tiene 2 tipos de etiquetas: de texto y lógicas. Las primeras se usaran para tratar con variables y aplicar filtros, mientras que la segunda es la que usaremos para usar las sentencias if o los bucles for por ejemplo. Las primeras estarán entre {% raw %}{{ **dobles llaves** }}{% endraw %} y las segundas entre {% raw %}{% **llaves y el signo porcentual** %}{% endraw %}

## Etiquetas de texto y filtros:

El uso básico de este tipo de etiquetas es bastante sencillo, basta con poner, como ya se comento, el nombre de la variable entre dobles corchetes:

{% raw %}

{{ variable }}

{{ var1.var2 }}

{% endraw %}

Por ejemplo, vamos a poner la fecha en la que se publico esta entrada:

{% raw %}

{{ page.date }}

{% endraw %}

nos devolvería **{{ page.date }}**

### Filtros:

Los filtros don métodos simples con los que podremos dar algún formato, reemplazar texto, etc.
Los filtros van después de la variable o cadena e irán separados mediante **|**
Algunos ejemplos de filtros son:

* **date:** para dar formato a una fecha
* **capitalize:** Pone la primera letra en mayuscula
* **strip_html:** Devuelve la variable sin formatear en HTML
* **remove:** Borra todas las coincidencias de una cadena

Por ejemplo:

{% raw %}

{{ 'alfonso'  \| capitalize }}

{{ page.date \| date: '%d/%m/%Y' }}

{{ 'Hola Mundo' \| replace: 'Hola','Adios' }}

{% endraw %}

nos devolvería esto:

{{ 'alfonso' | capitalize }}

{{ page.date | date: '%d/%m/%Y' }}

{{ 'Hola Mundo' | replace:'Hola','Adios' }}

## Etiquetas lógicas:

En ocasiones puede que necesitemos recurrir a las sentencias lógicas y/o bucles para poner contenido en nuestro blog. Por poner un ejemplo en este blog lo uso para que en la lista de paginas de la cabecera, que no es mas que un bucle **for** que recorre todas las paginas y dentro de el un **if** para que solo muestre aquellas que contengan una variable en true. Este es su código:

```text
{% raw %}
{% for page in site.pages %}
	{% if page.title and page.onmenu %}
		<li><a class="page-link" href="{{ page.url | prepend: site.baseurl }}">{{ page.title }}</a></li>
	{% endif %}
{% endfor %}
{% endraw %}
```

[En esta pagina](https://github.com/Shopify/liquid/wiki/ES-Liquid-para-dise%C3%B1adores) tenéis un tutorial en español sobre las etiquetas Liquid. Recomiendo su lectura antes de leer la siguiente parte del tutorial.

Y esto es todo de momento. En la próxima entrega empezaremos a modificar el diseño de nuestro blog. Para facilitarnos la tarea vamos a usar el framework CSS **MUI**, el usado por este blog, pero se pueden usar otros, eso ya al gusto de cada uno. Hasta la próxima.

## Enlaces de interés:

* [Uso de ficheros de datos en Jekyll](https://jekyllrb.com/docs/datafiles/)
* [Variables de Jekyll siponibles](https://jekyllrb.com/docs/variables/)

