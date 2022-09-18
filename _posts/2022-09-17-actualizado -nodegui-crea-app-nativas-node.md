---
title: 'NodeGUI: crea aplicaciones nativas con Node.js y QT5 (actualizado)'
layout: post
date: '2022-09-17'
tags:
- node
- nodegui
- javascript
- tutorial
category: nodegui
img_dest: nodegui.png
description: NodeGUI es un modulo para Node.js con la cual podemos crear interfaces gráficas nativas y eficientes gracias a QT5
---

> Este es una actualización de un tutorial que publique hace un par de años y que se encuentra [aquí](nodegui/2020/05/04/nodegui-crea-aplicaciones-nativas-node.html)

Si queremos desarrollar una aplicación con **Javascript** y **Node.js** y que esta tenga una interfaz gráfica, la solución más rápida es usar módulos basados en **Chromium**, como **Electron** y **NW.js**, pero estas soluciones son pesadas y con gran consumo de CPU y RAM.

**NodeGUI** esta construido sobre el framework para el desarrollo de interfaces gráficas y multiplataforma **Qt5** y esta disponible para Windows, Linux (especialmente si usas los escritorios KDE y LXQt) y Mac (por el momento no esta disponible para equipos con procesadores **M1**), gracias al cual conseguimos aplicaciones que trabajan de manera nativa y con un consumo más eficiente de los recursos. Podemos dar estilos a través de **CSS** y tenemos 2 sabores: **nodegui**, si vamos a trabajar usando **Javascript puro** o **Typescript**, y **react-nodegui** si queremos desarrollar mediante el framework **React** (también hay versiones para desarrollar con **VUE** y **Svelte**, pero ambos proyectos llevan algún tiempo parados).

