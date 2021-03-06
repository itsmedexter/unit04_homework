var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var questionsElem = document.getElementById("questions");
var timerT = document.getElementById("time");
var theChoices = document.getElementById("choices");
var submitButton = document.getElementById("submit");
var startButton = document.getElementById("start");
var yourInitials = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");



function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class","hide");
  questionsElem.removeAttribute("class");
  timerId = setInterval(clockTick, 1000);
  timerT.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  theChoices.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value",choice);
    choiceNode.textContent = i + 1 + ". " + choice;
    choiceNode.onclick = questionClick;
    theChoices.appendChild(choiceNode);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }

    timerT.textContent = time;
    feedbackEl.textContent = "EEEE thats WRONG!";
  } else {
    feedbackEl.textContent = "That's RIGHT!";
  }

  feedbackEl.setAttribute("class","feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class","hide");
}

function clockTick() {
  time--;
  timerT.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  var initials = yourInitials.value.trim();
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.reload();
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}


function printHighscores() {
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function(score) {
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + ":  " + score.score;
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}
document.getElementById("clear").onclick = clearHighscores;

printHighscores();


submitButton.onclick = saveHighscore;
startButton.onclick = startQuiz;
yourInitials.onkeyup = checkForEnter;






// 1. When on landing page, name and information of quiz appears with a button to start, view highscores, and timer set at 0. Create question variable array with nested arrays of title, choices, answer. Total of five questions with arrays. Create an onclick add eventListener with start button that begins quiz, starts timer in a function of startGame.

// 2. When start button is depressed, name and information of quiz dissapears. Question with answers appear in button form ready for user to pick while the timer starts. Answering quickly with corect answer results in high score. Incorrect answer results in 15 second deducted from time remaing. Create a depressed startButton click event with a  function of showQuestions that hides the start button and quiz information, question and answers appear. Then timer starts counting down from 60 seconds.

// 3. User reads question, then picks answer, resulting in picking an answer. Correct answer results in flashing "Correct!" underneat answers and then moving on to new question. Create a "For" loop with "If/else" statements that picks questions, choices, answer from an array. With Users choice, under neath answer a div with content of text "Correct!" or "Wrong!" appear in what ever choice user picks. If "Correct!", user moves on completing the "If/else" statement and timer continuing. If "Wrong!", 15 second deduction In "else" statement from timer. Then loop stops and goes to new question.

// 4. Then you reach page that tallys your score and you are able to enter your intials that are placed in "localStorage" and saves information untill browser is closed and information is purged from memory.





/* copied javascript
no jquery


var startButton = document.getElementById("start-btn");
var questionContainerElement = document.getElementById("question-container");
var quesionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);

function startGame() {
    console.log("Started");
    startButton.classList.add("hide");
    questionContainerElement.classList.remove("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion()
}



function setNextQuestion() {
resetState()
 showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild){
    answerButtonsElement.removeChild;(answerButtonsElement.firstChild);
    }
}

function selectAnswer() {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    }
    else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

var questions = [
    {
      question: "Commonly used data types DO NOT include:",
      answers: [{text: "strings", correct: false},
                {text: "booleans", correct: false},
                {text: "alerts", correct: true},
                {text: "numbers", correct: false}],
      answers: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answers: "parentheses"
    }
];








/*
















var windowTimeout = setTimeout(function() {
    document.textContent(<h1>Coding Quiz Challenge</h1><br>
    <p>text goes here</p>);
   }, 1000);

   //  Start on click.
   $("#start").on("click", function() {
     //  Set the button alert's timeout to run three seconds after the function's called.
     delayButtonAlert = setTimeout(function() {
       alert("Alert #2: Called 3 seconds after the start button is clicked.");
     }, 3000);
   });

     //  Clear the timeout, and stop the window alert.
     clearTimeout(windowTimeout);
   });











var playButton = document.querySelector("#play");
var secondsDisplay = document.querySelector("#seconds");


function startTimer() {
    setTime();
  
    interval = setInterval(function() {
      secondsElapsed++;
      renderTime();
    }, 1000);
  }

  function getFormattedSeconds() {
    var secondsLeft = (totalSeconds - secondsElapsed) % 60;
  
    var formattedSeconds;
  
    if (secondsLeft < 10) {
      formattedSeconds = "0" + secondsLeft;
    } else {
      formattedSeconds = secondsLeft;
    }
  
    return formattedSeconds;
  }





  playButton.addEventListener("click", startTimer);








//  Set our number counter to 100.
    var number = 100;

    //  Variable that will hold our interval ID when we execute
    //  the "run" function
    var intervalId;

    //  When the stop button gets clicked, run the stop function.
    $("#stop").on("click", stop);

    //  When the resume button gets clicked, execute the run function.
    $("#resume").on("click", run);

    //  The run function sets an interval
    //  that runs the decrement function once a second.
    //  *****BUG FIX******** 
    //  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
    function run() {
      clearInterval(intervalId);
      intervalId = setInterval(decrement, 1000);
    }

    //  The decrement function.
    function decrement() {

      //  Decrease number by one.
      number--;

      //  Show the number in the #show-number tag.
      $("#show-number").html("<h2>" + number + "</h2>");


      //  Once number hits zero...
      if (number === 0) {

        //  ...run the stop function.
        stop();

        //  Alert the user that time is up.
        alert("Time Up!");
      }
    }

    //  The stop function
    function stop() {

      //  Clears our intervalId
      //  We just pass the name of the interval
      //  to the clearInterval function.
      clearInterval(intervalId);
    }

    //  Execute the run function.
    run();
*/