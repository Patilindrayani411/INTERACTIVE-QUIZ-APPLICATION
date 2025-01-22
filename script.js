
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: 0,
    },
    {
        question: "What is 5 + 3?",
        options: ["5", "8", "10", "12"],
        answer: 1,
    },
    {
        question: "Which programming language is used for web development?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: 2,
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "let", "Both var and let"],
        answer: 3,
    },
    {
        question: "What does `typeof null` return in JavaScript?",
        options: ["object", "null", "undefined", "string"],
        answer: 0,
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: ["React", "Laravel", "Django", "Ruby on Rails"],
        answer: 0,
    },
    {
        question: "How can you convert a string to a number in JavaScript?",
        options: ["parseInt()", "Number()", "Both parseInt() and Number()", "None of the above"],
        answer: 2,
    },
    {
        question: "Which method is used to add elements to the end of an array?",
        options: [".push()", ".pop()", ".shift()", ".unshift()"],
        answer: 0,
    },
    {
        question: "What will `console.log(2 + '2')` output?",
        options: ["4", "22", "NaN", "undefined"],
        answer: 1,
    },
    {
        question: "What does the `===` operator do in JavaScript?",
        options: ["Compares values only", "Compares values and types", "Assigns a value", "None of the above"],
        answer: 1,
    },
    {
        question: "Which statement is true about `let` and `var` in JavaScript?",
        options: [
            "`let` is block-scoped, `var` is function-scoped",
            "`var` is block-scoped, `let` is function-scoped",
            "Both are block-scoped",
            "Both are function-scoped",
        ],
        answer: 0,
    },
    {
        question: "What is the output of `Boolean('false')` in JavaScript?",
        options: ["false", "true", "undefined", "error"],
        answer: 1,
    },
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const scoreTracker = document.getElementById("score-tracker");
const resultContainer = document.getElementById("result-container");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");

// Initialize Quiz
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => handleAnswer(index));
        optionsContainer.appendChild(button);
    });

    scoreTracker.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    nextButton.classList.add("hidden");
}

function handleAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.answer;

    Array.from(optionsContainer.children).forEach((button, index) => {
        if (index === correctIndex) button.classList.add("correct");
        if (index === selectedIndex && selectedIndex !== correctIndex) button.classList.add("incorrect");
        button.disabled = true;
    });

    if (selectedIndex === correctIndex) {
        score++;
    }

    nextButton.classList.remove("hidden");
}

function loadNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz-container").classList.add("hidden");
    resultContainer.classList.remove("hidden");
    finalScoreElement.textContent = `Your score: ${score} / ${questions.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    loadQuestion();
}

// Event Listeners
nextButton.addEventListener("click", loadNextQuestion);
restartButton.addEventListener("click", restartQuiz);

// Load the first question
loadQuestion();
