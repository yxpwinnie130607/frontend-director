---
name: frontend-director
description: Create highly interactive websites using a coding agent's frontend skills. Uses Recent (recent.design) websites as the interaction templates. Confirms purpose, length, content, and density, then shows three live first-viewport directions. After the user picks one, builds that living system only. Use when building landing pages, product sites, portfolios, or marketing sites.
---

# Frontend Director

The ceiling is **Recent websites** (https://recent.design, formerly Godly). Not their colors. Their law: **the page is a machine you can use**. Pointer, scroll, and type change the room. A still poster with nice type is the same as no skill.

Displace on Recent is the model: the homepage *is* a desktop you open, type in, drag. Offer Studio is a world you enter. Linear puts a working product on stage. 素笺-as-a-letter, a feature list with rules, a dead draft list, a fake window of gray bars: those fail this skill.

Visual can be quiet or loud. **Still is not allowed.** Quiet paper that writes back when you type is in. Quiet paper you can only read is out.

**Confirm the brief. Preview three live first viewports. Build only the one they pick.**

If other aesthetic skills are installed, this file is the director unless the user names another.

Read supporting files only when the phase says so:

- [archetypes.md](archetypes.md) — index. Pick three live ids.
- [systems/](systems/) — the recipe. Read **only** the shortlisted files, in full.
- [motion.md](motion.md) — the live engine. Read for every preview and every build.
- [forbidden.md](forbidden.md) — before shipping.
- [verdicts.md](verdicts.md) — if the page kind is unclear.
- [ceiling.md](ceiling.md) — optional, after a system is loaded.

---

## Design aesthetics

You converge toward static landings. Force a living page.

- **Alive first:** before fonts, decide the loop. What does pointer do? What does scroll do? What does type do? If you cannot answer all three, you are not ready to mark up.
- **Typography:** Load a real display face from Fontshare or Google Fonts. Never Inter, Roboto, Arial, or system-ui as display. The system file names the pair. Use it.
- **Color:** Copy the system's `:root`. Dominant ground + one sharp accent. Do not tint a single headline word.
- **Atmosphere:** A room (paper, night, stage). A white void with type is not a room.
- **Motion:** Continuous, not a 400ms fade-in. Pointer lerps, scroll drives properties, output writes on. See [motion.md](motion.md). Honor `prefers-reduced-motion` by keeping the *interaction* and dropping the decoration.
- **Product:** If the brief is a tool (文案, write, generate, clip, edit), the first viewport *is* that tool running. A screenshot of the tool is a fail.

Avoid: purple-on-white, indigo `#6366f1`, centered badge + headline + sub + two CTAs, equal feature cards, fake browser chrome with gray bars, dead lists, Space Grotesk as the new Inter.

---

## Hard rules (non-negotiable)

1. **Do not build the full site until the user has picked a direction.** Phase 1 confirms. Phase 2 is three live first-viewport previews. Phase 3 is the site.
2. **Every first viewport must be alive.** On first paint, without scrolling to another section, the user can do at least two of: move the pointer and the room follows; scroll and a property (clip, scale, x, progress) changes; type/click and the page writes or spawns. A screenshot that later "has JS" is a fail.
3. **Load a system and [motion.md](motion.md) before any markup.** If you have not read them, you are guessing.
4. **Copy the system's `:root`, font `<link>`s, and the live engine.** Do not "interpret" them into a static Tailwind landing.
5. **Product / consumer / writing / generate tools must be usable in the first viewport.** Type, paste, generate, add. The object responds *and* moves. A letter about the product, a feature table, or a fake window is a fail.
6. **One system per page.** Do not blend night Linear with editorial serif with a teal word.
7. **No headline word in a second color.** Emphasis is weight, italic of the same face, or a line break.
8. **No em-dash (`—`) in visible copy.**
9. **Do not ship a still page and call it "restrained."** Restrained means one material. It still moves.

---

## Phase 0 — Detect

- **New page** → Phase 1.
- **Redesign** → audit tokens and IA first ([verdicts.md](verdicts.md) redesign row), then Phase 1.
- **Enhance existing** → do not change the system mid-flight unless asked. Make the existing page *alive* first.

---

## Phase 1 — Confirm the brief (four questions)

**Auto-analyze first.** Write 2–4 sentences: what this site is, who it is for, what the user *does* in the first viewport (type, scroll, drag, generate), and whether it is a marketing page or the product itself. Then **ask all four together**, plus **1–3 follow-ups** that pin this site. Use a structured-question UI if the environment has one.

Follow-ups are for this brief only. Examples: "Is this the writing tool, or a page that sells it?" "Should I be able to generate a line of copy in the first screen?" Do not ask about fonts or colors.

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
If they send images, scan them before Phase 2.

**Default for any tool / virtual product / 文案 / generate brief:** Purpose = the product itself (or product marketing that *is* the product). One of the three directions must be `live-machine`.

---

## Phase 2 — Three live directions (not three posters)

Show, don't tell. People pick a room they can *use*.

1. Open [archetypes.md](archetypes.md). For product / tool / virtual-product briefs, shortlist **`live-machine` + `kinetic-scroll` + `pointer-world`**. For brand/studio: swap one for `one-world`. For clip/Sunday/摘录: swap one for `ritual-object` (and keep `live-machine`). Do not shortlist three still systems.
2. If you can reach the web, open https://recent.design and filter **Web**. Open 3 website posts (not posters, not 3D stills). For each, write one line: what you can *do*. Map those three verbs onto the three systems. Do not copy their skin.
3. Read **only those three** `systems/<id>.md` files and [motion.md](motion.md).
4. Build **three first-viewport previews** — self-contained HTML. Each preview:
   - Uses that system's fonts, `:root`, skeleton, and live loop
   - Is interactive *now* (pointer, scroll, or type works)
   - Uses the user's real product name and copy
   - Is one viewport tall. No extra marketing sections
5. Save to `.frontend-director/previews/` as `a.html`, `b.html`, `c.html`. Open all three. **Click, move, type in each before you show them.** If a preview is still, rebuild it.
6. In the chat, name them for the user only: Direction A: `live-machine` / B: `kinetic-scroll` / C: `pointer-world`

**Preview authenticity:**

- Looks like the real first screen of their site
- No "preview", "option A", file names, or system ids on the page
- No tinted headline word, no em-dash
- No fake browser window of gray bars

Ask (header: "Direction"): which one? A / B / C / mix.

**Stop.** Do not generate the rest of the site.

---

## Phase 3 — Build only the one they picked

Read the chosen `systems/<id>.md` again. Read [motion.md](motion.md). Read [forbidden.md](forbidden.md) before you call it done.

Length from Phase 1 sets section count. Density sets type scale. Content is the copy. Every later section must still do *something* (hover wipe, scroll pin, add, generate). Do not invent a second system.

Default stack: one HTML file, or a single Next/React page, with CSS variables from the system. The live engine from [motion.md](motion.md) in a small script.

**Every page must include:**

- The system's fonts and `:root`
- The live engine (pointer lerp + the system's required loop)
- Semantic HTML, keyboardable primary action
- The required interaction, working on first paint
- `prefers-reduced-motion` fallback that keeps the interaction

**Do not include:**

- A letter about the product instead of the product
- Fake browser chrome / gray placeholder bars
- Feature rows with a line under each claim
- Lucide icons in rounded squares
- Three-tier pricing as the visual climax
- Fake "Sarah Chen, CEO" quotes

Comments in CSS: `/* === SYSTEM TOKENS === */`, `/* === LIVE ENGINE === */`, `/* === FIRST VIEWPORT === */`.

---

## Phase 4 — Look

Open the page. Move the pointer across it. Scroll. Type or click the primary object. Narrow to a phone width.

Then read [forbidden.md](forbidden.md). One hit is a fail.

**Ship bar:**

- [ ] Four questions confirmed; one of three directions picked
- [ ] System id named; `systems/<id>.md` and `motion.md` were read
- [ ] Pointer, scroll, or type changes the first viewport *continuously*
- [ ] If it is a tool, you can do the job in the first viewport
- [ ] Tokens and fonts are the system's
- [ ] No forbidden pattern (especially 素笺-still and SaaS-stack)
- [ ] Opened in a browser and used, not only screenshotted
- [ ] No tinted headline word, no em-dash
- [ ] Mobile keeps the loop; it is not a cramped stack of a dead desktop

If a box cannot be ticked, the page is not done.

---

## What this skill is not

- Not a slide engine. For decks, use a slides skill.
- Not a request to restyle a product surface the user did not name.
- Not permission to ship a static editorial landing and call it taste.
