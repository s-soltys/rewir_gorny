// ============================================================
// CONVERSATION — Gateway Friend
// The friend who stayed. Meeting at the clearing.
// ============================================================

=== gateway_friend_conversation ===

{
    - rel_gateway_friend >= 4:
        He pulls you into a hug before you can react. Not a back-slap hug — a real one, the kind that lasts two seconds too long and says everything neither of you will say out loud.
        
        "Man. Fucking finally."
        
        NOSTALGIA: He smells the same. Cigarettes and that cheap Adidas deodorant. Some things survive even the end of the world.
        
    - rel_gateway_friend >= 2:
        He nods. The universal Polish male greeting — a chin-lift that contains entire conversations.
        
        "Hey. Thought I saw you coming from the station."
        
        NOSTALGIA: That nod. You've been exchanging that nod since you were fourteen. It's more honest than any handshake.
        
    - else:
        He looks at you for a moment, like he's deciding something. Then shrugs.
        
        "Oh. You're back."
        
        The "you're back" lands flat. Factual. The way you state the weather or a death.
        
        ANXIETY: He's been counting the weeks since your last visit. You both know the number is too high.
}

He turns back to the sky. The green light plays across his face, turning the stubble on his jaw into copper wire.

"You seeing this shit?" he says, not looking at you. "Every night now. Started in April, like I told you on the phone. First it was just, I don't know, a glow. Like the city left the lights on behind the forest. But now—"

He gestures upward with his cigarette. The ember traces an arc against the green.

"—now it's this."

PERCEPTION: His pupils are dilated. Not from the darkness — from exposure. He's been watching this every night. The light is doing something to his optic nerve, or his optic nerve is doing something to the light.

* [What do people say about it?]
    "What do people say?"
    
    He snorts. Smoke comes out of his nose in a way that would be dramatic if it weren't so practiced.
    
    "What do people say about anything here? Nothing. They close the curtains. My mother says it's 'the factory,' which factory she doesn't specify. Pani Kowalska from Block 3 says it's the Germans testing something. Stary Heniek from the garages says it's God."
    
    He flicks ash into the grass.
    
    "Everybody has a theory. Nobody has a question."
    
    PERCEPTION: He's separating himself from them. "People." "They." He's been thinking about this more than he wants to admit.
    
    ANXIETY: And nobody with a real answer is talking. That's the shape of a cover-up, or the shape of something nobody understands. Both are terrifying.
    
    -> friend_deeper

* [You look like shit, man.]
    "You look like shit, man."
    
    He laughs. It's a real laugh — short, surprised, like you knocked it out of him.
    
    "You too. Poznań is eating you alive. You've got that student look — the one where you're too tired to sleep and too awake to think."
    
    NOSTALGIA: This. This is what you missed. Someone who insults you because they're paying attention.
    
    ~ rel_gateway_friend = rel_gateway_friend + 1
    
    He turns serious again. Faster than he used to. The light does that to him, you realize — pulls him back to itself like a current.
    
    "But yeah. I don't sleep great. Hard to, with—" He points up. "That."
    
    -> friend_deeper

* [Just stand with him. Watch the sky.]
    You don't say anything. You stand next to him, shoulder to shoulder, the way you used to stand at the bus stop, at the football pitch, at the back of the church during your grandmother's funeral. The stance that means: I'm here. That's enough.
    
    He lets the silence hold for a full minute. The sky pulses. Green, copper, green.
    
    Then, quietly: "Good that you're here."
    
    NOSTALGIA: He won't say it louder. He won't say it again. That's the entire allotment of vulnerability for the evening.
    
    ~ rel_gateway_friend = rel_gateway_friend + 1
    ~ nostalgia = nostalgia + 1
    
    -> friend_deeper

= friend_deeper

A pulse of green light sweeps across the clearing. Stronger than the others — for a moment, your shadows stretch out behind you like dark fingers reaching for the blocks. The grass ripples as if a wind passed through it, but there's no wind.

"Okay," he says, lowering his voice even though nobody else is here. "I want to show you something. But you have to not—" He stops. Starts again. "Just don't freak out."

ANXIETY: When someone says "don't freak out," the correct response is to begin freaking out immediately.

