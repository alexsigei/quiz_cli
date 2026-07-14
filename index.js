const readline = require("readline");

// Create CLI interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Trivia questions
const questions = [
    {
        question: "1. Which language is used to style web pages?",
        options: ["A. HTML", "B. CSS", "C. Java", "D. Python"],
        answer: "B"
    },
    {
        question: "2. Which company developed JavaScript?",
        options: ["A. Microsoft", "B. Netscape", "C. Google", "D. Apple"],
        answer: "B"
    },
    {
        question: "3. Which method is used to add an item to the end of an array?",
        options: ["A. push()", "B. pop()", "C. shift()", "D. map()"],
        answer: "A"
    },
    {
        question: "4. Which keyword declares a constant variable?",
        options: ["A. let", "B. var", "C. const", "D. static"],
        answer: "C"
    },
    {
        question: "5. Which array method creates a new array based on a condition?",
        options: ["A. reduce()", "B. filter()", "C. push()", "D. splice()"],
        answer: "B"
    }
];

let score = 0;
let currentQuestion = 0;
const timeLimit = 15000;

// Start game
function startGame() {
    console.log("\n==============================");
    console.log("      CLI TRIVIA GAME");
    console.log("==============================");
    console.log("Answer each question by typing A, B, C, or D.");
    console.log("You have 15 seconds for each question.\n");

    askQuestion();
}

// Ask a question
function askQuestion() {

    if (currentQuestion >= questions.length) {
        endGame();
        return;
    }

    const q = questions[currentQuestion];

    console.log(q.question);

    q.options.forEach(option => console.log(option));

    let answered = false;

    // Timer
    const timer = setTimeout(() => {

        if (!answered) {
            answered = true;
            console.log("\nTime's up!");
            console.log(`Correct answer: ${q.answer}\n`);
            currentQuestion++;
            askQuestion();
        }

    }, timeLimit);

    rl.question("\nYour answer: ", (input) => {

        if (answered) return;

        answered = true;
        clearTimeout(timer);

        input = input.trim().toUpperCase();

        if (input === q.answer) {
            console.log("Correct!\n");
            score++;
        } else {
            console.log(`Incorrect. Correct answer is ${q.answer}\n`);
        }

        currentQuestion++;
        askQuestion();

    });

}

// End game
function endGame() {

    console.log("==============================");
    console.log("Quiz Complete!");
    console.log("==============================");

    console.log(`Final Score: ${score}/${questions.length}`);

    // Array iteration method
    const percentage = (score / questions.length) * 100;

    if (percentage >= 80) {
        console.log("Excellent work!");
    } else if (percentage >= 60) {
        console.log("Good job!");
    } else {
        console.log("Keep practicing!");
    }

    // filter() example
    const unanswered = questions.filter((_, index) => index >= currentQuestion);

    console.log(`Questions answered: ${questions.length - unanswered.length}`);

    rl.close();
}

startGame();