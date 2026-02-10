import { Ship } from './ship.js';

export class Gameboard {
    constructor() {
        this.ships = [];
        this.missedAttacks = [];
        this.successfulHits = [];
        this.board = Array(10).fill(null).map(() => Array(10).fill(null));
    }

    checkPlacement(x, y, length, direction) {
        if (direction === 'horizontal') {
            if (x + length > 10) return false;
        } else {
            if (y + length > 10) return false;
        }

        for (let i = 0; i < length; i++) {
            let currentX = x;
            let currentY = y;

            if (direction === 'horizontal') currentX += i;
            else currentY += i;

            if (this.board[currentY][currentX] !== null) {
                return false;
            }
        }
        return true;
    }

    placeShip(coordX, coordY, length, direction = "horizontal") {
        let ship = new Ship(length);
        this.ships.push(ship);

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

    placeShipsRandomly() {
        const fleet = [5, 4, 3, 3, 2];
        fleet.forEach(length => {
            let placed = false;
            while (!placed) {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                
                if (this.checkPlacement(x, y, length, orientation)) {
                    this.placeShip(x, y, length, orientation);
                    placed = true;
                }
            }
        });
    }

    getBoard() {
        return this.board;
    }

    receiveAttack(coordX, coordY) {
        const target = this.board[coordY][coordX];
        if (target !== null) {
            target.hit();
            this.successfulHits.push({ x: coordX, y: coordY });
            return true;
        } else {
            this.missedAttacks.push({ x: coordX, y: coordY });
            return false;
        }
    }

    allSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}