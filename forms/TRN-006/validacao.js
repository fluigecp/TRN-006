function validaCampos(atividade, proximaAtividade) {
	/** Life Cycle Workflow */
	
	if ( atividade == 0 || atividade == 4 ) {
		//addHasFree('fieldName');
		//addHasFreeTable('fieldType', 'fieldName', 1);
	}

	if ( atividade == 8 ) {
		addHasFree("aprovarAvaliacao");
	}
	/** Fim Life Cycle Workflow */
}
