import Phaser from 'phaser';

/**
 * Defines a walkable area on a scene background as a polygon.
 * Points are provided in normalized coordinates (0–1) and
 * converted to pixel coordinates based on the background dimensions.
 */
export class WalkZone {
    /**
     * @param {Array<{x: number, y: number}>} normalizedPoints — Polygon vertices (0–1)
     * @param {number} bgWidth  — Background width in pixels
     * @param {number} bgHeight — Background height in pixels
     */
    constructor(normalizedPoints, bgWidth, bgHeight) {
        this.bgWidth = bgWidth;
        this.bgHeight = bgHeight;

        const pixelPoints = normalizedPoints.flatMap(p => [
            p.x * bgWidth,
            p.y * bgHeight
        ]);
        this.polygon = new Phaser.Geom.Polygon(pixelPoints);
    }

    /** Check whether a world-space point is inside the walkable area. */
    contains(x, y) {
        return Phaser.Geom.Polygon.Contains(this.polygon, x, y);
    }

    /**
     * If a target point is outside the walk zone, return the closest
     * point on the polygon's edge. Otherwise return the point as-is.
     */
    clamp(x, y) {
        if (this.contains(x, y)) return { x, y };

        const points = this.polygon.points;
        let closest = { x, y };
        let minDist = Infinity;

        for (let i = 0; i < points.length; i++) {
            const a = points[i];
            const b = points[(i + 1) % points.length];
            const pt = WalkZone.closestPointOnSegment(x, y, a.x, a.y, b.x, b.y);
            const dist = Phaser.Math.Distance.Between(x, y, pt.x, pt.y);
            if (dist < minDist) {
                minDist = dist;
                closest = pt;
            }
        }

        return closest;
    }

    /** Project point (px,py) onto segment (ax,ay)–(bx,by). */
    static closestPointOnSegment(px, py, ax, ay, bx, by) {
        const dx = bx - ax;
        const dy = by - ay;
        const len2 = dx * dx + dy * dy;
        if (len2 === 0) return { x: ax, y: ay };

        let t = ((px - ax) * dx + (py - ay) * dy) / len2;
        t = Phaser.Math.Clamp(t, 0, 1);

        return { x: ax + t * dx, y: ay + t * dy };
    }
}
