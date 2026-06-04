import { eventBus } from '../EventBus.js';
import { narrativeManager } from '../narrative/NarrativeManager.js';

/**
 * Right-side dialogue panel.
 * Renders Ink text, trait interjections, and choice buttons into the DOM.
 *
 * Singleton — initialized on import in main.js.
 */
class DialoguePanel {
    constructor() {
        this.panel = document.getElementById('ui-panel');
        this.content = document.getElementById('dialogue-content');
        this.scroll = document.getElementById('dialogue-scroll');
        this.lineIndex = 0; // for staggered animation delays

        // Wire up events
        eventBus.addEventListener('story-text', (e) => {
            this.addTextLines(e.detail.lines);
        });

        eventBus.addEventListener('story-choices', (e) => {
            this.showChoices(e.detail.choices);
        });

        eventBus.addEventListener('story-restart', () => {
            this.clear();
        });
    }

    show() {
        if (this.panel) this.panel.classList.add('visible');
    }

    hide() {
        if (this.panel) this.panel.classList.remove('visible');
    }

    clear() {
        if (this.content) this.content.innerHTML = '';
        this.lineIndex = 0;
    }

    /**
     * Append new dialogue lines to the panel.
     * Parses trait interjections (NOSTALGIA:, PERCEPTION:, ANXIETY:).
     */
    addTextLines(lines) {
        if (!this.content) return;

        lines.forEach((line) => {
            const parsed = this.parseLine(line);
            const delay = Math.min(this.lineIndex * 0.06, 1.2); // cap delay

            if (parsed.isTrait) {
                const el = document.createElement('div');
                el.className = `trait-line trait--${parsed.traitType}`;
                el.style.animationDelay = `${delay}s`;

                const label = document.createElement('span');
                label.className = 'trait-label';
                label.textContent = parsed.label;
                el.appendChild(label);
                el.appendChild(document.createTextNode(parsed.text));

                this.content.appendChild(el);
            } else {
                const el = document.createElement('p');
                el.className = 'dialogue-line';
                el.style.animationDelay = `${delay}s`;
                el.textContent = parsed.text;
                this.content.appendChild(el);
            }

            this.lineIndex++;
        });

        this.scrollToBottom();
    }

    /**
     * Show choice buttons or "End of Chapter" if no choices remain.
     */
    showChoices(choices) {
        if (!this.content) return;

        // Remove any existing choices / end screen
        this.content.querySelector('.choices-container')?.remove();
        this.content.querySelector('.story-end')?.remove();

        if (choices.length === 0) {
            // End of chapter
            const endDiv = document.createElement('div');
            endDiv.className = 'story-end';
            endDiv.innerHTML = `
                <div class="story-end__text">End of Chapter</div>
                <button class="story-end__restart">Restart</button>
            `;
            this.content.appendChild(endDiv);

            endDiv.querySelector('.story-end__restart')
                .addEventListener('click', () => narrativeManager.restart());
        } else {
            const container = document.createElement('div');
            container.className = 'choices-container';

            choices.forEach((choice, i) => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.textContent = choice.text;
                btn.style.animationDelay = `${i * 0.08}s`;

                btn.addEventListener('click', () => {
                    container.remove();
                    narrativeManager.makeChoice(choice.index);
                });

                container.appendChild(btn);
            });

            this.content.appendChild(container);
        }

        this.scrollToBottom();
    }

    /** Parse a line for trait interjections. */
    parseLine(line) {
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

    scrollToBottom() {
        if (!this.scroll) return;
        requestAnimationFrame(() => {
            this.scroll.scrollTop = this.scroll.scrollHeight;
        });
    }
}

export const dialoguePanel = new DialoguePanel();
