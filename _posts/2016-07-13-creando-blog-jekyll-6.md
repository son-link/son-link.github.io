---
title: Creando un blog con Jekyll 6 - Modificando el diseño. 3ª parte
layout: post
date: 2016-07-13
tags:
- tutoriales
- jekyll
img_dest: jekyll-6.png
category: jekyll
description: En esta entrega vamos a terminar de modificar el diseño de la entrada individual añadiendo un sistema de comentarios, Disqus, y enlaces para compartir en redes sociales, WhatsApp y Telegram. Ademas veremos como empezar a modificar el diseño mediante CSS.
---

Bienvenid@ a la 6ª entrega del tutorial. En esta entrega vamos a terminar de modificar el diseño de la entrada individual añadiendo un sistema de comentarios, para ello usaremos **Disqus** y enlaces para compartir en redes sociales, Whatsaap y Telegram. Ademas veremos como empezar a modificar el diseño vía CSS usando la herramienta online que encontraremos en la propia web de UIKit o mediante otro archivo CSS.

Abriremos el fichero **_layouts/post.html** y añadimos lo siguiente tras {%raw%}{{content}}{%endraw%}

```html
{%raw%}
<hr class="uk-article-divider">
	Compartir:
	<div class="uk-button-group">
		<a class="uk-button btn-twitter" title="Compartir en Twitter" target="_black" href="http://twitter.com/intent/tweet?text={{ page.title }}&url={{ page.url | prepend: site.url }}"><i class="uk-icon-twitter"></i></a>
		<a class="uk-button btn-facebook" title="Compartir en Facebook"  target="_black" href="http://www.facebook.com/sharer/sharer.php?u={{ page.url | prepend: site.url }}"><i class="uk-icon-facebook"></i></a>
		<a class="uk-button btn-googlep" title="Compartir en Google Plus" target="_black" href="https://plus.google.com/share?url={{ page.url | prepend: site.url }}"><i class="uk-icon-google-plus"></i></a>
		<a class="uk-button btn-whatsapp" title="Compartir en Whatsaap" href="whatsapp://send?text={{ page.url | prepend: site.url | cgi_escape}}"><i class="uk-icon-whatsapp"></i></a>
		<a class="uk-button btn-telegram" title="Compartir en Telegram" href="https://telegram.me/share/url?url={{ page.url | prepend: site.url | cgi_escape }}"><i class="uk-icon-paper-plane"></i></a>
	</div>{%endraw%}
```

No hay mucho que explicar, salvo una nueva función de **Liquid** en Jekyll, **cgi_escape**, el cual formatea algunos caracteres de las urls como las // o & a sus correspondientes %XX, por ejemplo **?** se transforma en **%3F**. Esto es necesario ya que de lo contrario en algunos casos, como Telegram y Whatsapp, no funcionaria correctamente. Ademas en los botones se han añadido unas clases para cada botón. Más adelante añadiremos los estilos para ellos.

Pasemos al sistema de comentarios. Hay muchos, pero me decanto por Disqus por que los usuarios pueden comentar usando su perfil de varias redes sociales, funciona bien en móviles, siendo la única pega que no podemos cambiar su estilo, al menos en la versión gratuita.

