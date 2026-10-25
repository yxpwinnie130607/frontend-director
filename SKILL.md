---
name: frontend-director
description: Ships three runnable regimes (Editorial, Immersive, Product), 28-site measured numbers, and a 12-item verify. Confirms purpose, length, content, and density, then copies a baseline and pastes fingerprint numbers. When the brief is Immersive, upgrades that baseline to Recent-grade 3D (volume, physical light, a real scene change). Use when building landing pages, product sites, portfolios, editorial sites, or marketing sites.
---

# Frontend Director

The operating system is MOTION-LIBRARY's five-step law. This file is enough to run it. Open library docs or `systems/` only when a step needs them.

**Do not start from a blank file.** Copy a runnable baseline. Paste measured numbers. Add one signature action. Run verify. Twelve items must pass.

A dark card with a yellow button is the same as no skill. A cream crumple slider is not a site. Those fails still stand. They do **not** veto Editorial flush type or a Product first viewport.

If other aesthetic skills are installed, this file is the director unless the user names another.

---

## Operating system (five steps)

```
Confirm brief     four questions (kept — they pin the job)
1  Declare regime  Editorial / Immersive / Product. Write it first.
2  Copy baseline   library/02-可运行基线/<regime>/index.html
3  Paste numbers   type ratio, weight 400–600, tracking, stagger budget, color count
4  One signature   one action that belongs to this page
5  Run verify      node library/06-工具脚本/verify.mjs <page>   — 12 items must pass
```

Do not skip a step. Do not invent a fourth regime. Do not rebuild the skeleton after you copy it.

---

## Confirm the brief (four questions)

**Auto-analyze first.** Write 2–4 sentences: what this site is, who it is for, what the user *does* in the first viewport, and whether it is a marketing page or the product itself. Then **ask all four together**, plus **1–3 follow-ups** that pin this site. Use a structured-question UI if the environment has one.

Do not skip this unless they said "直接做 / just build / no questions."

**Question 1 — Purpose** (header: "Purpose")  
What is this site for?

- Product marketing / landing
- The product itself (usable tool)
- Personal or applicant portfolio
- Brand / studio / campaign
- Commerce / object story
- Editorial / essay

**Question 2 — Length** (header: "Length")  
How much site?

- Single screen (one viewport)
- Short landing (about 4–6 sections)
- Long narrative (8+ sections or scroll chapters)
- Multi-page (home plus 2–3 inner pages)

**Question 3 — Content** (header: "Content")  
Do they have copy and assets?

- All content ready (they will paste it)
- Rough notes
- Topic only (you draft copy, mark it as draft)

**Question 4 — Density** (header: "Density")  
How should it feel?

- Low / cinematic — one idea per viewport, but the idea *moves*
- High / reading-first — denser, still interactive

Prefill inferred answers. Example: *"Purpose (reading this as: a copy tool you use in the first screen)."*

If they pick "All content ready," ask them to paste it in the same turn.  
If they send images, scan them before you copy a baseline.

**Detect first:** new page → confirm, then step 1. Redesign → audit tokens and IA first ([verdicts.md](verdicts.md) redesign row), then confirm. Enhance existing → do not change the world mid-flight unless asked.

---

## Step 1 — Declare one regime

Write this line before any markup:

> Regime: Editorial | Immersive | Product. Because: [one sentence from the brief].

Decision tree ([library/01-规范/docs/01-taxonomy.md](library/01-规范/docs/01-taxonomy.md)):

```
1. Show a virtual space or a 3D body?
   yes → Immersive     library/02-可运行基线/immersive/
   no  ↓
2. Remember a brand / a person, or click a button?
   remember → Editorial    library/02-可运行基线/editorial/ + systems/editorial.md
   click    ↓
3. Features, CTA, conversion?
   yes → Product       library/02-可运行基线/product/
```

Editorial + Immersive may stack (editorial skeleton, 3D vision). **Product does not mix** with the other two.

| | Editorial | Immersive | Product |
|---|---|---|---|
| Type ratio (display ÷ body) | **5–18** | no DOM display title | **4.0–5.1** |
| Radius | 0–8px | — | 10–16px (buttons pill) |
| Depth | **1px rule, 0 shadow** | canvas depth | **soft shadow, 0 border** |
| Motion | ScrollTrigger + scrub | per-frame rAF | CSS transition |
| GSAP | high | mid (type layer only) | **almost never** |

