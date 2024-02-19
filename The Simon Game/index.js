var buttonStack = [];
var isStarted = false;
var currentLevel = 0;
var currentPressedIndex = 0;
var colorArray = ["green", "red", "yellow", "blue"];

$(document).keypress(() => {
  if (!isStarted) {
    startGame();
    generateSequence();
  }
});

$(".btn").click(function () {
  if (isStarted) {
    var userChosenColor = $(this).attr("id");

    animatePress(userChosenColor);

    if (userChosenColor === buttonStack[currentPressedIndex]) {
      playSound(userChosenColor);
      currentPressedIndex++;

      if (currentPressedIndex === buttonStack.length) {
        currentPressedIndex = 0;
        setTimeout(function () {
          generateSequence();
        }, 1000);
      }
    } else {
      gameOver();
    }
  }
});

function startGame() {
  isStarted = true;
}

function gameOver() {
  playSound("wrong");

  $("body").addClass("game-over");

  $("h1").text("Game Over, Press Any Key to Restart");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  currentLevel = 0;
  buttonStack = [];
  currentPressedIndex = 0;

  isStarted = false;
}

function generateSequence() {
  currentLevel++;

  $("h1").text("Level " + currentLevel);

  var colorIndex = Math.floor(Math.random() * 4);

  // Generate press animation
  $("#" + colorArray[colorIndex])
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(colorArray[colorIndex]);

  buttonStack.push(colorArray[colorIndex]);
}

function animatePress(color) {
  $("#" + color).toggleClass("pressed");
  setTimeout(() => {
    $("#" + color).toggleClass("pressed");
  }, 100);
}

function playSound(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}
