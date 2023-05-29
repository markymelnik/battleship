export class Player {
  constructor(playerName) {
    this.name = typeof playerName === 'string' ? playerName : 'OpponentAI';
    this.turn = true;
  }

  checkTurn() {
    return this.turn;
  }

  startTurn() {
    if (!this.turn) {
      this.turn = true;
    }
  }

  endTurn(enemyPlayer) {
    if (this.turn) {
      this.turn = false;
      enemyPlayer.startTurn();
    }
  }

  targetedAttack([row, col], enemyPlayer, enemySide) {
    if (this.checkTurn()) {
      enemySide.receiveAttack([row, col]);
      this.endTurn(enemyPlayer);
    } else throw Error('Not your turn!');
  }
}
