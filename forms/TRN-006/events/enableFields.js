function enableFields(form) {
    var activity = getValue('WKNumState');

    /** Life Cycle */

    if (activity == 5 || activity == 8 || activity == 26) {
        form.setEnabled('nomeParticipante', false, true);
        form.setEnabled('matricula', false, true);
        form.setEnabled('area', false, true);
        form.setEnabled('cursoTreinamento', false, true);
        form.setEnabled('instituicao', false, true);
        form.setEnabled('dataRealizacao', false, true);
        form.setEnabled('cargaHoraria', false, true);
    }
}
