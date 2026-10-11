# Prototype and engine history — reference only

**Status: ARCHIVED.** This page prevents old implementation facts from being mistaken for the current plan. It is not a roadmap to restore the engine.

## Phaser/Ink prototype in the GitHub repository

The old main-branch prototype used Phaser 3.90, InkJS 2.4, Svelte 5, Vite 8, and Kokoro-generated WAV audio. Its four-scene playable flow was room → flat hallway → street/kiosk → forest. A June 2026 “unclunk” pass improved state synchronization, EventBus boundaries, UI, hotspot cooldown, and resize behavior.

The July 2026 audit found that this prototype was much thinner than its world bible: the cable-burning gathering and most faction conflict were absent; trait variables and copper exposure were mostly unused; the speaker syntax was inconsistent with the documentation; and the old WAVs did not match the current dialogue. The playable story was a prototype, not the final plot.

## Separate Godot proof of concept

In July 2026, the project direction moved toward files-first Godot 4.7 + GDScript + Dialogue Manager 3.10.4. Ink was dropped because the user wanted a GDScript-native stack without Mono or a Node sidecar. A four-location HTML5 build was locally validated/exported and a deployment was reported at the time. Mouse-input fixes were made after web-export clicks failed; the user's manual playtest was still pending in the last recorded exchange.

That Godot proof of concept was developed separately and is not in the historical GitHub main tree cloned for this repurpose. Its exact current files and deployment are not verified here. This story-preproduction repo intentionally contains no game code; if game implementation resumes, create a deliberate implementation phase from the approved story slice.

## Preserved assets

Old backgrounds, sprites, mood image, TTS WAVs, and test audio were moved under `assets/reference/`. They are retained for possible reference only. In particular, the WAVs are not known to match any approved future dialogue. Verify provenance/licensing and regenerate audio from final script if the game phase resumes.