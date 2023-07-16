// let playersStorage = JSON.parse(localStorage.getItem("playersKey")); // Traemos el array de jugadores desde el local storage (puede estar lleno o vacío)
// DATOS
let targets = [];

// LÓGICA

// Añadir envento a todos los botones para eliminar jugadores

const deleteButtonHandler = (e) => {
  let idToDelete = e.target.id;
  targets = targets.filter((target) => target.id != idToDelete);
  saveToLocalStorage(targets);
  displayTargetsList();
};

// Añadir jugador, creando un nuevo objeto y enviándolo mediante .push al array de players

let addTargetButton = document.getElementById("addTarget");

let addTargetSound = new Audio("../assets/sounds/Sounds/sonido_boton_1.mp3")

addTargetButton.addEventListener("click", (e) => {
  e.preventDefault();
  let inputTarget = document.getElementById("inputTarget");
  
  let idNewTarget = targets.length;

  let nameNewTarget = inputTarget.value;
  if (inputTarget.value == "") {
    alert("Please enter a valid name");
  } else {
    targets.push({
      id: idNewTarget,
      targetName: nameNewTarget,
      isDead: false,
    });
  }
  inputTarget.value = "";
  addTargetSound.play()
  displayTargetsList();
  saveToLocalStorage(targets);
});

// doom
const displayTargetsList = () => {
  let htmlTargets = ``;


  let targetsList = document.getElementById("targetsList");

  targets.forEach(
    (target) =>
      (htmlTargets += `<li class="item_list_player" >
          <p class="target_name">${target.targetName}</p>
          <i class="bi bi-trash-fill player_delete"id="${target.id}"></i>
          </li>`)
  );
  targetsList.innerHTML = htmlTargets;
  addDeleteButton();
};

const addDeleteButton = (e) => {
  let deletePlayer = document.querySelectorAll(".player_delete");

  deletePlayer.forEach((deleteButton) =>
    deleteButton.addEventListener("click", deleteButtonHandler)
  );
};

displayTargetsList();


function saveToLocalStorage(object) {
  let targetsLocal = object;

  localStorage.setItem("targetsKey", JSON.stringify(targetsLocal));
}

const playButton = document.getElementById("playButton");

const playButtonClickHandler = (e) => {
  let targets = JSON.parse(localStorage.getItem("targetsKey"));

  if(targets.length > 1) {
    playButton.href = "./game.html"
  } 
  else{
    alert("You need at least two targets to start.")
  }  
};

playButton.addEventListener("click", playButtonClickHandler);