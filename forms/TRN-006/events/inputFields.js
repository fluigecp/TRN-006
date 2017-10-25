function inputFields(form){
    var numProcess = getValue("WKNumProces");
    if ( activity != 0 ) {
        form.setValue("numProcess", numProcess);
    }
}