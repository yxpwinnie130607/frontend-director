# Frontend Director

Create highly interactive websites using a coding agent's frontend skills.

The templates are the Recent posts in the 2026-10-25 reel: Earth Timeline, Crumple changelog, Gaussian portal rooms, Vercel shader, WebGL 作品集. This skill ships **volume systems** — `volume-object`, `volume-field`, `volume-world`. A dark form with a yellow button is the same as no skill.

Works with Cursor, Claude Code, Codex, and any agent that can read a `SKILL.md`.

## What it does

1. Reads the brief out loud, then confirms four things at once: **Purpose, Length, Content, Density**.
2. For a product / 文案 / generate brief, builds **three 3D first screens**: `volume-object`, `volume-field`, `volume-world`.
3. You pick one. Only then does it build the rest of that system.
4. The first viewport is a WebGL studio. Pointer orbits. The product job hits the mesh. A 2D card fails.

A clip / Sunday / 摘录 product keeps `live-machine` and adds `ritual-object` as one of the three.

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

Point the agent at this repo or at `SKILL.md`. It should read `SKILL.md` first, then `archetypes.md` only when matching.

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

The agent should confirm the four questions, then open three *usable* first screens, then build only the one you pick.

## Files

| File | Role |
|---|---|
| `SKILL.md` | Director: phases, hard rules, look |
| `archetypes.md` | Index. Pick one id |
| `systems/` | Recipes: tokens, skeleton, required interaction |
| `motion.md` | Motion after a system is chosen |
| `verdicts.md` | Where to go hard by page kind |
| `ceiling.md` | Why the reference sites work |
| `forbidden.md` | Slop that must not ship |

## License

MIT
