function dessinerCarre() {
  for (let x = 0; x < nbColonne; x++) {
    for (let y = 0; y < nbLigne; y++) {
      if (grid[y][x] === 0) {
        fill(100, 100, 255, 40);
        //fond
      } else if (grid[y][x] === 1) {
        fill(0, 0, 255);
        //bleu eau
      } else if (grid[y][x] === 2) {
        fill(225, 45, 45);
        //rouge lave
      } else if (grid[y][x] === 3) {
        fill(25, 0, 51);
        //violet obsi
      } else {
        fill(125, 125, 125);
        //gris cobble
      }

      square(x * taille, y * taille, taille);
    }
  }
}

//--------------------------------------------

function isCarreVide(x, y) {
  return grid[x] && typeof grid[x][y] !== "undefined" && grid[x][y] === 0;
}

/* 
  Recettes:
    quand bloc du haut = eau et bloc du dessous = lave, bloc de lave devient bloc d'obsidienne
    quand bloc du haut = lave et bloc de dessous = eau, bloc eau devient bloc de cobblestone
    sinon, si il n'y a aucun bloc en dessous, laisser le bloc couler normalement
*/

function gererContactEntreBlocs(x, y) {
  const xDessous = x + 1;
  const yDessous = y;
  const blocDessous = grid[xDessous][yDessous];
  const blocDessus = grid[x][y];
  const VIDE = 0;
  const EAU = 1;
  const LAVE = 2;
  const OBSIDIENNE = 3;
  const COBBLESTONE = 4;

  if (blocDessous === VIDE) {
    const temp = grid[x][y];
    grid[x][y] = 0;
    grid[xDessous][yDessous] = temp;
  } else if (blocDessus === EAU && blocDessous === LAVE) {
    grid[xDessous][yDessous] = OBSIDIENNE;
    playPchit();
  } else if (blocDessus === LAVE && blocDessous === EAU) {
    grid[xDessous][yDessous] = COBBLESTONE;
    playCobble();
  }
}

//-------------------------------------------

function coule(x, y) {
  let carreActu = grid[x][y];
  const estContreBordGauche = typeof grid[x][y - 1] === "undefined";
  const estContreBordDroit = typeof grid[x][y + 1] === "undefined";

  // déclarations de fonctions utilitaires pour meilleure lisibilité du code
  function setBlocBasGauche(valeur) {
    grid[x + 1][y + 1] = valeur;
  }
  function setBlocBasDroite(valeur) {
    grid[x + 1][y - 1] = valeur;
  }
  function setBlocDessus(valeur) {
    grid[x][y] = valeur;
  }

  if (
    (!isCarreVide(x + 1, y - 1) || estContreBordGauche) &&
    (!isCarreVide(x + 1, y + 1) || estContreBordDroit)
  ) {
    grid[x][y] = carreActu;
  } else {
    if (isCarreVide(x + 1, y + 1) && isCarreVide(x + 1, y - 1)) {
      let rand = random([0, 1]);
      if (rand <= 0.5) {
        setBlocBasDroite(carreActu);
        setBlocDessus(0);
      } else {
        setBlocBasGauche(carreActu);
        setBlocDessus(0);
      }
    } else if (isCarreVide(x + 1, y - 1)) {
      setBlocDessus(0);
      setBlocBasDroite(carreActu);
    } else {
      setBlocDessus(0);
      setBlocBasGauche(carreActu);
    }
  }
}

//-------------------------------------------

function miseAJour() {
  for (let x = nbLigne - 1; x >= 0; x--) {
    for (let y = nbColonne - 1; y >= 0; y--) {
      const ligneDessous = grid[x + 1];
      if (!isCarreVide(x, y) && ligneDessous) {
        // 1) gérer les différentes situations selon le bloc du dessous
        gererContactEntreBlocs(x, y);

        // 2) faire couler le carré à gauche ou à droite si y'a la place
        coule(x, y);
      }
    }
  }
}

//----------------------------------------

function initialiserGrid() {
  for (let i = 0; i < nbLigne; i++) {
    let ligneTableau = [];
    for (let j = 0; j < nbColonne; j++) {
      ligneTableau.push(0);
    }

    grid.push(ligneTableau);
  }
}

//-------------------------------------------

function mousePressed() {
  let x = Math.floor((mouseX - offsetWidth) / taille);
  let y = Math.floor((mouseY - offsetHeight) / taille);

  if (grid[y][x] === 1) {
    grid[y][x] = 0;
  } else if (mouseButton === LEFT) {
    grid[y][x] = 1;
  } else {
    grid[y][x] = 2;
  }
}
