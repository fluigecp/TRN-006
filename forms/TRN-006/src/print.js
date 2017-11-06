"use strict";
/**
 * @module PrintModule
 */
var printModule = (function(){
    var modo = "";

    var setup = function () {
        modo = getFormMode();
    };

    var geraAvaliacao = function () {
        try {
            var myWindow;
            if(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)){				
                myWindow = window.open("print/print.html", "myWindow");
                setup();
                setTimeout(function() {
                    var list = getData();
                    setData(myWindow, list);
                }, 3000);

                
            } else {
                alert('Navegador incompatível! Utilizar o Google Chrome');
            }
        } catch (err) {
            console.log(err.message);
            alert('DESCULPE! Ocorreu um erro, contate o administrador');
        }
    };

    var getData = function () {
        var formObj, nomeParticipante, matricula, departamento, nomeTreinamento, instituicao,
            dataRealizacao, cargaHoraria, classificacaoCurso;
        nomeParticipante = modo == "VIEW" ? $("span[name*=nomeParticipante]").html() : $("input[name*=nomeParticipante]").val();
        matricula = modo == "VIEW" ? $("span[name*=matricula]").html() : $("input[name*=matricula]").val();
        departamento = modo == "VIEW" ? $("span[name*=area]").html() : $("input[name*=area]").val();
        nomeTreinamento = modo == "VIEW" ? $("span[name*=cursoTreinamento]").html() : $("input[name*=cursoTreinamento]").val();
        instituicao = modo == "VIEW" ? $("span[name*=instituicao]").html() : $("input[name*=instituicao]").val();
        dataRealizacao = modo == "VIEW" ? $("span[name*=dataRealizacao]").html() : $("input[name*=dataRealizacao]").val();
        cargaHoraria = modo == "VIEW" ? $("span[name*=cargaHoraria]").html() : $("input[name*=cargaHoraria]").val();
        classificacaoCurso = modo == "VIEW" ? $("span[name*=classificacaoCurso]").html() : $("input[name*=classificacaoCurso]").val();
        formObj = {
            "nomeParticipante": nomeParticipante,
            "matricula": matricula,
            "departamento": departamento,
            "nomeTreinamento": nomeTreinamento,
            "instituicao": instituicao,
            "dataRealizacao": dataRealizacao,
            "cargaHoraria": cargaHoraria,
            "classificacaoCurso": classificacaoCurso
        };
        return formObj;
    };

    var getHeader = function (){
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
        '						<h4>Avaliação de reação</h4>'+
        '					</div>'+
      /*  '					<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style="font-size: 10px;">'+
        '						<span><b>Data: </b></span><span>'+dia+'/'+mes+'/'+ano+'</span>'+
        '						<br>'+
        '						<span><b>Solicitação: </b></span><span>'+getProcess()+'</span>'+
        '					</div>'+*/
        '                   <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center" style="font-size: 10px;">'+
        '  						<span><b>RECURSOS HUMANOS</b></span>'+
        '						<br>'+
        '						<span><b>TREINAMENTO E DESENVOLVIMENTO</b></span>'+
        '						<span><b>Solicitação: </b></span><span>'+getProcess()+'</span>'+
        '                   </div>'+
        '				</div>'+
        '				<div class="row">'+
        '					<div class="col-xs-12 col-sm-12 col-md-12">'+
        '						<br>'+
        '						<legend style="border-bottom: solid .5px;"></legend>'+
        '					</div>'+
        '				</div>'+
        '			</div>';
        return header;
    };

    function setData(myWindow, list) {
        try{
            // /* Adds Element BEFORE */
            Element.prototype.appendBefore = function (element) {
                element.parentNode.insertBefore(this, element);
            };

            //  Adds Element AFTER 
            Element.prototype.appendAfter = function (element) {
                element.parentNode.insertBefore(this, element.nextSibling);
            };

            var style = 'background-color: #4169E1 !important; color: #fff !important;';
            var dvDados = myWindow.document.createElement('div');
            var dvHeader = myWindow.document.createElement('div');
            var header = getHeader();
            dvHeader.innerHTML = header;
            dvHeader.id = 'aprovacaoReacaoFormHeader';
            var html =
            '		<div class="row">'+
                '       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">'+
                '               <table class="table table-bordered table-hover table-condensed" style="width: 100%;">'+
                '                <thead>'+
                '                    <tr>'+
                '                        <th width="50%" class="text-center" style="'+style+'">Nome do participante</th>'+
                '                        <th width="15%" class="text-center" style="'+style+'">Matrícula</th>'+
                '                        <th width="35%" class="text-center" style="'+style+'">Área/departamento</th>'+
                '                    </tr>'+
                '                </thead>'+
                '                <tbody>'+
                '                    <tr>'+
                '                        <td width="50%">'+
                '                            <span>'+list.nomeParticipante+'</span>'+
                '                        </td> '+
                '                        <td width="15%">'+
                '                            <span>'+list.matricula+'</span>'+
                '                        </td>'+
                '                        <td width="35%">'+
                '                            <span>'+list.departamento+'</span>'+
                '                        </td>'+
                '                    </tr>'+
                '                </tbody>'+
                '            </table>'+
                '       </div>'+
            '       </div>'+

            '		<div class="row">'+
                '       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">'+
                '               <table class="table table-bordered table-hover table-condensed" style="width: 100%;">'+
                '                <thead>'+
                '                    <tr>'+
                '                        <th width="33%" class="text-center" style="'+style+'">Curso/treinamento</th>'+
                '                        <th width="33%" class="text-center" style="'+style+'">Classificação</th>'+
                '                        <th width="33%" class="text-center" style="'+style+'">Instituição</th>'+
                '                    </tr>'+
                '                </thead>'+
                '                <tbody>'+
                '                    <tr>'+
                '                        <td width="33%">'+
                '                            <span>'+list.nomeTreinamento+'</span>'+
                '                        </td> '+
                '                        <td width="33%">'+
                '                            <span>'+list.classificacaoCurso+'</span>'+
                '                        </td> '+
                '                        <td width="33%">'+
                '                            <span>'+list.instituicao+'</span>'+
                '                        </td>'+
                '                    </tr>'+
                '                </tbody>'+
                '            </table>'+
                '       </div>'+
            '       </div>'+

            '	    <div class="row">'+
                '       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">'+
                '               <table class="table table-bordered table-hover table-condensed" style="width: 100%;">'+
                '                <thead>'+
                '                    <tr>'+
                '                        <th width="50%" class="text-center" style="'+style+'">Data de realização</th>'+
                '                        <th width="50%" class="text-center" style="'+style+'">Carga horária(hrs)</th>'+
                '                    </tr>'+
                '                </thead>'+
                '                <tbody>'+
                '                    <tr>'+
                '                        <td width="70%">'+
                '                            <span>'+list.dataRealizacao+'</span>'+
                '                        </td> '+
                '                        <td width="30%">'+
                '                            <span>'+list.cargaHoraria+'</span>'+
                '                        </td>'+
                '                    </tr>'+
                '                </tbody>'+
                '            </table>'+
                '       </div>'+
            '       </div>'+

            '	    <div class="row">'+
                '       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">'+
                '           <p>Este instrumento tem como objetivo coletar informações sobre o treinamento realizado,'+ 
                '           a fim de aprimorar nosso trabalho.<br/>' +
                '           Responda todas as questões e assinale com um "X" na sua escolha.  Sua opinião é muito importante para nós!</p>'+
                '       </div>'+
            '       </div>'+

            '       <div class="row">'+
                '       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-bottom: 15px;">'+
                '           <p><b>1 - Na sua opinião, o treinamento recebido atendeu suas expectativas?</b></p>'+
                '           <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><label class="checkbox-inline"><input type="checkbox" value="">1</label></div>'+
                '           <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><label class="checkbox-inline"><input type="checkbox" value="">2</label></div>'+
                '           <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><label class="checkbox-inline"><input type="checkbox" value="">3</label></div>'+
                '           <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><label class="checkbox-inline"><input type="checkbox" value="">4</label></div>'+
                '           <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><label class="checkbox-inline"><input type="checkbox" value="">5</label></div>'+
                '       </div>'+
            '       </div>'+

            '       <div class="row">'+
                '       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-bottom: 15px;">'+
                '           <p><b>2- Você irá utilizar em seu trabalho o que aprendeu no treinamento?</b></p>'+
                '           <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><label class="checkbox-inline"><input type="checkbox" value="">1</label></div>'+
                '           <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><label class="checkbox-inline"><input type="checkbox" value="">2</label></div>'+
                '           <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><label class="checkbox-inline"><input type="checkbox" value="">3</label></div>'+
                '           <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><label class="checkbox-inline"><input type="checkbox" value="">4</label></div>'+
                '           <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><label class="checkbox-inline"><input type="checkbox" value="">5</label></div>'+
                '       </div>'+
            '       </div>'+

            '		<div class="row">'+
                '       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'+
                '           <p><b>3- Sobre a estrutura do treinamento, avalie os itens:</b></p>'+
                '               <table class="table table-bordered table-hover table-condensed" style="width: 100%;">'+
                '                <thead>'+
                '                    <tr>'+
                '                        <th width="40%" class="text-center"></th>'+
                '                        <th width="12%" class="text-center" style="'+style+'">1</th>'+
                '                        <th width="12%" class="text-center" style="'+style+'">2</th>'+
                '                        <th width="12%" class="text-center" style="'+style+'">3</th>'+
                '                        <th width="12%" class="text-center" style="'+style+'">4</th>'+
                '                        <th width="12%" class="text-center" style="'+style+'">5</th>'+
                '                    </tr>'+
                '                </thead>'+
                '                <tbody>'+
                '                    <tr>'+
                '                        <td width="40%">'+
                '                            <span>Organização</span>'+
                '                        </td> '+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                    </tr>'+
                
                '                    <tr>'+
                '                        <td width="40%">'+
                '                            <span>Carga horária</span>'+
                '                        </td> '+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                    </tr>'+
                
                '                    <tr>'+
                '                        <td width="40%">'+
                '                            <span>Material didático (apostilas, apresentações, etc)</span>'+
                '                        </td> '+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                    </tr>'+

                '                    <tr>'+
                '                        <td width="40%">'+
                '                            <span>Local</span>'+
                '                        </td> '+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                    </tr>'+

                '                </tbody>'+
                '            </table>'+
                '       </div>'+
            '       </div>'+

            '		<div class="row">'+
                '       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'+
                '           <p><b>4- Em relação ao(s) instrutor(es): </b></p>'+
                '               <table class="table table-bordered table-hover table-condensed" style="width: 100%;">'+
                '                <thead>'+
                '                    <tr>'+
                '                        <th width="40%" class="text-center"></th>'+
                '                        <th width="12%" class="text-center" style="'+style+'">1</th>'+
                '                        <th width="12%" class="text-center" style="'+style+'">2</th>'+
                '                        <th width="12%" class="text-center" style="'+style+'">3</th>'+
                '                        <th width="12%" class="text-center" style="'+style+'">4</th>'+
                '                        <th width="12%" class="text-center" style="'+style+'">5</th>'+
                '                    </tr>'+
                '                </thead>'+
                '                <tbody>'+
                '                    <tr>'+
                '                        <td width="40%">'+
                '                            <span>Comunicação e objetividade</span>'+
                '                        </td> '+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                    </tr>'+
                
                '                    <tr>'+
                '                        <td width="40%">'+
                '                            <span>Domínio e conhecimento do conteúdo</span>'+
                '                        </td> '+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                    </tr>'+
                
                '                    <tr>'+
                '                        <td width="40%">'+
                '                            <span>Relacionamento com o grupo</span>'+
                '                        </td> '+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                    </tr>'+

                '                    <tr>'+
                '                        <td width="40%">'+
                '                            <span>Didática (técnica de ensino)</span>'+
                '                        </td> '+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                    </tr>'+

                '                    <tr>'+
                '                        <td width="40%">'+
                '                            <span>Habilidade em responder perguntas</span>'+
                '                        </td> '+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                        <td width="12%">'+
                '                            <span></span>'+
                '                        </td>'+
                '                    </tr>'+

                '                </tbody>'+
                '            </table>'+
                '       </div>'+
            '       </div>'+

            '       <div class="row">'+
                '       <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-bottom: 10px;">'+
                '           <p><b>5- Quais sugestões você poderia oferecer para nossa utilização nos próximos treinamentos?</b></p>'+
                '       </div>'+
            '       </div>';
            dvDados.innerHTML = html;
            dvDados.id = 'aprovacaoReacaoForm';
            var page = myWindow.document.createElement("page");
            /* page.setAttribute("size", "A4");
            page.setAttribute("layout","portrait"); */
            page.appendChild(dvHeader);
            page.appendChild(dvDados);
            myWindow.document.getElementById("content-pages").appendChild(page);
            /*myWindow.document.getElementById("content-pages").appendChild(dvHeader);
            myWindow.document.getElementById("content-pages").appendChild(dvDados);*/

           setTimeout(function() {
                myWindow.print();
                myWindow.close(); 
            }, 1500);

        }catch(err){
            console.log('Erro na funcao '+ err.message);
            alert('DESCULPE, OCORREU UM ERRO! Tente novamente ou Contate o administrador');
            myWindow.close();
        }
    };

    return {
        print: geraAvaliacao
    };
})();