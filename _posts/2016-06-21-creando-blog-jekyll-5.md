---
title: Creando un blog con Jekyll 5 - Modificando el diseño. 2ª parte
layout: post
date: 2016-06-21
tags:
- tutoriales
- jekyll
img_dest: jekyll-5.png
category: jekyll
description: En esta entrega vamos a modificar como se muestran las entradas, tanto cuando se muestren todas como cuando solo se muestre una, así como añadir enlaces de paginación en la primera.
---

Bienvenid@ a la 5ª entrega del tutorial. En esta entrega vamos a modificar como se muestran las entradas, tanto cuando se muestren todas como cuando solo se muestre una, así como añadir enlaces de paginación en la primera.

Primero vamos a hacer unos ligeros cambios en el archivo **_layouts/default.html**

Dentro veremos 2 capas. Borramos una de ellas, dejando **{%raw%}{{content}}{%endraw%}** y en la otra cambiamos la clases por **uk-container uk-grid uk-container-center**, quedando algo así:

```html
<div class="uk-container uk-grid uk-container-center">
	{%raw%}{{ content }}{%endraw%}
</div>
```

Ahora abrimos el archivo **index.html**, que es la pagina de inicio y donde se mostraran las entradas.

Dentro vemos una capa que contiene un **H1** y una lista que contendrá el titulo, enlace y fecha de cada entrada. Lo que haremos sera cambiar dicha lista por los tags **<article>** que contendrá los mismos y ademas un extracto del articulo para que los visitantes vean algo de el para hacerse una idea de su contenido. Esto es opcional, incluso se podría mostrar todo el contenido, pero es algo que no recomiendo si las entradas son muy largas. Y al final veremos un enlace para que la gente se suscriba al feed RSS.

Solo nos falta la parte de la paginación, pero eso más adelante veremos como añadirlo.

Lo primera que haremos es borrar la primera capa que tiene una clase llamada **home**, asi como los tag **<ul></ul>** Ahora cambiamos el texto del **H1** por Entradas, Noticias o lo que quieras.

Ahora pasemos al contenido que esta dentro del bucle For. Lo primero que haremos sera cambiar el tag **<li>** por **<article>** y le añadimos la clase **uk-article**. Justo a continuación vamos a añadir un enlace al articulo con el titulo.

```html
<a class="post-link" href="{%raw%}{{ post.url | prepend: site.baseurl }}{%endraw%}"><h1 class="uk-article-title">{{ post.title }}</h1></a>
```
Como vemos volvemos a usar unas clases especiales de UIKit para este tipo de contenidos y usamos las variables de Jekyll correspondientes. Ademas usamos la función **prepend** de Liquid para que añada la url base que configuramos en _config.yml, que por defecto esta vaciá.

