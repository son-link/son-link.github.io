---
title: 'Tutorial Pyxel 02: Moviendo la pelota'
layout: post
date: '2025-04-15 11:00:00'
tags:
- pyxel
- python
- juegos
- tutorial
category: pyxel
img_dest: pyxel/02_moviendo_la_pelota.png
description: En esta segunda entrega del tutorial de Pyxel vamos a ver como añadir y mover la pelota
---
## Introducción

Hola, y bienvenido/a/e a esta segunda entrega de mi tutorial de programación de juegos con **Python** y **Pyxel**.

En esta entrega vamos a añadir y mover la parte más importante del juego: la pelota.

Para ello vamos a crear una clase para la pelota, en la cual definiremos varias variables y métodos.

Si aún no has leído la [primera entrega]({% link _posts/2025-03-04-tutorial-pyxel-01-introduccion.md %}) te recomiendo leerla antes de seguir

## Empezando

Para empezar a programar esta segunda parte vamos a reaprovechar el código de la primera entrega.

Lo primero que vamos a hacer es añadir 2 variables constantes, las cuales irán después de la primera línea y que almacenaran el ancho y alto de la pantalla del juego:

{% highlight python linenos %}
import pyxel


SCREEN_W = 320
SCREEN_H = 280
{% endhighlight %}

> Las variables constantes en Python se definen totalmente en mayúsculas, y su valor no puede ser cambiado. Además, a lo largo de este tutorial usaremos varias constantes de Pyxel.

Ahora vamos a reemplazar la línea donde se llama al método init() de Pyxel

```python
pyxel.init(128, 128)
```

por lo siguiente:


```python
pyxel.init(SCREEN_W, SCREEN_H, 'Pyng')
```

Hemos reemplazado los 2 primeros parámetros, ancho y alto respectivamente, por las variables contantes, además, le hemos pasado un tercer parámetro, que es el título que se mostrara en la ventana del juego. init() tiene más parámetros, algunos de los cuales iré enseñando en próximas entregas.

Vamos a crear la clase Ball, la cual añadiremos a continuación de definir las 2 constantes:
{% highlight python linenos %}
SCREEN_W = 320
SCREEN_H = 280

class Ball():
    def __init__(self):
        self.pos_x = (SCREEN_W - 4) // 2
        self.pos_y = (SCREEN_H - 4) // 2
        self.speed_x = 0
        self.speed_y = 0
        self.speed = 6
        self.radius = 8
        self.color = 7
{% endhighlight %}

En Python una clase se define usando la palabra clave **class** seguido del nombre, siendo una buena práctica que el nombre empiece por mayúscula, y si tiene más palabras, también ellas empiecen por mayúsculas, sin ningún carácter separador (esto se conoce como **UpperCamelCase** o **PascalCase**)

**\_\_init\_\_** es un método especial de Python, ya que es el iniciador de la clase, por lo que es en ella donde iniciaremos los atributos de la clase, principalmente las variables, que usaremos en ella. El único parámetro obligatorio es **self**, que hace referencia a la propia clase, y de hecho es el que tendremos que definir en todos los métodos.
    * self.pos_x y self.pos_y: La posición del centro de la pelota en la ventana, que por defecto estará en el centro.
    * self.speed_x y self.speed_y: En ellas se almacenan la velocidad en los ejes horizontal y vertical respectivamente.
    * self.speed: Aquí definimos la velocidad de la pelota, y la que luego se usara para cambiar los valores de las variables anteriores.
    * self.radius: El radio de la pelota, en este caso 8 píxeles.
    * self.color: El color de la pelota, en este caso el blanco

Ahora vamos a añadir a la clase un método llamado **draw**, donde irá el código encargado de dibujar la pelota:

{% highlight python linenos %}
def draw(self):
    pyxel.circ(self.pos_x, self.pos_y, self.radius, self.color)

{% endhighlight %}

**pyxel.circ(x, y, radius, color)**: Este método de Pyxel dibuja en pantalla un círculo en las coordenadas x e y, con el radio y color indicados (en este orden)

