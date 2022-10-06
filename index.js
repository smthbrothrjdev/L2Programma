let prev_ID = 1;
let selected_ID = 1;
const TOTAL_ROWS = 10;
const TOTAL_COLS = 20;
const BALL_VERTICAL = 30;
const BALL_HORIZONTAL = 30;
const container = document.getElementById("container");
let fileContent = "";

//setup maze
// const ball = document.getElementById("ball");
// ball.style.position = "absolute";
// ball.style.top = ball.offsetTop - 60 + "px";
// ball.style.left = ball.offsetLeft - 10 + "px";

//const p = document.getElementById("p");
//p.textContent = "fromLeft: " + ball.offsetLeft;

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
        console.log("black at " + count);
      }
      count++;
    }
  }
}

/////////

function move_down() {
  selected_ID += TOTAL_COLS;
}

function move_right() {
  selected_ID += 1;
  if (selected_ID % TOTAL_COLS == 1) {
    oops();
  }
}

function move_left() {
  selected_ID -= 1;
  if (selected_ID % TOTAL_COLS == 0) {
    oops();
  }
}

function move_up() {
  selected_ID -= TOTAL_COLS;
}

///part of init
function makeRows(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (c = 0; c < rows * cols; c++) {
    let cell = document.createElement("div");
    cell.innerText = c + 1;
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

function oops() {
  console.log("OOPS");
  selected_ID = prev_ID;
}
//paint function
function paint() {
  document.getElementById(prev_ID).style.backgroundImage = null;

  document.getElementById(selected_ID).style.backgroundImage =
    "url(tennisball.gif)";
  document.getElementById(selected_ID).style.backgroundSize = "100px 100px";
}

makeRows(TOTAL_ROWS, TOTAL_COLS);

/////paint
paint();
