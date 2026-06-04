import { eventBus } from '../EventBus.js';

export class QuestPanel {
    constructor() {
        this.container = document.getElementById('quest-panel');
        if (!this.container) return;

        this.title = document.createElement('h3');
        this.title.textContent = 'Quests';
        this.container.appendChild(this.title);

        this.content = document.createElement('div');
        this.container.appendChild(this.content);

        eventBus.addEventListener('story-state', (e) => {
            this.update(e.detail.questMain, e.detail.questSide);
        });
    }

    update(main, side) {
        if (!this.container) return;
        this.content.innerHTML = '';

        if (main) {
            const m = document.createElement('div');
            m.className = 'quest main-quest';
            m.innerHTML = `<strong>Main:</strong> ${main}`;
            this.content.appendChild(m);
        }
        if (side) {
            const s = document.createElement('div');
            s.className = 'quest side-quest';
            s.innerHTML = `<strong>Side:</strong> ${side}`;
            this.content.appendChild(s);
        }
    }
}

export const questPanel = new QuestPanel();
