var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

function nextSequence() {
  userClickedPattern = [];

  level++;

  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

});

var started = false;
var level = 0;


$(document).keydown(function(){

if (!started) {
  $("#level-title").text("level " + level);
  nextSequence();
  started = true;
  //started = true; Im not sure if this is necessary or not. But, I'll input it above just in case.
}

});

function playSound (name) {
  var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress (currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
   $("#" + currentColor).removeClass("pressed");
 }, 100);
}

function checkAnswer (currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();

      //notice the 4 difference steps in this else function


  }

}

function startOver () {
  level = 0;
  gamePattern = [];
  started = false;
  //notice how started is changed back to false.
}
//  $(".btn").removeClass(".pressed")




          /*function playSound(name) {
            switch (name) {

              case "green":
              var green = new Audio("sounds/green.mp3");
              green.play();
              break;

              case "red":
              var red = new Audio("sounds/red.mp3");
              red.play();
              break;

              case "yellow":
              var yellow = new Audio("sounds/yellow.mp3");
              yellow.play();
              break;

              case "blue":
              var blue = new Audio("sounds/blue.mp3");
              blue.play();
              break;

              default:
              console.log(userClickedPattern);

          }
          */
