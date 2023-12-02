var Red = "R";
var Blue = "Y";
var currPlayer = Red; // red is starting player

var gameOver = false; // boolenan value 
var board;

var rows = 5; // rows of board
var columns = 5; // columns of board
var currColumns = []; //keeps track of which row each column is at.

window.onload = function() {
    document.getElementById("jeopardy-music").play(); // plays backround music when window is loaded
    setGame(); // calls set game function when window loads
}

// function to et up game board
function setGame() {
    board = []; // set as empty array
    currColumns = [4, 4, 4, 4, 4]; // inita;izes starting row for each colllum to be at the bottom

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' '); // space pushed in rows array for each coluumn meaning they are empty
            // HTML
            let hole = document.createElement("div"); // creates html elemt for each 25 holes
            hole.id = r.toString() + "-" + c.toString(); // sets id for each hole as row and column number sperated by - like 1-2
            hole.classList.add("hole"); // adds class to the holese
            hole.addEventListener("click", setPiece); // adds event listener to each hole that calls set piece function when clicked
            document.getElementById("board").append(hole); //appends hole div to board
        }
        board.push(row); // pushes row array to board array
    }
}

// function to set piece when hole is clicked
function setPiece() {
    if (gameOver) { //checks if game over and if true doesnt allow more clicks
        return;
    }
    

    //get coords of that tile clicked
    let coords = this.id.split("-"); //gets r and c coordinated of clicked hole by usimg its id
    let r = parseInt(coords[0]); // parses first part of id rows and stores it in variable r
    let c = parseInt(coords[1]); // parses second part of id columns and stores it in varibale c

    // figure out which row the current column should be on
    r = currColumns[c]; 

    if (r < 0) { // checks if column is full and if ture doenst allow more moves
        return;
    }

    board[r][c] = currPlayer; //update JS board with current color and position
    let hole = document.getElementById(r.toString() + "-" + c.toString()); // gets html element of clicked hole with new r and c
    if (currPlayer == Red) {
        hole.classList.add("rtoken"); // adds red class to hole if player is sed
        currPlayer = Blue; // switches player
    }
    else {
        hole.classList.add("btoken"); // adds blue class to hole if player isnt red
        currPlayer = Red; // switches player
    }



    r -= 1; // decrements row r so next piece cant be placed there
    currColumns[c] = r; // updated row stored in currcolumns array

    checkWinner(); // check winner function called and check if red wins blue wins or tie
}

// function to check for a winner
function checkWinner() {
     // horizontal
     for (let r = 0; r < rows; r++) { //iterates through tows
         for (let c = 0; c < columns - 2; c++){ //itterates through calumsn until one left to not go out of bounds
            if (board[r][c] != ' ') { // checks if hole isnt empty
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2]) { //checks if 3 holes in the smae row are the same
                    setWinner(r, c); //set winner function called
                    return;
                }
            }
         }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 2; r++) {
        for (let c = 0; c < columns - 2; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 2; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

     // Check for a tie
     let boardFilled = true;
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns; c++) {
             if (board[r][c] === ' ') { // check if current cell is empty
                 boardFilled = false; // if not empty board isnt filled
                 break;
             }
         }
         if (!boardFilled) {
             break;
         }
     }
 
     if (boardFilled) {
         // No winner, it's a tie
         gameOver = true; // if board is filled its a tie
         document.getElementById("winner").innerText = "It's a tie!"; // displays tie message in h2 with id winner
     }
 }


// function to set winner
function setWinner(r, c) {
    let winner = document.getElementById("winner");// gets winner id h2 from html and stores it in varibale winner
    if (board[r][c] == Red) { // checks if palyer who made winning move is red
        winner.innerText = "Red Wins!!!";  // displays red wins message in h2 id winner
    } else { // if not 
        winner.innerText = "Blue Wins!!!"; // displays blue wins message in h2 id winner
    }
    gameOver = true; // sets game over variabe to true
}