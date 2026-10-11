# Story development method

**Purpose:** create a coherent world and story first, then derive a small playable game from them. This is a lightweight workflow for a solo prototype, not a claim that one industry-standard folder tree exists.

## Stages and gates

### 1. Narrative brief
Lock a one-page promise: premise, player role, central relationship, tone, core dramatic question, and prototype scope. Do not draft lore to answer questions the story does not need.

**Gate:** Szymon approves the emotional core and scope.

### 2. World rules and people
Separate observable phenomenon effects from explanations characters propose. Define the few places and social groups the story needs. For each faction, record goals, fears, credible evidence, blind spots, and harms caused by its strategy.

**Gate:** Szymon approves the canon/provisional boundary and major factions.

### 3. Plot and revelation design
Outline cause and effect before writing scenes. For every major reveal, track the first interpretation, the later interpretation, clues that fairly support the change, and what choice the reveal forces. The anomaly may stay unknowable; the characters' actions and the plot's causal links should not.

### 4. Scene cards
For each scene define: location, viewpoint, immediate goal, opposing agenda, conflict, clue/reveal, choice, consequence, and transition. A scene must change knowledge, relationship, danger, or commitment.

### 5. Playable prototype
Only after the outline is approved, implement a short vertical slice in the eventual runtime. Use the smallest scene sequence that tests the premise, faction conflict, choices, and one recontextualizing clue. Do not build the full game or write all dialogue first.

## Choice and branching budget

Not every meaningful choice needs a separate plot branch. A choice can create a material consequence, express a theme, or define how the protagonist relates to someone. Track only state that produces a later payoff. This keeps authorship and testing manageable while preserving agency.

## Research and iteration

- Search primary sources for Piła/1990s facts; log URL, the claim supported, and what remains uncertain.
- Mark real-world facts `VERIFY` until checked. Fictional details must not masquerade as history.
- Prototype uncertain story structure before polishing prose. Revisit the outline when a scene introduces a new cause or rule.
- Run a continuity review after each approved stage: dates, geography, character knowledge, faction incentives, and clues must agree.

## Why this process

The GDC “blueprint” account describes anchoring a game concept, outlining theme/characters/groups/history/key plot points, then mapping story events into gameplay sequences and blocks. It explicitly distinguishes a story concept from a playable story; for Rewir, the small-scoped equivalent is brief → outline → scene cards → prototype. The process should remain much smaller than a AAA production.

Ubisoft Toronto describes using a Twine prototype to test narrative flow for a replayable structure and emphasizes matching the framework to game scale. If Rewir's scene order or branches become hard to reason about, use a small clickable/text prototype before engine work.

## Repository roles

- `README.md`: quick orientation and links.
- `world/`: one home for setting, anomaly, factions, characters, locations, timeline.
- `docs/narrative/`: brief, process, plot, clue/reveal map, scene cards, decisions, open questions.
- `assets/reference/legacy-prototype/`: old media, retained only as reference.
- Future `dialogue/`: runtime Dialogue Manager files, not design notes.

GitHub does not prescribe a story-bible layout. Its README guidance is to orient visitors and link longer documentation; Issues are for planning/discussing/tracking work, while Projects are flexible rather than tied to a fixed method. Keep accepted canon in versioned files, and use GitHub Issues/Projects only for work items and review questions.

## Research references

- Mary DeMarle, GDC, [Building the Story-Driven Experience](https://media.gdcvault.com/gdconline11/DeMarle_Mary_Building_the_Story.pdf).
- Ubisoft Toronto, [Words to Worlds: Narrative Writing at GDC 2023](https://toronto.ubisoft.com/words-to-worlds-exploring-narrative-writing-in-aaa-games-at-gdc-2023/).
- Nessa Cannon, GDC 2024, [Branching on a Budget](https://media.gdcvault.com/gdc2024/Slides/GDC+slide+presentations/Cannon_Nessa_Branchingona_Budget.pdf).
- GitHub Docs: [README files](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes), [Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues), [Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects).
- Runtime structure references: [Ink writing guide](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md); [Godot Dialogue Manager basic dialogue](https://github.com/nathanhoad/godot_dialogue_manager/blob/main/docs/Basic_Dialogue.md).