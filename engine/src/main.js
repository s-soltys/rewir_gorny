import './style.css';
import Phaser from 'phaser';
import { gameConfig } from './config.js';

// Import UI modules to initialize their event listeners (singletons)
import './ui/DialoguePanel.js';
import './ui/SceneBadge.js';
import './narrative/AudioManager.js';

// Launch the game
const game = new Phaser.Game(gameConfig);
