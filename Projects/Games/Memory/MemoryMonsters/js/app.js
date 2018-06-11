'use strict'

// Those are global variables, they stay alive and reflect the state of the game
var elPreviousCard = null;
var flippedCouplesCount = 0;


// This is a constant that we dont change during the game (we mark those with CAPITAL letters)
var TOTAL_COUPLES_COUNT = 8;

var isInProcses = false;

// Load an audio file
var audioWin = new Audio('sound/true.mp3');
var audioWinbig = new Audio('sound/win.mp3');
var audiolost = new Audio('sound/false.mp3');


// get the data-card attribute's value from both cards
var card1 = null;
var card2 = null;

// This function is called whenever the user click a card
function cardClicked(elCard) {

    

        // If the user clicked an already flipped card - do nothing and return from the function
        if (elCard.classList.contains('flipped') || isInProcses) {
            return;
        } 
            // Flip it
            elCard.classList.add('flipped');
        

        // This is a first card, only keep it in the global variable
        if (elPreviousCard === null) {
            elPreviousCard = elCard;

        } else {

            card1 = elPreviousCard.getAttribute('data-card');
            
            card2 = elCard.getAttribute('data-card');

            // No match, schedule to flip them back in 1 second
            if (card1 !== card2) {
                isInProcses = true;
                audiolost.play();

                setTimeout(function () {
                    elCard.classList.remove('flipped');
                    elPreviousCard.classList.remove('flipped');
                    elPreviousCard = null;
                    isInProcses = false;
                }, 1000);

            } else {
                flippedCouplesCount++;
                elPreviousCard = null;
                audioWin.play();

                // All cards flipped!
                if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {
                    audioWinbig.play();
                }
            }
        }
    }


function reset() {
    var cards = document.querySelectorAll('.card');
    flippedCouplesCount = 0;
    // flipped the card after winning//
    for (var i = 0; i < cards.length; ++i) {
        cards[i].classList.remove('flipped');
    }
    var board = document.querySelector('.board');
    for (var i = board.children.length; i >= 0; i--) {
        board.appendChild(board.children[Math.random() * i | 0]);
    }
}

document.querySelector('.KaftorPlayAgain').addEventListener("click", reset);