'use strict'

var riddle = {}
var gGameInterval = 0;
var gTime = 0;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function initGame() {
    gTime = 0;
    startTimer()

    var field1 = getRandomInt(20, 40);
    var field2 = getRandomInt(20, 40);
    var result = field1 + field2;

    var resultsArray = getRandomOptions(result)
    resultsArray.push(result);
    resultsArray.sort(function (a, b) { return 0.5 - Math.random() });


    riddle = {
        num1: field1,
        num2: field2,
        answer: result,
        wrongResults: resultsArray
    }

    document.getElementById("field1").innerHTML = riddle.num1;
    document.getElementById("field2").innerHTML = riddle.num2;
    document.getElementById("option1").innerHTML = riddle.wrongResults[0];
    document.getElementById("option2").innerHTML = riddle.wrongResults[1];
    document.getElementById("option3").innerHTML = riddle.wrongResults[2];
    document.getElementById("option4").innerHTML = riddle.wrongResults[3];

}

function getRandomOptions(sum) {

    var resultsArray = [];
    var result = sum;

    var randAddition = getRandomInt(0, 2);
    var addition = getRandomInt(1, 10);

    for (var i = 0; i < 3; i++) {
        if (randAddition === 1) {
            result += addition
        } else {
            result -= addition
        }
        resultsArray.push(result);
    }
    return resultsArray
}

var countScore = 0
function checkClick(clickedCell) {
    var after = document.getElementById("after")
    if (clickedCell.innerHTML == riddle.answer) {
        after.classList.remove("hide")
        after.classList.add("correct")
        after.innerHTML = "Good Job :-)"
        countScore++
        clearInterval(gGameInterval);


    } else {
        after.classList.remove("hide")
        after.classList.add("wrong")
        after.innerHTML = "You suck :-("
        countScore--
        clearInterval(gGameInterval);
    }
    document.getElementById("score").innerHTML = countScore;
}

// function containerAnswer(){

//     var after = document.getElementById("after");
    
//     after.classList.remove("correct")
//     after.classList.remove("wrong")
//     after.innerHTML = ""
// }

function playAgain() {
    after.classList.remove("wrong")
    after.classList.remove("correct")
    after.classList.add("hide")
    initGame()
    gTime = 0;
}

function startTimer() {
    gTime = 0;
    clearInterval(gGameInterval);


    var elTimer = document.getElementById("timer");
    gGameInterval = setInterval(function () {
        gTime += 0.1;
        elTimer.innerHTML = gTime.toFixed(1);
    }, 100)

}
