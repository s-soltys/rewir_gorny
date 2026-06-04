<script>
    import { inventoryStore, statsStore } from '../state/gameStore.js';
    
    export let visible = false;
    
    function closePanel() {
        visible = false;
    }
</script>

{#if visible}
<div class="side-panel active">
    <div class="panel-header-small">
        <h2>Inventory & Stats</h2>
        <button onclick={closePanel} class="close-btn">×</button>
    </div>
    
    <div class="panel-content">
        <h3>Stats</h3>
        <ul class="stats-list">
            <li>Perception: {$statsStore.perception}</li>
            <li>Nostalgia: {$statsStore.nostalgia}</li>
            <li>Anxiety: {$statsStore.anxiety}</li>
        </ul>

        <h3>Items</h3>
        {#if $inventoryStore.length === 0}
            <p class="empty-text">Your pockets are empty.</p>
        {:else}
            <ul class="inventory-list">
                {#each $inventoryStore as item}
                    <li>{item.replace(/_/g, ' ')}</li>
                {/each}
            </ul>
        {/if}
    </div>
</div>
{/if}

<style>
    .side-panel {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 300px;
        background: rgba(10, 10, 10, 0.9);
        border: 1px solid var(--copper);
        border-radius: 4px;
        color: #eee;
        padding: 1rem;
        z-index: 100;
        backdrop-filter: blur(8px);
    }
    .panel-header-small {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--copper);
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
    }
    .panel-header-small h2 {
        margin: 0;
        font-size: 1.2rem;
        color: var(--copper);
    }
    .close-btn {
        background: transparent;
        border: none;
        color: var(--copper);
        font-size: 1.5rem;
        cursor: pointer;
    }
    .stats-list, .inventory-list {
        list-style: none;
        padding: 0;
        margin: 0 0 1rem 0;
    }
    .stats-list li, .inventory-list li {
        padding: 0.25rem 0;
        text-transform: capitalize;
    }
    .empty-text {
        font-style: italic;
        color: #888;
    }
</style>
