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
        var data = new Date();
        var dia = data.getDate() < 10 ? '0'+data.getDate() : data.getDate();
        var mes = (data.getMonth()+1) < 10 ? '0'+(data.getMonth()+1) : (data.getMonth()+1);
        var ano = data.getFullYear();
        var header = '<div>'+
        '				<div class="row">'+
        '					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-left">'+
        '						<img src="../logo12.png" alt="" width="45" height="45">'+
        '					</div>'+
        '					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-center">'+
        '						<h4>Ficha de avaliação de treinamento - reação</h4>'+
        '					</div>'+
        '					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="font-size: 10px;">'+
        '						<span><b>Data: </b></span><span>'+dia+'/'+mes+'/'+ano+'</span>'+
        '						<br>'+
        '						<span><b>Solicitação: </b></span><span>'+getProcess()+'</span>'+
        '					</div>'+
        '				</div>'+
        '				<div class="row">'+
        '					<div class="col-xs-12 col-sm-12 col-md-12">'+
        '						<br>'+
        '						<legend style="border-bottom: solid .5px;"></legend>'+
        '					</div>'+
        '				</div>'+
        '			</div>';
        return header;
    }

    function setData(myWindow, list) {
        
    }
    return {
        print: geraAvaliacao
    } 
});