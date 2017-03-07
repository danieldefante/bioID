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
//var papel;

//id da propriedade
//var idpropriedade = 4;

//ip do servidor

var ipServidor = "http://bioid.ddns.net:8088/Projeto_BioID-war";//acesso fora com dns
//var ipServidor = "http://10.1.2.52:8080/Projeto_BioID-war"; //sistema teste interno
//var ipServidor = "http://10.2.10.200:8080/Projeto_BioID-war"; //sistema em producao


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







//function requisicao(url, envio, metodo){
function requisicao(url, envio, callback) {

  //testa se nescessita de painel de carregando
//    if(painelCarregando){
        window.spinnerplugin.show();
//    }
        //alert(JSON.stringify(envio));
       $.ajax({
            type: 'POST',
            url: ipServidor+"/servico/"+url,
            data: JSON.stringify(envio),
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            success: function(retorno){
                callback(retorno);
            },
            error: function() {
//                if(painelCarregando){
                    window.spinnerplugin.hide();
//                }
                navigator.notification.alert("Alerta!", "Sem conexão com o servidor!", function(){
                },"Alerta!", "OK");
            }
        });


}





function verificarPagina(){
     if($('#mainpage').is(":visible")){
         return '#mainpage';

     }else if($('#page_gerenciador').is(":visible")){
         return '#page_gerenciador';

     }else if($('#page_entrevistador').is(":visible")){
         return '#page_entrevistador';

     }else if($('#page_agricultor').is(":visible")){
        return '#page_agricultor';

     }else if($('#page_configuracoes').is(":visible")){
        return '#page_configuracoes';

     }else if($('#page_login').is(":visible")){
        return '#page_login';

     }else if($('#page_erro').is(":visible")){
        return '#page_erro';
     }
}

//function verificarNavBar(){
//    if($('#bs-navbar-1').is(':visible')){
//         return '#bs-navbar-1';
//    }else if($('#bs-navbar-2').is(':visible')){
//         return '#bs-navbar-2';
//    }else{
//         return '#bs-navbar-2';
//    }
//}


function escondeMenuHamburguer(item){

 if($('.botaoMenu').is(':visible')){
    if($(item).is(':visible')){
        $(item).collapse('hide');
        return true;
    }
 return false;
 }

}



function verificarConexao(){

    if(navigator.connection.type == 'none'){


        navigator.notification.alert('Detectamos que o dispositivo está sem conexão à internet, Algumas informações e funções dependem do servidor. Conecte-se a internet se possível!', function(){
        },"Alerta!", "OK");
    }
}


//verifica se existe sessao na localStorage
//inicia pela ultima sessao ou abre tela de login
//function verificaSession(){
//
//    try{
//        if(localStorage.getItem("logSessao")){
//             carregaDados();
//            //verificarDataLogin();
//        }else{
//            //limpa o localstorage e inicia o app da pagina de login
//            localStorage.clear();
//            window.activate_page("#mainpage");
//        }
//    }catch(e){
//        window.alert("Erro verificaSession: " + e.message);
//        clearGoMainPage();
//    }
//}


////funcao para verificar a data referente ao ultimo acesso, se estiver mais de 7 dias sem se conectar redireciona para login
//function verificarDataLogin(){
//
//    try{
//
//        var dataAtual = new Date().getTime() - (5 * 24 * 60 * 60 * 1000);
//        var tempoLogin = JSON.parse(localStorage.getItem("logSessao")).tempoLogin;
//
//        if(dataAtual > tempoLogin){
//            console.log(dataAtual);
//            console.log(tempoLogin);
//        }
//
//
//        var data = new Date(),
//            dia = data.getDate(),
//            mes = data.getMonth() + 1,
//            ano = data.getFullYear();
//
//
//        //teste os dias logado com ultimo login armazenado no localStorage
//        if((730 * mes) - (730 - (dia*24)) > JSON.parse(localStorage.getItem("logSessao")).logTempo){
//            //alerta, redireciona para pagina login e limpa a localStorage
//            navigator.notification.alert("Por motivos de segurança pedimos que faça o login novamente!",function(){},"Alerta","OK");
//            clearGoMainPage();
//        //o app foi aberto antes de 7 dias, entao carrega informacoes da localStorage
//        }else{
//
//            carregaDados();
//        }
//    }catch(e){
//        window.alert("Erro verificarDataLogin: "+ e.message);
//        clearGoMainPage();
//    }
//}

