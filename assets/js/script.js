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
var highScoresListEl = document.getElementById('highscores-list');
var initialsEl = document.getElementById('initials');


var currentScore = countDown;
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
        question : "What does HTML stand for?",
        choiceA : "HyperText Markup Language",
        choiceB : "Hyper Typing Mark Lang",
        choiceC : "Hype Text Mark Long",
        choiceD : "Hex Type Marking Language",
        correct : "A"
    },
    {
        question : "What does CSS stand for?",
        choiceA : "Corded Style Smart",
        choiceB : "Cascading Style Sheets",
        choiceC : "Compare Style Sheets",
        choiceD : "Concorded Style Sheets",
        correct : "B"
    },
    {
        question : "What does JS stand for?",
        choiceA : "Java Smoothie",
        choiceB : "JavaStand",
        choiceC : "JavaScript",
        choiceD : "JavaSmart",
        correct : "C"
    },
    {  
        question : "What is added to make a function?",
        choiceA : "Semicolon",
        choiceB : "Quotations",
        choiceC : "Brackets",
        choiceD : "Parentheses",
        correct : "D"
    },
    {
        question : "What is needed to look at if needing help with coding a project?",
        choiceA : "A Friend",
        choiceB : "Bing",
        choiceC : "Google",
        choiceD : "Documentation",
        correct : "D"
    },
    {
        question : "End of Quiz"
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
    if (runningQuestion == 5) {
        endGame();
    }
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
        if (runningQuestion == 5) {
            clearInterval(timerDown);
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
} 


function endGame() {
    changeDiv('question', 'results-page');
    finalScore = countDown;
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
   
