---
name: frontend-director
description: Create 3D, highly interactive websites at the Recent quality bar (volume, physical light, a loop you can use). Confirms purpose, length, content, and density, then invents three original 3D first-viewport directions for this product. After the user picks one, builds that world. Use when building landing pages, product sites, portfolios, or marketing sites.
---

# Frontend Director

Teach the **Recent bar**: volume, physical material, designed air, a real scene change. Five Recent posts are the ceiling and example loops, not a catalog. After install, invent a new object and world for **this** brief. Do not copy Earth, the Vercel jacket, the baroque sofa, the cassette, FOLD, or VEIL.

A dark card with a yellow button is the same as no skill. A cropped poster filling the frame is the same as no skill. A cream crumple slider is not a site.

**Confirm the brief. Invent three live first viewports. Build only the one they pick.**

If other aesthetic skills are installed, this file is the director unless the user names another.

This file is enough to decide. When you build, read only:

- [systems/atmosphere.md](systems/atmosphere.md) — the air you named
- [systems/transition.md](systems/transition.md) — the scene change you named
- [motion.md](motion.md) — pointer / type / scroll engine
- **1–2** `systems/<loop>.md` files that match the invented loop

Read [forbidden.md](forbidden.md) before shipping. Open [references.md](references.md) only if you need a ceiling loop spelled out. Do not load the rest of `systems/`.

---

## Hard laws (one line per fail)

1. **Do not build the site until they pick a direction.** Phase 1 confirms. Phase 2 is three invented first-viewport previews. Phase 3 is the site.
2. **Invent the object for this brief.** Then pick air and a transition. Do not shortlist Earth / crumple / portal / jacket / cassette.
3. **Studio camera.** FOV ~32. `z` ~5.2–6.2 on a ~1.7 mesh. `z` 8–10 on a small mesh paints **empty cream**. Fail. If cropped, pull back a little; do not jump to 9+.
4. **Canvas CSS = viewport.** `#stage { inset:0; width:100%; height:100%; display:block }`. `setSize(innerWidth, innerHeight)` must update style. A 2× drawing buffer with unlocked CSS **parks the object on the right edge**. Fail.
5. **Whole object, studio air.** Colored mesh occupies 25–40% of the short axis, centered, air on every side. HUD = top corners + a control **below** the object. HUD never sits on the mesh.
6. **No gray stage disk.** Soft elliptical contact only. A `CircleGeometry` floor is allowed only when the loop is a room you are inside.
7. **Authored surface.** Canvas / shader / vertices the product wrote. `Capsule` / smooth `Sphere` / `Box` + `color.lerp` is a vitamin (KEPT). Fail.
8. **Atmosphere is required.** Name one family before markup: paper studio / white haze / night void / fogged room / field-as-sky. Leftover CSS cream is not air. **Augen is white haze still-life, not a night void.** Interfere is 2D SaaS, not the bar.
9. **Transition is required.** Name one family before markup: **gate / chapter wipe / dissolve / morph / camera chapter / portal jump**. A crumple slider is a material event, not the site.
10. **Night glass.** Thickness (thin box, not a mapped plane) + rest yaw ≈ 0.35 + specular / clearcoat. `transmission` on a mapped night face washes to **milky plastic**. Prefer clearcoat; if you transmit, stay ≤ 0.06 and keep the first frame ink-dark.
11. **Dissolve.** Sample **bright authored marks**. Scatter ≤ 3% of the glyph width. Random plane pixels smear the word.
12. **Printed type.** Offscreen `measureText` often returns **0**. Load the face, then draw **glyph-by-glyph** with fallback advance (`w > 2 ? w : 40`) and a real word gap. `fillText(wholeLine)` collapsing to one word is a fail.
13. **The product job hits the mesh.** Type reprints / dissolves / pours. A letter, a 工作台 card, a textarea, or a yellow fill button is a fail.
14. **No headline word in a second color. No em-dash (`—`) in visible copy.**
15. **One world per page.** Do not blend night Linear with editorial serif with a teal word.

Copy these numbers when the loop is one object in a studio:

