function validaCampos(atividade, proximaAtividade) {
	/** Life Cycle Workflow */
	
	if ( atividade == 0 || atividade == 4 || atividade == 26 ) {
		//addHasFree('fieldName');
		//addHasFreeTable('fieldType', 'fieldName', 1);
		addHasFree("nomeParticipante");
		addHasFree("matricula");
		addHasFree("area");
		addHasFree("cursoTreinamento");
		addHasFree("classificacaoCurso");
		addHasFree("instituicao");
		addHasFree("dataRealizacao");
		addHasFree("cargaHoraria");
		addHasFree("avaliadorTreinamento");
		addHasFree("aprovadorTreinamento");

	}

	if ( atividade == 8 ) {
		addHasFree("aprovarAvaliacao");
		if ( getValue('aprovarAvaliacao') == "Não" || getValue('aprovarAvaliacao') == "Cancelar" ){
			addHasFree('obsHistorico');
		}
	}

	if ( atividade == 56 ) {
		addHasFree("aprovarAvaliacaoRH");
		if ( getValue('aprovarAvaliacaoRH') == "Não" || getValue('aprovarAvaliacaoRH') == "Cancelar" ){
			addHasFree('obsHistorico');
		}
	}

	if ( atividade == 26 ) {

		addHasFree("pergunta1");
		addHasFree("pergunta2");
		addHasFree("pergunta3_organizacao");
		addHasFree("pergunta3_cargaHoraria");
		addHasFree("pergunta3_material");
		addHasFree("pergunta3_local");
		addHasFree("pergunta4_comunicacao");
		addHasFree("pergunta4_dominio");
		addHasFree("pergunta4_relacionamento");
		addHasFree("pergunta4_didatica");
		addHasFree("pergunta4_habilidade");
	}

	if ( atividade == 31 ){
		addHasFree("usuarioParticipou");
		addHasFree("avaliadorTreinamento");
		addHasFree("aprovadorTreinamento");
	}
	/** Fim Life Cycle Workflow */
}
