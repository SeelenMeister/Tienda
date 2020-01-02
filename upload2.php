<?php
// funciona OK. Guarda multiples ficheros en dir personalizado y cambia su nombre.
$fecha = date("Y-m-d");

foreach ($_FILES["imágenes"]["error"] as $clave => $error) {
    if ($error == UPLOAD_ERR_OK) {
        $nombre_tmp = $_FILES["imágenes"]["tmp_name"][$clave];
        // basename() puede evitar ataques de denegació del sistema de ficheros;
        // podría ser apropiado más validación/saneamiento del nombre de fichero
        $nombre = basename($fecha.$_FILES["imágenes"]["name"][$clave]);
        move_uploaded_file($nombre_tmp, "datos/$nombre");
    }
}
?>
