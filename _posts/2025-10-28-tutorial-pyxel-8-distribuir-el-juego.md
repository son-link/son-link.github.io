---
title: "Tutorial Pyxel 8: Distribuir el juego"
description: En esta octava entrega vamos a ver como empaquetar, generar ejecutables y una página web de nuestro juego
date: 2025-10-28T15:37:44.030Z
tags:
    - juegos
    - python
    - pyxel
    - tutorial
layout: post
category: pyxel
img_dest: pyxel/08_final.png
---
Hola, y bienvenido/a/e a esta octava entrega de mi tutorial de programación de juegos con **Python** y **Pyxel**.

En todo software llega el momento de empezar a distribuirlo, ya sea una versión final, o de desarrollo a modo de que otras personas lo prueben y den su opinión. Pyxel trae varias herramientas para el proceso de empaquetado y distribución, por lo que el proceso es sencillo, si bien en algunos casos puede requerir de algunos pasos extra (como que el código este separado en varios archivos o vayamos a usar recursos externos).


<details>
    <summary><em>Entregas anteriores</em></summary>
    <ul>
        <li>
            <a href="{% link _posts/2025-03-04-tutorial-pyxel-01-introduccion.md %}">01 - Introducción</a>
        </li>
        <li>
            <a href="{% link _posts/2025-04-15-tutorial-pyxel-02-la-pelota.md %}">02 - Moviendo la pelota</a>
        </li>
        <li>
            <a href="{% link _posts/2025-04-24-tutorial-pyxel-03-las-raquetas.md %}">03 - Añadiendo las palas</a>
        </li>
        <li>
            <a href="{% link _posts/2025-05-20-tutorial-pyxel-04-añadiendo-rival-y-colisiones.md %}">04 - Añadiendo rival y colisiones</a>
        </li>
        <li>
            <a href="{% link _posts/2025-06-10-tutorial-pyxel-05-puntuaciones-reseteo.md %}">05 - Puntuación y reseteo</a>
        </li>
        <li>
            <a href="{% link _posts/2025-07-15-tutorial-pyxel-06-retoques-finales.md %}">06 - Retoques finales (1ª parte)</a>
        </li>
        <a href="{% link _posts/2025-09-18-tutorial-pyxel-07-retoques-finales-2.md %}">07 - Retoques finales (2ª parte)</a>
        <li>
            08 - Distribuir el juego
        </li>
    </ul>
</details>

Veamos las opciones disponibles:

* **Paquete .pyxapp**: Este paquete contendrá los archivos del juego, tanto el script principal del juego, como otros ficheros necesarios. Sí alguien tiene instalado Pyxel en su sistema, puede simplemente bajar el paquete y ejecutar un comando. Es, además, el paso previo a los otros métodos.
* **Ejecutables**: Otra opción, y seguramente la más común, es generar un archivo ejecutable y subirlo a algún sitio para su posterior descarga, como puede ser [Itch.io](https://itch.io), o la página de lanzamientos del repositorio del código fuente (**GitHub**, **GitLab** y **Codeberg** ofrecen dicho servicio), eso sí, sí quieres generar ejecutables para diversos sistemas operativos y arquitecturas, necesitarás usar cada una de ellas para ello, bien usando máquinas virtuales, contenedores (Docker, Podman, etc.), diversos dispositivos, etc. Más abajo verás un listado de sistemas y arquitecturas soportadas oficialmente.
* **Página web**: La tercera opción es generar una página HTML, la cual contiene el código, así como el paquete generado con el contenido, para ser ejecutado en los navegadores web, de este modo la gente puede jugar directamente en su navegador y probarlo antes de decidir si bajarse el ejecutable. También es una buena opción sí queremos ir publicando versiones de desarrollo y que otras personas lo prueben, evitando así que se lo tengan que descargar por cada versión. Además, si se entra desde un móvil, se mostrará un mando virtual para jugar.

## Añadiendo soporte para mandos

Hasta ahora para mover la pala usábamos las teclas **Q** (arriba), **A** (abajo) y **Espacio** (inicio). Si bien en un ordenador no tendremos problemas, si se juega en la versión web en móviles, o en máquinas emuladoras basadas en Linux, no, así que vamos a solucionarlo rápidamente.

Dentro de **Pyng.update()** buscamos las siguientes líneas:

{% highlight python linenos %}
if pyxel.btn(pyxel.KEY_Q):
    self.paddle1.move('up')
elif pyxel.btn(pyxel.KEY_A):
    self.paddle1.move('down')
{% endhighlight %}

y las cambiamos por estas:

{% highlight python linenos %}
if pyxel.btn(pyxel.KEY_Q) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_UP):
    self.paddle1.move('up')
