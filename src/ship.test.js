import {Ship} from './ship.js'
import{Gameboard} from './gameboard.js'
import { Player } from './player.js';


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

test('gameboard can place Ship',()=>{
    let gameboard = new Gameboard();
    gameboard.placeShip(0,0,3);
    expect(gameboard.getBoard()[0][0]).not.toBe(null);
})

test('gameboard can place Ship vertically',()=>{
    let gameboard = new Gameboard();
    gameboard.placeShip(0,0,3,"vertical");
    expect(gameboard.getBoard()[0][0]).not.toBe(null);
})

test('receiveAttack actually receive attack and increase number of hits',()=>{
    let gameboard = new Gameboard();
    let ship = new Ship(3)
    gameboard.placeShip(0,0,ship.length);
    gameboard.receiveAttack(0,0)
    
    expect(gameboard.getBoard()[0][0].numberOfHits).toBe(1);
})

test('receiveAttack handle the miss by adding coord to missedAttacks array',()=>{
    let gameboard = new Gameboard();
    let ship = new Ship(3)
    gameboard.placeShip(0,0,ship.length);
    gameboard.receiveAttack(5,5)
    
    expect(gameboard.getBoard()[0][0].numberOfHits).toBe(0);
    expect(gameboard.missedAttacks.length).toBe(1);
    expect(gameboard.missedAttacks[0]).toEqual({x:5,y:5});
})

test('allSunk reports true only when ALL ships are sunk', () => {
    let gameboard = new Gameboard();
    
    gameboard.placeShip(0, 0, 2); 
    gameboard.placeShip(5, 0, 2);

    expect(gameboard.allSunk()).toBeFalsy();

    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 0); 
    
    expect(gameboard.allSunk()).toBeFalsy();

    gameboard.receiveAttack(5, 0);
    gameboard.receiveAttack(6, 0); 

    expect(gameboard.allSunk()).toBeTruthy();
});


test('cannot place ships at occupied coordinates', () => {
    const gameboard = new Gameboard();
    // Bateau 1 : Horizontal en (0,0) -> Occupe (0,0) et (1,0)
    gameboard.placeShip(0, 0, 2); 
    
    // Bateau 2 : Vertical en (1,0) -> Essaie d'occuper (1,0) et (1,1)
    // Il y a collision en (1,0) !
    gameboard.placeShip(1, 0, 2, 'vertical'); 

    // Vérification :
    // Le Bateau 2 ne doit pas avoir été placé.
    // Donc la case (1,1) (qui serait la queue du Bateau 2) doit être vide.
    expect(gameboard.getBoard()[1][1]).toBe(null);
    
    // Optionnel : on peut aussi vérifier que le nombre de bateaux est resté à 1
    expect(gameboard.ships.length).toBe(1);
});

test('A player gets a gameboard when created',()=>{
    let player = new Player('real');
    expect(player.gameboard).not.toBe(undefined);
})

test('Computer can attack with a random move',()=>{
    let player = new Player('player');
    let computer = new Player('computer');
    computer.makeRandomMove(player)
    expect(player.gameboard.missedAttacks.length).not.toBe(0)
})