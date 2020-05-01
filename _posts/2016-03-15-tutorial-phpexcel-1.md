---
layout: post
title: PHPExcel (1ª parte)
tags:
- PHP
- excel
- OpenDocument
- tutoriales
date: 2016-03-15
category: tutoriales
img_dest: phpexcel.png
---

**PHPExcel** es una librería para **PHP** que nos permite crear hojas de **Excel (.xlsx)**, **Open/Libreoffice (.ods)**, **HTML** y otros, ideal para, por ejemplo, exportar datos de la tabla de un cliente, calcular por ejemplo unos gastos, etc

Hay otras alternativas más livianas, pero esta es la más completa, ya que nos permite cambiar los estilos, añadir imágenes, formulas, etc.

PHPExcel es de código abierto, bajo la licencia LGPL, por lo que podremos usarlo sin ningún tipo de restricción.

### Descarga:

Para poder usar PHPExcel lo primero que necesitamos es tener habilitadas las siguientes librerías de PHP:

* XMLRPC
* ZIP
* GD2

Ahora descargamos desde su [repositorio](https://github.com/PHPOffice/PHPExcel/releases) la ultima versión estable (a la hora de escribir este tutorial es la 1.8.1)

Una vez descargada veremos varios ficheros y carpetas, para usarlo solo necesitaremos la carpeta Classes, el resto son ejemplos.

### Primer ejemplo:

Vamos a crear un primer script PHP para ir probando algunas funciones.

Lo primero que tendremos que hacer es definir las cabeceras para que el navegador crea que lo que se esta pidiendo es una hoja de Excel.

```php?start_inline=1
header('Content-Type: application/vnd.openXMLformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="myfile.xlsx"');
header('Cache-Control: max-age=0');
```

Para OpenDocument:

```php?start_inline=1
header('Content-Type: application/vnd.oasis.opendocument.spreadsheet');
header('Content-Disposition: attachment;filename="01simple.ods"');
```

Ahora incluimos la clase de PHPExcel e iniciamos la clase:

```php?start_inline=1
include 'PHPExcel/Classes/PHPExcel.php';
$objPHPExcel = new PHPExcel();
$sheet = $objPHPExcel->getActiveSheet();
```

Vayamos por linea:

* En la primera incluimos la clase. Cambia la ruta a donde este ubicada la carpeta Classes que descargamos antes.
* En la segunda creamos una instancia de la clase.
* En la tercera guardamos una instancia de la hoja activa (en este caso la primera, que es la que crea por defecto. Si queremos más hojas podremos ir cambiando entre ellas)

Ahora para escribir algo en una celda usaremos lo siguiente:

```php?start_inline=1
$sheet->setCellValue('A1', 'Hola Mundo');
```

El primer valor que le pasamos es la celda donde queremos que escriba, y el segundo lo que queremos que escriba. **OJO:** las letras de las celdas deben de estar en **mayusculas**

Si lo que queremos es escribir una linea con los datos de un array, PHPExcel cuanta con una función para facilitarnos la tarea. Por ejemplo:

```php?start_inline=1
$d = {1,2,3,4,5,6}
$sheet->fromArray($d, NULL, 'A2')
```

En este caso tendremos algo como lo siguiente:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| 1 | 2 | 3 | 4 | 5 | 6 |


Ahora vamos a generar el archivo para descargarlo:

```php?start_inline=1
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
ob_end_clean();
$objWriter->save('php://output');
exit;
```
Para Opendocument reemplazamos **Excel2007** por **OpenDocument**

En la primera linea creamos una instancia de la clase encargada de escribir la hoja. El primer parámetro es la instancia de la clase que hemos estado usando, mientras que la segunda indicara el formato de salida

La segunda linea limpia la salida del buffer. Esto es necesario ya que en algunos casos en caso de no hacerlo genera una hoja corrupta.

La tercera linea guarda la pagina, en este caso directamente a la salida de PHP. Otra opción es cambiarla por una ruta para guardarla en el servidor.

Y aquí acaba esta primera parte del tutorial. Espero que os sirva.
