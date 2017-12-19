function servicetask64(attempt, message) {
	try {
		var numSolicitacao = hAPI.getCardValue("numProcess");
		log.warn('%%%%%% numSolicitacao: ' + numSolicitacao);

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

		// INICIANDO A IMPLEMENTAÇÃO DA INTEGRAÇÃO COM A FICHA DO PARTICIPANTE

		// Obtém os dados do participante no humanus
		var humanusData = getParticipanteHumanusData(hAPI.getCardValue("matricula"));
		log.warn('%%%%%% humanusData: ' + humanusData);

		// verifica se o participante possui ficha de treinamentos
		var ficha = checkIfHasFicha(hAPI.getCardValue("matricula"));

		/** 
		 * Verifica o ano que o treinamento avaliado foi aplicado
		*/

		var anoTreinamento = hAPI.getCardValue("dataInicio");
		anoTreinamento = anoTreinamento.substr(anoTreinamento.indexOf("/", 3) + 1);
		
		// Verifica media da avaliação;
		var mediaAvaliacao = getMediaAvaliacao();
		hAPI.setCardValue("fato_0", mediaAvaliacao);
		// Array que armazena os valores de cada campo de participante
		var arrayCardValuesAvaliacao = [
			numSolicitacao,
			hAPI.getCardValue("cursoTreinamento"),
			anoTreinamento,
			hAPI.getCardValue("dataInicio"),
			hAPI.getCardValue("dataTermino"),
			mediaAvaliacao			
		]
		// se houver, atualiza a ficha. 
		if (ficha != null) {
			var documentid = ficha.getValue(0, "documentid");
			var avaliacoesCount = getAvaliacoesReacaoCount(documentid);
			var arrayCardFieldsAvaliacao = [];
			arrayCardFieldsAvaliacao.push("numero_solicitacao_tb2___" + avaliacoesCount + 1);
			arrayCardFieldsAvaliacao.push("titulo_do_treinamento_tb2___" + avaliacoesCount + 1);
			arrayCardFieldsAvaliacao.push("ano_realizacao_tb2___" + avaliacoesCount + 1);
			arrayCardFieldsAvaliacao.push("data_inicio_tb2___" + avaliacoesCount + 1);
			arrayCardFieldsAvaliacao.push("data_termino_tb2___" + avaliacoesCount + 1);
			arrayCardFieldsAvaliacao.push("avaliacao_media_tb2___" + avaliacoesCount + 1);
			// objeto que irá armazenar todos os campos e os respectivos valores (update)
			var cardFieldDtoArray = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDtoArray");
							
			for (var i = 0; i < arrayCardFieldsAvaliacao.length; i++) {
				var cardFieldDto = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.CardFieldDto");
				//atribuindo a chave do campo
				cardFieldDto.setField(arrayCardFieldsAvaliacao[i]);
				//atribuindo valor ao campo
				cardFieldDto.setValue(arrayCardValuesAvaliacao[i]);
				// adicionando no objeto de valores - update
				cardFieldDtoArray.getItem().add(cardFieldDto);
			}

			// updating ficha
			if ( !checkIfAvaliacaoIsAlreadyRegistered(documentid, numSolicitacao) ) {
				log.warn('%%%%%% atualizando ficha ');
				portServico.updateCardData(empresa, user, password, documentid, cardFieldDtoArray);
				log.warn('%%%%%% ficha atualizada ');
			}
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
 * Retorna a quantidade de avaliações de reação existentes na ficha do participante
 * @param {int} documentid - id da ficha de treinamento
 * @returns - quantidade de avaliações de reação registrados.
 */
function getAvaliacoesReacaoCount(documentid) {
	var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("documentid", documentid, documentid, ConstraintType.MUST);
	var tablename = DatasetFactory.createConstraint("tablename", "avaliacoes_reacao", "avaliacoes_reacao", ConstraintType.MUST);
	var fichaParticipante = DatasetFactory.getDataset("participante_x_treinamento", null, [c1, c2, tablename], null);
	return fichaParticipante.rowsCount;
}

/**
 * Calcula a media da avaliação.
 * @returns - média da avaliação do participante
 */
function getMediaAvaliacao(){
	var somatoria = 
				parseFloat(hAPI.getCardValue("custom_10")) + 
				parseFloat(hAPI.getCardValue("custom_11")) + 
				parseFloat(hAPI.getCardValue("custom_12")) + 
				parseFloat(hAPI.getCardValue("custom_13")) + 
				parseFloat(hAPI.getCardValue("custom_14")) + 
				parseFloat(hAPI.getCardValue("custom_15")) + 
				parseFloat(hAPI.getCardValue("custom_16")) + 
				parseFloat(hAPI.getCardValue("custom_17")) + 
				parseFloat(hAPI.getCardValue("custom_18")) + 
				parseFloat(hAPI.getCardValue("custom_19")) + 
				parseFloat(hAPI.getCardValue("custom_20")); 
	var media = somatoria / 11
	return media.toFixed(2);
}

/**
 * @description Verifica se a avaliação já foi inserido na table de avaliação de reação do participante.
 * @param {number} docId - documentid da Ficha do participante
 * @param {number} numSolic - Número da solicitação da avaliação de reação
 * @returns - Boolean - true caso já exista, false caso ainda não exista.
 * 
 */
function checkIfAvaliacaoIsAlreadyRegistered(docId, numSolic){
	var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("documentid", docId, docId, ConstraintType.MUST);
	var tablename = DatasetFactory.createConstraint("tablename", "avaliacoes_reacao", "avaliacoes_reacao", ConstraintType.MUST);
	var fichaParticipante = DatasetFactory.getDataset("participante_x_treinamento", null, [c1, c2, tablename], null);
	for (var i = 0; i < fichaParticipante.rowsCount; i++) {
		if ( fichaParticipante.getValue(i, "numero_solicitacao_tb2") == numSolic ) {
			return true;
		}
	}
	return false;
}