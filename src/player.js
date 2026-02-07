import Gameboard from "./gameboard.js";

export default class Player {
  constructor(type = "human", gameboardSize = 10) {
    if (type !== "human" && type !== "computer") {
      throw new Error("Player type must be 'human' or 'computer'");
    }

    this.type = type;
    this.gameboard = new Gameboard(gameboardSize);
  }
}
