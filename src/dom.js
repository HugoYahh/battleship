export function getGameInfo() {
    return {
        name1: document.getElementById('player-name-input').value || 'Player 1',
        name2: document.getElementById('p2').value || 'Ennemy',
        mode: document.querySelector('.pve').classList.contains('selected') ? 'pve' : 'pvp'
    };
}

export function toggleGamemode() {
    const pvpButton = document.querySelector(".pvp");
    const pveButton = document.querySelector(".pve");
    const p2InputGroup = document.getElementById("p2-group");
    
    pvpButton.addEventListener("click", () => {
        pvpButton.classList.add("selected");    
        pveButton.classList.remove("selected"); 
        if (p2InputGroup) p2InputGroup.classList.remove("hidden"); 
    });

    pveButton.addEventListener("click", () => {
        pveButton.classList.add("selected");    
        pvpButton.classList.remove("selected"); 
        if (p2InputGroup) p2InputGroup.classList.add("hidden"); 
    });
}

export function toggleScreen(hideClass, showClass) {
    const hideEl = document.querySelector(`.${hideClass}`);
    const showEl = document.querySelector(`.${showClass}`);

    if (hideEl) hideEl.classList.add('hidden');
    if (showEl) showEl.classList.remove('hidden');
}

export function renderBoard(elementId, board, isEnemy = false) {
    const container = document.getElementById(elementId);
    container.innerHTML = "";
    
    const grid = board.getBoard();
    const missed = board.missedAttacks;
    const hits = board.successfulHits;

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            
            cellDiv.dataset.x = x;
            cellDiv.dataset.y = y;

            const cellContent = grid[y][x]; 

            if (cellContent !== null && !isEnemy) {
                cellDiv.classList.add("ship");
            }

            const isHit = hits.some(h => h.x === x && h.y === y);
            if (isHit) cellDiv.classList.add("hit");

            const isMiss = missed.some(m => m.x === x && m.y === y);
            if (isMiss) cellDiv.classList.add("miss");

            container.appendChild(cellDiv);
        }
    }
}