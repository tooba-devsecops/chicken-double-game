const body = document.querySelector("body");

const betButton = document.getElementById("bet-button");
const betForm = document.getElementById("bet-form");

const inputElement = document.getElementById("champ"); //

const ulgame = document.getElementById("dish-covers"); //

const ligame = ulgame.children; //

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

function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
}

function updateTimer() {
  let time = 0;
  const timerElement = document.getElementById("timer");

  setInterval(() => {
    time++;
    timerElement.textContent = formatTime(time);
  }, 1000);
}

window.addEventListener("load", updateTimer);

function TotalOfBone(NumberOfBone) {
  bones = [];
  for (let a = 0; a < ulgame.children.length; a++) {
    ulgame.children[a].dataset.etat = undefined;
    ulgame.children[a].children[0].src = "./img/closed-dish-cover.png";
  }

  for (let i = 0; i < NumberOfBone; i++) {
    let randomNumber = Math.floor(Math.random() * 25) + 1;
    const bonesCountElement = document.getElementById(randomNumber);
    if (bonesCountElement.dataset.etat == "Bone") {
      i--;
    } else {
      bonesCountElement.dataset.etat = "Bone"
      bones.push(randomNumber);
    }
  }
  localStorage.setItem("bones", bones);
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

  betButton.classList.remove("checkout");
  betDiv.textContent = "Bet";
  document.getElementById("Total-Win").textContent = "Total Win";
  document.getElementById("Next-Title-Win").textContent = "Next Title Win";
}

function attachDishCoversListeners() {
  for (let i = 0; i < ligame.length; i++) {
    const child = ligame[i];
    child.addEventListener("click", function (e) {
      if (e.currentTarget.dataset.etat == "Bone") {
        for (let a = 0; a < ligame.length; a++) {
          changeAllLi(a);
        }
        betDiv.textContent = "Bet";
        gainDiv.textContent = "";
      } else {
        e.currentTarget.children[0].src = "./img/Cloche-ouverte-poulet.png";
        refreshGain();
      }
    });
  }
}

function refreshMoney() {
  if (money == 1000) {
    increaseMoneyButton.classList.add("newbuttons");
  } else {
    increaseMoneyButton.classList.remove("newbuttons");
  }
  if (money == 1) {
    decreaseMoneyButton.classList.add("newbuttons");
  } else {
    decreaseMoneyButton.classList.remove("newbuttons");
  }
}
function refreshBone() {
  if (bonesCount == 24) {
    increaseBonesButton.classList.add("newbuttons");
  } else {
    increaseBonesButton.classList.remove("newbuttons");
  }
  if (bonesCount == 1) {
    decreaseBonesButton.classList.add("newbuttons");
  } else {
    decreaseBonesButton.classList.remove("newbuttons");
  }
}

decreaseBonesButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (bonesCount != 1) {
    bonesCount--;
  }
  boneInput.value = bonesCount;
  refreshBone();
  refreshCount();
});
increaseBonesButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (bonesCount < 24) {
    bonesCount++;
  }
  boneInput.value = bonesCount;
  refreshBone();
  refreshCount();
});

increaseMoneyButton.addEventListener("click", (e) => {
  if (money > 1000) {
    return;
  }
  if (money < 10) {
    money += 1;
  } else if (money < 30) {
    money += 5.0;
  } else if (money < 100) {
    money += 10.0;
  } else if (money < 300) {
    money += 50;
  } else {
    money += 100;
  }
  refreshMoney();
  betInput.value = money + ",00";
});

decreaseMoneyButton.addEventListener("click", function (e) {
  if (money < 0.2) {
    return;
  }
  if (money < 10) {
    money--;
  } else if (money < 30) {
    money -= 5;
  } else if (money < 100) {
    money -= 10;
  } else if (money < 300) {
    money -= 50;
  } else {
    money -= 100;
  }
  betInput.value = money + ",00";
  refreshMoney();
});

betForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (balance == 0) {
    return;
  }
  if (betButton.classList[1] === "checkout") {
    betDiv.textContent = "Cashout";
    onBetWin(NumberOfGame);
    for (let a = 0; a < ligame.length; a++) {
      changeAllLi(a);
    }
    createAnUl(info);
  } else {
    const now = new Date();
    const heure = now.getHours();
    const minutes = now.getMinutes();
    const secondes = now.getSeconds();

    attachDishCoversListeners();
    TotalOfBone(bonesCount);
    betDiv.textContent = "Cashout";
    betButton.classList.add("checkout");
    refreshSolde();
    info[NumberOfGame] = {
      time: [heure, minutes, secondes],
      bet: money,
      Coef: bonesCount,
      win: 0,
      Currency: "EUR",
    };
    NumberOfGame++;
    refreshGain();
  }
});

