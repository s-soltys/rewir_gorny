# Rewir Górny Architecture Documentation

This document describes the technical architecture of the Rewir Górny interactive narrative engine.
**If you implement a new pattern or discover a technical constraint, you must update this file as part of the self-refining process.**

---

## Core Technologies

1.  **Phaser 3.90.0 (Game Engine)**: Full-screen isometric 2D game with scene management, camera scrolling, tweened movement, and graphics rendering.
2.  **Vanilla DOM + CSS (UI Layer)**: Right-side dialogue panel, choice buttons, scene badge — all rendered as HTML/CSS overlaid on the Phaser canvas. No framework; just `document.createElement()` and CSS animations.
3.  **InkJS 2.4 (Narrative Engine)**: Compiles and processes `.ink` scripts, managing branching logic, variables, and state.
4.  **EventBus (Cross-Module Events)**: A native `EventTarget` singleton that decouples the Phaser game from the DOM UI. All communication flows through events, never direct coupling.
5.  **Kokoro TTS via OpenRouter**: Generates character voices dynamically. Produces raw PCM wrapped in WAV headers.
6.  **Vite 8 (Build Tool)**: Dev server with hot reload. Custom `inkPlugin()` compiles `.ink` files to JSON at import time.

---

## File Structure

```
engine/src/
├── main.js                         # Entry point: imports CSS, initializes singletons, creates Phaser.Game
├── config.js                       # Phaser game config (RESIZE mode, no physics)
├── style.css                       # All UI styling (glassmorphism panel, traits, choices, animations)
├── EventBus.js                     # Shared event bus (native EventTarget)
│
├── scenes/
│   ├── BootScene.js                # Preloads all scene background images
│   ├── TitleScene.js               # Title screen with audio unlock
│   └── GameScene.js                # Main gameplay (one scene, swaps content per location)
│
├── world/
│   ├── Player.js                   # Abstract player (circle + glow + shadow, tweened movement)
│   ├── Hotspot.js                  # Interactive trigger zones (pulsing green rings)
│   ├── WalkZone.js                 # Polygon-based walkability (point-in-polygon + edge clamping)
│   └── SceneData.js                # Scene registry (backgrounds, spawns, hotspots, walk zones)
│
├── narrative/
│   ├── NarrativeManager.js         # InkJS wrapper, tag parser, event emitter
│   └── AudioManager.js             # Sequential WAV playback with autoplay unlock
│
├── ui/
│   ├── DialoguePanel.js            # Right-side panel (text + traits + choices)
│   └── SceneBadge.js               # Top-left location indicator
│
└── effects/
    └── AuroraEffect.js             # Animated copper-green aurora (bezier curves)
```

---

## Data Flow

### 1. Story → Events → Game + UI

```
NarrativeManager.advanceStory()
  ├─ Reads all ink text via Continue() loop
  ├─ Parses # speaker: tags and # scene: tags PER LINE (not after loop)
  ├─ Computes MD5-based audio file paths
  │
  ├─► eventBus.dispatch('scene-change', { sceneId })
  │     └─ GameScene.transitionToScene() — fade out, swap background, fade in
  │     └─ SceneBadge.update() — shows location name
  │
  ├─► eventBus.dispatch('story-text', { lines })
  │     └─ DialoguePanel.addTextLines() — renders text + trait interjections
  │
  ├─► eventBus.dispatch('story-choices', { choices })
  │     └─ DialoguePanel.showChoices() — renders choice buttons
  │
  └─► eventBus.dispatch('story-audio', { queue })
        └─ AudioManager.addToQueue() — plays WAV files sequentially
```

### 2. Player Input → Story

```
Click on game canvas
  └─ GameScene pointer handler
     ├─ Ignores if click is over the UI panel (x > viewport - 420px)
     ├─ Converts screen coords → world coords (camera.getWorldPoint)
     ├─ Tests against WalkZone polygon
     └─ Player.moveTo(x, y) — tweened movement

Player walks near Hotspot (distance < radius + 15)
  └─ GameScene.update() detects proximity
     ├─ Hotspot.hide() — fade-out animation
     └─ NarrativeManager.triggerKnot(knotName)

Click on choice button (DOM)
  └─ DialoguePanel click handler
     └─ NarrativeManager.makeChoice(index)
        ├─ eventBus.dispatch('audio-interrupt')
        └─ advanceStory() — emits new text/choices/scene
```

