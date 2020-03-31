// alert("hello");
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//Listening the DOM for keyboard
$(document).keypress(function(event) {
  // console.log(event.key);
  if (event.key === "Enter") {
    if (!started){
      $("#level-title").text("Level " + level);
      // console.log(event.key);
      nextSequence();
      started = true;
    }
  }
});

//Listening the buttons
$(".btn").click(function() {
    // var userChosenColour = this.id; // or alert($(this).attr('id'));
    var userChosenColour = ($(this).attr('id')); // receiving the clicked button #id
    userClickedPattern.push(userChosenColour); // Adding the lasy color to the array

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    // Calling the function that verify if the user's patterns
    // matches the gamePattern

});



function checkAnswer(currentKey) {
    // Verifying if the element choosen by the player matches the gamePattern[currentKey]
    if (gamePattern[currentKey] === userClickedPattern[currentKey]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over"); //change the body color
      $("#level-title").text("Game Over, Press Enter to Restart");
      //change h1 (id level-tile) text

      setTimeout(function(){
        $("body").removeClass("game-over");
      },200); // remove the added class that changed the body color

      startOver(); //Restart the game

    }

}

function nextSequence(){

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+ level);

  var randomNumber = Math.floor(Math.random()*4); // generate a random number [0-3]
  var randomChosenColour = buttonColours[randomNumber]; // generate a color
  gamePattern.push(randomChosenColour);

  // code bellow blinks the button with id #color
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(sound) {
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  // Function to animate the button pressed (id #color)
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = 0;
}
