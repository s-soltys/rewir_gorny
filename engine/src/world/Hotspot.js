import Phaser from 'phaser';

/**
 * Interactive trigger zone in the game world.
 * Renders as a pulsing green circle with a label.
 * When the player walks close enough, it fires and triggers an Ink knot.
 */
export class Hotspot {
    constructor(scene, x, y, radius, label, knotName) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.label = label;
        this.knotName = knotName;
        this.active = true;
        this.time = 0;

        this.container = scene.add.container(x, y);
        this.container.setDepth(y - 1);

        // Inner pulse disc
        this.innerGfx = scene.add.graphics();
        this.innerGfx.fillStyle(0x7b8c73, 0.15);
        this.innerGfx.fillCircle(0, 0, radius * 0.8);
        this.container.add(this.innerGfx);

        // Outer ring
        this.outerGfx = scene.add.graphics();
        this.outerGfx.lineStyle(2, 0x7b8c73, 0.5);
        this.outerGfx.strokeCircle(0, 0, radius);
        this.container.add(this.outerGfx);

        // Label
        this.text = scene.add.text(0, -radius - 18, label, {
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '13px',
            color: '#ffffff',
            align: 'center',
            letterSpacing: 2
        }).setOrigin(0.5, 0.5).setAlpha(0.7);
        this.container.add(this.text);
    }

    update(delta) {
        if (!this.active) return;
        this.time += delta * 0.001;

        // Pulsing inner glow
        const alpha = 0.3 + Math.sin(this.time * 3) * 0.25;
        this.innerGfx.clear();
        this.innerGfx.fillStyle(0x7b8c73, alpha);
        this.innerGfx.fillCircle(0, 0, this.radius * 0.8);
    }

    hide() {
        this.active = false;
        this.scene.tweens.add({
            targets: this.container,
            alpha: 0,
            duration: 400,
            ease: 'Sine.easeOut',
            onComplete: () => this.container.setVisible(false)
        });
    }

    destroy() {
        this.container.destroy();
    }
}