elif pyxel.btn(pyxel.KEY_A)  or pyxel.btn(pyxel.GAMEPAD1_BUTTON_DPAD_DOWN):
    self.paddle1.move('down')
{% endhighlight %}

Más abajo hay 2 líneas como esta:

```python
if pyxel.btnp(pyxel.KEY_SPACE):
```

Cambiamos ambas por:

```python
if pyxel.btnp(pyxel.KEY_SPACE) or pyxel.btn(pyxel.GAMEPAD1_BUTTON_A):
```

> Pyxel soporta hasta 4 mandos, empezando cada constante global por pyxel.GAMEPAD seguido de un número del 1 al 4. Aparte en la versión web, por defecto muestra un mando virtual en móviles y tablets, ideal para jugar en dichos dispositivos al carecer de teclas y mandos, sin contar mandos externos, siendo dicho mando virtual el primero. Ten en cuenta que el orden de los mandos puede variar según el sistema o el orden en el que se conectaron.

## Generar el paquete .pyxapp

Lo primero, como ya comente antes, es generar un paquete que contendrá todo lo necesario para nuestro juego, en este caso solo el script principal del juego. Aunque no lo he enseñado a lo largo de las anteriores entregas, es posible usar algunos recursos externos, como imágenes o fuentes de texto, o sí hemos divido el proyecto en varios archivos.

> Sí bien no es obligatorio el añadir recursos externos al paquete, es altamente recomendado, ya que el juego podría fallar en algunos sistemas, como la versión web, o consolas emuladoras basadas en GNU/Linux.

Para generar el paquete, usaremos el siguiente comando:

```sh
pyxel package APP_DIR STARTUP_SCRIPT_FILE(.py)
```

Donde:
* APP_DIR es la ruta donde se encuentran los archivos a añadir al paquete.
* STARTUP_SCRIPT_FILE es la ruta al archivo principal del juego. Se puede obviar la extensión .py

Vamos a ver un ejemplo con nuestro proyecto:

```sh
pyxel package . 08_final
```

Sí lo ejecutas, verás algo como esto:

![](/img/tuto_pyxel/08_01.jpg)

Como se puede ver, no solo ha añadido el script del juego, también el resto de ficheros y carpetas que se encuentran dentro del directorio indicado (el carácter punto indica que es la carpeta actual), además añade otro archivo, **.pyxapp_startup_script**, el cual tan solo contiene una línea para indicar la ruta al script principal que le indicamos.

Esto, a la larga, puede ser un problema, por ejemplo, sí dentro de la carpeta del proyecto tenemos una subcarpeta con los ejecutables, los añadirá, y hará que el paquete aumente de tamaño. Para solucionarlo vamos a hacer lo siguiente:

* Creamos una nueva carpeta a la que llamaremos **build**
* Copiamos los archivos necesarios a dicha carpeta, en este caso solo 08_final.py
* Generamos el paquete con el siguiente comando: `pyxel package build build/08_final`

![](/img/tuto_pyxel/08_02.jpg)

Como se ve en la captura, ahora el paquete solo tiene los 2 archivos necesarios, y nada más. El paquete generado tendrá por defecto el nombre de la carpeta indicada en el segundo parámetro, en este caso, build.pyxapp.

Para probar que está todo correcto, ejecutamos el siguiente comando:

```sh
pyxel play build
```

Este comando toma como último parámetro la ruta al paquete .pyxapp, siendo opcional añadir la extensión.

Sí el paquete funciona correctamente, pasemos a generar un ejecutable.

## Creando el ejecutable

Una vez tengamos el paquete preparado y comprobado, es hora de generar un ejecutable, o ejecutables, de nuestro juego. Actualmente, Pyxel soporta oficialmente los siguientes sistemas operativos y arquitecturas en el momento de publicar esta entrada:

|Sistema|x86|x64|armv7l|arm64|
|-------|---|---|------|-----|
|Linux  |✅ |✅ |✅     |✅   |
|Mac    |❌ |✅ |❌     |✅   |
|Windows|✅ |✅ |❌     |❌   |

