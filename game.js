
"use strict";

/* =========================================
   FUNÇÕES AUXILIARES
========================================= */

const $ = (id) => document.getElementById(id);

function numero(id) {
    const campo = $(id);

    if (!campo || campo.value.trim() === "") {
        return NaN;
    }

    return Number(campo.value);
}

function formatar(valor, casas = 8) {
    if (!Number.isFinite(valor)) {
        return "Resultado inválido";
    }

    return valor.toLocaleString("pt-BR", {
        maximumFractionDigits: casas
    });
}

function exibir(id, mensagem) {
    const elemento = $(id);

    if (elemento) {
        elemento.textContent = mensagem;
    }
}

function validarNumeros(valores) {
    return valores.every(Number.isFinite);
}
/* =========================================
   FRAÇÕES
========================================= */

function converterFracao() {
    const n = numero("numerador");
    const d = numero("denominador");

    if (!validarNumeros([n, d]) || d === 0) {
        exibir("resultadoFracao", "Informe números válidos. O denominador não pode ser zero.");
        $("barraFracao").style.width = "0%";
        return;
    }

    const resultado = n / d;
    const porcentagem = Math.max(0, Math.min(100, resultado * 100));

    exibir(
        "resultadoFracao",
        `${n}/${d} = ${formatar(resultado)}`
    );

    $("barraFracao").style.width = `${porcentagem}%`;
}

/* =========================================
   DECIMAL PARA PORCENTAGEM
========================================= */

function converterPorcentagem() {
    const valor = numero("decimal");

    if (!Number.isFinite(valor)) {
        exibir("resultadoPorcentagem", "Digite um número válido.");
        return;
    }

    exibir(
        "resultadoPorcentagem",
        `${formatar(valor)} corresponde a ${formatar(valor * 100, 4)}%.`
    );
}

/* =========================================
   OPERAÇÕES FUNDAMENTAIS
========================================= */

function calcularOperacao() {
    const a = numero("num1");
    const b = numero("num2");
    const operacao = $("operacao").value;

    if (!validarNumeros([a, b])) {
        exibir("resultadoCalculo", "Digite dois números válidos.");
        return;
    }

    let resultado;

    switch (operacao) {
        case "+":
            resultado = a + b;
            break;

        case "-":
            resultado = a - b;
            break;

        case "*":
            resultado = a * b;
            break;

        case "/":
            if (b === 0) {
                exibir("resultadoCalculo", "Não é possível dividir por zero.");
                return;
            }

            resultado = a / b;
            break;

        default:
            exibir("resultadoCalculo", "Operação inválida.");
            return;
    }

    exibir("resultadoCalculo", `Resultado: ${formatar(resultado)}`);
}

/* =========================================
   POTENCIAÇÃO
========================================= */

function calcularPotencia() {
    const base = numero("base");
    const expoente = numero("expoente");

    if (!validarNumeros([base, expoente]) ||
        !Number.isInteger(expoente)) {
        exibir("resultadoPotencia", "Informe uma base válida e um expoente inteiro.");
        return;
    }

    if (base === 0 && expoente < 0) {
        exibir("resultadoPotencia", "Zero não pode ter expoente negativo.");
        return;
    }

    const resultado = Math.pow(base, expoente);

    if (!Number.isFinite(resultado)) {
        exibir("resultadoPotencia", "O resultado está fora do intervalo numérico disponível.");
        return;
    }

    exibir(
        "resultadoPotencia",
        `${base} elevado a ${expoente} = ${formatar(resultado)}`
    );
}

/* =========================================
   RADICIAÇÃO
========================================= */

function calcularRaiz() {
    const valor = numero("raiz");

    if (!Number.isFinite(valor) || valor < 0) {
        exibir("resultadoRaiz", "Digite um número real não negativo.");
        return;
    }

    const resultado = Math.sqrt(valor);

    exibir(
        "resultadoRaiz",
        `√${formatar(valor)} = ${formatar(resultado)}`
    );
}

/* =========================================
   ARREDONDAMENTO
========================================= */

function arredondarNumero() {
    const valor = numero("numeroArredondar");
    const casas = numero("casas");

    if (!Number.isFinite(valor)) {
        exibir("resultadoArredondamento", "Digite um número válido.");
        return;
    }

    const fator = Math.pow(10, casas);
    const resultado = Math.round((valor + Number.EPSILON) * fator) / fator;

    exibir(
        "resultadoArredondamento",
        `O número ${formatar(valor)} arredondado para ${casas} casa(s) decimal(is) é ${formatar(resultado, casas)}.`
    );
}