Con la clase Ball ya añadida vamos a crear una instancia de la clase y dibujar en la ventana la pelota.

Vamos a crear una instancia de Ball para añadirla al juego. Añadimos lo siguiente tras las líneas de la clase Ball:

```python
ball = Ball()
```

Y reemplazamos la función draw:

{% highlight python linenos %}
def draw():
    pyxel.text(8, 8, "Hola Pyxel", 7)
{% endhighlight %}

por lo siguiente:

{% highlight python linenos %}

def draw():
    global ball
    pyxel.cls(0)
    ball.draw()
{% endhighlight %}

<details>
    <summary><em>Ver cómo quedaría el código</em></summary>
    {% highlight python linenos %}

import pyxel
from random import choice


SCREEN_W = 320
SCREEN_H = 240


class Ball():
    def __init__(self):
        self.pos_x = (SCREEN_W - 2) // 2
        self.pos_y = (SCREEN_H - 2) // 2
        self.speed_x = 0
        self.speed_y = 0
        self.speed = 4
        self.radius = 4
        self.color = 7

    def draw(self):
        pyxel.circ(self.pos_x, self.pos_y, self.radius, self.color)


ball = Ball()


def draw():
    global ball
    pyxel.cls(0)
    ball.draw()

def update():
    pass

pyxel.init(SCREEN_W, SCREEN_H, 'Pyng')

pyxel.run(update, draw)

{% endhighlight %}
</details>

La primera línea índica que vamos a usar una variable global, que es la que contiene la instancia de la clase Ball. En la siguiente vamos a ejecutar el método de Pyxel **cls()**, que se encarga de limpiar la pantalla rellenándola con el color indicado (en este caso el negro). Esto es necesario hacerlo, ya que, de lo contrario, cada vez que se dibuje y un elemento se mueva, dejara un rastro por la ventana. Por último llamamos al método **draw()** de nuestra clase. El resultado es el siguiente:


![Ventana del juego con la pelota en el medio](/img/tuto_pyxel/02_2_bola.png)

## Moviendo la pelota

Ahora vamos a hacer que la pelota se mueva por la ventana. Lo primero que vamos a hacer es importar la función **choice** del módulo **random** de Python, por lo que añadimos lo siguiente tras `import pyxel`:

```python
from random import choice
```

Esta función lo que hace es devolver un elemento aleatorio de una lista de elementos.

Ahora vamos a añadir a la clase Ball un nuevo método, **initDraw()**, el cual iniciara el movimiento de la pelota en una dirección aleatoria:

{% highlight python linenos %}
def initMove(self):
    x_move = choice(['left', 'right'])
    if x_move == 'right':
        self.speed_x = self.speed
    else:
        self.speed_x = self.speed * -1

    y_move = choice(['up', 'down'])
    if y_move == 'down':
        self.speed_y = self.speed
    else:
        self.speed_y = self.speed * -1
{% endhighlight %}

Primero con la función **choice** obtenemos de manera aleatoria si la pelota irá hacia la izquierda o hacia la derecha. En la segunda comprobamos en que dirección va a ir. Si va hacia la derecha, el valor de la velocidad en el eje horizontal será la especificada en la variable **self.speed**, en caso contrario, su valor pasará a ser negativo. Esto mismo hacemos con el eje vertical, siendo positivo que irá hacia abajo, y negativo que irá hacia arriba.

> En Python es posible usar una versión corta de la sentencia **if** cuando se va a usar para asignar un valor a una variable, pero uso la versión normal para que se entienda mejor. Más adelante enseñaré como usar la versión corta.

Ahora vamos a hacer que la pelota se mueva. Para ello vamos a añadir un segundo método a la clase Ball, **update()**:

{% highlight python linenos %}
def update(self)
    self.pos_x += self.speed_x
    self.pos_y += self.speed_y
{% endhighlight %}


Ahora, justo a continuación de donde iniciamos la variable ball, añadimos la siguiente línea:

```python
ball.initMove()
```

