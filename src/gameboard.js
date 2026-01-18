class Gameboard {
  constructor(size = 10) {
    this.size = size;

    this.board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    );

    this.missedHits = [];
    this.ships = [];
  }

  placeShip(length, coordinates) {
    const ship = new Ship(length);

    coordinates.forEach(([x, y]) => {
      if (this.board[x][y] !== null) {
        throw new Error("Position already occupied by another ship");
      }
    });

    coordinates.forEach(([x, y]) => {
      this.board[x][y] = ship;
    });

    this.ships.push(ship);
    return ship;
  }

  receiveAttack([x, y]) {
    const cell = this.board[x][y];

    if (cell === "miss" || cell === "hit") {
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

  allShipsSunk() {}
}
