import * as PIXI from 'pixi.js';

export class Player {
    constructor(x, y) {
        this.graphics = new PIXI.Graphics();
        
        // Add a subtle glow/stroke first so it's behind the fill
        this.graphics.circle(0, 0, 18);
        this.graphics.stroke({ color: 0xc87533, width: 2, alpha: 0.8 });

        // White circle
        this.graphics.circle(0, 0, 15);
        this.graphics.fill({ color: 0xffffff });

        this.graphics.x = x;
        this.graphics.y = y;

        this.targetX = x;
        this.targetY = y;
        this.speed = 300; // pixels per second
    }

    setTarget(x, y) {
        this.targetX = x;
        this.targetY = y;
    }

    update(delta) {
        const dx = this.targetX - this.graphics.x;
        const dy = this.targetY - this.graphics.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
            // Move towards target
            const moveDist = this.speed * (delta / 60); // assuming 60fps
            if (moveDist >= distance) {
                this.graphics.x = this.targetX;
                this.graphics.y = this.targetY;
            } else {
                this.graphics.x += (dx / distance) * moveDist;
                this.graphics.y += (dy / distance) * moveDist;
            }
        }
    }

    // Check distance to a point (for hotspots)
    distanceTo(x, y) {
        const dx = x - this.graphics.x;
        const dy = y - this.graphics.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