Purpose → regime (defaults, not a veto):

- Brand / studio / campaign / editorial / portfolio that must be remembered → Editorial
- Usable 3D tool, object story, or a space you enter → Immersive
- Product marketing / SaaS / pricing / conversion → Product

A Product first viewport that is CSS + IntersectionObserver is legal. An Editorial first viewport that is flush type and 1px rules is legal. `systems/*` do not forbid those.

**If the headline is Chinese, read [systems/cjk-type.md](systems/cjk-type.md) before Step 3.** Every number in the fingerprint table below was measured on Latin sites. Two of them invert on CJK: tracking must go to ~0 (negative makes Hanzi collide) and display line-height must go to 1.05–1.30 (Hanzi fill the em box). Pasting the Latin values onto a 120px Chinese headline produces a black bar.

**If the regime is Editorial, read [systems/editorial.md](systems/editorial.md) before Step 2.** The baseline is one composition; a site is three to five compositions alternated. `systems/` had eleven files for 3D loops and none for type, which is why Editorial pages made with this skill read as "the baseline with new nouns".

---

## Step 2 — Copy the baseline

```bash
cp "library/02-可运行基线/<regime>/index.html" ./index.html
```

Then only: drop unused sections, swap in real copy, retoken color. **Do not rewrite the structure.** The baseline *is* the grid (flush type, 1px rules, sticky track / lightbox / product stack). Re-organizing it returns the three-card template.

React / Next: take components from [library/03-React组件库](library/03-React组件库) (`SmoothScroll`, `MaskReveal`, `HorizontalTrack`, `Parallax`, `Magnetic`, `Marquee`, `StaggerGrid`, `PinScene`, `VelocitySkew`). Do not restage those effects from scratch.

---

## Step 3 — Paste fingerprint numbers

Numbers are from 28 live sites ([library/01-规范/docs/02-aesthetic-fingerprint.md](library/01-规范/docs/02-aesthetic-fingerprint.md)). Adjectives do not change a sample. These do.

| Metric | Paste this |
|---|---|
| Type ratio | Editorial **≥ 5** (aim 6–8). Product **4.0–5.1**. Below 3 is flat. |
| Display weight | **400–600**. 700+ only on condensed or a serif display. |
| Tracking | **−0.02 to −0.06em** on titles ≥ 32px. Same em on every display size. `normal` is undesigned. **CJK: −0.01 to +0.02em — never negative, strokes collide.** |
| Line-height | Display 0.85–1.05. Body 1.50–1.65. Display at 1.5 is slop. **CJK display 1.05–1.30, body 1.7–1.9.** |
| Size steps | **6–9** steps, dense in the middle. Not 3 (12 / 16 / 24). |
| Color count | **≤ 2** non-neutral. Most sites are 0–1. Brand color may flood if it is the only one. |
| Families | 2 (variable sans + mono). Editorial may add one serif display. |
| Duration | Micro 0.15–0.2s / enter 0.4–0.5s / lead 0.55–0.65s |
| Stagger budget | Letters 15–30ms / blocks 40–100ms. **stagger × count ≤ 400ms** |
| Scroll-driven | Editorial **≥ 8**. Product **≤ 3**. |

Pasteable tokens:

```css
:root{
  --t-display: clamp(56px, 7.4vw, 110px);
  --t-h2:      clamp(38px, 4.2vw, 62px);
  --t-h3:      clamp(24px, 2.2vw, 34px);
  --t-lead:    clamp(18px, 1.4vw, 21px);
  --t-body:    16px;
  --t-small:   13px;
  --t-label:   10.5px;
  --lh-display: 0.9;
  --lh-title:   1.0;
  --lh-body:    1.55;
  --ls-display: -0.045em;
  --ls-h2:      -0.03em;
  --ls-label:    0.18em;
  --dur-fast: 180ms;
  --dur-mid:  450ms;
  --dur-slow: 620ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --sp-1: 24px; --sp-2: 64px; --sp-3: 140px; --sp-4: 280px;
}
```

Editorial: `--t-display` at 6–8× body. Product: clamp display so the ratio stays 4.0–5.1.

