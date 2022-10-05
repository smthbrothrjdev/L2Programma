let counter_x = 1;
let counter_y = 1;
let prev_ID = 1;
let selected_ID = 1;
const TOTAL_ROWS = 30;
const TOTAL_COLS = 10;
const BALL_VERTICAL = 30;
const BALL_HORIZONTAL = 30;

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
  paint();
});

/////////

function move_down() {
  selected_ID += TOTAL_COLS;
}

function move_right() {
  selected_ID += 1;
}

function move_left() {
  selected_ID -= 1;
}

function move_up() {
  selected_ID -= TOTAL_COLS;
}

const container = document.getElementById("container");

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

makeRows(TOTAL_ROWS, TOTAL_COLS);
paint();

function paint() {
  document.getElementById(prev_ID).style.backgroundImage = null;

  document.getElementById(selected_ID).style.backgroundImage =
    "url(tennisball.gif)";
  document.getElementById(selected_ID).style.backgroundSize = "100px 100px";
}
