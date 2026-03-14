import "./style.css";

import Player from "./player.js";
import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import renderGameboard from "./ui.js";

const userBoardContainerEl = document.querySelector("#user-board");
const computerBoardContainerEl = document.querySelector("#computer-board");
const messageEl = document.querySelector("#message");
const rotateBtn = document.querySelector("#rotate-btn");
const restartBtn = document.querySelector("#restart-btn");

const placement = {
  currentDirection: "vertical",
  currentShipIndex: 0,
};

const shipsToPlace = [4, 3, 3, 2, 2, 1, 1];

rotateBtn.addEventListener("click", () => {
  placement.currentDirection =
    placement.currentDirection === "vertical" ? "horizontal" : "vertical";

  messageEl.textContent = `Ship direction ${placement.currentDirection}`;
});

restartBtn.addEventListener("click", startNewGame);

let gameOver = false;
let player, computer;

function showMessage(text) {
  messageEl.textContent = text;
}

function autoPlaceShips(board) {
  shipsToPlace.forEach((length) => {
    let placed = false;

    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      const direction = Math.random() > 0.5 ? "vertical" : "horizontal";

      try {
        board.placeShip(length, { x, y }, direction);
        placed = true;
      } catch {}
    }
  });
}

function startNewGame() {
  player = new Player("human", 10);
  computer = new Player("computer", 10);

  gameOver = false;

  placement.currentShipIndex = 0;
  placement.currentDirection = "vertical";

  autoPlaceShips(computer.gameboard);

  renderBoards();

  showMessage(`Place ship length ${shipsToPlace[0]}`);
}

function renderBoards() {
  renderGameboard(
    player.gameboard,
    userBoardContainerEl,
    player.type,
    handleShipPlacement
  );

  renderGameboard(
    computer.gameboard,
    computerBoardContainerEl,
    computer.type,
    handlePlayerAttack
  );
}

function handleComputerAttack() {
  if (gameOver) return;

  let x;
  let y;
  let result = "already attacked";

  while (result === "already attacked") {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);

    result = player.gameboard.receiveAttack([x, y]);
  }

  console.log(`Computer attacks: (${x}, ${y})`);

  if (player.gameboard.allShipsSunk()) {
    showMessage("Machine won!");
    gameOver = true;
    return;
  }

  renderBoards();
}

function handleShipPlacement(x, y) {
  if (placement.currentShipIndex >= shipsToPlace.length) return;

  const shipLength = shipsToPlace[placement.currentShipIndex];

  try {
    player.gameboard.placeShip(
      shipLength,
      { x, y },
      placement.currentDirection
    );

    placement.currentShipIndex++;

    renderBoards();

    if (placement.currentShipIndex === shipsToPlace.length) {
      showMessage("All ships placed! Start attacking.");
    } else {
      showMessage(
        `Place ship length ${shipsToPlace[placement.currentShipIndex]}`
      );
    }
  } catch (err) {
    showMessage(err.message);
  }
}

function handlePlayerAttack(x, y) {
  if (gameOver) return;
  if (placement.currentShipIndex < shipsToPlace.length) {
    showMessage("Place all ships first!");
    return;
  }

  const result = computer.gameboard.receiveAttack([x, y]);

  if (result === "already attacked") {
    showMessage("You already attacked this cell!");
    return;
  }

  renderBoards();

  if (computer.gameboard.allShipsSunk()) {
    showMessage("Congratulations! You won!");
    gameOver = true;
    return;
  }

  handleComputerAttack();
}

startNewGame();
