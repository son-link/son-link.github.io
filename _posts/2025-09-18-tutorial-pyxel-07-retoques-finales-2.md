---
title: "Tutorial Pyxel 7: Retoques finales (2ª parte)"
description: En esta séptima entrega vamos a ir terminando de dar los retoques finales al juego
date: 2025-09-18T16:52:59.743Z
tags:
    - juegos
    - python
    - pyxel
    - tutorial
layout: post
category: pyxel
img_dest: pyxel/07_retoques_finales_2.png
---
Hola, y bienvenido/a/e a esta séptima entrega de mi tutorial de programación de juegos con **Python** y **Pyxel**.

En esta entrega vamos a terminar los retoques finales del juego que empezamos en la anterior entrega:

* Añadir 3 nuevos estados para el juego (pausa, reseteo, fin del juego)
* Una pantalla inicial
* Una pantalla de partida acabada. La partida termina en cuando la diferencia de puntos sea 5
* Poder pausar el juego
* Mejorar el movimiento de la pala controlada por el juego

También mostraré como generar un paquete de Pyxel con el contenido de nuestro juego y generar el ejecutable y así poder distribuirlo. De este último tema hablaré más largo y tendido en próximas entregas.

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
        <li>
            07 - Retoques finales (2ª parte)
        </li>
    </ul>
</details>

## Mejorando la pala del juego

Al finalizar la anterior entrega vimos como la pala controlada por el juego tenía un problema, y es que, dependiendo del ángulo en el que se mueva la pelota en el eje vertical, al seguirla daba saltos, lo que es molesto para la vista, así que vamos a suavizar su movimiento.

Para ello vamos a crear dentro de la clase **Paddle** un nuevo método al que llamaremos **moveCPU**, el cual recibirá como parámetro la variable que contiene la instancia de la bola.

