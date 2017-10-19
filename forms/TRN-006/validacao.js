function validaCampos(atividade, proximaAtividade) {
	/** Life Cycle Workflow */
	
	if ( atividade == 0 || atividade == 4 ) {
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
	}

	if ( atividade == 8 ) {
		addHasFree("aprovarAvaliacao");
	}

	if ( atividade == 26 ) {
		addHasFree("nomeParticipante");
		addHasFree("matricula");
		addHasFree("area");
		addHasFree("cursoTreinamento");
		addHasFree("classificacaoCurso");
		addHasFree("instituicao");
		addHasFree("dataRealizacao");
		addHasFree("cargaHoraria");

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
		addHasFree("pergunta5");
	}
	/** Fim Life Cycle Workflow */
}
