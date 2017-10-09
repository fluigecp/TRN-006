function createDataset(fields, constraints, sortFields) {
    try {
        // Dataset
        var customDataset = DatasetBuilder.newDataset();
        /**
         *  Lists
         *  filtersTRN002 = Dataset Propor treinamentos anuais
         *  filtersTRN004 = Dataset Requisitar treinamentos anuais
         */
        var arrayList = [],
            filtersTRN002 = [],
            filtersTRN002Table = [],
            filtersTRN004 = [];
        // Filters
        //var filtroAno = "", filtroOrigem = "", filtroArea = "", filtroDepartamento = "", filtroClassificacao = "";
        var filterPropor = "",
            filterProporTable = "",
            filterRequisitar = "";
        // Helpers
        var sqlLimit = false,
            limitReturn = 0;

        // Dataset Struture
        customDataset.addColumn("datasetOrigem");
        customDataset.addColumn("areaOrcamento");
        customDataset.addColumn("departamento");
        customDataset.addColumn("anoVigencia");
        customDataset.addColumn("dataAbertura");
        customDataset.addColumn("treinamento");
        customDataset.addColumn("entidadeSugerida");
        customDataset.addColumn("cargaHorariaEstimada");
        customDataset.addColumn("quantidadeParticipantes");
        customDataset.addColumn("participantes");
        customDataset.addColumn("classificacaoTreinamento");
        customDataset.addColumn("valorEstimado");
        customDataset.addColumn("valorReal");
        customDataset.addColumn("documentid");
        customDataset.addColumn("numSolic");
        customDataset.addColumn("statusTreinamento");
        customDataset.addColumn("avaliacaoReacao");
        customDataset.addColumn("avaliacaoEficacia");

        // check for filters
        if (constraints !== null && constraints !== undefined && constraints.length > 0) {
            // log filters
            log.warn("%%% CONSTRAINTS: " + constraints);
            // iterate all filters, configure all constraints
            for (var index = 0; index < constraints.length; index++) {
                if (constraints[index].fieldName == "sqlLimit") {
                    sqlLimit = true;
                    limitReturn = parseInt(constraints[index].initialValue);
                }
                if (constraints[index].fieldName == "datasetOrigem") {
                    log.warn("%%% CONSTRAINTS(datasetOrigem): " + constraints[index]);
                    filterPropor = "propor_treinamentos_anuais";
                    filterRequisitar = "requisicao_treinamento"
                }
                if (constraints[index].fieldName == "anoVigencia") {
                    log.warn("%%% CONSTRAINTS(anoVigencia): " + constraints[index]);
                    filterPropor = "anoVigencia";
                    filterRequisitar = "anoVigencia";
                }
                if (constraints[index].fieldName == "areaOrcamento") {
                    log.warn("%%% CONSTRAINTS(areaOrcamento): " + constraints[index]);
                    filterPropor = "areaOrcamento";
                    filterRequisitar = "areaOrcamento";
                }
                if (constraints[index].fieldName == "departamento") {
                    log.warn("%%% CONSTRAINTS(departamento): " + constraints[index]);
                    filterPropor = "departamento";
                    filterRequisitar = "departamento";
                }
                if (constraints[index].fieldName == "classificacaoTreinamento") {
                    log.warn("%%% CONSTRAINTS(classificacaoTreinamento): " + constraints[index]);
                    filterProporTable = "classificacaoTbTreinamentos";
                    filterRequisitar = "classificacaoCurso";
                }
                if (constraints[index].fieldName == "statusTreinamento") {
                    log.warn("%%% CONSTRAINTS(statusTreinamento): " + constraints[index]);
                    filterProporTable = "statsTbTreinamentos";
                }
                if (constraints[index].fieldName == "treinamento") {
                    log.warn("%%% CONSTRAINTS(treinamento): " + constraints[index]);
                    filterPropor = "treinamentoTbTreinamentos";
                    filterRequisitar = "treinamentoSolicitado";
                }
                if (filterPropor != "")
                    filtersTRN002.push(makeFilter(filterPropor, true, constraints[index].initialValue, constraints[index].finalValue));
                if (filterRequisitar != "")
                    filtersTRN004.push(makeFilter(filterRequisitar, true, constraints[index].initialValue, constraints[index].finalValue));
                if (filterProporTable != "")
                    filtersTRN002Table.push(makeFilter(filterProporTable, true, constraints[index].initialValue, constraints[index].finalValue));
            }
            log.warn("%%% FIM TRATAMENTO 002: " + filtersTRN002);
            log.warn("%%% FIM TRATAMENTO 004: " + filtersTRN004);
            log.warn("%%% FIM TRATAMENTO Table004: " + filtersTRN002Table);
        }

        if (filtersTRN002.length > 0 || filtersTRN002Table.length > 0 || filtersTRN004.length > 0) {

            //constraint para obter todos os dados do dataset ativos
            var metadata = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
            filtersTRN004.push(metadata);
            filtersTRN002.push(metadata);
            filtersTRN002Table.push(metadata);
            //obtendo todas as lotações em ordem crescente(filtro pelo documentid)
            var treinamentosRequisicao = DatasetFactory.getDataset("requisicao_treinamento", null, filtersTRN004, null);
            for (var i = 0; i < treinamentosRequisicao.rowsCount; i++) {
                // requisitar code!
                customDataset.addRow(new Array("requisicao_treinamento",
                    treinamentosRequisicao.getValue(i, "areaOrcamento"),
                    treinamentosRequisicao.getValue(i, "departamento"),
                    treinamentosRequisicao.getValue(i, "anoVigencia"),
                    "",
                    treinamentosRequisicao.getValue(i, "treinamentoSolicitado"),
                    treinamentosRequisicao.getValue(i, "entidadeSugerida"),
                    treinamentosRequisicao.getValue(i, "cargaHorariaEstimada"),
                    treinamentosRequisicao.getValue(i, "totalParticipantes"),
                    treinamentosRequisicao.getValue(i, "participantes"),
                    treinamentosRequisicao.getValue(i, "classificacaoCurso"),
                    treinamentosRequisicao.getValue(i, "valorEstimado"),
                    treinamentosRequisicao.getValue(i, "valorUtilizado"),
                    treinamentosRequisicao.getValue(i, "documentid"),
                    treinamentosRequisicao.getValue(i, "numProcess"),
                    "",
                    treinamentosRequisicao.getValue(i,"avaliacaoReacao"),
                    treinamentosRequisicao.getValue(i,"avaliacaoEficacia")
                ));
            }
            var solicitacoesDepartamentos = DatasetFactory.getDataset("propor_treinamentos_anuais", null, filtersTRN002, null);
            var constraintTablePaiFilho = DatasetFactory.createConstraint("tablename", "tbTreinamentos", "tbTreinamentos", ConstraintType.MUST);
            for (var i = 0; i < solicitacoesDepartamentos.rowsCount; i++) {
                var currentDocId = solicitacoesDepartamentos.getValue(i, "documentid");
                var constraintDocId = DatasetFactory.createConstraint("documentid", currentDocId, currentDocId, ConstraintType.MUST);
                filtersTRN002Table.push(constraintTablePaiFilho);
                filtersTRN002Table.push(constraintDocId);
                var treinamentos = DatasetFactory.getDataset("propor_treinamentos_anuais", null, filtersTRN002Table, null);
                for (var x = 0; x < treinamentos.rowsCount; x++) {
                    // propor code
                    customDataset.addRow(new Array("propor_treinamentos_anuais",
                        solicitacoesDepartamentos.getValue(i, "areaOrcamento"),
                        solicitacoesDepartamentos.getValue(i, "departamento"),
                        solicitacoesDepartamentos.getValue(i, "anoVigencia"),
                        solicitacoesDepartamentos.getValue(i, "dataAbertura"),
                        treinamentos.getValue(x, "treinamentoTbTreinamentos"),
                        treinamentos.getValue(x, "entidadeSugeridaTbTreinamentos"),
                        treinamentos.getValue(x, "cargaHorariaTbTreinamentos"),
                        treinamentos.getValue(x, "qtdeParticipanteTbTreinamentos"),
                        treinamentos.getValue(x, "matriculasNomesTbTreinamentos"),
                        treinamentos.getValue(x, "classificacaoTbTreinamentos"),
                        treinamentos.getValue(x, "estimativaTbTreinamentos"),
                        treinamentos.getValue(x, "valorGastoTbTreinamentos"),
                        solicitacoesDepartamentos.getValue(i, "documentid"),
                        solicitacoesDepartamentos.getValue(i, "numProcess"),
                        treinamentos.getValue(x, "statsTbTreinamentos"),
                        treinamentosRequisicao.getValue(i,"avaliacaoReacao"),
                        treinamentosRequisicao.getValue(i,"avaliacaoEficacia")
                    ));
                }
                filtersTRN002Table.pop();
                filtersTRN002Table.pop();
            }


        } else { // não tem filtros
            log.warn("%%% SEM FILTROS!");
            //constraint para obter todos os dados do dataset ativos
            var metadata = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
            
            //obtendo todas as lotações em ordem crescente(filtro pelo documentid)
            var treinamentosRequisicao = DatasetFactory.getDataset("requisicao_treinamento", null, [metadata], null);
            for (var i = 0; i < treinamentosRequisicao.rowsCount; i++) {
                // requisitar code!
                customDataset.addRow(new Array("requisicao_treinamento",
                    treinamentosRequisicao.getValue(i, "areaOrcamento"),
                    treinamentosRequisicao.getValue(i, "departamento"),
                    treinamentosRequisicao.getValue(i, "anoVigencia"),
                    "",
                    treinamentosRequisicao.getValue(i, "treinamentoSolicitado"),
                    treinamentosRequisicao.getValue(i, "entidadeSugerida"),
                    treinamentosRequisicao.getValue(i, "cargaHorariaEstimada"),
                    treinamentosRequisicao.getValue(i, "totalParticipantes"),
                    treinamentosRequisicao.getValue(i, "participantes"),
                    treinamentosRequisicao.getValue(i, "classificacaoCurso"),
                    treinamentosRequisicao.getValue(i, "valorEstimado"),
                    treinamentosRequisicao.getValue(i, "valorUtilizado"),
                    treinamentosRequisicao.getValue(i, "documentid"),
                    treinamentosRequisicao.getValue(i, "numProcess"),
                    "",
                    treinamentosRequisicao.getValue(i,"avaliacaoReacao"),
                    treinamentosRequisicao.getValue(i,"avaliacaoEficacia")
                ));
            }
            var solicitacoesDepartamentos = DatasetFactory.getDataset("propor_treinamentos_anuais", null, [metadata], null);
            var constraintTablePaiFilho = DatasetFactory.createConstraint("tablename", "tbTreinamentos", "tbTreinamentos", ConstraintType.MUST);
            for (var i = 0; i < solicitacoesDepartamentos.rowsCount; i++) {
                var currentDocId = solicitacoesDepartamentos.getValue(i, "documentid");
                var constraintDocId = DatasetFactory.createConstraint("documentid", currentDocId, currentDocId, ConstraintType.MUST);
                var treinamentos = DatasetFactory.getDataset("propor_treinamentos_anuais", null, [constraintTablePaiFilho, constraintDocId, metadata], null);
                for (var x = 0; x < treinamentos.rowsCount; x++) {
                    // propor code
                    customDataset.addRow(new Array("propor_treinamentos_anuais",
                        solicitacoesDepartamentos.getValue(i, "areaOrcamento"),
                        solicitacoesDepartamentos.getValue(i, "departamento"),
                        solicitacoesDepartamentos.getValue(i, "anoVigencia"),
                        solicitacoesDepartamentos.getValue(i, "dataAbertura"),
                        treinamentos.getValue(x, "treinamentoTbTreinamentos"),
                        treinamentos.getValue(x, "entidadeSugeridaTbTreinamentos"),
                        treinamentos.getValue(x, "cargaHorariaTbTreinamentos"),
                        treinamentos.getValue(x, "qtdeParticipanteTbTreinamentos"),
                        treinamentos.getValue(x, "matriculasNomesTbTreinamentos"),
                        treinamentos.getValue(x, "classificacaoTbTreinamentos"),
                        treinamentos.getValue(x, "estimativaTbTreinamentos"),
                        treinamentos.getValue(x, "valorGastoTbTreinamentos"),
                        solicitacoesDepartamentos.getValue(i, "documentid"),
                        solicitacoesDepartamentos.getValue(i, "numProcess"),
                        treinamentos.getValue(x, "statsTbTreinamentos"),
                        treinamentosRequisicao.getValue(i,"avaliacaoReacao"),
                        treinamentosRequisicao.getValue(i,"avaliacaoEficacia")
                    ));
                }
            }
        }
        return customDataset;
    } catch (e) {
        log.warn(">>> >>> e.message " + e.message);
    }

}

function makeFilter(constraintName, like, iv, fv) {
    var filter;
    filter = DatasetFactory.createConstraint(constraintName, iv, fv, ConstraintType.MUST);
    if (like) {
        filter.setLikeSearch(true);
    }
    log.warn(">>> >>> FILTER CREATED: " + filter);
    return filter;
}