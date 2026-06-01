# AGENT INSTRUCTIONS: REWIR GÓRNY
**Read this before performing any tasks in this repository.**

This repository is optimized for AI-first "vibe coding." To ensure predictable development, you must strictly follow these boundaries, testing protocols, and self-refining processes.

## 1. The Self-Refining Process (Crucial)
This repository relies on continuous self-correction. As an AI agent working here, you must:
*   **Self-Review**: Before finalizing any code, internally simulate running it. Check for edge cases, missing imports, or stylistic divergence from the rest of the codebase.
*   **Update the Docs**: If you discover a new constraint, encounter a tricky bug, or implement a new architectural pattern, **you must update `docs/architecture.md`**. Documentation is a living entity here; treat stale docs as a severe bug.
*   **Plan First**: For any feature taking more than a trivial UI tweak, write an `implementation_plan.md` artifact, review it, and wait for human approval. 

## 2. strict File Boundaries
To prevent breaking the fragile integration between the narrative engine and the web UI:
*   **Narrative Design**: If you are working on story, edit ONLY `.ink` files in the `/story/` directory. **Do not** touch `/engine/` files unless specifically requested.
*   **Engine Design**: If you are working on the web app, edit ONLY the `/engine/` directory (Svelte/PixiJS). **Do not** modify `.ink` files as testing data; use mock data or the existing story state.

## 3. Mandatory Testing Protocol
Do not mark a task as complete without verifying it using the canonical commands:
1.  **Narrative Verification**: When editing Ink files, you MUST run `npm run test:ink` (from the `/engine/` dir) to ensure there are no dangling knots or syntax errors.
2.  **Audio Syncing**: If you add, remove, or modify ANY dialogue in an `.ink` file, you MUST run `npm run generate-voices` from the `/engine/` directory to re-sync the Kokoro TTS WAV files.
3.  **Engine Verification**: Run `npm run dev` to verify the Svelte app compiles cleanly.

## 4. Specialized Roles
When complex tasks arise, delegate or adopt specific personas defined in the `docs/agents/` directory:
*   Read `docs/agents/narrative-designer.md` for story tone rules (Disco Elysium style).
*   Read `docs/agents/engine-architect.md` for Svelte/PixiJS coordinate mapping rules.

## 5. Architectural Quirks to Remember
*   **Audio Generation**: OpenRouter's Kokoro TTS returns raw headerless PCM. The `generate_voices.js` script wraps this in a WAV header. **Never change the file extension back to `.mp3`**. The Svelte app strictly expects `.wav`.
*   **Audio Unlocking**: Browsers block autoplay. The engine unlocks audio by playing a silent base64 WAV on the first user click in `App.svelte`. Do not alter this pattern.
*   **Interruption**: Audio playback is interrupted gracefully because `audioQueue` is forcefully cleared in the `story.js` store when a choice is made.

If you understand these rules, proceed with your task.
