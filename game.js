let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;


$(document).keypress(function (){
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})
$(".btn").click(function() {
    let userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);
    let recentAnswer = (userClickedPattern.length-1);
    checkAnswer(recentAnswer);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("right");
        if(userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
        nextSequence();
    },1000);
}
}
    else{
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press any key to restart");
    }
}
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+ level);
    let randomNumber = Math.floor(Math.random()*3)+1;
    let chooseRandomColor = buttonColours[randomNumber];
    gamePattern.push(chooseRandomColor);
    $("#"+chooseRandomColor).fadeOut(100).fadeIn(100);
    playSound(chooseRandomColor);
    animatePress(chooseRandomColor);
}
function playSound(name) {
    let audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}
function animatePress(currentColour) {
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+currentColour).removeClass("pressed");
    }, 100);
}