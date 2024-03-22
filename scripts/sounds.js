let cobble;
let pchit;
function preload() {
  soundFormats("mp3");
  cobble = loadSound("/sounds/cobble.mp3");
  pchit = loadSound("/sounds/pchit.mp3");
}

function playCobble() {
  cobble.play();
}

function playPchit() {
  pchit.playMode("restart");
  pchit.play();
}
