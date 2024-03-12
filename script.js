// DOM Elements
const gameContainer = document.getElementById("game");
const startGameButton = document.getElementById("startGameButton");
const restartGameButton = document.getElementById("restartGameButton");
const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('bestScore');

// Game Variables
const COLORS = ["red", "blue", "green", "orange", "purple", "red", "blue", "green", "orange", "purple"];
let shuffledColors = [];
let score = 0;
let flippedCards = [];
let canFlip = true;
let matchedPairs = 0;

// Helper Function to shuffle an array (Fisher Yates Shuffle)
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    // Swap Elements
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

// Function to create game board
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// Function to handle card click events
function handleCardClick(event) {
  if (!canFlip || event.target.style.backgroundColor === event.target.className) return;

  let clickedCard = event.target;
  clickedCard.style.backgroundColor = clickedCard.className;
  flippedCards.push(clickedCard);

  if (flippedCards.length === 2) {
    updateScore();
    checkForMatch();
  }
}

// Function to update score
function updateScore() {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
}

// Function to check for a match
function checkForMatch() {
  canFlip = false;
  const [cardOne, cardTwo] = flippedCards;
  if (cardOne.className === cardTwo.className) {
    matchedPairs++;
    if (matchedPairs === COLORS.length / 2) {
      updateBestScore(score);
      restartGameButton.style.display = 'block';
    }
    resetFlippedCards();
  } else {
    setTimeout(() => {
      cardOne.style.backgroundColor = '';
      cardTwo.style.backgroundColor = '';
      resetFlippedCards();
    }, 1000);
  }
}

// Function to reset flipped cards and check if flipping is allowed
function resetFlippedCards() {
  flippedCards = [];
  canFlip = true;
}

// Function to start a new game
function startGame() {
  gameContainer.innerHTML = '';
  matchedPairs = 0;
  score = 0;
  updateScoreDisplay();
  restartGameButton.style.display = 'none';
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
}

// Function to update the score display
function updateScoreDisplay() {
  scoreDisplay.textContent = 'Score: 0';
}

// Function to update the best score in local storage and display
function updateBestScore(currentScore) {
  const bestScore = parseInt(localStorage.getItem('bestScore'), 10) || Infinity;
  if (currentScore < bestScore) {
    localStorage.setItem('bestScore', currentScore);
    bestScoreDisplay.textContent = `Best Score: ${currentScore}`;
  }
}

// Function to display the best score from local storage
function displayBestScore() {
  const bestScore = localStorage.getItem('bestScore');
  bestScoreDisplay.textContent = bestScore ? `Best Score: ${bestScore}` : "Best Score: --";
}

// Event Listeners
startGameButton.addEventListener("click", startGame);
restartGameButton.addEventListener("click", startGame);
document.addEventListener('DOMContentLoaded', displayBestScore);

// Sources: used chatgpt for help with some of the code and for organizing the code.