import "./css/style.scss";

import data from "../data/db.json"
import Background from "./components/background";
import { ButtonGroup, Button } from "./components/button";
import { Card, CardGroup } from "./components/card";

// console.log(data);

const imagesInfo = data.images;
const buttonsInfo = data.buttons;

let background1 = new Background(imagesInfo[1].address);  //展示的background
let background2 = new Background(imagesInfo[0].address);  //被压在下面的background

const body = document.querySelector("body");

body.appendChild(background1.dom);
body.appendChild(background2.dom);

const buttonGroup = new ButtonGroup();
body.appendChild(buttonGroup.dom);

buttonsInfo.forEach((buttonInfo) => {
  const button = new Button(buttonInfo.classList);
  buttonGroup.add(button);
})

// console.log(buttonGroup);

const left = document.querySelector(".left");
const right = document.querySelector(".right");
const doubleLeft = document.querySelector(".double-left");
const doubleRight = document.querySelector(".double-right");

const cardGroup = new CardGroup();
body.appendChild(cardGroup.dom);

imagesInfo.forEach((imgInfo) => {
  const card = new Card(imgInfo.address);
  cardGroup.add(card);
});


function backgroundChange() {
  body.insertBefore(background2.dom, background1.dom);  //把background2放在background1的前面
  let middleBackground = background2;
  background2 = background1;
  background1 = middleBackground;

  background2.dom.classList.remove("backgroundIn");
  background1.dom.classList.remove("backgroundOut");

  background1.addImageUrl(cardGroup.cardList[1].imageSrc);
  background2.addImageUrl(cardGroup.cardList[0].imageSrc);
}

function btnLeftFunc() {
  if (Button.isWorking) {
    return;
  }

  Button.isWorking = true;  // 这一段时间内不能被触发
  background2.dom.classList.add("backgroundOut");
  background1.dom.classList.add("backgroundIn");

  cardGroup.add(cardGroup.cardList[0]);
  setTimeout(() => {
    backgroundChange();
    Button.isWorking = false;
  }, 500);
}

function btnRightFunc() {
  if (Button.isWorking) {
    return;
  }

  Button.isWorking = true;  // 这一段时间内不能被触发
  background1.addImageUrl(cardGroup.cardList[cardGroup.cardList.length - 1].imageSrc);
  background1.dom.classList.add("backgroundIn");
  background2.dom.classList.add("backgroundOut");

  cardGroup.addFirst(cardGroup.cardList[cardGroup.cardList.length - 1]);
  setTimeout(() => {
    backgroundChange();
    Button.isWorking = false;
  }, 500);
}

left.addEventListener("click", btnLeftFunc);
right.addEventListener("click", btnRightFunc);

const duration = 2500;
let interval = setInterval(() => {
  btnRightFunc();
}, duration);

doubleLeft.addEventListener('click', () => {
  clearInterval(interval);
  btnLeftFunc();
  interval = setInterval(() => {
    btnLeftFunc();
  }, duration);
});

doubleRight.addEventListener('click', () => {
  clearInterval(interval);
  btnRightFunc();
  interval = setInterval(() => {
    btnRightFunc();
  }, duration);
});