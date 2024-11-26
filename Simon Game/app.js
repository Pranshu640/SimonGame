let gameSeq = [];
let userSeq = [];
let h3 = document.querySelector("h3");
let body = document.querySelector("body");
let btns = ["red", "green", "yellow", "purple"];
let highest = 0;
let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;

//Dynamic button resizing
function resize(screenHeight, screenWidth) {
  console.log("RESIZING");
  const btns = document.querySelectorAll(".btn");
  if (screenHeight <= screenWidth) {
    for (button of btns) {
      button.style.width = `${screenHeight * 0.2}px`;
      button.style.height = `${screenHeight * 0.2}px`;
    }
  } else if (screenHeight > screenWidth) {
    for (button of btns) {
      button.style.width = `${screenWidth * 0.2}px`;
      button.style.height = `${screenWidth * 0.2}px`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  resize(screenHeight, screenWidth);
});

window.addEventListener("resize", () => {
  screenHeight = window.innerHeight;
  screenWidth = window.innerWidth;
  resize(screenHeight, screenWidth);
});

let started = false;

let level = 0;

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;
  let randNum = Math.floor(Math.random() * 4);
  let randColor = btns[randNum];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  btnFlash(randBtn);
}

function checkAns(idx) {
  // console.log("current level: ",level)
  // let idx=level-1;
  if (gameSeq[idx] === userSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h3.innerHTML = `Game over, your score was <b>${level}<b> !<br>press any Key to restart.`;
    reset();
    body.classList.add("danger");
    setTimeout(() => {
      body.classList.remove("danger");
    }, 250);
    highestScore();
  }
}

function btnPress() {
  if (started == true) {
    // console.log(this);
    userFlash(this);

    userColor = this.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
  }
}
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
  btn.addEventListener("touchstart", btnPress); //better for mobiles ig
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

function highestScore() {
  let maxScore = level;
  let scores = [];
  scores.push(maxScore);
  for (maxScore in scores) {
    if (highest < maxScore) {
      highest = maxScore;
      document.createElement("p");
      let MS = document.querySelector("p");
      console.log(MS);
      MS.innerText = `your highest score is: ${highest}`;
      document.body.appendChild(MS);
    }
  }
}