//carrega os dados de cada usuario
//function carregaDados(){
//    try{
//        var dadosSessao = JSON.parse(localStorage.getItem("logSessao"));
//        papel = dadosSessao.papel;
//
//        if(papel === "a"){
//            //usuario agricultor
//            window.activate_page("#page_agricultor");
//            iniciarAgricultor();
//            //verifica se tem conexao com a internet, se tem conexao baixa as atualizacoes
//            verificarConexao();
//            listarPropriedades();
//            listarSafras();
//
//        }else if(papel === "g" || papel === "e" || papel === "d"){
//            //usuario gerenciador e entrevistador
//            window.activate_page("#page_4");
////            iniciarGerEntrev();
////            listarEstoque();
//            //listarAgricultoresUnidade();
//        }else{
//            clearGoMainPage();
//        }
//    }catch(e){
//        window.alert("Erro carregaDados: "+ e.message);
//        clearGoMainPage();
//    }
//
//}


//lista os cultivares recebidos contidos no localStorage de cada propriedade
function listarCultivarRecebidos(nomePropriedade){
    try{

        $("#cultivarRecebido").empty();
        var cultivaresRecebidos = JSON.parse(localStorage.getItem("cultivaresRecebidos"));

        //se nao conter os dados redireciona para acesso no servidor, armazena na localStorage e depois chama novamente o metotodo listarCultivarRecebidos
        if(cultivaresRecebidos === null){
            clearGoMainPage();
        //acessa o localStorge e cria a lista
        }else{
            var a;
            //percore o tamanho do cultivares recebidos e cria um novo item
            $.each(cultivaresRecebidos, function(i){
                a = cultivaresRecebidos[i];
                //teste a propriedade
                if(a.nomepropriedade === nomePropriedade){
                     // var item ='<a id="'+i+'" class="list-group-item allow-badge widget uib_w_268" data-uib="twitter%20bootstrap/list_item" data-ver="1">'+ prazoRelatar(a.statussafra_idstatussafra)+'<h4 class="list-group-item-heading">'+ a.nomecultivar +'</h4><p class="list-group-item-text">Safra: '+ a.safra +'</p><p class="list-group-item-text">'+statusColheita(a.statussafra_idstatussafra)+ a.prazo_colheita+'</p><p class="list-group-item-text">'+statusDestinacao(a.statussafra_idstatussafra)+a.prazo_destinacao+'</p></a>';
                     var item ='<a id="'+i+'" class="list-group-item widget uib_w_268" data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading">'+ a.nomecultivar + prazoRelatar(a.statussafra_idstatussafra)+'</h4><p class="list-group-item-text">Safra: '+ a.safra +'</p><p class="list-group-item-text">'+statusColheita(a.statussafra_idstatussafra)+ a.prazo_colheita+'</p><p class="list-group-item-text">'+statusDestinacao(a.statussafra_idstatussafra)+a.prazo_destinacao+'</p></a>';
                    $("#cultivarRecebido").append(item);
                }
            });
        }
    }catch(e){
        window.alert("Erro listarCultivarRecebidos: "+ e.message);
        clearGoMainPage();
    }
}

