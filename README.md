# Frontend Director

Install this repo. Read `SKILL.md`. Copy a baseline. Run verify.

The skill ships **three runnable regimes** (Editorial / Immersive / Product), **28-site measured numbers**, and a **12-item verify**. When the brief is Immersive, it upgrades the 3D baseline to Recent-grade volume (authored surface, studio camera, haze that eats the limb, a real scene change).

Works with Cursor, Claude Code, Codex, and any agent that can read a `SKILL.md`.

## After install (do this)

1. Read [`SKILL.md`](SKILL.md). That file is the operating system.
2. Confirm the four questions (purpose, length, content, density).
3. Declare one regime: **Editorial**, **Immersive**, or **Product**.
4. Copy the matching baseline — do not start from a blank file:

```bash
cp "library/02-可运行基线/editorial/index.html" ./index.html
# or immersive/  or product/
```

5. Paste fingerprint numbers (type ratio, weight 400–600, tracking, stagger budget, color count).
6. Add one signature action.
7. Accept only when twelve items pass:

```bash
node library/06-工具脚本/verify.mjs ./index.html
```

Open a baseline in a browser if you want to see the target before the agent starts: `library/02-可运行基线/editorial/index.html`.

## Install

### Cursor

```bash
git clone https://github.com/yxpwinnie130607/frontend-director.git ~/.cursor/skills/frontend-director
```

Restart Cursor, or start a new agent chat. Ask it to design a landing page, a product site, or a portfolio. The skill should load from the description.

### Claude Code

```bash
git clone https://github.com/yxpwinnie130607/frontend-director.git ~/.claude/skills/frontend-director
```

Then: `/frontend-director` or ask in natural language.

### Any other agent

Point the agent at this repo or at `SKILL.md`. It should read `SKILL.md` first and execute the five steps from it.

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

The agent should confirm the four questions, declare Editorial / Immersive / Product, copy that baseline, paste the fingerprint, add one signature action, and run verify.

## Files

| Path | Role |
|---|---|
| `SKILL.md` | Operating system. Confirm brief → declare regime → copy baseline → paste numbers → one signature → verify |
| `library/` | Packed MOTION-LIBRARY. Wholesale. See the index below |
| `systems/atmosphere.md` | Immersive air. Read when upgrading the immersive baseline |
| `systems/transition.md` | Immersive scene change. Read when upgrading the immersive baseline |
| `motion.md` | Immersive live engine |
| `systems/*` | One loop recipe. Read 1–2 after the immersive baseline is copied |
| `forbidden.md` | Extra bans (crayon, closed pot, sticker blot, peach tile). Does not veto Editorial or Product |
| `references.md` | Ceiling loops, optional |
| `archetypes.md` | Loop family index for Immersive upgrades |
| `verdicts.md` | Where to go hard by page kind |
| `ceiling.md` | How to use Recent when the regime is Immersive |

`systems/*` upgrade the **Immersive** baseline. They do not forbid an Editorial or Product first viewport.

## `library/` index

Packed from MOTION-LIBRARY (26 MB). Every PNG, raw HTML file, baseline, and JSON is here.

| Path | What | When |
|---|---|---|
| `library/README.md` | Library catalog | First look at the pack |
| `library/01-规范/` | Five-step spec + 9 docs | Diagnosis, taxonomy, fingerprint, recipes, bans, playbook, verify |
| `library/01-规范/docs/00-diagnosis.md` | Six failure modes | First time |
| `library/01-规范/docs/01-taxonomy.md` | Three regimes + decision tree | Step 1 |
| `library/01-规范/docs/02-aesthetic-fingerprint.md` | 28-site numbers + pasteable CSS | Step 3 |
| `library/01-规范/docs/03-motion-recipes.md` | Six motion recipes | Step 4 |
| `library/01-规范/docs/04-webgl-recipes.md` | Material / light / camera / shader | Immersive |
| `library/01-规范/docs/05-anti-patterns.md` | 30-item AI-taste list | Before ship |
| `library/01-规范/docs/06-build-playbook.md` | Demand → ship SOP | Long briefs |
| `library/01-规范/docs/07-verification.md` | 12 items + how to fix each | Step 5 |
| `library/02-可运行基线/editorial/` | Editorial HTML baseline | Copy this |
| `library/02-可运行基线/immersive/` | Immersive HTML baseline | Copy this, then upgrade with `systems/` |
| `library/02-可运行基线/product/` | Product HTML baseline | Copy this |
| `library/03-React组件库/` | 12 motion components + Vite lab | React / Next |
| `library/04-逆向数据/` | tech / type / render / timing / webgl / matrix + 25 snippet files | Look up a number |
| `library/05-视觉参照/` | 22 sites × 2 PNG frames (hero + mid-scroll) | Composition check |
| `library/06-工具脚本/verify.mjs` | 12-item accept script | From the skill root |
| `library/07-原始HTML/` | 28 sites of captured HTML | Structure and inline CSS |

```
library/
  README.md
  01-规范/                 SKILL.md, START-HERE.md, docs/00–08
  02-可运行基线/
    editorial/index.html
    immersive/index.html
    product/index.html
  03-React组件库/          Vite + src/motion/*
  04-逆向数据/             *.json + snippets/
  05-视觉参照/             <site>-00.png, <site>-45.png
  06-工具脚本/             verify.mjs and the capture/analyse set
  07-原始HTML/             <site>.html
```

## License

MIT
