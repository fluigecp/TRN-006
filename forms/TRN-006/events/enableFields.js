function enableFields(form) {
    var activity = getValue('WKNumState');

    /** Life Cycle */

    if ( activity == 8 || activity == 26 ) {
        form.setEnabled('avaliadorTreinamento', false, true);
        form.setEnabled('aprovadorTreinamento', false, true);
        if ( activity != 26 ) {
            form.setEnabled('dataRealizacao', false, true);
            form.setEnabled('nomeParticipante', false, true);
            form.setEnabled('matricula', false, true);
            form.setEnabled('area', false, true);
            form.setEnabled('cursoTreinamento', false, true);
            form.setEnabled('instituicao', false, true);
            form.setEnabled('cargaHoraria', false, true);
            form.setEnabled('classificacaoCurso', false, true);
        }
    }
    
    if ( activity != 26 ) {
        form.setEnabled('pergunta1', false, true);
        form.setEnabled('pergunta2', false, true);
        form.setEnabled('pergunta3_organizacao', false, true);
        form.setEnabled('pergunta3_cargaHoraria', false, true);
        form.setEnabled('pergunta3_material', false, true);
        form.setEnabled('pergunta3_local', false, true);
        form.setEnabled('pergunta4_comunicacao', false, true);
        form.setEnabled('pergunta4_dominio', false, true);
        form.setEnabled('pergunta4_relacionamento', false, true);
        form.setEnabled('pergunta4_didatica', false, true);
        form.setEnabled('pergunta4_habilidade', false, true);
        form.setEnabled('pergunta5', false, true);
    }

    if ( activity == 56 ) {
        form.setEnabled('dataInicio', false, true);
        form.setEnabled('dataTermino', false, true);
        form.setEnabled('nomeParticipante', false, true);
        form.setEnabled('matricula', false, true);
        form.setEnabled('area', false, true);
        form.setEnabled('cursoTreinamento', false, true);
        form.setEnabled('instituicao', false, true);
        form.setEnabled('cargaHoraria', false, true);
        form.setEnabled('classificacaoCurso', false, true);
        form.setEnabled('avaliadorTreinamento', false, true);
        form.setEnabled('aprovadorTreinamento', false, true);
    }
}