/* =========================================
   AJUSTE DE RECEITAS
========================================= */

function calcularReceita() {
    const ingrediente = numero("ingrediente");
    const original = numero("pessoasOriginais");
    const novo = numero("pessoasNovas");

    if (!validarNumeros([ingrediente, original, novo]) ||
        original <= 0 || novo <= 0 || ingrediente < 0) {
        exibir("resultadoReceita", "Confira os valores. As quantidades de pessoas devem ser maiores que zero.");
        return;
    }

    const resultado = ingrediente * novo / original;

    exibir(
        "resultadoReceita",
        `Para ${novo} pessoas, serão necessárias ${formatar(resultado)} unidades do ingrediente.`
    );
}

/* =========================================
   COMPARAÇÃO DE PREÇOS
========================================= */

function compararPrecos() {
    const precoA = numero("precoA");
    const quantidadeA = numero("quantidadeA");
    const precoB = numero("precoB");
    const quantidadeB = numero("quantidadeB");

    if (!validarNumeros([precoA, quantidadeA, precoB, quantidadeB]) ||
        precoA < 0 || precoB < 0 ||
        quantidadeA <= 0 || quantidadeB <= 0) {
        exibir("resultadoPrecos", "Informe preços não negativos e quantidades maiores que zero.");
        return;
    }

    const custoA = precoA / quantidadeA;
    const custoB = precoB / quantidadeB;

    let mensagem;

    if (custoA < custoB) {
        mensagem = "O produto A tem o menor preço por unidade.";
    } else if (custoB < custoA) {
        mensagem = "O produto B tem o menor preço por unidade.";
    } else {
        mensagem = "Os dois produtos têm o mesmo preço por unidade.";
    }

    exibir(
        "resultadoPrecos",
        `Produto A: R$ ${custoA.toFixed(4)} por unidade.\n` +
        `Produto B: R$ ${custoB.toFixed(4)} por unidade.\n` +
        mensagem
    );
}

/* =========================================
   ATIVIDADES COM CORREÇÃO AUTOMÁTICA
========================================= */

const atividades = [
    {
        tema: "Ordem das operações",
        pergunta: "Qual é o resultado de 15 + 8 × 2?",
        alternativas: ["46", "31", "23", "38"],
        correta: 1,
        explicacao: "Primeiro fazemos a multiplicação: 8 × 2 = 16. Depois, 15 + 16 = 31."
    },
    {
        tema: "Frações",
        pergunta: "Qual fração representa o número decimal 0,5?",
        alternativas: ["1/4", "1/2", "1/5", "2/5"],
        correta: 1,
        explicacao: "0,5 representa metade de uma unidade. Em fração, metade é 1/2."
    },
    {
        tema: "Radiciação",
        pergunta: "Qual é a raiz quadrada de 144?",
        alternativas: ["10", "14", "12", "16"],
        correta: 2,
        explicacao: "A raiz quadrada de 144 é 12, pois 12 × 12 = 144."
    },
    {
        tema: "Potenciação",
        pergunta: "Quanto é 3² + 4?",
        alternativas: ["13", "49", "10", "14"],
        correta: 0,
        explicacao: "Primeiro calculamos a potência: 3² = 9. Depois, 9 + 4 = 13."
    },
    {
        tema: "Porcentagem",
        pergunta: "Um produto custa R$ 20 e recebe 50% de desconto. Qual é o preço final?",
        alternativas: ["R$ 15", "R$ 10", "R$ 5", "R$ 20"],
        correta: 1,
        explicacao: "50% de R$ 20 é R$ 10. Subtraindo o desconto, o preço final é R$ 10."
    },
    {
        tema: "Conjuntos numéricos",
        pergunta: "Qual dos números abaixo é irracional?",
        alternativas: ["0,25", "−4", "√2", "3/5"],
        correta: 2,
        explicacao: "√2 é irracional: sua representação decimal é infinita e não periódica."
    }
];

