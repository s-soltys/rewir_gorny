import Phaser from 'phaser';
import { audioManager } from '../narrative/AudioManager.js';

/**
 * Title screen — dark splash with the game title and a click-to-start prompt.
 */
export class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    create() {
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

        this.cameras.main.setBackgroundColor('#0a0a0a');

        // Title
        this.add.text(w / 2, h / 2 - 50, 'REWIR GÓRNY', {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '48px',
            color: '#c87533',
            letterSpacing: 12
        }).setOrigin(0.5);

        // Subtitle
        this.add.text(w / 2, h / 2 + 10, 'OSIEDLE GÓRNE, 1996', {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.25)',
            letterSpacing: 6
        }).setOrigin(0.5);

        // Instruction (pulsing)
        const instruction = this.add.text(w / 2, h / 2 + 80, 'CLICK ANYWHERE TO ENTER', {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px',
            color: '#ffffff',
            letterSpacing: 4
        }).setOrigin(0.5).setAlpha(0.3);

        this.tweens.add({
            targets: instruction,
            alpha: { from: 0.25, to: 0.7 },
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Click handler
        this.input.once('pointerdown', async () => {
            // Unlock audio on first interaction
            await audioManager.unlock();

            // Cinematic fade out
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('GameScene');
            });
        });

        // Fade in
        this.cameras.main.fadeIn(800, 0, 0, 0);
    }
}
