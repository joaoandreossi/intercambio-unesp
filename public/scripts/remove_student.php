<?php 
    $db_conn = pg_connect("host=localhost dbname=sample user=postgres password=root")
               or die("Não foi possível conectar ao banco de dados ".pg_last_error());

    $query = "DELETE FROM alunos WHERE ra=".$_GET["ra"];
    $result = pg_query($query) or die("Não foi possível executar o query: ".pg_last_error());

    pg_close($db_conn);
?>