Ahora en el **&lt;span>** que contiene la fecha cambiamos la clase por **uk-article-meta**. Por defecto la fecha que nos muestra una plantilla nueva es en el formato ingles, primero el mes (solo las tres primeras letras, el día y finalmente el año. Liquid tiene una serie de variables para que les demos el formato que queramos, eso si, en el caso de los nombres de los meses y las semanas aparecerán en ingles, si bien a través de un plugin podríamos ponerlos en español, pero es algo que veremos más adelante. Vamos a cambiarlo al formato que entendemos en nuestro idioma, día/mes/año:

```html
{%raw%}{{ post.date | date: "%d/%m/%Y" }}{%endraw%}
```

Por ejemplo en el caso de esta entrega nos devolvería **{{ page.date | date: "%d/%m/%Y" }}**

Ahora reemplazamos el **H2** y su contenido por este:

```html
{%raw%}
{{ post.content | truncatewords: 50}}<br>
<a href="{{ post.url }}">Seguir leyendo...</a><br>
<hr class="uk-article-divider">
{%endraw%}
```

La primera linea mostrara el contenido, pero solo mostrara, en este caso, 50 palabras. Si queremos mostrar todo el contenido basta con dejar solo **post.content**. Lo siguiente solo es un enlace a la entrada con la frase **Leer más...**. No es necesario, pero a mi gusta por estética. Y lo ultimo es simplemente una barra divisoria entre cada entrada.

El resultado seria algo similar a la siguiente imagen:

![Vista previa lista entradas](/img/tutorial_jekyll/lista_entradas.png)

Para las entradas individuales abrimos el archivo **_layouts/post.html** y simplemente sustituimos el contenido por lo que pusimos dentro del **for**, quitando el enlace de *Leer más*, el de la cabecera, dejando solo el H1, y el *hr* y cambiado los **post.** por **page.** y el **{%raw%}{{ post.content }}{%endraw%}** por **{%raw%}{{ content }}{%endraw%}**. Esto mismo lo podemos aplicar a las paginas, reemplazando el contenido de **loyouts/page.html**, ademas sin el *&lt;span>* que contiene la fecha ya que las paginas no tienen fecha.

Se pueden añadir más cosas, como enlaces para compartir y un sistema de comentarios, algo que mostrare en próximas entregas.

Ahora vamos a añadir el sistema de paginación. Para ello podemos crear una serie de entradas para hacer pruebas.

Lo primero que tenemos que hacer es instalar el puglin **jekyll-pagination** desde **Gems** por lo que desde una terminal ejecutamos `gem install jekyll-pagination`

Lo siguiente sera añadir lo siguiente en el fichero **_config.yml**:

```yml
paginate: 5
paginate_path: "page:num/"

gems: [jekyll-paginate]
```

En la primera variable indicamos el numero total de entradas, la segunda sera como serán los enlaces a cada pagina y **:num** sera reemplazado por el numero de la pagina (por ejemplo **page2**). La ultima indica a Jekyll que vamos a usar la gema, por lo que no se ejecutara en el caso de que no este instalada. Una vez guardados los cambios reiniciamos el servidor de Jekyll si lo teníamos ejecutando

Ahora volvamos a abrir el **index.html**. Lo primero que vamos a hacer es modificar el *for* reemplazando **site.posts** por **paginate.posts**

Ahora tras el bucle *for* añadimos lo siguiente:

```html
{%raw%}
{% if paginator.total_pages > 1 %}
	<ul class="uk-pagination">
	{% if paginator.previous_page %}
		<li><a href="{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' }}">&laquo;</a></li>
	{% else %}
		<li class="uk-disabled"><span>&laquo;</span></li>
	{% endif %}

	{% for page in (1..paginator.total_pages) %}
		{% if page == paginator.page %}
			<li class="uk-active"><span>{{ page }}</span></li>
		{% elsif page == 1 %}
			<li><a href="{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' }}">{{ page }}</a></li>
		{% else %}
			<li><a href="{{ site.paginate_path | prepend: site.baseurl | replace: '//', '/' | replace: ':num', page }}">{{ page }}</a></li>
		{% endif %}
	{% endfor %}

	{% if paginator.next_page %}
		<li><a href="{{ paginator.next_page_path | prepend: site.baseurl | replace: '//', '/' }}">&raquo;</a></li>
	{% else %}
		<li class="uk-disable"><span>&raquo;</span></li>
	{% endif %}
	</ul>
{% endif %}{%endraw%}
```

El primer if comprueba el total de paginas. Si solo hay una pagina simplemente no hace nada. Si hay más de una lo primero que hará sera añadir una lista que contendrá los enlaces a las paginas. El siguiente if comprobara si hay pagina previa, o lo que es lo mismo, que no estemos en la primera pagina. Si es así añadirá un enlace, si no solo mostraría un texto. Lo mismo pasa al final si no estamos en la ultima página.

El *for* recorrerá desde el 1 hasta el total de paginas que hay en total. El primer if comprueba si el numero corresponde a la pagina actual, y si es así, solo mostrara el numero de la pagina. Si no es así comprobara si page vale 1, ya que apuntara a la baseurl que indicamos en el archivo de configuración. Si no es ninguno de los casos anteriores añadirá el enlace tal y como le indicamos en la variable **paginate_path**. Un ejemplo de dos paginas seria este:

![Vista previa paginación](/img/tutorial_jekyll/paginacion.png)

El que esta en azul es la pagina activa, o sea, donde estamos, y como no hay más paginas el enlace para pasar a la sigiete se vera distinto ya que usa la clase **uk-disable**

Y esto es todo de momento. Nos leemos en la próxima entrega ;)
