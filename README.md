# Frontend Director

Create 3D, highly interactive websites at the quality of Recent's best Web posts.

The skill teaches a **taste bar**, not a five-template picker. Earth Timeline, Crumple changelog, Gaussian portal rooms, Vercel shader, and the WebGL 作品集 are especially good: they are the ceiling and example **loops**. After an agent installs this skill, it invents a new object and world for **this** brief. It does not copy those five HTML files or only pick from them.

Works with Cursor, Claude Code, Codex, and any agent that can read a `SKILL.md`.

## What it does

1. Reads the brief out loud, then confirms four things at once: **Purpose, Length, Content, Density**.
2. Invents **three original 3D first screens**. Each one fills a card first: object, atmosphere family, transition family, authored surface, studio composition. Then it builds a usable WebGL viewport. A 2D card fails. A cream crumple slider fails.
3. You pick one. Only then does it build the rest of that direction.
4. Technique files are a library. The model reads **atmosphere + transition + motion + at most 1–2 loop files**. It does not load the whole folder.

## Install

### Cursor

```bash
git clone https://github.com/yxpwinnie130607/frontend-director.git ~/.cursor/skills/frontend-director
```

Restart Cursor, or start a new agent chat. Ask it to design a landing page or a portfolio. The skill should load from the description.

### Claude Code

```bash
git clone https://github.com/yxpwinnie130607/frontend-director.git ~/.claude/skills/frontend-director
```

Then: `/frontend-director` or ask in natural language.

### Any other agent

Point the agent at this repo or at `SKILL.md`. It should read `SKILL.md` first and execute from it.

## Use

```
Design a product marketing site for a code-review tool.
```

```
A personal portfolio for a designer who writes. Quiet.
```

```
A studio site. One idea, taken all the way.
```

The agent should confirm the four questions, invent three usable first screens for this product, then build only the one you pick.

## Files

| File | Role |
|---|---|
| `SKILL.md` | Director. Executable. Invent → air → transition → surface → compose → build |
| `systems/atmosphere.md` | Designed background. Read for every preview and build |
| `systems/transition.md` | Scene change. Read for every preview and build |
| `motion.md` | Live engine. Read for every preview and build |
| `systems/*` | One loop recipe. Read 1–2 after the card is filled |
| `references.md` | Ceiling loops, optional |
| `archetypes.md` | Loop family index |
| `forbidden.md` | Fail specimens, including 拾贝 / 素笺 / 回声瓶 / KEPT / FOLD / VEIL |
| `verdicts.md` | Where to go hard by page kind |
| `ceiling.md` | How to use Recent. Not a 2D kit |

## License

MIT
