<?php

include('database.php');

$id = $_POST['id'];

$query = "SELECT * FROM productos WHERE id = $id";
    $result = mysqli_query($conn, $query);
    if(!$result){
        die('La consulta List falló').mysqli_error($conn);
    }
    
    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array (
            'id' => $row['id'],
            'p_name' => $row['p_name'],
            'p_desc' => $row['p_desc'],
            'img' => $row['img'],
            'price' => $row['price'],
            'offer' => $row['offer'],
        );
    }
    $json_string = json_encode($json);
    echo $json_string;


?>