# AGENT INSTRUCTIONS: REWIR GÓRNY
**Read this before performing any tasks in this repository.**

This repository is optimized for AI-first "vibe coding." It houses an isometric 2D narrative game built with **Phaser 3**, **InkJS**, and vanilla DOM UI. To ensure predictable development, you must strictly follow these boundaries, testing protocols, and self-refining processes.

---

## 1. The Self-Refining Process (Non-Negotiable)

This repository relies on continuous self-correction. Every agent session should leave the project slightly better than it found it.

### Before Writing Code
*   **Read the docs first.** Read `docs/architecture.md` for the current technical state. Read `docs/style-guide.md` if touching story. Read `world/` files if introducing new locations or characters.
*   **Plan first.** For any feature taking more than a trivial tweak, write an `implementation_plan.md` artifact, review it, and wait for human approval.
*   **Self-review.** Before finalizing any code, internally simulate running it. Check for edge cases, missing imports, or stylistic divergence from the rest of the codebase.

### After Writing Code
*   **Update the docs.** If you discover a new constraint, encounter a tricky bug, or implement a new pattern — **update `docs/architecture.md` immediately.** Documentation is a living entity here; treat stale docs as a severe bug.
*   **Update this file.** If you encounter a workflow friction point, a new "quirk to remember," or a better testing strategy — add it to this file. Future agents will thank you.
*   **Update the world bible.** If your work introduces new locations, characters, or lore, update the relevant files in `/world/`.

### Continuous Improvement Mindset
Every time you work on this project, look for opportunities to:
*   Refine code comments and JSDoc annotations.
*   Add inline `// TODO:` markers for unfinished work with clear descriptions.
*   Improve error messages and console logging.
*   Identify dead code and remove it.
*   Spot patterns that should be abstracted into shared utilities.
*   Note any architectural debt in `docs/architecture.md` under "Known Debt."

---

## 2. Strict File Boundaries

To prevent breaking the integration between the narrative engine and the game:

| Domain | Editable Files | Off-Limits |
|--------|---------------|------------|
| **Narrative Design** | `/story/**/*.ink`, `/world/**/*.md` | `/engine/` |
| **Engine / Game** | `/engine/src/**`, `/engine/index.html`, `/engine/vite.config.js` | `/story/**/*.ink` |
| **Build Scripts** | `/engine/scripts/*` | — |
| **Documentation** | `/docs/**`, `AGENT_INSTRUCTIONS.md`, `README.md` | — |

*   **Never** modify `.ink` files as testing data — use the existing story state or mock data within the engine.
*   **Never** modify `/story/` and `/engine/src/` in the same commit unless explicitly requested.

---

## 3. Mandatory Testing Protocol

Do not mark a task as complete without verifying it using the canonical commands:

1.  **Narrative Verification**: When editing Ink files, run:
    ```bash
    cd engine && npm run test:ink
    ```
    Ensures there are no dangling knots, broken diverts, or syntax errors.

2.  **Audio Syncing**: If you add, remove, or modify ANY spoken dialogue in an `.ink` file, run:
    ```bash
    cd engine && npm run generate-voices
    ```
    Re-syncs the Kokoro TTS WAV files. The engine expects `.wav` files matching the MD5 hash of the dialogue text.

3.  **Engine Verification**: After any engine change, run:
    ```bash
    cd engine && npm run dev
    ```
    Verify the Vite dev server starts without errors and the game loads in the browser.

4.  **Build Check**: For significant engine changes, also run:
    ```bash
    cd engine && npm run build
    ```
    Ensures the production bundle compiles without errors.

---

## 4. Specialized Roles

When complex tasks arise, adopt specific personas defined in the `docs/agents/` directory:

*   **`docs/agents/narrative-designer.md`** — Story tone rules (Disco Elysium style), Ink technical rules, trait interjection guidelines.
*   **`docs/agents/engine-architect.md`** — Phaser 3 scene management, EventBus patterns, isometric rendering, DOM overlay architecture.

Always read the relevant persona doc before starting work in that domain.

---

## 5. Technology Stack Quick Reference

| Layer | Technology | Key Files |
|-------|-----------|-----------|
| Game Engine | Phaser 3.90.0 | `src/scenes/GameScene.js`, `src/config.js` |
| Narrative | InkJS 2.4 | `src/narrative/NarrativeManager.js`, `/story/**/*.ink` |
| UI | Vanilla DOM + CSS | `src/ui/DialoguePanel.js`, `src/style.css`, `index.html` |
| Events | Native EventTarget | `src/EventBus.js` |
| Audio | HTML Audio + Kokoro TTS | `src/narrative/AudioManager.js`, `scripts/generate_voices.js` |
| Scene Art | AI-generated JPEG | `public/images/scenes/`, `scripts/generate_images.js` |
| Build | Vite 8 | `vite.config.js` (custom inkPlugin for `.ink` → JSON) |

