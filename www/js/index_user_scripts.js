/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers
 */
 function register_event_handlers()
 {

     $(document).ready(function(){
        $('#icpf').mask('000.000.000-00');//, {reverse: true});
        $('#icep').mask('00000-000');
        $('#irg').mask('0.000.000.000');
        $('.telefone').mask('(00) 00000-0000');
        $('.numeros').mask('0#');
        $("#inome").mask('a',{'translation': {'a': {pattern: /[A-Za-zçÇãÃâÂáÁéÉíÍõÕôÔ-]/, optional: true, recursive: true}}});
        $(".palavras").mask('a',{'translation': {'a': {pattern: /[A-Za-zçÇãÃâÂáÁéÉíÍõÕôÔ-\s]/, optional: true, recursive: true}}});
        $("#iusuario").mask('a',{'translation': {'a': {pattern: /[A-Za-z0-9]/, optional: true, recursive: true}}});
        $('.nreal').mask('0', {'translation': {0: {pattern: /[0-9.]/, optional: true, recursive: true}}});
        $('.idatas').mask('00/00/0000');
        $("#iemail").mask('a',{'translation': {'a': {pattern: /[A-Za-z@-_.0-9]/, optional: true, recursive: true}}});
     });

     //variavel responsavel por armazenar cultivar selecionado
    var cultivarSelecionado;

    //papel agricultor
    $("#colheita").hide();
    $("#safra").hide();
    $("#relatorios").hide();

     //pagina gerenciador/entrevistador
    $("#tabNovoAgricultor").hide();
    $("#tabSafra").hide();

     //esconder checkbox off line
     $("#checkOffLine").hide();

     //esqueceu a senha
     $(document).on("click", "#esqueceuSenha", function(evt){
         navigator.notification.alert("suporte_bioid@fundetec.org.br",function(){},"Contato:", "Sair");
     });


        /* button  .uib_w_3 */
    $(document).on("click", ".uib_w_3", function(evt)
    {
         /*global activate_page */
         activate_page("#page_1");
        if($("#inputUsuario").val() === ""){
            $("#inputUsuario").focus();
        }else{
            $("#inputSenha").focus();
        }
         return false;
    });

        /* button  .uib_w_4 */
    $(document).on("click", ".uib_w_4", function(evt)
    {
         /*global activate_page */
         activate_page("#page_2");
        $("#inome").focus();
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
        retornaInicioUser1();
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


     function existeDados(atalhoClicado){

            navigator.notification.confirm(
                'Sua colheita não foi relatada! Deseja realmente cancelar?', // message
                function(buttonIndex) {
                    if(buttonIndex === 2){

                        //limpa os abas relatar
                        var novoItem = $("#novoabarelatar");
                        $("#abasrelatar").empty();
                        $("#abasrelatar").append(novoItem);
                        $('#qtdcolhida').val('');
                        $("#umcolheita").val("Kilo(s)");

                        if($('#todacolheita').is(':checked')){
                            $('#todacolheita').prop( "checked", false);
                            $('#relatarqtd').prop('disabled', false);
                            $("#relatarum").prop('disabled', false);
                        }


                        //limpa o combobox no modal e inseri novamente
                        $('#idestinacao').empty();
                        $('#idestinacao').append('<option>Consumo</option>');
                        $('#idestinacao').append('<option>Replantio</option>');
                        $('#idestinacao').append('<option>Venda</option>');
                        $('#idestinacao').append('<option>Merenda Escolar</option>');
                        $('#idestinacao').append('<option>Doação</option>');
                        $('#idestinacao').append('<option>Perda</option>');

                        //abre as box corretos
                        $("#colheita").hide();
                        $("#safra").hide();
                        $("#recebidos").hide();
                        $("#relatorios").hide();
                        $("#"+atalhoClicado).show();

                        //limpa o sessionStorage
                        window.sessionStorage.clear();
                    }
               },            // callback to invoke with index of button pressed
                'Confirmação',           // title
                ['Não', 'Sim']     // buttonLabels
            );


    }

        /* button  .uib_w_45 */
    $(document).on("click", ".uib_w_45", function(evt)
    {

         //funcao que testa se existe abas para relatar
         if($('#colheita').is(":visible")){
            existeDados('safra');
         }else{
             $("#colheita").hide();
             $("#safra").show();
             $("#recebidos").hide();
             $("#relatorios").hide();

         }

         return false;
    });


        /* button  .uib_w_46 */
    $(document).on("click", ".uib_w_46", function(evt)
    {
         //funcao que testa se existe abas para relatar
         if($('#colheita').is(":visible")){
            existeDados('relatorios');

         }else{
             $("#recebidos").hide();
             $("#colheita").hide();
             $("#safra").hide();
             $("#relatorios").show();
         }



         return false;
    });

        /* button  .uib_w_44 */
    $(document).on("click", ".uib_w_44", function(evt)
    {
         //funcao que testa se existe abas para relatar
         if($('#colheita').is(":visible")){
            existeDados('recebidos');

         }else{

            retornaInicioUser1();
         }
         return false;
    });

    function retornaInicioUser1(){

         $("#recebidos").show();
         $("#colheita").hide();
         $("#safra").hide();
         $("#relatorios").hide();
    }


        /* button  .uib_w_50 */
    $(document).on("click", ".uib_w_50", function(evt)
    {
        activate_page("#page_2");
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
         $("#tabSafra").show();
         $("#estoque").hide();

         return false;
    });

     function retornaInicioUser3(){

         $("#estoque").show();
         window.listarCultivar();
         $("#tabSafra").hide();
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

            $.post("http://"+window.ipServidor+":8080/Projeto_BioID-war/servico/pessoa/validacao", data, function(dados){
                //teste da requisicao no banco esta correta
                if(dados.sucesso){
                   //guarda dados do usuario no local storge
                    var logSession = JSON.stringify({
                        usuario:  usuario,
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
                        window.servArmazenarCulRecebdo(usuario);
                        activate_page("#page_3");
                    }else if(window.papel === "e"){
                        activate_page("#page_4");
                        window.listarCultivar();
                    }else if(window.papel === "g"){
                        activate_page("#page_4");
                        window.listarCultivar();
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


     $(document).on("click", "#page_3, #page_4", function(evt)
     {
         if($('#bs-navbar-1').is(':visible')){
            $('#bs-navbar-1').collapse('hide');
         }else if($('#bs-navbar-2').is(':visible')){
            $('#bs-navbar-2').collapse('hide');
         }


         return false;
     });

     $(document).on("click", ".sair", function(evt)
     {
         navigator.notification.confirm(
            'Deseja sair?', // message
            function(buttonIndex) {
                if(buttonIndex === 2){
                    $('.bs-navbar-menu').collapse('hide');
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
          activate_page("#page_99");

         return false;
     });

      $(document).on("click", ".duvidas", function(evt)
     {
          activate_page("#page_5");
          return false;
     });

     $(document).on("click", ".sobre", function(evt)
     {
           $(".uib_w_145").modal("toggle");
           return false;
     });

    //organiza lista de propriedades com o click da propriedade
    $(document).on("click", ".uib_w_286 > li", function(evt)
    {
        var propriedades = JSON.parse(localStorage.getItem("propriedades"));
        $("#itemPropriedades").append($(this));

        var propriedadeClick = $(this).text();
        var idpropriedade;

        var i = 0;
        $.each(propriedades, function(){
            if(propriedadeClick === propriedades[i].nomepropriedade){
                idpropriedade = propriedades[i].propriedade_idpropriedade;
                return false;
            }
            i++;
        });
        //lista os cultivares
        window.listarCultivarRecebidos(idpropriedade);
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

        /* button  .uib_w_197 */


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




     $(document).ready(function () {
        $('.colapses').click( function() {
            $('#colapseDesc').on('shown.bs.collapse', function() {
                $("#iconeDesc").removeClass("fa-chevron-down").addClass("fa-chevron-up");
            }).on('hidden.bs.collapse', function() {
                $("#iconeDesc").removeClass("fa-chevron-up").addClass("fa-chevron-down");
            });

             $('#colapseNutr').on('shown.bs.collapse', function() {
                $("#iconeNutr").removeClass("fa-chevron-down").addClass("fa-chevron-up");
            }).on('hidden.bs.collapse', function() {
                $("#iconeNutr").removeClass("fa-chevron-up").addClass("fa-chevron-down");
            });

             $('#colapseAjuda').on('shown.bs.collapse', function() {
                $("#iconeAjuda").removeClass("fa-chevron-down").addClass("fa-chevron-up");
            }).on('hidden.bs.collapse', function() {
                $("#iconeAjuda").removeClass("fa-chevron-up").addClass("fa-chevron-down");
            });

            //destinaçao
            $('#colapseConsumo').on('shown.bs.collapse', function() {
                $("#iconeConsumo").removeClass("fa-chevron-down").addClass("fa-chevron-up");
            }).on('hidden.bs.collapse', function() {
                $("#iconeConsumo").removeClass("fa-chevron-up").addClass("fa-chevron-down");
            });

             $('#colapseDistrib').on('shown.bs.collapse', function() {
                $("#iconeDistrib").removeClass("fa-chevron-down").addClass("fa-chevron-up");
            }).on('hidden.bs.collapse', function() {
                $("#iconeDistrib").removeClass("fa-chevron-up").addClass("fa-chevron-down");
            });

             $('#colapseReplant').on('shown.bs.collapse', function() {
                $("#iconeReplant").removeClass("fa-chevron-down").addClass("fa-chevron-up");
            }).on('hidden.bs.collapse', function() {
                $("#iconeReplant").removeClass("fa-chevron-up").addClass("fa-chevron-down");
            });
         });
    });

     $(document).on("click",".editarsocioe", function(evt)
    {
         $(".uib_w_331").modal("toggle");

         return false;
    });

        /* listitem  Batata Docess */
    $(document).on("click",".listaCultivar > a", function(evt)
    {

        var a = $(this).attr("id");
        //var nomeCultivar = $(this).children('h4').html();
        //carrega item que esta no localStorage
        var cultivaresRecebidos = JSON.parse(localStorage.getItem("cultivaresRecebidos"));
        if(cultivaresRecebidos.length > 1){
            cultivarSelecionado = cultivaresRecebidos[a];

            //hide e show os painels de cada usuario
            if(window.papel === "e"){
                $("#painelEstoque").show();
                $("#desabilitado").prop('disabled', true);
                $("#salvarEstoque").hide();
                //some botao de relatar
                $("#relatar").hide();
            }else if(window.papel === "g"){
                $("#desabilitado").prop('disabled', false);
                $("#salvarEstoque").show();
                $("#painelEstoque").show();
                //some botao de relatar
                $("#relatar").hide();
            //usuario agricultor
            }else{
                $("#painelEstoque").hide();
                //aparece botao de relatar se não foi relatado ainda a produçao do cultivar
                if(cultivarSelecionado.descricao === "Não relatado"){
                    $("#relatar").show();
                    $("#nomeCultivarRelatar").html("Relatar "+cultivarSelecionado.qtdrecebida+" de "+cultivarSelecionado.grandeza_cultivar+" de "+cultivarSelecionado.nomecultivar+':<i class="fa fa-truck button-icon-right" data-position="top"></i>');

                }else{
                    $("#relatar").hide();
                }
            }


            //renomeia os valores dos produtos
            $("#nomeProduto").html(cultivarSelecionado.nomecultivar);
            //muda a image do cultivar
            $("#imgCultivar").attr("src", carregarCultivar(cultivarSelecionado.nomecultivar));

            activate_page("#page_6");

    }
         return false;
    });

   function carregarCultivar(nomeCultivar){
       var listaCultivares = JSON.parse(window.localStorage.getItem("imagens"));
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
        }else if(window.papel === "g" || window.papel === "e" || window.papel === "d"){
            activate_page("#page_4");
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
         $(".inputsrelatado").hide();
         $("#recebidos").hide();
         $("#qtdcolhida").focus();

         return false;
    });

        /* button  .uib_w_197 */
    $(document).on("click", ".uib_w_197", function(evt)
    {
         /*global activate_page */
         activate_page("#page_teste");
         return false;
    });

        /* button  Button */
    $(document).on("click", ".uib_w_278", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage");
         return false;
    });

        /* button  .uib_w_197 */
    $(document).on("click", ".uib_w_197", function(evt)
    {
        window.listarCultivar();
        activate_page("#page_teste");
         return false;
    });





    /*$(document).on("click", ".uib_w_140", function(evt)
    {
        navigator.notification.alert("Trabalhando off-line algumas informações que dependem do servidor podem sofrer alterações(Exemplo: O estoque da sua unidade), trabalhe sempre on-line se possível. A colheita de informações é armazenada em lotes na memória do aparelho e precisa ser repassada ao servidor, seu lote espirará no prazo de 2 dias e suas informações serão perdidas, conecte-se em uma rede e repasse suas informaçõe antes de espirar. Bom trabalho!", function(){},"Alerta!", "OK");
         return false;
    });
*/



        /* button  pegar */
    $(document).on("click", ".uib_w_279", function(evt)
    {
        $("#testeImg").attr("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAU1QTFRFNjtAQEVK////bG9zSk9T/v7+/f39/f3+9vf3O0BETlJWNzxB/Pz8d3t+TFFVzM3O1NXX7u/vUldbRElNs7W3v8HCmZyeRkpPW19j8vLy7u7vvsDC9PT1cHR3Oj9Eo6WnxsjJR0tQOD1Bj5KVgYSHTVFWtri50dLUtLa4YmZqOT5D8vPzRUpOkZOWc3Z64uPjr7Gzuru95+jpX2NnaGxwPkNHp6mrioyPlZeadXh8Q0hNPEBFyszNh4qNc3d6eHx/OD1Cw8XGXGBkfoGEra+xxcbIgoaJu72/m52ggoWIZ2tu8/P0wcLE+vr7kZSXgIOGP0NIvr/BvL6/QUZKP0RJkpWYpKaoqKqtVVldmJqdl5qcZWhstbe5bHB0bnJ1UVVZwsTF5ubnT1RYcHN3oaSm3N3e3NzdQkdLnJ+h9fX1TlNX+Pj47/DwwsPFVFhcEpC44wAAAShJREFUeNq8k0VvxDAQhZOXDS52mRnKzLRlZmZm+v/HxmnUOlFaSz3su4xm/BkGzLn4P+XimOJZyw0FKufelfbfAe89dMmBBdUZ8G1eCJMba69Al+AABOOm/7j0DDGXtQP9bXjYN2tWGQfyA1Yg1kSu95x9GKHiIOBXLcAwUD1JJSBVfUbwGGi2AIvoneK4bCblSS8b0RwwRAPbCHx52kH60K1b9zQUjQKiULbMDbulEjGha/RQQFDE0/ezW8kR3C3kOJXmFcSyrcQR7FDAi55nuGABZkT5hqpk3xughDN7FOHHHd0LLU9qtV7r7uhsuRwt6pEJJFVLN4V5CT+SErpXt81DbHautkpBeHeaqNDRqUA0Uo5GkgXGyI3xDZ/q/wJMsb7/pwADAGqZHDyWkHd1AAAAAElFTkSuQmCC");


         return false;
    });



        /* button  .uib_w_30 */
    $(document).on("click", ".uib_w_30", function(evt)
    {
        //teste se existe campos nulos
        //if($("#inome").val() !== ""){
        var teste = testeCamposNulos();

        if(teste[0]){
            var data = "nome="+$("#inome").val()+"&sobrenome="+$("#isobrenome").val()+"&apelido="+$("#iapelido").val()+"&cpf="+$("#icpf").val()+"&sexo="+$('input[name = "bs-radio-group-0"]:checked').val()+"&rg="+$("#irg").val()+"&datanascimento="+$("#idatanascimento").val()+"&telefone1="+$("#itelefone1").val()+"&telefone2="+$("#itelefone2").val()+ "&escolaridade_idescolaridade="+($("#iescolaridade")[0].selectedIndex+1)+ "&estadocivil_idestadocivil="+($("#iestadocivil")[0].selectedIndex+1)+"&nomepropriedade="+$("#inomepropriedade").val()+"&rua="+$("#irua").val()+"&numero="+$("#inumero").val()+"&bairro="+$("#ibairro").val()+"&complemento="+$("#icomplemento").val()+"&cep="+$("#icep").val()+"&cidade_idcidade="+($("#cidade")[0].selectedIndex+1)+"&area="+$("#iarea").val()+"&unidadedemedida="+$('input[name = "bs-radio-group-2"]:checked').val()+"&areautilizavel="+$("#iareautilizavel").val()+"&unidadedemedidaau="+$('input[name = "bs-radio-group-1"]:checked').val()+"&gps_lat="+$("#igpslat").val()+"&gps_long="+$("#igpslong").val()+"&qtdedeintegrantes="+$("#iqtdintegrantes").val()+"&qtdedecriancas="+$("#iqtdcriancas").val()+"&qtdedegravidas="+$("#iqtdgravidas").val()+"&usuario="+$("#iusuario").val()+"&senha="+$("#isenha").val()+"&email="+$("#iemail").val()+"&papel=a&unidade_idunidade=2";


            $.post("http://"+window.ipServidor+":8080/Projeto_BioID-war/servico/pessoa/inseriragricultor", data, function(dados){

                //se cadastrado entao vai para pagina inicial
                if(dados.sucesso){
                    //vai para a pagina de login
                    navigator.notification.alert(dados.mensagem, function(){
                        $(".camposcadastro").val("");
                        activate_page("#page_1");
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


            });

        //mensagem de alerta
        }else{
            alertaCampoNulo(teste[1], teste[2]);
        }

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
         var data = "nome="+$("#inome").val()+"&sobrenome="+$("#isobrenome").val()+"&apelido="+$("#iapelido").val()+"&cpf="+$("#icpf").val()+"&sexo="+$('input[name = "bs-radio-group-0"]:checked').val()+"&rg="+$("#irg").val()+"&telefone1="+$("#itelefone1").val()+"&telefone2="+$("#itelefone2").val()+ "&escolaridade_idescolaridade="+$("#iescolaridade")[0].selectedIndex+ "&estadocivil_idestadocivil="+$("#iestadocivil")[0].selectedIndex+"&nomepropriedade="+$("#inomepropriedade").val()+"&rua="+$("#irua").val()+"&numero="+$("#inumero").val()+"&bairro="+$("#ibairro").val()+"&complemento="+$("#icomplemento").val()+"&cep="+$("#icep").val()+"&cidade_idcidade="+$("#cidade")[0].selectedIndex+"&area="+$("#iarea").val()+"&unidadedemedida="+$('input[name = "bs-radio-group-2"]:checked').val()+"&areautilizavel="+$("#iareautilizavel").val()+"&unidadedemedidaau="+$('input[name = "bs-radio-group-1"]:checked').val()+"&gps_lat="+$("#igpslat").val()+"&gps_long="+$("#igpslong").val()+"&qtdedeintegrantes="+$("#iqtdintegrantes").val()+"&qtdedecriancas="+$("#iqtdcriancas").val()+"&qtdedegravidas="+$("#iqtdgravidas").val()+"&usuario="+$("#iusuario").val()+"&senha="+$("#isenha").val()+"&email="+$("#iemail").val()+"&papel=a&unidade_idunidade=2";


        sessionStorage.clear();

         return false;
    });

     //funcao de guardar na memoria dados do input quantidade colhida
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


     $("#umcolheita").focusout(function() {
        $("#relatarum").val($('#umcolheita').val());
        return false;
     });


     $(document).on("click", ".uib_w_338", function(evt){

        if($(this).children('input').is(':checked')){
            $('#todacolheita').prop( "checked", false);
            $('#relatarqtd').prop('disabled', false);
            $('#relatarqtd').val('');
            $("#relatarum").val("Kilo(s)");
            $('#relatarum').prop('disabled', false);
        }else{
            $('#todacolheita').prop( "checked", true);
            $('#relatarqtd').prop('disabled', true);
            $('#relatarqtd').val($('#qtdcolhida').val());
            $('#relatarum').prop('disabled', true);
            $("#relatarum").val($('#umcolheita').val());
        }

         return false;
     });

    $(document).on("click", ".uib_w_308 > li", function(evt)
    {
        var abaClicada = $(this).attr("id");

        //testa se foi populado o input de quantidade colhida
        if($('#qtdcolhida').val() > 0 && sessionStorage.getItem("qtdcolhida") === $('#qtdcolhida').val()){

            //primeira destinacao
            if($("#abasrelatar li").length === 1 ){
                $(".uib_w_310").modal("toggle");
            }else if($('#relatardata').val() !== ''){
                if($('#relatarqtd').val() !== ''){
                    //testa se o checkbox esta ativo
                    if(!$('#todacolheita').is(':checked')){
                        if($('#idestinacao option').length < 1 && abaClicada === "novoabarelatar"){
                            navigator.notification.alert("Todas as destinações estão abertas!",function(){
                                $("#novoabarelatar").removeClass("active");
                                $(".inputsrelatado").hide();
                            },"Alerta!:", "OK");
                        }else{
                            //verifica e guarda dados na sessionStorage
                            verificaAba(abaClicada);
                            //cria uma nova destinacao, abre o modal
                            if(abaClicada === "novoabarelatar"){
                                $(".uib_w_310").modal("toggle");
                            //salva e carrega dados das abas
                            }else{
                                $(".uib_w_308").append($(this));
                            }

                        }
                    }else{
                        navigator.notification.alert("O item toda colheita está marcado!",function(){
                            $("#"+sessionStorage.getItem("abaAnterior")).addClass("active");
                            $("#"+abaClicada).removeClass("active");
                        },"Alerta!", "OK");
                    }

                }else{
                    navigator.notification.alert("Insira uma quantidade para navegar nas abas!",function(){
                        $('#relatarqtd').focus();
                        $("#"+abaClicada).removeClass("active");
                        $("#"+sessionStorage.getItem("abaAnterior")).addClass("active");
                    },"Alerta!", "OK");
                }
            }else{
                navigator.notification.alert("Insira uma data para navegar nas abas!",function(){
                    $('#relatardata').focus();
                    $("#"+abaClicada).removeClass("active");
                    $("#"+sessionStorage.getItem("abaAnterior")).addClass("active");
                },"Alerta!", "OK");
            }

        }else{
            navigator.notification.alert("Insira uma quantidade antes de criar uma nova destinação!",function(){
                $('#qtdcolhida').focus();
                $("#novoabarelatar").removeClass("active");
            },"Alerta!", "OK");
        }


        return false;

    });

     //botao no modal de destinacao
    $(document).on("click", "#okmodal", function(evt)
    {

        sessionStorage.setItem("abaAnterior", $('#idestinacao option:selected').val());


        var item ='<li role="presentation" class="widget uib_w_309 active" data-uib="twitter%20bootstrap/tab_item" data-ver="1" id="'+$('#idestinacao option:selected').val()+'"><a role="tab" data-toggle="tab">'+ $('#idestinacao').val()+'</a></li>';

        $("#abasrelatar").append(item);
        //exclui o item do combobox
        $('#idestinacao option:selected').remove();


        $(".inputsrelatado").show();
        //limpa os campos
        $('#relatardata').val('');
        $('#relatarqtd').val('');
        $("#novoabarelatar").removeClass("active");
        $('#relatardata').focus();

        return false;
    });

    $(document).on("click", "#cancelamodal", function(evt)
    {

        $("#novoabarelatar").removeClass("active");
        $(".inputsrelatado").hide();
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
                    var abaClicada = $(".uib_w_308 .active").attr("id");
                    var campos = JSON.parse(sessionStorage.getItem("camposrelatar"));
                    var novoCampos = [];
                    var i = 0;
                    $.each(campos, function(){
                        //adiciona todos os dados da memoria menos os que vai ser excluido
                        if(campos[i].idaba !== abaClicada){
                            novoCampos[novoCampos.length] = campos[i];
                        }
                    i++;
                    });


                    sessionStorage.setItem("camposrelatar", JSON.stringify(novoCampos));
                    $('#idestinacao').append('<option>'+$(".uib_w_308 .active").text()+'</option>');

                    $(".uib_w_308 .active").remove();
                    $(".inputsrelatado").hide();
                    //desativa o checkbox e os inputs
                    $('#todacolheita').prop( "checked", false);
                    $('#relatarqtd').prop('disabled', false);
                    $('#relatarum').prop('disabled', false);
                    $("#relatarum").val("Kilo(s)");
                    //
                    //adiciona uma data para navegar

                    if($("#abasrelatar li").length === 1 ){
                        sessionStorage.removeItem("abaAnterior");
                    }else{
                        sessionStorage.setItem("abaAnterior", novoCampos[novoCampos.length - 1].idaba);
                        $('#relatardata').val(novoCampos[novoCampos.length - 1].datarelatada);
                        $('#relatarqtd').val(novoCampos[novoCampos.length - 1].valor);
                        $('#relatarum').val(novoCampos[novoCampos.length - 1].um);
                    }

                }
           },            // callback to invoke with index of button pressed
            'Confirmação',           // title
            ['Não', 'Sim']     // buttonLabels
        );

        return false;
    });

    function guardarcamposrel(){

        var i = sessionStorage.getItem("abaAnterior");
        var campos = [];
        if(sessionStorage.getItem("camposrelatar")){

            campos = JSON.parse(sessionStorage.getItem("camposrelatar"));

            campos[campos.length] = {idaba:i,
            datarelatada: $("#relatardata").val(),
            um: $("#relatarum").val(),
            valor: $("#relatarqtd").val()};

        }else{
            campos[0] = {idaba: i,
            datarelatada: $("#relatardata").val(),
            um: $("#relatarum").val(),
            valor: $("#relatarqtd").val()};


        }

        sessionStorage.setItem("camposrelatar", JSON.stringify(campos));

    }


    function verificaAba(abaClicada){
        var teste = false;

        var indiceAba;
        var campos = JSON.parse(sessionStorage.getItem("camposrelatar"));
        var abaAnterior = sessionStorage.getItem("abaAnterior");
        var campoAba;
        var i = 0;
        //percorre a sessao storage para verificar se existe o id
        $.each(campos, function(){
            if(abaAnterior === campos[i].idaba){
                indiceAba = i;
                teste = true;
            }
            i++;
        });

        // cria e grava informacoes no sessionStorage
        if(!teste){
            guardarcamposrel();
        //atualiza o sessionStorage
        }else{
            campos[indiceAba].datarelatada =  $("#relatardata").val();
            campos[indiceAba].um =  $("#relatarum").val();
            campos[indiceAba].valor =  $("#relatarqtd").val();
            sessionStorage.setItem("camposrelatar", JSON.stringify(campos));
        }

        //atualiza a variavel campos com os dados anteriores
        campos = JSON.parse(sessionStorage.getItem("camposrelatar"));

        i = 0;
        $.each(campos, function(){

            if(abaClicada === campos[i].idaba){
                $("#relatardata").val(campos[i].datarelatada);
                $("#relatarum").val(campos[i].um);
                $("#relatarqtd").val(campos[i].valor);
                //mostra os campos
                $(".inputsrelatado").show();
            }
            i++;

        });

        //grava a aba clicada na sessionstorage
        if(abaClicada !== "novoabarelatar"){
            sessionStorage.setItem("abaAnterior", abaClicada);
        }



    }

    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();




/*
<span class="badge fa fa-thumbs-o-up"><span class="badge fa fa-chevron-right"> </span> </span>*/
