import { Story } from 'inkjs/engine/Story';
import storyData from '../../../story/main.ink';
import md5 from 'md5';
import { eventBus } from '../EventBus.js';
import { hasItem, checkStat, addItem, modifyStat, statsStore, inventoryStore, activeQuestsStore } from '../state/gameStore.js';

/**
 * Wraps the inkjs Story instance and translates Ink output into
 * game events via the EventBus.
 *
 * Singleton — import { narrativeManager } from this module.
 */
class NarrativeManager {
    constructor() {
        this.ink = new Story(storyData);
        this.currentScene = null;
        this.textHistory = [];
        
        // Bind external functions to the JS State Manager
        this.ink.BindExternalFunction("has_item", (itemName) => {
            return hasItem(itemName);
        });
        
        this.ink.BindExternalFunction("check_stat", (statName, threshold) => {
            return checkStat(statName, threshold);
        });
        
        this.ink.BindExternalFunction("add_item", (itemName) => {
            addItem(itemName);
        });
        
        this.ink.BindExternalFunction("modify_stat", (statName, amount) => {
            modifyStat(statName, amount);
        });
    }

    /** Kick off the story (called once when GameScene starts). */
    start() {
        this.advanceStory();
    }

    /**
     * Read all available Ink text, extract tags, and emit events.
     * This is called after story start, after each choice, and
     * when a hotspot triggers a knot.
     */
    advanceStory() {
        const newLines = [];
        const audioQueue = [];
        let sceneTag = null;

        while (this.ink.canContinue) {
            const rawLine = this.ink.Continue().trim();
            if (!rawLine) continue;

            const tags = this.ink.currentTags || [];
            let speaker = 'narrator';

            for (const tag of tags) {
                if (tag.startsWith('speaker:')) {
                    speaker = tag.replace('speaker:', '').trim();
                }
                if (tag.startsWith('scene:')) {
                    sceneTag = tag.replace('scene:', '').trim();
                }
            }

            // Compute audio file path from MD5 of the text
            let textForHash = rawLine;
            if (textForHash.startsWith('"') && textForHash.endsWith('"')) {
                textForHash = textForHash.substring(1, textForHash.length - 1);
            }
            const hash = md5(textForHash);
            audioQueue.push(`/audio/${speaker}_${hash}.wav`);

            newLines.push(rawLine);
        }

        // Accumulate in history
        this.textHistory.push(...newLines);

        // Gather choices
        const choices = this.ink.currentChoices.map(c => ({
            text: c.text,
            index: c.index
        }));

        // ---- Dispatch events ----

        // Scene change fires first so GameScene can transition before text renders
        if (sceneTag && sceneTag !== this.currentScene) {
            this.currentScene = sceneTag;
            eventBus.dispatchEvent(new CustomEvent('scene-change', {
                detail: { sceneId: sceneTag }
            }));
        }

        if (newLines.length > 0) {
            eventBus.dispatchEvent(new CustomEvent('story-text', {
                detail: { lines: newLines }
            }));
        }

        eventBus.dispatchEvent(new CustomEvent('story-choices', {
            detail: { choices }
        }));

        if (audioQueue.length > 0) {
            eventBus.dispatchEvent(new CustomEvent('story-audio', {
                detail: { queue: audioQueue }
            }));
        }

        // Sync Ink -> Svelte stores (Ink is source of truth)
        this.syncGameState();
    }

    /** Sync Ink state variables into Svelte stores. */
    syncGameState() {
        // Read Ink variables and push to Svelte stores
        statsStore.set({
            nostalgia: this.ink.variablesState['nostalgia'] ?? 1,
            perception: this.ink.variablesState['perception'] ?? 1,
            anxiety: this.ink.variablesState['anxiety'] ?? 1
        });

        // Sync inventory: read InkList, write to inventoryStore
        try {
            const invList = this.ink.variablesState['inventory'];
            const items = [];
            if (invList) {
                for (let [key, value] of invList) {
                    if (key !== 'inventory.none' && key !== 'none') {
                        items.push(key.split('.').pop());
                    }
                }
            }
            inventoryStore.set(items);
        } catch (e) {
            console.error("Error syncing inventory", e);
        }

        // Sync quests: read Ink variables, write to activeQuestsStore
        try {
            const quests = [];
            const qMain = this.ink.variablesState['quest_main'];
            const qSide = this.ink.variablesState['quest_side'];
            if (qMain && qMain !== 'none') quests.push(qMain);
            if (qSide && qSide !== 'none') quests.push(qSide);
            activeQuestsStore.set(quests);
        } catch (e) {
            console.error("Error syncing quests", e);
        }
    }

    /** Player selected a dialogue choice. */
    makeChoice(index) {
        this.ink.ChooseChoiceIndex(index);
        eventBus.dispatchEvent(new CustomEvent('audio-interrupt'));
        this.advanceStory();
    }

    /** Jump to a named Ink knot (triggered by hotspots). */
    triggerKnot(knotName) {
        if (knotName) {
            this.ink.ChoosePathString(knotName);
        }
        eventBus.dispatchEvent(new CustomEvent('audio-interrupt'));
        eventBus.dispatchEvent(new CustomEvent('story-active'));
        this.advanceStory();
    }

    /** Read an Ink variable (e.g. copper_exposure). */
    getVariable(name) {
        return this.ink.variablesState[name];
    }

    /** Reset to the beginning. */
    restart() {
        this.ink.ResetState();
        this.currentScene = null;
        this.textHistory = [];
        eventBus.dispatchEvent(new CustomEvent('audio-interrupt'));
        eventBus.dispatchEvent(new CustomEvent('story-restart'));
        this.advanceStory();
    }
}

export const narrativeManager = new NarrativeManager();
