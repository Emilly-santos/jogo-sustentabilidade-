// Variáveis do jogo
let currentQuestion = 0;
let score = 0;
let questions = [
    {
        question: "Qual dessas ações é a mais eficaz para reduzir sua pegada de carbono?",
        options: [
            "Desligar luzes quando não estiver usando",
            "Comprar um carro elétrico",
            "Reduzir o consumo de carne vermelha",
            "Plantar uma árvore"
        ],
        correct: 2,
        explanation: "Reduzir o consumo de carne vermelha (especialmente bovina) tem um grande impacto porque a pecuária é responsável por significativas emissões de metano e desmatamento."
    },
    {
        question: "Qual é o benefício principal de usar energia solar?",
        options: [
            "É a forma mais barata de energia",
            "Reduz a dependência de combustíveis fósseis",
            "Funciona em qualquer clima",
            "Não requer manutenção"
        ],
        correct: 1,
        explanation: "A energia solar reduz nossa dependência de combustíveis fósseis, que são recursos finitos e grandes emissores de gases de efeito estufa."
    },
    {
        question: "O que significa a sigla '3R' da sustentabilidade?",
        options: [
            "Reduzir, Reutilizar, Reciclar",
            "Repensar, Reduzir, Recompensar",
            "Reciclar, Reformar, Reutilizar",
            "Reutilizar, Reparar, Reciclar"
        ],
        correct: 0,
        explanation: "Os 3Rs são: Reduzir (consumo), Reutilizar (produtos) e Reciclar (materiais). Essa hierarquia ajuda a minimizar o desperdício."
    },
    {
        question: "Qual destes materiais leva MAIS tempo para se decompor na natureza?",
        options: [
            "Papel",
            "Casca de banana",
            "Vidro",
            "Jornal"
        ],
        correct: 2,
        explanation: "O vidro pode levar até 1 milhão de anos para se decompor! Por isso a reciclagem é tão importante para esse material."
    },
    {
        question: "Qual destes é um exemplo de economia circular?",
        options: [
            "Comprar um produto novo e jogar o velho no lixo",
            "Transformar garrafas plásticas em roupas",
            "Usar sacolas plásticas descartáveis",
            "Queimar resíduos para gerar energia"
        ],
        correct: 1,
        explanation: "A economia circular visa manter produtos e materiais em uso pelo maior tempo possível, como transformar garrafas plásticas em tecido para roupas."
    },
    {
        question: "Qual porcentagem aproximada da água do planeta é própria para consumo humano?",
        options: [
            "10%",
            "25%",
            "50%",
            "Menos de 1%"
        ],
        correct: 3,
        explanation: "Apesar de 71% da Terra ser coberta por água, menos de 1% é água doce disponível para consumo humano. Daí a importância de conservar!"
    },
    {
        question: "O que é compostagem?",
        options: [
            "Processo de reciclagem de plásticos",
            "Decomposição de matéria orgânica para criar adubo",
            "Método de purificação de água",
            "Técnica de economia de energia"
        ],
        correct: 1,
        explanation: "Compostagem é o processo natural de decomposição de restos orgânicos (como cascas de frutas) que se transformam em adubo rico para plantas."
    },
    {
        question: "Qual destes hábitos consome MAIS água?",
        options: [
            "Tomar banho de 15 minutos",
            "Lavar calçada com mangueira",
            "Lavar roupa na máquina (uma carga completa)",
            "Escovar os dentes com torneira aberta"
        ],
        correct: 1,
        explanation: "Lavar calçada com mangueira pode gastar até 300 litros de água em 15 minutos! Melhor usar vassoura ou balde."
    },
    {
        question: "O que é 'obsolescência programada'?",
        options: [
            "Planejamento urbano sustentável",
            "Design de produtos para durarem pouco e precisarem ser substituídos",
            "Programa de reciclagem obrigatória",
            "Método de produção sem desperdícios"
        ],
        correct: 1,
        explanation: "Obsolescência programada é quando produtos são projetados para ter vida útil curta, forçando substituição frequente - uma prática insustentável."
    },
    {
        question: "Qual destes é um benefício da agricultura orgânica?",
        options: [
            "Maior uso de pesticidas químicos",
            "Menor custo de produção",
            "Preservação da qualidade do solo e água",
            "Produtividade mais alta que a convencional"
        ],
        correct: 2,
        explanation: "A agricultura orgânica preserva o solo e a água por evitar agrotóxicos, embora muitas vezes tenha produtividade menor que a convencional."
    }
];

// Elementos do DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score');
const resultElement = document.getElementById('result');
const progressBar = document.getElementById('progress-bar');
const finalScoreElement = document.getElementById('final-score');
const finalMessageElement = document.getElementById('final-message');

// Event listeners
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartGame);

// Funções do jogo
function startGame() {
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = `Pergunta ${currentQuestion + 1}: ${question.question}`;
    
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('btn', 'option-btn');
        button.addEventListener('click', () => selectAnswer(index));
        optionsElement.appendChild(button);
    });
    
    progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
    nextBtn.style.display = 'none';
}

function selectAnswer(selectedIndex) {
    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.option-btn');
    
    // Desabilita todos os botões após seleção
    options.forEach(option => {
        option.disabled = true;
    });
    
    // Marca a resposta correta
    options[question.correct].classList.add('correct');
    
    // Verifica se a resposta está errada
    if (selectedIndex !== question.correct) {
        options[selectedIndex].classList.add('incorrect');
        resultElement.textContent = `Incorreto! ${question.explanation}`;
    } else {
        score += 10;
        scoreElement.textContent = `Pontuação: ${score}`;
        resultElement.textContent = `Correto! ${question.explanation}`;
    }
    
    nextBtn.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    resultElement.textContent = '';
    
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    quizScreen.style.display = 'none';
    endScreen.style.display = 'block';
    
    finalScoreElement.textContent = `Sua pontuação final: ${score}/${questions.length * 10}`;
    
    let message = '';
    if (score >= 80) {
        message = 'Excelente! Você é um verdadeiro eco-cidadão!';
    } else if (score >= 50) {
        message = 'Bom trabalho! Você sabe bastante, mas ainda pode aprender mais.';
    } else {
        message = 'Continue aprendendo sobre sustentabilidade! Cada pequena ação faz diferença.';
    }
    finalMessageElement.textContent = message;
}

function restartGame() {
    currentQuestion = 0;
    score = 0;
    scoreElement.textContent = `Pontuação: ${score}`;
    endScreen.style.display = 'none';
    startScreen.style.display = 'block';
}