'use strict';

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnShake = document.querySelector('.btn--shake');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let lastScore = 0;
score1.innerText = 0;
score0.innerText = 0;

let currentScore = 0;
let score = 0;
let scores = [0, 0];

let activePlayer = 0;
let playing = true;
let stopShake = true;
diceEL.classList.add('hidden');
let shake;

btnShake.addEventListener('click', function () {
  if (stopShake) {
    shake = Math.trunc(Math.random() * 6) + 1;
    console.log(shake);
    playing = true;
  }
});

btnRoll.addEventListener('click', function () {
  if (playing && stopShake) {
    //1. generate a random dice roll
    var show;
    let dice = shake;

    //------------------------------------
    if (localStorage.lastDiceRolls) {
      var show = JSON.parse(localStorage.getItem('lastDiceRolls'));
      // show.push(dice);
    } else {
      show = [];
      localStorage.setItem('lastDiceRolls', JSON.stringify(show));
    }

    if (dice) {
      show = JSON.parse(localStorage.getItem('lastDiceRolls'));
      show.push(dice);
      localStorage.setItem('lastDiceRolls', JSON.stringify(show));

      if (show.length > 2) {
        show = JSON.parse(localStorage.getItem('lastDiceRolls'));
        show.splice(0, 1);
        localStorage.setItem('lastDiceRolls', JSON.stringify(show));
      }
    }
    //---------------------------------------------------------

    // to dispaly the dice whne rolled
    diceEL.classList.remove('hidden');
    diceEL.src = `./assets/dice-${dice}.png`;

    function togglePlayer() {
      player1.classList.toggle('player--active');
      player0.classList.toggle('player--active');
    }

    //check for a rolled 2,3,4,5,1 and swidth to the next player
    if (dice != 6 && show[1] != 6 && show[0] != 6) {
      currentScore = dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore; //Add to the current score

      playing = false;
      stopShake = false;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;
      // document.querySelector(`#current--${activePlayer}`).textContent = 0;
      // player1.classList.toggle('player--active');
      // player0.classList.toggle('player--active');
    }

    //check if 6 and check if 6 was rolled afterwards
    if (dice == 6 && show[1] == 6) {
      // add to the dice current score whithout swithcing to the next player
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).innerText =
        currentScore;
      stopShake = true;

      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;
      // document.querySelector(`#current--${activePlayer}`).textContent = 0;
      // player1.classList.toggle('player--active');
      // player0.classList.toggle('player--active');
    }

    // //When another number is rolled after six was rolled
    if (dice != 6 && show[0] == 6) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).innerText =
        currentScore;
      playing = false;
      stopShake = false;
    }
  }
  playing = false;
});

btnHold.addEventListener('click', function () {
  //check the current player
  diceEL.classList.add('hidden');
  playing = true;
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).innerText =
    scores[activePlayer];
  console.log(activePlayer);
  document.querySelector(`#current--${activePlayer}`).innerText = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player0.classList.toggle('player--active');
  playing = false;
  stopShake = true;
  //move what is at the current player score into the mains score
  //chnage the current player score to Zero
  //switch the player to a new player
});
