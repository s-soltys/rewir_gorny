<script>
    import DialoguePanel from './DialoguePanel.svelte';
    import InventoryPanel from './InventoryPanel.svelte';
    import SceneBadge from './SceneBadge.svelte';

    let inventoryVisible = false;

    function toggleInventory() {
        inventoryVisible = !inventoryVisible;
    }
</script>

<div class="svelte-ui-root">
    <!-- Overlay UI Toggles -->
    <div id="ui-toggles">
        <button class="ui-btn" onclick={toggleInventory}>Inventory & Stats</button>
    </div>

    <!-- Main Components -->
    <SceneBadge />
    <InventoryPanel bind:visible={inventoryVisible} />
    <DialoguePanel />
</div>

<style>
    .svelte-ui-root {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none; /* Let clicks pass through to Phaser by default */
        z-index: 10;
    }
    
    /* Re-enable pointer events for specific interactive UI pieces */
    :global(.svelte-ui-root > *) {
        pointer-events: auto;
    }
</style>
