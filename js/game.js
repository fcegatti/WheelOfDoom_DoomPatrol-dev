let targets = JSON.parse(localStorage.getItem("targetsKey")); 

let aliveTargets = targets;

let casualties = [];

let killedTarget = "";

function killTarget() {
  if (aliveTargets.length > 0) {
    let randomIndex = 0 + Math.floor(Math.random() * aliveTargets.length); 
    let selectedTarget = aliveTargets[randomIndex].targetName;
    killedTarget = aliveTargets[randomIndex].targetName;
    casualties.push(aliveTargets[randomIndex]); 
    aliveTargets.splice(randomIndex, 1); 
    return selectedTarget;
  } else {
    // gameOver();
  }
};

const killButton = document.getElementById("kill");
killButton.addEventListener("click", animationAndPopUP);

let dyingScream = new Audio("../assets/sounds/Sounds/wilhem_dead.mp3")

function animationAndPopUP() {
  if (aliveTargets.length > 0) {
    setTimeout(casualtyNotice, 1700, killedTarget);
    open.classList.remove('vibrate_kill')
    dyingScream.play();
    targetPositioning();
    shootingGif();
    targetExplosionGif(true);

  } else {
    gameOver();
    killButton.classList.add('shadow')
  }
};

const nextButtonContainer = document.getElementById("next_button_container");
const nextButton = document.getElementById("next_button");

nextButton.addEventListener("click", nextTarget);
function nextTarget() {
  targetImg.classList.remove("shadow");
  targetImg.classList.add("transleft");
  nextButtonContainer.classList.remove("block_next");
  nextButton.classList.add("button_await");
  targetImg.classList.remove("transdown");
  let selectedTarget = killTarget();
  targetExplosionGif(false, selectedTarget);
  open.classList.add('vibrate_kill')
};

function casualtyNotice(casualtyName) {
  const modalContainer = document.getElementById("modal_container");
  const continueButton = document.getElementById("continue_button");
  const killedTargetAlert = document.getElementById("killed_target_alert");
  const listButton = document.getElementById("list_button");

  listButton.innerHTML = "";
  killedTargetAlert.innerHTML = `${casualtyName} is dead`;

  continueButton.addEventListener("click", () => {
    modalContainer.classList.remove("show");
    targetImg.classList.add("shadow");
    nextButton.classList.remove("button_await");
    nextButtonContainer.classList.add("block_next");
  });

  modalContainer.classList.add("show");
};

  const removeButtonContinue = document.getElementById("continue_button");
  const open = document.getElementById("kill");
  const modalContainer = document.getElementById("modal_container");
  const close = document.getElementById("close");
  const containerButtons = document.getElementById("container_buttons");
function gameOver() {
  console.log("aquí aparece el pupup")
  function showModal (){
      document.getElementById("killed_target_alert").innerHTML =
        "All targets are dead<br/><br/>GAME OVER";
      removeButtonContinue.innerHTML = "";
      modalContainer.classList.add("show");
  }
  setTimeout(showModal,2000)
  shootingGif()
  targetPositioning();
  targetExplosionGif(true);
  containerButtons.innerHTML = `<a href="./list.html" id="list">            
    <img src="../assets/svg/list.svg" alt="" class="btcontinue">
  </a>`;
};

const targetImg = document.getElementById("target");

function targetPositioning() {
  targetImg.classList.remove("transleft");
  targetImg.classList.add("transdown");
};

const shotgunContainer = document.getElementById("shotgun_container");
let shootingSound = new Audio("../assets/sounds/Sounds/shootgun_shoot_1.mp3");
let shotgunReloadSound = new Audio("../assets/sounds/Sounds/reload_1.mp3");

function shootingGif() {
  shotgunContainer.innerHTML = `<img src="../assets/img/gunGif.gif" alt="gun" class="gif_gun">`;
  setTimeout(shooting, 1700);
  shootingSound.play();
  setTimeout(playShotgunReloadSound, 500);
};

shotgunReloadSound.play();

function playShotgunReloadSound() {
  shotgunReloadSound.play();
};

function shooting() {
  shotgunContainer.innerHTML = `<img src="../assets/img/maskgroup.png" alt="gun" class="img_gun">`;
};

const targetGif = document.getElementById("target");

function targetExplosionGif(instruction, name) {
  if (instruction == true) {
    targetGif.innerHTML = `<img class="target"  src="../assets/img/player-dead.gif" alt="target" id="target_img">`;
  } else {
    targetGif.innerHTML = `<img class="target"  src="../assets/img/walking-player.gif" alt="target" id="target_img"><h4>${name}</h4>`;
  }
};
