---
title: "Tutorial Pyxel 04: Añadiendo rival y colisiones"
description: En esta tercera entrega del tutorial de Pyxel vamos a ver como añadir la pala del rival y que la pelota colisione con ambas
date: 2025-04-26T08:12:42.645Z
tags:
    - pyxel
    - python
    - juegos
    - tutorial
layout: post
category: pyxel
img_dest: pyxel/04_rival_colisiones.png
---
## Introducción

Hola, y bienvenido/a/e a esta tercera entrega de mi tutorial de programación de juegos con **Python** y **Pyxel**.

En esta entrega vamos a añadir la pala del rival, la cual estará controlada por el juego, así como hacer que la pelota cambie de dirección al colisionar contra ellas.

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
    </ul>
</details>

## Añadiendo al rival

Añadir una segunda pala es sencillo, solo tenemos que seguir los mismos pasos como con la pala del jugador:

{% highlight python linenos %}
class Pyng():
    def __init__(self):
        self.paddle1 = Paddle(8, 8, 50)
        self.paddle2 = Paddle(SCREEN_W - 16, 8, 50)
        #self.ball = Ball()

        pyxel.init(SCREEN_W, SCREEN_H, 'Pyng')
        pyxel.run(self.update, self.draw)

    def draw(self):
        pyxel.cls(0)
        self.paddle1.draw()
        self.paddle2.draw()
        #self.ball.draw()
{% endhighlight %}

La única diferencia, por ahora, es la posición de la pala en el eje horizontal. Al ejecutar el código deberías de ver ambas palas:

