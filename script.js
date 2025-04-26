const container = document.querySelector("#container");

function createGrid(size) {
while (container.firstChild){
    container.removeChild(container.firstChild);
}
 const totalCells = size * size;

 for (let i=0; i < totalCells; i++) {
const square = document.createElement("div");
square.classList.add("square");


square.addEventListener("mouseover", () => {
    square.style.backgroundColor = "black"; 
  });


container.appendChild(square);
 

}

 const squareSize = container.clientWidth / size;
const squares = document.querySelectorAll (".square");
squares.forEach(square =>{
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
});

}

createGrid(16);