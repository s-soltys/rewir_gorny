import * as PIXI from 'pixi.js';
import { Player } from './Player.js';
import { Hotspot } from './Hotspot.js';
import { story } from '../store/story.js';

export class SceneManager {
    constructor(canvasElement) {
        this.app = new PIXI.Application();
        this.canvasElement = canvasElement;
        
        this.player = null;
        this.hotspots = [];
        this.currentSceneId = null;
        this.unsubscribe = null;
        
        this.environmentLayer = new PIXI.Container();
        this.entitiesLayer = new PIXI.Container();
    }

    async init() {
        await this.app.init({
            canvas: this.canvasElement,
            resizeTo: this.canvasElement.parentElement,
            backgroundAlpha: 0,
            antialias: true,
        });

        this.app.stage.addChild(this.environmentLayer);
        this.app.stage.addChild(this.entitiesLayer);

        // Handle click-to-move
        this.app.stage.eventMode = 'static';
        this.app.stage.hitArea = new PIXI.Rectangle(0, 0, 10000, 10000);
        this.app.stage.on('pointerdown', (e) => {
            if (this.player) {
                this.player.setTarget(e.global.x, e.global.y);
            }
        });

        this.app.ticker.add((ticker) => this.update(ticker.deltaTime));

        // Listen to story state for scene changes
        this.unsubscribe = story.subscribe(state => {
            if (state.currentScene && state.currentScene !== this.currentSceneId) {
                this.loadScene(state.currentScene);
            }
        });
    }

    update(delta) {
        if (this.player) {
            this.player.update(delta);
            
            // Check hotspot collisions
            for (const hotspot of this.hotspots) {
                if (hotspot.active && this.player.distanceTo(hotspot.x, hotspot.y) < hotspot.radius) {
                    hotspot.hide(); // Trigger once
                    story.triggerKnot(hotspot.knotName);
                }
                hotspot.update(delta);
            }
        }
    }

    loadScene(sceneId) {
        this.currentSceneId = sceneId;
        
        // Clear old scene
        this.environmentLayer.removeChildren();
        this.entitiesLayer.removeChildren();
        this.hotspots = [];
        
        const width = this.app.screen.width;
        const height = this.app.screen.height;

        // Common background aurora
        this.setupAuroraEffect();

        // Spawn player in center by default
        this.player = new Player(width / 2, height / 2);
        this.entitiesLayer.addChild(this.player.graphics);

        if (sceneId === 'station') {
            this.buildStationScene(width, height);
        } else if (sceneId === 'the_blocks') {
            this.buildBlocksScene(width, height);
        } else if (sceneId === 'the_clearing') {
            this.buildClearingScene(width, height);
        }
    }

    setupAuroraEffect() {
        const aurora = new PIXI.Graphics();
        this.environmentLayer.addChild(aurora);
        let time = 0;
        this.app.ticker.add((ticker) => {
            time += ticker.deltaTime * 0.02;
            aurora.clear();
            const w = this.app.screen.width;
            const h = this.app.screen.height;
            aurora.moveTo(0, h * 0.2 + Math.sin(time) * 50);
            aurora.bezierCurveTo(
                w * 0.3, h * 0.1 + Math.sin(time * 1.2) * 50,
                w * 0.7, h * 0.3 + Math.cos(time * 0.8) * 50,
                w, h * 0.2 + Math.cos(time) * 50
            );
            aurora.stroke({ color: 0x7b8c73, width: 80, alpha: 0.05 + Math.sin(time * 2) * 0.02 });
        });
    }

    buildStationScene(w, h) {
        // Draw station building
        const station = new PIXI.Graphics();
        station.rect(50, 50, 200, 100);
        station.fill({ color: 0x2a2a2a });
        station.stroke({ color: 0x4a4a4a, width: 2 });
        this.environmentLayer.addChild(station);

        const stationText = new PIXI.Text('PIŁA GŁÓWNA', { fontFamily: 'IBM Plex Mono', fontSize: 16, fill: 0x888888 });
        stationText.x = 60;
        stationText.y = 60;
        this.environmentLayer.addChild(stationText);

        // Kiosk hotspot
        const kioskHotspot = new Hotspot(w - 150, 100, 40, 'Kiosk', 'station_kiosk');
        this.hotspots.push(kioskHotspot);
        this.entitiesLayer.addChild(kioskHotspot.container);
    }

    buildBlocksScene(w, h) {
        // Draw some brutalist blocks
        for (let i = 0; i < 3; i++) {
            const block = new PIXI.Graphics();
            block.rect(w * 0.1 + i * (w * 0.3), h * 0.3, w * 0.2, h * 0.5);
            block.fill({ color: 0x222222 });
            block.stroke({ color: 0x333333, width: 2 });
            this.environmentLayer.addChild(block);
        }
    }

    buildClearingScene(w, h) {
        // Draw forest edge
        for (let i = 0; i < 10; i++) {
            const tree = new PIXI.Graphics();
            tree.circle(w * 0.8 + Math.random() * w * 0.2, Math.random() * h, 20 + Math.random() * 20);
            tree.fill({ color: 0x1a2e1a });
            this.environmentLayer.addChild(tree);
        }

        // Fire pit hotspot
        const firepit = new Hotspot(w * 0.6, h * 0.5, 30, 'Fire', 'gateway_friend_conversation');
        this.hotspots.push(firepit);
        this.entitiesLayer.addChild(firepit.container);
    }

    destroy() {
        if (this.unsubscribe) this.unsubscribe();
        this.app.destroy(true, { children: true });
    }
}
