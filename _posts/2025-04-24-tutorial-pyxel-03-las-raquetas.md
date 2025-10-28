---
title: "Tutorial Pyxel 03: Añadiendo las palas"
layout: post
date: 2025-04-24T15:25:27.032Z
tags:
    - pyxel
    - python
    - juegos
    - tutorial
category: pyxel
img_dest: pyxel/03_anadiendo_las_palas.png
description: En esta tercera entrega del tutorial de Pyxel vamos a ver como añadir y mover las palas
---
## Introducción

Hola, y bienvenido/a/e a esta tercera entrega de mi tutorial de programación de juegos con **Python** y **Pyxel**.

En esta entrega vamos a añadir y hacer que se mueva una pala. Vamos a reaprovechar el código de la segunda entrega, aunque vamos a hacer varios cambios para mejorar algo el código y que este todo algo mejor organizado.

<details>
    <summary><em>Entregas</em></summary>
    <ul>
        <li>
            <a href="{% link _posts/2025-03-04-tutorial-pyxel-01-introduccion.md %}">01 - Introducción</a>
        </li>
        <li>
            <a href="{% link _posts/2025-04-15-tutorial-pyxel-02-la-pelota.md %}">02 - Moviendo la pelota</a>
        </li>
        <li>
            03 - Añadiendo las palas
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
        <li>
            <a href="{% link _posts/2025-09-18-tutorial-pyxel-07-retoques-finales-2.md %}">07 - Retoques finales (2ª parte)</a>
        </li>
        <li>
            <a href="{% link _posts/2025-10-28-tutorial-pyxel-8-distribuir-el-juego.md %}">08 - Distribuir el juego</a>
        </li>
    </ul>
</details>

## Empezando

Bien, antes de empezar a añadir las palas vamos a hacer unos cambios, que consiste en crear una clase para el juego, a la que llamaremos **Pyng**, y mover a ella las funciones draw y update, así como la variable que contiene la instancia de la clase **Ball**, y así tener el código mejor organizado y legible. Para ello vamos a coger todas estas líneas:

{% highlight python linenos %}
ball = Ball()
ball.initMove()

def draw():
    global ball
    pyxel.cls(0)
    ball.draw()

def update():
    global ball
    ball.update()

pyxel.init(SCREEN_W, SCREEN_H, 'Pyng')

pyxel.run(update, draw)

{% endhighlight %}

y vamos a meterlas dentro de la clase **Pyng**, la cual irá a continuación de **Ball**:

{% highlight python linenos %}
class Pyng:
    def __init(self):
        self.ball = Ball()
        self.ball.initMove()
        pyxel.init(SCREEN_W, SCREEN_H, 'Pyng')
        pyxel.run(self.update, self.draw)

    def draw(self):
        pyxel.cls(0)
        self.ball.draw()

    def update(self):
        self.ball.update()

Pyng()
{% endhighlight %}

La ultima linea simplemente crea una nueva instancia del juego, no es necesario guardarla en ninguna variable.

Por último vamos a comentar varias líneas donde se llaman a los métodos de Ball, ya que para esta entrega no se van a usar, además de para que la pelota no esté dando vueltas mientras probamos el código:

{% highlight python linenos %}
class Pyng:
    def __init(self):
        self.ball = Ball()
        #self.ball.initMove()
        pyxel.init(SCREEN_W, SCREEN_H, 'Pyng')
        pyxel.run(self.update, self.draw)

    def draw(self):
        pyxel.cls(0)
        #self.ball.draw()

    def update(self):
        #self.ball.update()
        pass

Pyng()
{% endhighlight %}

