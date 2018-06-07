<?php 
    $db_conn = pg_connect("host=localhost dbname=sample user=postgres password=root")
               or die("Não foi possível conectar ao banco de dados ".pg_last_error());

    $query = "SELECT * FROM alunos";
    $result = pg_query($query) or die("Não foi possível executar o query: ".pg_last_error());
    $array = pg_fetch_all($result);

    echo json_encode($array);

    pg_close($db_conn);
?>