export default function renderGameboard(
  gameboard,
  container,
  player,
  onCellClick
) {
  container.innerHTML = ""; // очищаем старую доску
  const size = gameboard.size;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");

      const cell = gameboard.board[i][j];

      // Визуализация попаданий
      if (cell === "miss") {
        cellDiv.classList.add("miss");
      } else if (cell === "hit") {
        cellDiv.classList.add("hit");
      } else if (cell !== null && player !== "computer") {
        cellDiv.classList.add("ship"); // показываем корабли игрока
      }

      // Навешиваем клик только на клетки компьютера, которые еще не атакованы
      if (onCellClick && cell !== "hit" && cell !== "miss") {
        cellDiv.addEventListener("click", () => onCellClick(i, j));
      }

      container.appendChild(cellDiv);
    }
  }
}
