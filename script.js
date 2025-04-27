const container = document.querySelector("#container");
const eraseButton = document.querySelector("#erase");
const colorPicker = document.querySelector("#colorpicker");
const sizeSlider = document.querySelector("#sizeSlider");
const sizeValue = document.querySelector("#sizeValue");
const resetButton = document.querySelector("#reset");

let isErasing = false;
let currentColor = colorPicker.value;
let defaultSize = 16;

colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
});

sizeSlider.addEventListener("input", (e) => {
  const newSize = e.target.value;
  sizeValue.textContent = `${newSize} x ${newSize}`;
  createGrid(newSize);
});

resetButton.addEventListener("click", () => {
  shakeAnimation();
  createGrid(defaultSize);
});

function shakeAnimation() {
  const mainContainer = document.getElementById("main-container");
  mainContainer.classList.add("shake");
  setTimeout(() => {
    mainContainer.classList.remove("shake");
  }, 500); // Remove the shake class after the animation is complete
}

function createGrid(size) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  const totalCells = size * size;

  for (let i = 0; i < totalCells; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.addEventListener("mouseover", () => {
      if (isErasing) {
        square.style.backgroundColor = "white";
      } else {
        square.style.backgroundColor = currentColor;
      }
    });

    container.appendChild(square);
  }

  const squareSize = container.clientWidth / size;
  const squares = document.querySelectorAll(".square");
  squares.forEach(square => {
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
  });
}

eraseButton.addEventListener("click", () => {
  isErasing = !isErasing;
  eraseButton.textContent = isErasing ? "Draw" : "Erase";
});

createGrid(defaultSize);
