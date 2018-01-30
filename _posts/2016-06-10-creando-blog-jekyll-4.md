---
title: Creando un blog con Jekyll 4 - Modificando el diseño. 1ª parte
layout: post
date: 2016-06-10
tags:
- tutoriales
- jekyll
img_dest: jekyll-4.png
categories: jekyll
description: En este cuarta entrega empezaremos a crear nuestro propio diseño usando para ello el framework UIKit
---

Bienvenid@s a la cuarta entrega de este tutorial. En esta entrega empezaremos a crear nuestro propio diseño. Para facilitarnos algunas tareas usaremos el framework CSS y Javascript [UIKit](http://getuikit.com), que es el que uso para la pagina de las [jornadas Rolotaku](http://rolotaku.ml), la cual también esta levantado con Jekyll y aproveche lo hecho para este blog. En anteriores entradas comente que iba a usar **MUI**, pero al final me decante por este para el tutorial por tener más opciones. Cierto que hay muchos más, pero me decante por este por ser ligero (contando solo la base necesaria). Eres libre de usar el que quieras para el diseño de tu blog. Aparte también necesitaremos [JQuery](https://jquery.com/download/) en su versión 2.x

Como ya comente en la primera entrega dentro del directorio de Jekyll hay 2 carpetas donde se guardaran los archivos del diseño: **_layout**, donde irán las pieles, e **_includes**, donde irán trozos que se incluirán dentro de las pieles, como la cabecera o el pie de pagina.

Por defecto dentro de _layouts tendremos 3 archivos: **default.html** que es el que se usara por defecto y contiene la estructura base de la pagina, **page.html** para las paginas y **post.html** para cada post del blog.

Dentro de **_includes** veremos 4 archivos html, siendo los importantes **head.html**, que contendrá todo lo que habrá dentro de la etiqueta **&lt;head>**, **header.html** que contiene la cabecera y el menú de navegación, y **footer.html** que sera el pie de pagina. Los otros simplemente añaden, si lo tenemos configurado, enlaces a nuestros perfiles en **Github** y **Twitter**

Aparte de estas dos carpetas usaremos la carpeta **/css** para las hojas de estilo y crearemos otra a la que llamaremos **/js** para los scripts **javascript**

Ademas, salvo que sepas **SASS**, una extensión de CSS que nos permite el uso de variables, sentencias, etc, puedes borrar la carpeta **_sass** y **css/main.scss**.

Ademas al final del tutorial subiré a Github el resultado para que veáis el resultado final, ademas de para que lo useis de base para hacer pruebas

## Empezando a modificar

Empezaremos analizando el archivo **_layout/default.html**. Dentro de el, como comente antes, estará la estructura básica de las paginas y veremos 2 etiquetas Liquid lógicas {%raw%}{% include %}{%endraw%}, las cuales usaremos para incluir otros trozos de código, en este caso header.html y footer.html, archivos que ya comente en el punto anterior. Por el momento vamos a dejarlo tal cual.

Lo primero que haremos sera bajar la ultima versión estable de UIkit. De todos los archivos que viene solo necesitaremos de la carpeta css **uikit.min.css**, de js **uikit.min.js** y la carpeta **fonts** al completo. Los extraemos y los ponemos dentro de la carpetas correspondientes en el directorio base, ademas de meter también la ultima versión de **JQuery** en su rama 2.X en /js, a la hora de redactar esta entrega la 2.2.3, bajando la versión comprimida. Ahora abrimos el archivo **_includes/head.html** y ponemos lo siguiente antes del primer &lt;link>

```html
{% raw %}
<link href="{{site.url}}/css/uikit.min.css" rel="stylesheet" type="text/css" />
<script src="{{site.url}}/js/jquery-2.2.3.min.js"></script>
<script src="{{site.url}}/js/uikit.min.js"></script>
{% endraw %}
```

Con esto ya tenemos lo básico para usar UIKit.

Ahora vamos a editar **_includes/header.html**. Como comente antes es donde ira la cabecera con el titulo del blog y un menú para navegar por las paginas que vayamos creando.

Vamos a reemplazar el contenido de dicho fichero por el siguiente:

```html
{% raw %}
<div id="my-id" class="uk-offcanvas">
	<div class="uk-offcanvas-bar uk-offcanvas-bar-show">
		<div class="uk-panel">
			<ul class="uk-nav">
				{% include menu.html %}
			</ul>
		</div>
	</div>
</div>
<header id="header">
	<div class="uk-container uk-container-center">
		<a href="/" class="uk-navbar-brand uk-hidden-small">{{site.title}}</a>
		<nav class="uk-navbar uk-navbar-attached">
			<ul class="uk-navbar-nav uk-hidden-small">
				{% include menu.html %}
			</ul>
			<a href="#my-id" class="uk-navbar-toggle uk-visible-small" data-uk-offcanvas></a>
			<a class="uk-navbar-brand uk-visible-small" href="/">{{site.title}}</a>
		</nav>
	</div>
</header>
{% endraw %}
```

Ademas creamos un nuevo fichero en _includes llamado **menu.html** que nos generara el menú con las paginas:

```html
{% raw %}
{% for p in site.pages %}
	{% if p.title %}
		<li><a href="{{ p.url | prepend: site.baseurl }}">{{ p.title }}</a></li>
	 {% endif %}
 {% endfor %}
{% endraw %}
```

Analicemos el código:

* Lo primero que vemos es un div con la clase **uk-offcanvas**. En esta capa ira el menú lateral, que solo sera visible cuando se pulse el botón correspondiente en pantallas pequeñas,ademas de un ID para poder llamarlo cuando se pulse el botón que lo abre/oculta. Dentro de el hay otros 2 divs y finalmente una lista que contendrá los enlaces. Como vemos se hace un nuevo include al fichero **_includes/menu.html**. Yo lo he hecho así ya que más abajo vemos que lo volvemos a incluir, con el fin de ahorrar código.

* Tras el div que contiene el menú lateral tenemos el **header**. antes de **<nav>** vemos un enlace que es el titulo del blog. Vemos que tiene una clase especial, **uk-hidden-small**, con el cual ocultamos el contenido que tenga cuando la pagina se este visualizando en pantallas pequeñas. Dentro del <nav> veremos una lista con los enlaces a las paginas, que como en el caso anterior, tiene la clase que la ocultara en pantallas pequeñas. Tras dicha lista veremos un enlace que es el que mostrara y ocultara el menú lateral. Dicho enlace como vemos hace referencia al ID del menú lateral, ademas de las clases necesarios para ello, una de ellas haciendo lo contrario a la lista anterior, que hará que solo se muestre en pantallas pequeñas. Por ultimo volvemos a tener un enlace con el titulo del blog que se mostrara al lado del botón.

Al guardar todo tendremos algo como esto:

![Captura menús](/img/tutorial_jekyll/header.png)

Siendo el de arriba cuando se visualiza desde una pantalla grande, la segunde en pantallas pequeñas y la de abajo cuando se abre el menú.

Ahora vamos a editar el pie de pagina. En el suele ir, por ejemplo, el aviso de Copyright, la licencia (en el caso de que, como pasa en mi blog, uses Creative Commons u otra)

Abrimos **_includes/footer.html** y sustituimos el contenido por el siguiente:

```html
{% raw %}
<footer class="uk-container uk-container-center uk-text-center">
	<ul class="uk-subnav uk-subnav-line uk-flex-center">
		{% if site.github_username %}
		<li>
			<a href="https://github.com/{{ site.github_username }}"><i class="uk-icon-github"></i> {{ site.github_username }}</a>
		</li>
		{% endif %}

		{% if site.twitter_username %}
		<li>
			<a href="https://twitter.com/{{ site.twitter_username }}"><i class="uk-icon-twitter"></i> {{ site.twitter_username }}</a>
		</li>
		{% endif %}
	</ul>
	<div class="uk-panel">
		<h2 class="footer-heading">{{ site.title }}</h2>
		<p>{{ site.description }}</p>
	</div>
</footer>
{% endraw %}
```

No necesita mucha explicación: Vemos un **<footer>** con una serie de clases, entre ellas para que tanto el pie como el contenido este centrado. Luego hay una lista con enlaces a nuestras cuentas de Github y Twitter (si es que añadimos esas variables eso en **_config.yml** y finalmente un div con la clase para paneles que contiene el titulo de la pagina y su descripción.

Con esto nos quedara una pagina similar a esta:

![Captura final capitulo 4](/img/tutorial_jekyll/final_cap_4.png)

Aun quede algo feilla, pero eso es algo que cambiaremos en próximas entregas. En la próxima entrega nos pondremos a modificar la que mostrara todas las entradas así como cada entrada individual, además de la imaginación.

El código del ejemplo esta en http esta en [https://github.com/son-link/tutorial-jekyll/](https://github.com/son-link/tutorial-jekyll/) y dentro de Releases podréis descargas los distintos resultados, ademas podréis ir viendo como va quedando en [http://son-link.github.io/tutorial-jekyll/](http://son-link.github.io/tutorial-jekyll/)
