import {Ship} from './ship.js'

test('Ship has a length',()=>{
    let ship = new Ship(3);
    expect(ship.length).toBe(3);
})

test('Ship as a numberOfHits set to 0 initially',()=>{
    let ship = new Ship(3);
    expect(ship.numberOfHits).toBe(0);
})

test('Hit function increases the numberOfHits',()=>{
    let ship = new Ship(3);
    ship.hit();
    expect(ship.numberOfHits).toBe(1);
})

test('isSunk return false if ship not sunk',()=>{
    let ship = new Ship(3);
    expect(ship.isSunk()).toBe(false);
})

test('isSunk return true if ship is sunk',()=>{
    let ship = new Ship(1);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})