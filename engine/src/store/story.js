import { writable } from 'svelte/store';
import { Story } from 'inkjs/engine/Story';
import storyData from '../../../story/main.ink';
import md5 from 'md5';

// Initialize the ink Story with the compiled JSON data
const inkStory = new Story(storyData);

function createStoryStore() {
    const { subscribe, set, update } = writable({
        currentText: [],
        currentChoices: [],
        canContinue: false,
        currentScene: null,
        audioQueue: []
    });

    const advanceStory = () => {
        let textLines = [];
        let newAudio = [];

        while (inkStory.canContinue) {
            let rawLine = inkStory.Continue().trim();
            if (!rawLine) continue;

            // Extract text and speaker
            let text = rawLine;
            let speaker = 'narrator';
            let tags = inkStory.currentTags || [];

            for (const tag of tags) {
                if (tag.startsWith('speaker:')) {
                    speaker = tag.replace('speaker:', '').trim();
                }
            }

            // Compute MD5 of the pure text
            let textForHash = text;
            if (textForHash.startsWith('"') && textForHash.endsWith('"')) {
                textForHash = textForHash.substring(1, textForHash.length - 1);
            }
            const hash = md5(textForHash);
            const audioPath = `/audio/${speaker}_${hash}.wav`;

            newAudio.push(audioPath);

            textLines.push(rawLine);
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
                currentScene: sceneTag || state.currentScene,
                audioQueue: [...state.audioQueue, ...newAudio]
            };
        });
    };

    const playNextAudio = () => {
        update(state => {
            const newQueue = [...state.audioQueue];
            newQueue.shift(); // Remove the one we just played
            return { ...state, audioQueue: newQueue };
        });
    };

    const clearAudio = () => {
        update(state => ({ ...state, audioQueue: [] }));
        const globalAudio = document.getElementById('global-audio');
        if (globalAudio) {
            globalAudio.pause();
        }
    };

    const makeChoice = (choiceIndex) => {
        inkStory.ChooseChoiceIndex(choiceIndex);
        clearAudio();
        advanceStory();
    };

    const restart = () => {
        inkStory.ResetState();
        set({
            currentText: [],
            currentChoices: [],
            canContinue: false,
            currentScene: null,
            audioQueue: []
        });
        const globalAudio = document.getElementById('global-audio');
        if (globalAudio) globalAudio.pause();
        advanceStory();
    };

    const triggerKnot = (knotName) => {
        if (knotName) {
            inkStory.ChoosePathString(knotName);
        }
        clearAudio();
        advanceStory();
    };

    return {
        subscribe,
        makeChoice,
        restart,
        triggerKnot,
        playNextAudio,
        // Expose raw inkStory if we ever need advanced operations (like observing variables)
        ink: inkStory 
    };
}

export const story = createStoryStore();
