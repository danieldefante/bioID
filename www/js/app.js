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
//var ipServidor = "10.2.10.200";
var ipServidor = "localhost";


//funcao mudar background aleatorio
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
}

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
                    var item ='<a id="'+i+'" class="list-group-item allow-badge widget uib_w_268" data-uib="twitter%20bootstrap/list_item" data-ver="1">'+ cultivarRelatado(a.status)+'<h4 class="list-group-item-heading">'+ a.nomecultivar +'</h4><p class="list-group-item-text">Safra: '+ a.safra +'</p><p class="list-group-item-text">Quantidade recebida: '+ a.qtdrecebida +'&nbsp'+ a.grandeza_cultivar +'</p><p class="list-group-item-text">data recebimento: '+a.datareceb+'</p><p class="list-group-item-text">Status: '+a.status+'</p></a>';
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


//servico de busca dos dados no servidor, consome dados de internet e armazena no localStorage
function servArmazenarCulRecebdo(usuario){
    var cultivaresRecebidos = [];
    var propriedades = [];
    var cultivares = [];

    $.post("http://"+window.ipServidor+":8080/Projeto_BioID-war/servico/cultivar/listarrecebidos", usuario, function(dados){
        //armazena no localStorge
        if(dados.sucesso){
            var i = 0;
            $.each(dados.data, function(){
                //armazena os cultivares em um array
                cultivaresRecebidos[i] = {nomecultivar: dados.data[i].nomecultivar, qtdrecebida: dados.data[i].qtdrecebida, grandeza_cultivar: dados.data[i].grandeza_cultivar, safra: dados.data[i].qtdrecebida, datareceb: dados.data[i].datareceb, status: dados.data[i].status, nomepropriedade: dados.data[i].nomepropriedade};
                //armazena a propriedade em um array
                if(propriedades.length < 1){
                    propriedades[0] = {propriedade_idpropriedade: cultivaresRecebidos[i].propriedade_idpropriedade, nomepropriedade: cultivaresRecebidos[i].nomepropriedade};
                }else if(propriedades[propriedades.length - 1].nomepropriedade != cultivaresRecebidos[i].nomepropriedade){
                    propriedades[propriedades.length] = {propriedade_idpropriedade: cultivaresRecebidos[i].propriedade_idpropriedade, nomepropriedade: cultivaresRecebidos[i].nomepropriedade};
                }
                //salvar imagem
                //imagens[i] = dados.i

                i++;
            });

            //armazena as imagens dos cultivares em um array
            cultivares = dados.cultivares;
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
        localStorage.setItem("cultivaresRecebidos", JSON.stringify(cultivaresRecebidos));
        //armazena propriedades no localstorage
        localStorage.setItem("propriedades", JSON.stringify(propriedades));
        //armazena imagens no localstorage
        localStorage.setItem("cultivares", JSON.stringify(cultivares));
        //chama o metodo que popula o item de propriedades
        listarPropriedades();


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

        item = '<a id="1" class="list-group-item allow-badge widget uib_w_267" data-uib="twitter%20bootstrap/list_item" data-ver="1"><span class="badge fa fa-rotate-left"> </span><h4 class="list-group-item-heading">Atualizar lista</h4><p class="list-group-item-text">data recebimento/quantidade</p></a>';

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
            var item ='<a id="1" class="list-group-item allow-badge widget uib_w_128" data-uib="twitter%20bootstrap/list_item" data-ver="1"><span class="badge fa fa-chevron-right"></span><h4 class="list-group-item-heading">'+ a[i].nomecultivar +'</h4><p class="list-group-item-text">500 kilos</p></a>';

            $("#cultivarUnidade").append(item);
        }

    }, "json");

}


function cultivarRelatado(teste){
    if(teste === 'relatada'){
        return '<span class="verde badge fa fa-thumbs-o-up"><span class="verde badge fa fa-chevron-right"> </span></span>';

    }else if(teste === 'tempo expirado para relatar'){
        return '<span class="vermelho badge fa fa-thumbs-o-down"><span class="vermelho badge fa fa-chevron-right"> </span></span>';

    }else{
        return '<span class="amarelo badge fa fa-chevron-right"> </span>';

    }

}

//limpa a memoria do app e redireciona para tela de login
function clearGoMainPage(){
    window.activate_page("#mainpage");
    localStorage.clear();
}
