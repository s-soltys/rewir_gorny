<script>
    import { onMount, tick } from 'svelte';
    import { story } from './store/story.js';
    import DialogueBox from './components/DialogueBox.svelte';
    import Choices from './components/Choices.svelte';
    import { SceneManager } from './canvas/SceneManager.js';
    import './global.css';

    let canvasElement;
    let sceneManager;
    let gameStarted = false;

    function startGame() {
        gameStarted = true;
        const globalAudio = document.getElementById('global-audio');
        if (globalAudio) {
            // Play a silent sound to unlock the audio element on the first user interaction
            globalAudio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
            globalAudio.play().then(() => {
                story.triggerKnot(null);
            }).catch(e => {
                console.log('Unlock failed:', e);
                story.triggerKnot(null);
            });
        } else {
            story.triggerKnot(null);
        }
    }

    onMount(() => {
        // Initialize PixiJS in the background canvas
        sceneManager = new SceneManager(canvasElement);
        sceneManager.init();

        return () => {
            if (sceneManager) sceneManager.destroy();
        };
    });
</script>

<audio id="global-audio" class="hidden"></audio>

{#if !gameStarted}
    <div class="start-overlay" on:click={startGame} on:keydown={(e) => e.key === 'Enter' && startGame()} tabindex="0" role="button">
        <h1 class="start-title">REWIR GÓRNY</h1>
        <div class="start-instruction">CLICK ANYWHERE TO ENTER</div>
    </div>
{/if}

<div class="layout">
    <div class="canvas-container">
        <div class="canvas-overlay">
            {#if $story.currentScene}
                <div class="scene-badge">Current Location: {$story.currentScene}</div>
            {/if}
            <div class="instruction">Click anywhere to move</div>
        </div>
        <canvas bind:this={canvasElement} class="bg-canvas"></canvas>
    </div>

    <div class="ui-layer">
        <header class="header">
            <h1 class="header__title">Rewir Górny</h1>
            <div class="header__subtitle">1990s Interactive Narrative</div>
        </header>

        <main class="game-container">
            <DialogueBox textLines={$story.currentText} />
            <Choices choices={$story.currentChoices} />
        </main>
    </div>
</div>

<style>
    .hidden {
        display: none;
    }

    .start-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: #0a0a0a;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #c87533;
    }

    .start-title {
        font-family: 'IBM Plex Mono', monospace;
        font-size: 3rem;
        letter-spacing: 0.3em;
        margin-bottom: 2rem;
    }

    .start-instruction {
        font-family: 'IBM Plex Mono', monospace;
        font-size: 0.8rem;
        letter-spacing: 0.2em;
        opacity: 0.5;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% { opacity: 0.3; }
        50% { opacity: 0.8; }
        100% { opacity: 0.3; }
    }

    .layout {
        display: flex;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    .canvas-container {
        flex: 1;
        position: relative;
        background-color: #0a0a0a;
        border-right: 1px solid rgba(255,255,255,0.1);
    }

    .canvas-overlay {
        position: absolute;
        top: 20px;
        left: 20px;
        z-index: 10;
        pointer-events: none;
    }

    .scene-badge {
        font-family: 'IBM Plex Mono', monospace;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        background: rgba(200, 117, 51, 0.2);
        color: #c87533;
        padding: 4px 8px;
        border: 1px solid #c87533;
        border-radius: 2px;
        margin-bottom: 8px;
        display: inline-block;
    }

    .instruction {
        font-family: 'IBM Plex Mono', monospace;
        font-size: 0.65rem;
        color: rgba(255, 255, 255, 0.3);
        text-transform: uppercase;
    }

    .bg-canvas {
        width: 100%;
        height: 100%;
        display: block;
    }

    .ui-layer {
        width: 450px;
        height: 100%;
        overflow-y: auto;
        background-color: #111111;
        box-shadow: -10px 0 30px rgba(0,0,0,0.5);
    }

    .header {
        text-align: center;
        padding: 2rem 1rem 1.5rem;
    }

    .header__title {
        font-family: 'IBM Plex Mono', monospace;
        font-size: 1.25rem;
        font-weight: 300;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.85);
        display: inline-block;
        position: relative;
    }

    .header__title::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 1px;
        background: #c87533;
        opacity: 0.6;
    }

    .header__subtitle {
        margin-top: 1rem;
        font-size: 0.6rem;
        font-weight: 300;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.4);
    }

    .game-container {
        padding: 0 2rem 4rem;
        color: rgba(255, 255, 255, 0.85);
    }
</style>
