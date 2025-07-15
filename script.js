// Varaibles declartion
const tryAgain = document.querySelector(".tryAgain");
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const timerDisplay = document.querySelector(".timer");
const Start = document.querySelector(".btn");

let lastHole;
let timeUp = false;
let score = 0;
let timerCount;

//Function declaration

//Decides the time mole is shown
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// makes sure that there is a random hole every time
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) return randomHole(holes);
  lastHole = hole;
  return hole;
}

//decides where the mole will be seen
function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

// Starts the game
function StartGame(e) {
  tryAgain.style.display = "none";
  holes.forEach((hole) => (hole.style.display = "block"));
  Start.style.display = "none";
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  timer();
  setTimeout(() => (timeUp = true), 10000);
}

// Handels the click and scoreBoard
function bonk(e) {
  if (!e.isTrusted) return; // remove fake clickss
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = score;
}

// Manages the timer
function timer() {
  timerCount = 10;
  const countdown = setInterval(() => {
    timerCount--;
    timerDisplay.textContent = ` ${
      timerCount <= 0 ? "Game Over!" : `Game Over in : ${timerCount} seconds`
    } `;
    if (timerCount <= 0) {
      clearInterval(countdown);
      tryAgain.style.display = "block";
      timeUp = true;
    }
  }, 1000);
}

// AddEventListner
moles.forEach((mole) => mole.addEventListener("click", bonk));
