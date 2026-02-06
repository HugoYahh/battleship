import {Ship} from './ship.js'

export class Gameboard{
    constructor(){
        this.ships=[]
        this.missedAttacks=[]
        this.board=Array(10).fill(null).map(()=> Array(10).fill(null));
    }


    placeShip(coordX, coordY, length, direction = "horizontal") {
        // 1. VÉRIFICATION (On ne crée rien pour l'instant)
        if (direction === 'horizontal') {
            for (let i = 0; i < length; i++) {
                // On vérifie si la case est occupée OU si elle n'existe pas (hors limites)
                if (this.board[coordY][coordX + i] !== null) {
                    return; // Collision détectée : On annule tout !
                }
            }
        } else if (direction === 'vertical') {
            for (let i = 0; i < length; i++) {
                if (this.board[coordY + i][coordX] !== null) {
                    return; // Collision détectée : On annule tout !
                }
            }
        }

        // 2. CRÉATION ET PLACEMENT (Seulement si on arrive ici)
        let ship = new Ship(length);
        this.ships.push(ship); // ✅ On l'ajoute maintenant qu'on est sûr

        if (direction === 'horizontal') {
            for (let i = 0; i < length; i++) {
                this.board[coordY][coordX + i] = ship;
            }
        } else if (direction === 'vertical') {
            for (let i = 0; i < length; i++) {
                this.board[coordY + i][coordX] = ship;
            }
        }
    }

    getBoard(){
        return this.board;
    }

    receiveAttack(coordX,coordY){
        if(this.getBoard()[coordY][coordX]!==null){
            this.board[coordY][coordX].hit();
        }
        else{
            this.missedAttacks.push({x:coordX,y:coordY});
        }
    }

    allSunk(){
        return this.ships.every(ship => ship.isSunk());
    }

}