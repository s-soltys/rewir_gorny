import { eventBus } from '../EventBus.js';

/**
 * Manages sequential playback of TTS audio files.
 * Listens for story-audio and audio-interrupt events.
 *
 * Singleton — initialized on import in main.js.
 */
class AudioManager {
    constructor() {
        this.audioElement = document.getElementById('global-audio');
        this.queue = [];
        this.isPlaying = false;
        this.unlocked = false;

        // Wire up event bus
        eventBus.addEventListener('story-audio', (e) => {
            this.addToQueue(e.detail.queue);
        });

        eventBus.addEventListener('audio-interrupt', () => {
            this.interrupt();
        });

        // Advance queue when a file finishes or errors
        if (this.audioElement) {
            this.audioElement.addEventListener('ended', () => this.playNext());
            this.audioElement.addEventListener('error', () => this.playNext());
        }
    }

    /**
     * Unlock the AudioContext by playing a silent WAV.
     * Must be called from a user gesture (click/keydown).
     */
    unlock() {
        if (this.unlocked || !this.audioElement) return Promise.resolve();

        this.audioElement.src =
            'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
        return this.audioElement.play()
            .then(() => { this.unlocked = true; })
            .catch(() => { this.unlocked = true; }); // Mark unlocked even on failure
    }

    addToQueue(paths) {
        this.queue.push(...paths);
        if (!this.isPlaying) {
            this.playNext();
        }
    }

    playNext() {
        if (this.queue.length === 0) {
            this.isPlaying = false;
            return;
        }

        const nextPath = this.queue.shift();
        this.isPlaying = true;

        if (this.audioElement) {
            this.audioElement.src = nextPath;
            this.audioElement.play().catch(() => {
                // File might not exist yet — skip
                this.playNext();
            });
        }
    }

    interrupt() {
        this.queue = [];
        this.isPlaying = false;
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
        }
    }
}

export const audioManager = new AudioManager();