Layout this pass **with motion off**. If the still page is weak, motion multiplies zero.

Need GSAP? Only if A must finish before B, stagger count > 6, you need seek / reverse, or one progress drives many values. Hover / focus / one enter = CSS. Product defaults to **no GSAP** (vercel / linear / superlist measured `ease:` **0** times). Lenis only if the page is > 5 screens and has parallax or a sticky chapter. `pin: true` is dead (28 sites, **0** hits) — use `position: sticky`.

---

## Step 4 — One signature action

One action that belongs to this page. Not a particle field plus a cursor plus a glow.

It is the content's physics. Kill it and the page goes ordinary. One per page.

Directions that work: a material wipe tied to the job, a form that becomes the idea, type that machines itself, a scale jump of one word. Recipes: [library/01-规范/docs/03-motion-recipes.md](library/01-规范/docs/03-motion-recipes.md).

Entry budget, then hand off to that loop: air 0.00–0.20s, title 0.20–0.45s, dek 0.45–0.90s, chrome 0.90–1.40s, signature 1.40s+. Total **≤ 1.8s**.

---

## Step 5 — Run verify

```bash
node library/06-工具脚本/verify.mjs <your-page>
```

Twelve items. Fix and re-run. Do not ship on a fail. How to fix each: [library/01-规范/docs/07-verification.md](library/01-规范/docs/07-verification.md).

Item 5 reads the headline, counts CJK characters, and switches criteria by language: Latin needs
tracking ≤ −0.02em and line-height 0.85–1.15; CJK needs tracking −0.02…+0.05em (or `normal`) and
line-height 1.0–1.5. If a Chinese page "fails" item 5, check that the headline is not carrying a
Latin tracking value.

```
1.  Console: 0 errors
2.  Type ratio ≥ 4.0  (Editorial ≥ 5)
3.  Non-neutral colors ≤ 2
4.  Display weight ≤ 600
5.  Display tracking ≤ −0.02em
6.  Size steps ≥ 5  (aim 6–9)
7.  Scroll-driven ≥ 4  (Editorial ≥ 8)
8.  Duration bands 1–6
9.  prefers-reduced-motion kills animation
10. 390px: no horizontal overflow
11. Scroll frame p95 ≤ 20ms
12. Signature action (human): would this page go ordinary if you swapped it for a fade?
```

Then open the page. Use it. Narrow to a phone. Read [library/01-规范/docs/05-anti-patterns.md](library/01-规范/docs/05-anti-patterns.md). One hit is a fail.

---

## Immersive depth (upgrade the baseline — do not skip it)

When the regime is **Immersive**, copy `library/02-可运行基线/immersive/index.html` first. Then upgrade that file. Do not open a blank Three.js page.

`systems/*` are the Recent-grade layer. They upgrade the immersive baseline. They do **not** require WebGL on Editorial or Product, and they do not veto those first viewports.

Read only what the upgrade needs:

- [library/01-规范/docs/04-webgl-recipes.md](library/01-规范/docs/04-webgl-recipes.md) — material, light, camera, shader
- [systems/atmosphere.md](systems/atmosphere.md) — name the air. Haze must eat the limb. Leftover cream is not air.
- [systems/transition.md](systems/transition.md) — name a real scene change (gate / chapter wipe / dissolve / morph / camera chapter / portal jump). A hex swap behind a leftover mesh is not a transition.
- [motion.md](motion.md) — pointer / type / scroll on the volume
- **1–2** `systems/<loop>.md` that match the invented loop ([archetypes.md](archetypes.md))

Invent the object for **this** brief. Do not clone Earth, the Vercel jacket, the baroque sofa, the cassette, FOLD, or VEIL.

Copy these numbers onto the studio-object upgrade:

```js
camera = new THREE.PerspectiveCamera(32, aspect, 0.1, 40);
camera.position.set(0, 0.12, 5.5); // ~1.7 mesh. z 8–10 = empty cream
renderer.setSize(innerWidth, innerHeight); // also sets canvas CSS
```

Hard upgrades (one line per fail):

