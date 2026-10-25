---
name: frontend-director
description: Create 3D, highly interactive websites at the Recent quality bar (volume, physical light, a loop you can use). Confirms purpose, length, content, and density, then invents three original 3D first-viewport directions for this product. After the user picks one, builds that world. Use when building landing pages, product sites, portfolios, or marketing sites.
---

# Frontend Director

This skill teaches the **Recent bar**: 3D, highly interactive, strong material. Five posts from a Recent reel are especially good (Earth Timeline, Crumple changelog, Gaussian portal, Vercel shader, WebGL portfolio). They are the **ceiling and example loops**, not a closed catalog. After this skill is installed, invent a new object and world for **this** brief at that quality. Do not copy those five HTML files. Do not only pick from them.

A dark card with a yellow button is the same as no skill.

**Confirm the brief. Invent three live first viewports for this product. Build only the one they pick.**

If other aesthetic skills are installed, this file is the director unless the user names another.

Read supporting files only when the phase says so:

- [references.md](references.md) — the ceiling. Five loops as the bar, not a picker. Read in Phase 2.
- [archetypes.md](archetypes.md) — loop families. Match an invented loop; do not shortlist three ids.
- [systems/](systems/) — technique library. Read **at most the 1–2 files** that match the invented loop.
- [motion.md](motion.md) — the live engine. Read for every preview and every build.
- [forbidden.md](forbidden.md) — before shipping.
- [verdicts.md](verdicts.md) — if the page kind is unclear.
- [ceiling.md](ceiling.md) — optional, after a technique is loaded.

---

## Design aesthetics

You converge toward static landings. Force a living page.

- **Alive first:** before fonts, decide the loop. What does pointer do? What does scroll do? What does type do? If you cannot answer all three, you are not ready to mark up.
- **Typography:** Load a real display face from Fontshare or Google Fonts. Never Inter, Roboto, Arial, or system-ui as display. If you loaded a technique file, use its pair. Otherwise pick one pair and keep it.
- **Color:** Dominant ground + one sharp accent. Do not tint a single headline word. Borrow `:root` from a technique only if it fits this world.
- **Volume:** The first screen is WebGL (Three.js). Physical material, studio lights, ACES, shadows. An unlit cube is a fail. A CSS card is a fail.
- **Atmosphere:** A studio, not a form. The object has weight, thickness, and a floor or fog.
- **Motion:** Pointer orbits the volume. Idle spin or breath. The product job happens *to the mesh*. See [motion.md](motion.md).
- **Product:** If the brief is a tool, you use the 3D object (drop a line into a vessel, press an orb). A screenshot or a textarea card is a fail.

Avoid: purple-on-white, indigo `#6366f1`, centered badge + headline + sub + two CTAs, equal feature cards, fake browser chrome with gray bars, dead lists, Space Grotesk as the new Inter.

---

## Hard rules (non-negotiable)

1. **Do not build the full site until the user has picked a direction.** Phase 1 confirms. Phase 2 is three invented live first-viewport previews. Phase 3 is the site.
2. **Every first viewport is a 3D volume.** WebGL canvas, fullscreen or ≥ 70% of the viewport. `MeshPhysicalMaterial` or `MeshStandardMaterial`, lights, environment, shadows, ACES. Pointer / scroll / type changes the volume. A rounded 2D card / textarea / yellow fill button is a fail even if it "works."
3. **Invent the object for this brief.** Then read at most 1–2 technique files that match the loop, plus [motion.md](motion.md). Do not load all five and pick three.
4. **Steal the loop and the material standard. Do not clone the mesh.** No Earth map, Vercel jacket, baroque sofa, or cassette unless that *is* the product.
5. **The product job happens to the 3D object.** Type feeds the mesh (drop, peel, write on). A letter, a feature table, a fake window, or a "工作台" card is a fail.
6. **One world per page.** Do not blend night Linear with editorial serif with a teal word.
7. **No headline word in a second color.** Emphasis is weight, italic of the same face, or a line break.
8. **No em-dash (`—`) in visible copy.**
9. **Do not ship a still page, and do not ship a flat live form.** Restrained means one material in a studio. It is still 3D.

---

## Phase 0 — Detect

- **New page** → Phase 1.
- **Redesign** → audit tokens and IA first ([verdicts.md](verdicts.md) redesign row), then Phase 1.
- **Enhance existing** → do not change the world mid-flight unless asked. Make the existing page *alive* first.

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

