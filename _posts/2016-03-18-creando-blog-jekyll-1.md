---
layout: post
title:  "Creando un blog con Jekyll. 1ª parte"
date:   2016-03-18
tags:
- tutoriales
- jekyll
img_dest: jekyll-1.png
category: jekyll
---

Desde hace tiempo por internet circulan varios sistemas de creación de blogs, como **Wordpress** o **Blogger**, pero ademas muchos de ellos, especialmente los mencionados, si queremos modificar algunas de sus partes, sobre todo el diseño, necesitaros leer bastante documentación al respecto. Gracias a **[Jekyll](http://jekyllrb.com/)** y unos conocimientos basicos de HTML y CSS podremos tener un blog personalizado en poco tiempo. Este blog es un ejemplo, ademas de ser el sistema recomendado por **Github** para sus **Github Pages**

## Requisitos

Paro poder trabajar con Jekyll necesitamos:

* Tener instalado el interprete de **Ruby** y **Gems**, necesario para instalar las **gemas** (paquetes) necesarios
* Cualquier editor de texto. Para las entradas se recomienda alguno con soporte para **Markdown**. Más adelante explico que es esto
* Tener conocimientos de **HTML** y **CSS** para poder modificar el diseño y el aspecto de nuestro blog.
* Un cliente **FPT** para subir el blog al servidor (recomiendo **FileZilla**) o **Git** si lo vamos a subir a Github Pages.

## Instalación:
Lo primero que necesitamos es instalar el interprete de **Ruby** y **Gems**. Ambos están disponibles desde los repositorios de la mayoría de distribuciones GNU/Linux, por lo que solo tendremos que instalarlos desde sus gestores de paquetes. Si usas **Windows** podras descargar los instaladores desde la [pagina oficial del lenguaje Ruby](https://www.ruby-lang.org) y [RubyGems](https://rubygems.org/). En sus paginas encontraras como instalarlos.

Ahora vamos a instalar Jekyll, pero para esto hay 2 Gemas (paquetes): el oficial y el de Github. ¿Que diferencias hay? Pues principalmente Github no permite el uso de muchos plugins de Jekyll por motivos de seguridad, pero esto solo pasa si subimos directamente Jekyll, ya que, como veremos más adelante, Jekyll crea una estructura de paginas estáticas que podremos subir a cualquier servidor. Mi blog es un ejemplo de ello ya que uso un par de plugins: uno para que los meses salgan en español y otro para generar el sitemap.xml

Para instalar Jekyll abrimos una nueva terminal (consola de comandos en Windows) y ejecutamos lo siguiente:

```sh
gems install jekyll
```
Esto instalara Jekylls y todas sus dependencias. Para crear un nuevo blog ejecutamos:

```sh
jekyll new ruta
```
donde ruta es la ruta donde estará la carpeta que contendrá el nuevo blog.
Para poder usarlo directamente en Github pages primero instalaremos desde gems la gema **Bundle**.

En la carpeta que contiene el blog crearemos un nuevo fichero llamado Gemfile donde pondremos el siguiente contenido:

```ruby
source 'https://rubygems.org'
gem 'github-pages'
```

En la carpeta veremos varios archivos y carpetas. Vamos a ver que es cada una:

* css: aquí irán las hojas de estilo
* _includes: Aquí ira todo aquello que se incluirá dentro de otras paginas. En este ejemplo la cabecera y el pie de pagina, entre otras
* _layouts: aquí van los diseños de pagina. En cada articulo y pagina podremos indicar cual usar. default.html contiene la estructura básica de todas las paginas.
* _post: Aquí es donde irán las entradas del blog. Las entradas se escriben usando el formato Markdown, que es un sistema de marcado ligero pensado para dar un formato rápido e nuestros documentos, como cabeceras, texto en negrita, imágenes, etc. Un ejemplo parecido seria el usado por muchos foros.
* _sass: SASS es un lenguaje que extiende las hojas de estilo CSS y que permite separar los estilos en bloques, usar variables, etc. Puedes saber más de ello en [esta entrada de la Wikipedia](https://es.wikipedia.org/wiki/Sass_(lenguaje_de_hojas_de_estilo))
* About.md: es una pagina de ejemplo.
* _config.yml: este es el archivo más importante ya que es donde se guarda la configuración del blog, por lo que hay que tener cuidado al modificarlo. Sera necesario reiniciar Jekyll cada vez que se modifique
* feed.xml: el feed del blog, para que todo aquel que quiera pueda estar al tanto de su lector de feeds favorito
* index.html. Creo que no hace falta indicar lo que es.
* _site: en esta carpeta, que por el momento no esta, es donde ira el blog como tal cuando lo generemos o ejecutemos el servidor de Jekyll

Ahora vamos a configurar el servidor. Abrimos con cualquier editor de texto el archivo _config.yml

```yaml
# Welcome to Jekyll!
#
# This config file is meant for settings that affect your whole blog, values
# which you are expected to set up once and rarely need to edit after that.
# For technical reasons, this file is *NOT* reloaded automatically when you use
# 'jekyll serve'. If you change this file, please restart the server process.

# Site settings
title: Titulo del blog
email: your-email@domain.com
description: > # this means to ignore newlines until "baseurl:"
  La descripción del blog que aparece en las etiquetas meta y en la descripción en el feed.xml
  Cada linea debe de estar precedida de 2 espacios en blanco
baseurl: "" # La subruta del blog, por ejemplo /blog
url: "http://localhost" # la url y el protocolo base de tu blog
twitter_username: jekyllrb
github_username:  jekyll

# Build settings
markdown: kramdown
```
Como vemos ya se nos describe cada variable. Modificalo a tu gusto. La ultima variable es el encargado de convertir nuestros ficheros Markdown a HTML. Este es el usado por defecto, ademas del único que se puede usar en Github Pages.

Vamos a ver como es el blog tal y como es ahora. Para ello desde la terminal y desde el directorio donde esta el blog ejecutamos:

```sh
jekyll serve
```
Una vez termine de arrancar abrimos nuestro navegador web y escribimos localhost:4000

Si abrimos la carpeta _site veremos la estructura del sitio. En próximas entregas veremos como modificar algunas de las rutas.

Y aquí termina este primera entrega. En la próxima entrega empezaremos a añadir nuevas entradas y paginas en el blog.
