---
name: frontend-director
description: Create beautiful websites and interfaces using a coding agent's frontend skills. Matches a brief to one executable visual system (tokens, type, first-viewport skeleton, working interaction) and builds inside it. Use when building landing pages, portfolios, brand sites, or marketing sites. Not for dashboards, settings, or tables unless the user names that surface.
---

# Frontend Director

A coding-agent skill for websites. The model already knows CSS. Without a **loaded visual system**, it emits quieter slop: white page, centered headline, one tinted word, a pill CTA, a card. That is how 「拾贝」failed. This skill exists so that cannot happen again.

**Zara's frontend-slides works because it ships recipes, not vibes.** Same here. Pick one system. Copy its tokens. Build its first viewport. Make the object work.

If other aesthetic skills are installed, this file is the director unless the user names another.

Read supporting files only when the phase says so:

- [archetypes.md](archetypes.md) — index. Pick one id.
- [systems/](systems/) — the recipe. Read **only** the chosen file, in full.
- [motion.md](motion.md) — after the system is chosen, if the system calls for motion.
- [forbidden.md](forbidden.md) — before shipping.
- [verdicts.md](verdicts.md) — if the page kind is unclear.
- [ceiling.md](ceiling.md) — optional, after the system is loaded.

---

## Design aesthetics

You converge toward generic, on-distribution output. Force distinctive work.

- **Typography:** Load a real display face from Fontshare or Google Fonts. Never Inter, Roboto, Arial, or system-ui as display. Never leave the browser default. The system file names the pair. Use it.
- **Color:** Commit. Copy the system's `:root` hex values. Dominant ground + one sharp accent. Do not invent a second palette mid-page. Do not tint a single word in the headline and call it design.
- **Atmosphere:** The page has a room (paper, night, split, field). A white void with type on it is not a room.
- **Motion:** One entrance, or physics on the primary object. Prefer CSS. See [motion.md](motion.md). Honor `prefers-reduced-motion`.
- **Interaction:** A product or consumer-tool page that you cannot *use* in the first viewport has failed. The object is the design.

Avoid: purple-on-white, indigo `#6366f1`, centered badge + headline + sub + two CTAs, equal feature cards, glass on every surface, fade-up on every block, Space Grotesk as the new Inter.

---

## Hard rules (non-negotiable)

1. **Load a system before any markup.** If you have not read `systems/<id>.md`, you are not designing. You are guessing.
2. **Copy the system's `:root` and font `<link>`s.** Do not "interpret" them into Tailwind defaults.
3. **First viewport follows the system's skeleton.** If the skeleton is split, do not center. If the skeleton is an object, the object is on screen without scrolling.
4. **Product / consumer / ritual tools must be interactive in the first viewport.** Paste, type, drop, toggle, or add — and the object responds. A screenshot of a product is a fail for these kinds. A muted card under a headline is a fail.
5. **One system per page.** Do not blend night Linear with editorial serif with a teal word.
6. **"Quiet" is not "generic SaaS."** Quiet means one material, one type, one object. It still has a room and a working thing.
7. **No headline word in a second color.** Emphasis is weight, italic of the same face, or a line break.
8. **No em-dash (`—`) in visible copy.**

---

## Phase 0 — Detect

- **New page** → Phase 1.
- **Redesign** → audit tokens and IA first ([verdicts.md](verdicts.md) redesign row), then Phase 1.
- **Enhance existing** → do not change the system mid-flight unless asked. Fix density, type, interaction.

---

## Phase 1 — Read, then pick

Write one line:

> Reading this as: **\<page kind>** for **\<audience>**, energy **\<quiet|restrained|hard>**, system = **\<id>**.

Then open [archetypes.md](archetypes.md). Pick **exactly one** id. Say:

> Executing **\<id>** because \<one reason>.

If the brief is a weekly/daily habit product, a clipping box, a tray, a journal, a "come back later" tool — pick `ritual-object`. Do not pick `product-stage-day`. That is how 拾贝 became a SaaS template.

If the brief forks, ask **one** question. Otherwise proceed.

---

## Phase 2 — Load the recipe

Read `systems/<id>.md` in full. Do not skim.

From that file, take:

1. Font links
2. `:root` tokens
3. First-viewport skeleton
4. Required interaction (implement it, do not fake it)
5. What the rest of the page is allowed to do

If the system says to read [motion.md](motion.md), do it now. Otherwise skip.

---

## Phase 3 — Build

Default stack: one HTML file, or a single Next/React page, with CSS variables from the system. Interaction in a small client island.

**Every page must include:**

- The system's fonts, loaded
- The system's `:root`, intact
- Semantic HTML, keyboardable primary action
- The required interaction, working
- `prefers-reduced-motion` fallback

**Do not include:**

- A marketing stack that the system did not ask for
- Lucide icons in rounded squares
- Three-tier pricing as the visual climax
- Fake "Sarah Chen, CEO" quotes

Comments in CSS: mark `/* === SYSTEM TOKENS === */`, `/* === FIRST VIEWPORT === */`, `/* === INTERACTION === */`.

---

## Phase 4 — Look

Open the page. Click the primary object. Type or paste if the system requires it. Scroll. Narrow to a phone width.

Then read [forbidden.md](forbidden.md). One hit is a fail.

**Ship bar:**

- [ ] System id named; `systems/<id>.md` was read
- [ ] Tokens and fonts are the system's, not defaults
- [ ] First viewport matches the skeleton
- [ ] Required interaction works in the first viewport (for product / ritual / consumer)
- [ ] No forbidden pattern
- [ ] Opened in a browser
- [ ] No tinted headline word, no em-dash
- [ ] Mobile is an authored collapse, not a cramped stack of the desktop

If a box cannot be ticked, the page is not done.

---

## What this skill is not

- Not a slide engine. For decks, use a slides skill.
- Not a request to restyle a product surface the user did not name.
- Not permission to invent a fifteenth average system.
