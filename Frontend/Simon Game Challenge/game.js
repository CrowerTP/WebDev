// Define variables

var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor = "";
var userClickedPattern = [];
var gameHasStarted = false;
var level = 0;
var userHasClicked = false;
var evaluation = false;
var arrayMatch = true;

/********************************************************************************************************************************************************************* */
//****************************************************************PROGRAM INIT**************************************************************************************** */
/********************************************************************************************************************************************************************* */
/********************************************************************************************************************************************************************* */

// Keep track if the player has started the game or not ( pressed a button  ) and if so,
// Add the random color to the game pattern ( or in other word save it ) and fade it out/in and plays it's sound


$(document).ready(function(){
    $("body").keypress(function(){
        if (gameHasStarted == false){
            gameHasStarted = true;
            addNewColor();
            animatePress(randomChosenColor);
            playSound(randomChosenColor);
        }
    });
});

/********************************************************************************************************************************************************************* */
//****************************************************************PROGRAM********************************************************************************************* */
/********************************************************************************************************************************************************************* */
/********************************************************************************************************************************************************************* */




$(".btn").click(function(event) {                               // if the user clicks on a button, this will add it ( save it as well ) to an array called  userClickedPattern
    var clickedColor = event.originalEvent.target.id;
    
    arrayMatch = true;

    if (gameHasStarted==true && evaluation == false){
        userClickedPattern.push(clickedColor);
        playSound(clickedColor);
        animatePress(clickedColor);
    
    
        evaluation = true;

        for (let i = 0; i < userClickedPattern.length; i++) {
            if (gamePattern[i] != userClickedPattern[i]){
                arrayMatch = false;
                break;
            }
        }

        if (arrayMatch && gamePattern.length == userClickedPattern.length){
                addNewColor();

            setTimeout(function() {
                playSound(randomChosenColor);                      
                animateFade(randomChosenColor);                       
            }, 1000);

            userClickedPattern = [];
            setTimeout(function() {
                evaluation = false;
            }, 1000);

        } else if (arrayMatch == false){
            playSound("wrong");
            animateWrong();
            $("h1").text("Game Over :(  \n Press any key to restart!")
            userClickedPattern = [];
            gamePattern = [];
            gameHasStarted = false;
            evaluation = false;
            level = 0;
        } else{
            evaluation = false;
        }   
    }
    
});



/********************************************************************************************************************************************************************* */
//****************************************************************FUNCTIONS******************************************************************************************* */
/********************************************************************************************************************************************************************* */
/********************************************************************************************************************************************************************* */


// add a new color to the game pattern

function addNewColor(){
    randomChosenColor = buttonColors[nextSequence()];
    gamePattern.push(randomChosenColor);
}


// random number generator from 1 to 4

function nextSequence(){
    if (gameHasStarted==true){
        var randomNumber = Math.round(Math.random() * 3);

        level++;
        $("h1").text("Level " + level);
        return randomNumber;
    }
    
}

// function for playing a sound stored locally in sounds folder

function playSound(color){
    switch (color){
        case "red":
            sound = new Audio("sounds/red.mp3");
            sound.play();
            break;
        case "blue":
            sound = new Audio("sounds/blue.mp3");
            sound.play();
            break;
        case "green":
            sound = new Audio("sounds/green.mp3");
            sound.play();
            break;
        case "yellow":
            sound = new Audio("sounds/yellow.mp3");
            sound.play();
            break;
        case "wrong":
            sound = new Audio("sounds/wrong.mp3");
            sound.play();
            break;
    }
}

// function for animate a button by turning it's color to gray for 100 ms then turns it back

function animatePress(color){
    $("#" + color).addClass("pressed");

    setTimeout(function() {
        $("#" + color).removeClass("pressed"); 
    }, 100);
}

function animateWrong(){
    $("body").addClass("game-over");

    setTimeout(function() {
        $("body").removeClass("game-over"); 
    }, 200);
}

function animateFade(color){
    $("#" + color).fadeOut(200).fadeIn(200);
}