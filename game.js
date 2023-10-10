/**********************************Code using Javascrip only *******************************/

/************* variable initiation **************/
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var clickedColors =[];
var level = 1;

var blue = new Audio("sounds/blue.mp3");
var green = new Audio("sounds/green.mp3");
var red = new Audio("sounds/red.mp3");
var yellow = new Audio("sounds/yellow.mp3");
var wrong = new Audio("sounds/wrong.mp3");

/************ function bank *************/
function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    return randomNumber
}

function changeButtonStyle1(theChosenColour){     // function triggerd by the computer choice
    setTimeout (function(){ document.querySelector("."+ theChosenColour).classList.toggle("pressed"); eval(theChosenColour).play(); }, 1000)
    setTimeout (function(){ document.querySelector("."+ theChosenColour).classList.toggle("pressed"); }, 1500)
}
function changeButtonStyle2(theChosenColour){     // function triggerd by the user click 
    eval(theChosenColour).play();
    document.querySelector("."+ theChosenColour).classList.toggle("pressed");
    setTimeout (function(){ document.querySelector("."+ theChosenColour).classList.toggle("pressed"); }, 300)
}

function gameOver(){
    wrong.play();
    document.querySelector("body").classList.toggle("game-over");
    setTimeout (function(){ document.querySelector("body").classList.toggle("game-over"); }, 300)
}

function gameOverPressKeyToStart(){
    document.querySelector("h1").innerText="Game Over, Press Any Key to Restart";
}

function displayWrongKey(){
    document.querySelector("h1").innerText='No No ! I said: press "A" to start';
}

function displayLevel(){
    document.querySelector("h1").innerText="Level "+level;
}

/************** KEY DOWN EVENT LISTENER FOR THE LETTER A (with disociated function)***********/ 
//the function encompasse the initiation code
function keyAToStart (event){
    if (event.key !== "a"){ // if the key pressed is different from A it will show an error message and game over 
        displayWrongKey();
        gameOver(); 
        document.addEventListener("keydown",keyAToStart,{once: true}); //if a wrong key is press we can still press A
    } 
    else { //if equal to A it will initiate the code

        /****************** CODE INITIATION ********************/
        level=1;
        gamePattern=[];
        clickedColors=[]; console.log("clickedColors= "+clickedColors);

        randomChosenColour = buttonColours[nextSequence()]; //give the random chosen color in a string "yellow " converting the number 0,1,2,3
            gamePattern.push(randomChosenColour);
            changeButtonStyle1(randomChosenColour);
                console.log(gamePattern);
        displayLevel();
    }
}
document.addEventListener("keydown",keyAToStart,{once: true}); // commande so that the event listener can only be use once

/************ EVENT LISTENER FOR THE BUTTON (contain the main code) *************/       

for (i=0;i<=3;i++){
    document.querySelectorAll(".btn")[i].addEventListener("click",function(){
        
        clickedColors.push(this.getAttribute("class").slice(4,));
        changeButtonStyle2(this.getAttribute("class").slice(4,)); //Change the color when clicked
        console.log("clickedColors= "+clickedColors);

        if (clickedColors.length < gamePattern.length){

            for (var l=0; l<(clickedColors.length); l++){

                if(clickedColors[l] === gamePattern[l]){
                    // Nothing happen
                }
                else if (clickedColors[l] !== gamePattern[l]){
                    
                    gameOver();
                    gameOverPressKeyToStart();
                    level=1;
                    gamePattern=[];
                    clickedColors=[]; console.log("clickedColors= "+clickedColors);

                    document.addEventListener("keydown", function(){
                        level=1;
                        gamePattern=[];
                        clickedColors=[]; console.log("clickedColors= "+clickedColors); 

                        randomChosenColour = buttonColours[nextSequence()]; //code initiation
                            gamePattern.push(randomChosenColour);
                            changeButtonStyle1(randomChosenColour);
                                console.log("gamePattern="+gamePattern);
                        displayLevel();
                    },{once: true});    
                }
            }
        }

        else if (clickedColors.length === gamePattern.length){

            if ( clickedColors[(clickedColors.length - 1)] === gamePattern[(gamePattern.length - 1)] ){
                
                randomChosenColour = buttonColours[nextSequence()];
                    gamePattern.push(randomChosenColour);
                    changeButtonStyle1(randomChosenColour);
                        console.log("gamePattern="+gamePattern);
                clickedColors=[]; console.log("clickedColors= "+clickedColors);
                level++;
                displayLevel();
            }
            else if ( clickedColors[(clickedColors.length - 1)] !== gamePattern[(gamePattern.length - 1)] ){

                gameOver();
                gameOverPressKeyToStart();
                level=1;
                gamePattern=[];
                clickedColors=[]; console.log("clickedColors= "+clickedColors);

                document.addEventListener("keydown", function(){
                    level=1;
                    gamePattern=[];
                    clickedColors=[]; console.log("clickedColors= "+clickedColors); 

                    randomChosenColour = buttonColours[nextSequence()]; //code initiation
                        gamePattern.push(randomChosenColour);
                        changeButtonStyle1(randomChosenColour);
                            console.log("gamePattern="+gamePattern);
                    displayLevel();
                },{once: true});  
            }
        }
                                                                     
        else if (clickedColors.length > gamePattern.length){ //if we press too early or too many time it will show a error a reset the game 

            gameOver();
            gameOverPressKeyToStart();

            level=1;
            gamePattern=[];
            clickedColors=[]; console.log("clickedColors= "+clickedColors); 
             
        }

    }) // end of the click event listener that contain the main code
} // end of the for loop containing the click event listener







