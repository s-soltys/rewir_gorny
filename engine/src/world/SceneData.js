/**
 * Scene data registry.
 * All coordinates are normalized (0–1) so they scale with any viewport/background size.
 */

export const PANEL_WIDTH = 420;

export const SCENES = {
    childhood_room: {
        key: 'bg_room',
        path: '/images/scenes/bg_room.jpeg',
        label: 'Childhood Room',
        playerSpawn: { x: 0.3, y: 0.7 },
        hotspots: [
            { x: 0.7, y: 0.6, radius: 30, label: 'Examine Toy', knot: 'knot_toy_robot', spriteKey: 'sprite_toy', hideCondition: 'has_toy' },
            { x: 0.1, y: 0.5, radius: 40, label: 'Leave Room', knot: 'knot_room_door' }
        ],
        walkZone: [
            { x: 0.05, y: 0.20 },
            { x: 0.95, y: 0.20 },
            { x: 0.95, y: 0.95 },
            { x: 0.05, y: 0.95 }
        ]
    },

    flat_hallway: {
        key: 'bg_hallway',
        path: '/images/scenes/bg_hallway.jpeg',
        label: 'Flat Hallway',
        playerSpawn: { x: 0.2, y: 0.6 },
        hotspots: [
            { x: 0.8, y: 0.4, radius: 40, label: 'Talk to Parents', knot: 'knot_parents', spriteKey: 'sprite_mom', hideCondition: 'has_hat' },
            { x: 0.1, y: 0.5, radius: 40, label: 'Leave Flat', knot: 'knot_hallway_door' }
        ],
        walkZone: [
            { x: 0.05, y: 0.20 },
            { x: 0.95, y: 0.20 },
            { x: 0.95, y: 0.95 },
            { x: 0.05, y: 0.95 }
        ]
    },

    street: {
        key: 'bg_street',
        path: '/images/scenes/bg_street.jpeg',
        label: 'Osiedle Street',
        playerSpawn: { x: 0.1, y: 0.6 },
        hotspots: [
            { x: 0.5, y: 0.5, radius: 40, label: 'Talk to Weirdo', knot: 'knot_weirdo', spriteKey: 'sprite_weirdo' },
            { x: 0.9, y: 0.5, radius: 40, label: 'Head to Forest', knot: 'knot_street_to_forest' }
        ],
        walkZone: [
            { x: 0.05, y: 0.20 },
            { x: 0.95, y: 0.20 },
            { x: 0.95, y: 0.95 },
            { x: 0.05, y: 0.95 }
        ]
    },

    forest: {
        key: 'bg_forest',
        path: '/images/scenes/bg_forest.jpeg',
        label: 'Forest Clearing',
        playerSpawn: { x: 0.2, y: 0.6 },
        hotspots: [
            { x: 0.7, y: 0.5, radius: 40, label: 'Talk to Friend', knot: 'knot_friend', spriteKey: 'sprite_friend' }
        ],
        walkZone: [
            { x: 0.05, y: 0.20 },
            { x: 0.95, y: 0.20 },
            { x: 0.95, y: 0.95 },
            { x: 0.05, y: 0.95 }
        ]
    }
};
