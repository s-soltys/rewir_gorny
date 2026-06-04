import Phaser from 'phaser';

/**
 * Abstract player representation — a glowing circle with copper accent.
 * Moves via tweened click-to-move. Depth-sorted by Y for isometric layering.
 */
export class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.speed = 220; // pixels per second
        this.currentTween = null;
        this.isMoving = false;

        // Create visual layers
        this.container = scene.add.container(x, y);
        this.container.setDepth(y);

        // Outer glow ring
        const glow = scene.add.graphics();
        glow.lineStyle(2, 0xc87533, 0.5);
        glow.strokeCircle(0, 0, 18);
        this.container.add(glow);

        // Player Sprite
        this.sprite = scene.add.sprite(0, 0, 'sprite_player');
        this.sprite.setScale(0.15); // Scale down the generated sprite
        this.container.add(this.sprite);

        // Breathing glow animation
        this.glowGraphics = glow;
        this.breatheTime = 0;
    }

    /** Move the player to a world-space target. */
    moveTo(x, y) {
        if (this.currentTween) {
            this.currentTween.destroy();
            this.currentTween = null;
        }

        const distance = Phaser.Math.Distance.Between(
            this.container.x, this.container.y, x, y
        );
        const duration = (distance / this.speed) * 1000;

        this.isMoving = true;
        this.currentTween = this.scene.tweens.add({
            targets: this.container,
            x: x,
            y: y,
            duration: Math.max(duration, 80),
            ease: 'Sine.easeInOut',
            onUpdate: () => {
                // Continuous depth sorting while moving
                this.container.setDepth(this.container.y);
            },
            onComplete: () => {
                this.isMoving = false;
                this.currentTween = null;
            }
        });
    }

    /** Per-frame update. */
    update(delta) {
        // Depth sort
        this.container.setDepth(this.container.y);

        // Subtle breathing glow
        this.breatheTime += delta * 0.001;
        const alpha = 0.35 + Math.sin(this.breatheTime * 1.5) * 0.15;
        this.glowGraphics.clear();
        this.glowGraphics.lineStyle(2, 0xc87533, alpha);
        this.glowGraphics.strokeCircle(0, 0, 18);
    }

    distanceTo(x, y) {
        return Phaser.Math.Distance.Between(this.container.x, this.container.y, x, y);
    }

    get x() { return this.container.x; }
    get y() { return this.container.y; }

    destroy() {
        if (this.currentTween) {
            this.currentTween.destroy();
            this.currentTween = null;
        }
        this.container.destroy();
    }
}
