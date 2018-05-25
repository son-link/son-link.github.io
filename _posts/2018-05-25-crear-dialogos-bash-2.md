---
title: Crea diálogos y scripts para tus scripts Bash. 2º parte
layout: post
date: 2018-05-25 10:55:00 +0200
tags:
  - bash
  - dialog
  - kdialog
  - zenity
category: tutoriales
img_dest: crear-dialogos-bash-2.png
description: En este nueva entrega enseñare varios dialogos para pedir datos al usuario y como podemos obtenerlos para usarlos en nuestros scripts.
---

En la entrega anterior vimos diálogos básicos para ir entrando en materia. En esta nueva entrega enseñare diálogos que nos servirán para pedir datos al usuario y como obtenerlos para usarlos en nuestro script

## Diálogos de entrada:

Los diálogos de entrada nos permiten pedir al usuario un dato, por ejemplo, su nombre, una dirección, etc

```sh
dialog --title 'Su nombre' --inputbox "¿Cual es su nombre?" 0 0; clear
```

![inputbox en Dialog](/img/bash_dialogos/inputbox_dialog.png)

Este ejemplo una vez que pulsamos en Aceptar se cierra y no muestra nada. ¿Como obtenemos entonces lo que introduce el usuario?. Pues guardándolo en una variable:

```sh
#!/bin/bash
nombre=$(dialog --title 'Su nombre' --stdout --inputbox "¿Cual es su nombre?" 0 0)
if [ -n $nombre ]; then
	dialog --title 'Su nombre' --msgbox $nombre 0 0
fi
clear
```
Para obtener la salida de un comando debemos de meterlo entre **$()** o **``**, aunque no se que ventajas tiene uno sobre el otro. Ademas he introducido un nuevo parámetro, *\--stdout*, para indicar que saque el dialogo por la salida estándar, ya que de lo contrario no veríamos nada. Luego comprobamos si $nombre contiene algún valor (se introdujo un valor y se pulso Aceptar) y lo mostramos.

En Kdialog es similar:

```sh
#!/bin/bash
nombre=$(kdialog --title 'Su nombre' --inputbox "¿Cual es su nombre?")
if [ -n $nombre ]; then
	kdialog --title 'Su nombre' --msgbox $nombre
fi
```

![Inputbox en Kdialog](/img/bash_dialogos/inputbox_kdialog.png)

**Zenity**:

```sh
#!/bin/bash
nombre=$(zenity --entry --title "Su nombre" --text "¿Cual es tu nombre?")

if [ ! -z $nombre ]; then
	zenity --info --title "Su nombre" --text $nombre
fi
```

![Inputbox en Zenity](/img/bash_dialogos/inputbox_zenity.png)

Zenity no cuenta con un diálogo de entrada como Dialog y Zenity, si no que tiene uno para un dialogo de formularios, pero es algo que ya veremos más adelante.

## Diálogos de contraseña:

Es posible que en algún script necesitemos que el usuario introduzca una contraseña en un momento dado, por ejemplo, para conectarse a un servidor remoto y obtener unos datos.

```sh
#!/bin/bash
pass=stallman
passwd=$(dialog --title 'Su contraseña' --stdout --passwordbox 'Introduzca su contraseña' 0 0)
if [[ ! -z $passwd ]; then
	if [ $pass = $passwd ]; then
		dialog --title 'Correcta' --msgbox 'Contraseña correcta' 0 0
	else
		dialog --title 'Incorrecta' --msgbox 'Contraseña incorrecta' 0 0
	fi
fi
clear
```

![Passwordbox en Dialog](/img/bash_dialogos/password_dialog.png)

Como pasa con muchos programas de linea de comandos, como su o sudo, no se muestra nada mientras se introduce la contraseña, por lo que nadie ve cuantos caracteres ha introducido. Si queremos mostrar los tipicos asteriscos podemos añadir el parámetro *\--insecure*:

![Passwordbox inseguro en Dialog](/img/bash_dialogos/password_dialog_insecure.png)

En Kdialog es de la siguiente manera:

```sh
#!/bin/bash
pass=stallman
passwd=$(kdialog --title 'Su contraseña' --password 'Introduzca su contraseña')
if [ -n $nombre ];then
	if [ $pass = $passwd ]; then
		kdialog --title 'Correcta' --msgbox 'Contraseña correcta'
	else
		kdialog --title 'Incorrecta' --error 'Contraseña incorrecta'
	fi
fi
```

![Passwordbox en Dialog](/img/bash_dialogos/password_kdialog.png)

Y en Zdialog:

```sh
#!/bin/bash
pass=stallman
passwd=$(zenity --title 'Su contraseña' --password 'Introduzca su contraseña')
if [ ! -z $passwd ]; then
	if [ $pass = $passwd ]; then
		zenity --info --title 'Correcta' --text 'Contraseña correcta'
	else
		zenity --error --title 'Incorrecta' --text 'Contraseña incorrecta'
	fi
fi
```
![Passwordbox en Zenity](/img/bash_dialogos/password_zenity.png)

Este ultimo tiene un parámetro opcional que muestra un campo de nombre de usuario, *\--username*, evitando así que tengamos que usar dos diálogos para solicitar ambos datos si los necesitamos:

```sh
#!/bin/bash
usuario=torvals
pass=stallman
user=$(zenity --title 'Su contraseña' --password 'Introduzca su contraseña' --username)
if [ ! -z $user ]; then
	# Zenity devuelve ambos campos separados por |
	usu=$(echo $user | cut -d'|' -f1)
	passwd=$(echo $user | cut -d'|' -f2)
	if [ $usuario = $usu ] && [ $pass = $passwd ]; then
		zenity --info --title 'Correcta' --text 'Usuario y contraseña correcta' --ellipsize
	else
		zenity --error --title 'Incorrecta' --text 'Usuario y/o contraseña incorrecta' --ellipsize
	fi
fi
```

![Passwordbox con nombre de usuario en Zenity](/img/bash_dialogos/password_zenity_username.png)

## Cajas de texto:

Es posible que en algún momento necesitemos mostrar al usuario el contenido de un archivo de texto, por ejemplo, el resultado de una operación, un log, la licencia que usa nuestro proyecto, etc. 

```sh
dialog --title 'Lore Impsum' --textbox <archivo> 0 0; clear
```

![Textbox en Dialog](/img/bash_dialogos/textbox_dialog.png)

Siendo *&lt;archivo>* la ruta el fichero, por ejemplo:

```sh
#!/bin/bash
dialog --title 'Lore Impsum' --textbox loreipsum.txt 0 0; clear
```

Si el texto es más grande podemos movernos usando las teclas de flecha.

En Kdialog es:

```sh
#!/bin/bash
kdialog --title 'Lore Imsum' --textbox loreipsum.txt
```

![Textbox en Dialog](/img/bash_dialogos/textbox_kdialog.png)

Y por ultimo en Zenity:

```sh
#!/bin/bash
zenity --text-info --title 'Lore Ipsum' --filename loreipsum.txt
```

![Textbox en Zenity](/img/bash_dialogos/textbox_zenity.png)

Este ultimo dispone de varios parámetros opcionales, como activar soporte para **HTML** o que sea editable, pero eso es algo que dejo para más adelante.

Y esto es todo por el momento. Hasta la próxima entrega.
Espero que estos tutoriales os sean de utilidad, y podéis usar los comentarios para dejar dudas, opiniones, etc