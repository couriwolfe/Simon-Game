/*
The part of this code that I am the most proud of is that this code is based on a project that was done entirely in ES5 and jQuery. I refactored the entire code myself to use only vanilla JavaScript, and also converted it to ES6.
*/

const buttonColors = ['green', 'red', 'yellow', 'blue'];

let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

let startBtn = document.getElementById('start-btn');

// Starting and resetting game
const startGame = () => {
  started = true;
  startBtn.setAttribute('disabled', true);
  startBtn.classList.add('disabled-btn');
  nextSequence();
}

const resetGame = () => {
  started = false;
  gamePattern = [];
  userPattern = [];
  level = 0;
  startBtn.removeAttribute('disabled');
  startBtn.classList.remove('disabled-btn');
  document.getElementsByTagName('body')[0].classList.remove('game-over');
  document.getElementById('screen').innerText = '--';
}

// Game logic
const nextSequence = () => {
  userPattern = [];

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  animateGameButton(randomChosenColor);
  playSound(randomChosenColor);

  ++level;

  document.getElementById('screen').innerText = level;
}

const userClickedPattern = ((e) => {
  const userClickedColor = e.target.getAttribute('id');
  userPattern.push(userClickedColor);
  animateGameButton(userClickedColor);
  playSound(userClickedColor);
  checkAnswer(userPattern.length - 1);
});

const checkAnswer = (currentLevel) => {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    document.getElementsByTagName('body')[0].classList.add('game-over');
    const audio = new Audio('sounds/wrong.mp3');
    audio.play();
  }
}

//Game animation and sound
const animateGameButton = (color) => {
  document.getElementById(color).classList.add('background-change');

  setTimeout(() => {
    document.getElementById(color).classList.remove('background-change');
  }, 100);
}

const playSound = (color) => {
  const audio = new Audio('sounds/' + color + '.mp3');
  audio.play();
}

// Event listeners
const allButtons = document.getElementsByClassName('game-button');

for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener('click', userClickedPattern);
}

startBtn.addEventListener('click', startGame);
document.getElementById('reset-btn').addEventListener('click', resetGame);
