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
    // Informações do participante e treinamento.
    form.setValue("custom_0", form.getValue("nomeParticipante") );
    form.setValue("custom_1", form.getValue("matricula") );
    form.setValue("custom_2", form.getValue("area") );
    form.setValue("custom_3", form.getValue("cursoTreinamento") );
    form.setValue("custom_4", form.getValue("classificacaoCurso") );
    form.setValue("custom_5", form.getValue("instituicao") );
    form.setValue("custom_6", form.getValue("cargaHoraria") );
    form.setValue("custom_7", form.getValue("dataInicio") );
    form.setValue("custom_8", form.getValue("dataTermino") );
    // Informações avaliação.
    form.setValue("custom_10", form.getValue("pergunta1") );
    form.setValue("custom_11", form.getValue("pergunta2") );
    form.setValue("custom_12", form.getValue("pergunta3_organizacao") );
    form.setValue("custom_13", form.getValue("pergunta3_cargaHoraria") );
    form.setValue("custom_14", form.getValue("pergunta3_material") );
    form.setValue("custom_15", form.getValue("pergunta3_local") );
    form.setValue("custom_16", form.getValue("pergunta4_comunicacao") );
    form.setValue("custom_17", form.getValue("pergunta4_dominio") );
    form.setValue("custom_18", form.getValue("pergunta4_relacionamento") );
    form.setValue("custom_19", form.getValue("pergunta4_didatica") );
    form.setValue("custom_20", form.getValue("pergunta4_habilidade") );
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