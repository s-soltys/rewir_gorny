// ============================================================
// CHAPTER 01 — HOMECOMING
// Arrival at Piła Główna. The walk to Osiedle Górne.
// ============================================================

=== ch01_homecoming ===
# scene: station

The train stops like it's giving up on something.

A lurch. A sigh of pneumatics. Then silence — the particular silence of a provincial station at dusk, where the loudest sound is the fluorescent tube flickering above platform two.

You're here. Piła Główna. The sign hasn't changed. The letters are the same shade of railway blue they were when you were seventeen and leaving, except now one of them hangs at an angle, the bolt rusted through. Nobody fixed it. Nobody will.

NOSTALGIA: Nobody needs to. You know what it says.

You step down onto the platform. Your bag is heavier than it should be — textbooks you won't open, a change of clothes, a jar of instant coffee your roommate asked you to bring back. The concrete under your shoes is cracked in the same places. The same weed grows through the same fissure near the bench.

The air hits you.

~ copper_exposure = copper_exposure + 1

Not the air you remember. There's something underneath it now — metallic, faintly sweet, like a coin held too long against the tongue. It's been there since April, your mother said on the phone. "The air has a taste," she said, and you thought she was being dramatic.

She wasn't being dramatic.

PERCEPTION: Copper. Copper and ozone. The ratio is wrong for industrial runoff. This is something else.

ANXIETY: What if it's already in your lungs? What if every breath is a deposit?

