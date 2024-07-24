const area = document.querySelector(".poparea");
const hitdisplay = document.querySelector(".hitdisplay");
const timerdisplay = document.querySelector(".timerdisplay");
const scoredisplay = document.querySelector(".scoredisplay");
let time = 60;
let score = 0;
let count = 0; //for running the timer at count 1 only
let timers;
const audio = new Audio("Pop sound effect.mp3");
const wrongAudio = new Audio("wrong-answer.mp3");

var getNewHit = function getNewHit() {
  hit = Math.floor(Math.random() * 10 + 1);
  hitdisplay.textContent = hit;
};

function makeCircle() {
  let clutter = "";
  for (let i = 1; i <= 102; i++) {
    const randomDisplayNumber = Math.floor(Math.random() * 10 + 1);
    clutter += `<div id=${i} class="circle">${randomDisplayNumber}</div>`;
  }

  area.innerHTML = clutter;
}

function timer() {
  if (count == 1) {
    timers = setInterval(function () {
      if (time > 0) {
        if (time <= 10) {
          timerdisplay.style.color = "red";
        }
        time--;
        timerdisplay.innerHTML = time;
      } else {
        alert(`Your Score: ${score}`);
        clearInterval(timers);
        timers = null; // Reset timer variable
        resetGame();
      }
    }, 1000);
  }
}

function scoreDisplay() {
  scoredisplay.innerHTML = score;
}

function hojashuru() {
  area.addEventListener("click", (dets) => {
    if (dets.target.classList.contains("circle")) {
      if (timerdisplay.textContent == 60) {
        count++;
        timer();
        makeCircle();
      }

      if (dets.target.textContent === `${hit}`) {
        score += 10;
        audio.currentTime = 0;
        audio
          .play()
          .catch((error) => console.error("Error playing sound:", error));
        makeCircle();
        getNewHit();
        scoreDisplay();
      } else {
        const circletobered = dets.target.id;
        const circle = document.getElementById(circletobered);
        console.log(circle);
        circle.style.backgroundColor = "red";
        wrongAudio.currentTime = 0;
        wrongAudio.play();
        setTimeout(() => {
          makeCircle();
          getNewHit();
        }, 300);
      }
    }
  });
}

function resetGame() {
  count = 0;
  score = 0;
  time = 60;
  timerdisplay.style.color = "white";
  scoredisplay.innerHTML = score;
  timerdisplay.innerHTML = time;
  getNewHit();
  makeCircle();
}

window.onload = function () {
  getNewHit();
  makeCircle();
  hojashuru();
};
