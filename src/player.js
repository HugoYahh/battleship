import { Gameboard } from "./gameboard.js";

export class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard();
        this.isAI = (name === 'Computer');

        if (this.isAI) {
            this.possibleMoves = [];
            for (let x = 0; x < 10; x++) {
                for (let y = 0; y < 10; y++) {
                    this.possibleMoves.push({ x, y });
                }
            }
        }
    }

    makeRandomMove(enemyBoard) {
        if (this.possibleMoves.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * this.possibleMoves.length);
        const move = this.possibleMoves[randomIndex];
        
        enemyBoard.receiveAttack(move.x, move.y);
        
        this.possibleMoves.splice(randomIndex, 1);
    }
}