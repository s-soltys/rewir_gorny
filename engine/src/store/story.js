import { writable } from 'svelte/store';
import { Story } from 'inkjs/engine/Story';
import storyData from '../../../story/main.ink';

// Initialize the ink Story with the compiled JSON data
const inkStory = new Story(storyData);

function createStoryStore() {
    const { subscribe, set, update } = writable({
        currentText: [],
        currentChoices: [],
        canContinue: false,
        currentScene: null
    });

    const advanceStory = () => {
        let textLines = [];
        while (inkStory.canContinue) {
            let line = inkStory.Continue().trim();
            if (line) textLines.push(line);
        }

        const choices = inkStory.currentChoices.map(choice => ({
            text: choice.text,
            index: choice.index
        }));

        // Parse tags for "# scene: X"
        let sceneTag = null;
        if (inkStory.currentTags) {
            for (const tag of inkStory.currentTags) {
                if (tag.startsWith('scene:')) {
                    sceneTag = tag.replace('scene:', '').trim();
                }
            }
        }

        update(state => {
            return {
                currentText: [...state.currentText, ...textLines],
                currentChoices: choices,
                canContinue: inkStory.canContinue || choices.length > 0,
                currentScene: sceneTag || state.currentScene
            };
        });
    };

    const makeChoice = (choiceIndex) => {
        inkStory.ChooseChoiceIndex(choiceIndex);
        advanceStory();
    };

    const restart = () => {
        inkStory.ResetState();
        set({
            currentText: [],
            currentChoices: [],
            canContinue: false,
            currentScene: null
        });
        advanceStory();
    };

    const triggerKnot = (knotName) => {
        inkStory.ChoosePathString(knotName);
        advanceStory();
    };

    // Initial load
    advanceStory();

    return {
        subscribe,
        makeChoice,
        restart,
        triggerKnot,
        // Expose raw inkStory if we ever need advanced operations (like observing variables)
        ink: inkStory 
    };
}

export const story = createStoryStore();
