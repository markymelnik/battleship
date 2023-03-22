const { Gameboard } = require('./gameboard')

class Player {
  constructor(name) {
    this.name = typeof name === 'string' ? name : 'opponentAI';
    this.turn = true;
  }

  checkTurn() {
    return this.turn;
  }

  startTurn() {
    if (this.turn === false) {
      this.turn = true;
    }
  }

  endTurn() {
    if (this.turn === true) {
      this.turn = false;
    }
  }

  attack([x,y], enemyPlayer, enemyBoard) {
    if (this.checkTurn()) {
      enemyBoard.receiveAttack([x,y]);
      this.endTurn(enemyPlayer);
    }
  }
}

module.exports = { Player };