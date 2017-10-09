function startconditional14() {
    var today = new Date();
	var yyyy = today.getFullYear();
    var year = parseInt(yyyy) + 1;
    log.info("GET COUNT TREINAMENTOS NÃO AVALIADOS");
    var countTreinamentos = getCountTreinamentosNaoAvaliados(year);
    if (countTreinamentos > 0 ) {
        log.info("COUNT TREINAMENTOS NÃO AVALIADOS: "+countTreinamentos);
        return true;
    } else {
        log.info("NÃO HÁ MAIS TREINAMENTOS A SEREM AVALIADOS!");
        return false;
    }
}

/**
* @returns {int} - Quantidade de departamentos no dataset.
* @param year - Ano de vigência dos treinamentos
* @description - Retorna a quantidade de treinamentos a serem avaliados.
*/
function getCountTreinamentosNaoAvaliados(year) { 
	var c2 = DatasetFactory.createConstraint("statsTbTreinamentos", "REALIZADO", "REALIZADO", ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("avaliacaoReacao", "", "", ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("anoVigencia", year, year, ConstraintType.MUST);
	var treinamentos = DatasetFactory.getDataset("dsTreinamentos", null, [c2,c3,c4], null);
    if ( data.rowsCount > 0 ) {
        return treinamentos.rowsCount;
    } else {
        return 0;
    }  
}