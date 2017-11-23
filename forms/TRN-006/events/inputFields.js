function inputFields(form){
    var numProcess = getValue("WKNumProces");
    var activity = parseInt(getValue('WKNumState'));
    form.setValue("numProcess", numProcess);
    form.setValue("campoDescritor", form.getValue("nomeParticipante") + " - " + form.getValue("cursoTreinamento") );
    if ( activity == 8 ) {
        var aprovada = form.getValue("aprovarAvaliacao");
        if ( aprovada == "Sim" ) {
            var date = getCurrentDate();
            form.setValue("dataAprovacao", date);
        }
    }
}

function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    return dd + "/" + mm + '/' + yyyy;
}