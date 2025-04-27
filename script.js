const container = document.querySelector(".container");
const eraseButton = document.querySelector(".erase");
const rainbowButton = document.querySelector(".rainbow");
const colorPicker = document.querySelector(".colorpicker");
const sizeSlider = document.querySelector(".sizeSlider");
const sizeValue = document.querySelector(".sizeValue");
const resetButton = document.querySelector(".reset");
const mainContainer = document.querySelector(".main-container");
const starModeButton = document.querySelector(".star-mode-button"); // Ny knapp för star mode

let isErasing = false;
let isRainbow = false;
let currentColor = colorPicker.value;
let defaultSize = 16;
let starModeActive = false;

// Event för att hantera knappen för star mode
starModeButton.addEventListener("click", () => {
  starModeActive = !starModeActive;

  if (starModeActive) {
    activateStarMode();
  } else {
    deactivateStarMode();
  }
});

// Funktion för att aktivera stjärnhimmel
function activateStarMode() {
  const starBackground = document.createElement('div');
  starBackground.classList.add('star-background');
  
  // Skapa stjärnorna
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 2 + 1; // Slumpmässig storlek för varje stjärna
    const positionX = Math.random() * window.innerWidth;
    const positionY = Math.random() * window.innerHeight;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${positionX}px`;
    star.style.top = `${positionY}px`;
    starBackground.appendChild(star);
  }

  document.body.appendChild(starBackground);
}

// Funktion för att avaktivera stjärnhimmel
function deactivateStarMode() {
  const starBackground = document.querySelector('.star-background');
  if (starBackground) {
    starBackground.remove();
  }
}

// Knapp för att välja färg
colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
});

// Ändra gridstorlek
sizeSlider.addEventListener("input", (e) => {
  const newSize = e.target.value;
  sizeValue.textContent = `${newSize} x ${newSize}`;
  createGrid(newSize);
});

// Reset-knapp
resetButton.addEventListener("click", () => {
  shakeAnimation();
  createGrid(defaultSize);
  sizeSlider.value = defaultSize;
  sizeValue.textContent = `${defaultSize} x ${defaultSize}`;
});

// Eraser-knapp
eraseButton.addEventListener("click", () => {
  isErasing = !isErasing;
  isRainbow = false;
  eraseButton.textContent = isErasing ? "Draw" : "Erase";
  rainbowButton.textContent = "Rainbow";
});

// Rainbow-knapp
rainbowButton.addEventListener("click", () => {
  isRainbow = !isRainbow;
  isErasing = false;
  rainbowButton.textContent = isRainbow ? "Normal" : "Rainbow";
  eraseButton.textContent = "Erase";
});

// Funktion för shake-animation
function shakeAnimation() {
  mainContainer.classList.add("shake");
  setTimeout(() => {
    mainContainer.classList.remove("shake");
  }, 500);
}

// Skapa gridet
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

// Funktion för slumpmässig färg (rainbow mode)
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

createGrid(defaultSize);
