import "./css/style.scss";

import data from "../data/db.json"
import Background from "./components/background";
import { ButtonGroup, Button } from "./components/button";

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

function backgroundChange() {
  body.insertBefore(background2.dom, background1.dom);  //把background2放在background1的前面
  let middleBackground = background2;
  background2 = background1;
  background1 = middleBackground;

  background2.dom.classList.remove("backgroundIn");
  background1.dom.classList.remove("backgroundOut");
}

function btnLeftFunc() {
  background2.dom.classList.add("backgroundOut");
  background1.dom.classList.add("backgroundIn");
  setTimeout(() => {
    backgroundChange();
  }, 500);
}

function btnRightFunc() {
  background1.dom.classList.add("backgroundIn");
  background2.dom.classList.add("backgroundOut");
  setTimeout(() => {
    backgroundChange();
  }, 500);
}

left.addEventListener("click", btnLeftFunc);
right.addEventListener("click", btnRightFunc);