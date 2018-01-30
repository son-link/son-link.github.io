---
layout: post
title: Montando un mini servidor local en GNU/Linux
tags:
- servidores
- php
- lighttpd
- mysql
- mariadb
date: 2015-08-25
img_dest: miniserver.png
category: tutoriales
---

En esta ocasión os voy a enseñar como montar un pequeño servidor local, ideal para probar Joomla, Wordpress, etc. Los pasos indicados son para **Arch Linux** pero, salvo las rutas y la manera de instalación, son validos para otras distribuciones, incluso para Windows.

Para ello instalaremos el servidor **Lighttpd**, un servidor ligero y funcional y usado en paginas como la **Wikipedia** y **Youtube**, el interprete de **PHP**, un lenguaje de programación para servidores, y la base de datos **MariaDB**, pero que puede cambiarse por **MySQL** si se quiere, eso ya es al gusto de cada uno.

Para instalar lo necesario abrimos la terminal y ejecutamos:
```sh
pacman -S lighttpd mariadb mariadb-clients php-cgi
```

### Configurando Lightppd:
Lighttpd una vez instalado esta listo para usarse, pero sera necesario añadir un nuevo archivo de configuración para habilitar el soporte de PHP. Ademas añadiremos otro, este opcional, para habilitar los directorios de usuario, así cada usuario que necesite usar el servidor podrá hacerlo creando una carpeta con un determinado nombre.

**PHP**
Para ello creamos el archivo `/etc/lightppd/conf.d/php.conf` (en otras distribuciones la ruta a la carpeta de configuración puede variar) e insertamos lo siguiente:

```ini
# Make sure to install php and php-cgi. See:
# https://wiki.archlinux.org/index.php/Fastcgi_and_lighttpd#PHP

server.modules += ("mod_fastcgi")

# FCGI server
# ===========
#
# Configure a FastCGI server which handles PHP requests.
#
index-file.names += ("index.php")
fastcgi.server = (
    # Load-balance requests for this path...
    ".php" => (
        # ... among the following FastCGI servers. The string naming each
        # server is just a label used in the logs to identify the server.
        "localhost" => (
            "bin-path" => "/usr/bin/php-cgi",
            "socket" => "/tmp/php-fastcgi.sock",
            # breaks SCRIPT_FILENAME in a way that PHP can extract PATH_INFO
            # from it
            "broken-scriptfilename" => "enable",
            # Launch (max-procs + (max-procs * PHP_FCGI_CHILDREN)) procs, where
            # max-procs are "watchers" and the rest are "workers". See:
            # https://redmine.lighttpd.net/projects/1/wiki/frequentlyaskedquestions#How-many-php-CGI-processes-will-lighttpd-spawn
            "max-procs" => 4, # default value
            "bin-environment" => (
                "PHP_FCGI_CHILDREN" => "1" # default value
            )
        )
    )
)
```

Ahora abrimos el fichero `/etc/lighttpd/lighttpd.conf` y al final de el añadimos la siguiente linea: `include "conf.d/php.conf"`

Para habilitar las carpetas de usuario creamos, en la misma carpeta que php.conf otro llamado, por ejemplo, userdir.conf y añadimos estas lineas:

```ini
server.modules += ("mod_userdir")
userdir.path = "public_html"
```
Y como antes añadimos al final de /etc/lighttpd/lighttpd.conf la siguiente linea: `include "conf.d/userdir.conf"`

La primera linea habilita el mod y en la segunda indicamos el nombre de la carpeta. Ahora cada usuario que quiera solo tendrá que crear dicha carpeta en la raiz de su home.

Ahora podemos comprobar que funcione correctamente el servidor, para ello ejecutamos como súper usuario el siguiente comando: `lighttpd -f /etc/lighttpd/lighttpd.conf` y si no hay ningún problema abrimos nuestro navegador y e introducimos la url **localhost**. Si habilitamos la de usuario la url es la siguiente `localhost/~usuario` cambiando **usuario** por el nombre del usuario que corresponda. Si ya todo va cerramos el servidor y ejecutamos `sudo systemcontrol enable lighttpd` para habilitarlo en el arranque y `sudo systemcontrol start lighttpd` para arrancarlo. Para comprobar que funciona PHP creamos en la carpeta del servidor un archivo al que llamaremos info.php:

```php
<?
phpinfo();
?>
```
Si sale bien tendremos algo similar a esto:

### MariaDB
Lo primero es crear las tablas de configuración por defecto del servidor de base de datos. Para ello nos bastara con ejecutar `mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql`

Una vez que termine podemos habilitar y arrancar el servicio con `sudo systemcontrol enable mysqld` y `sudo systemcontrol start mysqld`

**Nota:** No es que me haya equivocado al escribir los comandos, simplemente los ejecutables de MariaDB son los mismos, de hecho las extensiones de MySQL de PHP funcionan con MariaDB.

Y con esto ya tenemos todo. Y en parte por petición de unos compañeros de curso os dejo un zip que Lighttpd para **Windows** (funciona en XP, 7 y 8.1). Solo tenéis que descomprimirlo y ejecutar **atart-server.bat** para arrancarlo y **stop-server.bat** para finalizar los procesos. Es necesario bajar e instalar MariaDB o mySQL por separado. [Descargar Lighttpd para Windows](https://www.dropbox.com/s/vimfcshgepi9g6h/LightTPD.zip?dl=0)

## Enlaces

* [Lighttpd](http://www.lighttpd.net)
* [MariaDB](https://mariadb.org)
* [Entrada en la Wiki de Arch Linux](https://wiki.archlinux.org/index.php/Lighttpd) (De donde aprendí lo aquí expuesto. Lectura recomendada)
* [Imagen destacada sacada de la Wikipedia](https://blog.wikimedia.org/2012/09/18/server-decommissioning-donations-sept2012/)