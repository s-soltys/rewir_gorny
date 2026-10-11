# Working rules — Rewir Górny

This is a story-preproduction repository. Do not add or restore a game engine, build system, or executable narrative runtime unless Szymon explicitly starts the game-implementation phase.

## Source of truth

1. Read `README.md`, `docs/narrative/brief.md`, `docs/narrative/decision-log.md`, and `docs/narrative/open-questions.md` first.
2. `world/` holds world facts and character/location reference. `docs/narrative/` holds story structure and process. `dialogue/` is reserved for future playable Dialogue Manager source; do not create runtime dialogue until the outline is approved.
3. Mark every new claim **CANON**, **PROVISIONAL**, or **OPEN**. Assistant proposals stay PROVISIONAL until Szymon approves them.
4. When a source conflicts with the decision log, follow the decision log and update the stale document. Do not duplicate canon in several files; link to its home instead.

## Development sequence

Work in this order and stop at each decision gate for Szymon's direction:

1. Narrative brief and emotional center.
2. Setting, phenomenon rules/unknowns, and faction matrix.
3. Causal plot outline and revelation/clue map.
4. Scene cards, then prose/dialogue.
5. Only after story approval: choose a playable vertical slice and resume game implementation.

The current product is a prototype. Prefer a few connected locations, factions, characters, and choices over a deep encyclopedia or a large branching tree.

## Research and factual care

- Keep historical Piła/Poland facts separate from fictional additions.
- Cite a primary or credible source for factual claims about local history, the airfield, military presence, market locations, or 1990s events. If not checked, label the item OPEN / VERIFY.
- Do not call Piła “Upper Silesia” or “Górny Śląsk.” The user-anchored setting is Piła; the old README/style guide used the wrong regional label.
- The anomaly is not religiously explained, personified, or given a confirmed motive. Its effects and human interpretations may be described; its ultimate nature remains unknown unless Szymon changes this.
- Use *Attack on Titan* only as a structural reference for justified opposing factions, connected clues, and recontextualizing revelations. Do not copy its plot, factions, symbols, or lore.

## Git hygiene

- Keep text files readable, linked from an index, and focused on one purpose.
- Keep old playable prose in the archive clearly labeled ARCHIVED; do not treat it as approved story.
- For edits, summarize the files and any canon/provisional changes. Verify links, heading structure, status labels, and the full diff before committing.
- No game code, package manifests, compiled dialogue, or generated output in this story-only phase.