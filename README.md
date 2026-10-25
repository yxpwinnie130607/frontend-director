# Frontend Director

Create beautiful websites and interfaces using a coding agent's frontend skills.

Judgment without a recipe produces quieter slop. This skill ships **executable systems**: fonts, hex tokens, a first-viewport skeleton, and a working interaction. The agent picks one system and builds inside it — the same way [frontend-slides](https://github.com/zarazhangrui/frontend-slides) ships style presets instead of asking the model to "make it beautiful."

Works with Cursor, Claude Code, Codex, and any agent that can read a `SKILL.md`.

## What it does

1. Infers the brief, then confirms four things at once: **Purpose, Length, Content, Density**.
2. Builds **three interactive first-viewport directions** (not three full sites).
3. You pick one. Only then does it load that system's full recipe and build the site.
4. The primary object works (paste, add, toggle, open). It opens the page and fails on a forbidden pattern.

A clip / Sunday / 摘录 product always includes `ritual-object` as one of the three directions.

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

The agent should confirm the four questions, then open three clickable first screens, then build only the one you pick.

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
