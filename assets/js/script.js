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
var finalScoreEl = document.getElementById('final-score');
var highScoresListEl = document.getElementById('highscores-list')


var currentScore = 0;
var finalScore;

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
    //put this on a for loop ... when last question is clicked end quiz
    question.innerHTML = "<p>" + q.question + "</p>"
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
    
}

var countDown = 60;
var timerDown;

function changeDiv(curr, next) {
    document.getElementById(curr).classList.add('hide');
    document.getElementById(next).removeAttribute('class')
};

function startTimer() {
    // Sets timer
    timerDown = setInterval(function() {
      counter.textContent = countDown;
      countDown--;
      if (countDown <= 0) {
        clearInterval(timerDown);
        endGame();
    }

    }, 1000);
  }
  
function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        alert("Correct!");
        
    } else {
        alert("Wrong!");
        countDown = countDown - 5;
    }
    if(runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } 
    if (runningQuestion === questions.length) {
        countDown = 0;
        endGame();
    
}

function endGame() {
    counter.textContent = 0;
    changeDiv('quiz', 'results-page');
    finalScore = currentScore;
    finalScoreEl.textContent = finalScore;
}

function handleSubmit() {
    var initials = initialsEl.value;
    var highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];
    highScoresList.push({ initials: initials, score: finalScore });
    highScoresList = highScoresList.sort((curr, next) => {
        if (curr.score < next.score) {
            return 1
        } else if (curr.score > next.score) {
            return -1
        } else {
            return 0
        }
    });
    localStorage.setItem('highScores', JSON.stringify(highScoresList))
}

function populateHighScores() {
    var highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];
    var list = '';
    highScoresList.forEach(score => {
        list = list + '<p>' + score.initials + '  :  ' + score.score + '</p>';
    });
    highScoresListEl.innerHTML = list;
}



function resetScores() {
    localStorage.clear();
    populateHighScores();
}

populateHighScores();