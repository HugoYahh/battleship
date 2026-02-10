import './css/style.css';
import { toggleGamemode, toggleScreen, getGameInfo } from './dom.js';
import { startGame } from './game.js';

toggleGamemode();

const startBtn = document.getElementById('btn-start-game');

startBtn.addEventListener('click', () => {
    const info = getGameInfo();
    toggleScreen('start-screen-container', 'container-main-game'); 
    startGame(info.name1, info.name2, info.mode);
});