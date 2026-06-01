# Rewir Górny

An interactive narrative game set in the concrete veins of Upper Silesia, 1996. Inspired by *Disco Elysium*, you navigate a crumbling post-industrial landscape through internal monologue, sensory perception, and dialogue — making choices that reshape who you are and what you remember.

## Quick Start

1. **Install Inklecate** — the Ink compiler:
   Download from [inklecate releases](https://github.com/inkle/ink/releases) or install via your package manager.

2. **Compile the story** to JSON:
   ```bash
   inklecate -j ink/main.ink -o engine/story.json
   ```

3. **Open the player** — serve `engine/` with any local server:
   ```bash
   # Python
   cd engine && python3 -m http.server 8000

   # Node
   npx serve engine
   ```

4. Open `http://localhost:8000` in your browser.

## File Structure

```
rewir_gorny/
├── engine/             # Web player
│   ├── index.html      # Single-page app shell
│   ├── style.css       # Atmospheric dark theme
│   ├── app.js          # Inkjs integration
│   └── story.json      # Compiled story (build artifact)
├── ink/                # Ink source files
│   └── main.ink        # Story entry point
├── docs/               # Documentation
│   ├── style-guide.md  # Writing conventions
│   └── ink-cheatsheet.md
├── README.md
└── .gitignore
```

## Links

- [Ink documentation](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md)
- [inkjs (JavaScript runtime)](https://github.com/y-lohse/inkjs)
- [Inklecate releases](https://github.com/inkle/ink/releases)
