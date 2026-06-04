<script>
    import { onMount, onDestroy, tick } from 'svelte';
    import { fade } from 'svelte/transition';
    import { eventBus } from '../EventBus.js';

    let currentLines = [];
    let currentChoices = [];
    let isVisible = false;
    let dialogueScroll;

    async function scrollToBottom() {
        await tick();
        if (dialogueScroll) {
            dialogueScroll.scrollTop = dialogueScroll.scrollHeight;
        }
    }

    // Use eventBus to listen to story updates
    function handleStoryText(e) {
        isVisible = true;
        currentLines = [...currentLines, ...e.detail.lines];
        scrollToBottom();
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
        eventBus.dispatchEvent(new CustomEvent('player-choice', { detail: { index } }));
    }

    function closeDialogue() {
        isVisible = false;
        eventBus.dispatchEvent(new CustomEvent('story-idle'));
    }
</script>

{#if isVisible}
<div id="ui-panel" class="svelte-ui-panel" transition:fade={{ duration: 400 }}>
    <div id="panel-header">
        <h1 id="panel-title">Rewir Górny</h1>
        <div id="panel-subtitle">Osiedle Górne, 1996</div>
    </div>
    
    <div id="dialogue-scroll" class="scroll-container" bind:this={dialogueScroll}>
        <div id="dialogue-content">
            {#each currentLines as line}
                <!-- Basic parsing of speaker tags inside text could go here -->
                <p>{line}</p>
            {/each}
        </div>

        {#if currentChoices.length > 0}
            <div id="choices-container">
                {#each currentChoices as choice}
                    <button class="choice-btn" onclick={() => makeChoice(choice.index)}>
                        {choice.text}
                    </button>
                {/each}
            </div>
        {:else}
            <div class="story-end">
                <button class="story-end__restart choice-btn" onclick={closeDialogue}>Close</button>
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