function prazoRelatar(status){

    if(status === 7 || status === 8){
        //return '<span class="vermelho badge fa fa-thumbs-o-down"><span class="vermelho badge fa fa-chevron-right"> </span></span>';
        return '<i class="vermelho fa fa-thumbs-o-down button-icon-right" data-position="top"></i>';
    }else if(status === 6 ){
        return '<i class="verde fa fa-thumbs-o-up button-icon-right" data-position="top"></i>';
        //return '<span class="verde badge fa fa-thumbs-o-up"><span class="verde badge fa fa-chevron-right"> </span></span>';
    }else if(status === 1){
        return '<i class="laranja fa fa-hand-o-right button-icon-right" data-position="top"></i>';
        // return ' <span class="laranja badge fa fa-chevron-right"> </span>';
    }else{
        //return ' <span class="amarelo badge fa fa-chevron-right"> </span>';
        return '<i class="amarelo fa fa-hand-o-right button-icon-right" data-position="top"></i>';
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


function getSessao(){
    var logSessao = JSON.parse(localStorage.getItem("logSessao"));
    return logSessao;
}

function updateSessao(novaSessao){
    var logSessao = JSON.parse(localStorage.getItem("logSessao"));
    logSessao.sessao = novaSessao;
    localStorage.setItem("logSessao", JSON.stringify(logSessao));
}

//servico de busca dos dados no servidor, consome dados de internet e armazena no localStorage
function servArmazenarCulRecebdo(idpessoa, sessao){

    var cultivaresRecebidos = [];
    var propriedades = [];
    var cultivares = [];
    var safras = [];


    $.post("http://"+window.ipServidor+"/Projeto_BioID-war/servico/cultivar/listarrecebidos", "idpessoa="+idpessoa+'&sessao='+sessao, function(dados){
        window.spinnerplugin.show();
        //armazena no localStorge
        if(dados.sucesso){

            //armazena os cultivares recebidos
            cultivaresRecebidos = dados.cultivaresrecebidos;
            //armazena as imagens dos cultivares em um array
            cultivares = dados.cultivares;

            //adiciona as propriedades e as safras em arrays
            $.each(dados.cultivaresrecebidos, function(i, valor){

                if(propriedades.indexOf(valor.nomepropriedade) < 0){
                    propriedades.push(valor.nomepropriedade);
                }

                if(safras.indexOf(valor.safra) < 0){
                    safras.push(valor.safra);
                }

            });
            window.updateSessao(dados.sessao);
        }
    }, "json")
    //Tratamento de erro da requisicao servico RESt login
    .fail(function(){
        window.spinnerplugin.hide();
        verificarConexao();
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
        //armazena safra no localstorage
        //localStorage.removeItem("perguntas");
        //localStorage.setItem("perguntas", JSON.stringify(perguntas));
        //chama o metodo que popula o item de propriedades
        listarPropriedades();
        //chama o metodo que lista as safras
        listarSafras();
        window.spinnerplugin.hide();
    });


}


//funcao que organiza e lista as propriedades
function listarPropriedades(){
    var item;
    var itemP;
    $(".uib_w_286").empty();
    $(".uib_w_357").empty();

    var propriedades = JSON.parse(localStorage.getItem("propriedades"));

    if(propriedades.length > 0){

        $.each(propriedades, function(i){
            item = '<li role="presentation" class="widget uib_w_287" data-uib="twitter%20bootstrap/tab_item" data-ver="1"><a role="tab" data-toggle="tab">'+propriedades[i]+'</a></li>';

            itemP = '<li role="presentation" class="widget uib_w_358" data-uib="twitter%20bootstrap/tab_item" data-ver="1"><a role="tab" data-toggle="tab">'+propriedades[i]+'</a></li>';

            $(".uib_w_286").append(item);
            $(".uib_w_357").append(itemP);

        });


        //marca o ultima propriedade como ativa
        $('.uib_w_287').last().addClass("active");
        $('.uib_w_358').last().addClass("active");


        //chama a funcao de listar cultivares recebidos
        listarCultivarRecebidos(propriedades[propriedades.length - 1]);

    }else{
        $("#cultivarRecebido").empty();

//        item = '<a class="list-group-item allow-badge widget uib_w_267" data-uib="twitter%20bootstrap/list_item" data-ver="1"><span class="badge fa fa-rotate-left"> </span><h4 class="list-group-item-heading">Atualizar lista</h4><p class="list-group-item-text">data recebimento/quantidade</p></a>';
//
//        $("#cultivarRecebido").append(item);

        navigator.notification.alert("Nenhum cultivar recebido!\nReceba cultivares biofortificados em uma unidade de distribuição mais próxima de você,\nmais dúvidas entre em contato com inovacao@fundetec.org.br",function(){},"Alerta","OK");
    }
}


//LISTA ESTOQUE DA UNIDADE PAPEL GERENCIADOR
function listarEstoqueGerenciador(){

    var Sessao = getSessao();
    var envio = {
            metodo: "TODOS",
            idunidade: Sessao.idunidade
        };

    //chama a requisicao do servidor, o resultado é listado em uma tabela
    requisicao("estoque/listar", envio, function(dadosRetorno) {
        if(dadosRetorno.sucesso){

            $('#itensEstoqueGerenciador').empty();
            $.each(dadosRetorno.data, function(i, valor){
//                items += "<tr><td>"+valor.idcultivar+"</td><td>"+valor.nomecultivar+"</td><td>"+valor.quantidade+"</td><td>"+valor.grandeza+"</td></tr>";
                $('#itensEstoqueGerenciador').append('<a class="list-group-item widget " data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading">'+valor.nomecultivar+'<i class="amarelo glyphicon glyphicon-chevron-right button-icon-right" data-position="top"></i></h4><p class="list-group-item-text">'+valor.quantidade+' '+valor.grandeza+'</p></a>');
            });

            //retira o painel loading
             window.spinnerplugin.hide();
        }else{
            //retira o painel loading
            window.spinnerplugin.hide();
            navigator.notification.alert(dadosRetorno.mensagem, function(){},"Erro!", "Sair");

        }

    });



//    var Sessao = getSessao();
//
//    var data = { idunidade: Sessao.idunidade};
//
//
//    $.post("http://"+window.ipServidor+"/Projeto_BioID-war/servico/unidade/listarestoque", data, function(dados){
//        window.spinnerplugin.show();
//        if(dados.sucesso){
//            var estoque = dados.estoque;
//            sessionStorage.setItem('estoque', JSON.stringify(estoque));
//            $('#itensTabelaEstoque').empty();
//
//            var i = 0;
//            $.each(estoque, function(){
//
//                $('#itensTabelaEstoque').append('<a id="culEstoque"'+ i +' class="list-group-item widget" data-uib="twitter%20bootstrap/list_item" data-ver="1"><span class="badge fa fa-chevron-right"></span><h4 class="list-group-item-heading">'+estoque[i].nomecultivar+'</h4><p class="list-group-item-text">'+parseFloat(estoque[i].quantidade.toFixed(2))+' '+estoque[i].grandeza+'</p></a>');
//                i++;
//            });
//            updateSessao(dados.sessao);
//        }
//    },"json")
//    //Tratamento de erro da requisicao servico RESt login
//    .fail(function(){
//        window.spinnerplugin.hide();
//        window.verificarConexao();
//
//
//        //msg em lista de agricultores
//        $('#itensTabelaEstoque').empty().append('<a class="list-group-item widget" data-uib="twitter%20bootstrap/list_item" data-ver="1"><span class="badge fa fa-chevron-right"></span><h4 class="list-group-item-heading">Sem conexão com o servidor!</h4></a>');
//
//
//    }).done(function(){
//        window.spinnerplugin.hide();
//    });


}
//FIM LISTA ESTOQUE DA UNIDADE PAPEL GERENCIADOR

//LISTA ESTOQUE DA UNIDADE PAPEL ENTREVISTADOR
function listarEstoqueEntrevistador(){

    var Sessao = getSessao();
    var envio = {
            metodo: "TODOS",
            idunidade: Sessao.idunidade
        };

    //chama a requisicao do servidor, o resultado é listado em uma tabela
    requisicao("estoque/listar", envio, function(dadosRetorno) {
        if(dadosRetorno.sucesso){

            $('#itensEstoqueEntrevistador').empty();
            $.each(dadosRetorno.data, function(i, valor){
//                items += "<tr><td>"+valor.idcultivar+"</td><td>"+valor.nomecultivar+"</td><td>"+valor.quantidade+"</td><td>"+valor.grandeza+"</td></tr>";
                $('#itensEstoqueEntrevistador').append('<a class="list-group-item widget " data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading">'+valor.nomecultivar+'<i class="amarelo glyphicon glyphicon-chevron-right button-icon-right" data-position="top"></i></h4><p class="list-group-item-text">'+valor.quantidade+' '+valor.grandeza+'</p></a>');
            });

            //retira o painel loading
//             window.spinnerplugin.hide();
        }else{
            //retira o painel loading
            window.spinnerplugin.hide();
            navigator.notification.alert(dadosRetorno.mensagem, function(){},"Erro!", "Sair");

        }

    });

}
//FIM LISTA ESTOQUE DA UNIDADE PAPEL ENTREVISTADOR

function listarPropriedadesBackup(){
    var backupPropriedades = [];
    var item;

    $('.uib_w_363').empty();
    if(localStorage.getItem('backupPropriedades')){
        backupPropriedades = JSON.parse(localStorage.getItem('backupPropriedades'));

        $.each(backupPropriedades, function(i){

            item = '<a class="list-group-item widget uib_w_364" data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading"><span class="fa fa-briefcase">&nbsp;</span>'+backupPropriedades[i].nomepropriedade+'<i class=" amarelo glyphicon glyphicon-chevron-right button-icon-right" data-position="top"></i></h4><p class="list-group-item-text idpropriedadeBackup" hidden> '+backupPropriedades[i].idpropriedade+'</p></a>';

            $('.uib_w_363').append(item);
        });
    }else{
        item = '<a id="infoSemBackup" class="list-group-item widget " data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading"><span class="glyphicon glyphicon-info-sign"></span>&nbsp;&nbsp;&nbsp;Não contém propriedades armazenadas!</h4></a>';

        $('.uib_w_363').append(item);
    }


}

//LISTA OS AGRICULTORES DA UNIDADE
function listarAgricultoresUnidade(lista){

    var Sessao = getSessao();
    var envio = {
        metodo: "TODOS_DA_UNIDADE",
        usuario: Sessao.usuario,
        sessao: Sessao.sessao,
        idunidade: Sessao.idunidade
    };

    //chama a requisicao do servidor, o resultado é listado em uma tabela
    requisicao("agricultor/listar", envio, function(dadosRetorno) {

        if(dadosRetorno.sucesso){

//            sessionStorage.setItem('listaAgricultores', JSON.stringify(listaAgricultores));
            $(lista).empty();

            $.each(dadosRetorno.data, function(i, valor){
                $(lista).append( '<a class="list-group-item widget " data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading">'+valor.nome+'<i class="amarelo glyphicon glyphicon-chevron-right button-icon-right" data-position="top"></i></h4><p class="list-group-item-text"> '+valor.sobrenome+'</p><p class="list-group-item-text"> RG: '+valor.rg+'</p><p class="list-group-item-text">CPF: '+valor.cpf+'</p><p class="list-group-item-text usuarioOculto" hidden>'+valor.idpessoa+'</p></a>');

            });

//item += "<tr><td>"+valor.idpessoa+"</td><td>"+valor.nome+"</td><td>"+valor.sobrenome+"</td><td>"+valor.rg+"</td><td>"+valor.cpf+"</td><td>"+valor.telefone1+"</td><td>"+valor.nomeunidade+"</td></tr>";


             //retira o painel loading
             window.spinnerplugin.hide();
        }else{
            //retira o painel loading
            window.spinnerplugin.hide();
            navigator.notification.alert(dadosRetorno.mensagem, function(){},"Erro!", "Sair");

        }

    });






//    var Sessao = getSessao();
//    var data = {idunidade: Sessao.idunidade};
//
//    window.console.log(data);
//    $.post("http://"+window.ipServidor+"/Projeto_BioID-war/servico/unidade/listaragricultoresunidade", data, function(dados){
//        window.spinnerplugin.show();
//        if(dados.sucesso){
//            var listaAgricultores = dados.listaAgricultores;
//            sessionStorage.setItem('listaAgricultores', JSON.stringify(listaAgricultores));
//            $('.uib_w_118').empty();
//            var item;
//            $.each(listaAgricultores, function(i){
//
//                item = '<a class="list-group-item widget uib_w_119" data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading">'+listaAgricultores[i].nome+'<i class="amarelo glyphicon glyphicon-chevron-right button-icon-right" data-position="top"></i></h4><p class="list-group-item-text"> '+listaAgricultores[i].sobrenome+'</p><p class="list-group-item-text usuarioOculto" hidden>'+listaAgricultores[i].idpessoa+'</p></a>';
//
//
//                //window.console.log('usuario='+listaAgricultores[i].usuario+'&idunidade='+2);
//
//
//                $('.uib_w_118').append(item);
//            });
//            updateSessao(dados.sessao);
//        }
//    },"json")
//    //Tratamento de erro da requisicao servico RESt login
//    .fail(function(){
//        window.spinnerplugin.hide();
//        window.verificarConexao();
//        $('.uib_w_118').empty().append('<a class="list-group-item widget uib_w_119" data-uib="twitter%20bootstrap/list_item" data-ver="1"><span class="badge fa fa-chevron-right"></span><h4 class="list-group-item-heading">Sem conexão com o servidor!</h4></a>');
//
//    }).done(function(){
//        window.spinnerplugin.hide();
//    });

}
//FIM LISTA OS AGRICULTORES DA UNIDADE



//limpa a memoria do app e redireciona para tela de login
function clearGoMainPage(){
    window.activate_page("#mainpage");
    sessionStorage.clear();
    localStorage.clear();
}

function listarSafras(){
    if(localStorage.getItem("safras")){
        var safras = JSON.parse(localStorage.getItem("safras"));
        var item;


        $(".uib_w_353").empty();

        $.each(safras, function(i){
            item ='<a id="safra_'+i+'" class="list-group-item widget" data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading">'+safras[i]+'<i class="amarelo glyphicon glyphicon-chevron-up button-icon-right" data-position="top"></i></h4></a>';


            $(".uib_w_353").append(item);

            listarCultivarSafras(safras[i], i);
            $('#safra_'+i+' pre').hide();

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

    $.each(cultivaresRecebidos, function(i){

        if(safra === cultivaresRecebidos[i].safra){
            a = cultivaresRecebidos[i];

            item = '<pre class="itensPre"><h5 class=" list-group-item-text">'+a.nomecultivar+'</h5><p class="list-group-item-text">Data recebimento: '+a.datareceb+'</p><p class="list-group-item-text">Propriedade: '+a.nomepropriedade+'</p><p class="list-group-item-text">Quantidade recebida: '+a.qtdrecebida+' '+a.grandeza_recebida+'</p><p class="list-group-item-text">'+statusColheita(a.statussafra_idstatussafra)+ a.prazo_colheita+'</p><p class="list-group-item-text">Quantidade colhida: '+a.qtdcolhida+' kilo(s)</p><p class="list-group-item-text">'+statusDestinacao(a.statussafra_idstatussafra)+a.prazo_destinacao+'</p><p class="list-group-item-text">Quantidade destinada: '+a.qtddestinada+' kilo(s)</p> </pre>';


            $("#safra_"+classSafra).append(item);
        }
    });

}








}
