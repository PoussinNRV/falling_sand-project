let cobble;
let pchit;
function preload() {
  soundFormats("mp3");
  cobble = loadSound("../public/sounds/cobble.mp3");
  pchit = loadSound("../public/sounds/pchit.mp3");
}

function playCobble() {
  cobble.play();
}

function playPchit() {
  pchit.playMode("restart");
  pchit.play();
}
