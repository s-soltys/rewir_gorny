import './style.css';
import Phaser from 'phaser';
import { gameConfig } from './config.js';

// Import essential managers
import './narrative/AudioManager.js';

// Import and mount Svelte UI Root
import { mount } from 'svelte';
import App from './ui/App.svelte';

const svelteApp = mount(App, {
    target: document.getElementById('svelte-app')
});

// Boot the Phaser game
const game = new Phaser.Game(gameConfig);