{% highlight python linenos %}
class Paddle:
    def moveCPU(self, ball):
        if abs(self.center - ball.pos_y) > 12:
            if random() < 0.8:
                if self.center < ball.pos_y:
                    self.pos_y = min(self.pos_y + PADDLE_SPEED, SCREEN_H - PADDLE_HEIGHT)
                elif self.center > ball.pos_y:
                    self.pos_y = max(self.pos_y - PADDLE_SPEED, 0)
        
        self.center = self.pos_y + (PADDLE_HEIGHT // 2)
{% endhighlight %}

Lo primero que hacemos es comprobar si la posición de la pelota en el eje vertical con respecto al centro de la pala supera los 12 píxeles.

> La función **abs** de Python devuelve el valor absoluto de un número, y si el valor indicado tiene símbolo negativo, lo convierte a positivo, p. ej. abs(-12) devuelve 12

Lo siguiente que hacemos es comprobar si la función de la librería **random**, **random()** nos devuelve un valor por debajo de 0.8. Esto hace que la máquina tenga un 20% de posibilidades de cometer un error, ya que de lo contrario sería prácticamente invencible

> **random.random()** devuelve números flotantes que van desde el 0 al 1, por lo que sí, por ejemplo, queremos que sea entre 1 y 100, deberemos multiplicarlo, o usar **randint()**, el cual devuelve un número entero entre el rango indicado.

Ahora vamos a comprobar de nuevo la posición de la pelota con respecto al centro de la pala. Sí es menor de cero, o sea, por arriba, movemos la pala en esa dirección. Para ello asignaremos a **self.pos_y** el valor devuelto por la función **min()**, la cual nos devuelve el número menor entre los valores que le pasemos, que en este caso son la posición actual más la velocidad de la pala y el alto de la ventana menos el alto de la pala.

En caso contrario, la pelota está por debajo del centro de la pala, hacemos un proceso similar, solo que en este caso usamos la función **max()**, la cual nos devolverá el valor máximo entre los números que le pasemos. En este caso entre la posición de la pala menos la velocidad.

## Añadiendo una pantalla de inicio

Ahora mismo, al arrancar el juego, se nos muestra dicha pantalla, pero vamos a añadir una sencilla pantalla de inicio, con el título del juego y un texto indicando como empezar a jugar.

Primero vamos a añadir una nueva función, **centerText**, el cual centrara un texto en la pantalla del juego. Dicha función la pondremos entre las variables constantes y la clase Pyng:

{% highlight python linenos %}
def centerText(text, posy, color):
    '''Centres a text on the screen'''
    pyxel.text(
        (constants.SCREEN_W // 2) - ((len(text) * 4) // 2),
        posy, text, color
    )
{% endhighlight %}

Esta función recibe 3 parámetros:

* El texto a mostrar
* La posición en el eje vertical
* El color del texto

Para calcular desde donde se empieza a dibujar primero dividimos entre 2 el ancho de la ventana. A dicho resultado se le resta el tamaño del texto multiplicado
por cuatro y luego dividido entre 2

> Nota: esta función no tiene en cuenta si el ancho total del texto es mayor que el de la pantalla, por lo que sí crees que va a pasar, llama varias veces a la función separando el texto en varias líneas.

Ahora vamos a cambiar el contenido del método **Pyng.draw()**:

{% highlight python linenos %}
class Pyng:
    def draw(self):
        pyxel.cls(0)
        self.paddle1.draw()
        self.paddle2.draw()
        self.ball.draw()
        pyxel.text((SCREEN_W // 2 - 8), 8, str(self.p1_score), 7)
        pyxel.text((SCREEN_W // 2 + 8), 8, str(self.p2_score), 7)
{% endhighlight %}

Por este:

{% highlight python linenos %}
class Pyng:
    def draw(self):
        pyxel.cls(0)
        
        if self.state == STATE_INIT:
            centerText('Pyng', 32, 10)
            centerText('Press Space to start', 48, 4)
        else:
            self.paddle1.draw()
            self.paddle2.draw()
            self.ball.draw()
            pyxel.text((SCREEN_W // 2 - 8), 8, str(self.p1_score), 7)
            pyxel.text((SCREEN_W // 2 + 8), 8, str(self.p2_score), 7)
{% endhighlight %}

Ahora comprobamos si el estado actual del juego es el inicial (**STATE_INIT**), y sí es así, dibujamos en pantalla dos textos: uno con el nombre del juego, y otro diciendo que se pulse la tecla espacio. En caso contrario, dibujará la pantalla del juego como hasta ahora.

![Pantalla de inicio](/img/tuto_pyxel/07_01.png)

## Añadiendo el estado de reseteo

Ahora vamos a añadir el estado de reseteo. Con este estado se busca reiniciar los valores tras marcar, evitando posibles errores

Lo primero buscamos estas líneas:

{% highlight python linenos %}
if self.ball.pos_x + BALL_RADIUS <= 0:
    self.p2_score += 1
    self.state = STATE_INIT
elif self.ball.pos_x + BALL_RADIUS >= SCREEN_W:
    self.p1_score += 1
    self.state = STATE_INIT
{% endhighlight %}

Y cambiamos **STATE_INIT** por **STATE_RESET**:

{% highlight python linenos %}
if self.ball.pos_x + BALL_RADIUS <= 0:
    self.p2_score += 1
    self.state = STATE_RESET
elif self.ball.pos_x + BALL_RADIUS >= SCREEN_W:
    self.p1_score += 1
    self.state = STATE_RESET
{% endhighlight %}

Más abajo veremos las siguientes líneas:

{% highlight python linenos %}
        elif self.state == STATE_INIT:
            self.ball.reset()
            self.paddle1.reset()
            self.paddle2.reset()

            if pyxel.btn(pyxel.KEY_SPACE):
                self.ball.initMove()
                self.state = STATE_PLAYING
{% endhighlight %}

Lo cambiamos todo por lo siguiente:

{% highlight python linenos %}
        elif self.state == STATE_INIT or self.state == STATE_RESET:
            if self.state == STATE_INIT:
                self.p1_score = 0
                self.p2_score = 0

            self.ball.reset()
            self.paddle1.reset()
            self.paddle2.reset()

            if pyxel.btnp(pyxel.KEY_SPACE):
                if self.state == STATE_INIT:
                    self.state = STATE_RESET
                else:
                    self.ball.initMove()
                    self.state = STATE_PLAYING
{% endhighlight %}

Ahora se comprueba también si estado actual es **STATE_RESET**. Luego comprueba si el estado actual es el inicial, y sí es así, pone los marcadores a 0.

Las siguientes 3 líneas siguen igual, pero el siguiente if cambia. Al pulsar espacio comprueba de nuevo el estado actual. Si es **STATE_INIT**, cambia a **STATE_RESET** para reiniciar los valores, y si es así, llama a la función que pone en marcha la pelota y cambia al estado de juego (**STATE_PLAYING**)

## Añadiendo la pantalla de fin de juego

Ahora vamos a añadir la pantalla que se mostrara tras acabar la partida, la cual acabara cuando la diferencia de puntos sea de cinco.

Primero vamos a añadir dentro de **Pyng.draw()** la comprobación del nuevo estado, para que dibuje en pantalla unos textos. Buscamos las siguientes líneas:

{% highlight python linenos %}
class Pyng:
    def draw(self):
        pyxel.cls(0)
        
        if self.state == STATE_INIT:
            centerText('Pyng', 32, 10)
            centerText('Press Space to start', 48, 4)
        else:
            ...
{% endhighlight %}

Y justo antes del else añadimos lo siguiente:

{% highlight python linenos %}
elif self.state == STATE_GAME_OVER:
    if self.p1_score > self.p2_score:
        pyxel.text((SCREEN_W / 2) - 12, 32, 'YOU WIN!', 4)
    else:
        pyxel.text((SCREEN_W / 2) - 14, 32, 'YOU LOSE!', 8)

    pyxel.text((SCREEN_W / 2) - 40, 48, 'Press Space to exit', 4)
{% endhighlight %}

Sí el jugador 1 es el ganador, se mostrara el texto **YOU WIN!** en verde (has ganado), en caso contrario, mostrara en rojo **YOU LOSE!** (gano el juego)

Debería de quedar así:

{% highlight python linenos %}
class Pyng:
    def draw(self):
        pyxel.cls(0)
        
        if self.state == STATE_INIT:
            centerText('Pyng', 32, 10)
            centerText('Press Space to start', 48, 4)
        elif self.state == STATE_GAME_OVER:
            if self.p1_score > self.p2_score:
                pyxel.text((SCREEN_W / 2) - 12, 32, 'YOU WIN!', 4)
            else:
                pyxel.text((SCREEN_W / 2) - 14, 32, 'YOU LOSE!', 8)

            pyxel.text((SCREEN_W / 2) - 40, 48, 'Press Space to exit', 4)
        else:
            ...
{% endhighlight %}

Ahora dentro de **Pyng.update()** buscamos la siguiente línea:

```python
self.ball.update()
```

A continuación añadimos lo siguiente:

{% highlight python linenos %}
if abs(self.p1_score - self.p2_score) == 5:
    self.state = STATE_GAME_OVER
{% endhighlight %}

Se comprueba si la diferencia de puntos entre los 2 jugadores es de 5 (recordar que **abs** quita el signo negativo de un número), cambiamos el estado a **STATE_GAME_OVER**, lo que mostrara en pantalla la pantalla final.

Por último vamos a añadir el código para volver a la pantalla de inicio. Para ello, al final de **Pyxel.update()** añadimos lo siguiente:

{% highlight python linenos %}
elif self.state == STATE_GAME_OVER:
    if pyxel.btnp(pyxel.KEY_SPACE):
        self.state = STATE_INIT
{% endhighlight %}

Y con esto hemos acabado el juego. Ahora debería de ser como en la siguiente animación (para acortar puse que la diferencia fuera de 2 puntos)

![El juego con los cambios hechos](/img/tuto_pyxel/07_02.gif)

<details>
    <summary><em>Código completo de esta entrega</em></summary>
{% highlight python linenos %}
import pyxel
from random import choice, random


# Variables globales del juego
SCREEN_W = 320
SCREEN_H = 240
STATE_INIT = 1 # Inicio del juego
STATE_PLAYING = 2 # Jugando
STATE_PAUSE = 3 # Juego en pausa
STATE_RESET = 4 # Cuando se ha anotado un punto
STATE_GAME_OVER = 5 # Se acabo la partida

# Variables globales de las palas y la pelota
PADDLE_WIDTH = 8
PADDLE_HEIGHT = 48 # Altura de la pala
PADDLE1_POS = 8 # Posición en el eje X de la pala del jugador 1
PADDLE2_POS = SCREEN_W - 16 # Posición en el eje X de la pala del jugador 2 (el juego)
PADDLE_SPEED = 6 # Velocidad de las palas
BALL_RADIUS = 4 # Radio de la bola
BALL_INIT_SPEED = 4 # Velocidad inicial de la bola


def centerText(text, posy, color):
    '''Centres a text on the screen'''
    pyxel.text(
        (constants.SCREEN_W / 2) - ((len(text) * 4) / 2),
        posy, text, color
    )


class Paddle():
    def __init__(self, pos_x):
        self.pos_x = pos_x
        self.pos_y = (SCREEN_H - PADDLE_HEIGHT) // 2
        self.center = self.pos_y + (PADDLE_HEIGHT // 2)
        self.color = 7

    def draw(self):
        pyxel.rect(self.pos_x, self.pos_y, PADDLE_WIDTH, PADDLE_HEIGHT, self.color)

    def move(self, direction):
        if direction == 'up' and self.pos_y > 0:
            self.pos_y += -PADDLE_SPEED
        elif direction == 'down' and self.pos_y + PADDLE_HEIGHT < SCREEN_H:
            self.pos_y += PADDLE_SPEED

        self.center = self.pos_y + (PADDLE_HEIGHT // 2)
    
    def moveCPU(self, ball):
        if abs(self.center - ball.pos_y) > 12:
            if random() < 0.8:
                if self.center < ball.pos_y:
                    self.pos_y = min(self.pos_y + PADDLE_SPEED, SCREEN_H - PADDLE_HEIGHT)
                elif self.center > ball.pos_y:
                    self.pos_y = max(self.pos_y - PADDLE_SPEED, 0)
        
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

    def updateSpeed(self):
        self.speed += 0.3

class Pyng():
    def __init__(self):
        self.paddle1 = Paddle(PADDLE1_POS)
        self.paddle2 = Paddle(PADDLE2_POS)
        self.ball = Ball()
        self.ball.initMove()
        self.p1_score = 0
        self.p2_score = 0
        self.state = STATE_INIT

        pyxel.init(SCREEN_W, SCREEN_H, 'Pyng', capture_sec=60)
        pyxel.run(self.update, self.draw)

    def draw(self):
        pyxel.cls(0)

        if self.state == STATE_INIT:
            pyxel.text((SCREEN_W / 2) - 8, 32, 'Pyng', 10)
            pyxel.text((SCREEN_W / 2) - 40, 48, 'Press Space to start', 4)
        elif self.state == STATE_GAME_OVER:
            if self.p1_score > self.p2_score:
                pyxel.text((SCREEN_W / 2) - 12, 32, 'YOU WIN!', 4)
            else:
                pyxel.text((SCREEN_W / 2) - 14, 32, 'YOU LOSE!', 8)

            pyxel.text((SCREEN_W / 2) - 40, 48, 'Press Space to exit', 4)
        else:
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
                self.ball.updateSpeed()

            if self.paddle2.checkCollide(self.ball):
                self.ball.changeDir('left', self.paddle2)
                self.ball.updateSpeed()

            self.paddle2.moveCPU(self.ball)

            if self.ball.pos_x + BALL_RADIUS <= 0:
                self.p2_score += 1
                self.state = STATE_RESET
            elif self.ball.pos_x + BALL_RADIUS >= SCREEN_W:
                self.p1_score += 1
                self.state = STATE_RESET

            self.ball.update()
            
            # Si la diferencia de puntos es de 5 puntos, se acaba el juego
            if abs(self.p1_score - self.p2_score) == 2:
                self.state = STATE_GAME_OVER

        elif self.state == STATE_INIT or self.state == STATE_RESET:
            if self.state == STATE_INIT:
                self.p1_score = 0
                self.p2_score = 0

            self.ball.reset()
            self.paddle1.reset()
            self.paddle2.reset()

            if pyxel.btnp(pyxel.KEY_SPACE):
                if self.state == STATE_INIT:
                    self.state = STATE_RESET
                else:
                    self.ball.initMove()
                    self.state = STATE_PLAYING

        elif self.state == STATE_GAME_OVER:
            if pyxel.btnp(pyxel.KEY_SPACE):
                self.state = STATE_INIT


Pyng()
{% endhighlight %}
</details>

Y esto es todo por el momento. En la siguiente entrega enseñaré a empaquetar, generar un ejecutable, y generar la versión web para distribuir el juego.

Recuerda que el código fuente de cada entrega del tutorial lo tienes disponible en [este repositorio](https://codeberg.org/son_link/tutorial_pyxel). Hasta pronto.