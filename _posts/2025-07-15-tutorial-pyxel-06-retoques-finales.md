---
title: "Tutorial Pyxel 6: Retoques finales (1ª parte)"
description: En esta sexta entrega vamos a ir dando varios retoques finales al juego
date: 2025-07-15T17:34:35.352Z
tags:
    - juegos
    - python
    - pyxel
    - tutorial
layout: post
category: pyxel
img_dest: pyxel/06_retoques_finales_1.png
---
Hola, y bienvenido/a/e a esta sexta entrega de mi tutorial de programación de juegos con **Python** y **Pyxel**.

En esta entrega, y la siguiente, vamos a ir dando retoques finales al juego, los cuales consisten en:

* Añadir nuevas constantes globales. Con esto reducimos el comparar o calcular números sin saber el porqué de ese valor:
    * 3 nuevos estados para el juego (pausa, reseteo, fin del juego)
    * 4 para las palas: 2 para su tamaño y 2 para las posiciones en el eje X de cada pala
    * 2 para la pelota: su radio y velocidad inicial
* La pelota tendrá ahora 4 velocidades en el eje vertical, cambiando su ángulo. Además, su velocidad sé irá incrementando tras cada golpe con las palas.
* Una pantalla inicial
* Una pantalla de partida acabada. La partida termina en cuando la diferencia de puntos es 5
* Poder pausar el juego

También mostraré como generar un paquete de Pyxel con el contenido de nuestro juego y generar el ejecutable y así poder distribuirlo. De este último tema hablaré más largo y tendido en próximas entregas.

La razón de dividir en dos entregas es para facilitar la lectura, y así no tener una entrega demasiado larga.

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
            <a href="{% link _posts/2025-04-24-tutorial-pyxel-03-las-raquetas.md %}">03 - Añadiendo las palas</a>
        </li>
        <li>
            <a href="{% link _posts/2025-05-20-tutorial-pyxel-04-añadiendo-rival-y-colisiones.md %}">04 - Añadiendo rival y colisiones</a>
        </li>
        <li>
            <a href="{% link _posts/2025-06-10-tutorial-pyxel-05-puntuaciones-reseteo.md %}">05 - Puntuación y reseteo</a>
        </li>
        <li>
            06 - Retoques finales (1ª parte)
        </li>
        <li>
            <a href="{% link _posts/2025-09-18-tutorial-pyxel-07-retoques-finales-2.md %}">07 - Retoques finales (2ª parte)</a>
        </li>
    </ul>
</details>

## Añadiendo las variables constantes

Lo primero que vamos a hacer es añadir las nuevas variables constantes. Añadimos las siguientes líneas tras **STATE_PLAYING**:

```python
STATE_PAUSE = 3 # Juego en pausa
STATE_RESET = 4 # Cuando se ha anotado un punto
STATE_GAME_OVER = 5 # Se acabo la partida

# Variables globales de las palas y la pelota
PADDLE_WIDTH = 8
PADDLE_HEIGHT = 48 # Altura de la pala
PADDLE1_POS = 8 # Posición en el eje X de la pala del jugador 1
PADDLE2_POS = SCREEN_W - 16 # Posición en el eje X de la pala del jugador 2 (el juego)
BALL_RADIUS = 4 # Radio de la bola
BALL_INIT_SPEED = 4 # Velocidad inicial de la bola
```

> Recordatorio: las variables constantes en Python se definen escribiendo sus nombres en mayúsculas, y dichos valores no pueden ser cambiados durante la ejecución del programa

## Modificando la clase Paddle

Hasta ahora el tamaño de las palas se indicaba al crear cada instancia de la clase **Paddle**, por lo que vamos a proceder a su eliminación y sustitución por las constantes:

* Eliminamos del método **__init__** los parámetros **width** y **height**, dejando solo **self** y **pos_x**
* Dentro de ese método, eliminamos estas líneas:
    * self.width = width
    * self.height = height
* Reemplazamos en toda la clase **self.width por PADDLE_WIDTH** y **self.height por PADDLE_HEIGHT**
* Dentro del método **checkCollide** veremos varias veces el número 4. Cambiamos dicho valor por la constante **BALL_RADIUS**, ya que ese es el valor que se debe de sumar y restar para comprobar la colisión

