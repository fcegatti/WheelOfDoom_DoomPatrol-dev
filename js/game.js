let players = JSON.parse(localStorage.getItem("playersKey")); // Traemos el array de jugadores desde el local storage

let listaDeVivos = players; // recibimos el array de jugadores y hacemos un clon

let listaDeMuertos = [];

let jugadorSacrificado = "";

// selecciona un indice aleatorio dentro del array

function killPlayer() {
  if (listaDeVivos.length > 0) {
    //si la longitud del array es mayor a 0 entonces pasa lo siguiente

    let indiceAleatorio = 0 + Math.floor(Math.random() * listaDeVivos.length); //generar un numero entero desde 0 hasta la longitud del array

    let nombreDelJugadorSeleccionado = listaDeVivos[indiceAleatorio].playerName;

    jugadorSacrificado = listaDeVivos[indiceAleatorio].playerName;

    console.log(nombreDelJugadorSeleccionado); //console log del jugador seleccionado

    listaDeMuertos.push(listaDeVivos[indiceAleatorio]); // enviamos al jugador seleccionado a la lsita de muertos

    listaDeVivos.splice(indiceAleatorio, 1); // eliminar al jugador seleccionado de la lista de vivos

    console.log(listaDeVivos); // console.log   de lista de vivos

    //soloKill(nombreDelJugadorSeleccionado)

    // comeKilled()
    // playGif()
    // setTimeout(esonder,900)
    return nombreDelJugadorSeleccionado;
  } else {
    // si la condición anterior no se cumple entonces el array de vivos está vacio
    // gameOver();
  }
}

const buttonKill = document.getElementById("kill");
buttonKill.addEventListener("click", animationAndPopUP);

let soundDead = new Audio("../assets/sounds/Sounds/wilhem_dead.mp3")

function animationAndPopUP() {
  if (listaDeVivos.length > 0) {
    setTimeout(soloKill, 1700, jugadorSacrificado);
    open.classList.remove('vibrate_kill')
    soundDead.play()
    comeKilled();
    playGif();
    changeGiff(true);

  } else {
    gameOver();
    buttonKill.classList.add('shadow')
  }
}

const nextContainer = document.getElementById("nextcontainer");
const nextButton = document.getElementById("nextButton");

nextButton.addEventListener("click", nextPlayer);
function nextPlayer() {
  imgPlayer.classList.remove("shadow");
  imgPlayer.classList.add("transleft");
  nextContainer.classList.remove("block_next");
  nextButton.classList.add("waitingNext");
  imgPlayer.classList.remove("transdown");
  let nombreDelJugadorSeleccionado = killPlayer();
  changeGiff(false, nombreDelJugadorSeleccionado);
  open.classList.add('vibrate_kill')
}

//ONE CODER IS DEAD

function soloKill(nameKilled) {
  const modal_container = document.getElementById("modal_container");
  const btnNextKill = document.getElementById("nextKill");
  const alertPlayerDeleted = document.getElementById("alertPlayerDeleted");
  const btnList = document.getElementById("list");

  // const open = document.getElementById('kill');
  btnList.innerHTML = "";
  alertPlayerDeleted.innerHTML = `Player... ${nameKilled} has been deleted`;

  btnNextKill.addEventListener("click", () => {
    modal_container.classList.remove("show");
    /*imgPlayer.classList.remove("transleft");*/
    imgPlayer.classList.add("shadow");
    nextButton.classList.remove("waitingNext");
    nextContainer.classList.add("block_next");
  });

  modal_container.classList.add("show");
}

//ALL CODERS DEAD POPUP

  const removeButtonContinue = document.getElementById("nextKill");
  const open = document.getElementById("kill");
  const modal_container = document.getElementById("modal_container");
  const close = document.getElementById("close");
  const containerButtons = document.getElementById("container_buttons");
function gameOver() {
  console.log("aquí aparece el pupup")
  function showModal (){
      document.getElementById("alertPlayerDeleted").innerHTML =
        "El ultimo jugador ha muerto";
      removeButtonContinue.innerHTML = "";
      modal_container.classList.add("show");
  }
  setTimeout(showModal,2000)
  playGif()
  comeKilled();
  changeGiff(true);
  containerButtons.innerHTML = `<a href="./list.html" id="list">            
    <img src="../assets/svg/list.svg" alt="" class="btcontinue">
  </a>`;
}


const imgPlayer = document.getElementById("player");

function comeKilled() {
  imgPlayer.classList.remove("transleft");
  imgPlayer.classList.add("transdown");
}

const gunContainer = document.getElementById("gun_container");
let shootSound = new Audio("../assets/sounds/Sounds/shootgun_shoot_1.mp3");
let chargeSound = new Audio("../assets/sounds/Sounds/reload_1.mp3");

function playGif() {
  gunContainer.innerHTML = `<img src="../assets/img/gunGif.gif" alt="gun" class="gif_gun">`;
  setTimeout(playimg, 1700);
  shootSound.play();
  setTimeout(chargePLay, 500);
}

chargeSound.play();

function chargePLay() {
  chargeSound.play();
}
function playimg() {
  gunContainer.innerHTML = `<img src="../assets/img/maskgroup.png" alt="gun" class="img_gun">`;
}

function esonder() {
  document.getElementById("player").style.visibility = "hidden";
}

// funcion para cambiar de giffs del player

const playerGif = document.getElementById("player");

function changeGiff(instruction, nombre) {
  if (instruction == true) {
    playerGif.innerHTML = `<img class="player"  src="../assets/img/player-dead.gif" alt="player" id="player_img">`;
  } else {
    playerGif.innerHTML = `<img class="player"  src="../assets/img/walking-player.gif" alt="player" id="player_img"><h4>${nombre}</h4>`;
  }
}
