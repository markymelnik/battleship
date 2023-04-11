import { Player } from './player';

export class AI extends Player {
  constructor(name, enemyPlayer, enemySide) {
    super(name);
    this.turn = false;
    this.enemyPlayer = enemyPlayer;
    this.enemySide = enemySide;
    this.hitArray = [];
  }

  resetHitArray() {
    return this.hitArray = [];
  }

  randomAttack(enemyPlayer, enemySide) {
    if(this.checkTurn()) {
      let strike = [];
      while(true) {
        let firstNum = Math.floor(Math.random() * 10);
        let secondNum = Math.floor(Math.random() * 10);
        strike[0] = firstNum;
        strike[1] = secondNum;
        if(!this.hitArray.some(coords => coords[0] == strike[0] && coords[1] == strike[1])) {
          this.hitArray.push(strike);
          this.targetedAttack(strike, enemyPlayer, enemySide);
          break;
        }
      }
    }
  }
}