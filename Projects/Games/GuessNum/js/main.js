'use strict'


var ranNum = getRandomInteger(0, 40);
console.log(ranNum);


function checkEqul() {
    var userGuess = +prompt('Please enter your guess')
    var status;

    if (userGuess < 0 || userGuess > 40) {
        status = 'Not in Range!'
    } else {
        if (userGuess === ranNum) {
            status = 'Win!!'
        } else if (userGuess > ranNum) {
            status = 'Too high!!'
        } else if (userGuess < ranNum) {
            status = 'Too low!!'
        }
    }
    guessRes(userGuess, status);
}

function guessRes(userGuess, status) {
    document.querySelector(".score").innerHTML = "Your guess is: " + userGuess + " - " + status;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

