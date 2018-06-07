<?php
include('simple_html_dom.php');

function curlValidation($url){
    $handle = curl_init($url);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($handle);
    $httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);

    curl_close($handle);

    if($httpCode == 404 || !$response){
        return 404;
    } else {
        return $response;
    }
}

$html = str_get_html(curlValidation('https://sistemas.unesp.br/arex/publico/AREX.verResultadoEdital.action'));

class Result {
    public $id;
    public $name;
    public $link;
}

$results = array();

if("$html" != 404){
    $table = $html->find('table');
    foreach($table[1]->children[1]->children as $row){
        $temp = new Result();
        $temp->id = $row->children[0]->children[0]->innertext;
        $temp->name = $row->children[1]->children[0]->innertext;
        $temp->link = $row->children[1]->children[0]->href;
        array_push($results, $temp);
    }
    $html->clear();
    echo json_encode($results);
} else {
    echo 404;
}
?>