var pontuacao = 0;
var pontuacao1 = 0;
var historicoPontuacao = [];
var historicoPontuacao1 = [];

var dataHoraUltimaAtualizacao;

// Função para verificar se os dados expiraram
function verificarExpiracao() {
    if (dataHoraUltimaAtualizacao) {
        var dataHoraAtual = new Date().getTime();
        var diferencaHoras = (dataHoraAtual - dataHoraUltimaAtualizacao)  / (1000 * 60 * 60); // Diferença em horas
        if (diferencaHoras >= 24) {
            // Limpar os dados do Local Storage
            localStorage.removeItem('pontuacao');
            localStorage.removeItem('pontuacao1');
            localStorage.removeItem('historicoPontuacao');
            localStorage.removeItem('historicoPontuacao1');
            localStorage.removeItem('dataHoraUltimaAtualizacao');
        }
    }
}

// Restaurar valores do Local Storage se existirem
if (localStorage.getItem('pontuacao')) {
    pontuacao = parseInt(localStorage.getItem('pontuacao'));
    pontuacao1 = parseInt(localStorage.getItem('pontuacao1'));
    historicoPontuacao = JSON.parse(localStorage.getItem('historicoPontuacao')) || [];
    historicoPontuacao1 = JSON.parse(localStorage.getItem('historicoPontuacao1')) || [];
    dataHoraUltimaAtualizacao = parseInt(localStorage.getItem('dataHoraUltimaAtualizacao'));
    verificarExpiracao();
    atualizarPontuacao();
    
    // Restaurar histórico na tabela
    var tabelaPontuacoes = document.getElementById("tabelaPontuacoes");
    for (var i = 0; i < historicoPontuacao.length; i++) {
        var novaLinha = document.createElement("tr");
        var celulaTimeA = novaLinha.insertCell(0);
        var celulaTimeB = novaLinha.insertCell(1);
        celulaTimeA.textContent = historicoPontuacao[i];
        celulaTimeB.textContent = historicoPontuacao1[i];
        tabelaPontuacoes.appendChild(novaLinha);
    }
}

function adicionarPontuacao() {
    var novaPontuacao = parseInt(document.getElementById("novaPontuacao").value) || 0;
    var novaPontuacao1 = parseInt(document.getElementById("novaPontuacao1").value) || 0;

    historicoPontuacao.push(novaPontuacao);
    historicoPontuacao1.push(novaPontuacao1);

    var tabelaPontuacoes = document.getElementById("tabelaPontuacoes");
    var novaLinha = document.createElement("tr");
    var celulaTimeA = novaLinha.insertCell(0);
    var celulaTimeB = novaLinha.insertCell(1);
    celulaTimeA.textContent = novaPontuacao;
    celulaTimeB.textContent = novaPontuacao1;
    tabelaPontuacoes.appendChild(novaLinha);

    pontuacao += novaPontuacao;
    pontuacao1 += novaPontuacao1;

    atualizarPontuacao();

ganhador();

    // Salva os valores no localStorage
    localStorage.setItem('pontuacao', pontuacao);
    localStorage.setItem('pontuacao1', pontuacao1);
    localStorage.setItem('historicoPontuacao', JSON.stringify(historicoPontuacao));
    localStorage.setItem('historicoPontuacao1', JSON.stringify(historicoPontuacao1));

    // Limpa os campos de input
    document.getElementById("novaPontuacao").value = "";
    document.getElementById("novaPontuacao1").value = "";
}
function ganhador() {
if(pontuacao >= 41){
console.log("Ganhador time A");
}
if(pontuacao1 >= 41){
console.log("Ganhador time B");
}
}

function desfazerPontuacao() {
if (historicoPontuacao.length > 0) {
var pontuacaoDesfeita = historicoPontuacao.pop();
var pontuacao1Desfeita = historicoPontuacao1.pop();

pontuacao -= pontuacaoDesfeita;
pontuacao1 -= pontuacao1Desfeita;

atualizarPontuacao();

// Remove a última linha da tabela
var tabelaPontuacoes = document.getElementById("tabelaPontuacoes");
tabelaPontuacoes.deleteRow(tabelaPontuacoes.rows.length - 1);

// Atualiza o localStorage após desfazer
localStorage.setItem('pontuacao', pontuacao);
localStorage.setItem('pontuacao1', pontuacao1);
localStorage.setItem('historicoPontuacao', JSON.stringify(historicoPontuacao));
localStorage.setItem('historicoPontuacao1', JSON.stringify(historicoPontuacao1));
}
}


function reiniciarJogo() {
    pontuacao = 0;
    pontuacao1 = 0;
    historicoPontuacao = [];
    historicoPontuacao1 = [];
    atualizarPontuacao();

    // Limpa o localStorage ao reiniciar o jogo
    localStorage.removeItem('pontuacao');
    localStorage.removeItem('pontuacao1');
    localStorage.removeItem('historicoPontuacao');
    localStorage.removeItem('historicoPontuacao1');

    // Limpa os campos de input
    document.getElementById("novaPontuacao").value = "";
    document.getElementById("novaPontuacao1").value = "";
    document.getElementById("tabelaPontuacoes").innerHTML = "";
}

function atualizarPontuacao() {
    document.getElementById("pontuacao").textContent = pontuacao;
    document.getElementById("pontuacao1").textContent = pontuacao1;
}
function ganhador() {
    if (pontuacao >= 41) {
        alert("Time A ganhou!");
        reiniciarJogo();
    }
    if (pontuacao1 >= 41) {
        alert("Time B ganhou!");
        reiniciarJogo();
    }
}