Lo primero sera entrar a su [pagina web](https://disqus.com) y una vez dentro pulsamos en **Get Started**. En la nueva pagina nos pedira un nombre de usuario, un correo electrónico y la contraseña para la nueva cuenta. Una vez rellenados pulsamos en **Next**Ahora nos pedira el nombre de la pagina, su ID para la url única de Disqus (se pondrá de manera automáticamente según el titulo que pongamos, pero se puede cambiar) y la categoría del blog. La próxima simplemente es informarnos de los 2 tipos de productos de ellos si vamos a usarlo en alguna pagina comercial para añadir publicidad o simplemente solo los comentarios. Vamos abajo y pulsamos en el botón y listo. Ahora nos preguntara que seleccionemos la plataforma en la que lo usaremos, en este caso seleccionamos **Universal Code**.

Ahora veremos los códigos que debemos de introducir. El primero, que es el sistema de comentarios debemos de añadirlo justo antes del **&lt;/article>**. Disqus ademas nos pide configurar unas variables para evitar posts duplicados. Pare ello descomentamos **var disqus_config** quitando los /\* y \*/ que hay antes y después. La primera variable tiene que ser la url de la entrada y la segunda un ID único. Para este ultimo vamos a usar la fecha.

```js
{%raw%}
var disqus_config = function () {
			this.page.url = '{{ post.url | prepend: site.baseurl }}';  // Replace PAGE_URL with your page's canonical URL variable
			this.page.identifier = {{ page.date | date: "%d%m%Y" }}; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
		};
{%endraw%}
```

## Cambiando el diseño de UIKit:

Antes de meternos a cambiar el diseño de UIKit hay que pensar en cual de los tres temas vamos a usar. Hasta la fecha hemos estado usando el tema por defecto, pero UIKit tiene dos más: **Gradient** y **Almost Flat**. El primero cambia los colores planos por gradientes y son los ficheros que empiezan por **uikit.gradient** mientras que los segundos siguen siendo planos pero cuentan con bordes más redondeados, lineas en algunos de los botones, etc. Sus ficheros empiezan por **uikit.almost-flat**. Puedes segur este tutorial con cualquiera de los tres, solo cambian algunas opciones dentro de la herramienta de personalización y reglas CSS.

### Usando la herramienta de personalización

Dicha herramienta se encuentra [en su pagina](https://getuikit.com/v2/docs/customizer.html)

![captura herramienta personalización](/img/tutorial_jekyll/herramienta_uikit.png)

En la parte izquierda tendremos las opciones y en la derecha la vista previa. Arriba tenemos un selector para seleccionar cualquiera de los tres temas disponibles. A continuación están las diferentes opciones, como colores, tamaños, fuentes, etc. Solo tendremos que pulsar sobre dichas opciones para cambiarlas. Abajo veremos una opción para minimizar el CSS, opción recomendada si nos a modificar nada a mano ya que ocupa menos espacio. Tenemos 2 opciones de descarga: CSS y **LESS**. LESS es una expansión de las CSS como SASS, del que ya comente un poco en anteriores entregas. También vemos un botón para importar LESS, por lo que recomiendo guardar en ese formato si más adelante queremos realizar una modificación y así no empezar desde cero.

### Mediante CSS

La opción más rápida si no vas a querer hacer muchos cambios, o simplemente quieres hacerlo más a tu gusto. Para ello creamos una nueva hoja CSS e iremos usando las clases de UIKit. Cabe recordar que varios elementos usan varias clases, por lo que tendremos que ver cual de ellas vamos a modificar sin que afecte a otros, o crear una clase nueva si solo queremos que afecte a uno en concreto (por ejemplo los enlaces en una determinada zona). Para estos menesteres lo mejor es hacer uso de las herramientas de desarrollo que viene con algunos navegadores, siendo mi recomendación las de Firefox ya que cuenta con un editor de hojas CSS que nos permite ver los cambios en tiempo real (como con la herramienta de personalización de UIKit) e ir guardando el resultado. Esta opción me resulto útil tanto a la hora de crear este blog como el de las Rolotaku y una tienda online en la empresa donde hice mis practicas de un curso de programación de paginas web, ya que es mucho más rápido. Eso si, recuerda ver los cambios con otros navegadores, tablets y móviles incluidos

Por ejemplo vamos a cambiar algunos estilos de la barra de navegación:

```css
#header, #header nav, #my-id div { background: #263238;}
#header a {color :#fff;	}
#header li a:hover, #my-id .uk-nav li a:hover { color: #263238; background: #fff}
```

Para finalizar dejo los estilos que aplique a los botones de compartir:

```css
.btn-twitter {background-color: #2196F3; color: #fff}
.btn-twitter:hover {color: #2196F3}
.btn-facebook {background-color: #0D47A1; color: #fff}
.btn-facebook:hover {color: #0D47A1}
.btn-googlep {background-color: #B71C1C; color: #fff}
.btn-googlep:hover {color: #B71C1C}
.btn-whatsapp {background-color: #4CAF50; color: #fff}
.btn-whatsapp:hover {color: #4CAF50}
.btn-telegram {background-color: #00B0FF; color: #fff}
.btn-telegram:hover {color: #00B0FF}
.uk-button-group a[class*="btn-"] {width: 40px;}
```
Y con esto hemos terminado, al menos de momento, con el cambio de diseño. A partir de ahora prueba a ir cambiando las reglas CSS, colores, etc para ir aprendiendo a tenerlo a tu gusto. En la próxima entrega enseñare a subir el blog a Github, ya sea como pagina de nuestra cuenta o de algún proyecto, así como poder publicarlo en cualquier alojamiento.
