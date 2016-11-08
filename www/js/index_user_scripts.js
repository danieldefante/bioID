/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers
 */
 function onBackKeyDown()
 {


     //esconde o menu hambueguer
     function escondeMenuHamb(item){

         var esconder = true;
         if($('#'+item).is(':visible') && $('.botaoMenu').is(':visible')){
             $('#'+item).collapse('hide');
             esconder= false;
         }
         return esconder;
     }

    //pagina inicial
     if($('#mainpage').is(":visible")){
        navigator.notification.confirm(
            'Deseja fechar o app?', // message
            function(buttonIndex) {
                if(buttonIndex == 2){
                    navigator.app.exitApp();
                }
            },            // callback to invoke with index of button pressed
            'Confirmação',           // title
            ['Cancelar', 'Fechar']     // buttonLabels
         );
    //pagina login
     }else if($('#page_1').is(":visible")){
         activate_page("#mainpage");
         $('.uib_w_133').hide();
         $('.uib_w_133').fadeIn(100);
    //pagina cadastro
     }else if($('#page_2').is(":visible")){
        if(window.localStorage.getItem("logSessao")){
            activate_page("#page_4");
            $('.uib_w_154').hide();
            $('.uib_w_154').fadeIn(100);
        }else{

            $(".camposcadastro").val("");
            activate_page("#mainpage");
            $('.uib_w_133').hide();
            $('.uib_w_133').fadeIn(100);
        }

     //pagina inicial agricultor, cultivares recebidos
     }else if($('#recebidos').is(":visible") && escondeMenuHamb('bs-navbar-1')){
         navigator.notification.confirm(
            'Deseja fechar o app?', // message
            function(buttonIndex) {
                if(buttonIndex == 2){
                    navigator.app.exitApp();
                }
            },            // callback to invoke with index of button pressed
            'Confirmação',           // title
            ['Cancelar', 'Fechar']     // buttonLabels
         );
     //pagina safras agricultor
     }else if($('#safra').is(":visible") && escondeMenuHamb('bs-navbar-1')){
         $('#safra').fadeOut(100, function(evt){
            $("#recebidos").fadeIn(100);
        });
     //pagina relatorios
     }else if($('#relatorios').is(":visible") && escondeMenuHamb('bs-navbar-1')){
          $('#relatorios').fadeOut(100, function(evt){
            $("#recebidos").fadeIn(100);
        });
     //pagina relatar cultivar
     }else if($('#page_6').is(":visible") && escondeMenuHamb('bs-navbar-1')){
        //voltar a lista de cultivares recebidos
        if($('.uib_w_250').is(':visible')){
            $('.uib_w_250').fadeOut(100, function(evt){
                activate_page("#page_3");
                $("#recebidos").hide();
                $("#recebidos").fadeIn(100);
                $("#page_3").scrollTop(0);
                sessionStorage.removeItem("indiceSelecionado");
            });
        }else if($('.uib_w_416').is(':visible')){
            $('.uib_w_416').fadeOut(100, function(evt){

                $(".uib_w_250").fadeIn(100);
            });
        }else{
            $('.uib_w_418').fadeOut(100, function(evt){

                $(".uib_w_250").fadeIn(100);
            });
        }

     //pagina de configuracoes
     }else if($('#page_99').is(":visible")){
         if(window.papel === "a"){
             activate_page("#page_3");
         }else if(window.papel === "e" || window.papel === "g"){
             activate_page("#page_4");
         }else{
             window.clearGoMainPage();
         }
     //inicio entrevistador, estoque
     }else if($('.uib_w_123').is(":visible") && escondeMenuHamb('bs-navbar-2')){


         navigator.notification.confirm(
            'Deseja fechar o app?', // message
            function(buttonIndex) {
                if(buttonIndex == 2){
                    navigator.app.exitApp();
                }
            },            // callback to invoke with index of button pressed
            'Confirmação',           // title
            ['Cancelar', 'Fechar']     // buttonLabels
         );

     //lista agricultores papel entrevistador var t = [".uib_w_116",".uib_w_123", ".uib_w_361", ".uib_w_378"];
     }else if($('.uib_w_116').is(":visible") && escondeMenuHamb('bs-navbar-2')){
         $('.uib_w_154').fadeOut(100, function(evt){
             $('.uib_w_116').hide();
             $('.uib_w_123').show();
             $(".uib_w_154").fadeIn(100);
         });

       //entrevistador
     }else if($('.uib_w_361').is(":visible") && escondeMenuHamb('bs-navbar-2')){
         $('.uib_w_154').fadeOut(100, function(evt){
             $('.uib_w_361').hide();
             $('.uib_w_123').show();
             $(".uib_w_154").fadeIn(100);

         });
     //entrevistador
     }else if($('.uib_w_361').is(":visible") && escondeMenuHamb('bs-navbar-2')){
         $('.uib_w_154').fadeOut(100, function(evt){
             $('.uib_w_378').hide();
             $('.uib_w_123').show();
             $(".uib_w_154").fadeIn(100);

         });
     }
 }


 function register_event_handlers()
 {


     function c(msg){
         window.console.log(msg);
     }

     $(document).ready(function(){
        $('.numeroInt').mask('000000000000000');
        $('#icpf').mask('000.000.000-00');//,{'translation': {'u': {pattern: /[0123456789.-]/, optional: true, recursive: true}}};

        $('#irg').mask('00000.000-0', {reverse: true});
        $('#icep').mask('00000-000', {reverse: true});
        $('.telefone').mask('(00) #0000-0000');
        $('#inome').mask('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',{'translation': {'a': {pattern: /[A-Za-zçÇãÃâÂáÁàÀéÉíÍõÕôÔúÚ]/}}});
        $(".palavras").mask('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',{'translation': {'a': {pattern: /[A-Za-zçÇãÃâÂáÁàÀéÉíÍõÕôÔúÚ\s]/}}});
        $("#iusuario").mask('aaaaaaaaaaaaaaa',{'translation': {'a': {pattern: /[A-Za-z0-9_-]/, optional: true, recursive: true}}});
        $("#irua").mask('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',{'translation': {'a': {pattern: /[A-Za-z0-9çÇãÃâÂáÁàÀéÉíÍõÕôÔúÚ'\s]/, optional: true, recursive: true}}});
        //$("#iemail").mask('a',{'translation': {'a': {pattern: /[A-Za-z@-_.0-9]/}}});
        $("#iemail").mask('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',{'translation': {'a': {pattern: /[A-Za-z@-_.0-9]/, optional: true, recursive: true}}});

     });


     //lista os cultivares por propriedade, metodo entrevistador
     $(document).on("click", ".uib_w_118 > a", function(evt){
        $('.uib_w_380').empty();

          $('.uib_w_380').append('<a class="list-group-item propriedadeBackup widget" data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading"><span class="glyphicon glyphicon-refresh" ></span>&nbsp;&nbsp;&nbsp;Carregando...</h4></a>');
         //$('.uib_w_384').hide();


        var data = 'idpessoa='+$(this).children('.usuarioOculto').text();



        $.post("http://"+window.ipServidor+"/Projeto_BioID-war/servico/pessoa/listarpropriedades", data, function(dados){
            window.spinnerplugin.show();
            //teste da requisicao no banco esta correta
            if(dados.sucesso){

                listarBkpEstrevistaP(dados);

            }

        },"json")
        //Tratamento de erro da requisicao servico RESt login
        .fail(function(){
            window.spinnerplugin.hide();
            window.verificarConexao();


        }).done(function(){
            window.spinnerplugin.hide();
        });



         $('.uib_w_154').fadeOut(100, function(evt){
             $(".uib_w_116").hide();
             $('.uib_w_378').show();
             $(".uib_w_154").fadeIn(100);

         });

         //$(".uib_w_378").show();
         //$(".uib_w_116").hide();
     });


     //esqueceu a senha
     $(document).on("click", "#esqueceuSenha", function(evt){
         navigator.notification.alert("suporte_bioid@fundetec.org.br",function(){},"Contato:", "Sair");
     });



        /* button  .uib_w_3 */
    $(document).on("click", ".uib_w_3", function(evt)
    {
         /*global activate_page */
         activate_page("#page_1");
         $('.uib_w_7').hide();
         $('.uib_w_7').fadeIn(100);


         return false;
    });

        /* button  .uib_w_4 */
    $(document).on("click", ".uib_w_4", function(evt)
    {
         /*global activate_page */
         activate_page("#page_2");
         $('.uib_w_156').hide();
         $('.uib_w_158').hide();
         $('.uib_w_172').hide();
         $('.uib_w_165').hide();

         $('.uib_w_156').fadeIn(100);
         $('.uib_w_158').fadeIn(100);
         $('.uib_w_172').fadeIn(100);
         $('.uib_w_165').fadeIn(100);
         return false;
    });

        /* button  .uib_w_31 */
    $(document).on("click", ".uib_w_31", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage");
         $('.uib_w_133').hide();
         $('.uib_w_133').fadeIn(100);
         $("#inputSenha").val("");
         return false;
    });

        /* button  .uib_w_32 */
    $(document).on("click", ".uib_w_32", function(evt)
    {
         /*global activate_page */
        if(window.localStorage.getItem("logSessao")){
            activate_page("#page_4");
            $('.uib_w_154').hide();
            $('.uib_w_154').fadeIn(100);
        }else{

            $(".camposcadastro").val("");
            activate_page("#mainpage");
            $('.uib_w_133').hide();
            $('.uib_w_133').fadeIn(100);
        }
         return false;
    });


        /* button  .uib_w_38 */
    $(document).on("click", ".uib_w_38", function(evt)
    {
         window.iniciarAgricultor();
         return false;
    });


        /* button  .uib_w_62 */
    $(document).on("click", ".uib_w_62", function(evt)
    {
         /*global activate_page */
         activate_page("#page_2");
         return false;
    });

        /* button  .uib_w_71 */
    $(document).on("click", ".uib_w_71", function(evt)
    {
         /*global activate_page */
         activate_page("#page_2");
         return false;
    });

        /* button  .uib_w_81 */
    $(document).on("click", ".uib_w_81", function(evt)
    {
         /*global activate_page */
         activate_page("#page_2");
         return false;
    });


     function boxFades(itens){
        var i = 0;
        var visivel;
        $.each(itens, function(){
            if($(itens[i]).is(':visible')){
                visivel = itens[i];
                return false;
            }
            i++;
        });

        return visivel;
    }

        /* button  botao socioe */
    $(document).on("click", ".uib_w_45", function(evt)
    {
        if(!escondeMenuHamburguer('bs-navbar-1')){
            if(sessionStorage.getItem('indiceSelecionado')){
                navigator.notification.confirm(
                    'O cultivar não foi relatado, Deseja cancelar?', // message
                     testeButtonSafras,            // callback to invoke with index of button pressed
                    'Confirmação',           // title
                    ['Não','Sim']     // buttonLabels
                );
             }else{
                 var t = ["#recebidos","#destinacao", "#colheita", "#relatorios","#safra"];

                 $(boxFades(t)).fadeOut(100, function(evt){
                     $("#safra").fadeIn(100);
                 });


             }
         }

         return false;
    });
    function testeButtonSafras(buttonIndex){
         if(buttonIndex === 2){
             //limpa o sessionStorage
             window.sessionStorage.clear();
             var t = ["#recebidos","#destinacao", "#colheita", "#relatorios","#safra"];

             $(boxFades(t)).fadeOut(100, function(evt){
                 $("#safra").fadeIn(100);
             });
         }
     }

        /* button  safras */
    $(document).on("click", ".uib_w_46", function(evt)
    {

        if(!escondeMenuHamburguer('bs-navbar-1')){
            if(sessionStorage.getItem('indiceSelecionado')){
                navigator.notification.confirm(
                    'O cultivar não foi relatado, Deseja cancelar?', // message
                     testeButtonSocioEco,            // callback to invoke with index of button pressed
                    'Confirmação',           // title
                    ['Não','Sim']     // buttonLabels
                );
             }else{

                 var t = ["#recebidos","#destinacao", "#colheita", "#relatorios","#safra"];

                 $(boxFades(t)).fadeOut(100, function(evt){
                     $("#relatorios").fadeIn(100);
                 });


             }
         }

         return false;
    });

     function testeButtonSocioEco(buttonIndex){
         if(buttonIndex === 2){
             //limpa o sessionStorage
             window.sessionStorage.clear();
             var t = ["#recebidos","#destinacao", "#colheita", "#relatorios","#safra"];

             $(boxFades(t)).fadeOut(100, function(evt){
                 $("#relatorios").fadeIn(100);
             });

         }
     }


    /* button  atalho recebidos */
    $(document).on("click", ".uib_w_44", function(evt)
    {
        if(!escondeMenuHamburguer('bs-navbar-1')){
            if(sessionStorage.getItem('indiceSelecionado')){
                navigator.notification.confirm(
                    'O cultivar não foi relatado, Deseja cancelar?', // message
                     testeButtonRecebidos,            // callback to invoke with index of button pressed
                    'Confirmação',           // title
                    ['Não','Sim']     // buttonLabels
                );
            }else{
                //verifica se existe conexao, se existir baixa do servidor informações
                if(navigator.connection.type != 'none'){
                    window.servArmazenarCulRecebdo(window.getIdPessoa(), window.getSessao());
                    c('entrou');
                }
                var t = ["#recebidos","#destinacao", "#colheita", "#relatorios","#safra"];

                $(boxFades(t)).fadeOut(100, function(evt){
                    $("#recebidos").fadeIn(100);
                });
            }
         }

         return false;
    });


     function testeButtonRecebidos(buttonIndex){
         if(buttonIndex === 2){
            //limpa o sessionStorage
            window.sessionStorage.clear();
            window.iniciarAgricultor();
         }
     }


         /* button  */
    $(document).on("click", ".uib_w_358", function(evt)
    {
        $('.uib_w_357').append($(this));
         return false;
    });


        /* button   */
    $(document).on("click", ".uib_w_360", function(evt)
    {
        $('.uib_w_154').fadeOut(100);
         activate_page("#page_2");

         $('.uib_w_156').hide();
         $('.uib_w_158').hide();
         $('.uib_w_172').hide();
         $('.uib_w_165').hide();

        // $('.uib_w_154').fadeOut(100, function(evt){
             $('.uib_w_156').fadeIn(100);
             $('.uib_w_158').fadeIn(100);
             $('.uib_w_172').fadeIn(100);
             $('.uib_w_165').fadeIn(100);
         //});
         return false;
    });

    /* button  entrevista */
    $(document).on("click", ".uib_w_50", function(evt)
    {

        var t = [".uib_w_116",".uib_w_123", ".uib_w_361", ".uib_w_378"];
        var a = boxFades(t);
         $('.uib_w_154').fadeOut(100, function(evt){

             $(a).hide();
             $('.uib_w_361').show();
             $(".uib_w_154").fadeIn(100);
             window.listarPropriedadesBackup();

         });
         return false;
    });

        /* button  .uib_w_51 */
    $(document).on("click", ".uib_w_51", function(evt)
    {
         retornaInicioUser3();

         return false;
    });

        /* button  .uib_w_52 */
    $(document).on("click", ".uib_w_52", function(evt)
    {

         retornaListaAgrUnid();

         window.listarAgricultoresUnidade();

         return false;
    });

    function retornaListaAgrUnid(){
         var t = [".uib_w_116",".uib_w_123", ".uib_w_361", ".uib_w_378"];
         var a = boxFades(t);
         $('.uib_w_154').fadeOut(100, function(evt){
             $(a).hide();
             $('.uib_w_116').show();
             $(".uib_w_154").fadeIn(100);

         });
     }

     function retornaInicioUser3(){

         var t = [".uib_w_116",".uib_w_123", ".uib_w_361", ".uib_w_378"];
         var a = boxFades(t);
         $('.uib_w_154').fadeOut(100, function(evt){
             $(a).hide();
             $('.uib_w_123').show();
             $(".uib_w_154").fadeIn(100);

         });

         //lista o estoque
         window.listarEstoque();
     }

    $("#inputSenha").keypress(function(e){
        if(e.which === 13){
            window.validacaoLogin();
        }

    });



     /* button  .uib_w_10 */
    $(document).on("click", ".uib_w_10", function(evt)
    {

         validacaoLogin();

         return false;
    });

    //verifica se o campo usuario e senha estao preenchidos e faz a requisicao para o servidor, servico REst login
    function validacaoLogin(){
        try{
            var usuario = "usuario="+$("#inputUsuario").val();
            //cria um json para a requisicao post
            var data = usuario+"&senha="+$("#inputSenha").val();

            $.post("http://"+window.ipServidor+"/Projeto_BioID-war/servico/pessoa/validacao", data, function(dados){
                window.spinnerplugin.show();
                //teste da requisicao no banco esta correta
                if(dados.sucesso){
                   //guarda dados do usuario no local storge
                    var logSessao = JSON.stringify({
                        idpessoa:  dados.idpessoa,
                        sessao: dados.sessao,
                       // tempoLogin: dados.tempoLogin,
                        papel: dados.papel,
                        idunidade: dados.idunidade
                    });
                    window.localStorage.setItem("logSessao", logSessao);


                    window.papel = dados.papel;
                    //limpa o campo senha
                    $("#inputSenha").val("");
                    //verifica o tipo de funcionario
                    if(window.papel === "a"){
                        //rest popular propriedades
                        //chama o metodo que busca dados no servidor e armazena no localStorage
                        //para outro metodo acessar e criar a lista de cultivares recebidos
                        window.iniciarAgricultor();
                        window.servArmazenarCulRecebdo(dados.idpessoa, window.getSessao());
                        activate_page("#page_3");
                    }else{

                        window.listarEstoque();

                        window.iniciarGerEntrev();
                        activate_page("#page_4");
                        $('.uib_w_154').hide();
                        $('.uib_w_154').fadeIn();

                    }




                //informa se o usuario ou senha esta incorreta
                }else if($("#inputUsuario").val()=== ""){
                    navigator.notification.confirm(
                        'O campo usuário não pode ser vazio!', // message
                            function(){
                                $("#inputUsuario").focus();
                            },            // callback to invoke with index of button pressed
                        'Erro',           // title
                        ['Sair']     // buttonLabels
                    );


                }else if($("#inputSenha").val()=== ""){
                    navigator.notification.confirm(
                        'O campo senha não pode ser vazio!', // message
                            function(){
                                $("#inputSenha").focus();
                            },            // callback to invoke with index of button pressed
                        'Erro',           // title
                        ['Sair']     // buttonLabels
                    );
                }else{
                     navigator.notification.confirm(
                        'Usuário ou Senha incorretos!', // message
                            function(){
                                $("#inputUsuario").focus();
                            },            // callback to invoke with index of button pressed
                        'Erro',           // title
                        ['Sair']     // buttonLabels
                    );
                }

            },"json")
            //Tratamento de erro da requisicao servico RESt login
            .fail(function(){
                window.spinnerplugin.hide();
                window.verificarConexao();

            }).done(function(){
                 window.spinnerplugin.hide();
            });


         }catch(e){
             window.alert("Erro validacaoLogin: "+ e.message);
             window.clearGoMainPage();
         }

     }


     $(document).on("click", "#page_3", function(evt)
     {
         escondeMenuHamburguer('bs-navbar-1');
         return false;
     });

     $(document).on("click", "#page_4", function(evt)
     {
         escondeMenuHamburguer('bs-navbar-2');
         return false;
     });

     //esconde o menu hambueguer
     function escondeMenuHamburguer(item){

         var esconder = false;
         if($('#'+item).is(':visible') && $('.botaoMenu').is(':visible')){
             $('#'+item).collapse('hide');
             esconder= true;
         }
         return esconder;
     }



     $(document).on("click", ".sair", function(evt)
     {
         escondeMenuHamburguer('bs-navbar-1');
         escondeMenuHamburguer('bs-navbar-2');

         navigator.notification.confirm(
            'Deseja sair?', // message
            function(buttonIndex) {
                if(buttonIndex === 2){

                    //chama a funcao que limpa a localStorage e abre mainpage
                    window.clearGoMainPage();

                }else if(buttonIndex == 1){
                    navigator.app.exitApp();
                }
            },            // callback to invoke with index of button pressed
            'Confirmação',           // title
            ['Sair App', 'Deslogar', 'Cancelar']     // buttonLabels
         );

         return false;
     });



     $(document).on("click", ".configuracoes", function(evt)
     {
         escondeMenuHamburguer('bs-navbar-1');
         escondeMenuHamburguer('bs-navbar-2');
         activate_page("#page_99");

         return false;
     });


     $(document).on("click", ".sobre", function(evt)
     {

        escondeMenuHamburguer('bs-navbar-1');
        escondeMenuHamburguer('bs-navbar-2');
        $(".uib_w_145").modal("toggle");

        return false;
     });

    //organiza lista de propriedades com o click da propriedade
    $(document).on("click", ".uib_w_286 > li", function(evt)
    {
        if(!escondeMenuHamburguer('bs-navbar-1')){

            var propriedades = JSON.parse(window.localStorage.getItem("propriedades"));
            $(".uib_w_286").append($(this));

            var abaNomeProp = $(this).text();


            $.each(propriedades, function(i){

                if(abaNomeProp === propriedades[i]){
                    //lista os cultivares
                    window.listarCultivarRecebidos(abaNomeProp);
                    return false;
                }

            });

        }
        return false;
    });



        /* button  Button */
    $(document).on("click", ".uib_w_146", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals
            */

         $(".uib_w_145").modal("toggle");
         return false;
    });


    $("#papelDeParede").change(function(){

         if($("#papelDeParede").val() === "Papel de parede 1"){
             $(".backgroundInicial").css("background-image", 'url("images/background1.jpg")');
         }else if($("#papelDeParede").val() === "Papel de parede 2"){
             $(".backgroundInicial").css("background-image", 'url("images/background2.jpg")');
         }else if($("#papelDeParede").val() === "Papel de parede 3"){
             $(".backgroundInicial").css("background-image", 'url("images/background3.jpg")');
         }else if($("#papelDeParede").val() === "Papel de parede 4"){
             $(".backgroundInicial").css("background-image", 'url("images/background4.jpg")');
         }else{
             $(".backgroundInicial").css("background-image", 'url("images/background5.jpg")');
         }
    });




        /* button  .uib_w_136 */
    $(document).on("click", ".uib_w_136", function(evt)
    {

        if(window.papel === "a"){
             activate_page("#page_3");
         }else if(window.papel === "e" || window.papel === "g"){
             activate_page("#page_4");
         }else{
             window.clearGoMainPage();
         }
         return false;
    });

        /* button  .uib_w_225 */
    $(document).on("click", ".uib_w_225", function(evt)
    {
         /*global activate_page */
         activate_page("#page_3");
         return false;
    });



        /* listar cultivares recebidos*/
    $(document).on("click",".listaCultivar > a", function(evt)
    {
        if(!escondeMenuHamburguer('bs-navbar-1')){

            var a = $(this).attr("id");
            //carrega item que esta no localStorage
            var cultivaresRecebidos = JSON.parse(window.localStorage.getItem("cultivaresRecebidos"));
            if(cultivaresRecebidos.length > 0){
                var cultivarSelecionado = cultivaresRecebidos[a];
                //guarda o id da safra no session storage
                sessionStorage.setItem("indiceSelecionado", a);
                //guarda o id da safra no sessionStorage
                sessionStorage.setItem("idsafra", cultivarSelecionado.idsafra);

                    $("#statuscultivar").show();
                    //aparece botao de relatar se não foi relatado ainda a produçao do cultivar

                    switch(cultivarSelecionado.statussafra_idstatussafra) {
                        case 1:
                            $(".uib_w_272").show();
                            $(".uib_w_344").hide();
                            break;
                        case 2:
                        case 3:
                            $(".uib_w_272").show();
                            $(".uib_w_344").show();
                            break;
                        case 4:
                        case 5:
                            $(".uib_w_272").hide();
                            $(".uib_w_344").show();
                            break;
                        case 6:
                        case 7:
                        case 8:
                            $(".uib_w_272").hide();
                            $(".uib_w_344").hide();
                            break;

                    }

              //  }


                //renomeia os valores dos produtos
                $("#nomeProduto").html(cultivarSelecionado.nomecultivar);
                //muda a image do cultivar
                $("#imgCultivar").attr("src", carregarCultivar(cultivarSelecionado.nomecultivar));
                //carega os valores da safra, destinacao e datas de recebimento
                $("#statuscultivar").html("<p>Safra: "+cultivarSelecionado.safra+"</p><p>Data recebimento: "+cultivarSelecionado.datareceb+"</p><p>Quantidade recebida: "+cultivarSelecionado.qtdrecebida+" "+cultivarSelecionado.grandeza_recebida+"</p><p>Quantidade colhida: "+cultivarSelecionado.qtdcolhida+" kilo(s)</p><p>Status colheita: "+cultivarSelecionado.prazo_colheita+"</p><p>Quantidade destinada: "+cultivarSelecionado.qtddestinada+" (kilo(s)</p><p>Status destinação: "+cultivarSelecionado.prazo_destinacao+"</p>");

                activate_page("#page_6");
                $('.uib_w_250').hide();
                $('.uib_w_250').fadeIn(100);
                $("#page_6").scrollTop(0);
            }

    }
         return false;
    });

   function carregarCultivar(nomeCultivar){
       var listaCultivares = JSON.parse(window.localStorage.getItem("cultivares"));
       var cultivar;
       var i = 0;
       $.each(listaCultivares, function(){
          if(listaCultivares[i].nomecultivar === nomeCultivar){
             cultivar = listaCultivares[i];
             return false;
          }
            i++;
       });
        //muda a descricao do cultivar
        $("#descricaocultivar").html(cultivar.descricao);
        //muda os valores nutricionais do cultivar
        $("#valornutcultivar").html(cultivar.valornutricional);


       return cultivar.imagem;

   }


        /* button  .uib_w_242 voltar relatar cultivar */
    $(document).on("click", ".uib_w_242", function(evt)
    {

        //voltar a lista de cultivares recebidos
        if($('.uib_w_250').is(':visible')){
            $('.uib_w_250').fadeOut(100, function(evt){
                activate_page("#page_3");
                $("#recebidos").hide();
                $("#recebidos").fadeIn(100);
                $("#page_3").scrollTop(0);
                sessionStorage.removeItem("indiceSelecionado");
            });
        }else if($('.uib_w_416').is(':visible')){
            $('.uib_w_416').fadeOut(100, function(evt){

                $(".uib_w_250").fadeIn(100);
            });
        }else{
            $('.uib_w_418').fadeOut(100, function(evt){

                $(".uib_w_250").fadeIn(100);
            });
        }

         return false;
    });


        /* button  .uib_w_272 */
    $(document).on("click", ".uib_w_272", function(evt)
    {



        $('.uib_w_250').fadeOut(100, function(evt){

             $(".uib_w_416").fadeIn(100);

         });

//         /*global activate_page */
//         //activate_page("#page_3");
//         //$("#colheita").fadeIn(100);
//         $("#colheita").show();
//         $("#destinacao").hide();
//         $("#recebidos").hide();
//         $("#page_3").scrollTop(0);

         return false;
    });

        /* button  .uib_w_197 */
    $(document).on("click", ".uib_w_197", function(evt)
    {

        navigator.notification.confirm(
            'Deseja fechar o app?', // message
            function(buttonIndex) {
                if(buttonIndex == 2){
                    navigator.app.exitApp();
                }
            },            // callback to invoke with index of button pressed
            'Confirmação',           // title
            ['Cancelar', 'Fechar']     // buttonLabels
         );

         return false;
    });

        /* button  Button */
    $(document).on("click", ".uib_w_278", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage");
         return false;
    });



        /* button  .uib_w_30 */
    $(document).on("click", ".uib_w_30", function(evt)
    {

        var teste = testeCamposNulos();

        if(teste[0]){
            var data = "nome="+$("#inome").val()+"&sobrenome="+$("#isobrenome").val()+"&apelido="+$("#iapelido").val()+"&cpf="+$("#icpf").val()+"&sexo="+$('input[name = "bs-radio-group-0"]:checked').val()+"&rg="+$("#irg").val()+"&datanascimento="+$("#idatanascimento").val()+"&telefone1="+$("#itelefone1").val()+"&telefone2="+$("#itelefone2").val()+ "&escolaridade_idescolaridade="+($("#iescolaridade")[0].selectedIndex+1)+ "&estadocivil_idestadocivil="+($("#iestadocivil")[0].selectedIndex+1)+"&nomepropriedade="+$("#inomepropriedade").val()+"&rua="+$("#irua").val()+"&numero="+$("#inumero").val()+"&bairro="+$("#ibairro").val()+"&complemento="+$("#icomplemento").val()+"&cep="+$("#icep").val()+"&cidade_idcidade="+verificarIDCidade()+"&area="+$("#iarea").val()+"&unidadedemedida="+$('input[name = "bs-radio-group-2"]:checked').val()+"&areautilizavel="+$("#iareautilizavel").val()+"&unidadedemedidaau="+$('input[name = "bs-radio-group-1"]:checked').val()+"&gps_lat="+$("#igpslat").val()+"&gps_long="+$("#igpslong").val()+"&qtdedeintegrantes="+$("#iqtdintegrantes").val()+"&qtdedecriancas="+$("#iqtdcriancas").val()+"&qtdedegravidas="+$("#iqtdgravidas").val()+"&usuario="+$("#iusuario").val()+"&senha="+$("#isenha").val()+"&email="+$("#iemail").val()+"&papel=a&unidade_idunidade=2";


            $.post("http://"+window.ipServidor+"/Projeto_BioID-war/servico/pessoa/inseriragricultor", data, function(dados){
                window.spinnerplugin.show();
                //se cadastrado entao vai para pagina inicial
                if(dados.sucesso){
                    //vai para a pagina de login
                    navigator.notification.alert(dados.mensagem, function(){
                        $(".camposcadastro").val("");
                        activate_page("#mainpage");
                        //$("#inputUsuario").val();
                        //$("#inputUsuario").focus();

                    },"Alerta!", "OK");

                }else{
                   navigator.notification.alert("Usuario não cadastrado!, mensage="+dados.mensagem, function(){},"Alerta!", "OK");

                }


            },"json")
            //Tratamento de erro da requisicao servico RESt login
            .fail(function(){
                window.spinnerplugin.hide();
                navigator.notification.confirm(
                    'Cadastro não efetuado, sem conexão com o servidor!',
                    function() {
                        $(".camposcadastro").val("");
                        //limpa a tela e vai para a pagina inicial
                        window.clearGoMainPage();
                    },
                    'Erro',
                    ['OK']
                );


            }).done(function(){
                 window.spinnerplugin.hide();
            });

        //mensagem de alerta
        }else{
            alertaCampoNulo(teste[1], teste[2]);
        }


         return false;
    });
    //funcao para verificar se existe campos nulos
    function testeCamposNulos(){
        var retorno = [true, 'Erro verificação dos campos', 'nulo'];
        //verifica se a senha correspondem
        if($("#ireescrevasenha").val() === ""){
            retorno = [false, 'O campo reescreva senha não pode ser vazio!', '#ireescrevasenha'];
        }else if($("#isenha").val() !== $("#ireescrevasenha").val()){
            retorno = [false, 'As senhas não correspondem!', '#ireescrevasenha'];
        }

        //valida o email
        var filtro1 = $("#iemail").val().match(/@/g);
        var filtro2 = $("#iemail").val().match(/./g);
        if(filtro1 === null || filtro2 === null || filtro1.length > 1){
            retorno = [false, 'Email não valido!', '#iemail'];
        }

        var campos = ['#inome', '#isobrenome', '#idatanascimento', '#irg', '#icpf', '#itelefone1', '#inomepropriedade', '#irua', '#inumero', '#ibairro', '#icomplemento', '#icep', '#estado', '#cidade', '#iarea', '#iareautilizavel', '#igpslat', '#igpslong', '#iqtdintegrantes', '#iqtdcriancas', '#iqtdgravidas', '#iusuario', '#iemail', '#isenha'];
        var msgs = ['O campo nome não pode ser vazio!', 'O campo sobrenome não pode ser vazio!', 'O campo data nascimento não pode ser vazio!', 'O campo rg não pode ser vazio!', 'O campo cpf não pode ser vazio!', 'O campo telefone 1 não pode ser vazio!', 'O campo nome do Sítio/Terreno/Propriedade não pode ser vazio!', 'O campo rua não pode ser vazio!', 'O campo numero não pode ser vazio!', 'O campo bairro não pode ser vazio!', 'O campo complemento não pode ser vazio!', 'O campo cep não pode ser vazio!', 'O campo estado não pode ser vazio!', 'O campo cidade não pode ser vazio!', 'O campo Área total não pode ser vazio!', 'O campo Área utilizável não pode ser vazio!', 'O campo latitude não pode ser vazio!', 'O campo longitude não pode ser vazio!', 'O campo quantidade de membros não pode ser vazio!', 'O campo números de crianças menores de 5 anos não pode ser vazio!', 'O campo número de mulheres grávidas ou amamentando não pode ser vazio!', 'O campo usuário não pode ser vazio!', 'O campo email não pode ser vazio!', 'O campo senha não pode ser vazio!'];
        var i = 0;
        $.each(campos, function(){
            if($(campos[i]).val() === ""){
                retorno = [false, msgs[i], campos[i]];
                return false;
            }

            i++;
        });


        return retorno;
    }
    function verificarIDCidade(){
        var i = $("#estado")[0].selectedIndex;
        switch(i){
            case 2:
                i = $("#cidade")[0].selectedIndex + 22;
            break;
            case 3:
                i = $("#cidade")[0].selectedIndex+124;
            break;
            case 4:
                i = $("#cidade")[0].selectedIndex+186;
            break;
            case 5:
                i = $("#cidade")[0].selectedIndex + 202;
            break;
            case 6:
                i = $("#cidade")[0].selectedIndex+619;
            break;
            case 7:
                i = $("#cidade")[0].selectedIndex+803;
            break;
            case 8:
                i = $("#cidade")[0].selectedIndex + 805;
            break;
            case 9:
                i = $("#cidade")[0].selectedIndex+882;
            break;
            case 10:
                i = $("#cidade")[0].selectedIndex+1128;
            break;
            case 11:
                i = $("#cidade")[0].selectedIndex + 1345;
            break;
            case 12:
                i = $("#cidade")[0].selectedIndex+2198;
            break;
            case 13:
                i = $("#cidade")[0].selectedIndex+2275;
            break;
                case 14:
                i = $("#cidade")[0].selectedIndex+2414;
            break;
            case 15:
               i = $("#cidade")[0].selectedIndex+2554;
            break;
                case 16:
                i = $("#cidade")[0].selectedIndex + 2780;
            break;
            case 17:
                i = $("#cidade")[0].selectedIndex+2965;
            break;
            case 18:
                i = $("#cidade")[0].selectedIndex+3187;
            break;
            case 19:
                i = $("#cidade")[0].selectedIndex + 3586;
            break;
            case 20:
                i = $("#cidade")[0].selectedIndex+3678;
            break;
            case 21:
                i = $("#cidade")[0].selectedIndex+3845;
            break;
            case 22:
                i = $("#cidade")[0].selectedIndex+3897;
            break;
            case 23:
                i = $("#cidade")[0].selectedIndex+3912;
            break;
                case 24:
                i = $("#cidade")[0].selectedIndex + 4409;
            break;
            case 25:
                i = $("#cidade")[0].selectedIndex+4701;
            break;
            case 26:
                i = $("#cidade")[0].selectedIndex+4776;
            break;
            case 27:
                i = $("#cidade")[0].selectedIndex+5421;
            break;
            default:
                i = $("#cidade")[0].selectedIndex+1;

        }


        return i;
    }//);

    //funcao de alerta campos nulos
    function alertaCampoNulo(msg, campo){
        navigator.notification.confirm(
            msg,
            function() {
                if(campo !== "nulo"){
                    //leva o cursor para o campo
                    $(campo).focus();
                }else{
                    //limpa a tela e vai para a pagina inicial
                    $(".camposcadastro").val("");
                    window.clearGoMainPage();
                }

            },
            'Alerta!',
            ['OK']
        );
    }

        /* button  .uib_w_105 */
    $(document).on("click", ".uib_w_105", function(evt)
    {
        if(!escondeMenuHamburguer('bs-navbar-1')){
            var msg;

            if($('#relatarPerda').is(':checked')){
                relatarSafra('Deseja somente relatar perda de safra?', 8);
            }else if($('#finalizarColheita').is(':checked')){
                relatarSafra('Deseja somente finalizar a safra?', 8);
            }else{

                if($('#datacolheita').val() === ""){
                    navigator.notification.alert("Insira a data da colheita!",function(){
                        $('#datacolheita').focus();
                    },"Alerta!", "OK");
                }else if($('#qtdcolhida').val() === ""){
                    navigator.notification.alert("Insira a quantidade colhida!",function(){
                        $('#qtdcolhida').focus();
                    },"Alerta!", "OK");

                }else{
                    if($('#ultimaColheita').is(':checked')){
                        relatarSafra('Deseja relatar a ultima colheita da safra?', 4);
                    }else{
                        relatarSafra('Deseja relatar a colheita parcial da safra?', 2);
                    }
                }
            }
        }

        return false;
    });


    function relatarSafra(msg, statussafra){

        navigator.notification.confirm(
            msg, // message
            function(buttonIndex) {
                if(buttonIndex === 2){
                    var data = "idsafra="+sessionStorage.getItem("idsafra")+"&ultimadatacolheita="+$("#datacolheita").val()+"&qtdcolhida="+$("#qtdcolhida").val()+"&statussafra_idstatussafra="+statussafra;

                    $.post("http://"+window.ipServidor+"/Projeto_BioID-war/servico/cultivar/relatarcolheita", data, function(dados){
                         window.spinnerplugin.show();
                        //se safra foi relatada
                        if(dados.sucesso){
                            navigator.notification.alert("Colheita relatada!", function(){},"Alerta!", "OK");

                        }else{
                           navigator.notification.alert("Colheita não relatada!", function(){},"Erro!", "OK");

                        }
                    },"json")
                    //Tratamento de erro da requisicao servico RESt login
                    .fail(function(){
                        window.spinnerplugin.hide();
                        navigator.notification.confirm(
                            'Colheita não enviada!',
                            function() {
                                //limpa a tela e vai para a pagina inicial
                                window.clearGoMainPage();
                            },
                            'Erro',
                            ['OK']
                        );
                    })
                    .done(function(){
                        limparcamposrelatar();
                        //atualiza o local storage
                        window.servArmazenarCulRecebdo(JSON.parse(window.localStorage.getItem("logSessao")).usuario, window.getSessao());
                        window.spinnerplugin.show();
                    });
                    }
                },            // callback to invoke with index of button pressed
                'Confirmação',           // title
                ['Não', 'Sim']     // buttonLabels
            );
        }

     function limparcamposrelatar(){
        $('#datacolheita').val("");
        $('#qtdcolhida').val("");
        $('#umcolheita').val("Kilo(s)");
        $('#colheitaParcial').prop("checked", true);
        $('.uib_w_319').show();
        $('.uib_w_337').show();
        $('.uib_w_350').show();

        //mostra a lista novamente, dos cultivares recebidos
        $("#colheita").hide();
        $("#destinacao").hide();
        $("#relatorios").hide();
        $("#recebidos").show();
        $("#page_3").scrollTop(0);
    }








     /*/funcao de guardar na memoria dados do input quantidade colhida
     $('#qtdcolhida').focusout(function() {
         //guarda valor na memoria
         sessionStorage.setItem('qtdcolhida', $('#qtdcolhida').val());

         //testa se toda a destinacao esta selecionada e muda os valores dos inputs
         if($('.uib_w_338').children('input').is(':checked')){
            $('#relatarqtd').val($('#qtdcolhida').val());
            $("#relatarum").val($('#umcolheita').val());
         }
        return false;
     });
*/

     $("#umcolheita").focusout(function() {
        $("#relatarum").val($('#umcolheita').val());
        return false;
     });


     $(document).on("click", ".uib_w_338", function(evt){

        //if($('#relatarqtd').val() !== ''){
            if($('#todacolheita').is(':checked')){
                $('#todacolheita').prop( "checked", false);
                $('#relatarqtd').prop('disabled', false);
                $('#relatarqtd').val('');
                $('#relatarum').prop('disabled', false);
                $('#relatarum').val('Kilo(s)');
                $('#novoAbaDestinacao').show();
            }else{
                navigator.notification.confirm(
                     'Toda a safra será destinada?', // message
                     function(buttonIndex) {
                         if(buttonIndex === 2){
                            $('#todacolheita').prop( "checked", true);
                            $('#relatarqtd').val(retornarValCultivares());
                            $('#relatarqtd').prop('disabled', true);
                            $('#relatarum').val('Kilo(s)');
                            $('#relatarum').prop('disabled', true);
                            $('#novoAbaDestinacao').hide();
                         }
                     },            // callback to invoke with index of button pressed
                     'Confirmação',           // title
                     ['Não', 'Sim']     // buttonLabels
                );


            }
       // }else{
            //navigator.notification.alert("Insira uma quantidade!",function(){
             //   $('#relatarqtd').focus();
           // },"Alerta!", "OK");
        //}

         return false;
     });



     function retornarValCultivares(){
         var i = sessionStorage.getItem('indiceSelecionado');
         var cultivar = JSON.parse(window.localStorage.getItem("cultivaresRecebidos"));
         var valor = cultivar[i].qtdcolhida;
         return valor;
     }


     $(document).on("click", ".uib_w_340 > label", function(evt){
         if(!escondeMenuHamburguer('bs-navbar-1')){
             var id = $(this).children('input').attr('id');

             if(id === "colheitaParcial"){
                 $('#colheitaParcial').prop('checked', true);
                 $('#ultimaColheita').prop('checked', false);
                 $('#finalizarColheita').prop('checked', false);
                 $('#relatarPerda').prop('checked', false);
                 $('.uib_w_350').show();
                 $('.uib_w_319').show();
                 $('.uib_w_337').show();
             }else if(id === 'ultimaColheita'){
                 navigator.notification.confirm(
                     'Toda sua safra foi colhida?', // message
                     function(buttonIndex) {
                         if(buttonIndex === 2){
                            $('#colheitaParcial').prop('checked', false);
                            $('#ultimaColheita').prop('checked', true);
                            $('#finalizarColheita').prop('checked', false);
                            $('#relatarPerda').prop('checked', false);
                            $('.uib_w_350').show();
                            $('.uib_w_319').show();
                            $('.uib_w_337').show();
                         }
                     },            // callback to invoke with index of button pressed
                     'Confirmação',           // title
                     ['Não', 'Sim']     // buttonLabels
                );

             }else if(id === "finalizarColheita"){
                 navigator.notification.confirm(
                     'Deseja somente finalizar a safra, sem colheita?', // message
                     function(buttonIndex) {
                         if(buttonIndex === 2){
                            $('#colheitaParcial').prop('checked', false);
                            $('#ultimaColheita').prop('checked', false);
                            $('#finalizarColheita').prop('checked', true);
                            $('#relatarPerda').prop('checked', false);
                            $('.uib_w_350').hide();
                            $('.uib_w_319').hide();
                            $('.uib_w_337').hide();
                         }
                     },            // callback to invoke with index of button pressed
                     'Confirmação',           // title
                     ['Não', 'Sim']     // buttonLabels
                );

             }else{
                 navigator.notification.confirm(
                     'Deseja relatar a perda de sua safra?', // message
                     function(buttonIndex) {
                         if(buttonIndex === 2){
                             $('#colheitaParcial').prop('checked', false);
                             $('#ultimaColheita').prop('checked', false);
                             $('#finalizarColheita').prop('checked', false);
                             $('#relatarPerda').prop('checked', true);
                             $('.uib_w_350').hide();
                             $('.uib_w_319').hide();
                             $('.uib_w_337').hide();
                         }
                     },            // callback to invoke with index of button pressed
                     'Confirmação',           // title
                     ['Não', 'Sim']     // buttonLabels
                );

             }
        }
         return false;
     });

    function labelColheitaTotal(){

        if($('.uib_w_308 li').length > 2){
            $('.uib_w_338').hide();
        }else{
            $('.uib_w_338').show();
        }
    }

    $(document).on("click", ".uib_w_308 > li", function(evt)
    {
        var abaClicada = $(this).attr("id");
        if($(".uib_w_308 li").length > 1 && $('.camposDestinacao').is(':visible')){
            if($('#relatardata').val() !== ''){
                if($('#relatarqtd').val() !== ''){
                    salvarAbaDestinacao(abaClicada);

                    if(abaClicada === "novoAbaDestinacao"){
                        $(".uib_w_310").modal("toggle");
                        $("#"+abaClicada).removeClass("active");

                    }else{
                        carredaDadosDestinacao(abaClicada);
                        $(".uib_w_308").append($(this));
                    }
                }else{
                    $("#"+sessionStorage.getItem("abaSelecionada")).addClass("active");
                    $("#"+abaClicada).removeClass("active");
                    navigator.notification.alert("Insira uma quantidade para navegar nas abas!",function(){
                        $('#relatarqtd').focus();
                    },"Alerta!", "OK");
                }
             }else{
                $("#"+sessionStorage.getItem("abaSelecionada")).addClass("active");
                $("#"+abaClicada).removeClass("active");
                navigator.notification.alert("Insira uma data para navegar nas abas!",function(){
                    $('#relatardata').focus();
                },"Alerta!", "OK");

            }


        }else if(abaClicada === "novoAbaDestinacao"){
            $(".uib_w_310").modal("toggle");
            $("#"+abaClicada).removeClass("active");
        }else{
            //somente carrega
            $('.camposDestinacao').show();
            carredaDadosDestinacao(abaClicada);
            sessionStorage.setItem("abaSelecionada", abaClicada);
        }
        //mostra o label de toda colheita
        labelColheitaTotal();

        return false;

    });
     function salvarAbaDestinacao(abaClicada){

         //guarda os valores
         var campos = [];
         var abaSelecionada = sessionStorage.getItem("abaSelecionada");
         var i = sessionStorage.getItem("nAbas");
         var idcarregar;

         if(sessionStorage.getItem("camposDestinacao")){
            campos = JSON.parse(sessionStorage.getItem("camposDestinacao"));

            if(campos.length < $(".uib_w_308 li").length - 1 ){
                campos[campos.length] = {idaba: 'abaDestinacao'+i,
                datarelatada: $("#relatardata").val(),
                um: $("#relatarum").val(),
                valor: $("#relatarqtd").val()};

            }else{
                var j = 0;
                $.each(campos, function(){
                    if(campos[j].idaba === abaSelecionada ){
                        campos[j] = {idaba: abaSelecionada,
                        datarelatada: $("#relatardata").val(),
                        um: $("#relatarum").val(),
                        valor: $("#relatarqtd").val()};

                    }
                    j++;
                });


            }


        }else{
            campos[0] = {idaba: 'abaDestinacao'+i,
            datarelatada: $("#relatardata").val(),
            um: $("#relatarum").val(),
            valor: $("#relatarqtd").val()};
        }


         sessionStorage.setItem("camposDestinacao", JSON.stringify(campos));
         if(abaClicada !== 'novoAbaDestinacao'){
             sessionStorage.setItem("abaSelecionada", abaClicada);
         }

     }

     function carredaDadosDestinacao(abaClicada){
        var campos = JSON.parse(sessionStorage.getItem("camposDestinacao"));

        var i = 0;
        $.each(campos, function(){
            if(campos[i].idaba === abaClicada ){
                $("#relatardata").val(campos[i].datarelatada);
                $("#relatarum").val(campos[i].um);
                $("#relatarqtd").val(campos[i].valor);
                return false;
            }

            i++;
        });



     }

     //botao no modal de destinacao
    $(document).on("click", "#okmodal", function(evt)
    {
        var i;
        if(sessionStorage.getItem("nAbas")){
            i = sessionStorage.getItem("nAbas");
            i++;
            sessionStorage.setItem("nAbas", i);
        }else{
            i = 0;
            sessionStorage.setItem("nAbas", i);
        }


        var item ='<li role="presentation" class="widget uib_w_309 active" data-uib="twitter%20bootstrap/tab_item" data-ver="1" id="abaDestinacao'+i+'"><a role="tab" data-toggle="tab">'+ $('#idestinacao').val()+'</a></li>';
        $('.uib_w_308').append(item);

        sessionStorage.setItem("abaSelecionada", 'abaDestinacao'+i);

        $("#relatardata").val('');
        $("#relatarum").val('Kilo(s)');
        $("#relatarqtd").val('');

        $('.camposDestinacao').show();
        labelColheitaTotal();

        return false;
    });

    $(document).on("click", "#cancelamodal", function(evt)
    {
        //sessionStorage.setItem("abaAnterior", 'novoabarelatar');
        $("#novoabarelatar").removeClass("active");
        $('.camposDestinacao').hide();
         return false;
    });

     //excluir uma aba
    /* button  .uib_w_313 */
    $(document).on("click", ".uib_w_313", function(evt)
    {
        navigator.notification.confirm(
            'Deseja excluir essa destinção?', // message
            function(buttonIndex) {
                if(buttonIndex === 2){
                    var abaSelecionada = $(".uib_w_308 .active").attr("id");
                    var campos = JSON.parse(sessionStorage.getItem("camposDestinacao"));

                    var novoCampos = [];
                    var i = 0;
                    $.each(campos, function(){
                        //adiciona todos os dados da memoria menos os que vai ser excluido
                        if(campos[i].idaba !== abaSelecionada){
                            novoCampos[novoCampos.length] = campos[i];
                        }
                    i++;
                    });


                    sessionStorage.setItem("camposDestinacao", JSON.stringify(novoCampos));
                    //$('#idestinacao').append('<option>'+$(".uib_w_308 .active").text()+'</option>');

                    $(".uib_w_308 .active").remove();
                    //desativa o checkbox e os inputs
                    $('#todacolheita').prop( "checked", false);
                    $('#relatarqtd').prop('disabled', false);
                    $('#relatarum').prop('disabled', false);
                    $("#relatarum").val("Kilo(s)");


                    //deixa invisivel os campos
                    $('.camposDestinacao').hide();
                    //labelColheitaTotal();

                }
           },            // callback to invoke with index of button pressed
            'Confirmação',           // title
            ['Não', 'Sim']     // buttonLabels
        );

        return false;
    });



        /* button  #relatardestinacao */
    $(document).on("click", ".uib_w_344", function(evt)
    {

        var i = sessionStorage.getItem('indiceSelecionado');
        var cultivaresRecebidos = JSON.parse(window.localStorage.getItem("cultivaresRecebidos"));
        //deixa os botoes enviar e cancelar ocultos

         activate_page("#page_3");
         $("#destinacao").fadeIn(100);
         $("#colheita").hide();
         $("#recebidos").hide();
         $('#nomeCDestinacao').text('Destinação de '+cultivaresRecebidos[i].qtdcolhida +' kilo(s) de '+cultivaresRecebidos[i].nomecultivar);
         $('.camposDestinacao').hide();

         return false;
    });


    $(document).on("click", '#okresposta', function(evt){
        /*navigator.notification.confirm(
            'Deseja realmente modificar essa resposta?', // message
            function(buttonIndex) {
                if(buttonIndex === 2){
                    var data = $('#textoResposta').val();
                    $.post("http://"+window.ipServidor+"/Projeto_BioID-war/servico/pessoa/socioe", data, function(dados){
                    //teste da requisicao no banco esta correta
                    if(dados.sucesso){
                        var classeText = sessionStorage.getItem('classeText');
                        $('.'+classeText+' p').text($('#textoResposta').val());
                        sessionStorage.removeItem('classeText');
                    }

                    },"json")
                    //Tratamento de erro da requisicao servico RESt login
                    .fail(function(){
                        navigator.notification.confirm(
                            'Sem conexão com o servidor!',
                            function() {
                                //limpa a tela e vai para a pagina inicial
                                window.clearGoMainPage();
                            },
                            'Erro',
                            ['OK']
                        );


                    });

                }
           },            // callback to invoke with index of button pressed
            'Confirmação',           // title
            ['Não', 'Sim']     // buttonLabels
        );*/

        return false;
    });



        /* button  .uib_w_346 */
    $(document).on("click", ".uib_w_346", function(evt)
    {
        navigator.notification.confirm(
            'Deseja enviar as destinações?', // message
            function(buttonIndex) {
                if(buttonIndex === 2){
                    window.iniciarAgricultor();

                }
           },            // callback to invoke with index of button pressed
            'Confirmação',           // title
            ['Não', 'Sim']     // buttonLabels
        );
         return false;
    });


    $(document).on("click",".editarsocioe", function(evt)
    {
         var classeText = $(this).closest('.content-area').children('div').attr('name');
         sessionStorage.setItem('classeText', classeText);
         $('#textoResposta').val($('.'+classeText).children('div').children('p').text());

         $(".uib_w_331").modal("toggle");
         $('#textoResposta').focus();
         return false;
    });


    //colapse descricao, abrir com o toque
    $(document).on("click",".uib_w_260", function(evt)
    {
        $("#bs-accordion-group-9").collapse('toggle');

        $('.uib_w_260').on('shown.bs.collapse', function() {
            $("#iconeDesc").removeClass("fa-chevron-down").addClass("fa-chevron-up");

        }).on('hidden.bs.collapse', function() {
            $("#iconeDesc").removeClass("fa-chevron-up").addClass("fa-chevron-down");
        });

         return false;
    });

    //colapse valor nutricional, abrir com o toque
    $(document).on("click",".uib_w_261", function(evt)
    {
        $("#bs-accordion-group-10").collapse('toggle');

        $('.uib_w_261').on('shown.bs.collapse', function() {
            $("#iconeNutr").removeClass("fa-chevron-down").addClass("fa-chevron-up");

        }).on('hidden.bs.collapse', function() {
            $("#iconeNutr").removeClass("fa-chevron-up").addClass("fa-chevron-down");
        });

         return false;
    });

     //colapse ajuda, abrir com o toque
    $(document).on("click",".uib_w_262", function(evt)
    {
        $("#bs-accordion-group-11").collapse('toggle');

        $('.uib_w_262').on('shown.bs.collapse', function() {
            $("#iconeAjuda").removeClass("fa-chevron-down").addClass("fa-chevron-up");

        }).on('hidden.bs.collapse', function() {
            $("#iconeAjuda").removeClass("fa-chevron-up").addClass("fa-chevron-down");
        });

         return false;
    });

    //colapse ajuda, abrir com o toque
    $(document).on("click",".uib_w_353 > a", function(evt)
    {


        var item = $(this).children('pre');

        if(item.is(':visible')){
            item.hide();
            $(this).children('h4').children('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up').addClass('amarelo').removeClass('vermelho');
        }else{
            $('.itensPre').hide();
            $('.uib_w_353 .glyphicon-chevron-down').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up').addClass('amarelo').removeClass('vermelho');

            item.fadeIn().show();
            $(this).children('h4').children('i').removeClass('glyphicon-chevron-up').removeClass('amarelo').addClass('glyphicon-chevron-down').addClass('vermelho');
        }


        return false;
    });
    function listarBkpEstrevistaP(dados){
         var propriedades = dados.propriedades;
//         var cultivares = [];
//         if(dados.aberto){
//            cultivares = dados.cultivaresArelatar;
//         }else{
//             cultivares = null;
//         }

         $('.uib_w_380').empty();
         var item;
         $.each(propriedades, function(i){

             //item ='<a class="list-group-item allow-badge propriedadeBackup widget" data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading"><span class="glyphicon glyphicon-unchecked" >&nbsp;</span>'+propriedades[i].nomepropriedade+'<i class="glyphicon glyphicon-chevron-down button-icon-right" data-position="top"></i></h4><div hidden><p class="list-group-item-text">Rua: '+propriedades[i].rua+'</p><p class="list-group-item-text">Numero: '+propriedades[i].numero+'</p><p class="list-group-item-text">Bairro: '+propriedades[i].bairro+'</p><p class="list-group-item-text">Cep: '+propriedades[i].cep+'</p><p class="list-group-item-text">Cidade: '+propriedades[i].nomecidade+'</p><p class="list-group-item-text">Latitude: '+propriedades[i].gps_lat+'</p><p class="list-group-item-text">Longitude: '+propriedades[i].gps_long+'</p><p class="idpropriedadeB">'+propriedades[i].idpropriedade+'</p>'+listarBkpEstrevistaC(cultivares, propriedades[i].nomepropriedade)+'</div></a>';

             item ='<a class="list-group-item propriedadeBackup widget" data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading"><span class="glyphicon glyphicon-unchecked" >&nbsp;</span>'+propriedades[i].nomepropriedade+'<i class=" amarelo glyphicon glyphicon-chevron-down button-icon-right" data-position="top"></i></h4><div hidden><p class="list-group-item-text">Rua: '+propriedades[i].rua+'</p><p class="list-group-item-text">Numero: '+propriedades[i].numero+'</p><p class="list-group-item-text">Bairro: '+propriedades[i].bairro+'</p><p class="list-group-item-text">Cep: '+propriedades[i].cep+'</p><p class="list-group-item-text">Cidade: '+propriedades[i].nomecidade+'</p><p class="list-group-item-text">Latitude: '+propriedades[i].gps_lat+'</p><p class="list-group-item-text">Longitude: '+propriedades[i].gps_long+'</p><p class="idpropriedadeB" hidden>'+propriedades[i].idpropriedade+'</p></div></a>';


             $('.uib_w_380').append(item);

         });
         sessionStorage.setItem("propriedadesTemporarias", JSON.stringify(propriedades));
         //sessionStorage.setItem("cultRecTemporarios", JSON.stringify(cultivares));
     }


//     function listarBkpEstrevistaC(cultivares, nomepropriedade){
//         var item = '';
//         if(cultivares !== null){
//
//             $.each(cultivares, function(i){
//                 if(cultivares[i].nomepropriedade === nomepropriedade){
//                    item = item.concat('<pre class="list-group-item-text">'+cultivares[i].nomecultivar+'<p>Qtd recebida: '+cultivares[i].qtdrecebida+' '+cultivares[i].grandeza_recebida+'</p></pre>');
//
//                 }
//             });
//         }else{
//             item = '<pre class="list-group-item-text">Não contém cultivares para relatar</p></pre>';
//         }
//
//         return item;
//     }
        /* botao armazenar propriedades para o entrevistador */
//    $(document).on("click", ".uib_w_384", function(evt)
//    {
//
//
//        if($('.propriedadeBackup h4').children('span').hasClass('glyphicon-check')){
//            navigator.notification.confirm(
//                'Deseja guardar temporariamente as informações da(s) propriedade(s) marcada(s)jj?', // message
//                function(buttonIndex) {
//                    if(buttonIndex === 2){
//                        backupPropriedadeStorage();
//
//                        $('.uib_w_154').fadeOut(100, function(evt){
//                        $(".uib_w_378").hide();
//                        $('.uib_w_116').show();
//                        $(".uib_w_154").fadeIn(100);
//
//
//
//                            //var a = [$('.propriedadeBackup .glyphicon-check').parent().text()];
//                            //c(a[0]);
//
//         });
//
//                    }
//                },            // callback to invoke with index of button pressed
//                'Confirmação',           // title
//                ['Não', 'Sim']     // buttonLabels
//            );
//        }else{
//            navigator.notification.alert("Marque a(s) propriedade(s) para armazenar temporariamente!",function(){},"Alerta!", "Sair");
//        }
//
//
//         return false;
//    });

     //check nas propriedades para backup
    $(document).on("click", ".uib_w_380 > a ", function(evt){

        var itemLista = $(this);

        if(evt.target.nodeName === 'SPAN'){
            if($(this).children('h4').children('span').hasClass('glyphicon-unchecked')){

                navigator.notification.confirm(
                    'Deseja guardar temporariamente as informações da propriedade '+itemLista.children('h4').text()+' ?', // message
                    function(buttonIndex) {
                        if(buttonIndex === 2){
                            backupPropriedadeStorage(itemLista.children('div').children('.idpropriedadeB').html());
                            //c(itemLista.children('div').children('.idpropriedadeB').html());
                            itemLista.children('h4').children('span').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
                            retornaListaAgrUnid();
                        }
                    },            // callback to invoke with index of button pressed
                    'Confirmação',           // title
                    ['Não', 'Sim']     // buttonLabels
                );

            }else{
                $(this).children('h4').children('span').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
            }
        }else if($(this).children('div').is(':visible')){
            $(this).children('div').fadeOut(100);
            $(this).children('h4').children('i').removeClass('glyphicon-chevron-up').removeClass('vermelho').addClass('glyphicon-chevron-down').addClass('amarelo');
        }else{
            //$('.uib_w_380 div').fadeOut(100);
            $(this).children('div').fadeIn(100);
            $(this).children('h4').children('i').removeClass('glyphicon-chevron-down').removeClass('amarelo').addClass('glyphicon-chevron-up').addClass('vermelho');
        }

    });

    function backupPropriedadeStorage(idpropriedade){


        var propriedadesTemporarias = JSON.parse(sessionStorage.getItem("propriedadesTemporarias"));
        var propriedade;

        $.each(propriedadesTemporarias, function(i){
           if(propriedadesTemporarias[i].idpropriedade == idpropriedade){
                propriedade = propriedadesTemporarias[i];
           }

        });

        var backupPropriedades = [];
        var adicionar = true;
        if(window.localStorage.getItem('backupPropriedades')){
            backupPropriedades = JSON.parse(window.localStorage.getItem('backupPropriedades'));
            //percorre a lista de backup do localStorage e verifica se existe a propriedade para adcionar
            $.each(backupPropriedades, function(i){
               if(backupPropriedades[i].idpropriedade == idpropriedade){
                   adicionar = false;
                   return false;
               }
            });
            if(adicionar){
                backupPropriedades.push(propriedade);

            }

        }else{
            backupPropriedades[0] = propriedade;
        }


        window.localStorage.setItem('backupPropriedades', JSON.stringify(backupPropriedades));

        //faz requisicao
        if(adicionar){
            backupCultRecebStorage(idpropriedade);
        }



    }

    function backupCultRecebStorage(idpropriedade){


        var data = 'idpropriedade='+idpropriedade;
        var cultivaresArelatar;
        $.post("http://"+window.ipServidor+"/Projeto_BioID-war/servico/cultivar/backupentrevista", data, function(dados){
             window.spinnerplugin.show();
            //teste da requisicao no banco esta correta
            if(dados.sucesso){

                if(window.localStorage.getItem('cultivaresArelatar')){
                    cultivaresArelatar = JSON.parse(window.localStorage.getItem('cultivaresArelatar'));

                    $.each(dados.cultivaresarelatar, function(i){
                        cultivaresArelatar.push(dados.cultivaresarelatar[i]);
                    });

                }else{
                    cultivaresArelatar = dados.cultivaresarelatar;
                }


            }

        },"json")
        //Tratamento de erro da requisicao servico RESt login
        .fail(function(){
            window.spinnerplugin.hide();
            window.verificarConexao();


        }).done(function(){

            window.localStorage.setItem('cultivaresArelatar', JSON.stringify(cultivaresArelatar));
            window.spinnerplugin.hide();
        });

//
//        //armazena os cultivares
//        var cultRecTemporarios = JSON.parse(sessionStorage.getItem('cultRecTemporarios'));
//        var culRecPropriedade = [];
//
//        if(sessionStorage.getItem('culRecPropriedade')){
//            culRecPropriedade = JSON.parse(sessionStorage.getItem('culRecPropriedade'));
//        }
//
//        $.each(cultRecTemporarios, function(i){
//            if(cultRecTemporarios[i].idpropriedade == idpropriedade){
//                if(sessionStorage.getItem('culRecPropriedade')){
//
//                    culRecPropriedade.push(cultRecTemporarios[i]);
//
//                }else{
//                    culRecPropriedade[0] = cultRecTemporarios[i];
//                }
//
//            }
//
//        });


        //localStorage.setItem('culRecPropriedade', JSON.stringify(culRecPropriedade));

    }

     //lista de propriedades
    $(document).on("click", ".uib_w_363 > a", function(evt){

        var itemClicado = $(this);
        var idPropriedade = $(this).children('.idpropriedadeBackup').text();


        if(itemClicado.attr('id') !== 'infoSemBackup'){
            //lista os dados da propriedade
            var backupPropriedades = JSON.parse(window.localStorage.getItem('backupPropriedades'));
            var dadosPropriedade;


            $.each(backupPropriedades, function(i){
                if(backupPropriedades[i].idpropriedade == idPropriedade){
                    dadosPropriedade = '<h4>'+backupPropriedades[i].nomepropriedade+'</h4><p>Rua: '+backupPropriedades[i].rua+'</p><p>Numero: '+backupPropriedades[i].numero+'</p><p>Bairro: '+backupPropriedades[i].bairro+'</p><p>Cidade: '+backupPropriedades[i].nomecidade+'</p><p>Cep: '+backupPropriedades[i].cep+'</p><p>Latitude: '+backupPropriedades[i].gps_lat+'</p><p>Longitude: '+backupPropriedades[i].gps_long+'</p>';
                    return false;
                }
            });

            $('.uib_w_390').children('.text-container').empty().append(dadosPropriedade);

            //lista cultivares recebidos na propriedade
            var cultivaresArelatar = JSON.parse(window.localStorage.getItem('cultivaresArelatar'));
            $('.uib_w_391').empty();
            var item;
            //c(idPropriedade);
            $.each(cultivaresArelatar, function(i){
                c(cultivaresArelatar[i]);
                if(cultivaresArelatar[i].idpropriedade == idPropriedade){
                    if(testeCultivarRelatado(cultivaresArelatar[i].idsafra)){
                        item = '<a class="list-group-item allow-badge widget uib_w_392" data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading">'+cultivaresArelatar[i].nomecultivar+'<i class="verde fa fa-thumbs-o-up button-icon-right" data-position="top"></i></h4><p class="list-group-item-text">Data recebimento: '+cultivaresArelatar[i].datareceb+'</p><p class="list-group-item-text">Quantidade Recebida: '+cultivaresArelatar[i].qtdrecebida+' '+cultivaresArelatar[i].grandeza_recebida+'</p></a>';

                    }else{
                        item = '<a class="list-group-item allow-badge widget uib_w_392" data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading">'+cultivaresArelatar[i].nomecultivar+'<i class="amarelo fa fa-hand-o-right button-icon-right" data-position="top"></i></h4><p class="list-group-item-text">Data recebimento: '+cultivaresArelatar[i].datareceb+'</p><p class="list-group-item-text">Quantidade Recebida: '+cultivaresArelatar[i].qtdrecebida+' '+cultivaresArelatar[i].grandeza_recebida+'</p></a>';

                    }

                    $('.uib_w_391').append(item);
                }

            });
            activate_page("#page_7");
        }


    });

     //verifica se o cultivar foi relatado
     function testeCultivarRelatado(idsafra){
         var cultivarRelatados;
         var retorno = false;

         if(window.localStorage.getItem('cultivarRelatados')){
             cultivarRelatados = JSON.parse(window.localStorage.getItem('cultivarRelatados'));
             $.each(cultivarRelatados, function(i){
                 if(cultivarRelatados[i].idsafra == idsafra ){
                     retorno = true;
                     return false;
                 }
             });
         }
         return retorno;
     }

    //page 7 voltar para page 4 em lista de propriedades
    $(document).on("click", ".uib_w_386", function(evt)
    {
         /*global activate_page */
         activate_page("#page_4");

         return false;
    });

    $(document).on("click", ".uib_w_392", function(evt){

        $(".uib_w_397").modal("toggle");
    });

    //acrecenta mais destinacao entrevistador
    $(document).on("click", "#maisDestinacao", function(evt){
        var selectUm = $('.uib_w_413').children('select');
        var selectDestino = $('.uib_w_400').children('select');
        var qtdDestinacao = $('.uib_w_412').children('input');
        var qtdColhida = $('.uib_w_409').children('input');

        //cria ou atualiza qtdColhida dos cultivares no session storage
        var qtdDestinadaSessao = 0;

        if(window.sessionStorage.getItem('qtdDestinadaSessao')){
            qtdDestinadaSessao += parseFloat(window.sessionStorage.getItem('qtdDestinadaSessao'));
        }

        //verifica se existe o valor maior que 0 colhido
        if(qtdColhida.val() > 0){
            //verifica se existe valor maior que 0 destinado
            if(qtdDestinacao.val() > 0 ){
                //verifica se a soma da qtdcolhida é menor ou igual que a qtd colhida
                if((conversaoUnidadesMedida(qtdDestinacao, selectUm) + qtdDestinadaSessao) <= conversaoUnidadesMedida(qtdColhida, $('.uib_w_398').children('select')) ){

                    //salva item no localStorage
                    var cultivaresRelatados;
                    if(window.localStorage.getItem('cultivaresRelatados')){
                        cultivaresRelatados = JSON.parse(window.localStorage.getItem('cultivaresRelatados'));
                    }else{
                        //cultivaresRelatados =
                        window.localStorage.setItem('cultivaresRelatados', JSON.stringify(cultivaresRelatados));
                    }

                    $(this).parent('div').append('<p class="itemDestinacao" value="'+conversaoUnidadesMedida(qtdDestinacao, selectUm)+'"><span class=" fa fa-trash"></span>&nbsp;&nbsp; '+qtdDestinacao.val()+ '&nbsp;' + selectUm.val()+ ' para ' + selectDestino.val()+'</p>');

                    //guarda o valor da qtdDestinadaSessao no sessionStorage
                    qtdDestinadaSessao += conversaoUnidadesMedida(qtdDestinacao, selectUm);
                    window.sessionStorage.setItem('qtdDestinadaSessao', qtdDestinadaSessao);
                    qtdDestinacao.val('');
                    selectUm.val('Kilo(s)');
                    selectDestino.val('Consumo');
                }else{
                    navigator.notification.alert("A soma da quantidade destinada não pode ser maior que a quantidade colhida!",function(){
                    qtdDestinacao.focus();
                    },"Alerta!", "OK");
                }
            }else{
                navigator.notification.alert("O campo quantidade destinada não pode ser vazio ou igual a zero!",function(){
                    qtdDestinacao.focus();
                },"Alerta!", "OK");
            }
        }else{
            navigator.notification.alert("O campo quantidade colhida não pode ser vazio ou igual a zero!",function(){
                qtdColhida.focus();
            },"Alerta!", "OK");
        }

    });

    function conversaoUnidadesMedida(inputValor, selectValor){

        if(selectValor.val() === 'Kilo(s)'){
            return parseFloat(inputValor.val());
        }else if(selectValor.val() === 'Tonelada(s)'){
            return parseFloat(inputValor.val() * 1000);
        }else{
            return parseFloat(inputValor.val() * 60);
        }
    }

    //deleta item destinacao entrevistador
    $(document).on("click", ".itemDestinacao", function(evt){
        //escreve no sessionStorage o valor qtd colhida
        var qtdDestinadaSessao = parseFloat(window.sessionStorage.getItem('qtdDestinadaSessao'));

        qtdDestinadaSessao = qtdDestinadaSessao - parseFloat($(this).attr('value'));
        window.sessionStorage.setItem('qtdDestinadaSessao', qtdDestinadaSessao);

        $(this).remove();
    });

    //ok modal relatar colheita e destinacao entrevistador
    $(document).on("click", "#entRelOk", function(evt){
        var qtdColhida = $('.uib_w_409').children('input');
        var qtdDestinacao = $('.uib_w_412').children('input');

        //verifica se existe o valor maior que 0 colhido
        if(qtdColhida.val() > 0){
            //verifica se existe valor maior que 0 destinado
            if(qtdDestinacao.val() > 0 ){
                var qtdDestinadaSessao = 0;
                if(window.sessionStorage.getItem('qtdDestinadaSessao')){
                    qtdDestinadaSessao = parseFloat(window.sessionStorage.getItem('qtdDestinadaSessao'));
                }
                if((conversaoUnidadesMedida($('.uib_w_412').children('input'), $('.uib_w_413').children('select')) + qtdDestinadaSessao) == conversaoUnidadesMedida($('.uib_w_409').children('input'), $('.uib_w_398').children('select') )){
                    c('tudo ok');
                    //guarda cultivares na localstorage
//                    var cultivarRelatados;
//                    var cultivarRelatado = ;
//                    if(window.localStorage.getItem('cultivarRelatados')){
//                        cultivarRelatados = JSON.parse(window.localStorage.getItem('cultivarRelatados'));
//                    }else{
//                        cultivarRelatados =
//                    }

                }else{
                    navigator.notification.alert("A quantidade da colheita não corresponde a quantidade destinada!",function(){
                        qtdDestinacao.focus();
                    },"Alerta!", "OK");
                }
            }else{
                navigator.notification.alert("O campo quantidade destinada não pode ser vazio ou igual a zero!",function(){
                    qtdDestinacao.focus();
                },"Alerta!", "OK");
            }
        }else{
            navigator.notification.alert("O campo quantidade colhida não pode ser vazio ou igual a zero!",function(){
                qtdColhida.focus();
            },"Alerta!", "OK");
        }
    });

    //cancela o modal relatar safra entrevistador
    $(document).on("click", "#entRelCanc", function(evt){
        $('.uib_w_413').children('select').val('Kilo(s)');
        $('.uib_w_400').children('select').val('Consumo');
        $('.uib_w_412').children('input').val('');
        $('.uib_w_409').children('input').val('');
        $('.uib_w_398').children('select').val('Kilo(s)');
        $('.uib_w_405').children('div .text-container').empty().append('<p id="maisDestinacao"><span class=" fa fa-plus"></span>&nbsp;&nbsp; destinação</p><hr>');

    });

        /* button  Button */
    $(document).on("click", ".uib_w_415", function(evt)
    {
         /*global activate_page */
         activate_page("#uib_page_teste");
         return false;
    });

        /* button  .uib_w_169 */
    $(document).on("click", ".uib_w_169", function(evt)
    {


        window.spinnerplugin.show();
        window.navigator.geolocation.getCurrentPosition(function(position) {


            window.spinnerplugin.hide();
            navigator.notification.alert("Coordenada local obtida!",function(){
                $('#igpslat').val(position.coords.latitude);
                $('#igpslong').val(position.coords.longitude);
            },"Sucesso!", "OK");

    }, function onError(error) {
           // navigator.notification.alert(error.code,function(){},"Alerta:", "OK");
        window.spinnerplugin.hide();

        navigator.notification.alert('Erro em obter coordenada!\nVerifique se está ativado sua localização ou existe conexão à internet!',function(){
            $('#igpslat').val('0');
            $('#igpslong').val('0');
        },"Erro!", "OK");


    }, { timeout: 20000 });


         return false;
    });



    }
 document.addEventListener("app.Ready", register_event_handlers, false);
 document.addEventListener("backbutton", onBackKeyDown, false);

})();



/*
<span class="badge fa fa-thumbs-o-up"><span class="badge fa fa-chevron-right"> </span> </span>*/
