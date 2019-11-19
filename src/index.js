/*
AUTHOR: Jordan Winslow
WEBSITE: https://JordanWinslow.dev
LICENSE: Attribution-NonCommercial-ShareAlike 4.0 International
Link to license: https://creativecommons.org/licenses/by-nc-sa/4.0/
*/

import O from "./O.svg";
import X from "./X.svg";

const gameSquares = document.getElementsByClassName("gameSquare");
const gameBoard = document.getElementById("ticTacToeBox");
let turnTracker = 1;

const displayWarning = () => {
  document.querySelector(".WARNING").classList.add("fadeInOut");
  setTimeout(() => {
    document.querySelector(".WARNING").classList.remove("fadeInOut");
  }, 3000);
};
const userAction = e => {
  console.log("USER ACTION");
  console.log("TURN TRACKER: ", turnTracker);
  // Check to make sure they didn't click a square that is taken already.
  if (e.target.hasChildNodes()) {
    console.log("USER CLICKED TAKEN SPACE");
    displayWarning();
    return;
  } else {
    gameBoard.style.pointerEvents = "none"; // Disable all click events until operation finishes
    e.target.innerHTML = `<div class="X fadeIn">${X}</div>`;
    if (turnTracker === 5) {
      setTimeout(() => gameOver(), 2000); // wait for the X to appear before ending game
      return;
    } else {
      turnTracker++;
      computerAction(); // use hoisting to run the computerAction below
    }
  }
};
const computerAction = () => {
  console.log("COMPUTER ACTION");
  // pretend the computer is thinking
  setTimeout(() => {
    // Check every square until we find one that is empty.
    for (const key in gameSquares) {
      if (gameSquares.hasOwnProperty(key)) {
        const square = gameSquares[key];
        if (!square.hasChildNodes()) {
          // If there isn't already a X or O, add an O
          square.innerHTML = `<div class="O fadeIn">${O}</div>`;
          break;
        }
      }
    }
    gameBoard.style.pointerEvents = "auto"; // Allow the user to click again
  }, 1000);
};

const checkWinCondition = () => {};

const gameOver = () => {
  console.log("GAME OVER");
  console.log("RESETTING GAME BOARD");
  for (const key in gameSquares) {
    if (gameSquares.hasOwnProperty(key)) {
      const square = gameSquares[key];
      square.removeChild(square.firstChild);
    }
  }
  turnTracker = 1;
  gameBoard.style.pointerEvents = "auto"; // Allow the user to click again
};

/***********************GAME BEGINS HERE**********************/

// ATTACH CLICK EVENTS TO THE GAME SQUARES SO USER CAN INTERACT WITH BOARD
for (const id in gameSquares) {
  if (gameSquares.hasOwnProperty(id)) {
    // To ensure we only add click events to the game squares and not any new properties added to the object.
    const square = gameSquares[id];
    square.addEventListener("click", userAction);
  }
}
