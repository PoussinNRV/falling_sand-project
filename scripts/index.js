const canevasContainer = document.getElementById("canevas");
const canevasHeight = canevasContainer.clientHeight;
const canevasWidth = canevasContainer.clientWidth;
const taille = 20;
const nbColonne = Math.floor(canevasWidth / taille);
const nbLigne = Math.floor(canevasHeight / taille);
const grid = [];

const offsetWidth = (canevasWidth - nbColonne * taille) / 2;
const offsetHeight = (canevasHeight - nbLigne * taille) / 2;

function initialiserGrid() {
  for (let i = 0; i < nbLigne; i++) {
    let ligneTableau = [];
    for (let j = 0; j < nbColonne; j++) {
      ligneTableau.push(0);
    }

    grid.push(ligneTableau);
  }
}

function mousePressed() {
  let x = Math.floor((mouseX - offsetWidth) / taille);
  let y = Math.floor((mouseY - offsetHeight) / taille);

  if (grid[y][x] === 1) {
    grid[y][x] = 0;
  } else {
    grid[y][x] = 1;
  }
}

function setup() {
  createCanvas(canevasWidth, canevasHeight);
  initialiserGrid();
}

function draw() {
  frameRate(240);
  stroke("black");
  background("#fbfbf0");
  translate(offsetWidth, offsetHeight);

  // dessin des carrés à partir du tableau grid
  for (let x = 0; x < nbColonne; x++) {
    for (let y = 0; y < nbLigne; y++) {
      if (grid[y][x] == 0) {
        fill(100, 100, 255, 50);
      } else {
        fill(200, 200, 0);
      }

      square(x * taille, y * taille, taille);
    }
  }

  for (let y = nbLigne - 1; y >= 0; y--) {
    for (let x = nbColonne; x >= 0; x--) {
      let carreActu = grid[y][x];
      const ligneDessous = grid[y + 1];
      if (carreActu === 1) {
        if (ligneDessous) {
          if (ligneDessous[x] === 0) {
            grid[y][x] = 0;
            grid[y + 1][x] = 1;
          } else {
            const carreBasGauche = grid[y + 1][x - 1];
            const carreBasDroit = grid[y + 1][x + 1];
            const estContreBordGauche = typeof grid[y][x - 1] === "undefined";
            const estContreBordDroit = typeof grid[y][x + 1] === "undefined";
            if (
              (carreBasGauche === 1 || estContreBordGauche) &&
              (carreBasDroit === 1 || estContreBordDroit)
            ) {
              grid[y][x] = 1;
            } else if (carreBasGauche === 0) {
              grid[y][x] = 0;
              grid[y + 1][x - 1] = 1;
            } else {
              grid[y][x] = 0;
              grid[y + 1][x + 1] = 1;
            }
          }
        }
      }
    }
  }
}