![Captura del juego mostrando las 2 palas](/img//tuto_pyxel/04_01_segunda_pala.png)

Por el momento, la pala controlada por el juego no se moverá. Aparte, vamos a descomentar las líneas de la bola que comentamos en la anterior entrega, para ello quitamos las almohadillas de las siguientes líneas:

```python
#self.ball = Ball()
#self.ball.draw()
#self.ball.update()
```

Y la pelota volverá a mostrarse y moverse por la pantalla:

![](/img/tuto_pyxel/04_02_palas_y_pelota.gif)

## Colisiones de las palas

Ahora vamos a añadir las colisiones a las palas. Para ello, vamos a añadir a la clase **Paddle** un nuevo método, **checkCollide**, el cual devolverá **True** si la pelota ha colisionado con alguna de ellas:

{% highlight python linenos %}
class Pyng():
    def checkCollide(self, ball):
        if (
            (ball.pos_x + ball.radius >= self.pos_x and ball.pos_x - ball.radius <= self.pos_x + self.width) and
            (ball.pos_y + ball.radius >= self.pos_y and ball.pos_y - ball.radius <= self.pos_y + self.height)
        ):
            return True
        
        return False
{% endhighlight %}

Este método recibirá un único parámetro, **ball**, que es la instancia de la clase **Ball** dentro de **Pyng**. Voy a explicar la sentencia:

* Lo primero que vamos a comprobar es si la pelota está dentro del espacio que ocupa la pala en el eje horizontal. Para ello sumamos la posición actual de la bola y su radio y comprobamos si es mayor o igual que la posición del lado izquierdo de la pala y, además, la posición de la bola menos su radio es menor o igual que el lado derecho de la pala, que es su posición más su ancho.
* Luego comprobamos si la pelota está dentro del espacio que ocupa la pala en el eje vertical. Para ello sumamos la posición actual de la bola y su radio y comprobamos si es mayor o igual que la posición de la pala por la parte superior y, además, la posición de la bola menos su radio es menor o igual que la parte inferior de la pala, que es su posición más su alto.

Ahora vamos a añadir a **Ball** otro método al que llamaremos **changeDir()** y que recibirá como parámetro hacia qué dirección irá la bola tras colisionar y cambiar su dirección:

{% highlight python linenos %}
class Ball():
    def changeDir(self, direction):
        self.speed_x = self.speed if direction == 'right' else self.speed * -1
{% endhighlight %}

En este caso estamos usando la versión corta de **if**. Este método nos permite asignar a una variable un valor u otro según se cumpla, o no.

Para explicarlo de una manera más clara, esta línea:

```python
variable = 'valor_si_se_cumple' if <condición> else 'valor_no_se_cumple'
```

Equivale a:

```python
if <condición>:
    variable = 'valor_si_se_cumple'
else:
    variable = 'valor_no_se_cumple'
```

De este modo nos ahorramos 3 líneas, haciendo el código más legible y fácil de mantener.

> Si bien la versión corta de if es muy práctica, no recomiendo usarla si las condiciones a cumplir son muy largas o complejas.

Ahora vamos a añadir dentro de **Pyng.update()** el código para comprobar las colisiones:

{% highlight python linenos %}
class Pyng():
    def update(self):
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
{% endhighlight %}

Si la bola colisiona con la pala del jugador, cambiará su dirección hacia la derecha, y si choca contra la del juego, lo hará hacia la izquierda.

![](/img/tuto_pyxel/04_03_colisiones.gif)

<details>
    <summary><em>Resumen del código</em></summary>
    {% highlight python linenos %}

import pyxel
from random import choice


SCREEN_W = 320
SCREEN_H = 240


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

    def checkCollide(self, ball):
        if (
            (ball.pos_x + 4 >= self.pos_x and ball.pos_x - 4 <= self.pos_x + self.width) and
            (ball.pos_y + 4 >= self.pos_y and ball.pos_y - 4 <= self.pos_y + self.height)
        ):
            return True
        
        return False

    
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
        if self.pos_y - 6 <= 0:
            self.speed_y = self.speed
        elif self.pos_y + 6 >= SCREEN_H:
            self.speed_y = self.speed * -1

        if self.pos_x - 6 <= 0:
            self.speed_x = self.speed
        elif self.pos_x + 6 >= SCREEN_W:
            self.speed_x = self.speed * -1

        self.pos_x += self.speed_x
        self.pos_y += self.speed_y


class Pyng():
    def __init__(self):
        self.paddle1 = Paddle(8, 8, 50)
        self.paddle2 = Paddle(SCREEN_W - 16, 8, 50)
        self.ball = Ball()
        self.ball.initMove()

        pyxel.init(SCREEN_W, SCREEN_H, 'Pyng')
        pyxel.run(self.update, self.draw)

    def draw(self):
        pyxel.cls(0)
        self.paddle1.draw()
        self.paddle2.draw()
        self.ball.draw()

    def update(self):
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

        self.ball.update()


Pyng()
{% endhighlight %}
</details>

## Añadiendo algo de IA

Es hora de que el juego controle la segunda pala para enfrentarse a nosotros. Para ello, vamos a controlar la posición de la bola en el eje vertical con el centro de la pala.

Lo primero que vamos a hacer es añadir en Paddle una nueva propiedad, **self.center**, la cual almacenara la posición del centro de la pala, la cual nos servirá más adelante para compararla con la posición de la bola, por lo que añadimos la siguiente línea en **Paddle.__init__** y al final de**Paddle.move**:

```python
self.center = self.pos_y + (self.height // 2)
```

<details>
    <summary><em>Como queda la clase Paddle tras añadir las lineas</em></summary>
{% highlight python linenos %}
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
{% endhighlight %}
</details>


Ahora vamos a añadir a **Pyng.update()** el código para que la pala se mueva arriba o abajo según la posición de la bola con respecto al centro de la pala:

{% highlight python linenos %}
class Pyng():
    def update(self):
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

        # Si la pelota esta arriba con respecto al centro de la pala, se movera en esa dirección.
        # En caso contrario, se movera hacía abajo
        if self.ball.pos_y < self.paddle2.center:
            self.paddle2.move('up')
        elif self.ball.pos_y > self.paddle2.center:
            self.paddle2.move('down')

        self.ball.update()

{% endhighlight %}

Y al ejecutar el código se debería de ver como en el siguiente GIF:

![](/img/tuto_pyxel/04_04_ia.gif)


<details>
    <summary><em>Código completo</em></summary>
{% highlight python linenos %}
import pyxel
from random import choice


SCREEN_W = 320
SCREEN_H = 240


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

        # Y aquí si choca contra la parte izquierda y derecha
        if self.pos_x - 6 <= 0:
            self.speed_x = self.speed
        elif self.pos_x + 6 >= SCREEN_W:
            self.speed_x = self.speed * -1

        # Y finalmente movemos la bola
        self.pos_x += self.speed_x
        self.pos_y += self.speed_y


class Pyng():
    def __init__(self):
        self.paddle1 = Paddle(8, 8, 48)
        self.paddle2 = Paddle(SCREEN_W - 16, 8, 48)
        self.ball = Ball()
        self.ball.initMove()

        pyxel.init(SCREEN_W, SCREEN_H, 'Pyng')
        pyxel.run(self.update, self.draw)

    def draw(self):
        pyxel.cls(0)
        self.paddle1.draw()
        self.paddle2.draw()
        self.ball.draw()

    def update(self):
        if pyxel.btn(pyxel.KEY_Q):
            self.paddle1.move('up')
        elif pyxel.btn(pyxel.KEY_A):
            self.paddle1.move('down')
        else:
            self.paddle1.move(None)
        
        #if pyxel.btn(pyxel.KEY_SPACE) and self.ball.speed_x == 0:
        #    self.ball.initMove()

        if self.paddle1.checkCollide(self.ball):
            self.ball.changeDir('right')

        if self.paddle2.checkCollide(self.ball):
            self.ball.changeDir('left')

        if self.ball.pos_y < self.paddle2.center:
            self.paddle2.move('up')
        elif self.ball.pos_y > self.paddle2.center:
            self.paddle2.move('down')

        self.ball.update()


Pyng()
{% endhighlight %}
</details>

Y esto es todo por el momento. En la siguiente entrega enseñare como añadir el sistema de puntuación, reinicio del juego tras cada punto, etc. Hasta pronto