function onBetWin(NumberOfGame) {
  // balance.children[0].textContent = Solde;
  balance.textContent =
    Solde + money + reward(money, howMuchChicken(), bonesCount);
  Solde = Solde + money + reward(money, howMuchChicken(), bonesCount);
  info[NumberOfGame - 1].win = info[NumberOfGame - 1].bet + bonesCount * money;
  headerBalance.textContent = Solde.toFixed(2);
  Solde = Solde.toFixed(2);
  gainDiv.textContent = "";
}

function refreshSolde() {
  Solde = Solde - money;
  balance.textContent = Solde.toFixed(2);
  headerBalance.textContent = Solde.toFixed(2);
}

betInput.addEventListener("click", (e) => {
  e.preventDefault();
  betInput.select();
  betInput.setSelectionRange(0, betInput.value.length);
});
betInput.addEventListener("input", function (e) {
  e.preventDefault();
  const inputValue = betInput.value;
  const numericValue = inputValue.replace(/\D/g, "");
  betInput.value = numericValue;

  let value = betInput.value.trim();
  money = value;
  money = parseInt(money);
});

// attach bone input listeners
boneInput.addEventListener("click", (e) => {
  boneInput.setSelectionRange(0, boneInput.value.length);
  boneInput.select();
});
boneInput.addEventListener("input", function (e) {
  e.preventDefault();
  const inputvalue = boneInput.value;
  const numericvalue = inputvalue.replace(/\D/g, "");
  boneInput.value = numericvalue;

  let value = boneInput.value.trim();
  boneInput.value = numericvalue;
  bonesCount = value;
  refreshCount();
});

function block(input) {
  input.addEventListener("input", function (e) {
    e.preventDefault();
    const value = parseFloat(input.value);

    if (isNaN(value)) {
      input.value = "";
    } else if (value < 0.2) {
      input.value = "0.2";
      money = 0.2;
    } else if (value > 1000) {
      input.value = "1000";
      money = 1000;
    }
  });
}

function blockBone(input) {
  input.addEventListener("input", function (e) {
    e.preventDefault;
    const value = parseFloat(input.value);

    if (isNaN(value)) {
      input.value = "";
    } else if (value < 1) {
      input.value = "1";
    } else if (value > 24) {
      input.value = "24";
    }
  });
}
function createAnUl(info) {
  const ul = document.createElement("ul");
  const li1 = document.createElement("li");
  const li2 = document.createElement("li");
  const li3 = document.createElement("li");
  const li4 = document.createElement("li");
  const li5 = document.createElement("li");

  ul.classList.add("history-element");
  li1.classList.add("li-history");
  li2.classList.add("li-history");
  li3.classList.add("li-history");
  li4.classList.add("li-history");
  li5.classList.add("li-history");
  if (info[NumberOfGame - 1].time[0] < 10) {
    info[NumberOfGame - 1].time[0] = "0" + info[NumberOfGame - 1].time[0];
  } else if (info[NumberOfGame - 1].time[1] < 10) {
    info[NumberOfGame - 1].time[1] = "0" + info[NumberOfGame - 1].time[1];
  } else if (info[NumberOfGame - 1].time[2] < 10) {
    info[NumberOfGame - 1].time[2] = "0" + info[NumberOfGame - 1].time[2];
  }

  li1.textContent =
    info[NumberOfGame - 1].time[0] +
    ":" +
    info[NumberOfGame - 1].time[1] +
    ":" +
    info[NumberOfGame - 1].time[2];
  li2.innerHTML = info[NumberOfGame - 1].bet;
  li3.innerHTML = info[NumberOfGame - 1].Coef;
  li4.innerHTML = info[NumberOfGame - 1].win;
  li5.innerHTML = info[NumberOfGame - 1].Currency;

  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  ul.appendChild(li4);
  ul.appendChild(li5);
  history.appendChild(ul);
}

