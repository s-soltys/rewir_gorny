<script>
    import { fly } from 'svelte/transition';
    export let textLines = [];

    // Simple parsing to detect trait interjections like "NOSTALGIA:"
    function parseLine(line) {
        const match = line.match(/^(NOSTALGIA|PERCEPTION|ANXIETY):\s*(.*)/);
        if (match) {
            return {
                isTrait: true,
                traitType: match[1].toLowerCase(),
                label: match[1],
                text: match[2]
            };
        }
        return { isTrait: false, text: line };
    }
</script>

<div class="story">
    {#each textLines as line, i (i)}
        {@const parsed = parseLine(line)}
        
        {#if parsed.isTrait}
            <div class="trait trait--{parsed.traitType}" in:fly={{ y: 10, duration: 800, delay: 100 }}>
                <span class="trait__label">{parsed.label}</span>
                {parsed.text}
            </div>
        {:else}
            <p in:fly={{ y: 10, duration: 800 }}>{parsed.text}</p>
        {/if}
    {/each}
</div>

<style>
    .story {
        margin-bottom: 2rem;
    }
    
    p {
        margin-bottom: 1rem;
        line-height: 1.7;
    }

    .trait {
        font-style: italic;
        padding: 0.5rem 0 0.5rem 1rem;
        margin: 1rem 0 1.5rem;
        border-left: 2px solid;
        position: relative;
        font-size: 0.875rem;
    }

    .trait__label {
        font-weight: 600;
        font-style: normal;
        text-transform: uppercase;
        font-size: 0.6875rem;
        letter-spacing: 0.1em;
        margin-right: 0.5rem;
    }

    .trait--nostalgia {
        color: #648296;
        border-left-color: #648296;
    }
    .trait--nostalgia .trait__label { color: #648296; }

    .trait--perception {
        color: #7b8c73;
        border-left-color: #7b8c73;
    }
    .trait--perception .trait__label { color: #7b8c73; }

    .trait--anxiety {
        color: #9c5c5c;
        border-left-color: #9c5c5c;
    }
    .trait--anxiety .trait__label { color: #9c5c5c; }
</style>
