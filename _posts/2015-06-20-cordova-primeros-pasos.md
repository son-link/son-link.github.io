---
layout: post
title:  "Apache Cordova 1: Primeros pasos"
date:   2015-06-17 18:10
categories: cordova tutoriales firefoxos android
---
# Apache Cordova 1: Primeros pasos
Binvenid@s a esta primera entrada de una serie de tutoriales sobre **Apache Cordova.**

Para los que no sepáis que es Cordova es una plataforma que nos permite crear aplicaciones para moviles multiplataforma usando teclogias web, esto es **HTML, Javascript y CSS**, lo que facilita bastante el desarrollo ya que no tendremos que aprender diversos lenguajes de programación para poder, por ejemplo, hacer una applicación para Android, que usa **Java** y para **IOs** que se hacen con **C#**.

A lo largo de este tutorial enseñare los pasos para Android y Firefox OS, si bien para este ultimo se puede programar de por si usando tecnología web, por lo que si solo quieres hacer aplicaciones para el, no necesitas este tutorial. Los pasos indicados están hechos bajo **GNU/Linux** pero son, salvo algún cambio, los mismos para Windows.

Para empezar necesitaremos lo siguiente:
* **node.js** (para instalar y usar Cordova)
* **Android SDK** y **Java 7** (para generar la app para Android)
* Cualquier editor de texto o IDE (en mi caso Geany)

## Instalación:
Empezaremos instalando lo necesario. En el caso de haber paquetes para tu distribución, instalalos desde ellos.


###Node.js
Lo primero que necesitaremos es **node.js.** Esta disponible en los repositorios de Debian, Linux Mint, Ubuntu y Archlinux, por lo que recomiendo su instalación desde ellos si en tu distribución estan disponibles. En caso contrario puedes bajar la ultima versión ya compilada desde su [pagina de descarga](https://nodejs.org/download) o descargar y compilarlo desde su código fuente.

Una vez instalado ejecutamos el siguiente comando:
`sudo npm install -g cordova`

Esto bajara e instalara Cordova con sus dependencias.

###Android SDK
Antes de nada deberemos de instalar Java 7 y su JDK si no lo tenemos instalado desde el gestor de paquetes de nuestra distribución.

Ahora procedemos a descargar el SDK de Android desde su [pagina oficial](https://developer.android.com/sdk/index.html#Other). **Android Studio** no es necesario, por lo que salvo que queramos usarlo no hace falta bajarlo junto al SDK. Si eres usuario de **Arch Linux, Manjaro** u otros derivados puedes instalar el SDK y lo que se dirá a continuación desde **AUR**.

Una vez bajado lo descomprimimos donde queramos y añadimos las rutas a las carpetas que contiene las herramientas a nuestro path. Si por ejemplo lo tenemos en /opt/android/sdk añadiremos lo siguiente en el archivo ~/.bashrc

{% highlight sh %}
export ANDROIDSDK="/opt/android-sdk"
export PATH=$PATH:/opt/android-sdk/platform-tools:/opt/android-sdk/tools
{% endhighlight %}

Ahora solo nos falta instalar lo necesario. Para ello ejecutamos el comando **Android**. En la vetana que se abre seleccionamos lo que esta marcado en la imagen
![](/img/tutorial_cordova/android_sdk.png)

##Creación y configuración de nuestra primera aplicación.
Una vez instalado lo necesario vamos a proceder a crear nuestra primera aplicación. Abrimos una terminal y ejecutamos lo siguiente:

`cordova create miprimeraapp io.minombre.primeraapp 'Mi primera app`

Repasemos cada parámetro:

* **create** indica a cordova que vamos a crear una nueva aplicación.
* El segundo parámetro es el nombre de la carpeta que contendrá el proyecto.
* El tercer parámetro es opcional. Es el identificador de la aplicación y como veréis es como un dominio de Internet.
* Y el ultimo es el nombre de la aplicación. También es opcional.

Ahora al entrar en la carpeta un archivo XML y varias carpetas:

* **hooks** :contiene varios scripts especiales para plugins o comandos especiales de Cordova.
* **platforms**: este directorio es donde se ubicaran las plataformas que vayamos añadidendo.


* **plugins**: aquí estarán los plugins de Cordova que descarguemos.
* **www**: en el es donde estarán los archivos de nuestra app.
* **config.xml**: es el archivo de configuración de nuestra app.

Ahora para añadir plataformas desde una terminal nos movemos hasta el dierctorio del proyecto y ejecutamos:
{% highlight sh %}
cordova platform add android
cordova platform add firefoxos
{% endhighlight %}

Con esto ya tenemos preparado lo básico para poder empezar a trabajar. Ahora vamos a terminar de configurar el proyecto. Para ello abrimos el acrhivo config.xml con cualquier editor de texto. Veremos algo similar a esto:

{% highlight xml %}
<?xml version='1.0' encoding='utf-8'?>
<widget id="io.minombre.primeraapp" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>Mi primera app</name>
    <description>
        A sample Apache Cordova application that responds to the deviceready event.
    </description>
    <author email="dev@cordova.apache.org" href="http://cordova.io">
        Apache Cordova Team
    </author>
    <content src="index.html" />
    <plugin name="cordova-plugin-whitelist" version="1" />
    <access origin="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <allow-intent href="tel:*" />
    <allow-intent href="sms:*" />
    <allow-intent href="mailto:*" />
    <allow-intent href="geo:*" />
    <platform name="android">
        <allow-intent href="market:*" />
    </platform>
    <platform name="ios">
        <allow-intent href="itms:*" />
        <allow-intent href="itms-apps:*" />
    </platform>
</widget>
{% endhighlight %}
Dentro del tag &lt;widget> veremos los parámetros **id** y **version** el primero es el id del proyecto que en este caso es el segundo parámetro que le pasamos al comando **cordova create** y versión es el numero de versión de nuestro programa.

Entre los tags **&lt;name>** ira el nombre de aplicación, en este caso el tercer parámetro que le pasamos al crear el proyecto.

En **&lt;description>** ira la descripción del programa.

**&lt;author>** es donde ira la información del autor de la aplicación (o del equipo de desarrollo)

**&lt;allow-intent>** en estos campos si indica a que protocolos podrá acceder la aplicación. Puedes borrar los que no necesites. En nuestro caso solo dejamos **http** y **https**

**&lt;platform>** contiene etiquetas &lt;allow-intent> especificas para cada plataforma. Podemos borrarlas sin problemas ya que nuestra app no necesita acceder a Google Play y mucho menos a la Play Store de Apple.

Ahora vamos a construir la aplicación. Para ello desde una terminal y desde el directorio de nuestra aplicación ejecutamos lo siguiente:

{% highlight sh %}
cordova build 
{% endhighlight %}
Esto construirá los paquetes para todas las plataformas que hubiesemos añadido.
Si solo queremos construir el paquete para una plataforma especifica le pasamos el nombre de esta como segundo parámetro.

Ahora para instalar la aplicación en nuestro dispositivo Android podemos hacerlo de dos modos:

* con el comando `cordova run android`
* o con `adb install /ruta/al/proyecto//platforms/android/build/outputs/apk/android-debug.apk`

Para Firefox OS nos genera un paquete en **platforms/firefoxos/build/package.zip**. Para instalarlo lo descomprimimos e instalamos a nuestro dispositivo desde el App Manager de Firefox o desde WebIDE desde Firefox Developers Edition o versiones más modernas de Firefox.

Y con esto se termina esta primera parte. En el siguiente crearemos un pequeño proyecto para irnos familiarizando con los plugins de Cordova. Hasta la próxima.