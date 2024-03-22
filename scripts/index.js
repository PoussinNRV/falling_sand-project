const canevasContainer = document.getElementById("canevas");
const canevasHeight = canevasContainer.clientHeight;
const canevasWidth = canevasContainer.clientWidth;
const taille = 10;
const nbColonne = Math.floor(canevasWidth / taille);
const nbLigne = Math.floor(canevasHeight / taille);
const grid = [];

const offsetWidth = (canevasWidth - nbColonne * taille) / 2;
const offsetHeight = (canevasHeight - nbLigne * taille) / 2;

function setup() {
  createCanvas(canevasWidth, canevasHeight);
  initialiserGrid();
}

function draw() {
  frameRate(240);
  noStroke();
  background("#fbfbf0");
  translate(offsetWidth, offsetHeight);
  dessinerCarre();
  miseAJour();
}
