var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var timer = document.getElementById("timer");
var counter = document.getElementById("counter");
var score = document.getElementById("score");
var highscore = document.getElementById("highscore");
var answer = document.getElementById("answer");



start.addEventListener("click", startQuiz);

function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    startTimer();
}


var questions = [
    {
        question : "What does X equal?",
        choiceA : "Correct",
        choiceB : "Wrong",
        choiceC : "Wrong",
        choiceD : "Wrong",
        correct : "A"
    },
    {
        question : "What does X equal?",
        choiceA : "Wrong",
        choiceB : "Correct",
        choiceC : "Wrong",
        choiceD : "Wrong",
        correct : "B"
    },
    {
        question : "What does X equal?",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        choiceD : "Wrong",
        correct : "C"
    },
    {  
        question : "What does X equal?",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Wrong",
        choiceD : "Correct",
        correct : "D"
    },
    {
        question : "What does X equal?",
        choiceA : "Correct",
        choiceB : "Wrong",
        choiceC : "Wrong",
        choiceD : "Correct",
        correct : "D"
    }
];

var lastQuestion = questions.length - 1;
var runningQuestion = 0;


function renderQuestion() {
    var q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>"
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}




var countDown = 60;
var timerDown;

function startTimer() {
    // Sets timer
    timerDown = setInterval(function() {
      counter.textContent = countDown;
      countDown--;
    }, 1000);
  }
  
function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        answerIsCorrect();
    } else {
        answerIsWrong();
        countDown = countDown - 5;
    }
    if(runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    }
}

function answerIsCorrect() {
    answer = "Correct!"
}

function answerIsWrong() {
    answer = "Wrong!"
}