import * as PIXI from 'pixi.js';

export class Hotspot {
    constructor(x, y, radius, label, knotName) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.label = label;
        this.knotName = knotName;
        this.active = true;

        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = y;

        // Visual representation
        this.graphics = new PIXI.Graphics();
        this.graphics.circle(0, 0, radius);
        this.graphics.stroke({ color: 0x7b8c73, width: 2, alpha: 0.5 }); // Green circle
        
        // Inner pulse
        this.innerGraphics = new PIXI.Graphics();
        this.innerGraphics.circle(0, 0, radius * 0.8);
        this.innerGraphics.fill({ color: 0x7b8c73, alpha: 0.2 });

        this.container.addChild(this.innerGraphics);
        this.container.addChild(this.graphics);

        // Label
        this.text = new PIXI.Text(label, {
            fontFamily: 'IBM Plex Mono',
            fontSize: 14,
            fill: 0xffffff,
            align: 'center',
            letterSpacing: 2
        });
        this.text.anchor.set(0.5);
        this.text.y = -radius - 15;
        this.container.addChild(this.text);
        
        this.time = 0;
    }

    update(delta) {
        if (!this.active) return;
        this.time += delta * 0.05;
        this.innerGraphics.alpha = 0.5 + Math.sin(this.time) * 0.5;
    }

    hide() {
        this.active = false;
        this.container.visible = false;
    }
}
