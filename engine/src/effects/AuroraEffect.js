/**
 * Atmospheric copper-green aurora effect.
 * Renders animated bezier curves across the visible camera area.
 * Drawn on a Phaser Graphics object above the background but below entities.
 */
export class AuroraEffect {
    constructor(scene) {
        this.scene = scene;
        this.graphics = scene.add.graphics();
        this.graphics.setDepth(2); // Above background (0), below entities (~y)
        this.time = 0;
    }

    update(delta) {
        this.time += delta * 0.001 * 0.7; // slow, hypnotic
        this.graphics.clear();

        const cam = this.scene.cameras.main;
        const left = cam.scrollX;
        const top = cam.scrollY;
        const w = cam.width;
        const h = cam.height;

        // Three aurora bands, each with a different hue and speed
        const bands = [
            { color: 0x7b8c73, width: 60, yFrac: 0.18, speed: 1.0 },   // green
            { color: 0x8b6914, width: 45, yFrac: 0.24, speed: 0.7 },   // copper
            { color: 0x4a7a6a, width: 35, yFrac: 0.30, speed: 1.3 },   // teal
        ];

        for (const band of bands) {
            const yBase = top + h * band.yFrac;
            const t = this.time * band.speed;
            const alpha = 0.05 + Math.sin(t * 2) * 0.025;

            this.graphics.lineStyle(band.width, band.color, alpha);
            this.graphics.beginPath();

            // Start point
            const sy = yBase + Math.sin(t) * 40;
            this.graphics.moveTo(left, sy);

            // Draw bezier as line segments
            const cp1x = left + w * 0.3;
            const cp1y = yBase - 30 + Math.sin(t * 1.2) * 45;
            const cp2x = left + w * 0.7;
            const cp2y = yBase + 20 + Math.cos(t * 0.8) * 45;
            const ex = left + w;
            const ey = yBase + Math.cos(t) * 40;

            const steps = 24;
            for (let i = 1; i <= steps; i++) {
                const s = i / steps;
                const x = this.bezier(s, left, cp1x, cp2x, ex);
                const y = this.bezier(s, sy, cp1y, cp2y, ey);
                this.graphics.lineTo(x, y);
            }

            this.graphics.strokePath();
        }
    }

    /** Cubic bezier interpolation. */
    bezier(t, p0, p1, p2, p3) {
        const mt = 1 - t;
        return mt * mt * mt * p0
             + 3 * mt * mt * t * p1
             + 3 * mt * t * t * p2
             + t * t * t * p3;
    }

    destroy() {
        if (this.graphics) this.graphics.destroy();
    }
}
