const { Gameboard } = require('./gameboard')

class Player {
  constructor(playerName) {
    this.name = typeof playerName === 'string' ? playerName : 'opponentAI';
    this.turn = this.name === 'opponentAI' ? false : true;
  }
  
  checkTurn() {
    return this.turn;
  }

  startTurn() {
    if (this.turn === false) {
      this.turn = true;
    }
  }

  endTurn(enemyPlayer) {
    if (this.turn === true) {
      this.turn = false;
      enemyPlayer.startTurn();
    }
  }

  attack([x,y], enemyPlayer, enemyBoard) {
    if (this.checkTurn()) {
      enemyBoard.receiveAttack([x,y]);
      this.endTurn(enemyPlayer);
    }
    else throw Error('Not your turn!')
  }
}

module.exports = { Player };