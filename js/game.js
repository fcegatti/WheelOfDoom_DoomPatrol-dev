let targets = JSON.parse(localStorage.getItem("targetsKey")); // Traemos el array de jugadores desde el local storage

let aliveTargets = targets; // recibimos el array de jugadores y hacemos un clon

let casualties = [];

let killedTarget = "";

// selecciona un indice aleatorio dentro del array

function killTarget() {
  if (aliveTargets.length > 0) {
    //si la longitud del array es mayor a 0 entonces pasa lo siguiente

    let randomIndex = 0 + Math.floor(Math.random() * aliveTargets.length); //generar un numero entero desde 0 hasta la longitud del array

    let selectedTarget = aliveTargets[randomIndex].targetName;

    killedTarget = aliveTargets[randomIndex].targetName;

    console.log(selectedTarget); //console log del jugador seleccionado

    casualties.push(aliveTargets[randomIndex]); // enviamos al jugador seleccionado a la lsita de muertos

    aliveTargets.splice(randomIndex, 1); // eliminar al jugador seleccionado de la lista de vivos

    console.log(aliveTargets); // console.log   de lista de vivos

    //soloKill(selectedTarget)

    // targetPositioning()
    // playGif()
    // setTimeout(esonder,900)
    return selectedTarget;
  } else {
    // si la condición anterior no se cumple entonces el array de vivos está vacio
    // gameOver();
  }
}

const killButton = document.getElementById("kill");
killButton.addEventListener("click", animationAndPopUP);

let dyingScream = new Audio("../assets/sounds/Sounds/wilhem_dead.mp3")

function animationAndPopUP() {
  if (aliveTargets.length > 0) {
    setTimeout(soloKill, 1700, killedTarget);
    open.classList.remove('vibrate_kill')
    dyingScream.play();
    targetPositioning();
    shootingGif();
    targetExplosionGif(true);

  } else {
    gameOver();
    killButton.classList.add('shadow')
  }
}

const nextContainer = document.getElementById("nextContainer");
const nextButton = document.getElementById("nextButton");

nextButton.addEventListener("click", nextTarget);
function nextTarget() {
  targetImg.classList.remove("shadow");
  targetImg.classList.add("transleft");
  nextContainer.classList.remove("block_next");
  nextButton.classList.add("waitingNext");
  targetImg.classList.remove("transdown");
  let selectedTarget = killTarget();
  targetExplosionGif(false, selectedTarget);
  open.classList.add('vibrate_kill')
}

//ONE CODER IS DEAD

function soloKill(nameKilled) {
  const modal_container = document.getElementById("modal_container");
  const btnNextKill = document.getElementById("nextKill");
  const killedTargetAlert = document.getElementById("killedTargetAlert");
  const btnList = document.getElementById("list");

  // const open = document.getElementById('kill');
  btnList.innerHTML = "";
  killedTargetAlert.innerHTML = `${nameKilled} is dead`;

  btnNextKill.addEventListener("click", () => {
    modal_container.classList.remove("show");
    targetImg.classList.add("shadow");
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
      document.getElementById("killedTargetAlert").innerHTML =
        "All targets are dead<br/><br/>GAME OVER";
      removeButtonContinue.innerHTML = "";
      modal_container.classList.add("show");
  }
  setTimeout(showModal,2000)
  shootingGif()
  targetPositioning();
  targetExplosionGif(true);
  containerButtons.innerHTML = `<a href="./list.html" id="list">            
    <img src="../assets/svg/list.svg" alt="" class="btcontinue">
  </a>`;
}


const targetImg = document.getElementById("target");

function targetPositioning() {
  targetImg.classList.remove("transleft");
  targetImg.classList.add("transdown");
}

const gunContainer = document.getElementById("gun_container");
let shootSound = new Audio("../assets/sounds/Sounds/shootgun_shoot_1.mp3");
let chargeSound = new Audio("../assets/sounds/Sounds/reload_1.mp3");

function shootingGif() {
  gunContainer.innerHTML = `<img src="../assets/img/gunGif.gif" alt="gun" class="gif_gun">`;
  setTimeout(shooting, 1700);
  shootSound.play();
  setTimeout(chargePLay, 500);
}

chargeSound.play();

function chargePLay() {
  chargeSound.play();
}
function shooting() {
  gunContainer.innerHTML = `<img src="../assets/img/maskgroup.png" alt="gun" class="img_gun">`;
}

/* function esonder() {
 document.getElementById("player").style.visibility = "hidden";
} */

// funcion para cambiar de giffs del player

const targetGif = document.getElementById("target");

function targetExplosionGif(instruction, name) {
  if (instruction == true) {
    targetGif.innerHTML = `<img class="target"  src="../assets/img/player-dead.gif" alt="target" id="target_img">`;
  } else {
    targetGif.innerHTML = `<img class="target"  src="../assets/img/walking-player.gif" alt="target" id="target_img"><h4>${name}</h4>`;
  }
}
