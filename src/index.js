import './css/style.css';
import {Gameboard} from './gameboard.js';
import {Player} from './player.js';
import {Ship} from './ship.js';
import { toggleGamemode , toggleScreen, getGameInfo} from './dom.js';

toggleGamemode();

const startBtn = document.getElementById('btn-start-game');

startBtn.addEventListener('click', () => {
    const info = getGameInfo();

    
    toggleScreen('start-screen-container', 'container-main-game'); 


});