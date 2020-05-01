---
title: 'Crea tu web con Jekyll. 1ª parte: Introducción'
layout: post
date: '2020-04-28 11:00:00 +0200'
tags:
- jekyll
- tutoriales
category: jekyll
img_dest: jekyll-1.png
description: A lo largo de este tutorial aprenderás a crear una web con Jekyll, un
  popular sistema de generación de sitios web estáticos.
---

## Presentación

Hace unos años empece una serie de tutoriales de como crear nuestra web o blog con **Jekyll**, un popular sistema de creación de sitios webs estáticos.

La razón de hacer una nueva serie de tutoriales es que desde entonces Jekyll ha evolucionado y se ha quedado desactualizado, ademas de querer separar este curso en 2 partes: esta, en la que veremos desde como instalar lo necesario para empezar hasta la publicación de nuestro sitio. La otra parte, que publicare tras esta, esta dedicada a la creación de temas, uno de los grandes cambios desde entonces, ya que desde hace ya hace varias versiones el tema del sitio esta por separado, pudiendo cambiar a otro con solo hacer un ligero cambio en la configuración, acelerando el proceso.

### ¿Que es Jekyll?

Si nunca has leído u oído sobre Jekyll esto es lo primero que te preguntaras.

Jekyll es un sistema de generación de sitios estáticos, esto es que lo que hace es, según los que vayamos añadiendo, ira generando la estructura de nuestro sitio web, no usa ninguna base de datos ni lenguaje de programación del lado servidor comp PHP, nuestras entradas y páginas se guardan en ficheros de texto, y en base a estos, Jekyll ira generando lo necesario.

Una vez generado solo tenemos que subir todo al servidor a través de algún cliente FTP, o usar algunos servicios como GitHub Pages, GitLab Pages o Forestry, de los cuales ire hablando en futuros capítulos, ademas de como automatizar el proceso si vamos a usar FTP para la subida.

### ¿Que ventajas tiene Jekyll frente a WordPress y sistemas similares?

Entre sus ventajas tenemos:

* Rápidez: El generar los ficheros el servidor no tiene que realizar ningún proceso ni consulta a base de datos la respuesta del servidor es más rápida.
* Seguridad: Justo al no realizar ningún proceso en el lado del servidor las posibilidades de ataques se reducen.
* Mantenimiento casí 0: Otro punto a favor es que, en gran parte por el punto anterior, no tenemos que estar pendientes de instalar actualizaciones, entre otros, salvo para subir los cambios que se vayan haciendo. Hay muchos casos de sitios cuyo contenido no cambia en años y por ello se deja tal cual una vez hecha y nadie no se preocupa de su mantenimiento.

Y entre sus desventajas:

* Si bien el mantenimiento es menor, si no usamos algunos servicios como los comentados antes o automatizamos la subida de los cambios, tenemos que subir los cambios a mano, lo que si tenemos una página grande puede resultar tedioso.
* Al no contar con un panel central si más de una persona va estar trabajando en el sitio esta tiene que enviar los ficheros al que se encargue del mantenimiento, si bien gracias a los servicios comentados anteriormente esta tarea es más cómoda. Jekyll tiene un plugin para tener un pequeño panel de control, pero este solo funciona en nuestro ordenador.

#### ¿Para que tipos de sitios web puedo crear con Jekyll?

Al ser sitios estáticos no podemos, por ejemplo, montar una tienda online. Estos son algunos de los tipos de sitios web que podemos realizar:

* Un blog: Es el uso principal que se le da a Jekyll, y este mismo blog es un ejemplo.
* Una web sencilla, como puede ser la de un proyecto o una pagina de aterrizaje (Landing Page).
* Una web cuyo contenido no cambie mucho con el paso del tiempo o no sea muy compleja, como puede ser la web de una asociación, un restaurante, etc.
* Una web o parte de ella para la documentación, por ejemplo, de una Rest API, un framework, etc.

