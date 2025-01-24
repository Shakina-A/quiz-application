"use strict";

// Data structure for the quiz questions
const questions = [
  {
    question: "What is the output of 2 + '2' in JavaScript?",
    options: ["22", "4", "undefined", "NaN"],
    correct: "22"
  },
  {
    question: "Which of the following is a JavaScript data type?",
    options: ["String", "Integer", "Float", "Double"],
    correct: "String"
  },
  {
    question: "What does 'this' refer to in JavaScript?",
    options: ["The current function", "The current object", "The global object", "None of the above"],
    correct: "The current object"
  },
  {
    question: "How do you declare a variable in JavaScript?",
    options: ["var variableName", "let variableName", "const variableName", "All of the above"],
    correct: "All of the above"
  },
  {
    question: "Which of the following is a JavaScript loop?",
    options: ["for", "while", "do-while", "All of the above"],
    correct: "All of the above"
  }
];

let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = questions.length;

// DOM elements
const questionElem = document.getElementById("question");
const optionsElem = document.getElementById("options");
const progressBar = document.getElementById("progress-bar");
const currentQuestionElem = document.getElementById("current-question");
const totalQuestionsElem = document.getElementById("total-questions");
const quizEndElem = document.getElementById("quiz-end");
const scoreElem = document.getElementById("score");
const feedbackElem = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

// Initialize the quiz
function loadQuestion() {
  const question = questions[currentQuestionIndex];
  questionElem.textContent = question.question;
  optionsElem.innerHTML = ""; // Clear previous options
  question.options.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => selectAnswer(option, li); // Pass the list item to highlight
    li.style.cursor = "pointer";
    optionsElem.appendChild(li);
  });
  currentQuestionElem.textContent = currentQuestionIndex + 1;
  progressBar.value = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Enable/disable buttons
  nextBtn.disabled = true; // Disable "Next" initially
  prevBtn.disabled = currentQuestionIndex === 0; // Disable "Previous" if it's the first question
}

function selectAnswer(selectedOption, listItem) {
  const correctAnswer = questions[currentQuestionIndex].correct;

  // Reset background colors of all options
  optionsElem.querySelectorAll("li").forEach((li) => {
    li.style.backgroundColor = "";
  });

  if (selectedOption === correctAnswer) {
    score++; // Update score when answer is correct
    listItem.style.backgroundColor = "lightgreen"; // Highlight selected option in green
  } else {
    listItem.style.backgroundColor = "lightcoral"; // Highlight selected option in red
    // Highlight correct answer in green
    optionsElem.querySelectorAll("li").forEach((li) => {
      if (li.textContent === correctAnswer) {
        li.style.backgroundColor = "lightgreen";
      }
    });
  }

  // Disable further clicking
  optionsElem.querySelectorAll("li").forEach((li) => {
    li.onclick = null;
  });

  // Update the score on the page
  scoreElem.textContent = `Score: ${score}`;

  // Enable "Next" button after answer selection
  nextBtn.disabled = false;
}

function nextQuestion() {
  if (currentQuestionIndex < totalQuestions - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
  if (currentQuestionIndex === totalQuestions - 1) {
    nextBtn.textContent = "Finish"; // Change to "Finish" on the last question
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
  nextBtn.textContent = "Next"; // Ensure "Next" button text is reset
}

function endQuiz() {
  quizEndElem.style.display = "block";
  document.querySelector(".quiz-container").style.display = "none";
  scoreElem.textContent = `Your Score: ${score} / ${totalQuestions}`;
  const percentage = (score / totalQuestions) * 100;
  feedbackElem.textContent =
    percentage >= 80
      ? "Excellent!"
      : percentage >= 50
      ? "Good job!"
      : "Keep Practicing!";
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizEndElem.style.display = "none";
  document.querySelector(".quiz-container").style.display = "block";
  nextBtn.textContent = "Next";
  loadQuestion();
  scoreElem.textContent = `Score: ${score}`; // Reset score
}

// Event listeners
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex === totalQuestions - 1) {
    endQuiz(); // End the quiz when "Finish" is clicked
  } else {
    nextQuestion();
  }
});

prevBtn.addEventListener("click", prevQuestion);

// Initialize the quiz
totalQuestionsElem.textContent = totalQuestions;
loadQuestion();
