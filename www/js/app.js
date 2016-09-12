/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

// function myEventHandler() {
//     "use strict" ;
// // ...event handler code here...
// }


// ...additional event handlers here...

//variaveis globais
var papel;

//id da propriedade
//var idpropriedade = 4;

//ip do servidor
//var ipServidor = "192.168.0.7:8080";
//var ipServidor = "10.2.10.200:8080";
var ipServidor = "localhost:8080";


/*/funcao mudar background aleatorio
function mudarBackground(){
    switch(Math.floor((Math.random() * 5) + 1)){
        case 1:{
            $(".backgroundInicial").css("background-image", 'url("images/background1.jpg")');
        }break;
        case 2:{
            $(".backgroundInicial").css("background-image", 'url("images/background2.jpg")');
        }break;
        case 3:{
            $(".backgroundInicial").css("background-image", 'url("images/background3.jpg")');
        }break;
        case 4:{
            $(".backgroundInicial").css("background-image", 'url("images/background4.jpg")');
        }break;
        case 5:{
            $(".backgroundInicial").css("background-image", 'url("images/background5.jpg")');
        }break;

    }
}*/

//verifica se existe sessao na localStorage
//inicia pela ultima sessao ou abre tela de login
function verificaSession(){

    try{
        if(localStorage.getItem("logSession")){
            verificarDataLogin();
        }else{
            //limpa o localstorage e inicia o app da pagina de login
            localStorage.clear();
            window.activate_page("#mainpage");
        }
    }catch(e){
        window.alert("Erro verificaSession: " + e.message);
        clearGoMainPage();
    }
}


//funcao para verificar a data referente ao ultimo acesso, se estiver mais de 7 dias sem se conectar redireciona para login
function verificarDataLogin(){

    try{
        var data = new Date(),
            dia = data.getDate(),
            mes = data.getMonth() + 1;
        //teste os dias logado com ultimo login armazenado no localStorage
        if((730 * mes) - (730 - (dia*24)) > JSON.parse(localStorage.getItem("logSession")).logTempo){
            //alerta, redireciona para pagina login e limpa a localStorage
            navigator.notification.alert("Por motivos de segurança pedimos que faça o login novamente!",function(){},"Alerta","OK");
            clearGoMainPage();
        //o app foi aberto antes de 7 dias, entao carrega informacoes da localStorage
        }else{
            papel = JSON.parse(localStorage.getItem("logSession")).papel;
            carregaDados();
        }
    }catch(e){
        window.alert("Erro verificarDataLogin: "+ e.message);
        clearGoMainPage();
    }
}

//carrega os dados de cada usuario
function carregaDados(){
    try{
        if(papel === "a"){
            //usuario agricultor
            window.activate_page("#page_3");
            listarPropriedades();
        }else if(papel === "g" || papel === "e" || papel === "d"){
            //usuario gerenciador e entrevistador
            window.activate_page("#page_4");
            listarCultivar();
        }else{
            clearGoMainPage();
        }
    }catch(e){
        window.alert("Erro carregaDados: "+ e.message);
        clearGoMainPage();
    }

}

//lista os cultivares recebidos contidos no localStorage de cada propriedade
function listarCultivarRecebidos(idpropriedade){
    try{

        $("#cultivarRecebido").empty();
        var cultivaresRecebidos = JSON.parse(localStorage.getItem("cultivaresRecebidos"));

        //se nao conter os dados redireciona para acesso no servidor, armazena na localStorage e depois chama novamente o metotodo listarCultivarRecebidos
        if(cultivaresRecebidos === null){
            clearGoMainPage();
        //acessa o localStorge e cria a lista
        }else{
            var i = 0;
            //percore o tamanho do cultivares recebidos e cria um novo item
            $.each(cultivaresRecebidos, function(){
                var a = cultivaresRecebidos[i];
                //teste a propriedade
                if(a.propriedade_idpropriedade === idpropriedade){
                      var item ='<a id="'+i+'" class="list-group-item allow-badge widget uib_w_268" data-uib="twitter%20bootstrap/list_item" data-ver="1">'+ prazoRelatar(a.statussafra_idstatussafra)+'<h4 class="list-group-item-heading">'+ a.nomecultivar +'</h4><p class="list-group-item-text">Safra: '+ a.safra +'</p><p class="list-group-item-text">'+statusColheita(a.statussafra_idstatussafra)+ a.prazo_colheita+'</p><p class="list-group-item-text">'+statusDestinacao(a.statussafra_idstatussafra)+a.prazo_destinacao+'</p></a>';
                    $("#cultivarRecebido").append(item);
                }
                i++;
            });
        }
    }catch(e){
        window.alert("Erro listarCultivarRecebidos: "+ e.message);
        clearGoMainPage();
    }
}