---

## 6. Architectural Quirks to Remember

*   **Ink Compilation**: The `vite.config.js` has a custom `inkPlugin()` that runs `npx inkjs-compiler` on `.ink` imports at build time. The compiled JSON is exported as a default ES module. Do not bypass this — always import `.ink` files directly.
*   **Tag Parsing**: Scene tags (`# scene: name`) and speaker tags (`# speaker: name`) are parsed **inside the `Continue()` loop** in `NarrativeManager.js`, not after it. This ensures tags on any line are captured, not just the last.
*   **EventBus**: All cross-module communication uses the `EventBus.js` singleton (`new EventTarget()`). Events: `scene-change`, `story-text`, `story-choices`, `story-audio`, `audio-interrupt`, `story-restart`. Adding a new event? Document it in `EventBus.js`.
*   **Camera Offset**: The right-side dialogue panel is 420px wide (`PANEL_WIDTH` in `SceneData.js`). The camera follow offset is `-PANEL_WIDTH / 2` to center the player in the visible gameplay area. If you change the panel width, update both `style.css` and `SceneData.js`.
*   **Audio Autoplay**: The browser blocks audio until user interaction. `AudioManager.unlock()` plays a silent base64 WAV on the first click (in `TitleScene.js`). Do not remove this pattern.
*   **Audio Files**: The TTS pipeline generates `.wav` files. Filenames follow the pattern `{speaker}_{md5(text)}.wav`. **Never** change to `.mp3` without rewriting both `generate_voices.js` and `AudioManager.js`.
*   **Walk Zones**: Walkable areas use Phaser `Geom.Polygon` with normalized coordinates (0–1) in `SceneData.js`. The `WalkZone.clamp()` method snaps out-of-bounds clicks to the nearest polygon edge — it never ignores a click entirely.
*   **Background Scaling**: Backgrounds use "cover" scaling (`Math.max(scaleX, scaleY, 1)`). If the image is smaller than the viewport, it scales up. If larger, the camera scrolls. Camera bounds always match the scaled background dimensions.
*   **Depth Sorting**: All sprites are depth-sorted by their Y coordinate (`container.setDepth(container.y)`). This must be maintained in the update loop for correct isometric layering.

*   **Ink Compilation & Vite Watcher**: The custom `inkPlugin` in `vite.config.js` only monitors the explicitly imported `.ink` file (usually `main.ink`). If you edit an included file (e.g., `loc_childhood_room.ink`), you **must** manually touch `main.ink` (e.g., `touch story/main.ink`) or run `npm run test:ink` to force a recompile. Otherwise, the live preview will serve stale story logic.
*   **Ink List Variables**: In JavaScript, inkjs returns Ink lists (e.g., `LIST inventory`) as an `InkList` object, which inherits from `Map`. You cannot iterate over it using `for...in`. Always use `for (let [key, value] of invList)` to properly extract the items.
*   **Ink Top-Level Knots in Includes**: If you define `=== my_knot ===` inside an included file (e.g., `loc_room.ink`), it becomes a global, top-level knot (`my_knot`), NOT a stitch scoped to the file name (`loc_room.my_knot`). Use the direct name when calling `triggerKnot()`.

---

## 7. Common Pitfalls (Learned the Hard Way)

*   **Forgetting to destroy Phaser objects.** When swapping scenes (backgrounds, hotspots, player), always call `.destroy()` on the old objects. Memory leaks are silent killers.
*   **Modifying the DOM panel from Phaser code.** Use the EventBus, never direct DOM manipulation from scene files. The DOM UI and Phaser canvas are intentionally decoupled.
*   **Adding new Ink variables without documenting them.** Any new `VAR` in `globals.ink` should be documented in `docs/architecture.md` and the relevant `world/` character or location file.
*   **Assuming backgrounds are a fixed size.** They might be 1024×1024 today and 2048×1200 tomorrow. Always use normalized coordinates and dynamic scaling.
*   **Hotspot Trigger Loops.** When walking to a hotspot to trigger dialogue, make sure to push the player back slightly or clear their movement tween. If they remain inside the trigger radius when the dialogue ends, they will instantly re-trigger it. Do not permanently `.hide()` hotspots unless the story explicitly dictates the object vanishes!

---

If you understand these rules, proceed with your task. Leave the project better than you found it.
