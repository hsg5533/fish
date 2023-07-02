"use strict";
import { Field as t, ItemType as i } from "./field.js";
import * as s from "./sound.js";
export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  pause: "pause",
});
export class GameBuilder {
  gameDuration(t) {
    return (this.gameDuration = t), this;
  }
  fishCount(t) {
    return (this.fishCount = t), this;
  }
  urchinCount(t) {
    return (this.urchinCount = t), this;
  }
  fishSizeX(t) {
    return (this.fishSizeX = t), this;
  }
  fishSizeY(t) {
    return (this.fishSizeY = t), this;
  }
  build() {
    return new Game(
      this.gameDuration,
      this.fishCount,
      this.urchinCount,
      this.fishSizeX,
      this.fishSizeY
    );
  }
}
class Game {
  constructor(i, s, e, h, a) {
    (this.GAME_DURATION = i),
      (this.gameDuration = i),
      (this.timer = document.querySelector(".timer")),
      (this.count = document.querySelector(".count")),
      (this.gameBtn = document.querySelector(".game__btn")),
      (this.timerValue = void 0),
      (this.countValue = 0),
      (this.started = !1),
      this.gameBtn.addEventListener("click", () => {
        this.started
          ? this.stop(Reason.pause)
          : ((this.started = !0), this.start());
      }),
      (this.gameField = new t(s, e, h, a, () => this.started)),
      this.gameField.setClickListener(this.onItemClick);
  }
  setShowPopUpListener(t) {
    this.onShowPopUp = t;
  }
  setHidePopUpListener(t) {
    this.onHidePopUp = t;
  }
  onItemClick = (t) => {
    t === i.fish
      ? (++this.countValue, this.fishCount())
      : t === i.urchin && this.stop(Reason.lose);
  };
  start() {
    "" === this.gameField.field.innerHTML && this.gameField.initImage(),
      s.playBg(),
      this.showPauseIcon(),
      this.showTimerAndCount(),
      this.startTimer(),
      this.fishCount(),
      this.onHidePopUp();
  }
  showPauseIcon() {
    let t = document.querySelector(".fa-play");
    t.classList.replace("fa-play", "fa-pause");
  }
  showTimerAndCount() {
    this.timer.classList.add("on"), this.count.classList.add("on");
  }
  startTimer() {
    this.updateTimerText(this.gameDuration),
      (this.timerValue = setInterval(() => {
        this.updateTimerText(--this.gameDuration),
          this.gameDuration <= 0 &&
            (this.stop(Reason.lose), clearInterval(this.timerValue));
      }, 1e3));
  }
  fishCount() {
    (this.count.innerHTML = this.gameField.fishCount - this.countValue),
      this.gameField.fishCount === this.countValue && this.stop(Reason.win);
  }
  updateTimerText(t) {
    let i = `0${Math.floor(t / 60)}`.substr(-2),
      s = `0${Math.floor(t % 60)}`.substr(-2);
    this.timer.innerHTML = `${i}:${s}`;
  }
  stop(t) {
    this.stopTimer(),
      (this.started = !1),
      this.onShowPopUp(t),
      s.stopBg(),
      t === Reason.pause ? this.hidePauseIcon() : this.hideGameBtn();
  }
  stopTimer() {
    clearInterval(this.timerValue);
  }
  hidePauseIcon() {
    let t = document.querySelector(".fa-pause");
    t.classList.replace("fa-pause", "fa-play");
  }
  hideGameBtn() {
    this.hidePauseIcon(), (this.gameBtn.style.visibility = "hidden");
  }
  restart() {
    s.stopWin(),
      (this.gameBtn.style.visibility = "visible"),
      (this.started = !0),
      (this.gameDuration = this.GAME_DURATION),
      (this.countValue = 0),
      this.gameField.initImage(),
      this.start();
  }
}
