---
name: frontend-director
description: Create 3D, highly interactive websites using a coding agent's frontend skills. The visual ceiling is Recent (recent.design): lit physical objects, WebGL, glass, volume. Confirms purpose, length, content, and density, then shows three live 3D first-viewport directions. After the user picks one, builds that system only. Use when building landing pages, product sites, portfolios, or marketing sites.
---

# Frontend Director

The ceiling is **Recent** (https://recent.design, formerly Godly). Open the homepage *and* the Web filter. Those cards are the template: a lit torus, a glass hero, crumpled paper, a koi, ice, a black hole. **The first viewport is a 3D studio you can use.** A dark form with a yellow button is the same as no skill (回声瓶).

Displace is interaction. Recent's objects are material. You need both: WebGL volume *and* a job (drop, generate, peel).

A still poster, a 2D card, a textarea on black: fail.

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
- **Volume:** The first screen is WebGL (Three.js). Physical material, studio lights, ACES, shadows. An unlit cube is a fail. A CSS card is a fail.
- **Atmosphere:** A studio, not a form. The object has weight, thickness, and a floor or fog.
- **Motion:** Pointer orbits the volume. Idle spin or breath. The product job happens *to the mesh*. See [motion.md](motion.md).
- **Product:** If the brief is a tool, you use the 3D object (drop a line into a vessel, press an orb). A screenshot or a textarea card is a fail.

Avoid: purple-on-white, indigo `#6366f1`, centered badge + headline + sub + two CTAs, equal feature cards, fake browser chrome with gray bars, dead lists, Space Grotesk as the new Inter.

---

## Hard rules (non-negotiable)

1. **Do not build the full site until the user has picked a direction.** Phase 1 confirms. Phase 2 is three live first-viewport previews. Phase 3 is the site.
2. **Every first viewport is a 3D volume.** WebGL canvas, fullscreen or ≥ 70% of the viewport. `MeshPhysicalMaterial` or `MeshStandardMaterial`, lights, environment, shadows, ACES. Pointer orbits the object. A rounded 2D card / textarea / yellow fill button is a fail even if it "works."
3. **Load a system and [motion.md](motion.md) before any markup.** If you have not read them, you are guessing.
4. **Copy the system's `:root`, font `<link>`s, and the live engine.** Do not "interpret" them into a static Tailwind landing.
5. **The product job happens to the 3D object.** Type feeds the mesh (drop, peel, write on). A letter, a feature table, a fake window, or a "工作台" card is a fail.
6. **One system per page.** Do not blend night Linear with editorial serif with a teal word.
7. **No headline word in a second color.** Emphasis is weight, italic of the same face, or a line break.
8. **No em-dash (`—`) in visible copy.**
9. **Do not ship a still page, and do not ship a flat live form.** Restrained means one material in a studio. It is still 3D.

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

**Default for any tool / virtual product / 文案 / generate brief:** Purpose = the product itself. The three directions are `volume-object`, `volume-field`, and `kinetic-scroll` (kinetic must still put a 3D object in the pin).

---

## Phase 2 — Three live directions (not three posters)

Show, don't tell. People pick a room they can *use*.

1. Open [archetypes.md](archetypes.md). For product / tool / virtual-product briefs, shortlist **`volume-object` + `volume-field` + `kinetic-scroll`**. All three are 3D. For brand/studio: `volume-field` + `one-world` + `volume-object`. Do not shortlist a 2D form system.
2. Open https://recent.design (homepage *and* Web). Pick 3 volumetric posts (glass, ice, paper, orb, fish, hole). Write the material and the verb. Do not clone their mesh. Steal light, scale, and depth.
3. Read **only those three** `systems/<id>.md` files and [motion.md](motion.md).
4. Build **three first-viewport previews** — self-contained HTML. Each preview:
   - Is a WebGL studio (Three.js from the system file)
   - Uses that system's fonts, `:root`, and mesh
   - Pointer orbits *now*; the product job hits the mesh
   - Uses the user's real product name and copy
   - Is one viewport tall
5. Save to `.frontend-director/previews/` as `a.html`, `b.html`, `c.html`. Open all three. Orbit each. If a preview is a 2D card, rebuild it.
6. In the chat, name them for the user only: Direction A: `volume-object` / B: `volume-field` / C: `kinetic-scroll`

**Preview authenticity:**

- Looks like the real first screen of their site
- No "preview", "option A", file names, or system ids on the page
- No tinted headline word, no em-dash
- No fake browser window, no yellow fill button, no 工作台 card

Ask (header: "Direction"): which one? A / B / C / mix.

**Stop.** Do not generate the rest of the site.

---

## Phase 3 — Build only the one they picked

Read the chosen `systems/<id>.md` again. Read [motion.md](motion.md). Read [forbidden.md](forbidden.md) before you call it done.

Length from Phase 1 sets section count. Density sets type scale. Content is the copy. Every later section must still do *something* (hover wipe, scroll pin, add, generate). Do not invent a second system.

Default stack: one HTML file with the Three.js importmap from the system. HUD is a whisper over the canvas.

**Every page must include:**

- A WebGL canvas covering the first viewport
- Physical materials, studio lights, ACES, shadows
- Pointer orbit on the volume
- The product job applied to the mesh
- `prefers-reduced-motion`: keep the mesh usable, slow the orbit

**Do not include:**

- A letter about the product instead of the product
- A dark rounded "工作台" card, textarea, yellow fill button
- Fake browser chrome / gray placeholder bars
- Feature rows with a line under each claim
- Lucide icons in rounded squares
- An unlit cube
- Fake "Sarah Chen, CEO" quotes

Comments in CSS: `/* === SYSTEM TOKENS === */`, `/* === LIVE ENGINE === */`, `/* === FIRST VIEWPORT === */`.

---

## Phase 4 — Look

Open the page. Move the pointer across it. Scroll. Type or click the primary object. Narrow to a phone width.

Then read [forbidden.md](forbidden.md). One hit is a fail.

**Ship bar:**

- [ ] Four questions confirmed; one of three directions picked
- [ ] System id named; `systems/<id>.md` and `motion.md` were read
- [ ] First viewport is WebGL with physical material and studio light
- [ ] Pointer orbits the volume; the product job hits the mesh
- [ ] No 2D 工作台 card, no yellow fill button, no 素笺 letter
- [ ] Tokens and fonts are the system's
- [ ] Opened in a browser and used, not only screenshotted
- [ ] No tinted headline word, no em-dash
- [ ] Mobile keeps the loop; it is not a cramped stack of a dead desktop

If a box cannot be ticked, the page is not done.

---

## What this skill is not

- Not a slide engine. For decks, use a slides skill.
- Not a request to restyle a product surface the user did not name.
- Not permission to ship a static editorial landing, or a flat live form, and call it taste.
