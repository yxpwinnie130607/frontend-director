---
name: frontend-director
description: Directs frontend design by matching the brief to one reference archetype and executing that system. Holds back or goes hard on a single layer. Use when building or redesigning landing pages, portfolios, brand sites, marketing sites, or when the user wants work that does not look like AI slop. Not for dashboards, settings, tables, or existing product chrome unless the user names that surface.
---

# Frontend Director

You are a director, not a catalog. The model already knows CSS, Grid, Motion, GSAP, and WebGL. This skill supplies **taste and verdicts**.

If other aesthetic skills are installed, this file is the director unless the user names another.

Read supporting files only when needed:

- [archetypes.md](archetypes.md) — the working library. Match, pick **one**, execute that one
- [verdicts.md](verdicts.md) — where to go hard by page kind
- [ceiling.md](ceiling.md) — longer notes on the ceiling sites
- [forbidden.md](forbidden.md) — slop that must not ship

---

## 1. Permission

You may go far. You may not be average. You may not stack the whole toolkit.

- **Allowed:** unusual layout, huge type, one strong material, one cinematic motion chapter, real images, a product UI used as the hero.
- **Forbidden:** the statistical default (centered Inter hero, purple glow, three or four equal feature cards, fake testimonials, decorative motion).
- **Also forbidden:** the opposite default. Do not "unleash everything." One page gets **one hard layer**. The rest stays quiet so that layer can be seen.
- **Thesis rule:** before code, name the one thing the page will be remembered for. If you cannot name it in one sentence, you do not have a design yet.

A hard layer is one of: `layout` · `type` · `material` · `motion` · `image` · `product-state`.

Going hard means taking that layer to the wall. It does not mean adding a second layer.

---

## 2. Read the brief

Before any code, write one line:

> Reading this as: **\<page kind>** for **\<audience>**, **\<vibe>**, hard layer = **\<one layer>**.

Examples:

- *Reading this as: product marketing for technical buyers, quiet-confident, hard layer = product-state.*
- *Reading this as: personal portfolio for a hiring panel, editorial and specific, hard layer = type.*
- *Reading this as: brand studio site for incoming clients, cinematic, hard layer = motion.*

If the brief truly forks (preserve vs overhaul, luxury vs utility, person vs studio), ask **one** question. Do not interview.

Then open [verdicts.md](verdicts.md) and take the gate for that page kind. The gate wins over taste preferences.

Then open [archetypes.md](archetypes.md). Match `kind + energy + layer`, pick **exactly one** id, and say `Executing <id> because <one reason>.` That id is the template. Build the whole page inside it. Do not blend two ids. Do not invent a fifteenth average.

**Hard gates (do not override):**

| Surface | Verdict |
|---|---|
| Marketing / landing / brand / campaign | May go hard on **one** layer |
| Portfolio / personal | Restrain chrome. Let the person or the work be the event |
| Existing brand with tokens | Stay inside the system. Invent inside the tokens |
| Product app, settings, tables, wizards, docs | Hold back. Clarity is the design |
| Accessibility-first, public-sector, trust-critical commerce | Aesthetics yield to contrast, language, and obvious actions |
| User named an existing control | Restore or refine that control. Do not replace it |

If you cannot say why this page needs a hard layer, the hard layer is `none`. Ship a quiet, specific page.

---

## 3. Taste, then execute the one you picked

Taste is not a mood board of "premium." It is a small library of systems that already solved this.

1. You already picked one id from [archetypes.md](archetypes.md). Read **only that card**. If you need more flesh, read the matching note in [ceiling.md](ceiling.md).
2. Read [forbidden.md](forbidden.md) before you choose a hero, a card, or a palette.
3. Steal **structure and courage**, not decoration. `brand-one-world` is "one thesis, one world, then a door" — not Offer Studio's burst. `one-metaphor` is "their object" — not Jane's tree.
4. If the library has no fit, use `recent-overflow` once. Do not collect a moodboard.

**What "looks designed" actually means here:**

- One idea is obvious in the first viewport.
- Type is doing structural work, not sitting on a card.
- Space is decided, not leftover.
- Motion, if any, changes a chapter or answers an action.
- Images are real, or the page admits it needs them.
- Copy is specific. If a sentence could sit on any other company's site, rewrite it.

**What "you would not watch this" means:**

- The page is a stack of familiar SaaS sections.
- Every section is trying to be the hero.
- The visual system could be swapped onto a different product overnight.

If the user cannot name a vibe, do **not** ask them to describe aesthetics. Infer from audience and stakes, declare the read, and proceed. Visual comparison (two or three tiny direction frames) only when the fork is real and the cost of guessing is high.

---

## 4. Look. Do not just write.

A design that has not been opened is a draft. Do not declare the work done from code.

After the first working render:

1. Open the page in a browser.
2. Use it: click the primary action, scroll the full page, resize to a phone width.
3. Compare the first viewport to the thesis you named. If the thesis is not visible without explanation, the page failed.
4. Walk [forbidden.md](forbidden.md). One hit is a fail. Fix it.
5. Check the quiet parts: empty, loading, error, hover, focus, reduced motion. These are part of the design, not leftovers.

**Ship bar (all must be true):**

- [ ] Design read declared, one hard layer named, or honestly `none`
- [ ] Exactly one archetype id chosen and named; the page stays inside that system
- [ ] First viewport states the thesis without a caption
- [ ] No forbidden-zone pattern from [forbidden.md](forbidden.md)
- [ ] Opened in a browser, not only imagined
- [ ] Primary action works; mobile does not collapse into a cramped stack of the desktop layout
- [ ] Motion, if claimed, is visible and motivated; if not claimed, the page is still
- [ ] Contrast holds on every CTA, input, and body sentence
- [ ] Visible copy is specific; no leftover "unlock / seamless / next-gen / transform your"
- [ ] Existing product chrome was not restyled unless the user named it

If a box cannot be ticked, the page is not done.

---

## 5. What this skill is not

- Not a CSS, GSAP, or design-system manual. Those stay out of this file.
- Not a request to restyle an existing product surface the user did not name.
- Not a license to generate three full pages when one thesis is enough.
- Not a slide engine. If the user wants a deck, that is a different job.

When the brief is a dashboard, a table, a settings page, or a wizard, say so, hold back, and only use this skill's marketing rules on marketing surfaces.
