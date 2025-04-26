const container = document.querySelector("#container");
const eraseButton = document.querySelector("#erase");
const colorPicker = document.querySelector("#colorpicker");

let isErasing = false;
let currentColor = colorPicker.value;

colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
});

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

createGrid(16);
