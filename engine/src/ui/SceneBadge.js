import { eventBus } from '../EventBus.js';
import { SCENES } from '../world/SceneData.js';

/**
 * Location indicator badge (top-left corner).
 * Updates automatically when a scene-change event fires.
 *
 * Singleton — initialized on import in main.js.
 */
class SceneBadge {
    constructor() {
        this.element = document.getElementById('scene-badge');

        eventBus.addEventListener('scene-change', (e) => {
            this.update(e.detail.sceneId);
        });

        eventBus.addEventListener('story-restart', () => {
            this.hide();
        });
    }

    update(sceneId) {
        const data = SCENES[sceneId];
        if (data && this.element) {
            this.element.textContent = data.label;
            this.element.classList.add('visible');
        }
    }

    hide() {
        if (this.element) {
            this.element.classList.remove('visible');
        }
    }
}

export const sceneBadge = new SceneBadge();
