# Index — loop families, not a three-id picker

Do not design from this table. Invent three objects first (see the Phase 2 card in SKILL.md). Then read at most the 1–2 technique files that match those loops, plus atmosphere + transition + motion. See [references.md](references.md) only if you need a ceiling loop spelled out.

These families are how the Recent bar *moves*. They are not a closed catalog. Do not always preview the same three ids. Do not force Earth, crumple, or a portal onto every product.

## Loop families

| Family | The loop | Technique files (read only if the invented loop matches) |
|---|---|---|
| Object + control | One lit mesh. Pointer / slider / type changes its volume (surface, color, scale, text on the skin). **Whole object, studio air, HUD below.** | `earth-timeline`, `volume-object` |
| Material transform | A sheet or body physically changes (crumple, peel, fold, melt). Material is the event. **Whole sheet visible in a white field.** | `crumple` |
| Room you enter | Camera is inside a space. Look around. A portal, door, or object jumps the world. | `portal-room`, `volume-world` |
| Field / shader | An object becomes a living field of points, light, or volume. | `shader-dissolve`, `volume-field` |
| Spatial deck | Dark space. Several floating objects. You navigate; click brings one forward. | `spatial-deck` |

Invent the object for this product. A writing tool might be a vessel, a sheet, a ribbon of type, a room of drafts — not a planet unless Earth is the metaphor. The surface must be authored.

After you invent the object, name **atmosphere** (paper studio / white haze / night void / fogged room / field-as-sky) and **transition** (gate / chapter wipe / dissolve / morph / camera chapter / portal jump). Read [systems/atmosphere.md](systems/atmosphere.md) and [systems/transition.md](systems/transition.md). A cream crumple slider is not a complete direction.

## When there is no mesh — Editorial composition families

Editorial has no object to loop, so its archetype is not a *thing* but a **layout family**, and the
unit of choice is the **sequence**, never the single section. Five families, with numbers and fail
conditions in [systems/editorial.md](systems/editorial.md):

| Family | The move | Runnable baseline |
|---|---|---|
| 1 Poster flush | one sentence owns 55–70vh; everything else is a 10.5px caption | `editorial/` `.hero` |
| 2 Editorial index | full-bleed 1px rows, no cards, hover preview replaces thumbnails | `editorial-index/` `.idx` + `.appendix` |
| 3 Asymmetric split | image bleeds one edge, 1.45 : 0.8, never 1:1 — left, right, full, and two-narrow variants | `editorial-split/` `.sp-a` … `.sp-d` |
| 4 Data band | 3–4 integers, solid ink band, once per page | `editorial-band/` `.band` |
| 5 Kinetic type | one word at 180–320px, cropped is legal, once per page | `editorial-band/` `.kinetic` |

A page picks three to five of these and alternates loud with quiet. **The families are the
archetypes.** Choosing one and repeating it with new nouns is the Editorial equivalent of previewing
the same three 3D ids on every brief — same failure, different layer.

## Do not

- Preview a dark card + yellow button (回声瓶).
- Preview a letter about the product (素笺).
- Preview a centered SaaS stack (拾贝).
- Preview a default capsule / sphere / box with a color lerp (KEPT).
- Preview a cropped sheet that fills the frame (FOLD).
- Preview a cream crumple slider as the whole site (no air, no world change).
- Preview VEIL: milky transmission glass, smeared dissolve, collapsed type.
- Tell the user to pick from Earth / crumple / portal / jacket / cassette.
- Clone Recent's jacket, sofa, cassette, or Earth map.
- Shortlist three named template ids and copy those HTML files.
- Treat Editorial as this table with the mesh deleted. It has its own five families.
- Run the same Editorial family twice in a row, however different the copy.
- Use Family 4 (band) or Family 5 (kinetic) more than once per page.
- Copy `editorial/` for an Editorial brief without first checking whether `editorial-index` or
  `editorial-split` fits the content better. The default is a habit, not a decision.
