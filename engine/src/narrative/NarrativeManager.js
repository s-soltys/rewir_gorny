import { Story } from 'inkjs/engine/Story';
import storyData from '../../../story/main.ink';
import md5 from 'md5';
import { eventBus } from '../EventBus.js';

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
