# Rewir Górny — Style Guide

Writing conventions for Disco Elysium-style interactive prose set in 1990s Upper Silesia.

---

## Voice & Perspective

**Second person, present tense. Always.**

> You push the door. The hinges protest — a wet, grinding sound that lives somewhere between a cough and a prayer.

You are narrating the player's inner experience. Not telling them what happened. Telling them what is happening *to them*, *inside them*, right now.

---

## Paragraph Rhythm

Mix short and long. Alternate punches with poetry.

**Short** — for impact, for choices, for the moment before something changes:

> The glass is empty.

> You don't remember filling it.

**Long** — for atmosphere, for the world pressing in, for when the character's mind spirals:

> The sodium light bleeds through the window in long amber fingers, painting the linoleum in the color of old photographs, of wedding receptions in community halls, of everything that used to be warm before the factories went quiet and the warmth had nowhere left to go.

**The rule**: never more than two long paragraphs in a row. Break them with a short one. Give the reader air.

---

## Sensory-First Descriptions

Smell → Sound → Texture → Temperature → *then* visual.

The eyes are lazy. They take in everything but feel nothing. Lead with the senses that make the reader's body react.

**Good:**
> The stairwell smells like boiled cabbage and concrete dust. Somewhere above you, a radio plays — tinny, distorted, a woman's voice singing about a love that sounds like it died in 1987. The handrail is cold under your palm. Ice-cold. Like it's been waiting for you.

**Bad:**
> You see a grey stairwell. There are stairs going up. The walls are concrete. It's a typical Eastern European apartment building.

The first version puts you *inside* the space. The second describes a photograph.

---

## Trait Interjections

These are inner voices — aspects of the protagonist's psyche that comment on what's happening. They are formatted as:

```
TRAIT_NAME: The interjection text.
```

The engine detects lines starting with `NOSTALGIA:`, `PERCEPTION:`, or `ANXIETY:` and renders them with distinct styling.

### NOSTALGIA
**Tone**: Wistful, aching, sometimes treacherously beautiful. Nostalgia lies — it makes the past glow warmer than it was. It speaks in half-remembered sensory fragments.

```
NOSTALGIA: This is the smell of your grandmother's kitchen. Flour and lard and Radio Katowice playing in the other room. You were six. You were safe.
```

```
NOSTALGIA: It wasn't like this before. The courtyard had flowers. Someone cared enough to plant marigolds along the path. Who was it? Does it matter now?
```

### PERCEPTION
**Tone**: Clinical, precise, occasionally unsettling. Perception notices what the conscious mind tries to ignore. It reads spaces, objects, and people like evidence.

```
PERCEPTION: Three cigarette butts by the door. Different brands. Someone has been waiting here — and they weren't alone.
```

```
PERCEPTION: The water stain on the ceiling is shaped like a hand. Five fingers spread wide. Reaching for something. Or letting go.
```

### ANXIETY
**Tone**: Urgent, catastrophic, breathless. Anxiety spirals. It takes one small detail and extrapolates it into the worst possible outcome. Short sentences. Sentence fragments. Questions that don't want answers.

```
ANXIETY: They're watching. From the window across the courtyard. Third floor. The curtain moved. You saw it move. Why did it move?
```

```
ANXIETY: You're going to say the wrong thing. You always say the wrong thing. Your mouth is going to open and something terrible will come out and they'll know. They'll all know.
```

### Rules for trait interjections
- One trait per line. Never combine traits in a single interjection.
- Keep them to 1–3 sentences. They're interruptions, not monologues.
- They should feel involuntary — thoughts the protagonist didn't choose to have.
- Space them out. Maximum 2–3 per passage. More and they lose impact.
- They can contradict each other. Nostalgia says the past was beautiful. Anxiety says you ruined it. That tension is the point.

---

## Dialogue

Dialogue uses quotation marks. Speaker attribution goes on a separate line or is woven into action.

```
"You're not from here." The woman behind the counter doesn't look up. Her fingers keep sorting through the receipts.

> * "I used to be."
> * "Does it matter?"
> * Say nothing. Let the silence answer.
```

**Rules:**
- No dialogue tags like "she said angrily." Show the emotion through action, gesture, or silence.
- People in this world speak in short, guarded sentences. Trust is expensive.
- Mix Polish phrases naturally when it serves the atmosphere. Don't overdo it.
- Silence is a valid response. Always offer it as a choice.

---

## Writing for Choices

Choices are actions, not summaries. They should feel like reaching out and *doing* something.

**Good:**
```
> * Reach for the photograph on the mantelpiece.
> * "Tell me about the factory."
> * Leave. You've heard enough.
```

**Bad:**
```
> * Ask about the photo.
> * Learn about the factory.
> * Exit the conversation.
```

The first set makes the player feel their body move. The second reads like a menu.

---

## World Details

- **Place**: Upper Silesia (Górny Śląsk), 1996. Post-industrial. Post-hope, pre-whatever comes next.
- **Architecture**: Concrete panel buildings (bloki), mine structures, communist-era public buildings with faded grandeur.
- **Weather**: Overcast. Always. The sky is a ceiling.
- **Light**: Sodium lamps. Amber. Everything is amber at night.
- **Economy**: The mines are closing. The factories are silent. People are figuring out what to do with their hands.
- **Culture**: A mix of Polish and Silesian identity. Football, allotment gardens, church on Sunday, vodka on Saturday.

---

## Common Mistakes to Avoid

1. **Over-explaining**. Trust the reader. "The building was abandoned, empty, with no one living there anymore." → "The building was hollow."
2. **Purple prose without purpose**. Every poetic line should do work — establish mood, reveal character, or advance the scene.
3. **Forgetting the body**. The protagonist has hands, a stomach, a spine. They feel cold, hunger, tension in their jaw. Use it.
4. **Generic post-communist setting**. This is *Silesia*, not "Eastern Europe." Be specific. Name streets, brands, radio stations, foods.
5. **Trait interjections that just repeat the narration**. They should add a *new layer* — a memory, a fear, an observation the narration missed.
