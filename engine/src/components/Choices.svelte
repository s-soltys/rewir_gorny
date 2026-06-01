<script>
    import { fly } from 'svelte/transition';
    import { story } from '../store/story.js';

    export let choices = [];

    function selectChoice(index) {
        story.makeChoice(index);
        // We'll let a container handle auto-scrolling
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
    }
</script>

{#if choices.length > 0}
    <div class="choices">
        {#each choices as choice, i (choice.index)}
            <button class="choice-btn" on:click={() => selectChoice(choice.index)} in:fly={{ y: 5, duration: 500, delay: i * 50 }}>
                {choice.text}
            </button>
        {/each}
    </div>
{:else}
    <div class="story-end" in:fly={{ y: 5, duration: 800 }}>
        <div class="story-end__text">End of Chapter</div>
        <button class="story-end__restart" on:click={story.restart}>Restart</button>
    </div>
{/if}

<style>
    .choices {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.04);
    }

    .choice-btn {
        display: block;
        width: 100%;
        padding: 1rem 1.5rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 2px;
        color: rgba(255, 255, 255, 0.85);
        font-family: 'IBM Plex Mono', monospace;
        font-size: 0.875rem;
        line-height: 1.5;
        text-align: left;
        cursor: pointer;
        transition: all 0.2s ease-out;
        position: relative;
        overflow: hidden;
    }

    .choice-btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 0;
        height: 100%;
        transform: translateY(-50%);
        background: linear-gradient(90deg, rgba(200, 117, 51, 0.1) 0%, transparent 100%);
        transition: width 0.3s ease-out;
    }

    .choice-btn:hover {
        border-color: #c87533;
        background: rgba(200, 117, 51, 0.05);
        box-shadow: 0 0 20px rgba(200, 117, 51, 0.06), inset 0 0 20px rgba(200, 117, 51, 0.03);
        transform: translateX(2px);
    }

    .choice-btn:hover::before {
        width: 60%;
    }

    .choice-btn:active {
        transform: translateX(2px) scale(0.995);
    }

    .story-end {
        text-align: center;
        padding: 3rem 0;
    }

    .story-end__text {
        font-size: 1.25rem;
        font-weight: 300;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.4);
        margin-bottom: 2rem;
    }

    .story-end__restart {
        padding: 0.5rem 2rem;
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        color: #c87533;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 0.75rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .story-end__restart:hover {
        border-color: #c87533;
        background: rgba(200, 117, 51, 0.1);
        box-shadow: 0 0 30px rgba(200, 117, 51, 0.08);
    }
</style>
