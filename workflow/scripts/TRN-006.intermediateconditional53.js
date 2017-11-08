function intermediateconditional53() {
	return true;
    var dataAprovacao = hAPI.getCardValue("dataAprovacao");
    var dataAtual = getCurrentDate();
    var dias_passados = calculateDays(dataAprovacao, dataAtual);
    if ( dias_passados >= 0 ) {
        return true;
    }
    return false;
}

function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    return dd + "/" + mm + '/' + yyyy;
}

function calculateDays(initialDate, finalDate) {
    finalDate = new Date(finalDate.split('/')[2],finalDate.split('/')[1]-1,finalDate.split('/')[0]);
    initialDate = new Date(initialDate.split('/')[2],initialDate.split('/')[1]-1,initialDate.split('/')[0]);
    var timeDiff = Math.abs(initialDate.getTime() - finalDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    return diffDays;
}