---
title: "Tutorial Pyxel 5: Puntuación y reseteo"
description: En esta quinta entrega del tutorial de Pyxel vamos a ver como añadir la puntuación, así como que tras cada punto las palas y bola vuelvan a su posición inicial
date: 2025-06-10T13:39:24.051Z
tags:
    - pyxel
    - python
    - juegos
    - tutorial
layout: post
category: pyxel
img_dest: pyxel/05_puntuacion_reseteo.png
---
## Introducción

Hola, y bienvenido/a/e a esta quinta entrega de mi tutorial de programación de juegos con **Python** y **Pyxel**.

En esta entrega vamos a añadir el sistema de puntuación del juego, así como que, tras puntuar, la bola y palas vuelvan a su posición de inicio a la espera de iniciar la nueva partida 

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
    </ul>
</details>

## Empezando

Lo primero que vamos a hacer es añadir 2 nuevas variables constantes al juego, y que representaran dos estados del juego: **STATE_INIT** (estado por defecto y tras puntuar) y **STATE_PLAYING** (jugando)

Para ello, añadimos las siguientes líneas tras **SCREEN_W** y **SCREEN_H**:

```python
STATE_INIT = 1 # Inicio del juego y cuando se ha marcado un punto
STATE_PLAYING = 2 # Jugando
```

> El motivo de usar variables constantes para los diversos estados del juego es que, si en algún momento queremos cambiar sus valores, o añadir nuevos valores, no tenemos que estar cambiando todas las líneas que comparen, o asignen, dicho valor, además de que son más fáciles de recordar, mejora la legibilidad del código, y evitar errores en el futuro por equivocarnos de valor en algún momento.

## Reseteando posiciones

Ahora vamos ha añadir tanto a **Ball** como **Paddle** un método al que llamaremos **reset** y que en ambos casos reseteara a la posición inicial la bola y las palas, y qué irá al final de cada clase.

Empecemos por **Paddle**. Primero vamos a añadir el nuevo método:

