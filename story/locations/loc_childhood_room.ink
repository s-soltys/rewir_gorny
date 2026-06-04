=== loc_childhood_room ===
# scene: childhood_room
~ quest_main = "Meet your friends in the forest."
~ quest_side = "none"

speaker: narrator
The morning light pierces through the blinds, casting sharp stripes across the dusty floorboards.
You lie still for a moment.
ANXIETY: Today is the day. Why did we agree to this?
NOSTALGIA: It feels like summer holidays back in '92. Before everything changed.

speaker: player
Just need to get out of bed.
-> END

=== knot_toy_robot ===
speaker: narrator
It's a plastic robot from a kinder surprise, missing its left arm.
NOSTALGIA: You used to take this everywhere. It was a good luck charm.

*   [Take the toy]
    ~ inventory += childhood_toy
    ~ has_toy = true
    speaker: player
    Might need this today.
    -> END

*   [Leave it]
    speaker: player
    I'm too old for this.
    -> END

=== knot_room_door ===
speaker: player
Alright, let's go.
-> loc_flat_hallway
