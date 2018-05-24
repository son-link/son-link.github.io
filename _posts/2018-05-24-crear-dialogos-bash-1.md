---
title: Crea diálogos y scripts para tus scripts Bash. 1º parte
layout: post
date: 2018-05-21 10:55:00 +0200
tags:
  - bash
  - dialog
  - kdialog
  - zenity
category: tutoriales
img_dest: crear-dialogos-bash-1.png
description: A lo largo de varias entregas veremos como crear diálogos y menús para nuestros script Bash para que sean más vistosos y amigables con dialog, zenity y kdialog.
---

## Introducción

En ocasiones cuando creamos scripts bash complejos necesitamos que el usuario interactué con el, pidiendo datos, mostrando estos, etc, o simplemente queremos que sea más accesible, especialmente para los nuevos usuarios de GNU/Linux. Gracias a varios programas podemos crear interfaces gráficas para nuestros scripts de manera sencilla: **Dialog**, **Kdialog** y **Zenity**.

**Dialog** nos permite crearlos para la terminal, **Kdialog** forma parte de **KDE** por lo que es el indicado para este escritorio, **LXQt** u otros entornos basados en **QT** y **Zenity** forma parte de **Gnome** y seria el indicado para el u otros entornos basados en **GTK** como **MATE**, **LXDE** o **XFCE**. Algunos scripts conocidos que usen alguno de ellos son [Winetricks](https://github.com/Winetricks/winetricks) (Zenity) y [RetroPie-Setup](https://github.com/RetroPie/RetroPie-Setup) (Dialog). Otro ejemplo es mi script [ImgAu2Vid](https://github.com/son-link/imgau2vid) el cual usa tanto Zenity como Kdialog.

En cada entrega explicare como hacer varios tipos de diálogos y menús en los 3. La razón de esto y que no haga entregas separadas por cada programa, es para que sea más fácil de encontrar lo que quieres hacer, ver las diferencias entre ellos (y así decidir más fácilmente cual usar) y que serán menos paginas, si bien estas serán más densas, ademas me centrare en aquellos componentes que estén en los tres, dejando el resto para otros tutoriales aparte. Ademas iré añadiendo los scripts de ejemplo en [este repositorio](https://github.com/son-link/ejemplos-dialogos-bash)


## Primeros diálogos:

Vamos a ver varios diálogos sencillos, los cuales a su vez me servirán para ir explicando algunas cosas necesarias que se irán usando a lo largo del restos de entregas.

### Diálogos de mensaje:

En algún momento del script quizás necesitemos mostrar un mensaje al usuario para informar de algo, o lanzar un mensaje de error. Veamos como se hace

**Dialog**:

```sh
dialog --title "Hola" --msgbox "Hola Mundo" 0 0; clear
```

![Msgbox en Dialog](/img/bash_dialogos/msg_box_dialog.png)

Con *\--title* especificamos el titulo del dialogo y con *\--msgbox* le indicamos que tipo de dialogo vamos a usar seguido del testo a mostrar. Los últimos parámetros indican el alto y ancho del dialogo (en **número de caracteres**, no en pixels). Con 0 se ajusta automáticamente a la pantalla de la terminal. La ultima parte, `; clear` es para que limpie la pantalla la terminal en cuando se cierre el dialogo. Esto ultimo es necesario ya que de lo contrario veremos algo similar a lo siguiente en cuanto cerremos algún dialogo y volvamos a la consola:

![Terminal tras salir sin limpiarla](/img/bash_dialogos/sin_clear.png)

**Kdialog**:

```sh
kdialog --title "Hola" --msgbox "Hola Mundo"
```

![Msgbox en Kdialog](/img/bash_dialogos/msgbox_kdialog.png)

Vemos que es lo mismo que para dialog, sin los parámetros de alto y ancho.

**Zenity**:

```sh
zenity --info --title "Hola" --text "Hola Mundo"
```

![Msgbox en Dialog](/img/bash_dialogos/msgbox_zenity.png)


Aquí vemos unas diferencias. Usamos *\--info* para indicar que se mostrara un mensaje de información. Finalmente indicaremos el texto que vamos a mostrar usando el parámetro *\--text*

Tanto Kdialog como Zenity disponen de diálogos para mostrar mensajes de error y alerta:

**Kdialog**:

```sh
# Mensaje de error
kdialog --title "Error" --error "Ocurrió un error"
# Mensaje de alerta
kdialog --title "Alerta" --sorry "No se pudieron obtener los datos"

```

![Mensaje de error en Kdialog](/img/bash_dialogos/kdialog_error.png)
![Mensaje de alerta en Kdialog](/img/bash_dialogos/kdialog_alerta.png)

**Zenity**:

```sh
# Mensaje de error
zenity --error --title "Error" --text "Ocurrió un error"
# Mensaje de alerta
zenity --warning --title "Alerta" --text "No se pudieron obtener los datos" --ellipsize
```

![Mensaje de error en Zenity](/img/bash_dialogos/zenity_error.png)
![Mensaje de alerta en Zenity](/img/bash_dialogos/zenity_alerta.png)

Vemos en el ejemplo de alerta otro parámetro, *\--ellipsize*. Este parámetro opcional le indica a Zenity que queremos que el dialogo se  adapte al contenido, de lo contrario veríamos algo como se ve en el de error.

### Diálogos Si/No

En ocasiones necesitamos que el usuario responda a alguna pregunta con Si o No. Vamos a ver como hacerlo:

**Dialog**:

```sh
dialog --title "Pregunta" --yesno "¿Quiere continuar con la operación?" 0 0; clear
```

![Preguntado Si o No en Dialog](/img/bash_dialogos/sino_dialog.png)


**Kdialog**:

```sh
kdialog --title "Pregunta" --yesno "¿Quiere continuar con la operación?"
```

![Preguntado Si o No en Dialog](/img/bash_dialogos/sino_kdialog.png)

Como vemos tanto en Dialog como Kdialog se hace del mismo modo, usando el parámetro *\--yesno*

**Zenity**:

En este caso usamos el parámetro *\--question*

```sh
zenity --question --title "Pregunta" --text "¿Quiere continuar con la operación?" --ellipsize
```

![Preguntado Si o No en Zenity](/img/bash_dialogos/sino_kdialog.png)

Tal y como están estos ejemplos simplemente muestra el mensaje y termine. ¿Como puedo saber si se pulso Si o No?. Pues es bastante sencillo y es común para los tres ejemplos:

```sh
if [ $? = 0 ]; then
	echo 'Vamos a continuar'
else
	echo 'Vamos a terminar'
fi
```

Lo que hacemos es comparar el valor de la variable *$?*, el cual es el código de salida del comando anterior. Si este es **0** es que salio correctamente (se pulso Si) y **1** si se pulso en No o cerramos el dialogo, mostrando un texto u otro. En otros ejemplos que iré mostrando pueden verse otros códigos.

Y hasta aquí esta primera entrega. En la próxima entrega veremos como crear diálogos que pedirán que el usuario introduzca un dato y como obtenerlo para usarlo.