* [Breathe deep. You're home.]
    You fill your lungs deliberately. The metallic sweetness coats the back of your throat like a memory you can't quite place.
    
    NOSTALGIA: See? Even the poison tastes familiar.
    
    ~ nostalgia = nostalgia + 1
    -> station_exit

* [Hold your breath. Keep moving.]
    You press through the station with your collar pulled up over your nose. It doesn't help. The taste finds you anyway, seeping through fabric, through skin, through the idea of protection.
    
    ANXIETY: Good instinct. Wrong execution. You'd need a respirator. You don't have a respirator.
    
    ~ anxiety = anxiety + 1
    -> station_exit

* {perception > 1} [Stop. Taste the air carefully.]
    You hold still on the platform and let the air sit on your tongue like a sommelier tasting something gone wrong. Copper, yes. But there's a second note — sharper, almost electric. The kind of taste that precedes a storm, except the sky is clear.
    
    PERCEPTION: Not a storm. Not industry. The frequency is organic. Something is metabolizing copper into atmosphere.
    
    ~ perception = perception + 1
    ~ copper_exposure = copper_exposure + 1
    -> station_exit

= station_exit

The station building is a concrete rectangle painted the color of old teeth. Inside, the ticket window is closed — a handwritten sign says "BREAK" in letters that suggest the break has been going on for months. A woman in a quilted jacket sleeps on the bench beneath the departures board. The board shows two trains. Both have already left.

You push through the glass door — one hinge broken, the door scraping a groove into the tile it's been carving for years — and step out into Piła.

The square in front of the station is empty except for a taxi — a beige Polonez with a cracked windshield, the driver reading Gazeta Wyborcza behind the wheel. He doesn't look up. The kiosk to your left still sells Popularne cigarettes and lottery tickets. The woman behind the glass has the same perm she had in 1993.

NOSTALGIA: Mrs. Krawczyk. She gave you Polo mints when you were seven. Her hands smelled like newsprint and menthol.

(You can walk to the Kiosk in the scene to buy cigarettes.)

* [Ignore the kiosk. Start walking.]
    
    -> road_to_osiedle

=== station_kiosk ===
You approach the kiosk window. The glass is fogged from inside, from breath and a small electric heater that's been running since autumn.

"Popularne. Please."

She looks up. Something moves behind her eyes — recognition, maybe, or the ghost of it.

"Szymon? Marta's boy?"

"Yes. Good morning."

She slides the cigarettes through the gap without asking for money. You insist. She takes the coins slowly, like she's doing you a favor by accepting them.

"Your mother said you'd be coming. She worries." A pause. "We all worry, lately."

~ spoke_to_kiosk_woman = true
~ has_cigarette = true

ANXIETY: "Lately." What does "lately" cover? What's the radius of her worry?

* [Start walking towards Osiedle Górne.]
    -> road_to_osiedle

* [Ignore the kiosk. Start walking.]
    You keep your head down and your pace steady. The kiosk, the taxi, the sleeping woman — they're scenery. You're not here to catch up. You're here to see your mother, sleep in your old bed, and take the Sunday train back to Poznań.
    
    That's the plan.
    
    PERCEPTION: Plans are hypotheses. Piła is the experiment.
    
    -> road_to_osiedle

* [Look for a bus.]
    There's a bus stop across the square. The schedule posted behind cracked plexiglass shows a bus to Osiedle Górne at 18:15. It's 18:47. The next one is at 20:30.
    
    You wait anyway, for exactly ninety seconds, before accepting what you already knew.
    
    ANXIETY: The buses here run on a schedule written by someone who has never waited for a bus.
    
    You start walking.
    
    -> road_to_osiedle

= road_to_osiedle

The road to Osiedle Górne is a twenty-minute walk that takes you from the center of town into the birch-lined corridor between the old blocks and the forest. You know every meter of it. Your feet know it better than you do — they find the path without consulting your brain, stepping over the same cracked paving stones, turning at the same corners.

The light is going. Not setting — dissolving. The sky over Piła has been doing this thing lately where it doesn't so much darken as develop a patina, like old copper left out in the rain. The blue turns green at the edges. Your mother mentioned it. "The sunsets are different," she said. "Prettier, almost."

PERCEPTION: Not prettier. Refracted. The copper particulate is bending the wavelengths. You're looking at atmospheric contamination and calling it beauty.

~ copper_exposure = copper_exposure + 1

The streetlights come on — sodium orange, buzzing — and for a moment the world is split: the green-copper sky above, the orange sodium below, and you walking through the seam between them.

A dog barks behind a fence. A TV murmurs through an open window — "The News," an evening broadcast, a voice talking about privatization with the careful neutrality of someone who knows the microphone is always on. Somewhere, someone is burning plastic. The smell reaches you in a thin, acrid thread — PVC and regret.

NOSTALGIA: That smell. The neighborhood kids used to melt soldiers on the radiators. Little puddles of green plastic, cooling into nothing.

* [Take the main road. Stay in the light.]
    You stick to Aleja Wojska Polskiego. The main road. Streetlights every thirty meters, the sidewalk cracked but navigable. A Maluch passes you, its engine coughing, its headlights painting the birch trunks amber. The driver waves. You don't know them. You wave back anyway.
    
    This is how it works here. Everybody waves.
    
    NOSTALGIA: Because everybody used to know everybody. Now they wave at the memory of knowing.
    
    ~ nostalgia = nostalgia + 1
    -> approaching_blocks

* [Cut through the park. Faster.]
    You turn off the main road and into the park — Lasek Miejski, the city forest, though "forest" is generous. It's a corridor of pines and birches with a dirt path worn down to bare earth by generations of shortcuts.
    
    ~ chose_shortcut = true
    
    It's darker here. The streetlights don't reach past the first row of trees. Your shoes crunch on pine needles and something else — a fine, gritty dust that wasn't here before. It coats the path like rust.
    
    PERCEPTION: Copper oxide. The trees are pulling it from the soil and shedding it with the needles.
    
    ~ copper_exposure = copper_exposure + 1
    
    The pine resin smell is stronger here, almost narcotic, mixing with the copper taste into something that shouldn't work but does — like a cocktail invented by accident.
    
    ANXIETY: The trees are contaminated. The soil is contaminated. You're walking through a contamination corridor and calling it a shortcut.
    
    ~ anxiety = anxiety + 1
    -> approaching_blocks

* {perception > 2} [Follow the copper taste. See where it's strongest.]
    You do something strange. You let your tongue guide you.
    
    It's stronger to the north. You can feel it — or taste it, the distinction is becoming academic — pulling you off the main road, past the row of garages with their corrugated doors, into the birch corridor that runs along the old drainage ditch.
    
    PERCEPTION: The gradient is steepening. Source is northeast. Consistent with the satellite dish cluster behind Block 7.
    
    Nobody walks here at this hour. The ditch is dry — it hasn't rained in weeks — and the bottom is covered in a film that catches the last light and holds it. Copper green. Verdigris on concrete.
    
    ~ copper_exposure = copper_exposure + 2
    ~ perception = perception + 1
    
    You follow the ditch until it curves toward the blocks. The taste is thick now, coating your teeth.
    
    -> approaching_blocks

= approaching_blocks
# scene: the_blocks

And then you see them.

The blocks.

Osiedle Górne rises from the tree line like a jaw full of concrete teeth. Five-story panel buildings — "wielka płyta," the great slab, the communist answer to the question nobody asked about how to house a nation in rectangles. They're arranged in rows, each one identical to the last, differentiated only by the numbers painted on their ends in fading white.

Block 3. Block 5. Block 7.

You grew up in Block 5, staircase C, third floor. The window of your old room faces east, toward the forest. You used to watch the sunrise from that window, back when you were young enough to be awake at sunrise without it being a symptom of something.

NOSTALGIA: The blocks looked better when you were twelve. Everything did. The concrete was just concrete then — not a metaphor, not a symptom. Just walls.

~ nostalgia = nostalgia + 1

The blocks are different now. Not structurally — they're the same brutal geometry, the same balconies with the same laundry lines, the same satellite dishes bolted to the façades like metal fungi. But the color. The color is wrong.

In the dying light, the concrete has a sheen to it. A faint, greenish patina, like the buildings themselves are oxidizing. Like the copper in the air has been settling on every surface, every wall, every window frame, painting the neighborhood in verdigris so slowly that nobody noticed until it was everywhere.

PERCEPTION: They noticed. They just don't have the vocabulary. "The buildings look tired," your mother said. Tired is what you call it when something is changing and you don't want to name the change.

{has_cigarette:
    You light a Popularne. The smoke mixes with the copper air and becomes something new — bitter, electric, ancient.
    
    ANXIETY: Smoking in contaminated air. Adding variables to an already unsolvable equation.
}

The courtyard between Block 5 and Block 7 is where you used to play. The sandbox — if you can call a concrete frame full of cat-contaminated grit a sandbox — is still there. The swing set too, one chain broken, the remaining swing turning slowly in a wind you can't feel.

* [Go straight to the apartment. See your mother.]
    You cross the courtyard toward staircase C. The intercom panel beside the door has been replaced at some point — the old one had buttons that stuck, this one has buttons that don't work at all. You try yours. Nothing. You try the neighbor's. A buzz, a click, the door opens.
    
    The stairwell smells of boiled cabbage and floor wax, underlaid with something metallic that doesn't belong. The walls are painted that specific shade of green that exists only in socialist stairwells — a color that has no name, only a function: to make corridors feel longer.
    
    NOSTALGIA: You used to slide down these banisters. The metal was always cold, even in summer. Cold metal and warm concrete. That was childhood.
    
    But you don't go up. Not yet.
    
    Something makes you stop at the ground floor window. Through the glass, past the courtyard, past Block 7, you can see the tree line. And above the tree line —
    
    -> the_sky

* [Walk to the clearing first. You need a minute.]
    You don't go inside. Not yet. You're not ready for your mother's questions, for the kitchen that smells like rosół, for the narrow hallway where your father's coat still hangs on the hook though he's been gone three years.
    
    You walk past the blocks, past the playground, past the garages, to the clearing.
    
    ANXIETY: You're not "not ready." You're avoiding. Name it.
    
    ~ anxiety = anxiety + 1
    
    The clearing is the strip of grass between the last row of blocks and the forest. In summer it was a football pitch, in winter a sledding hill, and always — always — the place where the neighborhood gathered when the apartments got too small for the feelings inside them.
    
    -> the_clearing

* [Circle the blocks. Check if anything else has changed.]
    You walk the perimeter. Slowly. Like an inspector, or a ghost.
    
    Block 3: Pani Jabłońska's garden on the ground floor is still there, but the roses are wrong — the petals have a metallic sheen, like they've been dipped in something. The leaves are darker than they should be.
    
    Block 5: Your block. Someone has hung a new curtain in your old window. Yellow, with a pattern you can't make out from down here. Your mother, redecorating? Or has she rented the room? She didn't mention it.
    
    ANXIETY: She didn't mention a lot of things. What else is she not mentioning?
    
    Block 7: The satellite dishes on the east face are covered in green-brown residue. One of them has been turned — it no longer points at the sky but at the forest, as if someone redirected it to receive a different signal.
    
    PERCEPTION: Not redirected. Grown. The mount has oxidized and the weight distribution shifted. The dish moved itself.
    
    ~ perception = perception + 1
    ~ copper_exposure = copper_exposure + 1
    
    You complete the circuit and stop at the north end. From here you can see the clearing, and above the clearing —
    
    -> the_sky

= the_sky
# scene: the_sky

The sky is wrong.

You've been told about it. Your mother, the phone calls, the way she described "the lights" in the tone people use for weather — casual, observational, stripped of awe. But description is not preparation.

Above the tree line, the sky is burning green.

Not burning. Not exactly. It's more like the sky has developed a bruise — a slow, spreading discoloration that starts at the horizon and climbs toward the zenith in curtains of light. Green and copper and something that might be violet if you catch it from the corner of your eye. It moves. Not like the northern lights — not in sheets and ribbons — but in pulses. Slow, arrhythmic pulses, like a heartbeat that hasn't found its rhythm yet.

~ has_seen_aurora = true
~ copper_exposure = copper_exposure + 1

PERCEPTION: The emission spectrum is wrong for aurora borealis. Wrong latitude, wrong altitude, wrong everything. This is localized. This is coming from the ground.

NOSTALGIA: It's beautiful, though. Isn't it? Like the sky is remembering something it used to be, before it learned to be ordinary.

ANXIETY: Beautiful things that shouldn't exist are the most dangerous things. You know this. You've always known this.

The light paints the blocks in shifting shades of verdigris. For a moment, the concrete doesn't look like concrete. It looks like something older, something mineral, something that was here before the buildings and will be here after.

Your mother is upstairs. Your old room is upstairs. Your old life is upstairs, preserved in amber — or copper, as the case may be.

But the clearing is right there, at the edge of the light, and you can see someone standing in it. A figure, hands in pockets, looking up.

You know that silhouette.

* [Go to the clearing.]
    -> the_clearing
    
* [Go inside. The sky can wait.]
    You turn away from the light. It's harder than it should be — your eyes want to stay, your skin wants to stay, something in the copper-coated air wants you to keep looking.
    
    PERCEPTION: The light has a pull. Measurable. Not gravitational — something else.
    
    You go inside. The stairwell swallows you in cabbage and floor wax, and the green light disappears behind concrete walls. But you can still taste it.
    
    // TODO: Chapter 1B — The apartment, the mother, the room
    -> END

=== the_clearing ===
# scene: the_clearing

~ has_returned_to_clearing = true

The clearing.

The grass is longer than it should be — nobody's been mowing. It reaches your shins as you walk through it, and the blades have that same faint metallic sheen you're starting to see everywhere. Under your feet, the ground is soft, almost spongy, as if something beneath the topsoil has changed its mind about being solid.

The figure in the clearing turns as you approach.

NOSTALGIA: You know that jacket. That stupid, oversized denim jacket with the Metallica patch on the back. He's been wearing it since ninth grade.

It's him. Your friend from the blocks — the one who stayed, the one who never left, the one who's been here through all of it.

"Holy shit," he says, and grins.

-> gateway_friend_conversation
