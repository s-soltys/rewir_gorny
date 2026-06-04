<script>
    import { onMount, onDestroy } from 'svelte';
    import { eventBus } from '../EventBus.js';
    import { narrativeManager } from '../narrative/NarrativeManager.js';

    let currentLines = [];
    let currentChoices = [];
    let isVisible = false;

    // Use eventBus to listen to story updates
    function handleStoryText(e) {
        isVisible = true;
        currentLines = [...currentLines, ...e.detail.lines];
        // simple auto scroll could be implemented here
    }

    function handleStoryChoices(e) {
        currentChoices = e.detail.choices;
    }

    function handleSceneChange(e) {
        // clear old dialogue on scene change
        currentLines = [];
        currentChoices = [];
        isVisible = false;
    }

    function handleStoryRestart() {
        currentLines = [];
        currentChoices = [];
        isVisible = false;
    }

    function handleActive() {
        isVisible = true;
    }

    onMount(() => {
        eventBus.addEventListener('story-text', handleStoryText);
        eventBus.addEventListener('story-choices', handleStoryChoices);
        eventBus.addEventListener('scene-change', handleSceneChange);
        eventBus.addEventListener('story-restart', handleStoryRestart);
        eventBus.addEventListener('story-active', handleActive);
    });

    onDestroy(() => {
        eventBus.removeEventListener('story-text', handleStoryText);
        eventBus.removeEventListener('story-choices', handleStoryChoices);
        eventBus.removeEventListener('scene-change', handleSceneChange);
        eventBus.removeEventListener('story-restart', handleStoryRestart);
        eventBus.removeEventListener('story-active', handleActive);
    });

    function makeChoice(index) {
        currentChoices = []; // Hide choices immediately
        narrativeManager.makeChoice(index);
    }

    function closeDialogue() {
        isVisible = false;
        eventBus.dispatchEvent(new CustomEvent('story-idle'));
    }
</script>

{#if isVisible}
<div id="ui-panel" class="svelte-ui-panel">
    <div id="panel-header">
        <h1 id="panel-title">Rewir Górny</h1>
        <div id="panel-subtitle">Osiedle Górne, 1996</div>
    </div>
    
    <div id="dialogue-scroll" class="scroll-container">
        <div id="dialogue-content">
            {#each currentLines as line}
                <!-- Basic parsing of speaker tags inside text could go here -->
                <p>{line}</p>
            {/each}
        </div>

        {#if currentChoices.length > 0}
            <div id="choices-container">
                {#each currentChoices as choice}
                    <button class="choice-btn" on:click={() => makeChoice(choice.index)}>
                        {choice.text}
                    </button>
                {/each}
            </div>
        {:else}
            <div class="story-end">
                <button class="story-end__restart choice-btn" on:click={closeDialogue}>Close</button>
            </div>
        {/if}
    </div>
</div>
{/if}

<style>
    /* Add specific Svelte scoping if needed, but we rely mostly on style.css */
    .svelte-ui-panel {
        /* Ensuring it acts like the old panel */
        display: flex;
    }
</style>
