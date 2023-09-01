const questions = localStorage.getItem("quizData")
  ? JSON.parse(localStorage.getItem("quizData"))
  : [];

console.log("Questions length:", questions.length);

const topic = localStorage.getItem("topic") || "General CS Knowledge";
document.getElementById("quiz-title").innerHTML = `Quiz on ${topic}`;

let attemptedText = document.getElementById("attempted");
let unattemptedText = document.getElementById("unattempted");
let leftText = document.getElementById("left");

let currentQuestionIndex = 0;
let correctAnswers = 0;
let notAnswered = 0;
let timer = 20;
let answered = false; // Flag to track if the question has been answered

function startTimer() {
  const timerElement = document.getElementById("timer");
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = "100%"; // Reset progress bar width
  timer = 20;

  const timerInterval = setInterval(() => {
    timer--;
    timerElement.textContent = timer;
    const progress = (timer / 20) * 100; // Calculate progress percentage
    progressBar.style.width = progress + "%"; // Update progress bar width

    // Change progress bar color to red when timer is less than 8 seconds
    if (timer <= 8) {
      progressBar.style.backgroundColor = "#e74c3c"; // Red color
    }

    if (timer === 0) {
      clearInterval(timerInterval);
      if (!answered) {
        notAnswered++;
        currentQuestionIndex++;
        showNextQuestion();
      }
    }
  }, 1000);
}

function showNextQuestion() {
  document.getElementById("progressBar").style.backgroundColor = "#27ae60";

  attemptedText.textContent = `Attempted Questions: ${
    currentQuestionIndex + 1
  }`;
  unattemptedText.textContent = `Questions Not Answered: ${notAnswered}`;
  leftText.textContent = `Questions left to Attempt: ${
    questions.length - currentQuestionIndex - 1
  }`;
  timer = 20;
  answered = false; // Reset answered flag
  if (currentQuestionIndex < questions.length) {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const nextButton = document.getElementById("nextButton");

    questionElement.textContent = questions[currentQuestionIndex].question;
    choicesElement.innerHTML = "";

    for (const answerKey in questions[currentQuestionIndex].answers) {
      if (questions[currentQuestionIndex].answers[answerKey]) {
        const answerText = questions[currentQuestionIndex].answers[answerKey];
        const choiceButton = document.createElement("button");
        choiceButton.textContent = `${answerKey.toUpperCase()}. ${answerText}`;
        choiceButton.classList.add("choice-button");
        choiceButton.addEventListener("click", () => checkAnswer(answerKey));
        choicesElement.appendChild(choiceButton);
      }
    }

    nextButton.style.display = "none";
    startTimer();
  } else {
    showResult();
  }
}

function checkAnswer(selectedAnswer) {
  if (!answered) {
    const correctAnswerKey = questions[currentQuestionIndex].correct_answer;
    if (selectedAnswer === correctAnswerKey) {
      correctAnswers++;
    }

    currentQuestionIndex++;
    answered = true;
    showNextQuestion();
  }
}

function showResult() {
  const container = document.querySelector(".container");
  const percentageCorrect = (correctAnswers / questions.length) * 100;
  container.innerHTML = `
  <h1>Quiz Completed</h1>
  <p>Your Score: ${correctAnswers}/${
    questions.length
  } (${percentageCorrect.toFixed(2)}%)</p>

  <div class="flex">
        <button
          class="btn-page login-spl btn-bold mt-2rem p-2rem f-2rem w-70-tst"
          id="test-end"
          onclick="window.location.href = '/examinationWindow.html'"
        >
          Exit Test!
        </button>
      </div>
`;
}

showNextQuestion();
