// ============================================================
// CHAPTER 01 — HOMECOMING
// ============================================================

=== ch01_homecoming ===
# scene: station

Piła Główna. 

NOSTALGIA: You know what it says. You know what it means. You're home.

~ copper_exposure = copper_exposure + 1

PERCEPTION: Copper and ozone. The ratio is wrong for industrial runoff. This is something else entirely.

ANXIETY: What if it's already in your lungs? What if every breath is a deposit?

* [Breathe deep. You're home.]
    NOSTALGIA: See? Even the poison tastes familiar.
    ~ nostalgia = nostalgia + 1
    -> station_exit

* [Hold your breath. Keep moving.]
    ANXIETY: Good instinct. Wrong execution. You'd need a respirator. You don't have a respirator.
    ~ anxiety = anxiety + 1
    -> station_exit

* {perception > 1} [Stop. Taste the air carefully.]
    PERCEPTION: Not a storm. Not industry. The frequency is organic. Something is metabolizing copper into atmosphere.
    ~ perception = perception + 1
    ~ copper_exposure = copper_exposure + 1
    -> station_exit

= station_exit

You push through the broken glass doors and step out into Piła. The square is empty except for Mrs. Krawczyk's kiosk.

NOSTALGIA: Mrs. Krawczyk. She gave you Polo mints when you were seven. Her hands smelled like newsprint and menthol.

* [Ignore the kiosk. Start walking.]
    -> road_to_osiedle

=== station_kiosk ===
"Popularne. Please." # speaker: protagonist

"Szymon? Marta's boy?" # speaker: kiosk_woman

"Yes. Good morning." # speaker: protagonist

"Your mother said you'd be coming. She worries. We all worry, lately." # speaker: kiosk_woman

~ spoke_to_kiosk_woman = true
~ has_cigarette = true

ANXIETY: "Lately." What does "lately" cover? What's the radius of her worry?

* [Start walking towards Osiedle Górne.]
    -> road_to_osiedle

* [Ignore the kiosk. Start walking.]
    PERCEPTION: Plans are hypotheses. Piła is the experiment.
    -> road_to_osiedle

* [Look for a bus.]
    ANXIETY: The buses here run on a schedule written by someone who has never waited for a bus.
    -> road_to_osiedle

=== road_to_osiedle ===

PERCEPTION: Not prettier. Refracted. The copper particulate is bending the wavelengths. You're looking at atmospheric contamination and calling it beauty.

~ copper_exposure = copper_exposure + 1

NOSTALGIA: The neighborhood kids used to melt soldiers on the radiators. Little puddles of green plastic, cooling into nothing.

* [Take the main road. Stay in the light.]
    NOSTALGIA: Everybody used to know everybody. Now they wave at the memory of knowing.
    ~ nostalgia = nostalgia + 1
    -> approaching_blocks

* [Cut through the park. Faster.]
    ~ chose_shortcut = true
    PERCEPTION: Copper oxide. The trees are pulling it from the soil and shedding it with the needles.
    ~ copper_exposure = copper_exposure + 1
    ANXIETY: The trees are contaminated. The soil is contaminated. You're walking through a contamination corridor and calling it a shortcut.
    ~ anxiety = anxiety + 1
    -> approaching_blocks

* {perception > 2} [Follow the copper taste. See where it's strongest.]
    PERCEPTION: The gradient is steepening. Source is northeast. Consistent with the satellite dish cluster behind Block 7.
    ~ copper_exposure = copper_exposure + 2
    ~ perception = perception + 1
    -> approaching_blocks

=== approaching_blocks ===
# scene: the_blocks

Block 3. Block 5. Block 7.

NOSTALGIA: The blocks looked better when you were twelve. Everything did. The concrete was just concrete then — not a metaphor, not a symptom. Just walls.

~ nostalgia = nostalgia + 1

PERCEPTION: They noticed. They just don't have the vocabulary. "The buildings look tired," your mother said. Tired is what you call it when something is changing and you don't want to name the change.

{has_cigarette:
    ANXIETY: Smoking in contaminated air. Adding variables to an already unsolvable equation.
}

* [Go straight to the apartment. See your mother.]
    NOSTALGIA: You used to slide down these banisters. The metal was always cold, even in summer. Cold metal and warm concrete. That was childhood.
    -> the_sky

* [Walk to the clearing first. You need a minute.]
    ANXIETY: You're not "not ready." You're avoiding. Name it.
    ~ anxiety = anxiety + 1
    -> the_clearing

* [Circle the blocks. Check if anything else has changed.]
    ANXIETY: She didn't mention a lot of things. What else is she not mentioning?
    PERCEPTION: Not redirected. Grown. The mount has oxidized and the weight distribution shifted. The dish moved itself.
    ~ perception = perception + 1
    ~ copper_exposure = copper_exposure + 1
    -> the_sky

=== the_sky ===
# scene: the_sky

~ has_seen_aurora = true
~ copper_exposure = copper_exposure + 1

PERCEPTION: The emission spectrum is wrong for aurora borealis. Wrong latitude, wrong altitude, wrong everything. This is localized. This is coming from the ground.

NOSTALGIA: It's beautiful, though. Isn't it? Like the sky is remembering something it used to be, before it learned to be ordinary.

ANXIETY: Beautiful things that shouldn't exist are the most dangerous things. You know this. You've always known this.

* [Go to the clearing.]
    -> the_clearing
    
* [Go inside. The sky can wait.]
    PERCEPTION: The light has a pull. Measurable. Not gravitational — something else.
    // TODO: Chapter 1B — The apartment, the mother, the room
    -> END

=== the_clearing ===
# scene: the_clearing

~ has_returned_to_clearing = true

NOSTALGIA: You know that jacket. That stupid, oversized denim jacket with the Metallica patch on the back. He's been wearing it since ninth grade.

"Holy shit," he says, and grins. # speaker: gateway_friend

-> gateway_friend_conversation
