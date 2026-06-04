import { eventBus } from '../EventBus.js';

export class InventoryPanel {
    constructor() {
        this.container = document.getElementById('inventory-panel');
        if (!this.container) return;

        this.title = document.createElement('h3');
        this.title.textContent = 'Inventory';
        this.container.appendChild(this.title);

        this.list = document.createElement('ul');
        this.container.appendChild(this.list);

        eventBus.addEventListener('story-state', (e) => {
            this.update(e.detail.inventory);
        });
    }

    update(inventory) {
        if (!this.container) return;
        this.list.innerHTML = '';
        if (inventory.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Empty';
            li.style.color = '#777';
            this.list.appendChild(li);
        } else {
            inventory.forEach(item => {
                const li = document.createElement('li');
                // Format name nicely (e.g. childhood_toy -> Childhood Toy)
                li.textContent = item.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                this.list.appendChild(li);
            });
        }
    }
}

export const inventoryPanel = new InventoryPanel();
