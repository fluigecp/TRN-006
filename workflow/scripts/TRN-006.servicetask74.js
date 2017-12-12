function servicetask74(attempt, message) {
	try {
		var Service = ServiceManager.getService('ECMCardService');
		log.warn('%%%%%% Service: ' + Service);

		var serviceHelper = Service.getBean();
		log.warn('%%%%%% serviceHelper: ' + serviceHelper);

		var serviceInstance = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.ECMCardServiceService");
		log.warn('%%%%%% serviceInstance: ' + serviceInstance);

		var cardFieldDtoArray = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDtoArray");
		log.warn('%%%%%% cardFieldDtoArray: ' + cardFieldDtoArray);

		var portServico = serviceInstance.getCardServicePort();
		log.warn('%%%%%% portServico: ' + portServico);

		var user = hAPI.getAdvancedProperty("loginUserWS");
		log.warn('%%%%%% user: ' + user);

		var password = hAPI.getAdvancedProperty("passwdUserWS");
		log.warn('%%%%%% password: ' + password);

		var empresa = parseInt(getValue("WKCompany"));
		log.warn('%%%%%% empresa: ' + empresa + ' TypeOf: ' + typeof empresa);

		// Array com o nome de todos os campos a serem populados na ficha(participante e treinamento, respectivamente).
		var fieldsFichaParticipante = ['matricula', 'participante', 'lotacao', 'departamento', 'campoDescritor'];
		log.warn('%%%%%% fieldsFichaParticipante: ' + fieldsFichaParticipante);

		var cardFieldDto = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
		log.warn('%%%%%% cardFieldDto: ' + cardFieldDto);

		var matricula = hAPI.getCardValue("matricula");
		log.warn('%%%%%% MATRICULA DO PARTICIPANTE: ' + matricula);

		var numSolicitacaoTreinamento = hAPI.getCardValue("numSolicTreinamento");

		// verifica se o participante possui ficha de treinamentos
		var ficha = checkIfHasFicha(matricula);
		log.warn('%%%%%% ficha: ' + ficha);

		// Obtém os dados do participante no humanus
		var humanusData = getParticipanteHumanusData(matricula);
		log.warn('%%%%%% humanusData: ' + humanusData);

		var fieldsFichaTreinamento = getArrayFieldNameTreinamento(ficha);
		// objeto que irá conter os fields e os metadados referentes ao documento (create)
		var cardDto = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.CardDto"); // container com os dados de formulário e metadados
		cardDto.setVersion(1000); //metadado que representa a versão do formulário      
		cardDto.setParentDocumentId(28592); // metadado que representa a pasta referente ao formulário

		// objeto que irá armazenar todos os campos e os respectivos valores (update)
		var cardFieldDtoArray = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDtoArray");

		// get lotacao Info
		var lotacaoInfo = getLotacaoInfo(parseInt(humanusData.getValue(0, "lotacao")));
		// get departamento
		var departamento = lotacaoInfo == "" ? lotacaoInfo : lotacaoInfo.getValue(0, "departamento");

		// Array que armazena os valores de cada campo de participante
		var arrayCardValuesParticipante = [
			parseInt(humanusData.getValue(0, "matricula")),
			humanusData.getValue(0, "nome"),
			parseInt(humanusData.getValue(0, "lotacao")),
			departamento,
			humanusData.getValue(0, "nome")
		];
		log.warn('%%%%%% arrayCardValuesParticipante: ' + arrayCardValuesParticipante);

		var planejamentoAnual = hAPI.getCardValue("processIdOrigin") != "TRN-002" ? "Não" : "Sim";

		// Array que armazena os valores de cada campo de treinamento
		var arrayCardValuesTreinamento = [
			numSolicitacaoTreinamento,
			hAPI.getCardValue("cursoTreinamento"),
			hAPI.getCardValue("classificacaoCurso"),
			planejamentoAnual,
			hAPI.getCardValue("instituicao"),
			hAPI.getCardValue("justificativaTreinamento"),
			hAPI.getCardValue("cargaHoraria"),
			hAPI.getCardValue("anoTreinamento")
		];

		// execução do laço que irá popular o cardFieldDtoArray com os valores do participante
		for (var y = 0; y < fieldsFichaParticipante.length; y++) {
			// instanciando um cardFieldDto para representar um campo do formulário(chave e valor)
			var cardFieldDto = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
			//atribuindo a chave do campo
			cardFieldDto.setField(fieldsFichaParticipante[y]);
			//atribuindo valor ao campo
			cardFieldDto.setValue(arrayCardValuesParticipante[y]);
			// adicionando no objeto de valores - update
			cardFieldDtoArray.getItem().add(cardFieldDto);
			// adicionando no cardDto - create
			cardDto.getCardData().add(cardFieldDto);
		}

		for (var z = 0; z < fieldsFichaTreinamento.length; z++) {
			// lógica para atribuir todos os valores de treinamento na tabela pai-filho de treinamentos do formulário.
			// instanciando um cardFieldDto para representar um campo do formulário(chave e valor)
			var cardFieldDto = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
			//atribuindo a chave do campo
			cardFieldDto.setField(fieldsFichaTreinamento[z]);
			//atribuindo valor ao campo
			cardFieldDto.setValue(arrayCardValuesTreinamento[z]);
			// adicionando no objeto de valores - update
			cardFieldDtoArray.getItem().add(cardFieldDto);
			// adicionando no cardDto - create
			cardDto.getCardData().add(cardFieldDto);
		}
		// se houver, atualiza a ficha. 
		if (ficha != null) {
			// objeto array que irá armazenar objetos CardFieldDto
			log.warn('%%%%%% atualizando ficha ');
			var docIdParticipante = ficha.getValue(0, "documentid");
			if (planejamentoAnual == "Não") {
				// Verifica se o treinamento já foi cadastrado anteriormente. Caso não, ele adiciona o treinamento.
				if (!checkIfTreinamentoIsAlreadyRegistered(docIdParticipante, numSolicitacaoTreinamento) ) {
					portServico.updateCardData(empresa, user, password, ficha.getValue(0, "documentid"), cardFieldDtoArray);
					log.warn('%%%%%% ficha atualizada ');
				}
			} else { // Se for planejamentoAnual, um mesmo participante pode ter participado de mais de um treinamento do mesmo planejamento anual.
				portServico.updateCardData(empresa, user, password, ficha.getValue(0, "documentid"), cardFieldDtoArray);
				log.warn('%%%%%% ficha atualizada ');
			}
		} else { // cria a ficha
			log.warn('%%%%%% criando ficha ');
			var cardDtoArray = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.CardDtoArray");
			cardDtoArray.getItem().add(cardDto);
			portServico.create(empresa, user, password, cardDtoArray);
			log.warn('%%%%%% ficha criada ');
		}


	} catch (error) {
		log.error(error);
		throw error;
	}
}

