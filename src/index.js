import './css/style.css';
import {Gameboard} from './gameboard.js';
import {Player} from './player.js';
import {Ship} from './ship.js';
import { toggleGamemode , toggleScreen, getGameInfo, renderBoard} from './dom.js';

toggleGamemode();

const startBtn = document.getElementById('btn-start-game');

startBtn.addEventListener('click', () => {
    toggleScreen('start-screen-container', 'container-main-game'); 

    console.log("--- DÉBUT DU TEST ---");

    const testBoard = new Gameboard();

    testBoard.placeShip(1, 1, 4, 'horizontal');
    
    testBoard.placeShip(6, 2, 3, 'vertical');

    testBoard.receiveAttack(1, 1); // TOUCHÉ (Sur le premier bateau)
    testBoard.receiveAttack(2, 1); // TOUCHÉ (Sur le premier bateau)
    testBoard.receiveAttack(5, 5); // RATÉ (Dans l'eau)
    testBoard.receiveAttack(0, 0); // RATÉ (Dans l'eau)

   
    renderBoard('grid-left', testBoard, false);

    // --- TEST ENNEMI (Optionnel) ---
    // Juste pour voir si le paramètre 'true' cache bien les bateaux
    const enemyBoard = new Gameboard();
    enemyBoard.placeShip(3, 3, 5, 'vertical'); // On place un bateau
    enemyBoard.receiveAttack(3, 3); // On le touche
    
    // 'true' signifie "C'est l'ennemi, CACHE les bateaux non touchés"
    renderBoard('grid-right', enemyBoard, true); 
});