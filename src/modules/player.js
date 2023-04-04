class Player {
  constructor(playerName) {
    this.name = typeof playerName === 'string' ? playerName : 'OpponentAI';
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

  endTurn(enemyPlayer) {
    if (this.turn === true) {
      this.turn = false;
      enemyPlayer.startTurn();
    }
  }

  targetedAttack([row,col], enemyPlayer, enemySide) {
    if (this.checkTurn()) {
      enemySide.receiveAttack([row,col]);
      this.endTurn(enemyPlayer);
    }
    else throw Error('Not your turn!')
  }
}

module.exports = { Player };