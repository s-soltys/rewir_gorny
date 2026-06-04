/**
 * Shared event bus for cross-module communication.
 * Uses the native browser EventTarget API.
 * 
 * Events:
 *   'scene-change'   — { sceneId: string }  Scene tag detected in Ink
 *   'story-text'     — { lines: string[] }   New dialogue lines available
 *   'story-choices'  — { choices: Array }     New choices available
 *   'story-audio'    — { queue: string[] }    Audio files to play
 *   'audio-interrupt' — (no detail)           Stop current audio
 *   'story-restart'  — (no detail)            Story was reset
 *   'player-choice'  — { index: number }      Player selected a dialogue choice
 */
export const eventBus = new EventTarget();
