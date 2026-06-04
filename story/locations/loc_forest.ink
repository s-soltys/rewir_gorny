=== loc_forest ===
# scene: forest

speaker: narrator
The trees here grow at an angle, leaning away from the old industrial sector.
A low hum vibrates through the soles of your shoes.
-> END

=== knot_friend ===
speaker: friend
Finally! We thought you weren't coming.

*   [I got held up.]
    -> encounter

= encounter
speaker: friend
Did you feel it? The ground is shaking.
Suddenly, a metallic screech pierces the air. A shadow detaches from the tree line.

PERCEPTION: It's moving fast. Too fast.
ANXIETY: We shouldn't be here!

*   { inventory ? childhood_toy } [Clutch the toy for comfort]
    speaker: narrator
    The plastic edge of the robot digs into your palm, grounding you.
    You stand your ground.
    ~ chose_brave = true
    -> conclusion

*   [Run!]
    speaker: player
    Let's get out of here!
    ~ chose_brave = false
    -> conclusion

= conclusion
speaker: narrator
The shadow dissipates into a cloud of copper dust, leaving a strange taste in your mouth.
{ chose_brave:
    You survived the encounter with your sanity intact. The hum fades.
  - else:
    You run until your lungs burn. The hum follows you all the way home.
}
-> END
