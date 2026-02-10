export class Ship {
    constructor(length) {
        this.length = length;
        this.numberOfHits = 0;
    }

    hit() {
        this.numberOfHits += 1;
    }

    isSunk() {
        return this.numberOfHits >= this.length;
    }
}