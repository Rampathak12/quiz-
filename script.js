document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('submit-btn').addEventListener('click', submitAnswer);

let currentQuestionIndex = 0;
let score = 0;
let timer;
const quizDuration = 30;
const questions = [
    {
        question: 'What does HTML stand for?',
        options: [
            'Hyper Text Markup Language',
            'Home Tool Markup Language',
            'Hyperlinks and Text Markup Language',
            'Hyper Tool Markup Language'
        ],
        answer: 0
    },
    {
        question: 'Which CSS property controls the text size?',
        options: [
            'font-size',
            'text-size',
            'font-style',
            'text-style'
        ],
        answer: 0
    },
    {
        question: 'Which HTML element is used to define the title of a document?',
        options: [
            'head',
            'meta',
            'title',
            'header'
        ],
        answer: 2
    },
    {
        question: 'Which property is used to change the background color in CSS?',
        options: [
            'color',
            'bgcolor',
            'background-color',
            'background'
        ],
        answer: 2
    },
    {
        question: 'Which HTML tag is used to link an external JavaScript file?',
        options: [
            'script',
            'js',
            'link',
            'style'
        ],
        answer: 0
    },
    {
        question: 'How do you create a function in JavaScript?',
        options: [
            'function:myFunction()',
            'function myFunction()',
            'function = myFunction()',
            'create function myFunction()'
        ],
        answer: 1
    },
    {
        question: 'Which CSS property is used to change the text color of an element?',
        options: [
            'font-color',
            'text-color',
            'color',
            'font-style'
        ],
        answer: 2
    },
    {
        question: 'Which event occurs when the user clicks on an HTML element?',
        options: [
            'onchange',
            'onmouseover',
            'onmouseclick',
            'onclick'
        ],
        answer: 3
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        options: [
            'script',
            'js',
            'javascript',
            'code'
        ],
        answer: 0
    },
    {
        question: 'How can you add a comment in JavaScript?',
        options: [
            '!--This is a comment--',
            '//This is a comment',
            '/*This is a comment*/',
            '**This is a comment**'
        ],
        answer: 1
    }
];

function startQuiz() {
    document.getElementById('initial-screen').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    showQuestion();
    startTimer();
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const answerOptionsElement = document.getElementById('answer-options');
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    answerOptionsElement.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="radio" name="answer" value="${index}">
            ${option}
        `;
        answerOptionsElement.appendChild(label);
    });

    updateProgressBar();
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) return;

    const answerIndex = parseInt(selectedOption.value);
    const currentQuestion = questions[currentQuestionIndex];

    if (answerIndex === currentQuestion.answer) {
        score++;
        showFeedback('Correct!', true);
    } else {
        showFeedback('Incorrect!', false);
    }

    updateScore();
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            showQuestion();
            document.getElementById('feedback').classList.add('hidden');
        }, 1000);
    } else {
        endQuiz();
    }
}

function showFeedback(message, isCorrect) {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.classList.remove('hidden');
    feedbackElement.textContent = message;
    feedbackElement.style.color = isCorrect ? '#28a745' : '#dc3545';
}

function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

function startTimer() {
    let timeRemaining = quizDuration;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `Time: ${timeRemaining}`;

    timer = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = `Time: ${timeRemaining}`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function endQuiz() {
    clearInterval(timer);
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <h2>Quiz Over!</h2>
        <p>Your final score is: ${score}</p>
        <button class="btn" onclick="restartQuiz()">Restart Quiz</button>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quiz-container').innerHTML = `
        <div id="progress-bar-container">
            <div id="progress-bar"></div>
        </div>
        <div id="question-container">
            <p id="question"></p>
            <div id="answer-options"></div>
        </div>
        <button id="submit-btn" class="btn">Submit Answer</button>
        <div id="feedback" class="hidden"></div>
        <div id="score">Score: 0</div>
        <div id="timer">Time: 30</div>
    `;
    startQuiz();
}
