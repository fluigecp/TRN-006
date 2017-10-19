function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    var atividade = getValue('WKNumState');

    //HISTÓRICO NO EVENTO
    if (getValue("WKCompletTask") == "true") {
        atualizaHistorico("obsHistorico");
        log.info("HISTÓRICO ATUALIZADO");
    } else {
        log.info("HISTÓRICO NÃO ATUALIZADO");
    }

    // verificando anexo
    if (atividade == 5) {
        if (!getAttachments(5, 1, "|pdf|png|jpg|jpeg| ")) {
            throw (" Anexar: \nCertificado.");
        }
    }

    /*if (atividade == 26) {
        if (!getAttachments(26, 1, "|pdf|png|jpg|jpeg| ")) {
            throw (" Anexar: \nAvaliação de reação.");
        }
    }*/
}

/** Funções utilizadas no histórico */

function atualizaHistorico(name) {
    if (name == "") {
        return;
    }
    var mensagem = hAPI.getCardValue(name);

    if (mensagem == null || mensagem == "") {
        return;
    }

    var ultimaAtualizacao = hAPI.getCardValue("ultimaAtualizacao") == "" ? " " : hAPI.getCardValue("ultimaAtualizacao");
    var historico = hAPI.getCardValue("historico") == "" ? " " : hAPI.getCardValue("historico");

    var usuarioLogado = "";
    try {
        usuarioLogado = usuario();
    } catch (err) {
        usuarioLogado = "Erro ao buscar usuário";
    }

    var htmlHistoricoNovo = dataHoraAtual() + " - " + usuarioLogado + "  \r\n" + mensagem + "\r\n \r\n";

    hAPI.setCardValue("ultimaAtualizacao", htmlHistoricoNovo);
    hAPI.setCardValue("historico", ultimaAtualizacao + historico);
    hAPI.setCardValue(name, "");
}


function dataHoraAtual() {
    var dt = new Date();
    var txtData = (dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate()) + "/" + ((dt.getMonth() + 1) < 10 ? "0" + (dt.getMonth() + 1) : (dt.getMonth() + 1)) + "/" + dt.getFullYear() + " - " + (dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours()) + ":" + (dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes());
    return txtData;
}


function usuario() {
    var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
    var dsUser = DatasetFactory.getDataset("colleague", ["colleagueName"], [c1], null);
    return dsUser.getValue(0, "colleagueName");
}

/* Fim - Histórico */

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @activity será o número da atividade que deseja validar a inserção dos anexos. Valor do tipo int                                                                                                                 //
// @numAnexos é a quantidade de anexos necessário para liberar a atividade, ou seja, quantos anexos devem ser anexado na atividade solicitada                                                                       //
// @formato são as extensões permitidas na atividade que está sendo verificada. Deverá ser informado entre 'pipe' (|pdf|png|). Se não tiver uma validação de extensão, deixar em branco pois está sendo tratado.    //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAttachments(activity, numAnexos, formato) {
    //Implementação da função indexOf() para comparação de strings
    if (!String.prototype.includes) {
        String.prototype.includes = function () {
            'use strict';
            return String.prototype.indexOf.apply(this, arguments) !== -1;
        };
    }
    var countAnexos = 0;
    var formatos = formato.toLowerCase();
    if (activity == 0) {
        if (formatos == '') {
            if (hAPI.listAttachments().size() < numAnexos) {
                return false;
            }
        } else {
            var anexos = hAPI.listAttachments();
            for (var j = 0; j < anexos.size(); j++) {
                var anexo = anexos.get(j);
                var docName = (anexo.getDocumentDescription()).toLowerCase();
                var docFormato = docName.split('.');
                var docFormater = (docFormato.reverse())[0];
                var isFormat = formatos.contains(docFormater);
                if (isFormat == true) {
                    countAnexos++;
                }
            }
            if (countAnexos >= numAnexos) {
                return true;
            }
            return false;
        }
    } else {
        var c1 = DatasetFactory.createConstraint('processAttachmentPK.processInstanceId', getValue("WKNumProces"), getValue("WKNumProces"), ConstraintType.MUST);
        var anexos = DatasetFactory.getDataset('processAttachment', null, [c1], null);
        for (var i = 0; i < anexos.rowsCount; i++) {
            var docId = anexos.getValue(i, 'documentId');
            var c2 = DatasetFactory.createConstraint('documentPK.documentId', docId, docId, ConstraintType.MUST);
            var c3 = DatasetFactory.createConstraint('versionActive', 'true', 'true', ConstraintType.MUST);
            var dsDocument = DatasetFactory.getDataset('document', null, [c2, c3], null);
            var docType = parseInt(dsDocument.getValue(0, 'documentType'));
            var docName = (dsDocument.getValue(0, 'documentDescription')).toLowerCase();
            if (docType == 7) {
                var c4 = DatasetFactory.createConstraint('processHistoryPK.movementSequence', anexos.getValue(i, "originalMovementSequence"), anexos.getValue(i, "originalMovementSequence"), ConstraintType.MUST);
                var c5 = DatasetFactory.createConstraint('processHistoryPK.processInstanceId', getValue("WKNumProces"), getValue("WKNumProces"), ConstraintType.MUST);
                var c6 = DatasetFactory.createConstraint('processHistoryPK.companyId', anexos.getValue(i, "processAttachmentPK.companyId"), anexos.getValue(i, "processAttachmentPK.companyId"), ConstraintType.MUST);
                var c7 = DatasetFactory.createConstraint('stateSequence', activity, activity, ConstraintType.MUST);
                var c8 = DatasetFactory.createConstraint('active', 'true', 'true', ConstraintType.MUST);
                var processHistory = DatasetFactory.getDataset('processHistory', null, [c4, c5, c6, c7, c8], null);
                var docFormato = (String(docName)).split('.');
                var filterStr = docFormato.reverse()[0];
                var isFormat = formatos.includes(filterStr);
                if (formatos != '') {
                    if (processHistory.rowsCount > 0 && isFormat == true) {
                        countAnexos++;
                    }
                } else {
                    if (processHistory.rowsCount > 0) {
                        countAnexos++;
                    }
                }
            }
        }
        if (countAnexos >= numAnexos) {
            return true;
        }
        return false;
    }
}
