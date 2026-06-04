import './style.css';
import Phaser from 'phaser';
import { gameConfig } from './config.js';

// Import UI modules to initialize their event listeners (singletons)
import './ui/DialoguePanel.js';
import './ui/SceneBadge.js';
import './ui/InventoryPanel.js';
import './ui/QuestPanel.js';
import './narrative/AudioManager.js';

// Setup toggles
const sidePanels = document.getElementById('side-panels');
const questPanelDiv = document.getElementById('quest-panel');
const inventoryPanelDiv = document.getElementById('inventory-panel');

let currentActive = null;

function togglePanel(panelDiv) {
    if (currentActive === panelDiv) {
        sidePanels.classList.add('hidden');
        panelDiv.classList.remove('active');
        currentActive = null;
    } else {
        sidePanels.classList.remove('hidden');
        if (currentActive) currentActive.classList.remove('active');
        panelDiv.classList.add('active');
        currentActive = panelDiv;
    }
}

document.getElementById('toggle-quests-btn').addEventListener('click', () => {
    togglePanel(questPanelDiv);
});
document.getElementById('toggle-inventory-btn').addEventListener('click', () => {
    togglePanel(inventoryPanelDiv);
});

// Boot the Phaser game
const game = new Phaser.Game(gameConfig);