> Este es un ejemplo de como usar variables constantes nos sirve para saber con qué valores estamos realizando una operación y dicho valor se va a usar a lo largo del programa. No es obligatorio, pero a la larga puede ser útil, sobre todo si dicho valor (en este ejemplo el 4) se usa en otras partes y evitar así confusiones.

El resultado debería de quedar tal que así:

{% highlight python linenos %}
class Paddle():
    def __init__(self, pos_x):
        self.pos_x = pos_x
        self.pos_y = (SCREEN_H - PADDLE_HEIGHT) // 2
        self.center = self.pos_y + (PADDLE_HEIGHT // 2)
        self.speed = 6
        self.color = 7

    def draw(self):
        pyxel.rect(self.pos_x, self.pos_y, PADDLE_WIDTH, PADDLE_HEIGHT, self.color)

    def move(self, direction):
        if direction == 'up' and self.pos_y > 0:
            self.pos_y += self.speed * -1
        elif direction == 'down' and self.pos_y + PADDLE_HEIGHT < SCREEN_H:
            self.pos_y += self.speed

        self.center = self.pos_y + (PADDLE_HEIGHT // 2)

    def checkCollide(self, ball):
        if (
            (ball.pos_x + BALL_RADIUS >= self.pos_x and ball.pos_x - BALL_RADIUS <= self.pos_x + PADDLE_WIDTH) and
            (ball.pos_y + BALL_RADIUS >= self.pos_y and ball.pos_y - BALL_RADIUS <= self.pos_y + PADDLE_HEIGHT)
        ):
            return True
        
        return False

    def reset(self):
        self.pos_y = (SCREEN_H - PADDLE_HEIGHT) // 2
        self.center = self.pos_y + (PADDLE_HEIGHT // 2)
{% endhighlight %}

## Modificando la clase Ball

Vamos a hacer varios cambios en la clase **Ball**, por lo que para hacerlo más sencillo de entender voy a separarlo en varias partes

### Primeros cambios

Lo primero que vamos a cambiar es el valor inicial de **Ball.speed** por el valor de la constante **BALL_INIT_SPEED**. Para ello buscamos esta línea

```python
self.speed = 4
```

Y cambiamos su valor por:

```python
self.speed = BALL_INIT_SPEED
```

Ahora eliminamos la línea **self.radius = 4** dentro de **__init__** y reemplazamos en el método **draw** dicha variable por **BALL_RADIUS** como parámetro de **pyxel.circ**.

Nos debería de quedar de este modo:

{% highlight python linenos %}
class Ball():
    def __init__(self):
        self.pos_x = (SCREEN_W - 2) // 2
        self.pos_y = (SCREEN_H - 2) // 2
        self.speed_x = 0
        self.speed_y = 0
        self.speed = BALL_INIT_SPEED
        self.color = 7

    def changeDir(self, direction):
        self.speed_x = self.speed if direction == 'right' else self.speed * -1

    def initMove(self):
        x_move = choice(['left', 'right'])
        self.speed_x = self.speed if x_move == 'right' else self.speed * -1

        y_move = choice(['up', 'down'])
        self.speed_y = self.speed if y_move == 'down' else self.speed * -1

    def draw(self):
        pyxel.circ(self.pos_x, self.pos_y, BALL_RADIUS, self.color)

    def reset(self):
        self.pos_x = (SCREEN_W - 4) // 2
        self.pos_y = (SCREEN_H - 4) // 2
        self.speed_x = 0
        self.speed_y = 0
{% endhighlight %}

### Nuevos ángulos

En el Pong original la bola, al colisionar contra una de las palas, cambia su ángulo dependiendo del punto de colisión con esa pala, pero para este ejemplo vamos a usar un metodo más sencillo.

Para ello vamos a realizar cambios en el método **changeDir**

Lo primero que vamos a hacer es añadir un nuevo parámetro al metodo, **paddle**, y cuyo valor es la pala con la que colisiono la bola:

```python
def changeDir(self, direction, paddle):
```

Ahora lo que vamos a hacer es comprobar el punto de colisión de la bola en referencia al centro de la pala y almacenarlo en una variable que usaremos luego para saber si la pelota irá hacia arriba o hacia abajo.

Para ello, añadimos la siguiente línea tras definir el método:

{% highlight python linenos %}
def changeDir(self, direction, paddle):
        diff = self.pos_y - paddle.center
{% endhighlight %}

Lo siguiente es seleccionar de manera aleatoria dos valores, 0 y 1, usando la función **random.choice**, y según el valor devuelto, definiremos la velocidad en el eje vertical, cambiando así el ángulo de la pelota:

{% highlight python linenos %}
random_vel_y = choice([0, 1])
dy = 1 if random_vel_y == 0 else 0.
{% endhighlight %}

Por último, vamos a definir la velocidad de la pelota en el eje vertical, usando para ello los valores de **diff** y **dy**

{% highlight python linenos %}
if diff < 0:
    self.speed_y = self.speed * (-1 * dy)
elif diff > 0:
    self.speed_y = self.speed * dy
{% endhighlight %}

La velocidad vertical de la pelota será, la velocidad actual de la pelota, multiplicada por el valor de **dy**, siendo este último valor convertido a negativo si el valor de **diff** es negativo (golpeo en la mitad superior de la pala)

## Modificando la clase Pyng

Ahora vamos a realizar modificaciones en la clase principal del juego, **Pyng**

Por el momento, solo vamos a realizar cuatro modificaciones en el método **update**.

Lo primero que vamos a modificar son estas líneas:
{% highlight python linenos %}
if self.paddle1.checkCollide(self.ball):
    self.ball.changeDir('right')

if self.paddle2.checkCollide(self.ball):
    self.ball.changeDir('left')
{% endhighlight %}

Como vimos en el último punto de los cambios en **Ball**, ahora su método **changeDir()** pide un segundo parámetro, **paddle**, que es la instancia de la pala, por lo que añadimos ese parámetro según corresponda:

{% highlight python linenos %}
if self.paddle1.checkCollide(self.ball):
    self.ball.changeDir('right', self.paddle1)

if self.paddle2.checkCollide(self.ball):
    self.ball.changeDir('left', self.paddle2)
{% endhighlight %}

Si vamos un poco más abajo veremos lo siguiente:

{% highlight python linenos %}
if self.ball.pos_x + self.ball.radius <= 0:
    self.p2_score += 1
    self.state = STATE_INIT
elif self.ball.pos_x + self.ball.radius >= SCREEN_W:
    self.p1_score += 1
    self.state = STATE_INIT
{% endhighlight %}

En este caso, sustituimos los 2 **self.ball.radius** por BALL_RADIUS, ya que elimínanos dicha propiedad, justo para usar esta constante

{% highlight python linenos %}
if self.ball.pos_x + BALL_RADIUS <= 0:
    self.p2_score += 1
    self.state = STATE_INIT
elif self.ball.pos_x + BALL_RADIUS >= SCREEN_W:
    self.p1_score += 1
    self.state = STATE_INIT
{% endhighlight %}

Si ejecutamos el juego, tendremos algo como lo siguiente:

![Ejemplo de los nuevos angulos de la bola](/img/tuto_pyxel/06_01.gif)

Como se puede apreciar al final del GIF, la pala que maneja el juego va dando saltos, pero esto es algo que solucionaremos en la segunda parte.

<details>
    <summary><em>Código completo de esta entrega</em></summary>
{% highlight python linenos %}
import pyxel
from random import choice


# Variables globales del juego
SCREEN_W = 320
SCREEN_H = 240
STATE_INIT = 1 # Inicio del juego
STATE_PLAYING = 2 # Jugando
STATE_PAUSE = 3 # Juego en pausa
STATE_RESET = 4 # Cuando se ha anotado un punto
STATE_GAME_OVER = 5 # Se acabó la partida

# Variables globales de las palas y la pelota
PADDLE_WIDTH = 8
PADDLE_HEIGHT = 48 # Altura de la pala
PADDLE1_POS = 8 # Posición en el eje X de la pala del jugador 1
PADDLE2_POS = SCREEN_W - 16 # Posición en el eje X de la pala del jugador 2 (el juego)
BALL_RADIUS = 4 # Radio de la bola
BALL_INIT_SPEED = 4 # Velocidad inicial de la bola


class Paddle():
    def __init__(self, pos_x):
        self.pos_x = pos_x
        self.pos_y = (SCREEN_H - PADDLE_HEIGHT) // 2
        self.center = self.pos_y + (PADDLE_HEIGHT // 2)
        self.speed = 6
        self.color = 7

    def draw(self):
        pyxel.rect(self.pos_x, self.pos_y, PADDLE_WIDTH, PADDLE_HEIGHT, self.color)

    def move(self, direction):
        if direction == 'up' and self.pos_y > 0:
            self.pos_y += self.speed * -1
        elif direction == 'down' and self.pos_y + PADDLE_HEIGHT < SCREEN_H:
            self.pos_y += self.speed

        self.center = self.pos_y + (PADDLE_HEIGHT // 2)

    def checkCollide(self, ball):
        if (
            (ball.pos_x + BALL_RADIUS >= self.pos_x and ball.pos_x - BALL_RADIUS <= self.pos_x + PADDLE_WIDTH) and
            (ball.pos_y + BALL_RADIUS >= self.pos_y and ball.pos_y - BALL_RADIUS <= self.pos_y + PADDLE_HEIGHT)
        ):
            return True
        
        return False

    def reset(self):
        self.pos_y = (SCREEN_H - PADDLE_HEIGHT) // 2
        self.center = self.pos_y + (PADDLE_HEIGHT // 2)

    
class Ball():
    def __init__(self):
        self.pos_x = (SCREEN_W - 2) // 2
        self.pos_y = (SCREEN_H - 2) // 2
        self.speed_x = 0
        self.speed_y = 0
        self.speed = BALL_INIT_SPEED
        self.color = 7

    def changeDir(self, direction, paddle):
        # La velocidad vertical va a cambiar según la distancia de la pelota
        # con el centro de la pala
        diff = self.pos_y - paddle.center

        # Ahora vamos a seleccionar de manera aleatoria un valor que indicara
        # la velocidad en el eje vertical
        random_vel_y = choice([0, 1])
        dy = 1 if random_vel_y == 0 else 0.4

        # Sí la diferencia con el centro es negativo, la bola ira hacia arriba
        if diff < 0:
            self.speed_y = self.speed * (-1 * dy)
        # En caso contrario, hacia abajo
        elif diff > 0:
            self.speed_y = self.speed * dy

        self.speed_x = self.speed if direction == 'right' else self.speed * -1

    def initMove(self):
        x_move = choice(['left', 'right'])
        self.speed_x = self.speed if x_move == 'right' else self.speed * -1

        y_move = choice(['up', 'down'])
        self.speed_y = self.speed if y_move == 'down' else self.speed * -1

    def draw(self):
        pyxel.circ(self.pos_x, self.pos_y, BALL_RADIUS, self.color)

    def reset(self):
        self.pos_x = (SCREEN_W - 4) // 2
        self.pos_y = (SCREEN_H - 4) // 2
        self.speed_x = 0
        self.speed_y = 0
        self.speed = BALL_INIT_SPEED

    def update(self):
        # Comprobamos si la bola choca contra la parte superior o inferior de la pantalla
        if self.pos_y - 6 <= 0 or self.pos_y + 6 >= SCREEN_H:
            self.speed_y *= -1

        # Y finalmente movemos la bola
        self.pos_x += self.speed_x
        self.pos_y += self.speed_y

class Pyng():
    def __init__(self):
        self.paddle1 = Paddle(PADDLE1_POS)
        self.paddle2 = Paddle(PADDLE2_POS)
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
                self.ball.changeDir('right', self.paddle1)

            if self.paddle2.checkCollide(self.ball):
                self.ball.changeDir('left', self.paddle2)

            if self.ball.pos_y < self.paddle2.center:
                self.paddle2.move('up')
            elif self.ball.pos_y > self.paddle2.center:
                self.paddle2.move('down')

            if self.ball.pos_x + BALL_RADIUS <= 0:
                self.p2_score += 1
                self.state = STATE_INIT
            elif self.ball.pos_x + BALL_RADIUS >= SCREEN_W:
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

Y esto es todo por el momento. En la siguiente entrega seguiremos con los retoques finales.

Recuerda que el código fuente de cada entrega del tutorial lo tienes disponible en [este repositorio](https://codeberg.org/son_link/tutorial_pyxel). Hasta pronto