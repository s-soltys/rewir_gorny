import Phaser from 'phaser';
import { Player } from '../world/Player.js';
import { Hotspot } from '../world/Hotspot.js';
import { WalkZone } from '../world/WalkZone.js';
import { SCENES, PANEL_WIDTH } from '../world/SceneData.js';
import { narrativeManager } from '../narrative/NarrativeManager.js';
import { AuroraEffect } from '../effects/AuroraEffect.js';
import { eventBus } from '../EventBus.js';

/**
 * Main gameplay scene.
 *
 * One Phaser scene handles ALL locations — when the Ink story emits
 * a `# scene: …` tag, this scene swaps the background, hotspots,
 * and player position with a camera fade transition.
 */
export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    /* --------------------------------------------------------
       LIFECYCLE
       -------------------------------------------------------- */

    create() {
        this.player = null;
        this.hotspots = [];
        this.walkZone = null;
        this.background = null;
        this.currentSceneId = null;
        this.isTransitioning = false;

        // Layers (depth managed per-object, but aurora sits between bg and entities)
        this.aurora = new AuroraEffect(this);

        // --- Click-to-move input ---
        this.input.on('pointerdown', (pointer) => {
            if (this.isTransitioning || !this.player || this.isDialogueActive) return;

            // Convert screen → world coordinates (accounts for camera scroll)
            const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

            if (this.walkZone) {
                if (this.walkZone.contains(worldPoint.x, worldPoint.y)) {
                    this.player.moveTo(worldPoint.x, worldPoint.y);
                } else {
                    // Clamp to nearest walkable edge
                    const clamped = this.walkZone.clamp(worldPoint.x, worldPoint.y);
                    this.player.moveTo(clamped.x, clamped.y);
                }
            }
        });

        this.isDialogueActive = true; // True by default for prologue
        eventBus.addEventListener('story-idle', () => this.isDialogueActive = false);
        eventBus.addEventListener('story-active', () => this.isDialogueActive = true);

        // --- Listen for narrative scene changes ---
        this._onSceneChange = (e) => this.transitionToScene(e.detail.sceneId);
        eventBus.addEventListener('scene-change', this._onSceneChange);

        this._onRestart = () => {
            this.currentSceneId = null;
            if (this.player) { this.player.destroy(); this.player = null; }
            this.hotspots.forEach(h => h.destroy());
            this.hotspots = [];
            if (this.background) { this.background.destroy(); this.background = null; }
        };
        eventBus.addEventListener('story-restart', this._onRestart);

        this._onPlayerChoice = (e) => {
            narrativeManager.makeChoice(e.detail.index);
        };
        eventBus.addEventListener('player-choice', this._onPlayerChoice);

        // Camera offset resize handling
        this._onResize = () => {
            if (this.player) {
                this.cameras.main.setFollowOffset(-PANEL_WIDTH / 2, 0);
            }
        };
        window.addEventListener('resize', this._onResize);

        // Start the story
        narrativeManager.start();

        // Fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    /* --------------------------------------------------------
       SCENE LOADING
       -------------------------------------------------------- */

    /**
     * Load a game scene by ID: set background, spawn player,
     * create hotspots, configure camera.
     */
    loadScene(sceneId) {
        const data = SCENES[sceneId];
        if (!data) {
            console.warn(`[GameScene] Unknown scene: ${sceneId}`);
            return;
        }

        this.currentSceneId = sceneId;

        // --- Tear down previous ---
        if (this.player) { this.player.destroy(); this.player = null; }
        this.hotspots.forEach(h => h.destroy());
        this.hotspots = [];
        if (this.background) { this.background.destroy(); this.background = null; }

        // --- Background ---
        const tex = this.textures.get(data.key);
        if (!tex || tex.key === '__MISSING') {
            console.warn(`[GameScene] Missing texture for scene: ${sceneId}`);
            // Fall back to a solid dark rectangle so the game doesn't break
            this.background = this.add.rectangle(0, 0, 1920, 1080, 0x111111).setOrigin(0, 0);
            this.background.setDepth(0);
            this.setupSceneEntities(data, 1920, 1080);
            return;
        }

        this.background = this.add.image(0, 0, data.key).setOrigin(0, 0);
        this.background.setDepth(0);

        const bgW = this.background.width;
        const bgH = this.background.height;
        const camW = this.cameras.main.width;
        const camH = this.cameras.main.height;

        // Scale to cover the viewport (object-fit: cover).
        // If image is smaller than viewport, scale up.
        // If larger, display at native res and allow camera scrolling.
        const coverScale = Math.max(camW / bgW, camH / bgH, 1);
        this.background.setScale(coverScale);

        const worldW = bgW * coverScale;
        const worldH = bgH * coverScale;

        this.setupSceneEntities(data, worldW, worldH);
    }

    /**
     * After the background is ready, spawn player, hotspots, walk zone,
     * and configure camera bounds + follow.
     */
    setupSceneEntities(data, worldW, worldH) {
        const cam = this.cameras.main;

        // Camera bounds = world size
        cam.setBounds(0, 0, worldW, worldH);

        // Walk zone
        this.walkZone = new WalkZone(data.walkZone, worldW, worldH);

        // Player spawn
        const sx = data.playerSpawn.x * worldW;
        const sy = data.playerSpawn.y * worldH;
        this.player = new Player(this, sx, sy);

        // Camera follow with offset to account for the right-side panel
        cam.startFollow(this.player.container, true, 0.08, 0.08);
        cam.setFollowOffset(-PANEL_WIDTH / 2, 0);
        // Dead zone so the camera doesn't jitter on tiny movements
        cam.setDeadzone(120, 80);

        // Hotspots
        for (const hs of data.hotspots) {
            const hotspot = new Hotspot(
                this,
                hs.x * worldW,
                hs.y * worldH,
                hs.radius,
                hs.label,
                hs.knot,
                hs.spriteKey,
                hs.hideCondition
            );
            this.hotspots.push(hotspot);
        }
    }

    /* --------------------------------------------------------
       SCENE TRANSITIONS
       -------------------------------------------------------- */

    transitionToScene(sceneId) {
        if (this.currentSceneId === sceneId) return;

        // First scene load — no fade needed
        if (!this.currentSceneId) {
            this.loadScene(sceneId);
            return;
        }

        if (this.isTransitioning) return;
        this.isTransitioning = true;

        this.cameras.main.fadeOut(600, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.loadScene(sceneId);

            this.cameras.main.fadeIn(600, 0, 0, 0);
            this.cameras.main.once('camerafadeincomplete', () => {
                this.isTransitioning = false;
            });
        });
    }

    /* --------------------------------------------------------
       UPDATE LOOP
       -------------------------------------------------------- */

    update(time, delta) {
        if (this.player) {
            this.player.update(delta);

            // Check hotspot proximity
            for (const hotspot of this.hotspots) {
                if (
                    !this.isDialogueActive &&
                    hotspot.active &&
                    !hotspot.cooldown &&
                    this.player.distanceTo(hotspot.x, hotspot.y) < hotspot.radius + 15
                ) {
                    // Trigger the story
                    narrativeManager.triggerKnot(hotspot.knotName);
                    
                    // Set cooldown
                    hotspot.cooldown = true;
                    this.time.delayedCall(2000, () => {
                        hotspot.cooldown = false;
                    });
                    
                    // Push the player back slightly so they don't immediately re-trigger when dialogue ends
                    const angle = Phaser.Math.Angle.Between(hotspot.x, hotspot.y, this.player.x, this.player.y);
                    const safeDist = hotspot.radius + 60;
                    this.player.container.setPosition(
                        hotspot.x + Math.cos(angle) * safeDist,
                        hotspot.y + Math.sin(angle) * safeDist
                    );
                    
                    // Cancel current movement tween
                    if (this.player.currentTween) {
                        this.player.currentTween.destroy();
                        this.player.currentTween = null;
                        this.player.isMoving = false;
                    }
                }
                hotspot.update(delta);
            }
        }

        // Aurora always renders
        if (this.aurora) {
            this.aurora.update(delta);
        }
    }

    /* --------------------------------------------------------
       CLEANUP
       -------------------------------------------------------- */

    shutdown() {
        eventBus.removeEventListener('scene-change', this._onSceneChange);
        eventBus.removeEventListener('story-restart', this._onRestart);
        eventBus.removeEventListener('player-choice', this._onPlayerChoice);
        if (this._onResize) {
            window.removeEventListener('resize', this._onResize);
        }

        if (this.player) this.player.destroy();
        this.hotspots.forEach(h => h.destroy());
        if (this.aurora) this.aurora.destroy();
    }
}
