"use strict";
import * as t from "./sound.js";
export const ItemType = Object.freeze({ fish: "fish", urchin: "urchin" });
export class Field {
  constructor(t, i, e, s, h) {
    (this.fishCount = t),
      (this.urchinCount = i),
      (this.fishSizeX = e),
      (this.fishSizeY = s),
      (this.isGameRunning = h),
      (this.field = document.querySelector(".game__field")),
      (this.fieldRect = this.field.getBoundingClientRect()),
      this.field.addEventListener("click", (t) => {
        this.onClick(t);
      });
  }
  setClickListener(t) {
    this.onItemClick = t;
  }
  initImage() {
    (this.field.innerHTML = ""),
      this.addItem("fish", "./img/fish.png", this.fishCount),
      this.addItem("urchin", "./img/urchin.png", this.urchinCount);
  }
  addItem(t, i, e) {
    let s = this.fieldRect.width,
      h = this.fieldRect.height,
      n = s - this.fishSizeX,
      l = h - this.fishSizeY;
    for (let c = 0; c < e; c++) {
      let r = document.createElement("img");
      r.setAttribute("class", t),
        r.setAttribute("alt", t),
        r.setAttribute("src", i);
      let o = Math.random() * n,
        f = Math.random() * l;
      (r.style.top = `${f}px`),
        (r.style.left = `${o}px`),
        this.field.appendChild(r);
    }
  }
  onClick(i) {
    if (!this.isGameRunning()) return;
    let e = i.target;
    e.matches(".fish")
      ? (e.remove(),
        t.playCatch(),
        this.onItemClick && this.onItemClick(ItemType.fish))
      : e.matches(".urchin") &&
        (t.playLose(), this.onItemClick && this.onItemClick(ItemType.urchin));
  }
}
