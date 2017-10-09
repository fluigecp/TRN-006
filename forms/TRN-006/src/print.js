"use strict";
/**
 * @module PrintModule
 */
var printModule = (function(){
    function geraAvaliacao() {
        try {
            if(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)){				
                myWindow = window.open("../print/print.html", "myWindow");
                setTimeout(function() {
                    var list = getData();
                    setData(myWindow, list[0]);
                }, 4000);

                
            } else {
                alert('Navegador incompatível! Utilizar o Google Chrome');
            }
        } catch (err) {
            console.log(err.message);
            alert('DESCULPE! Ocorreu um erro, contate o administrador');
        }
    }

    function getData() {

    }

    function getHeader(){
        
    }

    function setData(myWindow, list) {
            
    }
    return {
        print: geraListaPresenca
    } 
});