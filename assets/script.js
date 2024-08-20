// Exibe uma mensagem de confirmação para o usuário quando algo é deletado
//confirm("Are you sure you want to delete?");

// Aguarda o documento HTML ser carregado e pronto para ser manipulado
$(document).ready(function() {

    // Ao clicar em um elemento com a classe "mudaTela", chama a função mudaTela
    $(".mudaTela").click(function() {
        mudaTela($(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao"));
    });

    // Ao clicar em um link com a classe "opcoes", previne o comportamento padrão e alterna a exibição do elemento "div.opcoes"
    $("a.opcoes").click(function(e) {
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    // Ao clicar em um elemento marcado dentro do calendário, chama a função mostraMsgMes com o valor desse elemento
    $(".calendario .marcado").click(function() {
        mostraMsgMes($(this).attr("value"));
    });

    // Função responsável por mudar a tela atual para a próxima tela
    const mudaTela = (atual, nova = null, animacao = "fade", tempoAnimacao = 900) => {

        // Define a nova tela, se não for passada como argumento, calcula a próxima com base na atual
        if (!nova) {
            nova = parseInt(atual.parent().attr("id").split("tela")[1]) + 1;
        }

        // Executa a animação de transição entre as telas (fade ou hide/show)
        if (animacao == "fade") {
            $("#tela" + (nova - 1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela" + nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        } else {
            $("#tela" + (nova - 1)).hide(tempoAnimacao);
            $("#tela" + nova).show(tempoAnimacao);
        }

        // Se a nova tela for temporizada, esconde seu conteúdo e inicia a função telaTemporizada
        if ($("#tela" + nova).hasClass("temporizado")) {
            $("#tela" + nova + " div").hide();
            telaTemporizada(nova, 0);
        }

        // Verifica se há um fundo específico para a nova tela e rola a página para o topo
        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");

        // Se a nova tela for a tela 5, toca uma música em volume baixo
        if (nova == 5) {
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.1;
            audio.play();
        }
    }

    // Função para controlar a exibição de telas temporizadas, mostrando um conteúdo de cada vez
    const telaTemporizada = (nTela, contador) => {

        const tela = $("#tela" + nTela + " div:eq(" + contador + ")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador == 0 ? $("#tela" + nTela).attr("tempo") : temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if (tela.attr("final") == "true") {
                    mudaTela(null, nTela + 1, "fade", 900);
                    verificaFundo(nTela + 1);
                } else {
                    telaTemporizada(nTela, contador + 1);
                }

            }, tela.attr("tempo"));

        }, temporizadorPrimeiraTela);
    }

    // Função que verifica e aplica um fundo específico para a tela, se definido
    const verificaFundo = (nTela) => {

        const fundo = $("#tela" + nTela).attr("fundo");
        const tempo = $("#tela" + nTela).attr("tempo");

        if (fundo) {
            $("body").attr("class", fundo);
        }

    }

    // Função que exibe uma mensagem específica do calendário com base no valor clicado
    const mostraMsgMes = (texto) => {

        let titulo;
        let mensagem;

        // Verifica o valor e define a mensagem correspondente
        switch (texto) {
            case "5/5": titulo = "05 de Maio de 2021"; mensagem = "<p>Esse foi o dia que nos conhecemos!..."; break;
            case "8/5": titulo = "08 de Maio de 2021"; mensagem = "<p>Foi o primeiro dia que saímos..."; break;
            case "15/5": titulo = "15 de Maio de 2021"; mensagem = "<p>Foi quando te vi com os cabelos cacheados..."; break;
            // Outros casos omitidos para brevidade
            case "final": titulo = "19 de Junho de 2021"; mensagem = "<section class='text-center mt-5 mb-5'><p><strong>O dia em que ela disse<br><span class='letra2 letra-vermelha'>SIM</span></strong></p></section>"; break;
        }

        // Exibe a mensagem em um popup
        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto == "final" ? true : false);
    }

});

// Variável para controlar se a tela final deve ser exibida
let telaFinal = false;

// Função para exibir ou esconder um popup com título e mensagem
const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") => {

    if (mostrar) {
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    } else {
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if (telaFinal) {
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}

const botao = document.getElementById("btn-vermelho");

botao.addEventListener("mouseover", function() {
  // Tamanho da janela
  const larguraJanela = window.innerWidth;
  const alturaJanela = window.innerHeight;

  // Tamanho do botão
  const larguraBotao = botao.offsetWidth;
  const alturaBotao = botao.offsetHeight;

  // Calcula posições aleatórias
  const posicaoAleatoriaX = Math.floor(Math.random() * (larguraJanela - larguraBotao));
  const posicaoAleatoriaY = Math.floor(Math.random() * (alturaJanela - alturaBotao));

  // Aplica as posições ao botão
  botao.style.left = posicaoAleatoriaX + "px";
  botao.style.top = posicaoAleatoriaY + "px";
});