Lo primero que vamos a hacer es instalar **Pyinstaller**. Esta librería para Python nos permite generar ejecutables de nuestros proyectos en Python, y es el que usa Pyxel para realizar dicho proceso. Para ello, abrimos una terminal, nos movemos a la carpeta del proyecto y ejecutamos el siguiente comando para instalarlo (recuerda activar el entorno virtual antes):

```sh
pip install pyinstaller
```

Ahora vamos a renombrar el paquete generado, **build.pyxapp**, a **pyng.pyxapp**. Esto lo hacemos así por qué Pyxel generara una carpeta con el nombre del archivo, y nos avisara de que se sobrescribiran los datos en la carpeta build

Para generar el ejecutable ejecutamos el siguiente comando:

```sh
pyxel app2exe PYXEL_APP_FILE(.pyxapp)
```

Que, en nuestro caso sería:

```sh
pyxel app2exe pyng
```

El proceso tardará varios segundos o minutos, dependiendo del sistema, tras los cuales tendremos el ejecutable listo dentro, en nuestro caso, la carpeta pyng. Dentro de dicha carpeta veremos un ejecutable y una carpeta, **_internal**, la cual contiene las librerías necesarias para su ejecución, ademas del paquete que generamos anteriormente


Para probarlo, simplemente hacemos doble clic sobre el ejecutable, o desde la terminal `./pyng`, o `.\pyng.exe` en Windows. Sí todo salio bien, ya puedes distribuir el juego, siendo lo idóneo crear para ello un paquete .zip, si bien para GNU/Linux lo ideal es crear un tar.xz

> Consejo: Si vas a generar ejecutables para diversas arquitecturas y sistemas operativos, una buena práctica es añadir al nombre del ejecutable y/o carpeta, ademas de en el zip o tar.xz, el nombre del sistema operativo y arquitectura, incluso el sistema operativo, por ejemplo, pyng-windows-x64.exe, pyng-linux-arm64, así queda claro a los que vayan a descargarlo cuál de ellos deberán de bajar para su sistema.

## Web

Aparte de generar ejecutables, Pyxel también nos permite generar un archivo HTML con lo necesario para que se pueda jugar desde el navegador web, así cualquiera lo puede jugar independiente del sistema operativo y arquitectura, incluyendo móviles y tables, en los que, además, se mostraran controles táctiles, siempre que la opción está activada y nuestro juego tenga el código para detectar cuando se pulsa un botón, cruceta o pad de un mando, algo que vimos al principio de esta entrega, además los navegadores actuales incluyen soporte para mandos, así que se podrá usar uno si es posible.

El proceso es como el del ejecutable, cambiando **app2exe** por **app2html**:

```sh
pyxel app2html pyng
```

Una vez terminado el proceso tendremos un archivo con el nombre del paquete terminado en .html (pyng.html en este caso), el cual tiene unas pocas líneas:

```html
<!DOCTYPE html>
<script src="https://cdn.jsdelivr.net/gh/kitao/pyxel/wasm/pyxel.js"></script>
<script>
launchPyxel({ command: "play", name: "pyng.pyxapp", gamepad: "enabled", base64: "el_paquete_en_base64" });
</script>
```

Simplemente, importa desde un CDN el script JavaScript principal, así como el resto de archivos necesarios. Luego la función **launchPyxel** se encargara de lanzar el juego, estando en el parámetro **base64** el paquete en sí codificado en dicho formato. Si quieres desactivar el mando, cambia el valor del parámetro **gamepad** por **disabled**.

Hay otros métodos para que el juego esté disponible en la web. Sí quieres saber más, [aquí](https://github.com/kitao/pyxel/blob/main/docs/pyxel-web-en.md) tienes toda la documentación al respecto en inglés.

## Final

En el repositorio del código encontrarás una carpeta llamada **scripts**, la cual contiene varios scripts para la terminal de Linux y Windows para generar el paquete y el ejecutable y el HTML de manera más rápida, solo tendrás que editar los que vayas a usar y ejecutarlos cada vez que lo necesites.

Y esto ha sido todo. Espero que esta serie de tutoriales te haya gustado y te animes a crear algún juego con el, incluso mejorar el juego que hemos desarrollado.

Para cualquier duda y/o sugerencia al respecto, podéis contactar conmigo a través de mi cuenta de [Mastodon](https://mastodon.social/@son_link).
