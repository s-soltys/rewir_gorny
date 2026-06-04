import { writable } from 'svelte/store';

// Basic Character Stats
export const statsStore = writable({
    logic: 10,
    perception: 10,
    kombinatorstwo: 10, // Example of a Silesian-themed skill
    nostalgia: 10
});

// Inventory (simple list of item string IDs)
export const inventoryStore = writable([]);

// Active Quests (simple list of active quest IDs)
export const activeQuestsStore = writable([]);

// Helper actions
export function addItem(itemId) {
    inventoryStore.update(items => {
        if (!items.includes(itemId)) {
            return [...items, itemId];
        }
        return items;
    });
}

export function removeItem(itemId) {
    inventoryStore.update(items => items.filter(id => id !== itemId));
}

export function hasItem(itemId) {
    let result = false;
    // We can synchronously read from a Svelte store using a quick subscribe, 
    // or we could maintain a cached copy. But this is reliable enough for rare checks.
    inventoryStore.subscribe(items => {
        result = items.includes(itemId);
    })(); // immediately invoke and unsubscribe
    return result;
}

export function checkStat(statName, threshold) {
    let success = false;
    statsStore.subscribe(stats => {
        if (stats[statName] >= threshold) {
            success = true;
        }
    })();
    return success;
}

export function modifyStat(statName, amount) {
    statsStore.update(stats => {
        return {
            ...stats,
            [statName]: (stats[statName] || 0) + amount
        };
    });
}
