"use strict";
import e from "./popup.js";
import { GameBuilder as p } from "./game.js";
let gamePopUp = new e(),
  game = new p()
    .gameDuration(10)
    .fishCount(15)
    .urchinCount(15)
    .fishSizeX(100)
    .fishSizeY(56)
    .build();
gamePopUp.setClickListener(() => {
  game.restart();
}),
  game.setShowPopUpListener((e) => {
    gamePopUp.showPopUp(e);
  }),
  game.setHidePopUpListener(() => {
    gamePopUp.hidePopUp();
  });
