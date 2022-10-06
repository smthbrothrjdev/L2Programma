let prev_ID = 1;
let selected_ID = 1;
let target_ID = 0;
const TOTAL_ROWS = 10;
const TOTAL_COLS = 10;
const BALL_VERTICAL = 30;
const BALL_HORIZONTAL = 30;
const DELAY_TIME = 500;
const container = document.getElementById("container");
const printout = document.getElementById("printout");
const oopsy = document.getElementById("oopsy");

let fileContent = "";
let instructionSet = [];

//setup maze
// const ball = document.getElementById("ball");
// ball.style.position = "absolute";
// ball.style.top = ball.offsetTop - 60 + "px";
// ball.style.left = ball.offsetLeft - 10 + "px";

//const p = document.getElementById("p");
//p.textContent = "fromLeft: " + ball.offsetLeft;

document.getElementById("up").addEventListener("click", (ev) => {
  updateInstructionSet(ev);
});

document.getElementById("down").addEventListener("click", (ev) => {
  updateInstructionSet(ev);
});

document.getElementById("left").addEventListener("click", (ev) => {
  updateInstructionSet(ev);
});

document.getElementById("right").addEventListener("click", (ev) => {
  updateInstructionSet(ev);
});

document.getElementById("go").addEventListener("click", () => {
  go();
});

function updateInstructionSet(event) {
  const instruction = event.target.id;
  instructionSet.push(instruction);

  document.getElementById(
    "output"
  ).innerHTML += `<h2 class="output--h2">${instruction}</h2>`;
}

function go() {
  let tempIS = instructionSet;
  printout.innerHTML = "";
  oopsy.innerHTML = "";
  for (let i = 0; i < instructionSet.length; i++) {
    // console.log("going to sleep");
    setTimeout(() => {
      // console.log("awake");
      prev_ID = selected_ID;
      if (tempIS[i] == "up") move_up();

      if (tempIS[i] == "down") move_down();

      if (tempIS[i] == "right") move_right();

      if (tempIS[i] == "left") move_left();

      if (bumped()) {
        paint();
      }
    }, 750 * i);
  }
  instructionSet = [];
  document.getElementById("output").innerHTML = "";
}

document.addEventListener("keydown", (event) => {
  prev_ID = selected_ID;
  if (event.key == "ArrowDown") move_down();
  if (event.key == "ArrowUp") move_up();
  if (event.key == "ArrowLeft") move_left();
  if (event.key == "ArrowRight") move_right();
  if (bumped()) {
    paint();
  }
});

document.getElementById("filer").addEventListener("change", (e) => {
  setMap(e);
});

function setMap(event) {
  const file = event.target.files[0];
  const promise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.readAsText(file);
  });
  promise.then((txt) => {
    fileContent = txt;
    drawMap(fileContent);
  });
}

function drawMap(fileContent) {
  let count = 1;
  let rows = fileContent.split("\n");
  for (let i = 0; i < rows.length; i++) {
    const cols = rows[i].split(" ");
    for (let j = 0; j < cols.length; j++) {
      let index = parseInt(cols[j]);

      // console.log(j + ": " + index);

      if (index == 1) {
        document.getElementById(count).style.backgroundColor = "white";
      }

      if (index == 0) {
        document.getElementById(count).style.backgroundColor = "black";
      }

      if (index == 2) {
        document.getElementById(count).style.backgroundImage =
          "url(/assets/present.gif)";
        document.getElementById(count).style.backgroundSize = "100px 100px";
        target_ID = count;
      }
      //reset outputbox
      document.getElementById("output").innerHTML = "";
      instructionSet = [];

      count++;
    }
  }
}

/////////

function move_down() {
  selected_ID += TOTAL_COLS;
  printout.innerText = "Moving down!";
}

function move_right() {
  selected_ID += 1;
  printout.innerText = "Moving right!";
  if (selected_ID % TOTAL_COLS == 1) {
    oops();
  }
}

function move_left() {
  selected_ID -= 1;
  printout.innerText = "Moving left!";
  if (selected_ID % TOTAL_COLS == 0) {
    oops();
  }
}

function move_up() {
  printout.innerText = "Moving up!";
  selected_ID -= TOTAL_COLS;
}

///part of init
function makeRows(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (c = 0; c < rows * cols; c++) {
    let cell = document.createElement("div");
    // cell.innerText = c + 1;
    cell.setAttribute("id", c + 1);
    container.appendChild(cell).className = "grid-item";
  }
}

function bumped() {
  if (selected_ID <= 0 || selected_ID > TOTAL_COLS * TOTAL_ROWS) {
    oops();
    return false;
  } else {
    if (document.getElementById(selected_ID).style.backgroundColor == "black") {
      oops();
    }
    return true;
  }
}

function victory() {
  alert("VICTORY!");
}

function oops() {
  console.log("OOPS");
  oopsy.innerHTML += "<h4>YOU RAN INTO A WALL!</h4>";
  selected_ID = prev_ID;
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
//paint function
function paint() {
  //debugger

  const one = (document.getElementById(prev_ID).style.backgroundImage = null);

  const two = (document.getElementById(selected_ID).style.backgroundImage =
    "url(/assets/cat-4.gif)");

  const three = (document.getElementById(selected_ID).style.backgroundSize =
    "100px 100px");

  if (selected_ID == target_ID) {
    victory();
  }
}

makeRows(TOTAL_ROWS, TOTAL_COLS);

/////paint
paint();
