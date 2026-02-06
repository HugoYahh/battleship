import { Gameboard } from "./gameboard";

export class Player{
    constructor(type){
        this.type=type;
        this.gameboard = new Gameboard();

        if (type === 'computer') {
            this.possibleMoves = [];
            for (let x = 0; x < 10; x++) {
                for (let y = 0; y < 10; y++) {
                    this.possibleMoves.push({ x, y });
                }
            }
        }
    }

    makeRandomMove(ennemyPlayer){
        if(this.possibleMoves.length === 0){return;}
        const randomIndex = Math.floor(Math.random()*this.possibleMoves.length);
        const move = this.possibleMoves[randomIndex];
        ennemyPlayer.gameboard.receiveAttack(move.x,move.y);
        this.possibleMoves.splice(randomIndex,1);
    }
}