function prazoRelatar(status){

    if(status === 7 || status === 8){
        return '<span class="vermelho badge fa fa-thumbs-o-down"><span class="vermelho badge fa fa-chevron-right"> </span></span>';
    }else if(status === 6 ){
        return '<span class="verde badge fa fa-thumbs-o-up"><span class="verde badge fa fa-chevron-right"> </span></span>';
    }else if(status === 1){
         return ' <span class="laranja badge fa fa-chevron-right"> </span>';
    }else{
        return ' <span class="amarelo badge fa fa-chevron-right"> </span>';
    }

}

function statusColheita(statussafra){
    if(statussafra <= 3){
        return 'Relatar colheita até: ';
    }else{
        return 'Colheita ';
    }

}
function statusDestinacao(statussafra){
    if(statussafra <= 5){
        return 'Relatar destinação até: ';
    }else{
        return 'Destinação ';
    }

}

//servico de busca dos dados no servidor, consome dados de internet e armazena no localStorage
function servArmazenarCulRecebdo(usuario){


    var cultivaresRecebidos = [];
    var propriedades = [];
    var cultivares = [];
    var safras = [];

    $.post("http://"+window.ipServidor+"/Projeto_BioID-war/servico/cultivar/listarrecebidos", usuario, function(dados){
        //armazena no localStorge
        if(dados.sucesso){

            //armazena os cultivares recebidos
            cultivaresRecebidos = dados.cultivaresrecebidos;
            //armazena as imagens dos cultivares em um array
            cultivares = dados.cultivares;

            propriedades = dados.propriedades;

            safras = dados.safras;
        }else{
            navigator.notification.confirm(
            'Erro de busca!',
            function() {
                clearGoMainPage();
            },
            'Erro',
            ['OK']
        );
        }
    }, "json")
    //Tratamento de erro da requisicao servico RESt login
    .fail(function(){
        navigator.notification.confirm(
            'Sem conexão com o servidor!',
            function() {
                clearGoMainPage();
            },
            'Erro',
            ['OK']
        );
    })
    .done(function(){
        //armazena no localstorage
        localStorage.removeItem("cultivaresRecebidos");
        localStorage.setItem("cultivaresRecebidos", JSON.stringify(cultivaresRecebidos));
        //armazena propriedades no localstorage
        localStorage.removeItem("propriedades");
        localStorage.setItem("propriedades", JSON.stringify(propriedades));
        //armazena imagens no localstorage
        localStorage.removeItem("cultivares");
        localStorage.setItem("cultivares", JSON.stringify(cultivares));
        //armazena safra no localstorage
        localStorage.removeItem("safras");
        localStorage.setItem("safras", JSON.stringify(safras));
        //chama o metodo que popula o item de propriedades
        listarPropriedades();
        //chama o metodo que lista as safras
        listarSafras();

    });


}