function criarAtividades() {
    const lista = $("listaAtividades");

    atividades.forEach((atividade, indice) => {
        const card = document.createElement("article");
        card.className = "exercise-card";

        const titulo = document.createElement("span");
        titulo.className = "exercise-label";
        titulo.textContent = `ATIVIDADE ${String(indice + 1).padStart(2, "0")} • ${atividade.tema}`;

        const pergunta = document.createElement("h3");
        pergunta.textContent = atividade.pergunta;

        const texto = document.createElement("p");
        texto.textContent = "Selecione uma alternativa:";

        const opcoes = document.createElement("div");

        const feedback = document.createElement("div");
        feedback.className = "exercise-feedback";
        feedback.hidden = true;
        feedback.setAttribute("aria-live", "polite");

        atividade.alternativas.forEach((alternativa, posicao) => {
            const botao = document.createElement("button");
            botao.className = "answer-option";
            botao.type = "button";
            botao.textContent = `${String.fromCharCode(65 + posicao)}) ${alternativa}`;

            botao.addEventListener("click", () => {
                if (card.dataset.respondida === "true") return;

                card.dataset.respondida = "true";

                const acertou = posicao === atividade.correta;

                Array.from(opcoes.children).forEach((opcao, i) => {
                    opcao.disabled = true;

                    if (i === atividade.correta) {
                        opcao.classList.add("correct");
                    } else if (i === posicao && !acertou) {
                        opcao.classList.add("wrong");
                    }
                });

                feedback.hidden = false;
                feedback.textContent =
                    (acertou ? "Resposta correta! " : "Resposta incorreta. ") +
                    atividade.explicacao;
            });

            opcoes.appendChild(botao);
        });

        card.append(titulo, pergunta, texto, opcoes, feedback);
        lista.appendChild(card);
    });
}

/* =========================================
   QUIZ INTERATIVO
========================================= */

const perguntasQuiz = [
    {
        pergunta: "Qual é o resultado de 6 × 7?",
        opcoes: ["36", "42", "48", "56"],
        correta: 1,
        explicacao: "6 × 7 = 42. A multiplicação representa grupos de quantidades iguais."
    },
    {
        pergunta: "Qual número é irracional?",
        opcoes: ["0,5", "4", "π", "3/4"],
        correta: 2,
        explicacao: "π é irracional porque possui representação decimal infinita e não periódica."
    },
    {
        pergunta: "Quanto é 100 ÷ 4?",
        opcoes: ["20", "25", "40", "50"],
        correta: 1,
        explicacao: "100 dividido por 4 é igual a 25."
    },
    {
        pergunta: "Quanto é 5²?",
        opcoes: ["10", "15", "20", "25"],
        correta: 3,
        explicacao: "5² significa 5 × 5, que resulta em 25."
    },
    {
        pergunta: "Qual é a representação percentual de 0,25?",
        opcoes: ["2,5%", "25%", "250%", "0,25%"],
        correta: 1,
        explicacao: "Para transformar decimal em porcentagem, multiplicamos por 100: 0,25 × 100 = 25%."
    }
];

let indiceQuiz = 0;
let respostasQuiz = Array(perguntasQuiz.length).fill(null);
let quizFinalizado = false;

function atualizarProgresso() {
    const respondidas = respostasQuiz.filter(r => r !== null).length;
    const percentual = Math.round((respondidas / perguntasQuiz.length) * 100);

    $("progressoTexto").textContent =
        `Questão ${indiceQuiz + 1} de ${perguntasQuiz.length}`;

    $("progressoPercentual").textContent = `${percentual}%`;
    $("barraProgresso").style.width = `${percentual}%`;
}

