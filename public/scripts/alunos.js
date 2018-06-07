function ajaxRequestGet(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            updateTable(this.responseText);
        }
    }
    xhttp.open('get', 'scripts/get_table.php', true);
    xhttp.send();
}

function ajaxRequestSend(ra, name, curso, edital, pais, cidade, universidade, ida, volta){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            ajaxRequestGet();
        }
    }
    xhttp.open('get', 'scripts/reg_student.php?ra=' + ra + '&nome=' + name + '&curso='
                + curso + '&edital=' + edital + '&pais=' + pais + '&cidade='
                + cidade + '&universidade=' + universidade + '&ida=' + ida + '&volta=' + volta, true);
    xhttp.send();
}

function updateTable(response){
    const res = JSON.parse(response);
    const table = document.getElementsByTagName('table')[0];
    const tbody = document.createElement('tbody');

    if(res != ''){
        res.forEach(obj => {
            const row = document.createElement('tr');
            row.innerHTML += '<td>' + obj.ra + '</td>';
            row.innerHTML += '<td>' + obj.nome + '</td>';
            row.innerHTML += '<td>' + obj.curso + '</td>';
            row.innerHTML += '<td>' + obj.edital + '</td>';
            row.innerHTML += '<td>' + obj.paisdestino + '</td>';
            row.innerHTML += '<td>' + obj.cidadedestino + '</td>';
            row.innerHTML += '<td>' + obj.universidade + '</td>';
            row.innerHTML += '<td>' + obj.dataida + '</td>';
            row.innerHTML += '<td>' + obj.datavolta + '</td>';
            row.innerHTML += "<td style='cursor: pointer' onclick='removeRow(this)'><strong>X</strong></td>"
            tbody.appendChild(row);
            table.appendChild(tbody);
        });
    }

    table.children[1].parentNode.removeChild(table.children[1]);
}

function clearInput(){
    const form = document.getElementsByClassName('input--aluno');

    for(let i = 0; i < form.length; i++){
        form[i].value = "";
    }
}

function send(){
    const form = document.getElementsByClassName('input--aluno');
    const errorMsg = document.getElementsByClassName('text--error')[0];

    for(let i = 0; i < form.length; i++){
        if(form[i].value == ""){
            errorMsg.classList.remove('status--hidden');
            return 0;
        }
    }

    errorMsg.classList.add('status--hidden');
    ajaxRequestSend(form[0].value, form[1].value, form[2].value, form[3].value,
                    form[4].value, form[5].value, form[6].value, form[7].value, form[8].value);

}

function removeRow(e){
    console.log(e.parentElement.firstChild.innerText);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            ajaxRequestGet();
        }
    }
    xhttp.open('get', 'scripts/remove_student.php?ra=' + e.parentElement.firstChild.innerText, true);
    xhttp.send();
}

ajaxRequestGet();