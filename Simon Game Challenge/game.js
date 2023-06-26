const buttonColouors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = true;
let level = 0;

$(document).keypress(function() {
    if (started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = false;
    }
  });
 
$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
}) 

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart")
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        },200)
        
        startOver();
    }
}  

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColouors[randomNumber];
    gamePattern.push(randomChosenColour); 
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");   
    }, 100)
}

function playSound(name) {
    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = true;
}



