'use strict'

var gState = {
    isGameOn: false,
    shownCount: 0,
    markedMinesCount: 0,
    flaggedCount: 0,
    secsPassed: 0
}
var gLevel = {
    SIZE: 4,
    MINES: 2
};

var gBoard = [];
var gMINE = '💣';
var gEmpty = '';
var gFLAG = '🚩';
var gTime = 0;
var gGameInterval = 0;

var cellClass = 'hidden';

function initGame() {
    clearInterval(gGameInterval);
    gTime = 0;

    buildBoard();
    setMinesRandomly();
    setCountersOfNearbyMines();
    minesCounter();
    renderBoard(gBoard)
    gState.isGameOn = true;
    gState.flaggedCount = 0;
}
function minesCounter() {
    var countMines = document.querySelector(".mines-num");
    countMines.innerHTML = gLevel.MINES;
}
function changeLevel(level) {
    switch (level) {
        case 'Easy':
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
            break;
        case 'Medium':
            gLevel.SIZE = 6;
            gLevel.MINES = 5;
            break;
        default:
            gLevel.SIZE = 8;
            gLevel.MINES = 15;
    }
    reset();
}
function renderBoard(gBoard) {
    var elBoard = document.getElementById('board');
    var strHtml = '';
    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[i];
        strHtml += '<tr>';
        for (var j = 0; j < gBoard.length; j++) {
            strHtml += '<td onclick="onCellClicked(' + i + ',' + j + ' )" oncontextmenu = "flagOnIt(' + i + ', ' + j + '); return false;">'
            strHtml += '<div id="cell-' + i + '-' + j + '" class="cell hidden">'
            strHtml += gBoard[i][j].cellContent;
            strHtml += '</div>';
            strHtml += '</td>';
        }
        elBoard.innerHTML = strHtml;
    }
    strHtml += '</tr>';
}
function buildBoard() {
    gBoard = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        gBoard[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            gBoard[i][j] = {
                rowIdx: i,
                colIdx: j,
                cellContent: gEmpty,
                isClicked: false,
                isFlagged: false,
                isMine: false
            }
        }
    }
}
//get random cell- row & col, while mine in the cell continue to get me a new cell and put mine (ONLY if there's no mine).
function setMinesRandomly() {
    for (var i = 0; i < gLevel.MINES; i++) {
        var rowIdx = getRandomInt(0, gLevel.SIZE)
        var colIdx = getRandomInt(0, gLevel.SIZE)
        while (gBoard[rowIdx][colIdx].cellContent === gMINE) {
            rowIdx = getRandomInt(0, gLevel.SIZE)
            colIdx = getRandomInt(0, gLevel.SIZE)
        }
        gBoard[rowIdx][colIdx].cellContent = gMINE;
        gBoard[rowIdx][colIdx].isMine = true;

    }
}
//if cell content empty-call the func that count the number on the cell Relative to mines & place them
function setCountersOfNearbyMines() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (gBoard[i][j].cellContent === gEmpty) {
                gBoard[i][j].cellContent = setMinesNegsCount(i, j);
            }
        }
    }
}
//func that count the numbers on the cell Relative to mines
function setMinesNegsCount(rowIdx, colIdx) {
    var minesCount = 0;

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > gLevel.SIZE - 1) //if the is on the range
            continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if ((j < 0 || j > gLevel.SIZE - 1) || (i === rowIdx && j === colIdx))//if its the cell itself or out of the board
                continue;
            if (gBoard[i][j].cellContent === gMINE) {
                minesCount++;
                continue;
            }
        }
    }
    return minesCount;
}
function onCellClicked(i, j) {
    var cell = gBoard[i][j];
    if (!gState.isGameOn || cell.isClicked) { return }
    expandShown(i, j)
    if (cell.isFlagged) {
        cell.isFlagged = false;
        gState.flaggedCount--
    }
    if (gTime === 0) startTimer();
    if (cell.cellContent === gMINE) {
        gameOver();
    }
    if (!cell.isClicked) {
        cell.isClicked = true;
        gState.shownCount++
    }
    var clickedCell = document.getElementById('cell-' + i + '-' + j);
    clickedCell.className = "visible";
    clickedCell.innerHTML = cell.cellContent;
    isWin();
}
function flagOnIt(i, j) {
    var cell = gBoard[i][j];

    if (!gState.isGameOn || cell.isClicked) { return }//if game not activate or click already clicked
    if (gTime === 0) startTimer();

    
    if(gState.flaggedCount >= gLevel.MINES){
        if(cell.isFlagged){
            markedflagged(i,j)
        }
        return;
    }
    markedflagged(i,j);
    isWin();
}
function markedflagged(i,j) {
    var cell= gBoard[i][j];
    if (!cell.isFlagged) {//put flag
        cell.isFlagged = true;
        gState.flaggedCount++;
        var elCell = document.getElementById('cell-' + i + '-' + j);
        elCell.innerHTML = gFLAG;
        elCell.classList.remove('hidden');
        if (cell.isMine) {
            gState.markedMinesCount++
        }
    } else {//remove flag
        cell.isFlagged = false;
        gState.flaggedCount--;
        var elCell = document.getElementById('cell-' + i + '-' + j);
        elCell.innerHTML = cell.cellContent;
        elCell.classList.add('hidden');
        if (cell.isMine) {
            (gState.markedMinesCount <= 0) ? 0 : gState.markedMinesCount--
        }
    }
}
function reset() {
    initGame();
    var elTimer = document.querySelector(".timer");
    elTimer.innerHTML = gTime.toFixed(1);
    var gameOver = document.querySelector(".endGame ");
    gameOver.classList.remove('visible');
    gState.shownCount = 0;
    gState.flaggedCount = 0;
    gState.markedMinesCount = 0;
}
function isWin() {
    var winGame = ((gLevel.SIZE ** 2) - gLevel.MINES);
    var winGameWithFlag = gLevel.MINES;
    if (winGame === gState.shownCount) {//if the number of cell shown equl to the number of cells on board minus the number of mine
        var isWin = document.querySelector(".endGame");
        isWin.innerHTML = 'You Win!!';
        isWin.classList.add("visible");
        clearInterval(gGameInterval);
    }
    if (gState.markedMinesCount === gLevel.MINES) {//if the counter of the mark cell (with mine) equl to number of mine at this level
        var isWin = document.querySelector(".endGame");
        isWin.innerHTML = 'You Win!!';
        isWin.classList.add("visible");
        clearInterval(gGameInterval);
    }
}
function gameOver() {
    clearInterval(gGameInterval);
    var cell = document.querySelectorAll(".cell");
    for (var i = 0; i < cell.length; i++) {//game end--> show all cells
        cell[i].className = "visible";
    }
    var gameOver = document.querySelector(".endGame ");
    gameOver.innerHTML = 'Game over!!'
    gameOver.classList.add("visible");
    gState.isGameOn = false;
}
function startTimer() {
    var elTimer = document.querySelector('.timer');
    gGameInterval = setInterval(function () {
        gTime += 0.1;
        elTimer.innerHTML = gTime.toFixed(1);
    }, 100)
}
function expandShown(rowIdx, colIdx) {
    var content = gBoard[rowIdx][colIdx].cellContent;
    if (content === 0) {
        for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
            if (i < 0 || i > gLevel.SIZE - 1) continue;
            for (var j = colIdx - 1; j <= colIdx + 1; j++) {
                if (j < 0 || j > gLevel.SIZE - 1) continue;
                var currCell = gBoard[i][j];
                var elCell = document.getElementById('cell-' + i + '-' + j);
                elCell.innerHTML = currCell.cellContent;
                elCell.classList.add("visible");
            }
        }
    }
}