//funcao que organiza e lista as propriedades
function listarPropriedades(){
    var item;
    $("#itemPropriedades").empty();
    var propriedades = JSON.parse(localStorage.getItem("propriedades"));
    if(propriedades.length > 0){
        var i = 0;
        $.each(propriedades, function(){
            item = '<li id="propriedade'+i+'" role="presentation" class="widget uib_w_287" data-uib="twitter%20bootstrap/tab_item" data-ver="1"><a role="tab" data-toggle="tab">'+propriedades[i].nomepropriedade+'</a></li>';

            $("#itemPropriedades").append(item);

            i++;
        });

        //marca o ultima propriedade como ativa
        $('#propriedade'+ (i-1)).addClass("active");
        //chama a funcao de listar cultivares recebidos
        listarCultivarRecebidos(propriedades[i-1].propriedade_idpropriedade);

    }else{
        $("#cultivarRecebido").empty();

        item = '<a class="list-group-item allow-badge widget uib_w_267" data-uib="twitter%20bootstrap/list_item" data-ver="1"><span class="badge fa fa-rotate-left"> </span><h4 class="list-group-item-heading">Atualizar lista</h4><p class="list-group-item-text">data recebimento/quantidade</p></a>';

        $("#cultivarRecebido").append(item);

        navigator.notification.alert("Nenhum cultivar foi recebido!",function(){},"Alerta","OK");
    }
}
function listarCultivar(){
    $("#cultivarUnidade").empty();

    $.get("http://"+window.ipServidor+":8080/Projeto_BioID-war/servico/cultivar/listar", function(dados){
        var a = dados.data;
        var qnt = a.length;
        for(var i=0; i<qnt; i++){
            var item ='<a class="list-group-item allow-badge widget uib_w_128" data-uib="twitter%20bootstrap/list_item" data-ver="1"><span class="badge fa fa-chevron-right"></span><h4 class="list-group-item-heading">'+ a[i].nomecultivar +'</h4><p class="list-group-item-text">500 kilos</p></a>';

            $("#cultivarUnidade").append(item);
        }

    }, "json");

}



//limpa a memoria do app e redireciona para tela de login
function clearGoMainPage(){
    window.activate_page("#mainpage");
    localStorage.clear();
}

function listarSafras(){
    if(localStorage.getItem("safras")){
        var safras = JSON.parse(localStorage.getItem("safras"));
        var item;
        var i = 0;
        $(".uib_w_354").remove();
        $(".uib_w_355").remove();
        $(".uib_w_356").remove();

        $.each(safras, function(){
            item ='<div class="panel widget panel-success" data-uib="twitter%20bootstrap/collapsible" data-ver="1"><div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" data-toggle="collapse" href="#bs-accordion-group-'+i+'" data-parent="#bs-accordion-1">Safra : '+safras[i].safra+'</a></h4></div><div id="bs-accordion-group-'+i+'" class="panel-collapse collapse"><div class="panel-body"><div class="col uib_col_91 single-col" data-uib="layout/col" data-ver="0"><div class="widget-container content-area vertical-col"><div class="list-group widget safra_'+i+' d-margins" data-uib="twitter%20bootstrap/list_group" data-ver="1"></div><span class="uib_shim"></span></div></div></div></div></div>';



            $(".uib_w_353").append(item);

            listarCultivarSafras(safras[i].safra, i);
            i++;
        });


    }else{
        navigator.notification.confirm(
            'Não existe safras!',
            function() {
                //clearGoMainPage();
            },
            'Erro',
            ['OK']
        );
    }
function listarCultivarSafras(safra, classSafra){
    var cultivaresRecebidos = JSON.parse(localStorage.getItem("cultivaresRecebidos"));
    var item;
    var a;
    var i = 0;

    $.each(cultivaresRecebidos, function(){
        if(safra === cultivaresRecebidos[i].safra){
            a = cultivaresRecebidos[i];
            item ='<a class="list-group-item allow-badge widget uib_w_268" data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="as list-group-item-heading">'+ a.nomecultivar +'</h4><p class="list-group-item-text">Data recebimento: '+a.datareceb+'</p><p class="list-group-item-text">Propriedade: '+a.nomepropriedade+'</p><p class="list-group-item-text">Quantidade recebida: '+a.qtdrecebida+' '+a.grandeza_recebida+'</p><p class="list-group-item-text">'+statusColheita(a.statussafra_idstatussafra)+ a.prazo_colheita+'</p><p class="list-group-item-text">Quantidade colhida: '+a.qtdcolhida+' kilo(s)</p><p class="list-group-item-text">'+statusDestinacao(a.statussafra_idstatussafra)+a.prazo_destinacao+'</p><p class="list-group-item-text">Quantidade destinada: '+a.qtddestinada+' kilo(s)</p></a>';

            $(".safra_"+classSafra).append(item);
        }
    i++;
    });

}

}