y reemplazamos el código de la función update():
{% highlight python linenos %}
def update:
    pass
{% endhighlight %}

por el siguiente:

{% highlight python linenos %}
def update():
    global ball
    ball.update()
{% endhighlight %}

Y veremos algo así:

![Imagen GIF que muestra el movimiento de la pelota](/img/tuto_pyxel/02_3_mover_pelota.gif)

Ahora tenemos un problema, y es que la pelota se sale de la ventana y de manera infinita, así que vamos a solucionarlo. Para ello, vamos a añadir el siguiente código en el método Ball.update():

{% highlight python linenos %}
if self.pos_y - self.speed <= 0:
    self.speed_y = self.speed
elif self.pos_y + self.speed >= SCREEN_H:
    self.speed_y = self.speed * -1
{% endhighlight %}

En este caso vamos a comprobar si la pelota choca con el borde superior o inferior.

Sí la posición de la pelota, menos la velocidad, es menor o igual a cero, ha chocado con el borde superior, por lo que hacemos que la pelota empiece a ir hacia abajo, pero si la posición de la pelota más la velocidad es igual o mayor que el alto de la ventana, la pelota empanzara a ir hacia arriba.

Ahora vamos a añadir lo mismo, pero para comprobar si choca contra el borde derecho o izquierdo:

{% highlight python linenos %}
if self.pos_x - self.speed <= 0:
    self.speed_x = self.speed
elif self.pos_x + self.speed >= SCREEN_W:
    self.speed_x = self.speed * -1
{% endhighlight %}

Si ejecutamos el juego, ahora la pelota rebotará tras cada colisión con los bordes:

<details>
    <summary><em>Ver cómo quedaría el código</em></summary>
    {% highlight python linenos %}

import pyxel
from random import choice


SCREEN_W = 320
SCREEN_H = 240


class Ball():
    def __init__(self):
        self.pos_x = (SCREEN_W - 2) // 2
        self.pos_y = (SCREEN_H - 2) // 2
        self.speed_x = 0
        self.speed_y = 0
        self.speed = 4
        self.radius = 4
        self.color = 7

    def initMove(self):
        # Inicia el movimiento de la pelota en una dirección aleatoria
        x_move = choice(['left', 'right'])
        self.speed_x = self.speed if x_move == 'right' else self.speed * -1

        y_move = choice(['up', 'down'])
        self.speed_y = self.speed if y_move == 'down' else self.speed * -1

    def draw(self):
        pyxel.circ(self.pos_x, self.pos_y, self.radius, self.color)

    def update(self):
        # Comprobamos si la bola choca contra la parte superior o inferior de la pantalla
        if self.pos_y - self.speed <= 0:
            self.speed_y = self.speed
        elif self.pos_y + self.speed >= SCREEN_H:
            self.speed_y = self.speed * -1

        # Y aquí si choca contra la parte izquierda y derecha
        if self.pos_x - self.speed <= 0:
            self.speed_x = self.speed
        elif self.pos_x + self.speed >= SCREEN_W:
            self.speed_x = self.speed * -1

        # Y finalmente movemos la bola
        self.pos_x += self.speed_x
        self.pos_y += self.speed_y


ball = Ball()


def draw():
    global ball
    pyxel.cls(0)
    ball.draw()

def update():
    global ball
    ball.update()

    if (pyxel.btn(pyxel.KEY_SPACE)):
        ball.initMove()

pyxel.init(SCREEN_W, SCREEN_H, 'Pyng')

pyxel.run(update, draw)

{% endhighlight %}
</details>

![](/img/tuto_pyxel/02_4_pelota_revotando.gif)

Y esto es todo por el momento. En la siguiente entrega vamos a añadir las raquetas.

Recuerda que el código fuente lo tienes disponible en [este repositorio](https://codeberg.org/son_link/tutorial_pyxel)

Hasta la proxima entrega.

> Agradecimientos a [Rafa Lagoon](https://mastodon.gamedev.place/@rafalagoon) por darme consejos e ideas para mejorar esta nueva entrega.