1. **Studio camera.** FOV ~32. `z` ~5.2–6.2 on a ~1.7 mesh.
2. **Canvas CSS = viewport.** A 2× drawing buffer parks the object on the right edge.
3. **Whole object, studio air.** Colored mesh 25–40% of the short axis. Projected width ≥ 18%. HUD = top corners + a control **below**. A crayon / match / pencil is empty cream.
4. **Authored surface with mass.** Canvas / shader / vertices the product wrote. A vitamin Capsule / Sphere / Box, a **closed pot**, or a **sticker blot** fails.
5. **Atmosphere required.** Paper studio / white haze / night void / fogged room / field-as-sky. Haze eats the limb. A peach tile on hard white is INK.
6. **Transition required.** Air *and* the object change. Duration 0.7–1.4s.
7. **Night glass.** Thickness + rest yaw ≈ 0.35 + clearcoat. `transmission` ≤ 0.06.
8. **Dissolve.** Sample bright authored marks. Scatter ≤ 3% of the glyph width.
9. **Printed type.** Glyph-by-glyph; fallback advance if `measureText` is 0.
10. **The product job hits the mesh.** A 工作台 card, a textarea, or a yellow fill button is a fail.

---

## Extra bans (do not veto Editorial or Product)

Read [forbidden.md](forbidden.md) before you ship an Immersive upgrade. Crayon, closed pot, sticker blot, peach tile, empty cream, milky plastic, 拾贝 / 素笺 / 回声瓶 / KEPT / FOLD / VEIL remain fails.

Those specimens do **not** make a Product CSS landing illegal. They do **not** make an Editorial 1px-rule page illegal. They ban slop cousins, not the other two regimes.

Also fail (any regime): three equal cards, centered badge + headline + sub + two CTAs, Inter/Roboto/system-ui as the only display, purple-on-white, indigo `#6366f1`, a tinted headline word, an em-dash (`—`) in visible copy, `pin: true` for a horizontal track, Lorem / "Revolutionize your workflow", emoji-as-icon.

---

## Open when a step needs it

SKILL.md runs the five steps. Do not load the rest of the tree on every job.

| When | Open |
|---|---|
| First time / why baselines exist | [library/01-规范/docs/00-diagnosis.md](library/01-规范/docs/00-diagnosis.md) |
| Step 1, regime unclear | [library/01-规范/docs/01-taxonomy.md](library/01-规范/docs/01-taxonomy.md) |
| **Editorial: how to compose sections** | **[systems/editorial.md](systems/editorial.md)** — 5 layout families, fail conditions |
| **Chinese headline / CJK type** | **[systems/cjk-type.md](systems/cjk-type.md)** — tracking, line-height, punctuation, breaking |
| Step 3, need the measured tables | [library/01-规范/docs/02-aesthetic-fingerprint.md](library/01-规范/docs/02-aesthetic-fingerprint.md) |
| Step 4, need a motion recipe | [library/01-规范/docs/03-motion-recipes.md](library/01-规范/docs/03-motion-recipes.md) |
| Immersive WebGL | [library/01-规范/docs/04-webgl-recipes.md](library/01-规范/docs/04-webgl-recipes.md) + 1–2 `systems/<loop>.md` |
| Before ship, 30-item list | [library/01-规范/docs/05-anti-patterns.md](library/01-规范/docs/05-anti-patterns.md) |
| A long or messy brief | [library/01-规范/docs/06-build-playbook.md](library/01-规范/docs/06-build-playbook.md) |
| A verify row failed | [library/01-规范/docs/07-verification.md](library/01-规范/docs/07-verification.md) |
| Immersive air / scene change | [systems/atmosphere.md](systems/atmosphere.md), [systems/transition.md](systems/transition.md), [motion.md](motion.md) |
| Immersive fail specimens | [forbidden.md](forbidden.md) |
| Someone else's GSAP | `library/04-逆向数据/snippets/<site>.txt` |
| Composition check | `library/05-视觉参照/<site>-00.png` and `-45.png` |
| Raw markup | `library/07-原始HTML/<site>.html` |

Catalog of the packed library: [library/README.md](library/README.md).

---

## What this skill is not

- Not a blank-file generator. The baseline is the start.
- Not Immersive-only. Editorial and Product are first-class regimes.
- Not a five-template picker of Recent HTML. Immersive still invents the object for this brief.
- Not a license to skip verify.
- Not a slide engine. For decks, use a slides skill.