function coef(diamonds, bone) {
  coefs = [
    [
      1.01, 1.08, 1.12, 1.18, 1.24, 1.3, 1.37, 1.46, 1.55, 1.65, 1.77, 1.9,
      2.06, 2.25, 2.47, 2.75, 3.09, 3.54, 4.12, 4.95, 6.19, 8.25, 12.37, 24.75,
    ],
    [
      1.08, 1.17, 1.29, 1.41, 1.56, 1.74, 1.94, 2.18, 2.47, 2.83, 3.26, 3.81,
      4.5, 5.4, 6.6, 8.25, 10.61, 14.14, 19.8, 29.7, 49.5, 99, 297,
    ],
    [
      1.12, 1.29, 1.48, 1.71, 2, 2.35, 2.79, 3.35, 4.07, 5, 6.26, 7.96, 10.35,
      13.8, 18.97, 27.11, 40.66, 65.06, 113.85, 227.7, 569.3, 2277,
    ],
    [
      1.18, 1.41, 1.71, 2.09, 2.58, 3.23, 4.09, 5.26, 6.88, 9.17, 12.51, 17.52,
      25.3, 37.95, 59.64, 99.39, 178.91, 357.81, 834.9, 2504, 12523,
    ],
    [
      1.24, 1.56, 2, 2.58, 3.39, 4.52, 6.14, 8.5, 12.04, 17.52, 26.77, 40.87,
      66.41, 113.85, 208.72, 417.45, 939.26, 2504, 8768, 52598,
    ],
    [
      1.3, 1.74, 2.35, 3.23, 4.52, 6.46, 9.44, 14.17, 21.89, 35.03, 58.38,
      102.17, 189.75, 379.5, 834.9, 2087, 6261, 25047, 175329,
    ],
    [
      1.37, 1.94, 2.79, 4.09, 6.14, 9.44, 14.95, 24.47, 41.6, 73.95, 138.66,
      277.33, 600.87, 1442, 3965, 13219, 59486, 475893,
    ],
    [
      1.46, 2.18, 3.35, 5.26, 8.5, 14.17, 24.47, 44.05, 83.2, 166.4, 356.56,
      831.98, 2163, 6489, 23794, 118973, 1070759,
    ],
    [
      1.55, 2.47, 4.07, 6.88, 12.04, 21.89, 41.6, 83.2, 176.8, 404.1, 1010,
      2828, 9193, 36773, 202254, 2022545,
    ],
    [
      1.65, 2.83, 5, 9.17, 17.52, 35.03, 73.95, 166.4, 404.1, 1077, 3232, 11314,
      49031, 294188, 3236072,
    ],
    [
      1.77, 3.26, 6.26, 12.51, 26.27, 58.38, 138.66, 356.56, 1010, 3232, 12123,
      56574, 367735, 4412826,
    ],
    [
      1.99, 3.81, 7.96, 17.52, 40.87, 102.17, 277.33, 831.98, 2828, 11314,
      56574, 396022, 5148297,
    ],
    [
      2.06, 4.5, 10.35, 25.3, 66.41, 189.75, 600.87, 2163, 9193, 49031, 367735,
      5148297,
    ],
    [2.25, 5.4, 13.8, 37.95, 113.9, 379.5, 1442, 6489, 36773, 294188, 4412826],
    [2.47, 6.6, 18.97, 59.64, 208.7, 834.9, 3965, 23794, 202254, 3236072],
    [2.75, 8.25, 27.11, 99.39, 417.5, 2087, 13219, 118973, 2022545],
    [3.09, 10.61, 40.66, 178.9, 939.3, 6261, 59486, 1070759],
    [3.54, 14.14, 65.06, 357.8, 2504, 25047, 475893],
    [4.12, 19.8, 113.9, 834.9, 8766, 175329],
    [4.95, 29.7, 227.7, 2504, 52598],
    [6.19, 49.5, 569.3, 12523],
    [8.25, 99, 2277],
    [12.38, 297],
    [24.75],
  ];
  return coefs[diamonds - 1][bone - 1];
}

function reward(mise, diamonds, mines) {
  return mise * coef(diamonds, mines);
}

function howMuchChicken() {
  NumberOfChicken = 0;
  for (let i = 0; i < ulgame.children.length; i++) {
    if (
      ulgame.children[i].children[0].src.includes("img/Cloche-ouverte-poulet.png")
    ) {
      NumberOfChicken++;
    }
  }
  return NumberOfChicken;
}

function refreshGain() {
  if (howMuchChicken() == 0) {
    gainDiv.textContent = money + ",00" + " EUR";
    document.getElementById("Total-Win").textContent = "Total win: " + money + ",00 EUR";
  } else {
    gain = money + reward(money, howMuchChicken(), bonesCount);
    gain = gain.toFixed(2) + " EUR";
    gainDiv.textContent = gain;
    document.getElementById("Total-Win").textContent = "Total Win: " + gain;
  }
  document.getElementById("Next-Title-Win").textContent = "Next Title Win: " + (money + reward(money, howMuchChicken()+1, bonesCount)).toFixed(2) + " EUR";
}

function refreshCount() {
  countOfChicken.textContent = 25 - bonesCount;
  countOfbone.textContent = bonesCount;
}



headerBalance.textContent = Solde.toFixed(2);
balance.innerHTML = Solde;
block(betInput);
blockBone(boneInput);
refreshBone();
refreshMoney();
