document.addEventListener('DOMContentLoaded', function () {
  const holes = document.querySelectorAll('.hole');
  const startButton = document.getElementById('startButton');
  const endButton = document.getElementById('endButton');
  const scoreDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('timer');
  const hitSound = document.getElementById('hitSound');

  let timer;
  let score = 0;
  let countdown;
  let moleInterval;

  // Set the initial state to game over
  let gameOver = true;

  console.log('Page loaded.');

  function comeOut() {
    holes.forEach(hole => {
      hole.classList.remove('mole');
      hole.removeEventListener('click', handleMoleClick);
    });

    let random = holes[Math.floor(Math.random() * 9)];

    random.classList.add('mole');
    random.addEventListener('click', handleMoleClick);
  }

  function handleMoleClick() {
    if (!gameOver) {
      score += 100;
      scoreDisplay.textContent = `Score: ${score}`;
      hitSound.play();
    }
    this.classList.remove('mole');
  }

  function startGame() {
    if (!gameOver) {
      
        // Prevent starting the game again if its already in progress
        return;
    }

    gameOver = false;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    timer = 30;
    timerDisplay.textContent = `Time: ${timer}s`;

    startButton.disabled = true;
    endButton.disabled = false;

    countdown = setInterval(() => {
      timer--;
      timerDisplay.textContent = `Time: ${timer}s`;

      if (timer <= 0) {
        clearInterval(countdown);
        endGame();
      }
    }, 1000);

    moleInterval = setInterval(() => {
      if (!gameOver) { comeOut()}
    }, 700);

    console.log('Game started');
  }

  function endGame() {
    clearInterval(countdown);
    clearInterval(moleInterval);
    gameOver = true;
    alert(`Good Job! Your final score is ${score} points!`);
    score = 0;
    timer = 30;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timer}s`;
    startButton.disabled = false;
    endButton.disabled = true;
    holes.forEach(hole => {
      hole.classList.remove('mole');
      hole.removeEventListener('click', handleMoleClick);
      hitSound.pause();
    });
  }

  startButton.addEventListener('click', startGame);
  endButton.addEventListener('click', endGame);
})