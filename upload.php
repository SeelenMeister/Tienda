<?php

// funciona OK. recibe archivos y string OK, Validaciones OK.

//tomo el valor de un elemento de tipo texto del formulario
$cadenatexto = $_POST["cadenatexto"];
echo "Escribió en el campo de texto: " . $cadenatexto . "<br><br>";

//datos del arhivo
$nombre_archivo = $_FILES['userfile']['name'];
$tipo_archivo = $_FILES['userfile']['type'];
$tamano_archivo = $_FILES['userfile']['size'];
	
//compruebo si las características del archivo son las que deseo
if (!((strpos($tipo_archivo, "jpg") || strpos($tipo_archivo, "jpeg")) && ($tamano_archivo < 3000000))) {
   	echo "La extensión o el tamaño de los archivos no es correcta. <br><br><table><tr><td><li>Se permiten archivos .jpeg o .jpg<br><li>se permiten archivos de 3 Mb máximo.</td></tr></table>";
}else{
   	if (move_uploaded_file($_FILES['userfile']['tmp_name'],  $nombre_archivo)){
      		echo "El archivo ha sido cargado correctamente.";
   	}else{
      		echo "Ocurrió algún error al subir el fichero. No pudo guardarse.";
   	}
}

?>

