let option = "";
let selectedBot = "";
let score = 0;

const items = [
  {
    item: "rock",
    image: "./images/icon-rock.svg",
    color: "var(--rockGradient)",
  },
  {
    item: "paper",
    image: "./images/icon-paper.svg",
    color: "var(--paperGradient)",
  },
  {
    item: "scissors",
    image: "./images/icon-scissors.svg",
    color: "var(--scissorsGradient)",
  },
];

//ROCK > SCISSORS
//SCISSORS > PAPER
//PAPER > ROCK
const array = ["rock", "paper", "scissors"];
const getRandom = () => {
  const random = Math.round(Math.random() * 2 + 1);
  selectedBot = array[random - 1];
  return array[random - 1];
};

//            PLAYER    BOT
const result = (val1, val2) => {
  let resultValue = 0;
  let result = { PLAYER: val1, BOT: val2, RESULT: 0 };
  if (val1 === val2) {
    resultValue = 0;
  } else if (val1 === "rock") {
    if (val2 === "scissors") {
      resultValue = 1;
    } else if (val2 === "paper") {
      resultValue = -1;
    }
  } else if (val1 === "paper") {
    if (val2 === "rock") {
      resultValue = 1;
    } else if (val2 === "scissors") {
      resultValue = -1;
    }
  } else {
    if (val2 === "paper") {
      resultValue = 1;
    } else if (val2 === "rock") {
      resultValue = -1;
    }
  }
  result.RESULT = resultValue;
  return result;
};

function setAnimation(res) {
  setTimeout(() => {
    if (res.RESULT === 1) {
      document.getElementById("selected1").classList.add("animate__shakeX");
      document.getElementById("selected2").classList.remove("animate__shakeX");
    } else if (res.RESULT === -1) {
      document.getElementById("selected1").classList.remove("animate__shakeX");
      document.getElementById("selected2").classList.add("animate__shakeX");
    } else {
      document.getElementById("selected1").classList.remove("animate__shakeX");
      document.getElementById("selected2").classList.remove("animate__shakeX");
    }
  }, 1000);
}
function startGame() {
  const getRandomOption = getRandom();
  setSelections();
  const response = result(option, getRandomOption);
  // setAnimation(response);
  return response;
}

function setScore(result) {
  let aux = 0;
  if (result.RESULT === 1) {
    score++;
    setTimeout(() => {
      document.querySelector(".score-value").innerHTML = score;
    }, 1000);
  } else if (result.RESULT === -1) {
    aux = score;
    score = 0;
    setTimeout(() => {
      document.querySelector(".modal-result").classList.remove("hidden");
      document.querySelector(".final-points").innerHTML = aux;
      document.querySelector(".score-value").innerHTML = score;
    }, 2000);
  }
}
function setSelections() {
  document.querySelector(".game").classList.add("hidden");
  document.querySelector(".match").classList.remove("hidden");
  for (let i = 0; i < items.length; i++) {
    if (items[i].item === option) {
      document.getElementById("img1").setAttribute("src", items[i].image);
      document.getElementById("selected1").style.background = items[i].color;
    }
    if (items[i].item === selectedBot) {
      document
        .getElementById("img2")
        .setAttribute("src", "./images/question.png");
      let a = 0;
      let int = setInterval(() => {
        if (a > 2) {
          a = 0;
          document.getElementById("selected2").style.background =
            items[a].color;
        } else {
          document.getElementById("selected2").style.background =
            items[a].color;
          a++;
        }
      }, 100);
      setTimeout(() => {
        clearInterval(int);
        document.getElementById("selected2").style.background = items[i].color;
        document.getElementById("img2").setAttribute("src", items[i].image);
      }, 1000);
    }
  }
}

function play() {
  const r = startGame();
  setAnimation(r);
  setScore(r);
  setTimeout(() => {
    if (r.RESULT === 0) {
      document.querySelector(".draw").classList.add("show");
      document.querySelector(".draw").classList.add("animate__bounceInLeft");
      setTimeout(() => {
        document
          .querySelector(".draw")
          .classList.remove("animate__bounceInLeft");
        document
          .querySelector(".draw")
          .classList.add("animate__bounceOutRight");
      }, 1000);
    }
  }, 2000);
  setTimeout(() => {
    document.querySelector(".game").classList.remove("hidden");
    document.querySelector(".match").classList.add("hidden");
    document.querySelector(".draw").classList.remove("show");
    document.querySelector(".draw").classList.remove("animate__bounceOutRight");
  }, 4000);
}
//COMENZAR EL JUEGO
document.querySelector(".button-play1").addEventListener("click", function (e) {
  option = "scissors";
  console.log(option);
  play();
  document.getElementById("selected1").classList.remove("animate__shakeX");
  document.getElementById("selected2").classList.remove("animate__shakeX");
});
document.querySelector(".button-play2").addEventListener("click", function (e) {
  option = "paper";
  play();
  document.getElementById("selected1").classList.remove("animate__shakeX");
  document.getElementById("selected2").classList.remove("animate__shakeX");
});
document.querySelector(".button-play3").addEventListener("click", function (e) {
  option = "rock";
  play();
  document.getElementById("selected1").classList.remove("animate__shakeX");
  document.getElementById("selected2").classList.remove("animate__shakeX");
});

//

//MANIPULAR MODAL
document.getElementById("rules").addEventListener("click", function () {
  document.querySelector(".modal").classList.add("show");
});
document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".modal").classList.remove("show");
});
document.querySelector(".closeR").addEventListener("click", function () {
  document.querySelector(".modal-result").classList.add("hidden");
});
