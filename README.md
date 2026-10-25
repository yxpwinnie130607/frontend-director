# Frontend Director

Create 3D, highly interactive websites at the quality of Recent's best Web posts.

The skill teaches a **taste bar**, not a five-template picker. Earth Timeline, Crumple changelog, Gaussian portal rooms, Vercel shader, and the WebGL 作品集 are especially good: they are the ceiling and example **loops** (a control changes a volume; a sheet crumples; you are in a room and jump; an object dissolves into a field; you navigate floating objects). After an agent installs this skill, it should invent a new object and world for **this** brief at that material standard. It should not copy those five HTML files or only pick from them.

Works with Cursor, Claude Code, Codex, and any agent that can read a `SKILL.md`.

## What it does

1. Reads the brief out loud, then confirms four things at once: **Purpose, Length, Content, Density**.
2. Invents **three original 3D first screens** for this product. Each one hits the bar: WebGL volume, physical light, pointer / scroll / type changes the volume, the product job happens to the mesh. A 2D card fails.
3. You pick one. Only then does it build the rest of that direction.
4. Technique files (`earth-timeline`, `crumple`, `portal-room`, `shader-dissolve`, `spatial-deck`, plus `volume-object` / `volume-field` / `volume-world`) are a library. The model reads at most the 1–2 that match the invented loop, and **always** reads atmosphere + transition + motion. A crumple slider in leftover cream is not the bar.

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

Point the agent at this repo or at `SKILL.md`. It should read `SKILL.md` first, then `archetypes.md` only when matching a loop family.

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
| `SKILL.md` | Director: phases, hard rules, look |
| `references.md` | The Recent bar: 质感 / 动效 / 炫酷, five loops as ceiling, not a catalog |
| `archetypes.md` | Loop families. Invent, then read matching techniques |
| `systems/` | Technique recipes for those families |
| `motion.md` | Motion after a direction is chosen |
| `verdicts.md` | Where to go hard by page kind |
| `ceiling.md` | Why the reference sites work |
| `forbidden.md` | Slop that must not ship |

## License

MIT
