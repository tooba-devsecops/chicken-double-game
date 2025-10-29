const body = document.querySelector("body");
const betButton = document.getElementById("bet-button");
const betForm = document.getElementById("bet-form");
const inputElement = document.getElementById("champ");
const ulgame = document.getElementById("dish-covers");
const ligame = ulgame.children;
const decreaseBonesButton = document.getElementById("decrease-bone-btn");
const increaseBonesButton = document.getElementById("increase-bone-btn");
const numberOfBone = document.getElementById("bet-button");
const decreaseMoneyButton = document.getElementById("decrease-money-btn");
const increaseMoneyButton = document.getElementById("increase-money-btn");
const headerBalance = document.getElementById("header-balance");
const balance = document.getElementById("balance");
const betInput = document.getElementById("bet-input");
const boneInput = document.getElementById("bone-input");
const history = document.getElementById("history");
const gainDiv = document.getElementById("gain");
const betDiv = document.getElementById("bet-cashout");
const countOfChicken = document.getElementById("chickencount");
const countOfbone = document.getElementById("bonecount");
let bonesCount = 1;
let money = 5;
let NumberOfChicken = 0;
let Solde = 1000.0;
let info = {};
let NumberOfGame = 0;

function TotalOfBone(NumberOfBone) {
  for (let a = 0; a < ulgame.children.length; a++) {
    ulgame.children[a].dataset.etat = undefined;
    ulgame.children[a].innerHTML = '<img src="./img/closed-dish-cover.png" alt="" />';
  }

  const urlParams = new URLSearchParams(window.location.search);
  const numberOfBonesToShow = parseInt(urlParams.get('bones')) || 1;

  const availablePositions = Array.from({ length: ulgame.children.length }, (_, i) => i + 1);
  shuffleArray(availablePositions);

  for (let i = 0; i < numberOfBonesToShow; i++) {
    const position = availablePositions[i];
    const liElement = document.getElementById(position);

    const bonesCountElement = document.createElement("img");
    bonesCountElement.src = "./img/bone-icon.png";
    bonesCountElement.alt = "";

    liElement.innerHTML = "";
    liElement.appendChild(bonesCountElement);
    liElement.dataset.etat = "Bone";
  }
}

function changeAllLi(a) {
  ligame[a].children[0].classList.add("hide");

  setTimeout(function () {
    if (ligame[a].dataset.etat == "Bone") {
      ligame[a].children[0].src = "./img/os_jeu_du_poulet-removebg-preview.png";
      ligame[a].children[0].classList.remove("hide");
    } else {
      ligame[a].children[0].src = "./img/Cloche-ouverte-poulet.png";
      ligame[a].children[0].classList.remove("hide");
    }
  }, 115);
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

for (let a = 0; a < ligame.length; a++) {
  changeAllLi(a);
}

TotalOfBone(bonesCount);