**Default for any tool / virtual product / 文案 / generate brief:** Purpose = the product itself. Then invent three original 3D directions for **this** product. Do not default to Earth + crumple + portal. A writing tool is not a planet unless that metaphor fits.

---

## Phase 2 — Three invented directions (not three of five templates)

Show, don't tell. People pick a room they can *use*.

1. Confirm the four questions from Phase 1 (or the user skipped them).
2. Open [references.md](references.md) and [archetypes.md](archetypes.md). Read the **bar** and the **loop families**. Do not shortlist three named template ids.
3. **Invent three original 3D interactive first-viewport directions for THIS product.** Each one is a new object or world bound to this brief. Each must hit the bar:
   - WebGL volume (fullscreen or ≥ 70%)
   - Physical material and studio light (ACES, shadows)
   - Pointer, scroll, or type **changes the volume**
   - The product job happens **to the mesh / world**
   - No 2D form, no 工作台 card, no yellow fill button
4. Match each invented loop to a **family** (object+control, material transform, room you enter, field/shader, spatial deck). Read **at most the 1–2** `systems/<id>.md` files that teach that family, plus [motion.md](motion.md). Also allowed: `volume-object`, `volume-field`, `volume-world`. Do not force every preview to be Earth, crumple, or a portal.
5. Build **three first-viewport previews** — self-contained HTML. Each preview:
   - Is a WebGL studio you invented for this product
   - Pointer orbits *now*; the product job hits the mesh
   - Uses the user's real product name and copy
   - Is one viewport tall
6. Save to `.frontend-director/previews/` as `a.html`, `b.html`, `c.html`. Open all three. Use each. If a preview is a 2D card, or a clone of Earth / jacket / sofa / cassette, rebuild it.
7. In the chat, name them for the user by **what they do**, not by template id. Example: Direction A: a glass vessel you pour a line into / B: a sheet of drafts that peels / C: a night room of echoes.

**Preview authenticity:**

- Looks like the real first screen of their site
- No "preview", "option A", file names, or system ids on the page
- No tinted headline word, no em-dash
- No fake browser window, no yellow fill button, no 工作台 card

Ask (header: "Direction"): which one? A / B / C / mix.

**Stop.** Do not generate the rest of the site.

---

## Phase 3 — Build only the one they picked

Rebuild the chosen invented world. Re-read the 1–2 technique files that match its loop, [motion.md](motion.md), and [forbidden.md](forbidden.md) before you call it done.

Length from Phase 1 sets section count. Density sets type scale. Content is the copy. Every later section must still do *something* (hover wipe, scroll pin, add, generate). Do not invent a second unrelated system.

Default stack: one HTML file with a Three.js importmap. HUD is a whisper over the canvas.

**Every page must include:**

- A WebGL canvas covering the first viewport
- Physical materials, studio lights, ACES, shadows
- Pointer / scroll / type changing the volume
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
- A cloned Earth, Vercel jacket, baroque room, or cassette

Comments in CSS: `/* === SYSTEM TOKENS === */`, `/* === LIVE ENGINE === */`, `/* === FIRST VIEWPORT === */`.

---

## Phase 4 — Look

Open the page. Move the pointer across it. Scroll. Type or click the primary object. Narrow to a phone width.

Then read [forbidden.md](forbidden.md). One hit is a fail.

**Ship bar:**

- [ ] Four questions confirmed; one of three invented directions picked
- [ ] The object/world was invented for this brief; matching technique file(s) and `motion.md` were read
- [ ] First viewport is WebGL with physical material and studio light
- [ ] Pointer / scroll / type changes the volume; the product job hits the mesh
- [ ] No 2D 工作台 card, no yellow fill button, no 素笺 letter
- [ ] Not a clone of Earth, crumple-poster-as-changelog, baroque portal, Vercel jacket, or cassette
- [ ] Opened in a browser and used, not only screenshotted
- [ ] No tinted headline word, no em-dash
- [ ] Mobile keeps the loop; it is not a cramped stack of a dead desktop

If a box cannot be ticked, the page is not done.

---

## What this skill is not

- Not a five-template picker. Not permission to copy five HTML files and stop.
- Not a slide engine. For decks, use a slides skill.
- Not a request to restyle a product surface the user did not name.
- Not permission to ship a static editorial landing, or a flat live form, and call it taste.
