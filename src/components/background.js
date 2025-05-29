import {
  createImageUrl
} from "../utils/common.js";

export default class Background {
  imageUrl;
  dom;

  constructor(imageSrc = "", dom = "div") {
    this.createDom(dom);
    this.addImageUrl(imageSrc);
  }

  createDom(dom) {
    this.dom = document.createElement(dom);
    this.dom.classList.add("background");
    
  }

  addImageUrl(imageSrc) { // 需要将src转为url 这个功能写在utils中的common.js里
    this.imageUrl = createImageUrl(imageSrc);
    this.dom.style.backgroundImage = this.imageUrl;
  }
}