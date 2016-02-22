// Initializes the game

var score = 0;
var wrongAnswers = 0;
var questionNumber;
var currentQuestion;
var askedCount = 0;

$(document).ready(function() {
  $.getJSON('questions.json', function(data) {
    questions = data;
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
    questionNumber = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[questionNumber];
    if (currentQuestion.asked === "true") {
      askQuestion();
      }
    else {
      askedCount++;
      $('#questionDiv').html('<h2 id ="categoryName">' + currentQuestion.category + '</h2> <p>' + currentQuestion.question + '</p>');
    }
  };
};

function drawGameInterface() {
  $("#welcome, #answerDiv, #scoreDiv").toggle("slow");
};

// hides the placeholder text when user clicks in the answer box-sizing
$("#answer").focus(function() {
  $("#answer").val("");
});

// handles correct response
function handleCorrectResponse() {
  score++;
  $('#questionDiv').html('<p>Good. That is correct.</p>');
  setTimeout(function(){
    askQuestion();
  }, 1250);
}

// end game
function endGame() {
  $("#welcome").toggle("slow");
  $("#answerDiv").toggle("slow");
  $("#scoreDiv").toggle("slow");
  $('#questionDiv').html('<p>That is incorrect. The answer is ' + currentQuestion.answer[0] + '.</p>' + '<p>Your final score is ' + score + '.</p>');
}

// show correct response if the user gets it
function showCorrectResponse() {
  $('#questionDiv').html('That is incorrect. The answer is ' + currentQuestion.answer[0] + '.');
  setTimeout(function(){
    askQuestion();
  }, 1750);
}

// get the user's answer
$("#answerForm").submit(function(){
  event.preventDefault();
//  correctResponse = (answers[questionNumber]);
  $("#answerButton").prop("disabled",true);
  currentQuestion.asked = "true";
  playerResponse = $('#answer').val().toLowerCase();
  $("#answer").val("");

  if (playerResponse === "end") {
    userRequestsEnd();
  } else if (jQuery.inArray(playerResponse, currentQuestion.answer) !== -1) {
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
  $('#questionDiv').html('<p>You have ended the game. Your final score is ' + score + '.</p>');
}

//no more questions left
function showWinState() {
  $("#welcome").toggle("slow");
  $("#answerDiv").toggle("slow");
  $("#scoreDiv").toggle("slow");
  $('#questionDiv').html('<p>Congratulations. You have answered all of my questions. You win, with a final score of ' + score + '.</p>');
}