En [esta página de la web de Jekyll](https://jekyllrb.com/showcase/) podéis ver varias webs que lo usan. Ademas Jekyll es lo que esta detrás de GitHub Pages, el servicio de sitios web de GitHub.

#### ¿A donde puedo subir mi sitio hecho con Jekyll?

Como ya comente solo necesitamos un servidor web básico, sin PHP, MySQL y demás, lo que ademas te permite un buen ahorro ya que no tendrás que contratar planes de hosting muy elevados, salvo que tengas muchas visitas o necesites ampliar el espacio en disco.

### ¿Que necesito para empezar?

Necesitaremos lo siguiente:

* Un editor de texto cualquiera, como el Block de notas, Leafpad, Nano, etc. Para las entradas la opción ideal es usar un editor que soporte el lenguaje de marcado **Markdown**. En otro capitulo veremos que es esto.
* El interprete del lenguaje de programación **Ruby**.
* El gestor de paquete de Ruby, **Gems**, necesario para instalar los paquetes necesarios (viene de serie con el instalador)
* Saber moverse por la terminal (CMD o PowerShell en Windows)
* Ganas de aprender.

Pues sin más dilación vamos a empezar.

> **Nota para los usuarios de Windows**: cuando hablo de abrir una terminal, para este sistema me refiero a CMD, PowerShell, incluso WSL.

## Instalando lo necesario:

Como ya comente para poder usar Jekyll necesitaremos el interprete del lenguaje de programación Ruby, siendo la 2.4 la minina requerida (a la hora de escribir este articulo están por la 2.7, pero recomiendo dentro de lo posible que uséis la 2.6 ya que con la 2.7 salen mensajes de alerta, que si bien sigue funcionando, podría dejar de serlo en un futuro cercano) y el gestor de paquetes de este, Gems.

#### Windows:

La manera más fácil de instalar Ruby en Windows es usar [Ruby Installer](https://rubyinstaller.org). Una vez la web vamos a la página de descargas y bajaremos la ultima versión de la 2.6 (2.6.6.1 en el momento de redactar esto) en la sección **without Devkit** para la arquitectura de nuestro sistema (32 0 64 bits). El **DevKit** es un conjunto de herramientas necesarias para compilar extensiones para Ruby escritas en **C**, pero hasta el momento no me he encontrado ninguna extensión par Jekyll que lo requiera, por lo que no veo necesario su instalación.

Una vez bajado procedemos a ejecutar el instalador. Dejaremos todo como esta he iremos instalando todo. Una vez terminado la instalación nos preguntara si queremos instalar el DevKit. Lo desmarcamos y se terminara la instalación.

#### GNU/Linux:

Para instalar lo necesario en nuestra distribución de GNU/Linux instalaremos los paquetes desde el gestor de paquetes. Abriremos una terminal y ejecutamos lo siguiente:

**Ubuntu**:
`sudo apt-get install ruby-full build-essential zlib1g-dev`

**Debian**:
`sudo apt-get install ruby-full build-essential`

**Fedora**:
`sudo dnf install ruby ruby-devel @development-tools`

**Arch Linux y derivadas**:
`sudo pacman -S ruby rubygems`

Una vez instalado todo vamos a añadir las siguientes lineas al archivo ~/.bashrc (o ~/.zshrc si usamos el interprete ZSH )

```sh
export GEM_HOME="$HOME/gems"
export PATH="$HOME/gems/bin:$PATH"
```

Esto hará que todos los paquetes de Ruby se instalen en nuestro directorio de usuario y no en nuestro sistema. Este paso es opcional.

Ya para finalizar vamos a instalar Jekyll. Hay 2 paquete disponibles: **jekyll** y **github-pages**. El primero es el propio Jekyll, mientras que el segundo instala la versión usada en **GitHub Pages**, el servicio de **GitHub** que nos permite alojar nuestro blog o sitio web, sea personal o para nuestros proyectos, el cual ademas nos instala una serie de plugins y temas. Si no vas a usar GitHub Pages puedes usar Jekyll, en caso de que sea así instala su paquete ya que GitHub Pages no admite todos los plugins disponibles.

En la terminal ejecutamos lo siguiente:

```
gem install jekyll bundle
```

Y con esto ya tenemos Jekyll instalado y preparado para ser usado.

## Creando nuestro proyecto:

Una vez instalado todo vamos a crear nuestro proyecto. Abre una terminal y muévete hasta la carpeta donde ira la carpeta de nuestro proyecto y ejecuta el siguiente comando:

```
jekyll new <nombre>
```

Donde *&lt;nombre>* es el nombre de la carpeta. Si la abrimos veremos los siguientes archivos:

![Ficheros Jekyll](/img/tutorial_jekyll/ficheros.png)

Vamos a ejecutar Jekyll en modo servidor:

```
bundle exe jekyll s
```

Una vez arrancado nos dirá la url del servidor, que sera por defecto **http://127.0.0.1:4000/** y veremos lo siguiente:

![Ficheros Jekyll](/img/tutorial_jekyll/jekyll_inicial.png)

Y con esto es todo. En la próxima entrega veremos como configurar nuestro sitio y como crear nuevas entradas y paginas.

En la próxima entrega veremos para que es cada carpeta y fichero, asi como empezar a configurar nuestro proyecto, así como crear nuestra primera entrada del blog.

### Enlaces:
[Jekyll](https://jekyllrb.com)