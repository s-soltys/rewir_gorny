import Phaser from 'phaser';
import { SCENES } from '../world/SceneData.js';

/**
 * Boot scene — preloads all assets and shows a minimal loading bar.
 */
export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

        // --- Loading bar ---
        const barWidth = 280;
        const barHeight = 3;
        const barX = (w - barWidth) / 2;
        const barY = h / 2 + 50;

        // Track
        const track = this.add.graphics();
        track.fillStyle(0x1a1a1a, 1);
        track.fillRect(barX, barY, barWidth, barHeight);

        // Progress fill
        const bar = this.add.graphics();

        // Label
        this.add.text(w / 2, h / 2, 'LOADING', {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            color: '#c87533',
            letterSpacing: 8
        }).setOrigin(0.5);

        this.load.on('progress', (value) => {
            bar.clear();
            bar.fillStyle(0xc87533, 1);
            bar.fillRect(barX, barY, barWidth * value, barHeight);
        });

        // --- Load scene backgrounds ---
        for (const [, scene] of Object.entries(SCENES)) {
            this.load.image(scene.key, scene.path);
        }
    }

    create() {
        // Brief pause on the loader, then transition
        this.time.delayedCall(300, () => {
            this.scene.start('TitleScene');
        });
    }
}
