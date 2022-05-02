const departMinutes = 1;
let temps = departMinutes * 60;

const timerElement = document.getElementById("timer");

var card = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
var etats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var r = [];
var nbWin = 0;
var win = false;
var imgCartes = document.getElementById("jeu").getElementsByTagName("img");
var img = document.createElement("img");

card = card.sort(() => Math.random() - 0.5);

//-----------------Image----------------------//

function majAffichage(index) {
  switch (etats[index]) {
    case 0:
      imgCartes[index].src = "Card.jpg";
      break;
    case 1:
      imgCartes[index].src = "Card" + card[index] + ".jpg";
      break;
    case -1:
      imgCartes[index].style.visibility = "visible";
      break;
  }
}

//--------------Fonctionnement du jeu--------------------//

function controleJeu(index) {
  if (r.length < 2) {
    switch (etats[index]){ 
      case 1 :
        etats[index] = 0;
        r.pop(index);
        majAffichage(index);
        break;
      case 0 :
        etats[index] = 1;
        r.push(index);
        majAffichage(index);
        break;
    }
    if (r.length == 2) {
      var newC = 0;
      if (card[r[0]] == card[r[1]]) {
        newC = -1;
        nbWin++;
      }
      if (nbWin == 9) {
        win = true;
        endGame();
      }

      etats[r[0]] = newC;
      etats[r[1]] = newC;

      setTimeout(function () {
        majAffichage(r[0]);
        majAffichage(r[1]);
        r = [];
      }, 600);
    }
  }
}

//-----------timer----------//

setInterval(() => {
  if (temps==0){
    endGame();
  }
  let minutes = parseInt(temps / 60, 10);
  let secondes = parseInt(temps % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  secondes = secondes < 10 ? "0" + secondes : secondes;

  timerElement.innerText = `${minutes}:${secondes}`;
  temps = temps <= 0 ? 0 : temps - 1;
}, 1000);

//----------------fin de partie--------------//

function endGame(){
  
  if (win){ 
    temps = 0;
    img.src = "./img/Win.png";
  }
  else {
    img.src = "./img/Trop_Tard.png";
  }

  document.getElementById("jeu").setAttribute("style", "opacity:0.5");
  var div = document.getElementById("game");
  div.appendChild(img);
  div.setAttribute("style", "margin:20%");
  div.setAttribute("onClick", "history.go(0)");

  img = document.body.innerHTML;
}
