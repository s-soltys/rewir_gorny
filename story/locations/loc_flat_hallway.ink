=== loc_flat_hallway ===
# scene: flat_hallway

speaker: narrator
The hallway smells faintly of boiled cabbage and floor wax.
-> END

=== knot_parents ===
speaker: mom
There you are. You're heading out?

speaker: player
Yeah, going to meet some friends.

speaker: dad
Wait a second. Since you're going out... could you do us a favor?
~ quest_side = "Find the old man near the Kiosk and ask him about the strange coin."
We found this strange coin in the attic. Looks like old copper. See if anyone near the kiosk knows what it is.
~ inventory += strange_coin

*   [Sure, I'll ask around.]
    speaker: player
    No problem.
    -> mother_prompt

*   [I'm kind of busy...]
    speaker: dad
    It'll only take a minute. Please.
    speaker: player
    Fine.
    -> mother_prompt

= mother_prompt
speaker: mom
And don't forget your hat! It's getting cold outside.

*   [I don't need a hat.]
    speaker: mom
    You're not leaving this house without it!
    -> mother_prompt
*   [Grab the hat]
    ~ inventory += hat
    ~ has_hat = true
    speaker: player
    Got it.
    -> END

=== knot_hallway_door ===
speaker: narrator
You step out into the stairwell, closing the door behind you.
-> loc_street