```js
camera = new THREE.PerspectiveCamera(32, aspect, 0.1, 40);
camera.position.set(0, 0.12, 5.5); // ~1.7 mesh. z 8–10 = empty cream
renderer.setSize(innerWidth, innerHeight); // also sets canvas CSS. never leave a 2× style
```

---

## Taste (alive, not a kit)

- **Alive first:** before fonts, name the loop. What does pointer do? Scroll? Type? If you cannot answer all three, you are not ready to mark up.
- **Type:** one display face from Fontshare or Google Fonts. Never Inter, Roboto, Arial, or system-ui as display.
- **Color:** dominant ground + one sharp accent. Do not tint a single headline word.
- **Volume:** first screen is WebGL. `MeshPhysicalMaterial` or `MeshStandardMaterial`, lights, environment, shadows, ACES. An unlit cube is a fail. A CSS card is a fail.
- **炫酷:** one complete object, or a room you are inside. Designed air. Tiny chrome.
- **Avoid:** purple-on-white, indigo `#6366f1`, centered badge + headline + sub + two CTAs, equal feature cards, fake browser chrome, Space Grotesk as the new Inter.

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

**Default for any tool / virtual product / 文案 / generate brief:** Purpose = the product itself. Then invent three original 3D directions for **this** product. A writing tool is not a planet unless that metaphor fits.

---

## Phase 2 — Invent, then pick families, then preview

Show, don't tell. People pick a room they can *use*.

**Do not open the technique library yet. Do not open [references.md](references.md) yet.**

1. Confirm the four questions from Phase 1 (or the user skipped them).
2. **Invent three original objects / worlds for THIS product.** Not three template ids. A writing tool might be a vessel, a ribbon of type, a night room of drafts — not a planet, not a changelog poster, unless that *is* the metaphor.
3. **Write one card per direction before any markup.** If a line is blank, you are not ready to build:

```
Object:      [invented thing bound to this brief]
Atmosphere:  paper studio | white haze | night void | fogged room | field-as-sky
Transition:  gate | chapter wipe | dissolve | morph | camera chapter | portal jump
Surface:     [canvas / shader / vertices the product wrote]
Composition: whole object, FOV 32, z 5.2–6.2, HUD below, no stage disk
```

A cream crumple slider with no named air and no named scene change is not a card. Rebuild the card.

4. Match each card to a **loop family**. Then read **only** [systems/atmosphere.md](systems/atmosphere.md), [systems/transition.md](systems/transition.md), [motion.md](motion.md), and the **1–2** files that teach that family:

| Family | The loop | Read |
|---|---|---|
| Object + control | One lit mesh. A control rewrites the volume. | `volume-object` (add `earth-timeline` only if a slider rewrites a globe-like body) |
| Material transform | A sheet or body physically changes. | `crumple` — and you still need a transition that is not the slider |
| Room you enter | Camera is inside. A portal or door jumps the world. | `portal-room` or `volume-world` |
| Field / shader | An object becomes a living field. | `shader-dissolve` or `volume-field` |
| Spatial deck | Dark space. Several authored objects. Click brings one forward. | `spatial-deck` |
| Kinetic chapter | Scroll drives the **mesh**. | `kinetic-scroll` |

Do not load the other system files. Do not force Earth, crumple, or a portal onto every product.

5. Build **three first-viewport previews** — self-contained HTML. Each one:
   - Is the invented studio, with the named air and the named transition
   - Uses the camera / canvas numbers in Hard laws
   - Pointer orbits *now*; the product job hits the mesh
   - Uses the user's real product name and copy
   - Is one viewport tall
6. Save to `.frontend-director/previews/` as `a.html`, `b.html`, `c.html`. Open all three. Use each. If a preview is a 2D card, a vitamin mesh, a cropped poster, empty cream, a right-edge park, a cream crumple slider, or a clone of Earth / jacket / sofa / cassette / FOLD / VEIL, rebuild it.
7. In the chat, name them by **what they do**, not by template id. Example: Direction A: a glass vessel you pour a line into / B: a sheet of drafts that peels / C: a night room of echoes.

**Preview authenticity:** looks like the real first screen. No "preview", "option A", file names, or system ids on the page. No tinted headline word, no em-dash, no fake browser window, no yellow fill button, no 工作台 card.

Ask (header: "Direction"): which one? A / B / C / mix.

