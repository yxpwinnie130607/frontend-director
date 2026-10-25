# References — the Recent quality bar (not a catalog)

These posts from the Recent reel are the **ceiling**. Steal the **loop**, the **material standard**, and the **wow**. Invent a new object for **this** brief. Do not clone Earth, the Vercel jacket, the baroque sofa, or the cassette.

Read this in Phase 2. After every build, compare the first viewport to the laws below. Write the gap. If it fails, rebuild.

---

## What "quality" means here (质感 / 动效 / 炫酷)

**质感 (material).** You believe you could pick the thing up. Paper has grain, dye, and thickness. A globe has a lit limb, a specular, a soft contact shadow. A jacket has cloth, then living dots. A vitamin CapsuleGeometry with `color.lerp` has none of this.

**动效 (motion).** The *event* is physical. A slider changes the volume. A sheet becomes a wad. You jump a room. Half a product dissolves into a field. Idle is breath or slow spin, not a fade-up. If pointer, scroll, and type do not change the volume, it is still.

**炫酷 (wow).** Restraint that makes you lean in. One complete object (or a room you are inside). Designed air. Tiny chrome. The first frame should make a hand move toward the control. Cropped posters, overlapping HUD, and 2D cards kill the wow.

**背景 (atmosphere).** The air is a choice: paper studio, night void, haze room, or a living field. Augen / Podium sit in a designed dark. Earth / Crumple sit in designed white. Astro Dither *is* a field. Leftover CSS cream or a gray stage disk is not atmosphere.

**转场 (transition).** Send / enter / generate changes the world: sheet→wad, object→field, camera jump, room swap. Shopify Editions and Gaussian portals move you. A fade on `#app` is not a transition.

---

## Five ceiling loops (analyze, then invent)

### 1. Earth Timeline — object + control

- **What you see:** one complete lit globe in a **white** field. Soft elliptical contact shadow. A caption under the globe. A hairline **tick** slider under that. Nothing else.
- **质感:** physical planet, not a PNG. Key light, limb darkening, a hot specular. Surface is authored (continents / ice / lava), not a flat lerp on a default sphere.
- **动效:** drag the slider; the *volume* changes (surface, color, era). Pointer gives a slight orbit. Idle spin is almost invisible.
- **炫酷:** studio restraint. The globe is **smaller than the viewport**. Huge empty white. Chrome never covers it.
- **Steal:** a control that rewrites a volume. **Do not ship Earth** unless the product is Earth.

### 2. Crumple changelog — material transform

- **What you see:** one complete **poster** in a white field. Paper dye, fiber grain, printed type, a small mark. Soft shadow. Tick slider below. "Slide to crumple."
- **质感:** you can feel the sheet. Grain, uneven color, worn edge. When crumpled it is a **paper wad** (irregular, deep folds, type warped across ridges), not a wrinkled plane that still fills the frame.
- **动效:** the crumple *is* the event. Sheet → wad. Scroll, play, or a slider drives mix. Type can reprint the poster; then it can crumple again.
- **炫酷:** the wad looks pick-up-able. Whole object visible the entire time. HUD below.
- **Steal:** material as event. **Do not ship the changelog posters.**

### 3. Gaussian portal — room you enter

- **What you see:** you are **inside** a room (sofa, lamp, courtyard). A glowing portal. Depth, haze, light falloff. Not a screenshot in a card.
- **质感:** space has scale. Floors receive light. The portal is a living volume (glow, particles), not a PNG oval.
- **动效:** look around. Click / walk: the world **jumps**. Bedroom → courtyard → next.
- **炫酷:** presence. The camera is in the room.
- **Steal:** I am inside; I jump. **Do not ship the baroque sofa.**

### 4. Vercel shader — field / dissolve

- **What you see:** a product on **black**. Half of it is still the object; half is a living white-dot field. High contrast. Micro-interaction.
- **质感:** cloth / product is authored. The field is dense and alive, not 40 CSS dots.
- **动效:** pointer or a short drag eats the object into points. The points keep moving.
- **炫酷:** one idea, taken to the wall. Black void, no card.
- **Steal:** object becomes a field. **Do not ship the Vercel jacket.**

### 5. WebGL portfolio — spatial deck

