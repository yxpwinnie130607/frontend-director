---
name: frontend-director
description: Create beautiful websites and interfaces using a coding agent's frontend skills. Confirms purpose, length, content, and density, then shows three interactive first-viewport directions. After the user picks one, builds that system only. Use when building landing pages, portfolios, brand sites, or marketing sites.
---

# Frontend Director

A coding-agent skill for websites. The model already knows CSS. Without a **loaded visual system**, it emits quieter slop: white page, centered headline, one tinted word, a pill CTA, a card. That is how 「拾贝」failed. This skill exists so that cannot happen again.

**Zara's frontend-slides works because it asks four things, shows three directions, then builds one.** Same here. Confirm the brief. Preview three interactive first viewports. Build only the one they pick. That is how you stop wasting tokens and stop shipping the average page.

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

1. **Do not build the full site until the user has picked a direction.** Phase 1 confirms. Phase 2 is three first-viewport previews. Phase 3 is the site.
2. **Load a system before any markup.** If you have not read `systems/<id>.md`, you are not designing. You are guessing.
3. **Copy the system's `:root` and font `<link>`s.** Do not "interpret" them into Tailwind defaults.
4. **First viewport follows the system's skeleton.** If the skeleton is split, do not center. If the skeleton is an object, the object is on screen without scrolling.
5. **Product / consumer / ritual tools must be interactive in the first viewport.** Paste, type, drop, toggle, or add — and the object responds. A screenshot of a product is a fail for these kinds. A muted card under a headline is a fail.
6. **One system per page.** Do not blend night Linear with editorial serif with a teal word.
7. **"Quiet" is not "generic SaaS."** Quiet means one material, one type, one object. It still has a room and a working thing.
8. **No headline word in a second color.** Emphasis is weight, italic of the same face, or a line break.
9. **No em-dash (`—`) in visible copy.**

---

## Phase 0 — Detect

- **New page** → Phase 1.
- **Redesign** → audit tokens and IA first ([verdicts.md](verdicts.md) redesign row), then Phase 1.
- **Enhance existing** → do not change the system mid-flight unless asked. Fix density, type, interaction.

---

## Phase 1 — Confirm the brief (four questions)

**Auto-analyze first.** Before asking anything, write 2–4 sentences of your read: what this site is, who it is for, what the first-viewport object might be, and whether it is a marketing page or the product itself. Then **ask all four together**, plus **1–3 follow-up questions** that pin down what they actually mean (not generic taste questions). Use a structured-question UI if the environment has one. Otherwise one compact message, numbered.

Follow-ups are for this brief only. Examples: "Is 拾贝 the product they use, or a landing that sells it?" "One screen they paste into, or a 5-section story?" "Quiet object, or a denser reading page?" Do not ask ten questions. Do not ask about fonts or colors here.

Do not skip this unless they said "直接做 / just build / no questions."

**Question 1 — Purpose** (header: "Purpose")  
What is this site for?

- Product marketing / landing
- Personal or applicant portfolio
- Brand / studio / campaign
- Commerce / object story
- Editorial / essay
- Community / education

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

- Low / cinematic — one idea per viewport, air, chapter changes
- High / reading-first — more self-contained, denser, still designed

Prefill your inferred answers in the question labels so they can tap to confirm. Example: *"Purpose (reading this as: product marketing for a weekly clip tray)."*

If they pick "All content ready," ask them to paste it in the same turn.  
If they send images, scan them before Phase 2; usable images shape the outline.

Remember density. It changes type scale, section count, and whether the first viewport is a room or a packed stage.

Clip / Sunday / 摘录 / 稍后再看 briefs default Purpose to product marketing and should later preview `ritual-object` as one of the three directions.

---

## Phase 2 — Three interactive directions (not three sites)

Show, don't tell. Most people cannot name a vibe. They can pick a room they can click.

1. Open [archetypes.md](archetypes.md) only. From Purpose + Density, shortlist **three different** system ids. Typical mix: one safe, one bold, one wildcard that fits this brief. Clip/journal briefs must include `ritual-object`.
2. Read **only those three** `systems/<id>.md` files. Do not read the others. Do not read [ceiling.md](ceiling.md) yet.
3. Build **three first-viewport previews** — self-contained HTML (or three tiny routes). Each preview:
   - Uses that system's fonts, `:root`, and skeleton
   - Is interactive (the required interaction works)
   - Uses the user's real product name and copy, not "Style A"
   - Is one viewport tall. No full landing, no extra sections
4. Save to `.frontend-director/previews/` as `a.html`, `b.html`, `c.html`. Open all three.
5. In the chat, name them for the user only (not on the page): Direction A: `ritual-object` / B: … / C: …

**Preview authenticity (non-negotiable):**

- Looks like the real first screen of their site
- No "preview", "option A", "safe", "bold", file names, or system ids on the page
- No tinted headline word, no em-dash

Ask (header: "Direction"): which one? A / B / C / mix (then ask what to mix).

**Stop.** Do not generate the rest of the site. This is the token save.

---

## Phase 3 — Build only the one they picked

Read `systems/<id>.md` again if you need the "rest of page" rules. Read [motion.md](motion.md) if that system calls for motion. Read [forbidden.md](forbidden.md) before you call it done.

From the chosen file, take fonts, `:root`, first-viewport skeleton (you already have it), required interaction, and what the rest of the page may do.

Length from Phase 1 sets section count. Density sets type scale and air. Content from Phase 1 is the copy. Do not invent a second system.

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

- [ ] Four questions confirmed; one of three directions picked
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
