"use strict";
let alertSound = new Audio("./sound/alert.wav"),
  winSound = new Audio("./sound/win.wav"),
  loseSound = new Audio("./sound/lose.wav"),
  catchSound = new Audio("./sound/catch.wav"),
  bgSound = new Audio("./sound/bg.mp3");
function playSound(n) {
  (n.currentTime = 0), n.play();
}
function stopSound(n) {
  n.pause();
}
export function playAlert() {
  (alertSound.volume = 0.5), playSound(alertSound);
}
export function playWin() {
  (winSound.volume = 0.3), playSound(winSound);
}
export function stopWin() {
  stopSound(winSound);
}
export function playLose() {
  (loseSound.volume = 0.4), playSound(loseSound);
}
export function playCatch() {
  (catchSound.volume = 0.5), playSound(catchSound);
}
export function playBg() {
  (bgSound.volume = 0.2), playSound(bgSound);
}
export function stopBg() {
  stopSound(bgSound);
}
