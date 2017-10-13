/**
 * @module Lifecycle
 */

 var lifecycle = (function() {
    /** Lifecycle Variables */
    var activity = 0,
    modo = "";

    var setup = function () {
        activity = getAtividade();
        modo = getFormMode();
    };

    var logActiveInformation = function () {
        console.log("Activity: ", activity);
        console.log("Modo: ", modo);
    };

    var control = function () {
        // GLOBAL LISTENERS 
        $(".expand").on("click ", manipulateDOM.actions4Listeners.expandTextAreaListener);
        
        /** Início - Life Cycle */

        if ( activity == 0 || activity == 4 ) {
            
        }

        if ( activity == 26 ) {
            $("#btnPrint").on("click", manipulateDOM.actions4Listeners.printAvaliacaoListener);
            $("#btnShowTreinamento").on("click", manipulateDOM.actions4Listeners.showTreinamentoListener);
        }
        
        /** Modo VIEW  */

        if ( modo == "VIEW" ) {

        }	

        /** Fim - Life Cycle */
    };

    var init = function () {
        setup();
        logActiveInformation();
        control();
    };

    var windowLoadEvents = function () {
        /** Events onload, zoomFields etc.. */
    };

    return {
        init: init,
        windowLoadEvents: windowLoadEvents
    };
 })();