export default function renderGameboard(
  gameboard,
  container,
  player,
  onCellClick
) {
  container.innerHTML = "";
  const size = gameboard.size;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");

      const cell = gameboard.board[i][j];

      if (cell === "miss") {
        cellDiv.classList.add("miss");
      } else if (cell?.wasHit) {
        cellDiv.classList.add("hit");
      } else if (cell !== null && player !== "computer") {
        cellDiv.classList.add("ship");
      }

      if (onCellClick && cell !== "miss" && !cell?.wasHit) {
        cellDiv.addEventListener("click", () => onCellClick(i, j));
      }

      container.appendChild(cellDiv);
    }
  }
}
