let container = document.getElementById("container");
let ship = document.getElementById("ship");
let btn = document.createElement("button");
let myShip = document.createElement("div");
myShip.id = "ship";
//btn
btn.innerText = "Starta!";
btn.id = "btn";
document.body.append(btn);
const bezos = document.createElement("img");
function myRestart() {
  document.body.append(btn);
  btn.innerText = "Starta om?";
  btn.id = "end-btn";

  bezos.id = "bezos";
  bezos.src = "./img/jefftext.png";
  document.body.append(bezos);
}

const highScore = document.createElement("div");

let dodging = false;
let roundOver = true;

function areOverlapping(a, b) {
  if (b.start < a.start) {
    return b.finish > a.start;
  } else {
    return b.start < a.finish;
  }
}

if (document.getElementById("high-score")) {
  highScore.remove();
}
function setHighScore() {
  if (JSON.parse(localStorage.getItem("highscore")) !== null) {
    highScore.innerText =
      "High Score: " + JSON.parse(localStorage.getItem("highscore"));
  }
}
setHighScore();

highScore.id = "high-score";
container.append(highScore);

function createAsteroid() {
  let asteroid = document.createElement("div");
  asteroid.classList = "asteroid";
  container.append(asteroid);

  if (Math.random() > 0.75) {
    asteroid.style.backgroundImage = "url('./img/jeffrey.png')";
  }

  let myShip = document.getElementById("ship");

  let right = 0;

  function moveAsteroid() {
    right += 10;
    asteroid.style.right = right + "px";

    // Collision testing
    if (
      !dodging &&
      areOverlapping(
        {
          start: myShip.offsetLeft,
          finish: myShip.offsetLeft + myShip.offsetWidth,
        },
        {
          start: asteroid.offsetLeft,
          finish: asteroid.offsetLeft + myShip.offsetWidth,
        }
      )
    ) {
      if (!roundOver) {
        endRound();
      }

      asteroid.style.filter = "drop-shadow(0 0 1rem #ff770077)";
      myShip.style.filter = "drop-shadow(0 0 1rem #ff770077)";

      clearInterval(asteroidInterval);
      return;
    }
  }

  const asteroidInterval = setInterval(moveAsteroid, 15);
}

// Stages
let stage = 0;

const stages = [
  [1, 2, 3, 4],
  [4, 4.2, 4.4, 4.6],
];

function createShip() {
  myShip.remove();
  myShip.style.filter = null;
  container.append(myShip);

  let latestDirection = "up";

  addEventListener("keypress", e => {
    if (e.key === " ") {
      if (latestDirection === "up") {
        latestDirection = "down";
        dodging = true;
        myShip.style.transform = "translateY(10rem) rotate(-30deg)";
      } else {
        latestDirection = "up";
        dodging = true;
        myShip.style.transform = "translateY(-10rem) rotate(30deg)";
      }

      setTimeout(() => {
        myShip.style.transform = "translateY(0) rotate(0deg)";
      }, 300);

      setTimeout(() => {
        dodging = false;
      }, 600);
    }
  });
}

btn.addEventListener("click", () => {
  btn.remove();
  startRound();
});

let timerInterval;
let asteroidInterval;

function startRound() {
  roundOver = false;

  document.querySelectorAll(".asteroid").forEach(asteroid => asteroid.remove());

  createShip();
  createTimer();

  bezos.remove();

  /*
  let randomNumber;
  function randomizer() {
    randomNumber = Math.floor(Math.random() * 3) + 1;
  }
  */
  asteroidInterval = setInterval(createAsteroid, 1000);

  points = 0;
  second = 0;

  timerInterval = setInterval(showTime, 100);
}

function endRound() {
  console.log("honk honk");
  clearInterval(asteroidInterval);
  clearInterval(timerInterval);

  if (JSON.parse(localStorage.getItem("highscore")) < points) {
    localStorage.setItem("highscore", JSON.stringify(points));
  }

  setHighScore();

  highScore.id = "high-score";
  container.append(highScore);

  myRestart();
  console.log("end round");
}