function mostrarPergunta() {
    const pergunta = perguntasQuiz[indiceQuiz];
    const area = $("quizArea");

    area.replaceChildren();

    const numeroQuestao = document.createElement("span");
    numeroQuestao.className = "quiz-question-number";
    numeroQuestao.textContent =
        `QUESTÃO ${String(indiceQuiz + 1).padStart(2, "0")}`;

    const titulo = document.createElement("h3");
    titulo.textContent = pergunta.pergunta;

    area.append(numeroQuestao, titulo);

    const letras = ["A", "B", "C", "D"];

    pergunta.opcoes.forEach((opcao, posicao) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "quiz-option";

        if (respostasQuiz[indiceQuiz] === posicao) {
            botao.classList.add("selected");
        }

        const letra = document.createElement("span");
        letra.className = "option-letter";
        letra.textContent = letras[posicao];

        const texto = document.createElement("span");
        texto.textContent = opcao;

        botao.append(letra, texto);

        botao.addEventListener("click", () => {
            if (quizFinalizado) return;

            respostasQuiz[indiceQuiz] = posicao;
            mostrarPergunta();
        });

        area.appendChild(botao);
    });

    if (respostasQuiz[indiceQuiz] !== null) {
        const feedback = document.createElement("div");
        feedback.className = "quiz-feedback";

        const acertou =
            respostasQuiz[indiceQuiz] === pergunta.correta;

        feedback.classList.add(
            acertou ? "correct-feedback" : "wrong-feedback"
        );

        feedback.textContent =
            (acertou ? "Resposta correta! " : "Resposta incorreta. ") +
            pergunta.explicacao;

        area.appendChild(feedback);
    }

    $("btnAnterior").disabled = indiceQuiz === 0;
    $("btnProximo").textContent =
        indiceQuiz === perguntasQuiz.length - 1
            ? "Finalizar quiz"
            : "Próxima questão";

    atualizarProgresso();
}

function proximaPergunta() {
    if (respostasQuiz[indiceQuiz] === null) {
        alert("Escolha uma alternativa antes de continuar.");
        return;
    }

    if (indiceQuiz < perguntasQuiz.length - 1) {
        indiceQuiz++;
        mostrarPergunta();
    } else {
        finalizarQuiz();
    }
}

function perguntaAnterior() {
    if (indiceQuiz > 0) {
        indiceQuiz--;
        mostrarPergunta();
    }
}

function finalizarQuiz() {
    const pontos = respostasQuiz.reduce((total, resposta, indice) => {
        return total + (resposta === perguntasQuiz[indice].correta ? 1 : 0);
    }, 0);

    quizFinalizado = true;

    let mensagem;

    if (pontos === 5) {
        mensagem = "Excelente! Você dominou os conceitos deste desafio.";
    } else if (pontos >= 3) {
        mensagem = "Muito bem! Você já compreende boa parte do conteúdo.";
    } else {
        mensagem = "Continue praticando. Revisar os exemplos pode ajudar!";
    }

    $("quizArea").hidden = true;
    $("quizResultado").hidden = false;

    const resultado = $("quizResultado");
    resultado.replaceChildren();

    const titulo = document.createElement("h3");
    titulo.textContent = `${pontos} de ${perguntasQuiz.length} acertos`;

    const texto = document.createElement("p");
    texto.textContent = mensagem;

    resultado.append(titulo, texto);

    $("btnAnterior").hidden = true;
    $("btnProximo").hidden = true;
    $("btnReiniciar").hidden = false;

    $("progressoTexto").textContent = "Desafio concluído";
    $("progressoPercentual").textContent = "100%";
    $("barraProgresso").style.width = "100%";
}

function reiniciarQuiz() {
    indiceQuiz = 0;
    respostasQuiz = Array(perguntasQuiz.length).fill(null);
    quizFinalizado = false;

    $("quizArea").hidden = false;
    $("quizResultado").hidden = true;

    $("btnAnterior").hidden = false;
    $("btnProximo").hidden = false;
    $("btnReiniciar").hidden = true;

    mostrarPergunta();
}

/* =========================================
   CONEXÃO DOS BOTÕES
========================================= */

function conectarBotao(id, funcao) {
    const botao = $(id);

    if (botao) {
        botao.addEventListener("click", funcao);
    }
}

function iniciarProjeto() {
    conectarBotao("btnFracao", converterFracao);
    conectarBotao("btnPorcentagem", converterPorcentagem);
    conectarBotao("btnCalcular", calcularOperacao);
    conectarBotao("btnPotencia", calcularPotencia);
    conectarBotao("btnRaiz", calcularRaiz);
    conectarBotao("btnArredondar", arredondarNumero);
    conectarBotao("btnReceita", calcularReceita);
    conectarBotao("btnPrecos", compararPrecos);

    conectarBotao("btnAnterior", perguntaAnterior);
    conectarBotao("btnProximo", proximaPergunta);
    conectarBotao("btnReiniciar", reiniciarQuiz);

    criarAtividades();
    mostrarPergunta();

    converterFracao();
    converterPorcentagem();
    calcularOperacao();
}

document.addEventListener("DOMContentLoaded", iniciarProjeto);
