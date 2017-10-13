function servicetask18(attempt, message) {
 try {
	 var Service = ServiceManager.getService('ECMWorkflowEngineService');
	 var serviceHelper = Service.getBean();
  //var serviceLocator = serviceHelper.instantiate('classe.locator');
 } catch(error) { 
	log.error(error);
	throw error;
 }
}