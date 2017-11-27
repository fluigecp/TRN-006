function servicetask43(attempt, message) {
	try {
		var numSolicPai = getValue('WKNumProces');

		//var documentId = ( hAPI.getCardData( getValue( "WKNumProcess" ) ) ).get( "documentid" );
		var documentId = hAPI.getCardValue("documentid");
		log.warn("%%%%%% documentId : " + documentId);

		var servico = ServiceManager.getService("ECMWorkflowEngineService").getBean();
		log.warn("%%%%%% servico : " + servico);

		var locator = servico.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService");
		log.warn("%%%%%% locator : " + locator);

		var WorkflowEngineService = locator.getWorkflowEngineServicePort();
		log.warn("%%%%%% WorkflowEngineService : " + WorkflowEngineService);

		var username = hAPI.getAdvancedProperty("loginUserWS");
		log.warn("%%%%%% username : " + username);

		var password = hAPI.getAdvancedProperty("passwdUserWS");
		log.warn("%%%%%% password : " + password);

		var companyId = parseInt(getValue("WKCompany"));
		log.warn("%%%%%% companyId : " + companyId);

		var processId = "TRN-007";

		var choosedState = 8;

		var comments = "Solicitação aberta por: Nº " + numSolicPai;
		log.warn("%%%%%% comments : " + comments);

		var userId = hAPI.getAdvancedProperty("matUserWS");
		log.warn("%%%%%% userId : " + userId);

		var completeTask = true;
		log.warn("%%%%%% completeTask : " + completeTask);

		var attachments = servico.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
		log.warn("%%%%%% attachments : " + attachments);

		var appointment = servico.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");
		log.warn("%%%%%% appointment : " + appointment);

		var managerMode = false;
		log.warn("%%%%%% managerMode : " + managerMode);

		var novaSolic;

		var colleagueIds = servico.instantiate("net.java.dev.jaxb.array.StringArray");
		colleagueIds.getItem().add('System:Auto');
		log.warn("%%%%%% colleagueIds");

		var fieldsEficacia = ["nomeCurso", "nomeParticipante", "matParticipante", "usuarioParticipou", "numSolicTreinamento", "solicAvaliacaoReacao",
							"avaliadorMat", "aberturaAutomatica", "data1", "data2"];
		var fieldsReacao = [];
		fieldsReacao.push(hAPI.getCardValue("cursoTreinamento") + "");
		fieldsReacao.push(hAPI.getCardValue("nomeParticipante") + "");
		fieldsReacao.push(hAPI.getCardValue("matricula") + "");
		fieldsReacao.push(hAPI.getCardValue("usuarioParticipou") + "");
		fieldsReacao.push(hAPI.getCardValue("numSolicTreinamento") + "");
		fieldsReacao.push(hAPI.getCardValue("numProcess") + "");
		fieldsReacao.push(hAPI.getCardValue("avaliadorMat") + "");
		fieldsReacao.push(hAPI.getCardValue("dataInicio") + "");
		fieldsReacao.push(hAPI.getCardValue("dataTermino") + "");
		fieldsReacao.push("Sim");
		var cardData = servico.instantiate("net.java.dev.jaxb.array.StringArrayArray");
		for (var x = 0; x < fieldsEficacia.length; x++) {
			var objField = servico.instantiate("net.java.dev.jaxb.array.StringArray");
			objField.getItem().add(fieldsEficacia[x]);
			objField.getItem().add(fieldsReacao[x]);
			cardData.getItem().add(objField);
		}
		novaSolic = WorkflowEngineService.startProcess(username, password, companyId, processId, choosedState, colleagueIds, comments, userId,
			completeTask, attachments, cardData, appointment, managerMode);
	} catch (error) {
		log.error(error);
		throw error;
	}
}