**Stop.** Do not generate the rest of the site.

---

## Phase 3 — Build only the one they picked

Rebuild the chosen invented world. Re-read the 1–2 technique files for its loop, [motion.md](motion.md), [systems/atmosphere.md](systems/atmosphere.md), [systems/transition.md](systems/transition.md), and [forbidden.md](forbidden.md) before you call it done.

Length from Phase 1 sets section count. Density sets type scale. Content is the copy. Every later section must still do *something*. Do not invent a second unrelated system.

Default stack: one HTML file with a Three.js importmap. HUD is a whisper over the canvas, **never on the object**.

**Every page must include:**

- A WebGL canvas covering the first viewport, CSS size = viewport
- Physical materials, studio lights, ACES, shadows
- The whole studio-object visible with air (unless the loop is a room you are inside)
- Camera FOV ~32, `z` ~5.2–6.2 on a ~1.7 mesh
- Pointer / scroll / type changing the volume
- The product job applied to the mesh
- The named atmosphere (body CSS hex = `scene.background`)
- The named transition (air **and** object change; duration 0.7–1.4s)
- `prefers-reduced-motion`: keep the mesh usable, slow the orbit

**Do not include:**

- A letter about the product instead of the product
- A dark rounded "工作台" card, textarea, yellow fill button
- Fake browser chrome / gray placeholder bars
- Feature rows with a line under each claim
- Lucide icons in rounded squares
- An unlit cube or a vitamin Capsule / Sphere / Box
- A cropped mesh, a right-edge park, or HUD on the object
- A gray stage disk
- Empty cream from a far camera
- A crumple slider sold as the whole site
- Fake "Sarah Chen, CEO" quotes
- A cloned Earth, Vercel jacket, baroque room, cassette, FOLD sheet, or VEIL glass card

Comments in CSS: `/* === SYSTEM TOKENS === */`, `/* === LIVE ENGINE === */`, `/* === FIRST VIEWPORT === */`.  
Comments in JS: `/* atmosphere: … */`, `/* transition: … */`.

---

## Phase 4 — Look

Open the page. Move the pointer across it. Scroll. Type or click the primary object. Narrow to a phone width.

Screenshot idle and after the event. If the idle frame is empty cream, a right-edge crop, HUD on the mesh, a gray disk, milky plastic, or a smeared word, the page is not done — fix the matching law in this file or [forbidden.md](forbidden.md), then rebuild. Do not polish a hand-crafted demo instead of the skill.

Then read [forbidden.md](forbidden.md). One hit is a fail.

**Ship bar:**

- [ ] Four questions confirmed; one of three invented directions picked
- [ ] Each direction had a filled card (object, atmosphere, transition, surface, composition) before markup
- [ ] Matching technique file(s) + atmosphere + transition + `motion.md` were read; the rest of `systems/` was not
- [ ] First viewport is WebGL with physical material and studio light
- [ ] Studio-object loops: whole object, FOV ~32, `z` ~5.2–6.2, canvas CSS = viewport, HUD off the mesh, no stage disk
- [ ] Pointer / scroll / type changes the volume; the product job hits the mesh
- [ ] Surface is authored, not a vitamin primitive
- [ ] Atmosphere family reads in the first frame (not leftover cream)
- [ ] Transition family changes the world (not wrapper opacity, not slider-only)
- [ ] Printed type is glyph-by-glyph if the face is on a canvas
- [ ] No 2D 工作台 card, no yellow fill button, no 素笺 letter, no 拾贝 centered stack
- [ ] Not a clone of Earth, crumple-as-the-site, baroque portal, Vercel jacket, cassette, FOLD, or VEIL
- [ ] Opened in a browser and used, not only screenshotted
- [ ] No tinted headline word, no em-dash
- [ ] Mobile keeps the loop

If a box cannot be ticked, the page is not done.

---

## What this skill is not

- Not a five-template picker. Not permission to copy five HTML files and stop.
- Not a 2D taste kit. Those recipes produced 拾贝 / 素笺 / 回声瓶. They are gone.
- Not a license to polish FOLD / VEIL instead of changing this file.
- Not a slide engine. For decks, use a slides skill.
- Not a request to restyle a product surface the user did not name.
