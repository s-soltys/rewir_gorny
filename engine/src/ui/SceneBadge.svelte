<script>
    import { onMount, onDestroy } from 'svelte';
    import { eventBus } from '../EventBus.js';

    let sceneName = '';
    
    // Convert scene ID to readable name (basic logic)
    function formatSceneName(id) {
        if (!id) return '';
        return id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    function handleSceneChange(e) {
        sceneName = formatSceneName(e.detail.sceneId);
    }

    onMount(() => {
        eventBus.addEventListener('scene-change', handleSceneChange);
    });

    onDestroy(() => {
        eventBus.removeEventListener('scene-change', handleSceneChange);
    });
</script>

{#if sceneName}
<div id="scene-badge" class="svelte-scene-badge">
    {sceneName}
</div>
{/if}

<style>
    /* Most styling is in style.css */
    .svelte-scene-badge {
        display: block;
    }
</style>
