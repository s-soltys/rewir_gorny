import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene.js';
import { TitleScene } from './scenes/TitleScene.js';
import { GameScene } from './scenes/GameScene.js';

export const gameConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    backgroundColor: '#0a0a0a',
    render: {
        antialias: true,
        transparent: false,
    },
    scene: [BootScene, TitleScene, GameScene],
};
