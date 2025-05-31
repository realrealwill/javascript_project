export class Button {
  static isWorking = false;
  classList = [];
  dom;
  constructor(classList = []) {
    this.classList = classList;
    this.createDom();
  }

  createDom() {
    this.dom = document.createElement("div");
    this.dom.classList.add("btn");
    this.dom.classList.add(...this.classList);  // 所有className加入
  }
}

export class ButtonGroup {
  static instance = null;
  buttonList = [];
  dom;

  constructor() {
    if (ButtonGroup.instance) {  //已经被创造: undefined null 0 ''一律按照false处理
      // 单例模式
      return ButtonGroup.instance;
    }
    ButtonGroup.instance = this;  // 创造好的instance
    this.createDom();
  }

  createDom() {
    this.dom = document.createElement("div");
    this.dom.classList.add("btn-grp");
  }

  add = (button) => {
    if (button && button.dom) {
      this.buttonList.push(button);
      this.dom.appendChild(button.dom);
    }
  }
  remove = (button) => {
    if (button && button.dom) {
      this.buttonList = this.buttonList.filter((item) => {
        return item !== button;
      });
      this.dom.removeChild(button.dom);
    }
  }

  clear = () => {
    this.buttonList.forEach((button) => {
      this.dom.removeChild(button.dom);
    });
    this.buttonList = [];
  }
}