const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyper Tool Multi Language"
        ],
        answer: 0
    },
    {
        question: "Which tag is used to link a CSS file in HTML?",
        options: [
            "<css>", "<link>", "<style>", "<script>"
        ],
        answer: 1
    },
    {
        question: "Which property is used to change the text color in CSS?",
        options: [
            "font-color", "text-color", "color", "background-color"
        ],
        answer: 2
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: [
            "Number", "String", "Boolean", "Float"
        ],
        answer: 3
    },
    {
        question: "What does DOM stand for?",
        options: [
            "Document Object Model", "Data Object Model", "Document Oriented Model", "Desktop Object Model"
        ],
        answer: 0
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: [
            "//", "<!-- -->", "/* */", "#"
        ],
        answer: 0
    },
    {
        question: "Which attribute is used to make an input field mandatory in HTML?",
        options: [
            "validate", "required", "mandatory", "must"
        ],
        answer: 1
    },
    {
        question: "Which CSS layout makes elements stack horizontally?",
        options: [
            "block", "inline", "flex", "float"
        ],
        answer: 2
    },
    {
        question: "Which method is used to select an element by ID in JavaScript?",
        options: [
            "getElementById", "querySelectorAll", "getElementsByClassName", "getElementByTagName"
        ],
        answer: 0
    },
    {
        question: "What is the correct way to write an array in JavaScript?",
        options: [
            "var colors = (1:'red', 2:'blue')", "var colors = ['red', 'blue']", "var colors = 'red', 'blue'", "var colors = {1:'red', 2:'blue'}"
        ],
        answer: 1
    }
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(questions);

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result-box');
const quizBox = document.getElementById('quiz-box');

// Login modal logic
const loginModal = document.getElementById('login-modal');
const submitLogin = document.getElementById('submit-login');
const loginError = document.getElementById('login-error');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const appContent = document.getElementById('app-content');
const navUser = document.getElementById('nav-user');
const totalQuestionsEl = document.getElementById('total-questions');
const remainingQuestionsEl = document.getElementById('remaining-questions');
const currentQuestionEl = document.getElementById('current-question');

appContent.style.display = 'none';
loginModal.style.display = 'flex';

let loggedInUser = '';

submitLogin.onclick = () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    if (username && password) {
        loggedInUser = username;
        loginModal.style.display = 'none';
        appContent.style.display = '';
        navUser.textContent = loggedInUser;
        updateSidebar();
        showQuestion();
    } else {
        loginError.textContent = 'Please enter username and password.';
    }
};

function updateSidebar() {
    totalQuestionsEl.textContent = questions.length;
    remainingQuestionsEl.textContent = questions.length - currentQuestion;
    currentQuestionEl.textContent = currentQuestion + 1;
}

function showQuestion() {
    answered = false;
    nextBtn.disabled = true;
    questionEl.textContent = questions[currentQuestion].question;
    optionsEl.innerHTML = '';
    questions[currentQuestion].options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => selectOption(idx, btn);
        optionsEl.appendChild(btn);
    });
    updateSidebar();
}

function selectOption(idx, btn) {
    if (answered) return;
    answered = true;
    showAnswer(idx, btn);
}

function showAnswer(selectedIdx, btn) {
    const correctIdx = questions[currentQuestion].answer;
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach((button, idx) => {
        button.disabled = true;
        if (idx === correctIdx) button.classList.add('correct');
        if (selectedIdx === idx && idx !== correctIdx) button.classList.add('wrong');
    });
    if (selectedIdx === correctIdx) {
        score++;
    }
    nextBtn.disabled = false;
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    quizBox.style.display = 'none';
    resultBox.style.display = 'block';
    resultBox.innerHTML = `<h2>Quiz Completed!</h2><p>Your Score: ${score} / ${questions.length}</p><button onclick=\"location.reload()\">Restart Quiz</button>`;
}

// Start quiz on load
showQuestion();