* [I won't freak out. Show me.]
    "Go ahead."
    
    He reaches into the pocket of the denim jacket and pulls out something small. He holds it in his palm, under the green light.
    
    It's a stone. Or it was a stone. Now it's something else — a pebble from the clearing, the kind you kicked around as kids, except it's changed. The surface is coated in a thin layer of copper-green crystal, and in the pulse of the sky-light, the crystals glow. Faintly. Independently. As if they have their own power source.
    
    "Found it last week. There are more. The whole north end of the clearing — if you dig down about ten centimeters, the soil is full of them."
    
    PERCEPTION: Crystalline copper formation. Accelerated oxidation. But the luminescence — that's not chemical. That's not anything you've seen in a textbook.
    
    ~ copper_exposure = copper_exposure + 1
    
    "I haven't told anyone," he adds. "Who would I tell? My mother? She'd call the priest."
    
    -> friend_closing

* [I'm already freaking out. But go ahead.]
    "I'm already afraid. But speak."
    
    He almost smiles. Then he crouches and pushes the grass aside with his hand, exposing the bare earth.
    
    "Look."
    
    You crouch beside him. In the soil, just beneath the surface, something catches the green light. Tiny points of luminescence, scattered through the dirt like a constellation fallen to earth. Copper-green crystals, no bigger than grains of rice, each one glowing with its own faint pulse.
    
    "It's spreading," he says. "The patch was maybe a meter across last week. Now it's—" He sweeps his hand in a circle. "Five? Six meters? It's growing."
    
    PERCEPTION: Growth rate suggests exponential, not linear. If this started in April, the current radius implies a doubling period of roughly ten days.
    
    ANXIETY: Exponential. In the soil. Under the clearing where children play. Where you played.
    
    ~ copper_exposure = copper_exposure + 2
    ~ anxiety = anxiety + 1
    
    -> friend_closing

= friend_closing

You both stand in silence. The sky pulses. The crystals — in his hand, in the soil — pulse with it, synchronized, as if they're all breathing the same breath.

"I don't know what this is," he says finally.

{spoke_to_kiosk_woman:
    "Pani Krawczyk at the kiosk said people are worried."
    
    "Krawczyk worries about everything. She worried about Chernobyl, she worried about the election, she worries about the price of Popularne." He pauses. "But yeah. She's not wrong this time."
}

A light turns on in Block 7, third floor. Someone's silhouette passes behind the curtain. Normal life, happening thirty meters from something that isn't normal at all.

"Listen," he says, turning to face you fully for the first time. The green light makes his eyes look older than they are. "Come back tomorrow. In the daylight. I want to show you the north end, where the — where it's thickest. And there's something in the forest, past the drainage ditch. Something I found but I haven't—"

He stops. Swallows.

"I haven't gone alone. I've been waiting for someone."

NOSTALGIA: He waited for you. All this time, all these weeks, he waited for you to come home so he wouldn't have to go alone.

PERCEPTION: He's scared. The tells are there — the swallow, the broken syntax, the way his hand goes to the pocket with the stone. He's been carrying fear and copper in the same jacket.

ANXIETY: He's asking you to go deeper. Into the forest. Toward the source. This is the moment where the horror movie protagonist makes the choice that everyone in the audience screams at.

* [I'll come. Tomorrow.]
    "I'll come. Tomorrow."
    
    He nods. The tension in his shoulders drops by a fraction — barely visible, but you've known him long enough to read the language of his posture.
    
    "Cool."
    
    He claps you on the shoulder — once, hard — and turns toward the blocks. The Metallica patch on his back catches the green light one more time.
    
    "Get some sleep," he calls over his shoulder. "Your mother's been making chicken soup since Tuesday."
    
    NOSTALGIA: Chicken soup with thin noodles and carrots cut into coins. The taste of being forgiven for leaving.
    
    ~ rel_gateway_friend = rel_gateway_friend + 1
    
    You watch him go. The sky pulses above. The crystals pulse below. And somewhere between them, in the seam of copper light and ordinary darkness, you stand in the clearing where you grew up, and you feel the ground hum beneath your feet.
    
    // TODO: Transition to apartment scene or ch02
    -> END

* [I don't know. This feels like something we should report.]
    "Man, maybe we should tell someone. The city, the—"
    
    "Who?" His voice is flat. "The mayor? The fire department? You want to call Warszawa and say 'our soil is growing copper crystals and the sky is the wrong color'? They'll send a psychiatrist before they send a geologist."
    
    PERCEPTION: He's not wrong. The infrastructure for this kind of response doesn't exist in a town of seventy thousand. The vocabulary doesn't exist in any town.
    
    "Just come tomorrow," he says, quieter now. "We look first. Then we decide."
    
    He walks away. The jacket swallows his frame. He looks smaller than he should.
    
    ANXIETY: "We look first." The last words of every expedition that didn't come back.
    
    You stand alone in the clearing. The sky hums. The ground hums. Everything is humming, and you can't tell if it's the copper or the fear or the strange, terrible beauty of a world that has decided to stop making sense.
    
    // TODO: Transition to apartment scene or ch02
    -> END