### 3. Scene Transitions

```
# scene: the_clearing  (Ink tag detected)
  └─ NarrativeManager emits 'scene-change'
     └─ GameScene.transitionToScene('the_clearing')
        ├─ Camera fadeOut (600ms)
        ├─ Destroy old: player, hotspots, background
        ├─ Load new: background image, WalkZone, Player spawn, Hotspots
        ├─ Configure camera bounds + follow + offset
        └─ Camera fadeIn (600ms)
```

---

## Camera System

*   **Mode**: `Phaser.Scale.RESIZE` — canvas always fills the viewport.
*   **Follow**: Smooth lerp (`0.08, 0.08`) with dead zone (`120, 80`).
*   **Panel Offset**: `setFollowOffset(-PANEL_WIDTH / 2, 0)` — centers the player in the visible area left of the 420px dialogue panel.
*   **Bounds**: Set to the scaled background dimensions. If the background is larger than the viewport, the camera scrolls. If smaller, it's scaled up ("cover" behavior).

---

## Isometric Rendering

Currently uses **pre-rendered isometric backgrounds** (AI-generated JPEGs), not tile-based maps. The isometric feel comes from:
1.  Backgrounds drawn in isometric perspective.
2.  Player depth-sorted by Y coordinate (`container.setDepth(container.y)`).
3.  Hotspots depth-sorted just below player level.
4.  Shadow ellipse on the player sprite for grounding.

**Future**: If tile-based isometric maps are needed, Phaser 3 has built-in Tiled JSON support (`this.make.tilemap()`). The coordinate conversion formulas are:
```
screenX = (cartX - cartY) * (tileWidth / 2)
screenY = (cartX + cartY) * (tileHeight / 2)
```

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Copper accent | `#c87533` / `0xc87533` | Player glow, UI borders, hover states, title text |
| Nostalgia | `#648296` | Trait interjection color |
| Perception | `#7b8c73` / `0x7b8c73` | Trait color + hotspot rings + aurora |
| Anxiety | `#9c5c5c` | Trait interjection color |
| Background dark | `#0a0a0a` | Canvas background, panel background (88% opacity) |
| Font | IBM Plex Mono | All text (loaded via Google Fonts) |
| Panel width | 420px | Right-side dialogue panel |

---

## Known Constraints & Quirks

*   **Audio Autoplay**: Browser blocks audio until user interaction. Solved in `TitleScene.js` by calling `audioManager.unlock()` on the first click, which plays a silent base64 WAV to unlock the `AudioContext`.
*   **Audio Interruption**: When a choice is made, `eventBus.dispatch('audio-interrupt')` clears the queue and pauses the `<audio>` element immediately.
*   **TTS Generation**: `generate_voices.js` queries OpenRouter's Kokoro model. OpenRouter returns raw, headerless 24kHz PCM. The script wraps this in a 44-byte WAV header. The game strictly expects `.wav` files in `public/audio/`.
*   **Ink Tag Parsing**: Tags are parsed **inside** the `Continue()` loop (per-line), not after. This catches `# scene:` tags on any line, not just the last one — fixing a bug in the original Svelte implementation.
*   **Phaser Texture Memory**: A 2048×2048 image uses ~16MB VRAM regardless of file size. Keep backgrounds ≤ 4096px on the longest side for mobile compatibility.
*   **DOM Click Isolation**: The UI panel has `pointer-events: auto` when visible, so clicks on it never reach the Phaser canvas. An additional safety check in GameScene ignores clicks where `pointer.x > viewport - PANEL_WIDTH`.

---

## Known Debt

*   Walk zones are generous rectangles — should be refined per-scene with precise polygon shapes once isometric backgrounds are generated.
*   No pathfinding (EasyStar.js is planned but not integrated). Player moves in a straight line.
*   No save/load system.
*   No inventory UI (the `has_cigarette` Ink variable exists but has no visual representation).
*   Scene backgrounds are flat perspective — need re-generation with isometric prompts via `generate_images.js`.
*   No responsive handling for the 420px panel on small screens.
*   `copper_exposure` Ink variable could drive aurora intensity but doesn't yet.
