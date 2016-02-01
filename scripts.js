// Initializes the game

var score = 0;
var wrongAnswers = 0;
var questions=[];
var answers=[];
var categories=[];
var questionAsked=[];
var correctResponse;
var playerResponse = "";
var questionNumber;
var currentCategory;
var currentQuestion;
var askedCount = 0;

$(document).ready(function() {
  $.getJSON('questions.json', function(data) {
    $.each(data, function(key, val) {
      questions.push(val.question);
      answers.push(val.answer);
      categories.push(val.category);
      questionAsked.push(val.asked);
    });
  });
});


function initialize() {
  drawGameInterface();
  askQuestion();
};

function askQuestion() {
  $("#answerButton").prop("disabled",false);
  if (askedCount === questions.length) {
    showWinState();
  }
    else {
    questionNumber = Math.floor(Math.random() * (questions.length - 0)) + 0;
    if (questionAsked[questionNumber] === "true") {
      askQuestion();
      }
    else {
      askedCount++;
      currentCategory = categories[questionNumber];
      currentQuestion = questions[questionNumber];
      /* correctResponse = answers[questionNumber]; */
      document.getElementById('questionDiv').innerHTML = '<h2 id ="categoryName">' + currentCategory + '</h2> <p>' + currentQuestion + '</p>';
    }
  };
};

function drawGameInterface() {
  $("#welcome").toggle("slow");
  $("#answerDiv").toggle("slow");
  $("#scoreDiv").toggle("slow");
};

// hides the placeholder text when user clicks in the answer box-sizing
$("#answer").focus(function() {
  $("#answer").val("");
});

// handles correct response
function handleCorrectResponse() {
  score++;
  document.getElementById('questionDiv').innerHTML = "Good. That is correct.";
  setTimeout(function(){
    askQuestion();
  }, 1250);
}

// end game
function endGame() {
  $("#welcome").toggle("slow");
  $("#answerDiv").toggle("slow");
  $("#scoreDiv").toggle("slow");
  document.getElementById('questionDiv').innerHTML = '<p>That is incorrect. The answer is ' + correctResponse[0] + '.</p>' + '<p>Your final score is ' + score + '.</p>';
}

// show correct response if the user gets it
function showCorrectResponse() {
  document.getElementById('questionDiv').innerHTML = 'That is incorrect. The answer is ' + correctResponse[0] + '.';
  setTimeout(function(){
    askQuestion();
  }, 1750);
}

// get the user's answer
$("#answerForm").submit(function(){
  event.preventDefault();
  correctResponse = (answers[questionNumber]);
  $("#answerButton").prop("disabled",true);
  questionAsked[questionNumber] = "true";
  playerResponse = $('#answer').val().toLowerCase();
  $("#answer").val("");

  if (playerResponse === "end") {
    userRequestsEnd();
  } else if (jQuery.inArray(playerResponse, correctResponse) !== -1) {
    handleCorrectResponse();
  } else {
    handleWrongResponse();
    }
});

function handleWrongResponse() {
  wrongAnswers++;
  $(".wrongResponses").append("<li>&#10006;</li>")
  if (wrongAnswers === 3) {
    endGame();
  } else {
    showCorrectResponse();
    }
}

//user quits
function userRequestsEnd() {
  $("#welcome").toggle("slow");
  $("#answerDiv").toggle("slow");
  $("#scoreDiv").toggle("slow");
  document.getElementById('questionDiv').innerHTML = '<p>You have ended the game. Your final score is ' + score + '.</p>';
}

//no more questions left
function showWinState() {
  $("#welcome").toggle("slow");
  $("#answerDiv").toggle("slow");
  $("#scoreDiv").toggle("slow");
  document.getElementById('questionDiv').innerHTML = '<p>Congratulations. You have answered all of my questions. You win, with a final score of ' + score + '.</p>';
}