Por otro lado NodeGUI no usa, estrictamente hablando, Node.js, sino un fork propio del proyecto, [Qode](https://github.com/nodegui/qodejs), con ligeras modificaciones, como el poder usar bucles de eventos, el cual se instala como un modulo de Node más, por lo que no es obligatorio instalarlo por separado.

Como el movimiento se muestra andando, vamos a ir creando un programa sencillo con el cual vamos a mostrar las entradas de un subreddit, el cual introducirá el usuario en un campo, así como poder elegir el orden en el que se mostraran: **Destacando** (por defecto), **Nuevos** y **Más votados**. 

Al final obtendremos algo como esto:

![Vista del proyecto](/img/tuto_nodegui_2/01.png)

Lo primero, y antes de todo, vamos a instalar tanto Node como **npm**, su gestor de paquetes. Si usas **GNU/Linux** esto es tan fácil como instalarlo desde los repositorios. Ademas también necesitaremos tener instalado GCC, Cmake y make, necesarios para compilar NodeGUI.



* Debian, Ubuntu y derivadas: `apt-get install pkg-config build-essential cmake node npm`
* Arch Linux y derivadas: `pacman -S gcc make cmake nodejs-lts-gallium npm`

Para **Windows** y **Mac** tenéis las instrucciones en [la página de documentación de NodeGUI](https://docs.nodegui.org/docs/guides/getting-started/#developer-environment). 

> **Nota:** Es necesario que la versión que tengamos instalada de Node sea de la misma versión mayor que Qode ya que de lo contrario nos encontraremos con módulos incompatibles, como el propio Qode que, a la hora de actualizar este tutorial, se basa en Node 16.x, que es la actual LTS (Long Time Support).	Por eso en Arch instalaremos dicha versión a traves del paquete nodejs-lts-gallium

### Empezando a crear nuestra aplicación:

NodeGUI tiene dos repositorios con los cuales podemos empezar a crear nuestros proyectos, pero en este caso vamos a ir creando uno desde cero, así de paso mostrare como iniciar un proyecto de Node.js para aquell@s que queréis empezar.

Abre una terminal (En Windows te recomiendo que uses la de Node, que es el de Windows, pero que añade una serie de variables para que funcione correctamente) y muévete hasta la carpeta que contendrá la del proyecto usando el siguiente comando:

```sh
cd <ruta>
```

Una vez en ella vamos a iniciar el proyecto. Para ello escribe lo siguiente en la terminal:

```bash
npm init
```

Nos ira preguntando varias cosas:

* package name: el nombre del paquete. Solo puede contener letras minúsculas, números, puntos, guiones y subrayados.
* version: la versión del paquete. Por defecto es 1.0.0. Déjalo así o pon otro. Por ejemplo yo empiezo siempre con 0.1.0 o 0.0.1
* description: Una breve descripción del paquete.
* entry point: Este paso es importante. Con el se indica cual sera el fichero inicial, o sea, el que se leerá en cuanto se vaya a ejecutar. En este caso vamos a poner src/index.js para así tenerlo un poco organizado.
* test command: Este es el comando que se ejecutara para hacer pruebas del paquete con el comando `npm test`. En este caso vamos a poner `qode --inspect src/index.js`
* git repository: la url al repositorio GIT del proyecto. Lo dejamos en blanco por el momento.
* keywords: las palabras clave de nuestro paquete. Esto por el momento lo vamos a dejar en blanco. Esto sirve para cuando lo vayamos a subir a [npmjs](https://www.npmjs.com/), el principal repositorio de paquetes para node.js, seá más fácil encontrarlo.
* author: El nombre del autor, en este caso, el tuyo.
* license: La licencia del paquete. Por defecto es [ISC](https://opensource.org/licenses/ISC). Vamos a dejarlo tal cual de momento.

Y ahora nos mostrara los datos introducidos, si esta todo correcto pulsamos Enter y ya tenemos el proyecto listo para empezar a trabajar con el.

#### Instalación de los paquetes necesarios:

Para seguir con esta introducción vamos a necesitar instalar 2 paquetes: el de nodegui y [rss-parser](https://github.com/rbren/rss-parser), siendo este el que usaremos para comunicarnos obtener las entradas. Para ello abre una terminal, muévete hasta el directorio del proyecto y ejecutamos los siguientes para instalar los paquetes necesarios:

```bash
export QT_INSTALL_DIR=/usr/lib/qt/
npm i @nodegui/nodegui rss-parser
```

> La primera linea es necesaria si tienes instalado Qt en tu sistema, sobre todo si usas LXQT o KDE, ya que de lo contrario bajara una versión mínima de QT y, por ejemplo, la aplicación no cogerán el tema que estés usando.

> También es posible usar la versión de desarrollo, ideal si quieres ir probando novedades antes del lanzamiento de nuevas estables mediante el comando `npm i http://master-release.nodegui.org`

#### Empezando a escribir nuestra aplicación

Lo primero es crear el fichero principal. Para ello dentro de la carpeta del proyecto creamos el directorio */src* y dentro de el creamos el fichero *index.js*, tal y como indicamos a la hora de crear el proyecto. Si pusiste otro nombre y/o ruta simplemente créalos con esos nombres.

Abrimos el fichero y lo primero que vamos a hacer es importar los módulos necesarios para este tutorial (los cuales iré explicando según los vayamos usando), ademas de definir un array (*feeds*) donde iremos almacenando el contenido de cada entrada obtenida:

```js
const {
  ButtonRole,
  QBoxLayout,
  QComboBox,
  QIcon,
	QMainWindow,
	QLabel,
  QLineEdit,
	QListWidget,
	QListWidgetItem,
  QMessageBox,
  QPushButton,
  QTextBrowser,
  QVariant,
	QWidget
} = require('@nodegui/nodegui');

// Este es el modulo que usaremos para obtener y parsear el feed.
const Parser = require('rss-parser');
const parser = new Parser();
let feeds = [];
```

Vamos a crear la parte más básica del proyecto, la ventana principal:

```js
const win = new QMainWindow();
win.setMinimumSize(640, 480);
win.setWindowTitle("Reddit Feed Reader");
```

**QMainWindow** es la clase para crear la ventana principal del programa. Con la primera linea creamos una nueva instancia de la clase, con la segunda indicamos cual es su tamaño mínimo y con la tercera indicamos cual sera el titulo de dicha ventana.

Ahora vamos a añadir un icono a la ventana

```js
const winIcon = new QIcon(__dirname + '/reddit.svg');
win.setWindowIcon(winIcon);
```

**__dirname** es una variable especial donde se almacena la ruta al fichero actual, a la que concatenamos la ruta hasta el icono.

Ahora vamos a definir el widget que central, el cual contendrá el resto de elementos:

```js
const centralWidget = new QWidget();
const rootLayout = new QBoxLayout(2);
centralWidget.setLayout(rootLayout);
win.setCentralWidget(centralWidget);
```

La primera linea crea una nueva instancia de la clase **QWidget**, que es la de los widgets. Un widget es un objeto que representa a cada elemento que vayamos añadiendo. Una lista, un campo de texto, o un menú, son clases derivadas de QWidget. Piensa en ellos como elementos HTML.

La segunda crea una nueva instancia de uno de los tipos de disposición disponibles, en este caso una caja (como un &lt;div> por ejemplo). Los otros son la flexible (FlexBox) y la cuadricula (QGridLayout). Son en estos en donde se irán añadiendo el resto de elementos. El **2** indica que los elementos se irán colocando desde arriba hacía abajo.

Con la siguiente indicamos que la disposición del widget central sera el que hemos puesto en la linea anterior y con la siguiente establecemos el widget central como tal.

Ahora vamos a ir añadiendo los elementos. Vamos con el primero:

```js
const hbox1 = new QWidget();
const hbox1_layout = new QBoxLayout(0);
hbox1.setLayout(hbox1_layout);
rootLayout.addWidget(hbox1);
```

Hemos creado un nuevo widget con otra disposición, pero esta vez los elementos irán de izquierda a derecha. En esta es donde iremos añadiendo un etiqueta de texto, el campo para introducir un texto, el selector y el botón. La ultima linea lo añade a la disposición central.

```js
const label1 = new QLabel();
label1.setText('Introduce el subreddit:');
hbox1_layout.addWidget(label1);

const subreddit = new QLineEdit();
hbox1_layout.addWidget(subreddit);

const cb_orden = new QComboBox();
cb_orden.addItem(null, 'Destacando');
cb_orden.addItem(null, 'Nuevo', new QVariant('new'));
cb_orden.addItem(null, 'Más votados', new QVariant('top'));
hbox1_layout.addWidget(cb_orden);

const btn_leer = new QPushButton();
btn_leer.setText('Leer');
hbox1_layout.addWidget(btn_leer);
```

**QLabel** es la clase para añadir etiquetas. En la siguiente linea insertamos el texto, pero a un label podemos añadir algunas etiquetas HTML 4 y/o imágenes. La tercera es la que añade este elemento a la caja horizontal.

**QLineEdit** es la clase para añadir un campo donde el usuario puede introducir texto, el equivalente a &lt;input type="text" /> de HTML.

**QComboBox** Es la clase para añadir selectores, similar a la etiqueta &lt;select>. Las siguientes lineas añaden elementos al selector, que son el equivalente a la etiqueta &lt;option>. **QVariant** nos permite añadir datos dentro de cada opción, similar a la propiedad **value** de la etiqueta &lt;option>

Y **QPushButton** es la clase para añadir un botón. Más adelante veremos como se hace para que haga algo al pulsarlo.

Ahora vamos a añadir el widget para el listado de entradas:

```js
const lista_feeds = new QListWidget();
rootLayout.addWidget(lista_feeds);
```

Más adelante veremos como añadir elementos a esta lista, que sera cuando obtengamos las entradas desde Reddit.

Y ahora vamos a añadir el widget donde se mostrara el contenido de la entrada que seleccionemos en el listado:

```js
const leer = new QTextBrowser();
leer.setOpenExternalLinks(true);
rootLayout.addWidget(leer);
```

**QTextBrowser** es la clase para añadir un navegador de texto, en cierto modo es como un QLabel, solo que este admite más etiquetas HTML, si bien quiero poner énfasis en esto, y es que no carga imágenes externas, por lo que, incluso en este caso, veremos un icono donde debería de haber una imagen. Podría haber implementado algo, pero se aleja de hacer una aplicación sencilla para este tutorial.

```js
const messageBox = new QMessageBox();
messageBox.setWindowTitle('¡Error!');
messageBox.setModal(true);
const accept = new QPushButton();
accept.setText('Aceptar');
messageBox.addButton(accept, ButtonRole.AcceptRole);
```

**QMessageBox** es la clase que nos permite mostrar un dialogo, pero hay otros diálogos que podemos usar en nuestra aplicaciones.

Con la tercera linea indicamos que el dialogo es un modal y con las siguientes añadimos un botón, el cual ademas tendrá asignado un rol, que es el de Aceptar. En este ejemplo solo nos sirve para que al pulsarlo se cierre.

Y vamos a mostrar la ventana de nuestra aplicación:

```js
win.show();
global.win = win;
```

La ultima linea, es según la documentación, para que no vaya acumulando basura cuando se cierre la aplicación.

Si ahora ejecutamos el programa con `npm test` nos mostrara la ventana y todos los elementos añadidos, pero aun falta implementar las funciones que se encargaran de obtener las entradas y mostrarlas. Vamos con lo primero, que es obtener las entradas. En el código he puesto comentarios para que sea más fácil de leer.

```js
// Esta es la función encargada de obtener las entradas, generar el listado de ellas y guarda el contenido en el array.
const obtener_entradas = (async () => {

  // Vaciamos el array que contiene las entradas, así como el listado de entradas
  // y el navegador de texto
  feeds = []; 
  lista_feeds.clear();
  leer.clear();
  sr = subreddit.text(); // Obtenemos el subreddit que se escribió en el campo.
  sr = sr.trim(); // Eliminamos cualquier espacio antes y después del texto
  if (!sr) return; // Si el campo de texto esta vació, simplemente salimos de la función.

  try {
    // Removemos la escucha al evento cuando se selecciona una entrada de la lista
    // ya que de no hacerlo al limpiar el listado dará error
    lista_feeds.removeEventListener('currentItemChanged');

    // Obtenemos el indice del orden seleccionado y obtener su valor
    const index = cb_orden.currentIndex();
    const orden = cb_orden.itemData(index).toString();

    // Empezamos a definir la URL del feed
    let url = `https://www.reddit.com/r/${sr}/`;

    // Si se selecciono Nuevos o Más Votados añadimos ese orden a la URL.
    // Destacando es el orden por defecto.
    if (orden) url += `${orden}/`;

    // Procedemos a obtener el feed
    let feed = await parser.parseURL(`${url}.rss`);

    // Si se obtuvo correctamente y hay datos, procedemos a rellenar el listado
    // así como el array con el contenido de cada entrada.
    if (feed.items.length > 0) {
      feed.items.forEach(item => {
        l_item = new QListWidgetItem();
        l_item.setText(item.title);
        lista_feeds.addItem(l_item);
        feeds.push(item.content);
      });

      // Volvemos a activar la escucha del evento al seleccionar una entrada
      lista_feeds.addEventListener('currentItemChanged', itemSelected);
    } else {
      // Si no es así cambiamos el texto de la alerta y la mostramos
      messageBox.setText('El subreddit no existe o no hay entradas.');
      messageBox.exec();
    }
  } catch (error) {
    console.error(error);
    messageBox.setText('Ocurrió un error al obtener el feed.');
    messageBox.exec();
  }
});
```

Lo más destacado sea que esta es una función asíncrona, lo que evita que el programa se quede congelado y la sensación de que esta fallando.

Lo más destacado de esta función son las llamadas a las funciones **addEventListener** y **removeEventListener**. La primera función lo que hace es indicar que cuando sobre el elemento se produce el evento, en este caso cuando se cambia el elemento seleccionado del listado de las entradas (**currentItemChanged**), sea al hacer click sobre uno o al moverse con el teclado por el. La segunda función lo que hace es remover la escucha a dicho evento. Hacemos eso ya que de lo contrario, al vaciarse el listado, se produce un error.

Ahora vamos a conectar la función con el botón Leer a traves del evento **clicked**:

```js
btn_leer.addEventListener('clicked', obtener_entradas);
```

Y ya vamos a finalizar con la que ira mostrando el contenido de la entrada:

```js
// Esta función es a la que se llama cuando pulsamos un item
// en la lista de entradas.
const itemSelected = () => {
  leer.clear();
  row = lista_feeds.currentRow();
  leer.insertHtml(feeds[row]);
}
```

Primero limpiamos el widget donde se mostrara el contenido, con el segundo obtenemos el indice seleccionado y en la ultima añadimos el contenido al widget.

Y esto es todo el código, ahora vuelve a ejecutar el programa y probar a obtener los feeds.

Este ejemplo es algo sencillo, pero te puede valer para ir experimentado, por ejemplo, que guarde un listado de subreddits e ir seleccionado el que quieres leer, que vaya guardando las entradas como si fuese un lector de feeds, etc.

Podéis encontrar el código del ejemplo [en este repositorio](https://github.com/son-link/nodegui-tuto-reddit-feed)

Nos leemos.