> En Python los comentarios de una sola línea van precedidos por una almohadilla (#), mientras que los comentarios que van a ocupar varias líneas van entre 6 comillas simples ('''Comentario''') o dobles ("""Comentario""").

## Creando la clase para las palas

Vamos a añadir la clase que contendrá el código para las palas, a la que llamaremos **Paddle** y qué irá entre **Ball** y **Pyng**:

{% highlight python linenos %}
class Paddle():
    def __init__(self, pos_x, width, height):
        self.pos_x = pos_x
        self.width = width
        self.height = height
        self.pos_y = (SCREEN_H - self.height) // 2
        self.speed = 3
        self.color = 7

    def draw(self):
        pyxel.rect(self.pos_x, self.pos_y, self.width, self.height, self.color)

    def update(self):
        pass
{% endhighlight %}

La clase Paddle requiere 3 parámetros al iniciar una nueva estancia:
* pos_x: Su posición en el eje horizontal de la ventana
* width: El ancho de la pala
* height: El alto de la pala

La variable Paddle.pos_y, que indica la posición inicial de la pala en el eje vertical, se calcula a base de restar el alto de la pantalla del alto de la pala dividido entre 2.

> En Python usar doble barra (//) para dividir hace que el resultado se redondee al número entero hacia abajo (p.e. 2.6 = 2, 3.1 = 3)

Al igual que en **Ball** añadimos un método llamado **draw()** donde irá el código encargado de dibujar en pantalla, en este caso, la pala. Para ello usaremos el método pyxel.rect(x, y, w, h, c), el cual dibuja un rectángulo en las posiciones **x** e **y**, de ancho **w**, de alto **h** y rellenado con el color **c**.

Por último añadimos el método **update**, aunque de momento no hará nada, pero así ya tenemos la estructura de la clase preparada.

## Añadiendo la pala

Ahora vamos a añadir una pala a la clase principal para dibujarla en pantalla.

Primero, en **Pyng.\_\_init\_\_()** creamos una nueva instancia de **Paddle**:

{% highlight python linenos %}
class Pyng:
    def __init(self):
        self.ball = Ball()
        #self.ball.initMove()
        self.paddle1 = Paddel(8, 8, 50)
{% endhighlight %}

En este caso nuestra pala estará separada 8 píxeles del borde izquierdo y tendrá 8 píxeles de ancho y 50 de alto. Ahora llamados al método **self.paddle1.draw** en **Pyng.update()**:

{% highlight python linenos %}
class Pyng:
    def draw(self):
        pyxel.cls(0)
        self.paddle1.draw()
        #self.ball.draw()
{% endhighlight python linenos %}

Si arrancamos el juego se debería de ver lo siguiente:

![Ventana del juego mostrando la pala del primer jugador](/img/tuto_pyxel/03_01_pala.png)

# Moviendo la pala

Ahora vamos a hacer que la pala se mueva hacia arriba y abajo. Para ello dentro de **Paddle** añadieromos un nuevo método al que llamaremos **move()** y que recibirá como parámetro (**direction**) la dirección hacia la que se moverá:

{% highlight python linenos %}
class Pyng:
    def update(self, direction):
        if direction == 'up' and self.pos_y > 0:
            self.pos_y += self.speed * -1
        elif direction == 'down' and self.pos_y + self.height < SCREEN_H:
            self.pos_y += self.speed
{% endhighlight %}

Primero se comprueba si la dirección indicada es hacia arriba y la parte superior de la pala no llego a la parte superior. Si no es así, se comprueba si la dirección indicada es hacia abajo y la posición de la pala, más su alto, es menor que el alto de la ventana. Si no se cumple ninguna de las condiciones, simplemente no se moverá.

Ahora vamos a comprobar dentro de **Pyng.update()** que tecla se pulsó. Para ello vamos a usar el método **pyxel.btn()**:

{% highlight python linenos %}
class Pyng:
    def update(self):
        #ball.update()
        if pyxel.btn(pyxel.KEY_Q):
            self.paddle1.move('up')
        elif pyxel.btn(pyxel.KEY_A):
            self.paddle1.move('down')
{% endhighlight %}

**pyxel.btn()** comprueba si la tecla o botón indicado fue pulsado, o se sigue pulsando, en este caso las teclas **Q** (**pyxel.KEY_Q**) o **A** (**pyxel.KEY_A**). Si se está pulsando la tecla **Q** llamamos al método Paddle.move() indicando que se moverá hacia arriba (**up**), y en el caso de estar pulsando la tecla **A**, indicamos lo contrario (**down**).

> Con **pyxel.btn()** no solo podemos saber qué tecla se pulsó, también si se pulsó el botón de un mando (soporta hasta 4 mandos), o del ratón. Si quieres saber más, [aquí tienes el listado](https://github.com/kitao/pyxel/blob/main/python/pyxel/__init__.pyi#L59) con todas las definiciones de las teclas, botones del ratón, mandos, etc.

Ahora arrancamos el juego y pulsamos las teclas indicadas para mover la pala:

![Moviendo la pala](/img/tuto_pyxel/03_02_moviendo_pala.gif)

## Fin

Y esto es todo por el momento. En la siguiente entrega mostraré como comprobar que la pelota colisiona con la pala y como añadir una segunda pala que será controlada por el juego.

Recuerda que el código fuente de cada entrega del tutorial lo tienes disponible en [este repositorio](https://codeberg.org/son_link/tutorial_pyxel).

Hasta pronto.

<details>
    <summary><em>Código completo</em></summary>
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
        if x_move == 'right':
            self.speed_x = self.speed
        else:
            self.speed_x = self.speed * -1

        y_move = choice(['up', 'down'])
        if y_move == 'down':
            self.speed_y = self.speed
        else:
            self.speed_y = self.speed * -1

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


class Paddle():
    def __init__(self, pos_x, width, height):
        self.pos_x = pos_x
        self.width = width
        self.height = height
        self.pos_y = (SCREEN_H - self.height) // 2
        self.speed = 3
        self.color = 7

    def draw(self):
        pyxel.rect(self.pos_x, self.pos_y, self.width, self.height, self.color)

    def move(self, direction):
        if direction == 'up' and self.pos_y > 0:
            self.pos_y += self.speed * -1
        elif direction == 'down' and self.pos_y + self.height < SCREEN_H:
            self.pos_y += self.speed


class Pyng():
    def __init__(self):

        self.ball = Ball()
        #self.ball.initMove()
        self.paddle1 = Paddle(8, 8, 50)
        pyxel.init(SCREEN_W, SCREEN_H, 'Pyng')
        pyxel.run(self.update, self.draw)

    def draw(self):
        pyxel.cls(0)
        self.paddle1.draw()
        #self.ball.draw()

    def update(self):
        #ball.update()
        if pyxel.btn(pyxel.KEY_Q):
            self.paddle1.move('up')
        elif pyxel.btn(pyxel.KEY_A):
            self.paddle1.move('down')

Pyng()
{% endhighlight %}
</detail>
