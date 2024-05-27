'use strict';
const players = document.querySelectorAll('.player');

const player1 = document.querySelector('.player--0');
const player1CurrentScore = document.getElementById('current--0');
const player1TotalScore = document.getElementById('score--0');

const player2 = document.querySelector('.player--1');
const player2CurrentScore = document.getElementById('current--1');
const player2TotalScore = document.getElementById('score--1');

const dice = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

function displayDice() {
  dice.classList.remove('hidden');
}

function updateDiceImage(n) {
  dice.src = `dice-${n}.png`;
}

function changeActivePlayer() {
  players.forEach(player => player.classList.toggle('player--active'));
}

function getActivePlayer() {
  return player1.classList.contains('player--active') ? player1 : player2;
}

function getCurrentScoreElement() {
  return getActivePlayer() === player1
    ? player1CurrentScore
    : player2CurrentScore;
}

function getTotalScoreElement() {
  return getActivePlayer() === player1 ? player1TotalScore : player2TotalScore;
}

function updateCurrentScore(n) {
  const currentScoreElement = getCurrentScoreElement();
  currentScoreElement.textContent = Number(currentScoreElement.textContent) + n;
}

function updateTotalScore() {
  const currentScoreElement = getCurrentScoreElement();
  const currentTotalScore = getTotalScoreElement();
  return (currentTotalScore.textContent =
    Number(currentScoreElement.textContent) +
    Number(currentTotalScore.textContent));
}

function resetCurrentScore() {
  const currentScore = getCurrentScoreElement();
  currentScore.textContent = 0;
}

function getTotalScore() {
  const getTotalScore = getTotalScoreElement();
  return Number(getTotalScore.textContent);
}

function roll() {
  const dice = Math.floor(Math.random() * 6) + 1;
  displayDice();
  updateDiceImage(dice);
  if (dice === 1) {
    player1CurrentScore.textContent = 0;
    player2CurrentScore.textContent = 0;
    changeActivePlayer();
  } else {
    updateCurrentScore(dice);
  }
}

function hold() {
  updateTotalScore();
  const totalScore = getTotalScore();
  resetCurrentScore();
  totalScore >= 100 ? getWinner() : changeActivePlayer();
}

function reset() {
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1TotalScore.textContent = 0;
  player2TotalScore.textContent = 0;
  rollBtn.disabled = false;
  holdBtn.disabled = false;
  dice.classList.add('hidden');
}

function getWinner() {
  const activePlayer = getActivePlayer();
  rollBtn.disabled = true;
  holdBtn.disabled = true;
  activePlayer.classList.add('player--winner');
}

rollBtn.addEventListener('click', roll);
holdBtn.addEventListener('click', hold);
newGameBtn.addEventListener('click', reset);
