/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers
 */
 function register_event_handlers()
 {

     function c(msg){
         window.console.log(msg);
     }

     $(document).ready(function(){
        $('#icpf').mask('000.000.000-00');//, {reverse: true});
        $('#icep').mask('00000-000');
        $('#irg').mask('0.000.000.000');
        $('.telefone').mask('(00) 00000-0000');
        $('#inome').mask('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',{'translation': {'a': {pattern: /[A-Za-zçÇãÃâÂáÁàÀéÉíÍõÕôÔúÚ]/}}});
        $(".palavras").mask('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',{'translation': {'a': {pattern: /[A-Za-zçÇãÃâÂáÁàÀéÉíÍõÕôÔúÚ\s]/}}});
        //$("#iusuario").mask('a',{'translation': {'a': {pattern: /[A-Za-z0-9]/, optional: true, recursive: true}}});

        $("#iemail").mask('a',{'translation': {'a': {pattern: /[A-Za-z@-_.0-9]/}}});



     });


     //lista os cultivares por propriedade, metodo entrevistador
     $(document).on("click", ".uib_w_118 > a", function(evt){
        $('.uib_w_380').empty();

          $('.uib_w_380').append('<a class="list-group-item allow-badge propriedadeBackup widget" data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading"><span class="glyphicon glyphicon-refresh" ></span>&nbsp;&nbsp;&nbsp;Carregando...</h4></a>');
         //$('.uib_w_384').hide();


        var data = 'usuario='+$(this).children('.usuarioOculto').text()+'&idunidade='+2;

        $.post("http://"+window.ipServidor+"/Projeto_BioID-war/servico/cultivar/backupentrevista", data, function(dados){
            //teste da requisicao no banco esta correta
            if(dados.sucesso){

                listarBkpEstrevistaP(dados);

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






         $(".uib_w_378").show();
         $(".uib_w_116").hide();
     });

     function listarBkpEstrevistaP(dados){
         var propriedades = dados.propriedades;
         $('.uib_w_380').empty();
         var item;
         var i=0;
         $.each(propriedades, function(){

             item ='<a class="list-group-item allow-badge propriedadeBackup widget" data-uib="twitter%20bootstrap/list_item" data-ver="1"><h4 class="list-group-item-heading"><span class="glyphicon glyphicon-unchecked" ></span>&nbsp;&nbsp;&nbsp;'+propriedades[i].nomepropriedade+'</h4><div><p class="list-group-item-text">Telefone:</p><p class="list-group-item-text">Rua:</p><p class="list-group-item-text">Bairro:</p><p class="list-group-item-text">Numero:</p><p class="list-group-item-text">Cidade:</p><p class="list-group-item-text">Latitude:</p><p class="list-group-item-text">Logitude:</p>'+listarBkpEstrevistaC(dados.itementrevista, propriedades[i].nomepropriedade)+'</div></a>';


             $('.uib_w_380').append(item);
             i++;
         });
     }

     function listarBkpEstrevistaC(cultivares, nomepropriedade){

         var item = '';// = '<p class="list-group-item-text">Cultivares Recebidos:</p> ';
         var i=0;
         $.each(cultivares, function(){
             if(cultivares[i].nomepropriedade === nomepropriedade){
                item = item.concat('<pre class="list-group-item-text">'+cultivares[i].nomecultivar+'<p>Qtd recebida: '+cultivares[i].qtdrecebida+' '+cultivares[i].grandeza_recebida+'</p></pre>');

             }
             i++;
         });

         return item;
     }
     //esqueceu a senha
     $(document).on("click", "#esqueceuSenha", function(evt){
         navigator.notification.alert("suporte_bioid@fundetec.org.br",function(){},"Contato:", "Sair");
     });


$(document).on("click", ".propriedadeBackup", function(evt){

    if($(this).children('h4').children('span').hasClass('glyphicon-unchecked')){
        $(this).children('h4').children('span').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
        $(this).children('div').hide();
        //$('.uib_w_384').show();
    }else{
        $(this).children('h4').children('span').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
        $(this).children('div').show();
        //$('.uib_w_384').hide();
    }
     /*navigator.notification.confirm(
        'Deseja armazenar temporariamente essa propriedade?', // message
        function(buttonIndex) {
            if(buttonIndex === 2){


            }
       },            // callback to invoke with index of button pressed
        'Confirmação',           // title
        ['Não', 'Sim']     // buttonLabels
    );*/
});
        /* button  .uib_w_3 */
    $(document).on("click", ".uib_w_3", function(evt)
    {
         /*global activate_page */
         activate_page("#page_1");
        //if($("#inputUsuario").val() === ""){
          //  $("#inputUsuario").focus();
       // }else{
         //   $("#inputSenha").focus();
       // }
         return false;
    });

        /* button  .uib_w_4 */
    $(document).on("click", ".uib_w_4", function(evt)
    {
         /*global activate_page */
         activate_page("#page_2");

         return false;
    });

        /* button  .uib_w_31 */
    $(document).on("click", ".uib_w_31", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage");
         $("#inputSenha").val("");
         return false;
    });

        /* button  .uib_w_32 */
    $(document).on("click", ".uib_w_32", function(evt)
    {
         /*global activate_page */
        if(localStorage.getItem("logSession")){
            activate_page("#page_4");
        }else{
            activate_page("#mainpage");
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


        /* button  botao socioe */
    $(document).on("click", ".uib_w_45", function(evt)
    {
        if(!escondeMenuHamburguer('bs-navbar-1')){
            if(sessionStorage.getItem('indiceSelecionado')){
                navigator.notification.confirm(
                    'O cultivar não foi relatado, Deseja realmente cancelar?', // message
                     testeButtonSafras,            // callback to invoke with index of button pressed
                    'Confirmação',           // title
                    ['Não','Sim']     // buttonLabels
                );
             }else{
                 $("#colheita").hide();
                 $("#destinacao").hide();
                 $("#safra").show();
                 $("#recebidos").hide();
                 $("#relatorios").hide();

             }
         }

         return false;
    });
    function testeButtonSafras(buttonIndex){
         if(buttonIndex === 2){
             //limpa o sessionStorage
             window.sessionStorage.clear();
             $("#colheita").hide();
             $("#destinacao").hide();
             $("#safra").show();
             $("#recebidos").hide();
             $("#relatorios").hide();
         }
     }

        /* button  safras */
    $(document).on("click", ".uib_w_46", function(evt)
    {

        if(!escondeMenuHamburguer('bs-navbar-1')){
            if(sessionStorage.getItem('indiceSelecionado')){
                navigator.notification.confirm(
                    'O cultivar não foi relatado, Deseja realmente cancelar?', // message
                     testeButtonSocioEco,            // callback to invoke with index of button pressed
                    'Confirmação',           // title
                    ['Não','Sim']     // buttonLabels
                );
             }else{
                 $("#recebidos").hide();
                 $("#colheita").hide();
                 $("#destinacao").hide();
                 $("#safra").hide();
                 $("#relatorios").show();

             }
         }

         return false;
    });

     function testeButtonSocioEco(buttonIndex){
         if(buttonIndex === 2){
             //limpa o sessionStorage
             window.sessionStorage.clear();
             $("#recebidos").hide();
             $("#colheita").hide();
             $("#destinacao").hide();
             $("#safra").hide();
             $("#relatorios").show();
         }
     }


    /* button  atalho recebidos */
    $(document).on("click", ".uib_w_44", function(evt)
    {
        if(!escondeMenuHamburguer('bs-navbar-1')){
            if(sessionStorage.getItem('indiceSelecionado')){
                navigator.notification.confirm(
                    'O cultivar não foi relatado, Deseja realmente cancelar?', // message
                     testeButtonRecebidos,            // callback to invoke with index of button pressed
                    'Confirmação',           // title
                    ['Não','Sim']     // buttonLabels
                );
            }else{
                window.iniciarAgricultor();
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


         /* button  .uib_w_50 */
    $(document).on("click", ".uib_w_358", function(evt)
    {
        $('.uib_w_357').append($(this));
         return false;
    });


        /* button  .uib_w_50 */
    $(document).on("click", ".uib_w_360", function(evt)
    {
        activate_page("#page_2");
         return false;
    });

             /* button  .uib_w_50 */
    $(document).on("click", ".uib_w_50", function(evt)
    {
        $('.uib_w_361').show();
        $(".uib_w_116").hide();
        $(".uib_w_123").hide();
        $(".uib_w_378").hide();
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
         $(".uib_w_116").show();
         $(".uib_w_123").hide();
         $('.uib_w_361').hide();
         $(".uib_w_378").hide();
         window.listarAgricultoresUnidade();

         return false;
    });

     function retornaInicioUser3(){

         $(".uib_w_123").show();
         $('.uib_w_361').hide();
         //window.listarCultivar();
         $(".uib_w_116").hide();
         $(".uib_w_378").hide();
     }

    $("#inputSenha").keypress(function(e){
        if(e.which === 13){
            validacaoLogin();
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
                //teste da requisicao no banco esta correta
                if(dados.sucesso){
                   //guarda dados do usuario no local storge
                    var logSession = JSON.stringify({
                        usuario:  usuario,
                        idunidade: dados.idunidade,
                        idSession: dados.idSession,
                        logTempo: dados.logTempo,
                        papel: dados.papel

                    });
                    localStorage.setItem("logSession", logSession);


                    window.papel = dados.papel;
                    //limpa o campo senha
                    $("#inputSenha").val("");
                    //verifica o tipo de funcionario
                    if(window.papel === "a"){
                        //rest popular propriedades
                        //chama o metodo que busca dados no servidor e armazena no localStorage
                        //para outro metodo acessar e criar a lista de cultivares recebidos
                        window.iniciarAgricultor();
                        window.servArmazenarCulRecebdo(usuario);
                        activate_page("#page_3");
                    }else{
                        window.listarEstoque(dados.idunidade);
                        //c(dados.idunidade);
                        window.iniciarGerEntrev();
                        activate_page("#page_4");

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
                navigator.notification.confirm(
                    'Sem conexão com o servidor!',
                    function() {
                        //limpa o campo senha
                        $("#inputSenha").val('');
                        //limpa a tela e vai para a pagina inicial
                        window.clearGoMainPage();
                    },
                    'Erro',
                    ['OK']
                );


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

            var propriedades = JSON.parse(localStorage.getItem("propriedades"));
            $(".uib_w_286").append($(this));

            var abaNomeProp = $(this).text();


            var i = 0;
            $.each(propriedades, function(){

                if(abaNomeProp === propriedades[i].nomepropriedade){
                    //lista os cultivares
                    window.listarCultivarRecebidos(abaNomeProp);
                    return false;
                }
                i++;
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



        /* button  .uib_w_169 */
    $(document).on("click", ".uib_w_169", function(evt)
    {
         /*global activate_page */
         activate_page("#pageCidades");
         return false;
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



        /* listitem  Batata Docess */
    $(document).on("click",".listaCultivar > a", function(evt)
    {
        if(!escondeMenuHamburguer('bs-navbar-1')){

            var a = $(this).attr("id");
            //carrega item que esta no localStorage
            var cultivaresRecebidos = JSON.parse(localStorage.getItem("cultivaresRecebidos"));
            if(cultivaresRecebidos.length > 0){
                var cultivarSelecionado = cultivaresRecebidos[a];
                //guarda o id da safra no session storage
                sessionStorage.setItem("indiceSelecionado", a);
                //guarda o id da safra no sessionStorage
                sessionStorage.setItem("idsafra", cultivarSelecionado.idsafra);
                //hide e show os painels de cada usuario
                if(window.papel === "e"){
                    $("#painelEstoque").show();
                    $("#desabilitado").prop('disabled', true);
                    $("#salvarEstoque").hide();
                    $("#statuscultivar").hide();
                    //some botao de relatar
                    //$("#relatar").hide();
                }else if(window.papel === "g"){
                    $("#desabilitado").prop('disabled', false);
                    $("#salvarEstoque").show();
                    $("#painelEstoque").show();
                    $("#statuscultivar").hide();
                    //some botao de relatar
                   // $("#relatar").hide();
                //usuario agricultor
                }else{

                    $("#statuscultivar").show();
                    $("#painelEstoque").hide();
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

                }


                //renomeia os valores dos produtos
                $("#nomeProduto").html(cultivarSelecionado.nomecultivar);
                //muda a image do cultivar
                $("#imgCultivar").attr("src", carregarCultivar(cultivarSelecionado.nomecultivar));
                //carega os valores da safra, destinacao e datas de recebimento
                $("#statuscultivar").html("<p>Safra: "+cultivarSelecionado.safra+"</p><p>Data recebimento: "+cultivarSelecionado.datareceb+"</p><p>Quantidade recebida: "+cultivarSelecionado.qtdrecebida+" "+cultivarSelecionado.grandeza_recebida+"</p><p>Quantidade colhida: "+cultivarSelecionado.qtdcolhida+" kilo(s)</p><p>Status colheita: "+cultivarSelecionado.prazo_colheita+"</p><p>Quantidade destinada: "+cultivarSelecionado.qtddestinada+" (kilo(s)</p><p>Status destinação: "+cultivarSelecionado.prazo_destinacao+"</p>");

                activate_page("#page_6");
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


        /* button  .uib_w_242 */
    $(document).on("click", ".uib_w_242", function(evt)
    {
        /*global activate_page */
        if(window.papel === "a"){
            activate_page("#page_3");
            $("#page_3").scrollTop(0);
            sessionStorage.removeItem("indiceSelecionado");
        }else if(window.papel === "g" || window.papel === "e" || window.papel === "d"){
            activate_page("#page_4");
            //$("#page_4").scrollTop(0);
        }else{
            window.clearGoMainPage();
        }
         return false;
    });


        /* button  .uib_w_272 */
    $(document).on("click", ".uib_w_272", function(evt)
    {
         /*global activate_page */
         activate_page("#page_3");
         $("#colheita").show();
         $("#destinacao").hide();
         $("#recebidos").hide();
         $("#page_3").scrollTop(0);

         return false;
    });

        /* button  .uib_w_197 */
    $(document).on("click", ".uib_w_197", function(evt)
    {
         navigator.app.exitApp();

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

        //if(teste){
            var data = "nome="+$("#inome").val()+"&sobrenome="+$("#isobrenome").val()+"&apelido="+$("#iapelido").val()+"&cpf="+$("#icpf").val()+"&sexo="+$('input[name = "bs-radio-group-0"]:checked').val()+"&rg="+$("#irg").val()+"&datanascimento="+$("#idatanascimento").val()+"&telefone1="+$("#itelefone1").val()+"&telefone2="+$("#itelefone2").val()+ "&escolaridade_idescolaridade="+($("#iescolaridade")[0].selectedIndex+1)+ "&estadocivil_idestadocivil="+($("#iestadocivil")[0].selectedIndex+1)+"&nomepropriedade="+$("#inomepropriedade").val()+"&rua="+$("#irua").val()+"&numero="+$("#inumero").val()+"&bairro="+$("#ibairro").val()+"&complemento="+$("#icomplemento").val()+"&cep="+$("#icep").val()+"&cidade_idcidade="+verificarIDCidade()+"&area="+$("#iarea").val()+"&unidadedemedida="+$('input[name = "bs-radio-group-2"]:checked').val()+"&areautilizavel="+$("#iareautilizavel").val()+"&unidadedemedidaau="+$('input[name = "bs-radio-group-1"]:checked').val()+"&gps_lat="+$("#igpslat").val()+"&gps_long="+$("#igpslong").val()+"&qtdedeintegrantes="+$("#iqtdintegrantes").val()+"&qtdedecriancas="+$("#iqtdcriancas").val()+"&qtdedegravidas="+$("#iqtdgravidas").val()+"&usuario="+$("#iusuario").val()+"&senha="+$("#isenha").val()+"&email="+$("#iemail").val()+"&papel=a&unidade_idunidade=2";

/*
            $.post("http://"+window.ipServidor+"/Projeto_BioID-war/servico/pessoa/inseriragricultor", data, function(dados){

                //se cadastrado entao vai para pagina inicial
                if(dados.sucesso){
                    //vai para a pagina de login
                    navigator.notification.alert(dados.mensagem, function(){
                        $(".camposcadastro").val("");
                        activate_page("#page_1");
                        $("#inputUsuario").val();
                        $("#inputUsuario").focus();

                    },"Alerta!", "OK");

                }else{
                   navigator.notification.alert("Usuario não cadastrado!, mensage="+dados.mensagem, function(){},"Alerta!", "OK");

                }


            },"json")
            //Tratamento de erro da requisicao servico RESt login
            .fail(function(){
                navigator.notification.confirm(
                    'Cadastro não efetuado, sem conexão com o servidor!',
                    function() {
                        //limpa a tela e vai para a pagina inicial
                        window.clearGoMainPage();
                    },
                    'Erro',
                    ['OK']
                );


            });*/
c(data);
        //mensagem de alerta
       // }else{
        //    alertaCampoNulo(teste[1], teste[2]);
       // }

        ///
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
                        relatarSafra('Deseja realmente relatar a ultima colheita da safra?', 4);
                    }else{
                        relatarSafra('Deseja realmente relatar a colheita parcial da safra?', 2);
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
                        //se safra foi relatada
                        if(dados.sucesso){
                            navigator.notification.alert("Colheita relatada!", function(){},"Alerta!", "OK");

                        }else{
                           navigator.notification.alert("Colheita não relatada!", function(){},"Erro!", "OK");

                        }
                    },"json")
                    //Tratamento de erro da requisicao servico RESt login
                    .fail(function(){
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
                        window.servArmazenarCulRecebdo(JSON.parse(localStorage.getItem("logSession")).usuario);
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
         var cultivar = JSON.parse(localStorage.getItem("cultivaresRecebidos"));
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
                     'Toda sua safra foi realmente colhida?', // message
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
            'Deseja realmente excluir essa destinção?', // message
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
        var cultivaresRecebidos = JSON.parse(localStorage.getItem("cultivaresRecebidos"));
        //deixa os botoes enviar e cancelar ocultos

         activate_page("#page_3");
         $("#destinacao").show();
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
            'Deseja realmente enviar as destinações?', // message
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
    $(document).on("click",".collapseSafras .panel-heading", function(evt)
    {
        var idCollapse = $(this).children('h4').children('a').attr('href');
        var iconeCollapse = $(this).children('h4').children('a').children('i').attr('id');

        $(idCollapse).collapse('toggle');

        c(iconeCollapse);
        $(idCollapse).on('shown.bs.collapse', function() {
            $("#"+iconeCollapse).removeClass("fa-chevron-down").addClass("fa-chevron-up");

        }).on('hidden.bs.collapse', function() {
            $("#"+iconeCollapse).removeClass("fa-chevron-up").addClass("fa-chevron-down");
        });

        return false;
    });

    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();




/*
<span class="badge fa fa-thumbs-o-up"><span class="badge fa fa-chevron-right"> </span> </span>*/
