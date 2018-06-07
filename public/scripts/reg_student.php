<?php 
    $db_conn = pg_connect("host=localhost dbname=sample user=postgres password=root")
               or die("Não foi possível conectar ao banco de dados ".pg_last_error());

    $query = "INSERT INTO alunos VALUES ("
                                        .$_GET["ra"].
                                        ",'"
                                        .$_GET["nome"].
                                        "','"
                                        .$_GET["curso"].
                                        "',"
                                        .$_GET["edital"].
                                        ",'"
                                        .$_GET["pais"].
                                        "','"
                                        .$_GET["cidade"].
                                        "','"
                                        .$_GET["universidade"].
                                        "','"
                                        .$_GET["ida"].
                                        "','"
                                        .$_GET["volta"].
                                        "')";
    $result = pg_query($query) or die("Não foi possível executar o query".pg_last_error());

    pg_close($db_conn);

    echo $result;
?>