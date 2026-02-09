import{Gameboard} from './gameboard.js'
import { Ship } from './ship.js'
import {Player} from './player.js'

export function getGameInfo() {
    return {
        name1: document.getElementById('player-name-input').value || 'Player 1',
        name2: document.getElementById('p2').value || 'Ennemy',
        mode: document.querySelector('.pve').classList.contains('selected') ? 'pve' : 'pvp'
    };
}

export function toggleGamemode(){
    const pvpButton = document.querySelector(".pvp");
    const pveButton = document.querySelector(".pve");
    const p2InputGroup = document.getElementById("p2-group");
    
    pvpButton.addEventListener("click", () => {
        pvpButton.classList.add("selected");    
        pveButton.classList.remove("selected"); 

        if (p2InputGroup) {
            p2InputGroup.classList.remove("hidden"); 
        }
    });

    pveButton.addEventListener("click", () => {
        pveButton.classList.add("selected");    
        pvpButton.classList.remove("selected"); 

        if (p2InputGroup) {
            p2InputGroup.classList.add("hidden"); 
        }
    });
}

export function toggleScreen(hideClass, showClass) {
    // On ajoute le "." devant la variable pour créer un sélecteur de classe CSS
    // Ex: si tu passes "menu", ça cherche ".menu"
    const hideEl = document.querySelector(`.${hideClass}`);
    const showEl = document.querySelector(`.${showClass}`);

    if (hideEl) {
        hideEl.classList.add('hidden');
    } else {
        console.warn(`Attention : Impossible de trouver l'élément à cacher (.${hideClass})`);
    }

    if (showEl) {
        showEl.classList.remove('hidden');
    } else {
        console.warn(`Attention : Impossible de trouver l'élément à afficher (.${showClass})`);
    }
}