- **What you see:** dark space. Several **authored** floating objects (not default boxes). You navigate. Click brings one forward. HUD is overlay type, never a form.
- **质感:** each piece is a designed thing (texture, silhouette).
- **动效:** fly / orbit / approach. Depth, not a CSS grid.
- **炫酷:** you are in a collection, not a list.
- **Steal:** navigate floating work. **Do not ship the cassette.**

Also on that reel (steal the *feel*): crumpled-paper still life (three wads on cream), magnetic phone UI, CRT with a 3D burst, Bloom-class glass flower, animated sphere clusters.

More Recent posts to steal *air and change* from (still not a catalog; do not clone):

| Post | Live | Steal |
|---|---|---|
| Augen | https://augen.pro | White haze still-life. Rim light. Falloff *is* the studio. |
| Podium | https://podium.global | White void. Metaball / blob as a mask. Chapter wipes. |
| Astro Dither | https://astrodither.robertborghesi.is | Background *is* the technique (dither + fluid). Click to enter. |
| Nothing to Watch | https://nothing-to-watch.port80.ch | Black-void **gate**, then a spinning world. Click-to-enter is the transition. |
| Recursive surface erosion | https://recent.design/i/vuzcu2u-recursive-surface-erosion | Particle sphere that morphs / erodes. Keep the silhouette. |
| Shopify Editions | https://www.shopify.com/editions/spring2026 | Camera move *is* the chapter. |
| Becane Paris | https://www.becaneparis.com | Scroll drives a product volume. |

**Not the bar:** Interfere (https://interfere.com) is polished 2D SaaS. Avara is character / Lottie, not a WebGL studio. Do not treat them as ceiling.

---

## Extra ceiling families (still not a picker)

If the five are not the right metaphor, these loops are the same bar:

| Family | What to steal | Technique |
|---|---|---|
| Glass still-life | One authored glass / ice object, studio light, idle breath (Bloom / Liquid Glass) | `volume-object` |
| White haze still-life | Rim-lit object, falloff is the studio (Augen) | `atmosphere`, `volume-object` |
| Cluster field | Many lit spheres or points as a living volume you can stir | `volume-field` |
| Kinetic chapter | Scroll drives a **mesh** (unfold, explode, dissolve), not a 2D clip-path poster | `kinetic-scroll`, `transition` |
| Gate then world | Designed void + one control; click builds the volume (Nothing to Watch) | `transition` |

---

## Technique map (read at most 1–2 after you invent)

| Loop family | Recent post | Technique file |
|---|---|---|
| Object + control | Earth Timeline | [systems/earth-timeline.md](systems/earth-timeline.md), [systems/volume-object.md](systems/volume-object.md) |
| Material transform | Crumple changelog | [systems/crumple.md](systems/crumple.md) |
| Room you enter | Gaussian portal | [systems/portal-room.md](systems/portal-room.md), [systems/volume-world.md](systems/volume-world.md) |
| Field / shader | Vercel shader | [systems/shader-dissolve.md](systems/shader-dissolve.md), [systems/volume-field.md](systems/volume-field.md) |
| Spatial deck | WebGL 作品集 | [systems/spatial-deck.md](systems/spatial-deck.md) |

---

## Law

- If the first viewport could be a screenshot of a form, rebuild.
- If there is no volume, rebuild.
- **Studio composition (Earth / Crumple):** object occupies roughly **25–40%** of the short viewport axis. ≥ 18% empty studio on every side. HUD = top-corner whispers + a slider **below** the object. Cropped poster = FOLD = fail. Canvas CSS must match the viewport (`width:100%; height:100%` + `setSize` updating style). A 2× buffer with unlocked CSS parks the mesh on the right edge.
- **Authored surface:** canvas / shader / vertices the product wrote. Capsule + `color.lerp` = KEPT = fail.
- **Material event:** crumple, dissolve, jump, or surface rewrite. Orbit-only is not enough.
- **Atmosphere + transition:** the first frame names the air. Send / enter / generate changes the world. A cream crumple slider is not a complete site.
- **Atmosphere + transition:** the first frame names the air. Send / enter / generate changes the world. A cream crumple slider is not a complete site.
- Do not ship Earth / jacket / sofa / cassette because the files exist.
- A writing tool is not a planet unless that metaphor fits.