{% highlight python linenos %}
class Paddle():
    def reset(self):
        self.pos_y = (SCREEN_H - self.height) // 2
        self.center = self.pos_y + (self.height // 2)
{% endhighlight %}

Como vemos hace lo mismo que cuando creamos una nueva estancia de la clase, que es, primero posicionar la pala en el centro del eje vertical, y luego guardar la posición del centro de la pala.

Ahora vamos a hacer lo mismo en **Ball**:

{% highlight python linenos %}
class Ball():
   def reset(self):
        self.pos_x = (SCREEN_W - 4) // 2
        self.pos_y = (SCREEN_H - 4) // 2
        self.speed_x = 0
        self.speed_y = 0
{% endhighlight %}

En este caso también reiniciamos la velocidad de la bola en ambos ejes.

## Detectando cuando se puntúa

Ahora vamos a detectar cuando la bola se sale de la pantalla por la izquierda o la derecha, que es cuando el jugador contrario gana un punto.

Lo primero que vamos a hacer es eliminar las siguientes líneas que están en **Ball.update()** y que hacen que cambie su dirección cuando choca con los bordes derecho e izquierdo:

{% highlight python linenos %}
if self.pos_x - 6 <= 0:
    self.speed_x = self.speed
elif self.pos_x + 6 >= SCREEN_W:
    self.speed_x = self.speed * -1
{% endhighlight %}

Ahora en **Pyng.__init()** vamos a añadir una nueva propiedad, **state**, que es donde iremos almacenando los estados del juego:

```python
self.state = STATE_INIT
```

Ahora vamos a reemplazar el código del método **Pyng.update()** por lo siguiente:

{% highlight python linenos %}
class Pyng():
    def update(self):
        if self.state == STATE_PLAYING:
            if pyxel.btn(pyxel.KEY_Q):
                self.paddle1.move('up')
            elif pyxel.btn(pyxel.KEY_A):
                self.paddle1.move('down')
            else:
                self.paddle1.move(None)

            if self.paddle1.checkCollide(self.ball):
                self.ball.changeDir('right')

            if self.paddle2.checkCollide(self.ball):
                self.ball.changeDir('left')

            if self.ball.pos_y < self.paddle2.center:
                self.paddle2.move('up')
            elif self.ball.pos_y > self.paddle2.center:
                self.paddle2.move('down')

            if self.ball.pos_x + (self.ball.radius * 2) <= 0:
                self.p2_score += 1
                self.state = STATE_INIT
            elif self.ball.pos_x >= SCREEN_W:
                self.p1_score += 1
                self.state = STATE_INIT
        elif self.state == STATE_INIT:
            self.ball.reset()
            self.paddle1.reset()
            self.paddle2.reset()

            if pyxel.btn(pyxel.KEY_SPACE):
                self.ball.initMove()
                self.state = STATE_PLAYING

        self.ball.update()
{% endhighlight %}

Lo primero que hacemos es comprobar si el estado actual del juego es **STATE_PLAYING**, o sea, que se está jugando, y si es así, se ejecuta el código que teníamos hasta ahora dentro del método.

Lo más importante dentro de esa sentencia es lo siguiente:

{% highlight python linenos %}
if self.ball.pos_x - self.ball.radius <= 0:
    self.p2_score += 1
    self.state = STATE_INIT
elif self.ball.pos_x + self.ball.radius >= SCREEN_W:
    self.p1_score += 1
    self.state = STATE_INIT
{% endhighlight %}

Primero comprobamos si la pelota ya ha sobrepasado el borde izquierdo, y si es así, sumamos un punto al jugador 2, y si no es así, se comprueba si la bola salió por el lado derecho, dándole un punto al jugador 1. Además, en ambos caso se cambia el estado del juego al estado inicial.

Veamos el resto del código:

{% highlight python linenos %}
class Pyng():
    def update(self):
        if self.state == STATE_PLAYING:
        ...
        elif self.state == STATE_INIT:
            self.ball.reset()
            self.paddle1.reset()
            self.paddle2.reset()

            if pyxel.btn(pyxel.KEY_SPACE):
                self.ball.initMove()
                self.state = STATE_PLAYING
{% endhighlight %}

Cuando el estado pasa al estado inicial, lo primero que hacemos es resetear la posición de las palas y la bola. Luego tenemos una sentencia donde se comprueba si estando en este estado se pulsa la tecla **espacio**, y si es así, se inicia el juego.

Si ejecutamos el código debería de pasar como en la imagen tras anotar un punto:

![](/img/tuto_pyxel/05_01.gif)

## Añadiendo el marcador

Es hora de ir mostrando en pantalla los puntos obtenidos. Para ello vamos a hacer el uso del método **pyxel.text**:

```python
pyxel.text(x, y, texto, color)
```

Al final de **Pyng.draw()** añadimos las siguientes líneas

{% highlight python linenos %}
pyxel.text((SCREEN_W // 2 - 8), 8, str(self.p1_score), 7)
pyxel.text((SCREEN_W // 2 + 8), 8, str(self.p2_score), 7)
{% endhighlight %}

La puntuación del jugador estará situado en el centro de la pantalla, menos 8 píxeles, mientras que la del juego estará 8 píxeles del centro, además ambos tendran un margen superior de 8 píxeles. Pueden estar en cualquier posición, pero para mí así es mejor visualmente, aunque esto puede cambiar en futuras entregas.

El juego se verá así:

![](/img/tuto_pyxel/05_02.gif)

<details>
    <summary><em>Código completo</em></summary>
{% highlight python linenos %}
import pyxel
from random import choice


SCREEN_W = 320
SCREEN_H = 240
STATE_INIT = 1 # Inicio del juego y cuando se ha marcado un punto
STATE_PLAYING = 2 # Jugando
STATE_PAUSE = 3 # Juego en pausa


class Paddle():
    def __init__(self, pos_x, width, height):
        self.pos_x = pos_x
        self.width = width
        self.height = height
        self.pos_y = (SCREEN_H - self.height) // 2
        self.center = self.pos_y + (self.height // 2)
        self.speed = 3
        self.color = 7

    def draw(self):
        pyxel.rect(self.pos_x, self.pos_y, self.width, self.height, self.color)

    def move(self, direction):
        if direction == 'up' and self.pos_y > 0:
            self.pos_y += self.speed * -1
        elif direction == 'down' and self.pos_y + self.height < SCREEN_H:
            self.pos_y += self.speed

        self.center = self.pos_y + (self.height // 2)

    def checkCollide(self, ball):
        if (
            (ball.pos_x + 4 >= self.pos_x and ball.pos_x - 4 <= self.pos_x + self.width) and
            (ball.pos_y + 4 >= self.pos_y and ball.pos_y - 4 <= self.pos_y + self.height)
        ):
            return True
        
        return False

    def reset(self):
        self.pos_y = (SCREEN_H - self.height) // 2
        self.center = self.pos_y + (self.height // 2)

    
class Ball():
    def __init__(self):
        self.pos_x = (SCREEN_W - 2) // 2
        self.pos_y = (SCREEN_H - 2) // 2
        self.speed_x = 0
        self.speed_y = 0
        self.speed = 4
        self.radius = 4
        self.color = 7

    def changeDir(self, direction):
        self.speed_x = self.speed if direction == 'right' else self.speed * -1

    def initMove(self):
        x_move = choice(['left', 'right'])
        self.speed_x = self.speed if x_move == 'right' else self.speed * -1

        y_move = choice(['up', 'down'])
        self.speed_y = self.speed if y_move == 'down' else self.speed * -1

    def draw(self):
        pyxel.circ(self.pos_x, self.pos_y, self.radius, self.color)

    def reset(self):
        self.pos_x = (SCREEN_W - 4) // 2
        self.pos_y = (SCREEN_H - 4) // 2
        self.speed_x = 0
        self.speed_y = 0

    def update(self):
        # Comprobamos si la bola choca contra la parte superior o inferior de la pantalla
        if self.pos_y - 6 <= 0:
            self.speed_y = self.speed
        elif self.pos_y + 6 >= SCREEN_H:
            self.speed_y = self.speed * -1

        # Y finalmente movemos la bola
        self.pos_x += self.speed_x
        self.pos_y += self.speed_y


class Pyng():
    def __init__(self):
        self.paddle1 = Paddle(8, 8, 48)
        self.paddle2 = Paddle(SCREEN_W - 16, 8, 48)
        self.ball = Ball()
        self.ball.initMove()
        self.p1_score = 0
        self.p2_score = 0
        self.state = STATE_INIT

        pyxel.init(SCREEN_W, SCREEN_H, 'Pyng')
        pyxel.run(self.update, self.draw)

    def draw(self):
        pyxel.cls(0)
        self.paddle1.draw()
        self.paddle2.draw()
        self.ball.draw()
        pyxel.text((SCREEN_W // 2 - 8), 8, str(self.p1_score), 7)
        pyxel.text((SCREEN_W // 2 + 8), 8, str(self.p2_score), 7)

    def update(self):
        if self.state == STATE_PLAYING:
            if pyxel.btn(pyxel.KEY_Q):
                self.paddle1.move('up')
            elif pyxel.btn(pyxel.KEY_A):
                self.paddle1.move('down')
            else:
                self.paddle1.move(None)

            if self.paddle1.checkCollide(self.ball):
                self.ball.changeDir('right')

            if self.paddle2.checkCollide(self.ball):
                self.ball.changeDir('left')

            if self.ball.pos_y < self.paddle2.center:
                self.paddle2.move('up')
            elif self.ball.pos_y > self.paddle2.center:
                self.paddle2.move('down')

            if self.ball.pos_x + self.ball.radius <= 0:
                self.p2_score += 1
                self.state = STATE_INIT
            elif self.ball.pos_x + self.ball.radius >= SCREEN_W:
                self.p1_score += 1
                self.state = STATE_INIT
        elif self.state == STATE_INIT:
            self.ball.reset()
            self.paddle1.reset()
            self.paddle2.reset()

            if pyxel.btn(pyxel.KEY_SPACE):
                self.ball.initMove()
                self.state = STATE_PLAYING

        self.ball.update()


Pyng()
{% endhighlight %}
</details>

Y esto es todo por el momento. En la siguiente entrega vamos a ir acabando el juego, mejorando algunas mecanicas y añadiendo pantallas de inicio y game over.

Recuerda que el código fuente de cada entrega del tutorial lo tienes disponible en [este repositorio](https://codeberg.org/son_link/tutorial_pyxel). Hasta pronto