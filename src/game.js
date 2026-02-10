import { Player } from './player.js';
import { renderBoard } from './dom.js';

export let player1;
export let player2;

let draggingLength = null;
let orientation = 'horizontal';
let isGameOver = false;
let gameMode = 'pve'; 
let currentPlayerSetup = 1;
let currentTurn = 1; 

export function startGame(name1, name2, mode) {
    gameMode = mode;
    isGameOver = false;
    currentPlayerSetup = 1;
    currentTurn = 1;
    draggingLength = null;

    player1 = new Player(name1);
    
    if (gameMode === 'pve') {
        player2 = new Player("Computer");
        player2.gameboard.placeShipsRandomly();
    } else {
        player2 = new Player(name2);
    }

    const p1Title = document.querySelector('.grid-left-package h3');
    const p2Title = document.querySelector('.grid-right-package h3');
    if (p1Title) p1Title.textContent = player1.name;
    if (p2Title) p2Title.textContent = player2.name;

    renderBoard('grid-left', player1.gameboard, false);
    renderBoard('grid-right', player2.gameboard, true);

    if (gameMode === 'pvp') {
        document.getElementById('grid-right').style.opacity = '0.3';
        document.getElementById('grid-right').style.pointerEvents = 'none';
    }

    setupPhase(player1, 'grid-left');
}

export function setupPhase(player, gridId) {
    const gridContainer = document.getElementById(gridId);
    const board = player.gameboard;
    const shipButtons = document.querySelectorAll('.boat-type');

    shipButtons.forEach(btn => {
        btn.classList.remove('placed');
        btn.disabled = false;
        
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });

    const newShipButtons = document.querySelectorAll('.boat-type');
    
    newShipButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('placed')) return;
            draggingLength = parseInt(btn.dataset.length);
            
            newShipButtons.forEach(b => b.classList.remove('selected-ship'));
            btn.classList.add('selected-ship');
        });
    });

    const rotateBtn = document.getElementById('btn-rotate');
    const newRotateBtn = rotateBtn.cloneNode(true);
    rotateBtn.parentNode.replaceChild(newRotateBtn, rotateBtn);

    newRotateBtn.addEventListener('click', () => {
        toggleOrientation();
    });

    document.onkeydown = (e) => {
        if (e.key === "r" || e.key === "R") {
            toggleOrientation();
        }
    };

    const newGrid = gridContainer.cloneNode(true);
    gridContainer.parentNode.replaceChild(newGrid, gridContainer);
    
    renderBoard(gridId, board, false);

    newGrid.addEventListener('mouseover', (e) => {
        const cell = e.target.closest('.cell');
        if (!cell || !draggingLength) return;
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        showGhostShip(board, x, y, gridId);
    });

    newGrid.addEventListener('mouseout', (e) => {
        const cell = e.target.closest('.cell');
        if (cell) clearGhostShip(gridId);
    });

    newGrid.addEventListener('click', (e) => {
        const cell = e.target.closest('.cell');
        if (!cell || !draggingLength) return;
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        
        handlePlaceShip(player, x, y, gridId);
    });
}

function toggleOrientation() {
    orientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';
    const rotateBtn = document.getElementById('btn-rotate');
    if(rotateBtn) rotateBtn.textContent = `Axis: ${orientation.toUpperCase()} (R)`;
}

function showGhostShip(board, x, y, gridId) {
    clearGhostShip(gridId);
    const isValid = board.checkPlacement(x, y, draggingLength, orientation);
    const cssClass = isValid ? 'hover-valid' : 'hover-invalid';

    for (let i = 0; i < draggingLength; i++) {
        let targetX = x;
        let targetY = y;
        if (orientation === 'horizontal') targetX += i;
        else targetY += i;

        const cell = document.querySelector(`#${gridId} .cell[data-x="${targetX}"][data-y="${targetY}"]`);
        if (cell) cell.classList.add(cssClass);
    }
}

function clearGhostShip(gridId) {
    const cells = document.querySelectorAll(`#${gridId} .cell`);
    cells.forEach(cell => {
        cell.classList.remove('hover-valid');
        cell.classList.remove('hover-invalid');
    });
}

function handlePlaceShip(player, x, y, gridId) {
    const board = player.gameboard;

    if (board.checkPlacement(x, y, draggingLength, orientation)) {
        board.placeShip(x, y, draggingLength, orientation);
        renderBoard(gridId, board, false);

        const btn = document.querySelector('.boat-type.selected-ship');
        if (btn) {
            btn.classList.remove('selected-ship');
            btn.classList.add('placed');
            btn.disabled = true;
        }

        draggingLength = null;
        clearGhostShip(gridId);

        if (board.ships.length === 5) {
            
            if (gameMode === 'pve') {
                startCombatUI();
            } 
            else if (gameMode === 'pvp') {
                if (currentPlayerSetup === 1) {
                    transitionToPlayer2();
                } else {
                    startCombatUI();
                }
            }
        }
    }
}

