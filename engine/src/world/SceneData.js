/**
 * Scene data registry.
 * All coordinates are normalized (0–1) so they scale with any viewport/background size.
 */

export const PANEL_WIDTH = 420;

export const SCENES = {
    station: {
        key: 'bg-station',
        path: '/images/scenes/station.jpeg',
        label: 'Piła Główna Station',
        playerSpawn: { x: 0.4, y: 0.7 },
        hotspots: [
            { x: 0.75, y: 0.25, radius: 40, label: 'Kiosk', knot: 'station_kiosk' }
        ],
        walkZone: [
            { x: 0.05, y: 0.25 },
            { x: 0.95, y: 0.25 },
            { x: 0.95, y: 0.95 },
            { x: 0.05, y: 0.95 }
        ]
    },

    the_blocks: {
        key: 'bg-the_blocks',
        path: '/images/scenes/the_blocks.jpeg',
        label: 'The Blocks — Wielka Płyta',
        playerSpawn: { x: 0.35, y: 0.6 },
        hotspots: [],
        walkZone: [
            { x: 0.05, y: 0.20 },
            { x: 0.95, y: 0.20 },
            { x: 0.95, y: 0.95 },
            { x: 0.05, y: 0.95 }
        ]
    },

    the_sky: {
        key: 'bg-the_sky',
        path: '/images/scenes/the_sky.jpeg',
        label: 'The Sky Above',
        playerSpawn: { x: 0.45, y: 0.55 },
        hotspots: [],
        walkZone: [
            { x: 0.05, y: 0.15 },
            { x: 0.95, y: 0.15 },
            { x: 0.95, y: 0.95 },
            { x: 0.05, y: 0.95 }
        ]
    },

    the_clearing: {
        key: 'bg-the_clearing',
        path: '/images/scenes/the_clearing.jpeg',
        label: 'The Forest Clearing',
        playerSpawn: { x: 0.25, y: 0.6 },
        hotspots: [
            { x: 0.6, y: 0.5, radius: 35, label: 'Fire', knot: 'gateway_friend_conversation' }
        ],
        walkZone: [
            { x: 0.05, y: 0.20 },
            { x: 0.95, y: 0.20 },
            { x: 0.95, y: 0.95 },
            { x: 0.05, y: 0.95 }
        ]
    }
};
