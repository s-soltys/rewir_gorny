# Rewir Górny Architecture Documentation

This document describes the technical architecture of the Rewir Górny interactive narrative engine. 
**If you implement a new pattern or discover a technical constraint, you must update this file as part of the self-refining process.**

## Core Technologies
1.  **Svelte (UI Layer)**: Manages reactivity, HTML/CSS rendering of dialogue boxes, choices, and state binding.
2.  **PixiJS (Canvas Layer)**: Renders the 2D environmental background, interactive hotspots, and player movement.
3.  **InkJS (Narrative Engine)**: Compiles and processes `.ink` scripts, managing branching logic, variables, and state.
4.  **Kokoro TTS via OpenRouter**: Generates character voices dynamically from the compiled story.

## Data Flow
1.  **State Management (`src/store/story.js`)**: 
    The Svelte store wraps the `InkJS` instance. When `advanceStory()` is called, it parses the next chunks of text, extracts `# speaker: name` tags, computes an MD5 hash of the text, and pushes a `.wav` file path to an `audioQueue`.
2.  **Reactivity (`DialogueBox.svelte`)**: 
    The UI listens to the `audioQueue`. When a new audio file arrives, it forces the hidden `<audio id="global-audio">` to play the file.
3.  **Canvas Sync (`SceneManager.js`)**: 
    The Svelte store also parses `# scene: name` tags. The PixiJS `SceneManager` subscribes to this state and transitions the visual canvas when the scene tag changes.

## Known Constraints & Quirk
*   **Audio Autoplay**: The browser blocks audio until the user interacts with the page. We solve this in `App.svelte` by playing a silent Base64 WAV file when the user clicks "START", which unlocks the `AudioContext` for all subsequent voice lines.
*   **Audio Interruption**: When a user clicks a choice, the `audioQueue` is forcefully cleared and `globalAudio.pause()` is called to prevent audio overlap.
*   **TTS Generation**: The `generate_voices.js` script queries OpenRouter's Kokoro model. OpenRouter returns raw, headerless 24kHz PCM data. The script manually wraps this in a 44-byte WAV header. The game strictly expects `.wav` files in the `public/audio/` directory.
