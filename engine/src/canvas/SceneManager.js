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
        
        this.bgSprite = new PIXI.Sprite();
        this.environmentLayer.addChild(this.bgSprite);
        this.auroraGraphics = new PIXI.Graphics();
        this.environmentLayer.addChild(this.auroraGraphics);
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
        
        this.setupAuroraEffect(); // Start aurora once

        // Handle resize for background
        window.addEventListener('resize', () => this.resizeBackground());

        // Listen to story state for scene changes
        this.unsubscribe = story.subscribe(state => {
            if (state.currentScene && state.currentScene !== this.currentSceneId) {
                this.loadScene(state.currentScene);
            }
        });
    }

    resizeBackground() {
        if (!this.bgSprite || !this.bgSprite.texture || this.bgSprite.texture.width === 0) return;
        
        // ensure we have a valid width, fallback to window innerWidth if canvas hasn't fully laid out
        const width = this.app.screen.width || window.innerWidth / 2;
        const height = this.app.screen.height || window.innerHeight;
        
        const scaleX = width / this.bgSprite.texture.width;
        const scaleY = height / this.bgSprite.texture.height;
        const scale = Math.max(scaleX, scaleY);
        
        this.bgSprite.scale.set(scale);
        this.bgSprite.x = (width - this.bgSprite.width) / 2;
        this.bgSprite.y = (height - this.bgSprite.height) / 2;
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

    async loadScene(sceneId) {
        if (this.currentSceneId === sceneId) return;
        this.currentSceneId = sceneId;
        
        this.hotspots = [];
        this.entitiesLayer.removeChildren();

        // Load AI generated background image
        try {
            const texture = await PIXI.Assets.load(`/images/scenes/${sceneId}.jpeg`);
            this.bgSprite.texture = texture;
            this.bgSprite.alpha = 0.8; // Increased opacity for better visibility
            this.resizeBackground();
        } catch (e) {
            console.warn(`Could not load background for ${sceneId}. Generate images first!`, e);
            this.bgSprite.texture = PIXI.Texture.EMPTY;
        }

        const width = this.app.screen.width || window.innerWidth / 2;
        const height = this.app.screen.height || window.innerHeight;

        // Spawn player in center by default
        this.player = new Player(width / 2, height / 2);
        this.entitiesLayer.addChild(this.player.graphics);

        if (sceneId === 'station') {
            const kioskHotspot = new Hotspot(width - 150, 100, 40, 'Kiosk', 'station_kiosk');
            this.hotspots.push(kioskHotspot);
            this.entitiesLayer.addChild(kioskHotspot.container);
        } else if (sceneId === 'the_clearing') {
            const firepit = new Hotspot(width * 0.6, height * 0.5, 30, 'Fire', 'gateway_friend_conversation');
            this.hotspots.push(firepit);
            this.entitiesLayer.addChild(firepit.container);
        }
    }

    setupAuroraEffect() {
        let time = 0;
        this.app.ticker.add((ticker) => {
            time += ticker.deltaTime * 0.02;
            this.auroraGraphics.clear();
            const w = this.app.screen.width || window.innerWidth / 2;
            const h = this.app.screen.height || window.innerHeight;
            this.auroraGraphics.moveTo(0, h * 0.2 + Math.sin(time) * 50);
            this.auroraGraphics.bezierCurveTo(
                w * 0.3, h * 0.1 + Math.sin(time * 1.2) * 50,
                w * 0.7, h * 0.3 + Math.cos(time * 0.8) * 50,
                w, h * 0.2 + Math.cos(time) * 50
            );
            this.auroraGraphics.stroke({ color: 0x7b8c73, width: 80, alpha: 0.1 + Math.sin(time * 2) * 0.05 });
        });
    }



    destroy() {
        if (this.unsubscribe) this.unsubscribe();
        this.app.destroy(true, { children: true });
    }
}
