function ajaxRequest(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            handleResponse(this.responseText);
        }
    }
    xhttp.open('get', 'scripts/script.php', true);
    xhttp.send();
}

function handleResponse(response){
    let container = document.getElementById('container--edital');
    let loader = document.getElementById('icon--loader');
    container.removeChild(loader);
    if(response != 404){
        JSON.parse(response).forEach(element => {
            container.innerHTML += "<strong style='font-size: 12px'>" + 
                                    element.id + " - " + element.name + "</strong><br><br>";
            container.innerHTML += "<a " + 
                                    "href=https://sistemas.unesp.br/arex/publico/AREX.verResultadoEdital.action?" 
                                    + element.link.match(/txt(.*)\w/g) + " target='_blank'>" 
                                    + "Mais informações</a><br><br><br>";                
        });
    } else {
        container.innerHTML += "<span>Não foi possivel se conectar ao servidor, tente novamente mais tarde.</span>";
    }
}

ajaxRequest();