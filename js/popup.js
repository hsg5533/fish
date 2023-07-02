"use strict";
import { Reason as e } from "./game.js";
import * as t from "./sound.js";
export default class p {
  constructor() {
    (this.popUp = document.querySelector(".game__popup")),
      (this.popUpText = document.querySelector(".popup__text")),
      (this.replayBtn = document.querySelector(".popup__replay__btn")),
      this.replayBtn.addEventListener("click", () => {
        this.onClick && this.onClick();
      });
  }
  setClickListener(e) {
    this.onClick = e;
  }
  showPopUp(p) {
    let s;
    switch (p) {
      case e.pause:
        t.playAlert(), (s = "Replay❓");
        break;
      case e.win:
        t.playWin(), (s = "You Won 🎉");
        break;
      case e.lose:
        t.playLose(), (s = "You Lost 💀");
        break;
      default:
        throw Error("not valued reason");
    }
    (this.popUpText.innerHTML = s), this.popUp.classList.add("on");
  }
  hidePopUp() {
    this.popUp.classList.remove("on");
  }
}
