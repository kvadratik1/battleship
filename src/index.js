import "./style.css";

import Player from "./player.js";
import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import renderGameboard from "./ui.js";

const userBoardContainerEl = document.querySelector("#user-board");
const computerBoardContainerEl = document.querySelector("#computer-board");
const messageEl = document.querySelector("#message");

let gameOver = false;
let player, computer;

function showMessage(text) {
  messageEl.textContent = text;
}

function autoPlaceShips(board) {
  board.placeShip(3, { x: 0, y: 0 }, "vertical");
}

function startNewGame() {
  player = new Player("human", 10);
  computer = new Player("computer", 10);

  autoPlaceShips(player.gameboard);
  autoPlaceShips(computer.gameboard);
  // Place ships for player and computer

  renderBoards();
  showMessage("Click on the enemy board to attack.");
}

function renderBoards() {
  renderGameboard(player.gameboard, userBoardContainerEl, player.type, null);
  renderGameboard(
    computer.gameboard,
    computerBoardContainerEl,
    computer.type,
    handlePlayerAttack
  );
}

function handleComputerAttack() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);

  console.log(`Computer attacks: (${x}, ${y})`);

  const result = player.gameboard.receiveAttack([x, y]);

  console.log(result);

  if (player.gameboard.allShipsSunk()) {
    showMessage("Machine won!");
    gameOver = true;
  }

  renderBoards();
  return;
}

function handlePlayerAttack(x, y) {
  if (gameOver) return;

  const result = computer.gameboard.receiveAttack([x, y]);

  renderBoards();

  if (computer.gameboard.allShipsSunk()) {
    showMessage("Congratulations! You won!");
    gameOver = true;
    return;
  }

  handleComputerAttack();
}

startNewGame();
