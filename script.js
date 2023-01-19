'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const arrow0El = document.querySelector('.arrow--0');
const arrow1El = document.querySelector('.arrow--1');
const targetPoint = document.querySelector('.setting-target');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.setting-start');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--fetch');

let scores, currentScore, activePlayer, playing, point;

const fartSound = new Audio('./sounds/switch.wav');
const reset = new Audio('./sounds/reset.wav');
const fetchit = new Audio('./sounds/fetch.wav');
const dicerole = new Audio('./sounds/diceroll.wav');
const victory = new Audio('./sounds/victory.mp3');

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  point = Number(targetPoint.value) === 0 ? 50 : Number(targetPoint.value);
  console.log(point);

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  arrow0El.classList.add('arrow--active');
  arrow1El.classList.remove('arrow--active');
  reset.play();
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  arrow0El.classList.toggle('arrow--active');
  arrow1El.classList.toggle('arrow--active');
};
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dices/dice-${dice}.png`;
    dicerole.play();
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
      fartSound.play();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    fetchit.play();
    if (scores[activePlayer] >= point) {
      playing = false;
      victory.play();
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
