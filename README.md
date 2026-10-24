# Frontend Director

A coding-agent skill that directs frontend design with judgment.

The model already knows CSS. This skill tells it **when to hold back, when to go hard, and which one reference system to execute**. It matches the brief to one of fourteen archetypes, then builds the page inside that system. It does not average Linear with Offer Studio. It does not unleash every effect at once.

Works with Cursor, Claude Code, Codex, and any agent that can read a `SKILL.md`.

## What it does

1. Reads the brief (landing, portfolio, brand, commerce, …).
2. Sets energy: quiet / restrained / hard — and **one** hard layer (`layout` · `type` · `material` · `motion` · `image` · `product-state`).
3. Picks **exactly one** archetype from the library.
4. Executes that system. Looks at the result in a browser. Fails if a slop pattern lands.

The library is small on purpose. Fourteen directions cover the matrix. [Recent](https://recent.design) (formerly Godly) is overflow, not a second catalog.

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

The agent should answer with a one-line design read and `Executing <id> because …` before it writes code.

## Files

| File | Role |
|---|---|
| `SKILL.md` | Director: permission, brief, taste, look |
| `archetypes.md` | Fourteen systems. Pick one, execute that one |
| `verdicts.md` | Where to go hard by page kind |
| `ceiling.md` | Why the reference sites work |
| `forbidden.md` | Slop that must not ship |

## License

MIT