function transitionToPlayer2() {
    currentPlayerSetup = 2;
    const consigne = document.querySelector('.consigne');
    consigne.textContent = "Player 1 Done! Pass device to Player 2.";
    consigne.style.backgroundColor = "#f39c12";

    document.querySelector('.ship-dock').classList.add('hidden');
    
    const btnNext = document.getElementById('btn-next-player');
    btnNext.classList.remove('hidden');

    btnNext.onclick = () => {
        renderBoard('grid-left', player1.gameboard, true); 
        document.getElementById('grid-left').style.opacity = '0.3';
        document.getElementById('grid-left').style.pointerEvents = 'none';

        document.getElementById('grid-right').style.opacity = '1';
        document.getElementById('grid-right').style.pointerEvents = 'auto';

        document.querySelector('.ship-dock').classList.remove('hidden');
        btnNext.classList.add('hidden');

        consigne.textContent = `${player2.name}, place your boats!`;
        consigne.style.backgroundColor = "rgba(18, 66, 108, 0.8)";

        setupPhase(player2, 'grid-right');
    };
}

function startCombatUI() {
    document.querySelector('.ship-dock').classList.add('hidden');
    document.getElementById('btn-next-player').classList.add('hidden');
    
    const consigne = document.querySelector('.consigne');
    consigne.textContent = "COMBAT STARTED! Player 1's Turn.";
    consigne.style.backgroundColor = "#e74c3c";

    if (gameMode === 'pvp') {
        renderBoard('grid-right', player2.gameboard, true);
        
        document.getElementById('grid-left').style.opacity = '1';
        document.getElementById('grid-left').style.pointerEvents = 'auto';
        document.getElementById('grid-right').style.opacity = '1';
        document.getElementById('grid-right').style.pointerEvents = 'auto';
    }

    enableCombatPhase();
}

function enableCombatPhase() {
    const p1Grid = document.getElementById('grid-left');
    const p2Grid = document.getElementById('grid-right');

    const newP1Grid = p1Grid.cloneNode(true);
    p1Grid.parentNode.replaceChild(newP1Grid, p1Grid);
    renderBoard('grid-left', player1.gameboard, gameMode === 'pvp'); 

    const newP2Grid = p2Grid.cloneNode(true);
    p2Grid.parentNode.replaceChild(newP2Grid, p2Grid);
    renderBoard('grid-right', player2.gameboard, true);

    newP2Grid.addEventListener('click', (e) => {
        if (gameMode === 'pvp' && currentTurn !== 1) return; 
        handleAttack(e, player2, 'grid-right', player1);
    });

    if (gameMode === 'pvp') {
        newP1Grid.addEventListener('click', (e) => {
            if (currentTurn !== 2) return; 
            handleAttack(e, player1, 'grid-left', player2);
        });
    }
}

function handleAttack(e, targetPlayer, gridId, attacker) {
    if (isGameOver) return;
    
    const cell = e.target.closest('.cell');
    if (!cell) return;

    if (cell.classList.contains('hit') || cell.classList.contains('miss')) return;

    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);

    const hit = targetPlayer.gameboard.receiveAttack(x, y);
    renderBoard(gridId, targetPlayer.gameboard, true);

    if (targetPlayer.gameboard.allSunk()) {
        endGame(attacker.name);
        return;
    }

    if (gameMode === 'pve') {
        if (!isGameOver) {
            setTimeout(() => computerAttack(), 500);
        }
    } else {
        currentTurn = currentTurn === 1 ? 2 : 1;
        const consigne = document.querySelector('.consigne');
        consigne.textContent = `${hit ? "HIT!" : "MISS."} It's ${currentTurn === 1 ? player1.name : player2.name}'s turn!`;
        consigne.style.backgroundColor = currentTurn === 1 ? "#3498db" : "#e67e22";
    }
}

function computerAttack() {
    if (isGameOver) return;
    
    player2.makeRandomMove(player1.gameboard);
    renderBoard('grid-left', player1.gameboard, false);

    if (player1.gameboard.allSunk()) {
        endGame(player2.name);
    }
}

function endGame(winnerName) {
    isGameOver = true;
    const consigne = document.querySelector('.consigne');
    consigne.textContent = `GAME OVER! ${winnerName} WINS!`;
    consigne.style.backgroundColor = "black";

    const btnReplay = document.getElementById('btn-play-again');
    btnReplay.classList.remove('hidden');
    
    btnReplay.onclick = () => {
        window.location.reload();
    };
}