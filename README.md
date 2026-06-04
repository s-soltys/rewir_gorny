# Rewir Górny

An interactive narrative game set in the concrete veins of Upper Silesia, 1996. Inspired by *Disco Elysium*, you navigate a crumbling post-industrial landscape through internal monologue, sensory perception, and dialogue — making choices that reshape who you are and what you remember.

## Quick Start

```bash
# Install dependencies
cd engine && npm install

# Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Game Engine | [Phaser 3.90.0](https://phaser.io/) — isometric 2D, camera scrolling, scene management |
| Narrative | [InkJS 2.4](https://github.com/y-lohse/inkjs) — branching dialogue and story logic |
| UI | Vanilla DOM + CSS — right-side dialogue panel overlaid on game canvas |
| Audio | [Kokoro TTS](https://openrouter.ai/) via OpenRouter — AI-generated character voices |
| Build | [Vite 8](https://vite.dev/) — custom plugin compiles `.ink` → JSON at import time |

## File Structure

```
rewir_gorny/
├── engine/                     # Game application
│   ├── src/
│   │   ├── main.js             # Entry point
│   │   ├── config.js           # Phaser config
│   │   ├── style.css           # All UI styling
│   │   ├── EventBus.js         # Cross-module event system
│   │   ├── scenes/             # Phaser scenes (Boot, Title, Game)
│   │   ├── world/              # Player, Hotspot, WalkZone, SceneData
│   │   ├── narrative/          # NarrativeManager (InkJS), AudioManager
│   │   ├── ui/                 # DialoguePanel, SceneBadge (DOM overlays)
│   │   └── effects/            # AuroraEffect (copper-green animation)
│   ├── public/
│   │   ├── images/scenes/      # AI-generated scene backgrounds
│   │   └── audio/              # TTS voice WAV files
│   ├── scripts/
│   │   ├── generate_voices.js  # Kokoro TTS pipeline
│   │   └── generate_images.js  # AI background generation
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── story/                      # Ink narrative source
│   ├── main.ink                # Master file (entry point)
│   ├── globals.ink             # Variable declarations
│   ├── chapters/               # Chapter ink files
│   └── conversations/          # Dialogue ink files
├── world/                      # World bible
│   ├── setting.md              # Physical world description
│   ├── pillars.md              # Thematic pillars
│   ├── characters/             # Character profiles
│   └── locations/              # Location profiles
├── docs/                       # Documentation
│   ├── architecture.md         # Technical architecture
│   ├── style-guide.md          # Writing conventions
│   ├── ink-cheatsheet.md       # Ink syntax reference
│   └── agents/                 # AI agent persona docs
├── mood/                       # Visual reference material
├── AGENT_INSTRUCTIONS.md       # AI agent working rules
└── README.md
```

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run test:ink` | Compile and validate the Ink story |
| `npm run generate-voices` | Generate TTS WAV files for all dialogue |
| `npm run generate-images` | Generate AI background images for all scenes |

## For AI Agents

Read `AGENT_INSTRUCTIONS.md` before performing any work. It contains:
- File boundaries (what you can and cannot edit)
- Mandatory testing protocol
- Architectural quirks
- Continuous improvement guidelines

## Links

- [Ink documentation](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md)
- [inkjs (JavaScript runtime)](https://github.com/y-lohse/inkjs)
- [Phaser 3 documentation](https://docs.phaser.io/)
- [Phaser 3 examples](https://labs.phaser.io/)
