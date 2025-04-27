const container = document.querySelector(".container");
const eraseButton = document.querySelector(".erase");
const rainbowButton = document.querySelector(".rainbow");
const colorPicker = document.querySelector(".colorpicker");
const sizeSlider = document.querySelector(".sizeSlider");
const sizeValue = document.querySelector(".sizeValue");
const resetButton = document.querySelector(".reset");
const mainContainer = document.querySelector(".main-container");

let isErasing = false;
let isRainbow = false;
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
  sizeSlider.value = defaultSize;
  sizeValue.textContent = `${defaultSize} x ${defaultSize}`;
});

eraseButton.addEventListener("click", () => {
  isErasing = !isErasing;
  isRainbow = false;
  eraseButton.textContent = isErasing ? "Draw" : "Erase";
  rainbowButton.textContent = "Rainbow";
});

rainbowButton.addEventListener("click", () => {
  isRainbow = !isRainbow;
  isErasing = false;
  rainbowButton.textContent = isRainbow ? "Normal" : "Rainbow";
  eraseButton.textContent = "Erase";
});

function shakeAnimation() {
  mainContainer.classList.add("shake");
  setTimeout(() => {
    mainContainer.classList.remove("shake");
  }, 500);
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
        square.style.opacity = 1;
      } else if (isRainbow) {
        if (!square.style.backgroundColor || square.style.backgroundColor === "white") {
          square.style.backgroundColor = randomColor();
          square.style.opacity = 0.1;
        } else {
          let currentOpacity = parseFloat(square.style.opacity) || 0;
          if (currentOpacity < 1) {
            square.style.opacity = (currentOpacity + 0.1).toFixed(1);
          }
        }
      } else {
        square.style.backgroundColor = currentColor;
        square.style.opacity = 1;
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

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

createGrid(defaultSize);
