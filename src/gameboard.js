import Ship from "./ship.js";

export default class Gameboard {
  constructor(size = 10) {
    this.size = size;

    this.board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    );

    this.missedHits = [];
    this.ships = [];
  }

  placeShip(length, coordinates, direction) {
    const { x, y } = coordinates;
    const ship = new Ship(length);

    if (x < 0 || y < 0) {
      throw new Error("Coordinates cannot be negative");
    }

    if (direction !== "vertical" && direction !== "horizontal") {
      throw new Error("Direction must be 'vertical' or 'horizontal'");
    }

    for (let i = 0; i < length; i++) {
      if (direction === "vertical") {
        if (y + i >= this.size) {
          throw new Error("Ship out of bounds");
        }
        if (this.board[x][y + i] !== null) {
          throw new Error("Position already occupied by another ship");
        }
      } else if (direction === "horizontal") {
        if (x + i >= this.size) {
          throw new Error("Ship out of bounds");
        }
        if (this.board[x + i][y] !== null) {
          throw new Error("Position already occupied by another ship");
        }
      }
    }

    for (let i = 0; i < length; i++) {
      if (direction === "vertical") {
        this.board[x][y + i] = ship;
      } else if (direction === "horizontal") {
        this.board[x + i][y] = ship;
      }
    }

    this.ships.push(ship);
    return ship;
  }

  receiveAttack([x, y]) {
    const cell = this.board[x][y];

    if (cell === "miss" || cell?.wasHit) {
      return "already attacked";
    }

    if (cell === null) {
      this.board[x][y] = "miss";
      this.missedHits.push([x, y]);
      return "miss";
    }

    cell.hit();
    this.board[x][y] = "hit";
    return "hit";
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