/**
 * Verifica se o participante possui ficha de treinamento.
 * @param {int} mat - Matricula do participante
 * @returns obj Dataset, caso tenha ficha, null caso não tenha.
 */
function checkIfHasFicha(mat) {
	var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("matricula", mat, mat, ConstraintType.MUST);
	var fichaReg = DatasetFactory.getDataset("participante_x_treinamento", null, [c1, c2], null);
	if (fichaReg.rowsCount > 0) {
		return fichaReg;
	}
	return null;
}
/**
 * Retorna os dados do participante
 * @param {int} mat  - Matricula do participante
 * @returns - Obj Dataset, caso a matrícula seja encontrada na base de dados, null caso a matricula não seja encontrada.
 */
function getParticipanteHumanusData(mat) {
	var c1 = DatasetFactory.createConstraint("matricula", mat, mat, ConstraintType.MUST);
	var humanusData = DatasetFactory.getDataset("wsFuncionarios", null, [c1], null);
	if (humanusData.rowsCount > 0) {
		return humanusData;
	}
	return null;
}
/**
 * Retorna os dados da lotação
 * @param {int} lotacao - código da lotação
 * @returns - Objeto Dataset com os dados da lotação, caso não exista, retorna "".
 */
function getLotacaoInfo(lotacao) {
	var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("codLotacao", lotacao, lotacao, ConstraintType.MUST);
	var lotacaoData = DatasetFactory.getDataset("cadastro_lotacao", null, [c1, c2], null);
	if (lotacaoData.rowsCount > 0) {
		return lotacaoData;
	}
	return "";
}

/**
 * Retorna um array com o nome de todos os campos a serem utilizados para preencher a
 *  tabela pai-filho de treinamentos na posição correta.
 * @param {Object} ficha - Objeto com os dados da ficha do participante.
 * @returns Array com os nomes dos para adição na tabela.
 */
function getArrayFieldNameTreinamento(ficha) {
	var fieldsFichaTreinamento;
	if (ficha != null) {
		var i = getTreinamentosCount(ficha.getValue(0, "documentid")) + 1;
		fieldsFichaTreinamento = ['numero_solicitacao_tb1___' + i, 'titulo_do_treinamento_tb1___' + i, 'classificacao_treinamento_tb1___' + i,
			'planejamento_anual_tb1___' + i, 'instituicao_treinamento_tb1___' + i, 'justificativa_treinamento_tb1___' + i,
			'carga_horaria_tb1___' + i, 'ano_realizacao_tb1___' + i
		];
	} else {
		fieldsFichaTreinamento = ['numero_solicitacao_tb1___1', 'titulo_do_treinamento_tb1___1', 'classificacao_treinamento_tb1___1',
			'planejamento_anual_tb1___1', 'instituicao_treinamento_tb1___1', 'justificativa_treinamento_tb1___1',
			'carga_horaria_tb1___1', 'ano_realizacao_tb1___1'
		];
	}
	log.warn('%%%%%% fieldsFichaTreinamento: ' + fieldsFichaTreinamento);
	return fieldsFichaTreinamento;
}

/**
 * 
 * @description Verifica se o treinamento já foi inserido na table de treinamentos do participante.
 * @param {number} docId - documentid da Ficha do participante
 * @param {number} numSolic - Número da solicitação do treinamento
 * @returns - Boolean - true caso já exista, false caso ainda não exista.
 * 
 */
function checkIfTreinamentoIsAlreadyRegistered(docId, numSolic) {
	var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("documentid", docId, docId, ConstraintType.MUST);
	var tablename = DatasetFactory.createConstraint("tablename", "treinamentos_realizados", "treinamentos_realizados", ConstraintType.MUST);
	var fichaParticipante = DatasetFactory.getDataset("participante_x_treinamento", null, [c1, c2, tablename], null);
	for (var i = 0; i < fichaParticipante.rowsCount; i++) {
		if (fichaParticipante.getValue(i, "numero_solicitacao_tb1") == numSolic) {
			return true;
		}
	}
	return false;
}

/**
 * Retorna a quantidade de treinamentos existentes na ficha do participante
 * @param {int} documentid - id da ficha de treinamento
 * @returns - quantidade de treinamentos registrados.
 */
function getTreinamentosCount(documentid) {
	var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("documentid", documentid, documentid, ConstraintType.MUST);
	var tablename = DatasetFactory.createConstraint("tablename", "treinamentos_realizados", "treinamentos_realizados", ConstraintType.MUST);
	var fichaParticipante = DatasetFactory.getDataset("participante_x_treinamento", null, [c1, c2, tablename], null);
	return fichaParticipante.rowsCount;
}
