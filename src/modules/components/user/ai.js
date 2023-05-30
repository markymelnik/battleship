import Player from './player';

class AI extends Player {
  constructor(name = 'Opponent AI', enemyPlayer, enemySide) {
    super(name);
    this.turn = false;
    this.enemyPlayer = enemyPlayer;
    this.enemySide = enemySide;
    this.hitArray = [];
  }

  resetHitArray() {
    this.hitArray = [];
  }

  randomAttack(enemyPlayer, enemySide) {
    if (this.checkTurn()) {
      let strike;
      do {
        let firstNum = Math.floor(Math.random() * 10);
        let secondNum = Math.floor(Math.random() * 10);
        strike = [firstNum, secondNum];
      } while (
        this.hitArray.some(
          (coords) => coords[0] == strike[0] && coords[1] == strike[1]
        )
      );

      this.hitArray.push(strike);
      this.targetedAttack(strike, enemyPlayer, enemySide);
    }
  }
}

export default AI;
