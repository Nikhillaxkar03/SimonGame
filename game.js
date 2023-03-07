let userClickedPattern = [];
let gameObjects = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let level = 0;
let gameStarted = false;

$('.btn').on("click", (e)=>{
    let userChosenColour = (e.target.id);
    userClickedPattern.push(userChosenColour);
    animatePress(e.target.id);
    let recetAnswer = (userClickedPattern.length-1)
    checkAnswer(recetAnswer);
})
$(document).on('keydown', ()=>{
    if(gameStarted === false) {
    $('#level-title').text("Level " + level);
    nextSequence();
    gameStarted = true;
}
})
$(".strBtn").on('click', ()=>{
    if(gameStarted === false) {
    $('#level-title').text("Level " + level);
    nextSequence();
    gameStarted = true;
}
})

let checkAnswer = (currentAnswer) =>{
    if( userClickedPattern[currentAnswer] === gamePattern[currentAnswer]) {
        console.log("right");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(()=> {
                nextSequence();
            },1000)
        }
    }
    else{
        let audio = new Audio('sounds/wrong.mp3');
        audio.play();
        $('body').addClass('game-over');
        setTimeout(()=>{
            $('body').removeClass('game-over');
        },200)
        level = 0;
        gamePattern = [];
        $('#level-title').text("Game Over, Press Any Key to Restart");
        gameStarted = false;
    }
}


let nextSequence = () => {
    userClickedPattern = [];
    let randomNum = Math.floor(Math.random()*4);
    let randomChosenColor = gameObjects[randomNum];
    level++;
    gamePattern.push(randomChosenColor);
    $('#level-title').text("Level " + level);
    $('#'+ randomChosenColor).addClass('pressed');
    setTimeout(() => {
        $('#'+ randomChosenColor).removeClass('pressed');
    }, 100);
    let audio = new Audio('sounds/'+randomChosenColor + ".mp3");
    audio.play();
}

let animatePress = (btnClicked)=> {
    $("#" + btnClicked).addClass('pressed');
    let audio = new Audio("sounds/" + btnClicked + ".mp3");
    audio.play();
    setTimeout(() => {
        $("#"+btnClicked).removeClass('pressed');
    }, 100);
}





