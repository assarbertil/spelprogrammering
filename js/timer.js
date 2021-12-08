// Timer
let timer;

function createTimer() {
  if (document.getElementById("timer")) {
    timer.remove();
  }
  timer = document.createElement("div");
  timer.id = "timer";
  container.append(timer);
}

function removeTimer() {
  minTimer = document.getElementById("timer");
  minTimer.remove();
}

// Display time
let points = 0;

function showTime() {
  points++;

  document.getElementById("timer").innerText = `${points.toString()} Poäng`;
}
