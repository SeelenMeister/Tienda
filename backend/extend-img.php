<?php

include('database.php');

$id = $_POST['id'];

$query = "SELECT * FROM p_img WHERE id = $id";
    $result = mysqli_query($conn, $query);
    if(!$result){
        die('La consulta List falló').mysqli_error($conn);
    }
    
    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array (
            'url' => $row['url'],
        );
    }
    $json_string = json_encode($json);
    echo $json_string;


?>