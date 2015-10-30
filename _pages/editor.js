




/*
     FILE ARCHIVED ON 8:05:53 Jul 5, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 11:08:23 Mar 5, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
// Funciones del editor de puzzles del EntroPipe
// Autor: Z80ST-Software
// z80st.software@gmail.com
// Enero 2013: Primera versión
// Modificado por Alfonso Saavedra "Son Link" y lanzado bajo licencia GPL 3

// Variables generales

var W = 8; // Ancho por defecto
var H = 6; // Alto por defecto

var aPlantilla = new Array(W*H); // Array con la plantilla del puzzle
var tileNames = new Array ("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"); // Nombres de los tiles

// Carga de las imagenes en la cache del navegador

var imArray = new Array(16); // Declaramos el array de imagenes

for ( x = 0 ; x < 16 ; x++ )
  {
    imArray[x] = new Image(24,24);
    imArray[x].src = "img/" + tileNames[x] + ".png";
  }

// Inicializacion
function initEditor()
{
  initPlantilla();         // Inicializamos el array con la plantilla
  tileSelector();          // Cambiamos el color del borde de todos los tiles seleccionables
  currentTile = 0;         // Indicamos que el tile seleccionado es el 0
  selectTile(document.t0); // Seleccionamos graficamente el tile 0
  setCasilla(document.c0); // inicializamos la cadena del puzzle
}

// Dibujado de la plantilla del puzzle
function writePlantilla()
{
  var casilla = 0;
  var table='';
  //document.write("<h3>Size = "+W+"x"+H);
  //document.write("<table border=\"0\" id=\"plantilla\">");
  for ( y = 0 ; y < H ; y++ )
    {
      table += "<tr>";
      for ( x = 0 ; x < W ; x++ )
        {
          table += '<td><img id="c'+(casilla++)+'" src="img/0.png" onClick="setCasilla(this);return true;"></td>';
        }
      table += "</tr>";
    }
	document.getElementById('plantilla').innerHTML = table;
}



// Funcion que inicializa la plantilla del puzzle
function initPlantilla()
{
  for ( x = 0 ; x < W*H ; x++ )
    {
      aPlantilla[x]=0;
    }
  viewPlantilla();
}

// Funcion que convierte la plantilla a cadena de valores hexadecimales
function valoresPlantilla()
{
	cadena = ''
  for ( x = 0 ; x < W*H ; x=x+2 )
    {
      cadena = cadena + aPlantilla[x] + aPlantilla[x+1];
    }
  return ( cadena );
}
// Funcion que carga una cadena de valores hexadecimales en la plantilla
function lPuzzle()
{
  var aux = new Array(W*H);
  var cargados = 0;
  loading = document.getElementById("loadArea");
  for ( x = 0 ; (x < loading.value.length) && (cargados < W*H) ; x++ )
    {
      c = loading.value.substr(x,1);
      if ( ( c >= "0" && c <= "9" ) || ( c >= "A" && c<="F" ) )
        {
          aux[cargados] = c;
          cargados++;
        }
    }
  if ( cargados == W*H )
    {
      aPlantilla = aux;
      viewPlantilla();
      alert ( "load complete" );
    }
  else
    {
      alert ( "load failure "+cargados );
    }
  loading.value = "";
}

// Funcion mod mejorada
function mod(x,y)
{
  while ( x >= y ) { x = x - y }
  while ( x < 0 ) { x = x + y }
  return ( x );
}

// Funcion que mueve toda la plantilla hacia arriba
function shiftUp()
{
  var aux = new Array(W);
  for ( x = 0 ; x < W ; x++ )
    {
      aux[x]=aPlantilla[x];
    }
  for ( x = 0 ; x < W*(H-1) ; x++ )
    {
      aPlantilla[x] = aPlantilla[mod(x+W,W*H)];
    }
  for ( x = 0 ; x < W ; x++ )
    {
      aPlantilla[x+(W*(H-1))] = aux[x];
    }
  viewPlantilla();
}

// Funcion que mueve toda la plantilla hacia abajo
function shiftDown()
{
  var aux = new Array(W);
  for ( x = 0 ; x < W ; x++ )
    {
      aux[x]=aPlantilla[x+(W*(H-1))];
    }
  for ( x = W*H-1 ; x >= W ; x-- )
    {
      aPlantilla[x] = aPlantilla[mod(x-W,W*H)];
    }
  for ( x = 0 ; x < W ; x++ )
    {
      aPlantilla[x] = aux[x];
    }
  viewPlantilla();
}

// Funcion que mueve toda la plantilla hacia la izquierda
function shiftLeft()
{
  var aux = new Array(H);
  for ( x = 0 ; x < H ; x++ )
    {
      aux[x]=aPlantilla[x*W];
    }
  for ( x = 0 ; x < W*H ; x++ )
    {
      if ( mod(x,W) < W-1 )
	{
	  aPlantilla[x] = aPlantilla[x+1];
	}
    }
  for ( x = 0 ; x < H ; x++ )
    {
      aPlantilla[x*W+(W-1)] = aux[x];
    }
  viewPlantilla();
}

// Funcion que mueve toda la plantilla hacia la derecha
function shiftRight()
{
  var aux = new Array(H);
  for ( x = 0 ; x < H ; x++ )
    {
      aux[x]=aPlantilla[x*W+(W-1)];
    }
  for ( x = W*H-1 ; x > 0 ; x-- )
    {
      if ( mod(x,W) > 0 )
	{
	  aPlantilla[x] = aPlantilla[x-1];
	}
    }
  for ( x = 0 ; x < H ; x++ )
    {
      aPlantilla[x*W] = aux[x];
    }
  viewPlantilla();
}

// Funcion que actualiza una casilla
function setCasilla(casilla)
{
  aPlantilla[casilla.id.substring(1,casilla.id.length)]=currentTile;
  viewPlantilla();
}

// Funcion que selecciona un tile
function selectTile(tile)
{
  // Apagamos el tile actualmente seleccionado
  oldtile=document.getElementById("t"+currentTile);
  oldtile.style.borderColor="#9bbc0f";
  // Encendemos el nuevo tile seleccionado
  tile.style.borderColor="#0f380f";
  currentTile=tile.id.substring(1,tile.id.length);
}

// Funcion que cambia el color del borde de todos los tiles
function tileSelector()
{
  var xH = "";
  for ( x = 0 ; x < 16 ; x++ )
    {
      xH = tileNames[x];
      tile=document.getElementById("t"+xH);
      tile.style.borderColor="#9bbc0f";
      tile.border="3";
    }
}

// Funciones de check para las cuatro direcciones
function checkUp(tile) { return ( "13579BDF".match(tile) ); }
function checkDown(tile) { return ( "4567CDEF".match(tile) ); }
function checkRight(tile) { return ( "2367ABEF".match(tile) ); }
function checkLeft(tile) { return ( "89ABCDEF".match(tile) ); }

// Funcion que actualiza la plantilla en la pantalla
function viewPlantilla()
{
  var casilla;
  for ( x = 0 ; x < W*H ; x++ )
    {
      casilla = document.getElementById("c"+x);
      casilla.src="./img/" + aPlantilla[x] + ".png";
    }
  // Calculamos la entropía del puzzle
  var entropy = 0;
  var entropyLocal;
  for ( y = 0 ; y < H ; y++ )
    for ( x = 0 ; x < W ; x++ )
      {
      	entropyLocal = 0;
      	if  ( ( checkUp(aPlantilla[y*W+x]) ) && ( ( y == 0 ) || ( !checkDown(aPlantilla[(y-1)*W+x]) ) ) ) { entropyLocal++ }
      	if  ( ( checkDown(aPlantilla[y*W+x]) ) && ( ( y == H-1 ) || ( !checkUp(aPlantilla[(y+1)*W+x]) ) ) ) { entropyLocal++ }
      	if  ( ( checkRight(aPlantilla[y*W+x]) ) && ( ( x == W-1 ) || ( !checkLeft(aPlantilla[y*W+x+1]) ) ) ) { entropyLocal++ }
      	if  ( ( checkLeft(aPlantilla[y*W+x]) ) && ( ( x == 0 ) || ( !checkRight(aPlantilla[y*W+x-1]) ) ) ) { entropyLocal++ }
      	entropy += entropyLocal;
      }

  // actualizamos la cadena con la entropía del puzzle
  var spn = document.getElementById("entropy");
  spn.innerHTML = "<b>Puzzle Entropy: " + entropy + "</b>";
  // actualizamos la cadena con el contenido del array
  var spn = document.getElementById("final");
  spn.value = valoresPlantilla();
  // if ( entropy == 0 ) spn.style.visibility = "visible";
  // else spn.style.visibility = "hidden";
}

//

// Funcion para abrir una ventana nueva
function abrirVentana(direccion,titulo,w,h) {

var windowprops ="top=0,left=0,toolbar=no,location=no,status=no, menubar=no,scrollbars=no, resizable=no,width=" + w + ",height=" + h;

window.open(direccion,titulo,windowprops);
} 

function gridSize(){
	// change the game grid size
	v = document.getElementById('gridsize').value.split('x');
	W = v[0];
	H = v[1]
	writePlantilla()
	document.getElementById("final").value = valoresPlantilla()
}

document.addEventListener('DOMContentLoaded', function(){ 
    gridSize()
}, false);
